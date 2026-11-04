import assert from "node:assert/strict";
import test from "node:test";
import { siteConfig } from "../site.config.ts";
import { analyticsAllowedNow, getConsentStatus, isConsentChoiceNeeded } from "./consent.ts";
import { carryLegacyDecline, LEGACY_CONSENT_KEY } from "./consent-legacy.ts";
import { resetQueueForTests } from "./tracking/queue.ts";
import { storageDouble, type StorageFaults } from "./__fixtures__/storage-double.ts";

type Mode = "us-default" | "strict";

interface Case {
  name: string;
  mode?: Mode;
  /** The old banner's stored record, or null for none. */
  legacy: string | null;
  /** The template store's value, or null for none. */
  current?: string | null;
  /** Storage faults that start after the stored values are in place. */
  faults?: StorageFaults;
  status: "unset" | "accepted" | "declined";
  allowed: boolean;
  choiceNeeded: boolean;
  legacyKept: boolean;
}

/**
 * Invariant: a reject stored by the old bar is never read as allowed, and
 * nothing from the old bar ever grants anything.
 */
const REJECTED = "essential";
const ACCEPTED = "accepted";


const CASES: Case[] = [
  { name: "old reject, nothing new", legacy: REJECTED, status: "declined", allowed: false, choiceNeeded: false, legacyKept: false },
  { name: "old reject, strict", mode: "strict", legacy: REJECTED, status: "declined", allowed: false, choiceNeeded: false, legacyKept: false },
  { name: "old reject, new decline already stored", legacy: REJECTED, current: "declined", status: "declined", allowed: false, choiceNeeded: false, legacyKept: false },
  { name: "old reject, a later Accept on the new bar wins", legacy: REJECTED, current: "accepted", status: "accepted", allowed: true, choiceNeeded: false, legacyKept: true },
  { name: "old reject, writes failing: still declined, old key kept", legacy: REJECTED, faults: { setThrows: true }, status: "declined", allowed: false, choiceNeeded: true, legacyKept: true },
  { name: "old reject, storage unreadable: still declined", legacy: REJECTED, faults: { getThrows: true, setThrows: true }, status: "declined", allowed: false, choiceNeeded: true, legacyKept: true },
  { name: "old Accept grants nothing and asks again (us-default)", legacy: ACCEPTED, status: "unset", allowed: true, choiceNeeded: true, legacyKept: true },
  { name: "old Accept grants nothing (strict)", mode: "strict", legacy: ACCEPTED, status: "unset", allowed: false, choiceNeeded: true, legacyKept: true },
  { name: "old value with other casing is ignored", legacy: "ESSENTIAL", status: "unset", allowed: true, choiceNeeded: true, legacyKept: true },
  { name: "old value with padding is ignored", legacy: " essential ", status: "unset", allowed: true, choiceNeeded: true, legacyKept: true },
  { name: "old empty value is ignored", legacy: "", status: "unset", allowed: true, choiceNeeded: true, legacyKept: true },
  { name: "old unknown value is ignored", legacy: "declined", status: "unset", allowed: true, choiceNeeded: true, legacyKept: true },
  { name: "no old value", legacy: null, status: "unset", allowed: true, choiceNeeded: true, legacyKept: false },
];

function run(c: Case): { status: string; allowed: boolean; choiceNeeded: boolean; legacyKept: boolean } {
  const originalMode = siteConfig.consentMode;
  const originalWindow = (globalThis as { window?: unknown }).window;
  const faults: StorageFaults = {};
  const local = storageDouble(c.current ?? null, faults);
  if (c.legacy !== null) local.setItem(LEGACY_CONSENT_KEY, c.legacy);
  Object.assign(faults, c.faults);
  const target = new EventTarget();
  siteConfig.consentMode = c.mode ?? "us-default";
  resetQueueForTests();
  (globalThis as { window?: unknown }).window = {
    localStorage: local,
    addEventListener: target.addEventListener.bind(target),
    removeEventListener: target.removeEventListener.bind(target),
    dispatchEvent: target.dispatchEvent.bind(target),
  };
  try {
    carryLegacyDecline();
    faults.getThrows = false;
    const legacyKept = local.getItem(LEGACY_CONSENT_KEY) !== null;
    Object.assign(faults, c.faults);
    return { status: getConsentStatus(), allowed: analyticsAllowedNow(), choiceNeeded: isConsentChoiceNeeded(), legacyKept };
  } finally {
    siteConfig.consentMode = originalMode;
    (globalThis as { window?: unknown }).window = originalWindow;
    resetQueueForTests();
  }
}

for (const c of CASES) {
  test(`legacy consent: ${c.name}`, () => {
    assert.deepEqual(run(c), { status: c.status, allowed: c.allowed, choiceNeeded: c.choiceNeeded, legacyKept: c.legacyKept });
  });
}

test("legacy consent: the decline survives a full page load once the old key is gone", () => {
  const originalWindow = (globalThis as { window?: unknown }).window;
  const local = storageDouble(null);
  local.setItem(LEGACY_CONSENT_KEY, REJECTED);
  const newPage = (): void => {
    const target = new EventTarget();
    (globalThis as { window?: unknown }).window = {
      localStorage: local,
      addEventListener: target.addEventListener.bind(target),
      removeEventListener: target.removeEventListener.bind(target),
      dispatchEvent: target.dispatchEvent.bind(target),
    };
  };
  try {
    newPage();
    carryLegacyDecline();
    assert.equal(local.getItem(LEGACY_CONSENT_KEY), null);
    newPage();
    carryLegacyDecline();
    assert.equal(getConsentStatus(), "declined");
    assert.equal(analyticsAllowedNow(), false);
  } finally {
    (globalThis as { window?: unknown }).window = originalWindow;
    resetQueueForTests();
  }
});
