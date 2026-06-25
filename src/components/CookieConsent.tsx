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
      <div className="cookie-consent-copy">
        <strong>Cookies on Legacy Structures</strong>
        <span>
          We use essential cookies to keep the site working and basic analytics
          to understand what visitors need. Read our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
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
          right: 18px;
          bottom: 18px;
          z-index: 80;
          width: min(560px, calc(100vw - 36px));
          display: flex;
          gap: 18px;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          color: #1a3a5c;
          border: 1px solid #d9e0e5;
          border-radius: 8px;
          box-shadow: 0 18px 42px rgba(15, 35, 52, 0.18);
          padding: 16px;
        }

        .cookie-consent-copy {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 13px;
          line-height: 1.45;
        }

        .cookie-consent-copy strong {
          font-family: var(--font-poppins), sans-serif;
          font-size: 15px;
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
          font-weight: 700;
          min-height: 42px;
          padding: 10px 12px;
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
            flex-direction: column;
            align-items: stretch;
          }

          .cookie-consent-actions {
            display: grid;
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
