"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface FeaturedShed {
  name: string;
  price: number;
  image: string;
  href: string;
}

function formatPrice(price: number) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

const CARD_GAP = 24;

export default function FeaturedCarousel({ sheds }: { sheds: FeaturedShed[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    if (card) {
      const cardWidth = card.offsetWidth + CARD_GAP;
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveIdx(Math.min(Math.max(0, idx), sheds.length - 1));
    }
  }, [sheds.length]);

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByCard = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + CARD_GAP : 320;
    el.scrollBy({ left: direction === "right" ? cardWidth : -cardWidth, behavior: "smooth" });
  };

  const goToCard = (idx: number) => {
    const el = scrollRef.current;
    const card = el?.querySelector("[data-card]") as HTMLElement | null;
    if (!el || !card) return;
    el.scrollTo({ left: idx * (card.offsetWidth + CARD_GAP), behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .carousel-track::-webkit-scrollbar { display: none; }

        .carousel-card-wrap {
          flex: 0 0 calc(33.333% - 16px);
          min-width: 270px;
          scroll-snap-align: start;
          border-radius: 6px;
          overflow: hidden;
          background: transparent;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          will-change: transform;
        }
        .carousel-card-wrap:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 44px rgba(0,0,0,0.18);
        }

        .carousel-card-link {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .carousel-img-wrapper {
          position: relative;
          height: 240px;
          overflow: hidden;
          background: #f5f3f0;
        }

        .carousel-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.55s ease;
        }
        .carousel-card-wrap:hover .carousel-img {
          transform: scale(1.08);
        }

        .carousel-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.35s ease;
        }
        .carousel-card-wrap:hover .carousel-overlay {
          background: rgba(0,0,0,0.2);
        }

        .carousel-view-tag {
          background: #fff;
          color: #006580;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          padding: 7px 18px;
          border-radius: 3px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          font-family: Arial, Helvetica, sans-serif;
          white-space: nowrap;
        }
        .carousel-card-wrap:hover .carousel-view-tag {
          opacity: 1;
          transform: translateY(0);
        }

        .carousel-info {
          padding: 14px 14px 16px;
          background: #006580;
          text-align: center;
        }
        .carousel-info-name {
          font-weight: 700;
          font-size: 15px;
          color: #fff;
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.2;
          margin-bottom: 3px;
        }
        .carousel-info-price {
          font-weight: 700;
          font-size: 15px;
          color: rgba(255,255,255,0.88);
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.2;
        }

        .carousel-arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: transparent;
          border: none;
          width: 50px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease;
        }

        .carousel-dot {
          border: none;
          cursor: pointer;
          padding: 10px 0;
          width: 24px;
          height: 9px;
          border-radius: 5px;
          background: transparent;
        }
        .carousel-dot-pill {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 5px;
          transition: transform 0.32s ease, background 0.32s ease;
          transform-origin: center;
        }
      `}</style>

      <div style={{ position: "relative", padding: "0 50px 40px" }}>
        {/* Prev */}
        <button
          type="button"
          onClick={() => scrollByCard("left")}
          aria-label="Previous featured shed"
          disabled={!canScrollLeft}
          className="carousel-arrow-btn"
          style={{
            left: 0,
            color: canScrollLeft ? "#888" : "rgba(136,136,136,0.28)",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={() => scrollByCard("right")}
          aria-label="Next featured shed"
          disabled={!canScrollRight}
          className="carousel-arrow-btn"
          style={{
            right: 0,
            color: canScrollRight ? "#888" : "rgba(136,136,136,0.28)",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>

        {/* Track */}
        <div
          ref={scrollRef}
          className="carousel-track"
          style={{
            display: "flex",
            gap: CARD_GAP,
            overflowX: "auto",
            overflowY: "hidden",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingBottom: 6,
          }}
        >
          {sheds.map((shed) => (
            <div key={shed.href} data-card className="carousel-card-wrap">
              <Link href={shed.href} className="carousel-card-link">
                <div className="carousel-img-wrapper">
                  <Image
                    src={shed.image}
                    alt={shed.name}
                    fill
                    className="carousel-img"
                    sizes="(max-width: 768px) 84vw, (max-width: 1200px) 34vw, 25vw"
                    loading="lazy"
                  />
                  <div className="carousel-overlay">
                    <span className="carousel-view-tag">View Details</span>
                  </div>
                </div>
                <div className="carousel-info">
                  <div className="carousel-info-name">{shed.name}</div>
                  <div className="carousel-info-price">{formatPrice(shed.price)}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div
          role="tablist"
          aria-label="Featured sheds navigation"
          style={{
            position: "absolute",
            bottom: 4,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          {sheds.slice(0, 12).map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              onClick={() => goToCard(idx)}
              aria-label={`Go to featured shed ${idx + 1}`}
              aria-selected={idx === activeIdx}
              className="carousel-dot"
            >
              <span
                className="carousel-dot-pill"
                style={{
                  background: idx === activeIdx ? "#006580" : "#c8c4be",
                  transform: `scaleX(${idx === activeIdx ? 1 : 0.375})`,
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
