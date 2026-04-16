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
  const [headerHeight, setHeaderHeight] = useState(130);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
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
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .header-spacer {
          height: var(--header-height, 130px);
        }
        .header-top {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
        }
        .header-phone {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #fff;
          text-decoration: none;
          font-weight: 700;
          font-size: 20px;
          font-family: var(--font-poppins), Poppins, sans-serif;
          transition: color 0.2s;
        }
        .header-phone:hover { color: #d4a017; }
        .header-phone svg { color: #d4a017; }

        .nav-bar {
          max-width: 1200px;
          margin: 0 auto;
          border-top: 1px solid rgba(255,255,255,0.12);
        }
        .nav-toggle { display: none; padding: 10px 24px; }
        .nav-toggle button {
          background: none; border: none; color: #fff; cursor: pointer;
          display: flex; flex-direction: column; gap: 5px; padding: 4px;
        }
        .nav-toggle button span {
          display: block; width: 24px; height: 2.5px; background: #fff; border-radius: 2px;
        }
        .nav-list {
          display: flex; justify-content: center; list-style: none;
          margin: 0; padding: 0;
        }
        .nav-item { position: relative; }
        .nav-link {
          display: block; padding: 16px 28px;
          color: rgba(255,255,255,0.8) !important;
          font-family: var(--font-poppins), Poppins, sans-serif;
          font-size: 15px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 1px;
          text-decoration: none; text-align: center;
          background: transparent; transition: all 0.2s ease;
        }
        .nav-link:hover { color: #fff !important; background: rgba(255,255,255,0.08); }
        .nav-link.active { color: #fff !important; border-bottom: 3px solid #d4a017; }

        .dropdown-menu {
          display: none; position: absolute; top: 100%; left: 50%;
          transform: translateX(-50%); background: #fff;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          border-radius: 0 0 8px 8px; z-index: 1000;
          list-style: none; margin: 0; padding: 8px 0; min-width: 230px;
        }
        .dropdown-parent:hover > .dropdown-menu { display: block; }
        .dropdown-link {
          display: block; padding: 11px 22px;
          color: #2c3e50 !important;
          font-family: var(--font-poppins), Poppins, sans-serif;
          font-size: 14px; font-weight: 500;
          text-decoration: none; transition: all 0.15s ease;
        }
        .dropdown-link:hover { background: #f7f5f2; color: #c0392b !important; padding-left: 26px; }

        @media (max-width: 768px) {
          .header-top { flex-direction: column; gap: 8px; padding: 10px 16px; }
          .header-phone { font-size: 17px; }
          .nav-toggle { display: block; text-align: right; }
          .nav-list { display: none; flex-direction: column; background: #1a3a5c; }
          .nav-list.open { display: flex !important; }
          .nav-link { text-align: left; padding: 14px 20px; font-size: 14px; }
          .dropdown-menu { position: static; box-shadow: none; transform: none; border-radius: 0; }
          .dropdown-parent:hover > .dropdown-menu { display: none; }
          .dropdown-menu.mobile-open { display: block !important; }
          .dropdown-link { padding-left: 40px; font-size: 13px; }
        }
      `}</style>
      <div className="header-spacer" style={{ height: headerHeight }} />
      <header className="header-bar" ref={headerRef}>
        {/* Top row: logo + phone */}
        <div className="header-top">
          <Link href="/">
            <Image
              src="https://legacystructuresusa.com/wp-content/uploads/2025/07/LEGECY-STRUCTURES-dark-blue-1.png"
              alt="Legacy Structures"
              width={280}
              height={90}
              style={{ maxHeight: "70px", width: "auto", height: "auto", filter: "brightness(0) invert(1)" }}
              priority
            />
          </Link>
          <a href="tel:518-544-2889" className="header-phone">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            518-544-2889
          </a>
        </div>

        {/* Nav row */}
        <nav className="nav-bar">
          <div className="nav-toggle">
            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              <span /><span /><span />
            </button>
          </div>
          <ul className={`nav-list${mobileOpen ? " open" : ""}`}>
            {navLinks.map((item) => (
              <li key={item.label} className={`nav-item${item.hasDropdown ? " dropdown-parent" : ""}`}>
                <Link
                  href={item.href}
                  className={`nav-link${!item.hasDropdown && isActive(item.href) ? " active" : ""}`}
                  onClick={
                    item.hasDropdown
                      ? (e) => {
                          if (typeof window !== "undefined" && window.innerWidth <= 768) {
                            e.preventDefault();
                            setMobileSubOpen(!mobileSubOpen);
                          }
                        }
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
        </nav>
      </header>
    </>
  );
}
