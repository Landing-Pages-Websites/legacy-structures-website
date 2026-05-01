"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useCallback } from "react";
import { motion } from "framer-motion";

// Marketing slider images from the original WP site - they have baked-in CTAs already
const slides = [
  {
    src: "https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/territory3-slider.jpg",
    alt: "Buildings As Low As $103/mo - Get Our Pricing",
    href: "/rent-to-own",
    external: false,
  },
  {
    src: "https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/byo-hero-slider-2.jpg",
    alt: "See Our Inventory - Storage Sheds",
    href: "/inventory",
    external: false,
  },
  {
    src: "https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/byo-hero-slider-3.jpg",
    alt: "Design Your Own Shed in 3D",
    href: "https://orders.barnportal.com/myquote?dealerid=&dir=1&template=1",
    external: true,
  },
];

export default function HeroWithOverlay() {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1)),
    []
  );
  const next = useCallback(
    () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1)),
    []
  );

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        background: "#0f2440",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "clamp(230px, 24.5vw, 470px)" }}>
        {slides.map((slide, idx) => {
          const isActive = idx === current;
          const ImageEl = (
            <img
              src={slide.src}
              alt={slide.alt}
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
          );
          return (
            <motion.div
              key={idx}
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: isActive ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              {slide.external ? (
                <a
                  href={slide.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", width: "100%", height: "100%" }}
                  aria-label={slide.alt}
                >
                  {ImageEl}
                </a>
              ) : (
                <a
                  href={slide.href}
                  style={{ display: "block", width: "100%", height: "100%" }}
                  aria-label={slide.alt}
                >
                  {ImageEl}
                </a>
              )}
            </motion.div>
          );
        })}

        {/* Prev arrow */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 5,
            background: "transparent",
            color: "#777",
            border: "none",
            width: 54,
            height: 80,
            borderRadius: 0,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#555";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#777";
          }}
        >
          <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Next arrow */}
        <button
          onClick={next}
          aria-label="Next slide"
          style={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 5,
            background: "transparent",
            color: "#777",
            border: "none",
            width: 54,
            height: 80,
            borderRadius: 0,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#555";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#777";
          }}
        >
          <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>

      </div>
    </section>
  );
}
