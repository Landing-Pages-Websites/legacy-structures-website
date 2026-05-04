"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useCallback, useEffect, useRef } from "react";

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

const INTERVAL = 6000;

export default function HeroWithOverlay() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const pausedAtRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  /* Auto-advance */
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next, paused]);

  /* Progress bar RAF */
  useEffect(() => {
    startTimeRef.current = Date.now();
    setProgress(0);

    const tick = () => {
      if (!paused) {
        const elapsed = Date.now() - startTimeRef.current;
        setProgress(Math.min(elapsed / INTERVAL, 1));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [current, paused]);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  /* Pause on hover handlers */
  const handleMouseEnter = useCallback(() => {
    setPaused(true);
    pausedAtRef.current = Date.now();
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPaused(false);
    startTimeRef.current = Date.now() - (pausedAtRef.current - startTimeRef.current);
  }, []);

  return (
    <>
      <style>{`
        .hero-slide-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
          background: #0f2440;
        }
        .hero-arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 5;
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.35);
          width: 46px;
          height: 46px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.22s, border-color 0.22s, transform 0.22s;
          padding: 0;
        }
        .hero-arrow-btn:hover {
          background: rgba(255,255,255,0.32);
          border-color: rgba(255,255,255,0.6);
          transform: translateY(-50%) scale(1.1);
        }
        .hero-dot-btn {
          border: none;
          cursor: pointer;
          padding: 0;
          transition: width 0.35s ease, background 0.35s ease;
          border-radius: 4px;
          height: 8px;
        }
      `}</style>

      <section
        style={{ position: "relative", width: "100%", background: "#0f2440", overflow: "hidden" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Hero image carousel"
      >
        <div style={{ position: "relative", width: "100%", height: "clamp(230px, 24.5vw, 470px)" }}>

          {/* Slides */}
          {slides.map((slide, idx) => {
            const isActive = idx === current;
            const imgEl = (
              <img
                src={slide.src}
                alt={slide.alt}
                draggable={false}
                className="hero-slide-img"
              />
            );

            return (
              <div
                key={idx}
                className={isActive ? "hero-slide-active" : "hero-slide-inactive"}
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: isActive ? 1 : 0,
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 0.75s ease",
                  pointerEvents: isActive ? "auto" : "none",
                  overflow: "hidden",
                }}
              >
                {slide.external ? (
                  <a
                    href={slide.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "block", width: "100%", height: "100%" }}
                    aria-label={slide.alt}
                    tabIndex={isActive ? 0 : -1}
                  >
                    {imgEl}
                  </a>
                ) : (
                  <a
                    href={slide.href}
                    style={{ display: "block", width: "100%", height: "100%" }}
                    aria-label={slide.alt}
                    tabIndex={isActive ? 0 : -1}
                  >
                    {imgEl}
                  </a>
                )}
              </div>
            );
          })}

          {/* Subtle bottom vignette */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
              background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.22))",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Prev Arrow */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="hero-arrow-btn"
            style={{ left: 16 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="hero-arrow-btn"
            style={{ right: 16 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div
            aria-label="Slide indicators"
            style={{
              position: "absolute",
              bottom: 18,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 6,
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === current ? "true" : undefined}
                className="hero-dot-btn"
                style={{
                  width: idx === current ? 26 : 8,
                  background: idx === current ? "#ffc400" : "rgba(255,255,255,0.55)",
                }}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              background: "rgba(255,255,255,0.15)",
              zIndex: 7,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress * 100}%`,
                background: "#ffc400",
                transition: progress === 0 ? "none" : "width 0.1s linear",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
