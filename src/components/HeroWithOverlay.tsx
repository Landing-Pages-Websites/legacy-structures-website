"use client";

import { useState, useCallback, useEffect } from "react";
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

const SLIDE_DURATION = 7000;

export default function HeroWithOverlay() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((idx: number) => setCurrent(idx), []);

  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1)),
    []
  );
  const next = useCallback(
    () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1)),
    []
  );

  useEffect(() => {
    const timer = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        background: "#0f2440",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/6.5" }}>
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
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            border: "none",
            width: 44,
            height: 44,
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.6)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.4)";
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            border: "none",
            width: 44,
            height: 44,
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.6)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.4)";
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>

        {/* Dots */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 5,
            display: "flex",
            gap: 10,
          }}
        >
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: idx === current ? 36 : 12,
                height: 12,
                borderRadius: 999,
                border: "none",
                background: idx === current ? "#d4a017" : "rgba(255,255,255,0.55)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
