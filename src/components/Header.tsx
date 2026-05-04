"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const modelLinks = [
  { label: "Backyard Barns", href: "/backyard-barns" },
  { label: "Storage Sheds", href: "/storage-sheds" },
  { label: "Portable Cabins", href: "/portable-cabins" },
  { label: "Portable Garages", href: "/portable-garages" },
  { label: "Double Wide Garages", href: "/double-wide-garages" },
  { label: "Chicken Coops", href: "/chicken-coops" },
  { label: "Greenhouses", href: "/greenhouses" },
  { label: "Side Gables", href: "/side-gables" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Models", href: "#", hasDropdown: true },
  { label: "Inventory", href: "/inventory" },
  { label: "Rent To Own", href: "/rent-to-own" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSubOpen(false);
  }, [pathname]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <style>{`
        /* ── Base ── */
        .hdr {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: #bd171f;
          transition: box-shadow 0.25s ease;
        }
        .hdr.hdr-scrolled {
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.28);
        }
        .hdr-inner {
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          height: 150px;
          padding: 0 clamp(16px, 3.5vw, 52px);
          gap: 20px;
        }

        /* ── Logo ── */
        .hdr-logo-link {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          text-decoration: none;
          line-height: 1;
        }
        .hdr-logo-img {
          height: 122px;
          width: auto;
          display: block;
          transition: opacity 0.2s ease;
        }
        .hdr-logo-link:hover .hdr-logo-img { opacity: 0.85; }
        /* text fallback when image fails */
        .hdr-logo-text {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 17px;
          font-weight: 700;
          color: #fff;
          line-height: 1.25;
          letter-spacing: 0.2px;
        }
        .hdr-logo-text small {
          display: block;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          opacity: 0.78;
          margin-top: 2px;
        }

        /* ── Desktop nav ── */
        .hdr-nav {
          flex: 1 1 auto;
          display: flex;
          justify-content: center;
          min-width: 0;
        }
        .hdr-nav-list {
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: clamp(0px, 1.5vw, 8px);
        }
        .hdr-nav-item { position: relative; }
        .hdr-nav-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 11px;
          color: rgba(255, 255, 255, 0.93) !important;
          font-family: var(--font-oswald), Impact, sans-serif;
          font-size: 17px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.9px;
          text-decoration: none;
          border-radius: 3px;
          white-space: nowrap;
          transition: background 0.16s ease, color 0.16s ease;
          position: relative;
        }
        .hdr-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 11px;
          right: 11px;
          height: 2px;
          background: #ffc400;
          border-radius: 1px;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.2s ease;
        }
        .hdr-nav-link:hover {
          color: #fff !important;
          background: rgba(0, 0, 0, 0.16);
        }
        .hdr-nav-link:hover::after,
        .hdr-nav-link.hdr-nav-active::after { transform: scaleX(1); }
        .hdr-nav-link.hdr-nav-active { color: #fff !important; }
        .hdr-nav-chevron { flex-shrink: 0; transition: transform 0.2s ease; }
        .hdr-nav-item:hover .hdr-nav-chevron { transform: rotate(180deg); }

        /* Dropdown */
        .hdr-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          background: #fff;
          border-radius: 6px;
          box-shadow: 0 10px 36px rgba(0, 0, 0, 0.18);
          border-top: 3px solid #bd171f;
          list-style: none;
          margin: 0;
          padding: 6px 0;
          min-width: 230px;
          z-index: 200;
          pointer-events: none;
          opacity: 0;
          transform: translateX(-50%) translateY(-6px);
          transition: opacity 0.18s ease, transform 0.18s ease;
        }
        /* arrow */
        .hdr-dropdown::before {
          content: '';
          position: absolute;
          top: -9px;
          left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-bottom-color: #bd171f;
        }
        .hdr-nav-item:hover > .hdr-dropdown,
        .hdr-nav-item:focus-within > .hdr-dropdown {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }
        .hdr-dropdown-link {
          display: block;
          padding: 9px 20px 9px 18px;
          color: #1a1a1a !important;
          font-family: var(--font-oswald), Impact, sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.4px;
          text-decoration: none;
          border-left: 3px solid transparent;
          transition: background 0.13s ease, color 0.13s ease, border-color 0.13s ease, padding-left 0.13s ease;
        }
        .hdr-dropdown-link:hover {
          background: #fdf4f4;
          color: #bd171f !important;
          border-left-color: #bd171f;
          padding-left: 22px;
        }

        /* ── Right CTA group ── */
        .hdr-cta {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .hdr-phone {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #fff !important;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.3px;
          text-decoration: none;
          white-space: nowrap;
          transition: opacity 0.16s ease;
        }
        .hdr-phone:hover { opacity: 0.78; }
        .hdr-phone-icon { opacity: 0.85; flex-shrink: 0; }
        .hdr-quote-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #ffc400;
          color: #111 !important;
          font-family: var(--font-oswald), Impact, sans-serif;
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.1px;
          text-decoration: none;
          padding: 9px 18px;
          border-radius: 4px;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.22);
          transition: background 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
        }
        .hdr-quote-btn:hover {
          background: #e6b000;
          color: #111 !important;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.28);
          transform: translateY(-1px);
        }

        /* ── Hamburger ── */
        .hdr-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 40px;
          height: 40px;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 4px;
          padding: 0;
          transition: background 0.15s ease;
          flex-shrink: 0;
        }
        .hdr-hamburger:hover { background: rgba(0, 0, 0, 0.18); }
        .hdr-bar {
          display: block;
          width: 22px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.25s ease, width 0.25s ease;
          transform-origin: center;
        }
        .hdr-hamburger.is-open .hdr-bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hdr-hamburger.is-open .hdr-bar:nth-child(2) { opacity: 0; width: 0; }
        .hdr-hamburger.is-open .hdr-bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile menu ── */
        .hdr-mobile {
          position: fixed;
          inset: 150px 0 0 0;
          background: #bd171f;
          z-index: 999;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          -webkit-overflow-scrolling: touch;
        }
        .hdr-mobile.is-open { transform: translateX(0); }
        .hdr-mobile-list {
          list-style: none;
          margin: 0;
          padding: 8px 0 0;
        }
        .hdr-mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 14px 24px;
          color: #fff !important;
          font-family: var(--font-oswald), Impact, sans-serif;
          font-size: 15px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-decoration: none;
          background: none;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          text-align: left;
          transition: background 0.13s ease;
        }
        .hdr-mobile-link:hover,
        .hdr-mobile-link.hdr-nav-active { background: rgba(0, 0, 0, 0.18); }
        .hdr-mobile-sub-chevron { transition: transform 0.22s ease; flex-shrink: 0; }
        .hdr-mobile-sub-chevron.is-open { transform: rotate(180deg); }
        .hdr-mobile-sub {
          list-style: none;
          margin: 0;
          padding: 0;
          background: rgba(0, 0, 0, 0.14);
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s ease;
        }
        .hdr-mobile-sub.is-open { max-height: 600px; }
        .hdr-mobile-sub-link {
          display: block;
          padding: 11px 24px 11px 38px;
          color: rgba(255, 255, 255, 0.88) !important;
          font-family: var(--font-oswald), Impact, sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.6px;
          text-decoration: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          transition: background 0.13s ease, color 0.13s ease;
        }
        .hdr-mobile-sub-link:hover { background: rgba(0, 0, 0, 0.12); color: #fff !important; }

        /* Mobile CTA strip */
        .hdr-mobile-cta {
          margin-top: auto;
          padding: 20px 24px 32px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }
        .hdr-mobile-quote {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffc400;
          color: #111 !important;
          font-family: var(--font-oswald), Impact, sans-serif;
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.1px;
          text-decoration: none;
          padding: 14px 24px;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.22);
        }
        .hdr-mobile-phone {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #fff !important;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 19px;
          font-weight: 700;
          text-decoration: none;
          padding: 10px;
          letter-spacing: 0.4px;
        }

        /* ── Responsive breakpoints ── */
        @media (max-width: 960px) {
          .hdr-nav  { display: none; }
          .hdr-phone { display: none; }
          .hdr-quote-btn { display: none; }
          .hdr-hamburger { display: flex; }
        }

        @media (max-width: 480px) {
          .hdr-inner { height: 110px; }
          .hdr-mobile { inset-block-start: 110px; }
          .hdr-logo-img { height: 88px; }
        }
      `}</style>

      <header className={`hdr${scrolled ? " hdr-scrolled" : ""}`} role="banner">
        <div className="hdr-inner">

          {/* Logo */}
          <Link href="/" aria-label="Legacy Structures — Home" className="hdr-logo-link">
            <img
              src="/logo.png"
              alt="Legacy Structures"
              className="hdr-logo-img"
              width={160}
              height={46}
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hdr-nav" aria-label="Main navigation">
            <ul className="hdr-nav-list">
              {navLinks.map((item) => (
                <li
                  key={item.label}
                  className="hdr-nav-item"
                >
                  <Link
                    href={item.href}
                    className={`hdr-nav-link${!item.hasDropdown && isActive(item.href) ? " hdr-nav-active" : ""}`}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <svg
                        className="hdr-nav-chevron"
                        width="10" height="6" viewBox="0 0 10 6"
                        fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="1 1 5 5 9 1" />
                      </svg>
                    )}
                  </Link>
                  {item.hasDropdown && (
                    <ul className="hdr-dropdown" aria-label="Our Models">
                      {modelLinks.map((sub) => (
                        <li key={sub.href}>
                          <Link href={sub.href} className="hdr-dropdown-link">
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div className="hdr-cta">
            <a
              href="tel:5185442889"
              className="hdr-phone"
              aria-label="Call us at 518-544-2889"
            >
              <svg className="hdr-phone-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C9.61 21 3 14.39 3 6a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"/>
              </svg>
              518-544-2889
            </a>
            <Link href="/contact-us" className="hdr-quote-btn">
              Get A Free Quote
            </Link>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            className={`hdr-hamburger${mobileOpen ? " is-open" : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen ? "true" : "false"}
            aria-controls="hdr-mobile-menu"
          >
            <span className="hdr-bar" />
            <span className="hdr-bar" />
            <span className="hdr-bar" />
          </button>

        </div>
      </header>

      {/* Mobile slide-in menu — rendered outside <header> so it can fill the viewport */}
      <nav
        id="hdr-mobile-menu"
        className={`hdr-mobile${mobileOpen ? " is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen ? "true" : "false"}
      >
        <ul className="hdr-mobile-list">
          {navLinks.map((item) => (
            <li key={item.label}>
              {item.hasDropdown ? (
                <>
                  <button
                    type="button"
                    className="hdr-mobile-link"
                    onClick={() => setMobileSubOpen((v) => !v)}
                    aria-expanded={mobileSubOpen ? "true" : "false"}
                  >
                    {item.label}
                    <svg
                      className={`hdr-mobile-sub-chevron${mobileSubOpen ? " is-open" : ""}`}
                      width="12" height="7" viewBox="0 0 12 7"
                      fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="1 1 6 6 11 1" />
                    </svg>
                  </button>
                  <ul className={`hdr-mobile-sub${mobileSubOpen ? " is-open" : ""}`}>
                    {modelLinks.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          className="hdr-mobile-sub-link"
                          onClick={() => { setMobileOpen(false); setMobileSubOpen(false); }}
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`hdr-mobile-link${isActive(item.href) ? " hdr-nav-active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="hdr-mobile-cta">
          <Link
            href="/contact-us"
            className="hdr-mobile-quote"
            onClick={() => setMobileOpen(false)}
          >
            Get A Free Quote
          </Link>
          <a href="tel:5185442889" className="hdr-mobile-phone">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C9.61 21 3 14.39 3 6a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"/>
            </svg>
            518-544-2889
          </a>
        </div>
      </nav>
    </>
  );
}
