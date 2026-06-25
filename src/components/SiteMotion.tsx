"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL_SELECTOR = [
  "main .motion-reveal",
  "main > div > section",
  "main section section",
  "main article",
  "main form",
  "main [class*='card']",
  "main [class*='Card']",
  "main [class*='grid'] > *",
].join(", ");

export default function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    ).filter((element) => {
      const isHeaderFooter = element.closest("header, footer");
      const isManagedChild =
        element.closest("[data-motion-managed='true']") &&
        !element.classList.contains("motion-reveal");
      const isOptedOut = element.closest(".no-motion, [data-no-motion='true']");
      const isHidden = element.offsetParent === null;

      return !isHeaderFooter && !isManagedChild && !isOptedOut && !isHidden;
    });

    elements.forEach((element, index) => {
      element.classList.add("motion-reveal");
      element.style.setProperty("--motion-delay", `${Math.min(index * 35, 180)}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
