"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { siteAssets } from "@/lib/site-assets";

const slides = [
  {
    ...siteAssets.heroSlides[0],
    alt: "Buildings As Low As $103/mo - Get Our Pricing",
    href: "/rent-to-own",
    external: false,
  },
  {
    ...siteAssets.heroSlides[1],
    alt: "See Our Inventory - Storage Sheds",
    href: "/inventory",
    external: false,
  },
  {
    ...siteAssets.heroSlides[2],
    alt: "Design Your Own Shed in 3D",
    href: "https://orders.barnportal.com/myquote?dealerid=&dir=1&template=1",
    external: true,
  },
] as const;

const INTERVAL = 6000;

export default function HeroWithOverlay() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
  }, []);

  const next = useCallback(() => {
    setCurrent((value) => (value + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((value) => (value === 0 ? slides.length - 1 : value - 1));
  }, []);

  useEffect(() => {
    if (paused) return;
    const timeoutId = window.setTimeout(next, INTERVAL);
    return () => window.clearTimeout(timeoutId);
  }, [current, paused, next]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <>
      <style>{`
        @keyframes hero-progress-fill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .hero-slide-img {
          object-fit: cover;
          object-position: center 30%;
        }
        .hero-slide-wrap {
          position: relative;
          width: 100%;
          height: clamp(480px, 55vw, 700px);
        }
        @media (max-width: 960px) {
          .hero-slide-wrap { height: clamp(320px, 48vw, 480px); }
        }
        @media (max-width: 600px) {
          .hero-slide-wrap { height: clamp(180px, 58vw, 320px); }
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
          width: 48px;
          height: 48px;
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
          transform: translateY(-50%) scale(1.08);
        }
        .hero-dot-btn {
          border: none;
          cursor: pointer;
          padding: 12px 8px;
          width: 24px;
          height: 32px;
          background: transparent;
        }
        .hero-dot-pill {
          display: block;
          width: 100%;
          height: 8px;
          border-radius: 4px;
          transition: transform 0.35s ease, background 0.35s ease;
          transform-origin: center;
        }
        .hero-progress-fill {
          height: 100%;
          background: #ffc400;
          transform-origin: left center;
          animation: hero-progress-fill 6000ms linear forwards;
        }
      `}</style>

      <section
        style={{ position: "relative", width: "100%", overflow: "hidden" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Hero image carousel"
      >
        <div className="hero-slide-wrap">
          {slides.map((slide, idx) => {
            const isActive = idx === current;
            const image = (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="hero-slide-img"
                sizes="100vw"
                preload={idx === 0}
                fetchPriority={idx === 0 ? "high" : "auto"}
                loading={idx === 0 ? "eager" : "lazy"}
              />
            );

            return (
              <div
                key={slide.href}
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
                    style={{ display: "block", position: "relative", width: "100%", height: "100%" }}
                    aria-label={slide.alt}
                    tabIndex={isActive ? 0 : -1}
                  >
                    {image}
                  </a>
                ) : (
                  <a
                    href={slide.href}
                    style={{ display: "block", position: "relative", width: "100%", height: "100%" }}
                    aria-label={slide.alt}
                    tabIndex={isActive ? 0 : -1}
                  >
                    {image}
                  </a>
                )}
              </div>
            );
          })}

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
            {slides.map((slide, idx) => (
              <button
                key={slide.href}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === current ? "true" : undefined}
                className="hero-dot-btn"
              >
                <span
                  className="hero-dot-pill"
                  style={{
                    background: idx === current ? "#ffc400" : "rgba(255,255,255,0.55)",
                    transform: `scaleX(${idx === current ? 1 : 0.33})`,
                  }}
                />
              </button>
            ))}
          </div>

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
              key={`${current}-${paused ? "paused" : "running"}`}
              className="hero-progress-fill"
              style={{ animationPlayState: paused ? "paused" : "running" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
