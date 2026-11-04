"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, type ReactElement } from "react";
import { createPortal } from "react-dom";
import { siteConfig } from "@/site.config";
import { consentHiddenInPreview } from "@/components/consent/previewHidden";
import { raiseToTopLayer, shouldReraiseAfter } from "@/components/consent/topLayer";
import { useConsent } from "@/components/consent/useConsent";
import { useOpenModalDialog } from "@/components/consent/useOpenModalDialog";
import { carryLegacyDecline } from "@/lib/consent-legacy";

// Before any consent gate reads the store: a reject on the old bar stays a decline.
carryLegacyDecline();

/**
 * The site's cookie card (its own look and position), on site-starter's consent
 * store and top-layer behaviour. Renders nothing once the visitor has made a
 * real choice (an unrecognised stored value asks again while analytics stay
 * off); analytics loaders react via useConsent(). The wording is
 * site-starter#189's: an explicit Accept also grants Google ad consent
 * (gaConsentLevel "all"), so it names analytics and advertising, and Decline
 * turns both off.
 *
 * A visitor can always reach it, whatever overlay is open (see topLayer.ts):
 * it is a top-layer popover above every z-index, and while a modal dialog is
 * open it renders inside that dialog so it is not inert, and moves out again
 * the moment that dialog is closed, removed or moved. `visible` keeps it shown
 * inside a modal the site hides with visibility:hidden. The z-index is only
 * the fallback where popovers are unsupported.
 */
export function ConsentBanner(): ReactElement | null {
  const { choiceNeeded, accept, decline } = useConsent();
  const modal = useOpenModalDialog();
  const barRef = useRef<HTMLDivElement>(null);
  const visible = choiceNeeded && !consentHiddenInPreview();

  // Runs after every move into or out of a modal (the portal remounts the bar),
  // so the bar is re-shown above whatever entered the top layer last.
  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!visible || !bar) return;
    // A popover stays hidden until shown: if showing fails, fall back to a plain fixed bar.
    if (!raiseToTopLayer(bar)) bar.removeAttribute("popover");
  }, [visible, modal]);

  // toggle does not bubble: listen in the capture phase for any popover or
  // dialog that opens after the bar, and raise the bar back above it.
  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!visible || !bar) return;
    const onToggle = (event: Event): void => {
      if (shouldReraiseAfter(event as ToggleEvent, bar)) raiseToTopLayer(bar);
    };
    document.addEventListener("toggle", onToggle, true);
    return () => document.removeEventListener("toggle", onToggle, true);
  }, [visible, modal]);

  if (!visible) {
    return null;
  }

  const bar = (
    <div
      ref={barRef}
      popover="manual"
      role="region"
      aria-label="Cookie consent"
      data-mega-preview-hide=""
      data-mega-ignore=""
      className="ph-no-capture visible cookie-consent"
    >
      <div className="cookie-consent-icon" aria-hidden="true">
        i
      </div>
      <div className="cookie-consent-copy">
        <strong>Cookie preferences</strong>
        <span>
          {siteConfig.businessName} uses cookies for analytics and advertising,
          to improve this site and measure our ads.{" "}
          <Link href="/privacy-policy">Privacy</Link>
        </span>
      </div>
      <div className="cookie-consent-actions">
        <button
          type="button"
          onClick={decline}
          aria-label="Decline analytics and advertising cookies"
        >
          Decline
        </button>
        <button
          type="button"
          className="cookie-consent-primary"
          onClick={accept}
          aria-label="Accept analytics and advertising cookies"
        >
          Accept cookies
        </button>
      </div>

      <style>{`
        .cookie-consent {
          position: fixed;
          inset: auto auto 18px 18px;
          z-index: 2147483000;
          width: min(520px, calc(100vw - 36px));
          height: auto;
          margin: 0;
          overflow: visible;
          display: flex;
          gap: 12px;
          align-items: center;
          background: rgba(255, 255, 255, 0.98);
          color: #1a3a5c;
          border: 1px solid rgba(26, 58, 92, 0.18);
          border-radius: 8px;
          box-shadow: 0 14px 34px rgba(15, 35, 52, 0.2);
          padding: 12px;
        }

        .cookie-consent-icon {
          width: 28px;
          height: 28px;
          flex: 0 0 28px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #1a3a5c;
          color: #ffc400;
          font-family: Georgia, serif;
          font-size: 17px;
          font-weight: 700;
        }

        .cookie-consent-copy {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 12px;
          line-height: 1.4;
          min-width: 0;
          flex: 1 1 auto;
        }

        .cookie-consent-copy strong {
          font-family: var(--font-poppins), sans-serif;
          font-size: 14px;
          line-height: 1.2;
        }

        .cookie-consent-copy a {
          color: #006580;
          font-weight: 700;
          text-decoration: underline;
        }

        .cookie-consent-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .cookie-consent button {
          border: 1px solid #1a3a5c;
          background: #ffffff;
          color: #1a3a5c;
          border-radius: 5px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 700;
          line-height: 1;
          min-height: 34px;
          padding: 9px 11px;
          white-space: nowrap;
        }

        .cookie-consent button:focus-visible {
          outline: 3px solid #ffc400;
          outline-offset: 2px;
        }

        .cookie-consent-primary {
          background: #ffc400 !important;
          border-color: #ffc400 !important;
          color: #111111 !important;
        }

        @media (max-width: 640px) {
          .cookie-consent {
            inset: auto 12px 12px 12px;
            width: auto;
            display: grid;
            grid-template-columns: 28px 1fr;
            align-items: start;
          }

          .cookie-consent-actions {
            grid-column: 1 / -1;
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 420px) {
          .cookie-consent-actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
  return modal ? createPortal(bar, modal) : bar;
}
