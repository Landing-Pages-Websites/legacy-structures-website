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
        .hdr-top { background: #fff; padding: 16px 24px; border-bottom: 1px solid #e8e4df; }
        .hdr-inner { max-width: 1150px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .hdr-phone { display: flex; align-items: center; gap: 8px; color: #1a3a5c; text-decoration: none; font-weight: 600; font-size: 18px; font-family: var(--font-poppins), Poppins, sans-serif; transition: color 0.2s; }
        .hdr-phone:hover { color: #c0392b; }
        .hdr-phone svg { color: #c0392b; }

        .nav-wrap { background: #1a3a5c; width: 100%; position: sticky; top: 0; z-index: 50; }
        .nav-inner { max-width: 1150px; margin: 0 auto; }
        .nav-toggle { display: none; padding: 12px 16px; }
        .nav-toggle button { background: none; border: none; color: #fff; font-size: 24px; cursor: pointer; display: flex; flex-direction: column; gap: 5px; padding: 4px; }
        .nav-toggle button span { display: block; width: 22px; height: 2px; background: #fff; border-radius: 2px; transition: all 0.3s; }
        .nav-list { display: flex; justify-content: center; list-style: none; margin: 0; padding: 0; gap: 0; }
        .nav-item { position: relative; }
        .nav-link { display: block; padding: 14px 24px; color: rgba(255,255,255,0.85) !important; font-family: var(--font-poppins), Poppins, sans-serif; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; text-decoration: none; text-align: center; background: transparent; transition: all 0.2s ease; }
        .nav-link:hover, .nav-link.active { color: #fff !important; background: rgba(255,255,255,0.1); }
        .nav-link.active { border-bottom: 2px solid #d4a017; }

        .dropdown-menu { display: none; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); background: #fff; box-shadow: 0 8px 32px rgba(0,0,0,0.12); border-radius: 0 0 8px 8px; z-index: 1000; list-style: none; margin: 0; padding: 8px 0; min-width: 220px; }
        .dropdown-parent:hover > .dropdown-menu { display: block; }
        .dropdown-link { display: block; padding: 10px 20px; color: #2c3e50 !important; font-family: var(--font-poppins), Poppins, sans-serif; font-size: 14px; font-weight: 500; text-decoration: none; transition: all 0.15s ease; }
        .dropdown-link:hover { background: #f7f5f2; color: #c0392b !important; padding-left: 24px; }

        @media (max-width: 768px) {
          .hdr-inner { flex-direction: column; gap: 12px; }
          .nav-toggle { display: block; text-align: right; }
          .nav-list { display: none; flex-direction: column; }
          .nav-list.open { display: flex !important; }
          .nav-link { text-align: left; padding: 12px 20px; }
          .dropdown-menu { position: static; box-shadow: none; transform: none; border-radius: 0; }
          .dropdown-parent:hover > .dropdown-menu { display: none; }
          .dropdown-menu.mobile-open { display: block !important; }
          .dropdown-link { padding-left: 36px; font-size: 13px; }
        }
      `}</style>
      <header>
        <div className="hdr-top">
          <div className="hdr-inner">
            <Link href="/">
              <Image
                src="https://legacystructuresusa.com/wp-content/uploads/2025/07/LEGECY-STRUCTURES-dark-blue-1.png"
                alt="Legacy Structures"
                width={280}
                height={90}
                style={{ maxHeight: "80px", width: "auto", height: "auto" }}
                priority
              />
            </Link>
            <a href="tel:518-544-2889" className="hdr-phone">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              518-544-2889
            </a>
          </div>
        </div>

        <div className="nav-wrap">
          <div className="nav-inner">
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
          </div>
        </div>
      </header>
    </>
  );
}
