"use client";

import { useState } from "react";
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

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <style>{`
        .header-bar {
          position: relative;
          z-index: 50;
        }
        .header-top {
          background: #e9e6e1;
          max-width: 100%;
          padding: 30px 24px 26px;
        }
        .header-top-inner {
          max-width: 1612px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding-left: 130px;
        }
        .header-cta-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          min-width: 280px;
          padding-right: 140px;
        }
        .header-quote-btn {
          display: block;
          background: #bf1b22;
          color: #fff !important;
          font-weight: 700;
          font-size: 26px;
          line-height: 1;
          font-family: Georgia, "Times New Roman", serif;
          width: 300px;
          height: 44px;
          padding: 0 18px;
          border-radius: 5px;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0;
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .header-quote-btn:hover {
          background: #a9181e;
          color: #fff !important;
        }
        .header-phone {
          display: block;
          background: transparent;
          color: #075f81 !important;
          text-decoration: none;
          font-weight: 700;
          font-size: 27px;
          line-height: 1.05;
          font-family: Georgia, "Times New Roman", serif;
          padding-top: 4px;
          white-space: nowrap;
        }
        .header-phone:hover {
          color: #075f81 !important;
        }

        .nav-wrap-outer {
          background: #bd171f;
          width: 100%;
        }
        .nav-bar {
          max-width: 1500px;
          margin: 0 auto;
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
          gap: clamp(44px, 6vw, 120px);
          margin: 0; padding: 0;
        }
        .nav-item { position: relative; flex: 0 0 auto; }
        .nav-link {
          display: block; padding: 13px 18px 15px;
          color: #fff !important;
          font-family: var(--font-oswald), Impact, sans-serif;
          font-size: 19px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0;
          text-decoration: none; text-align: center;
          background: transparent;
        }
        .nav-link:hover { color: #fff !important; background: #a9151b; }
        .nav-link.active { color: #fff !important; }

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
          font-family: var(--font-oswald), Impact, sans-serif;
          font-size: 14px; font-weight: 500;
          text-decoration: none; transition: all 0.15s ease;
        }
        .dropdown-link:hover { background: #f7f5f2; color: #c0392b !important; padding-left: 26px; }

        @media (max-width: 768px) {
          .header-top { padding: 18px 12px; }
          .header-top-inner { flex-direction: row; gap: 8px; flex-wrap: wrap; justify-content: center; }
          .header-cta-group { min-width: 0; width: 100%; }
          .header-quote-btn { width: auto; height: auto; font-size: 22px; padding: 8px 16px; }
          .header-phone { font-size: 23px; }
          .nav-toggle { display: block; text-align: right; }
          .nav-list { display: none; flex-direction: column; background: #bd171f; }
          .nav-list.open { display: flex !important; }
          .nav-link { text-align: left; padding: 12px 20px; font-size: 18px; }
          .dropdown-menu { position: static; box-shadow: none; transform: none; border-radius: 0; }
          .dropdown-parent:hover > .dropdown-menu { display: none; }
          .dropdown-menu.mobile-open { display: block !important; }
          .dropdown-link { padding-left: 40px; font-size: 13px; }
        }
      `}</style>
      <header className="header-bar">
        {/* Top row: logo + phone */}
        <div className="header-top">
          <div className="header-top-inner">
            <Link href="/">
              <Image
                src="https://legacystructuresusa.com/wp-content/uploads/2025/07/LEGECY-STRUCTURES-dark-blue-1.png"
                alt="Legacy Structures"
                width={170}
                height={90}
                style={{ maxHeight: "132px", width: "auto", height: "auto" }}
                priority
              />
            </Link>
            <div className="header-cta-group">
              <Link href="/contact-us" className="header-quote-btn">
                Call Us Today!
              </Link>
              <a href="tel:518-544-2889" className="header-phone">
                518-544-2889
              </a>
            </div>
          </div>
        </div>

        {/* Nav row */}
        <div className="nav-wrap-outer">
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
        </div>
      </header>
    </>
  );
}
