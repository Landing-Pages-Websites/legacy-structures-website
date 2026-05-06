"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteAssets } from "@/lib/site-assets";

const slides = [
  {
    ...siteAssets.heroSlides[0],
    alt: "Get pricing on your dream shed",
    href: "#pricing-form",
    external: false,
  },
  {
    ...siteAssets.heroSlides[1],
    alt: "View our inventory",
    href: "/inventory",
    external: false,
  },
  {
    ...siteAssets.heroSlides[2],
    alt: "Build your own shed in 3D",
    href: "https://orders.barnportal.com/myquote?dealerid=&dir=1&template=1",
    external: true,
  },
];

const INTERVAL = 6000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  /* Auto-advance timer */
  useEffect(() => {
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  /* Progress bar animation */
  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      setProgress(Math.min(elapsed / INTERVAL, 1));
      progressRef.current = requestAnimationFrame(tick);
    };
    progressRef.current = requestAnimationFrame(tick);
    return () => {
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
    };
  }, [current]);

  return (
    <section className="home-hero relative w-full overflow-hidden">
      <style>{`
        .hero-slide-wrap { aspect-ratio: 16/6; }
        @media (max-width: 960px) { .hero-slide-wrap { aspect-ratio: 16/8; } }
        @media (max-width: 640px) { .hero-slide-wrap { aspect-ratio: 4/3; } }
      `}</style>
      <div className="hero-slide-wrap relative w-full">
        {/* All slides stacked for crossfade */}
        {slides.map((slide, idx) => {
          const isActive = idx === current;
          const inner = (
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="100vw"
              preload={idx === 0}
              fetchPriority={idx === 0 ? "high" : "auto"}
              loading={idx === 0 ? "eager" : "lazy"}
              style={{ objectPosition: "center 35%" }}
              draggable={false}
            />
          );
          return (
            <div
              key={idx}
              className="absolute inset-0"
              style={{
                opacity: isActive ? 1 : 0,
                transition: "opacity 0.5s ease",
                zIndex: isActive ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              {slide.external ? (
                <a href={slide.href} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  {inner}
                </a>
              ) : (
                <Link href={slide.href} className="block w-full h-full">
                  {inner}
                </Link>
              )}
            </div>
          );
        })}

        {/* Bottom gradient overlay (reduced so image shows more) */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "72px",
            background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.16))",
            zIndex: 2,
          }}
        />

        {/* Prev Arrow */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer"
          style={{
            backgroundColor: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Next Arrow */}
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer"
          style={{
            backgroundColor: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>

        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "3px", backgroundColor: "rgba(255,255,255,0.2)", zIndex: 3 }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress * 100}%`,
              backgroundColor: "#fff",
              transition: progress === 0 ? "none" : undefined,
            }}
          />
        </div>
      </div>
    </section>
  );
}
