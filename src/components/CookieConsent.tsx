"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "legacy_cookie_consent";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsVisible(!localStorage.getItem(STORAGE_KEY));
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const savePreference = (value: "accepted" | "essential") => {
    localStorage.setItem(STORAGE_KEY, value);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <section
      aria-label="Cookie consent"
      className="cookie-consent"
      role="region"
    >
      <div className="cookie-consent-icon" aria-hidden="true">
        i
      </div>
      <div className="cookie-consent-copy">
        <strong>Cookie preferences</strong>
        <span>
          We use essential cookies and optional analytics to improve the site.{" "}
          <Link href="/privacy-policy">Privacy</Link>
        </span>
      </div>
      <div className="cookie-consent-actions">
        <button type="button" onClick={() => savePreference("essential")}>
          Reject Non-Essential
        </button>
        <button
          type="button"
          className="cookie-consent-primary"
          onClick={() => savePreference("accepted")}
        >
          Accept Cookies
        </button>
      </div>

      <style>{`
        .cookie-consent {
          position: fixed;
          left: 18px;
          bottom: 18px;
          z-index: 80;
          width: min(520px, calc(100vw - 36px));
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
            left: 12px;
            right: 12px;
            bottom: 12px;
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
    </section>
  );
}
