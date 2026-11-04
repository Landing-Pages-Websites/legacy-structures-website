import { declineIsDurable, getConsentStatus, setConsentStatus } from "@/lib/consent";

/** The key this site's earlier cookie bar wrote: "accepted" or "essential". */
export const LEGACY_CONSENT_KEY = "legacy_cookie_consent";
const LEGACY_REJECT = "essential";

function readLegacy(): string | null {
  try {
    return window.localStorage.getItem(LEGACY_CONSENT_KEY);
  } catch {
    return null;
  }
}

/**
 * Carries a "Reject Non-Essential" made on the site's earlier bar into the
 * template consent store, so a visitor who rejected there is not tracked by
 * default now. Only a reject carries: the old "Accept Cookies" covered optional
 * analytics, and an Accept now also grants Google ad consent, so that visitor
 * is asked again. A choice already in the new store wins. The old key is
 * removed only once the decline reads back as durable, so a page whose storage
 * is failing keeps it and the next page carries it again.
 */
export function carryLegacyDecline(): void {
  if (typeof window === "undefined" || readLegacy() !== LEGACY_REJECT) return;
  if (getConsentStatus() === "unset") setConsentStatus("declined");
  if (!declineIsDurable()) return;
  try {
    window.localStorage.removeItem(LEGACY_CONSENT_KEY);
  } catch {
    // Kept: the decline is carried again on the next page.
  }
}
