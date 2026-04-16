"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(64);

  useEffect(() => {
    const measure = () => {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <style>{`
        .header-bar {
          background: #1a3a5c;
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .header-row {
          max-width: 1250px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          height: 64px;
        }
        .header-logo { display: flex; align-items: center; flex-shrink: 0; }
        .header-phone {
          display: flex; align-items: center; gap: 8px;
          color: #fff; text-decoration: none;
          font-weight: 700; font-size: 18px;
          font-family: var(--font-poppins), Poppins, sans-serif;
          white-space: nowrap; flex-shrink: 0;
          transition: color 0.2s;
        }
        .header-phone:hover { color: #d4a017; }
        .header-phone svg { color: #d4a017; }

        .nav-center {
          display: flex; align-items: center; justify-content: center;
          list-style: none; margin: 0; padding: 0; gap: 0; flex: 1;
        }
        .nav-item { position: relative; }
        .nav-link {
          display: flex; align-items: center; height: 64px; padding: 0 20px;
          color: rgba(255,255,255,0.8) !important;
          font-family: var(--font-poppins), Poppins, sans-serif;
          font-size: 14px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.8px;
          text-decoration: none; text-align: center;
          background: transparent; transition: all 0.2s ease;
          border-bottom: 3px solid transparent;
          box-sizing: border-box;
        }
        .nav-link:hover { color: #fff !important; background: rgba(255,255,255,0.07); }
        .nav-link.active { color: #fff !important; border-bottom-color: #d4a017; }

        .dropdown-menu {
          display: none; position: absolute; top: 100%; left: 50%;
          transform: translateX(-50%); background: #fff;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          border-radius: 0 0 8px 8px; z-index: 1000;
          list-style: none; margin: 0; padding: 8px 0; min-width: 220px;
        }
        .dropdown-parent:hover > .dropdown-menu { display: block; }
        .dropdown-link {
          display: block; padding: 10px 20px;
          color: #2c3e50 !important;
          font-family: var(--font-poppins), Poppins, sans-serif;
          font-size: 14px; font-weight: 500;
          text-decoration: none; transition: all 0.15s ease;
        }
        .dropdown-link:hover { background: #f7f5f2; color: #c0392b !important; padding-left: 24px; }

        .mobile-toggle { display: none; }

        @media (max-width: 900px) {
          .header-row { height: 56px; padding: 0 16px; }
          .nav-center { display: none; }
          .mobile-toggle { display: flex; align-items: center; }
          .mobile-toggle button {
            background: none; border: none; color: #fff; cursor: pointer;
            display: flex; flex-direction: column; gap: 5px; padding: 8px;
          }
          .mobile-toggle button span {
            display: block; width: 22px; height: 2px; background: #fff; border-radius: 2px;
          }
          .mobile-nav {
            display: none; position: absolute; top: 100%; left: 0; right: 0;
            background: #1a3a5c; box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            flex-direction: column; list-style: none; margin: 0; padding: 0;
          }
          .mobile-nav.open { display: flex !important; }
          .mobile-nav .nav-link { height: auto; padding: 14px 20px; text-align: left; border-bottom: none; }
          .mobile-nav .dropdown-menu { position: static; box-shadow: none; transform: none; border-radius: 0; min-width: auto; }
          .mobile-nav .dropdown-parent:hover > .dropdown-menu { display: none; }
          .mobile-nav .dropdown-menu.mobile-open { display: block !important; }
          .mobile-nav .dropdown-link { padding-left: 40px; font-size: 13px; }
          .header-phone { font-size: 16px; }
        }
      `}</style>

      <div style={{ height: headerHeight }} />
      <header className="header-bar" ref={headerRef}>
        <div className="header-row">
          {/* Logo */}
          <Link href="/" className="header-logo">
            <Image
              src="https://legacystructuresusa.com/wp-content/uploads/2025/07/LEGECY-STRUCTURES-dark-blue-1.png"
              alt="Legacy Structures"
              width={200}
              height={55}
              style={{ height: "44px", width: "auto" }}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="nav-center">
            {navLinks.map((item) => (
              <li key={item.label} className={`nav-item${item.hasDropdown ? " dropdown-parent" : ""}`}>
                <Link
                  href={item.href}
                  className={`nav-link${!item.hasDropdown && isActive(item.href) ? " active" : ""}`}
                >
                  {item.label}
                </Link>
                {item.hasDropdown && (
                  <ul className="dropdown-menu">
                    {modelLinks.map((sub) => (
                      <li key={sub.href}>
                        <Link href={sub.href} className="dropdown-link">{sub.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Phone */}
          <a href="tel:518-544-2889" className="header-phone">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            518-544-2889
          </a>

          {/* Mobile hamburger */}
          <div className="mobile-toggle">
            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile Nav (below header) */}
        <ul className={`mobile-nav${mobileOpen ? " open" : ""}`}>
          {navLinks.map((item) => (
            <li key={item.label} className={`nav-item${item.hasDropdown ? " dropdown-parent" : ""}`}>
              <Link
                href={item.href}
                className="nav-link"
                onClick={
                  item.hasDropdown
                    ? (e) => { e.preventDefault(); setMobileSubOpen(!mobileSubOpen); }
                    : () => setMobileOpen(false)
                }
              >
                {item.label}
              </Link>
              {item.hasDropdown && (
                <ul className={`dropdown-menu${mobileSubOpen ? " mobile-open" : ""}`}>
                  {modelLinks.map((sub) => (
                    <li key={sub.href}>
                      <Link href={sub.href} className="dropdown-link" onClick={() => { setMobileOpen(false); setMobileSubOpen(false); }}>
                        {sub.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </header>
    </>
  );
}
