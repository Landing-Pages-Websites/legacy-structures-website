"use client";

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

export default function FeaturedCarousel({ sheds }: { sheds: FeaturedShed[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

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
    const cardWidth = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: direction === "right" ? cardWidth : -cardWidth, behavior: "smooth" });
  };

  return (
    <div style={{ position: "relative", padding: "0 50px 28px" }}>
      {/* Prev Arrow */}
      <button
        onClick={() => scrollByCard("left")}
        aria-label="Previous"
        disabled={!canScrollLeft}
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          background: "transparent",
          color: canScrollLeft ? "#777" : "rgba(119,119,119,0.35)",
          border: "none",
          width: 54,
          height: 70,
          borderRadius: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: canScrollLeft ? "pointer" : "not-allowed",
          transition: "color 0.2s ease",
        }}
      >
        <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next Arrow */}
      <button
        onClick={() => scrollByCard("right")}
        aria-label="Next"
        disabled={!canScrollRight}
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          background: "transparent",
          color: canScrollRight ? "#777" : "rgba(119,119,119,0.35)",
          border: "none",
          width: 54,
          height: 70,
          borderRadius: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: canScrollRight ? "pointer" : "not-allowed",
          transition: "color 0.2s ease",
        }}
      >
        <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: 34,
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingBottom: 8,
        }}
        className="featured-carousel-track"
      >
        <style>{`
          .featured-carousel-track::-webkit-scrollbar { display: none; }
        `}</style>

        {sheds.map((shed) => (
          <div
            key={shed.href}
            data-card
            style={{
              flex: "0 0 calc(33.333% - 23px)",
              minWidth: 280,
              background: "transparent",
              scrollSnapAlign: "start",
              overflow: "hidden",
            }}
          >
            <Link href={shed.href} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
              {/* Image */}
              <div style={{ position: "relative", height: 245, overflow: "hidden", background: "#fff" }}>
                <div
                  style={{
                    backgroundImage: `url(${shed.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>

              {/* Info */}
              <div style={{ padding: "15px 12px 17px", background: "#006580", textAlign: "center" }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#fff", fontFamily: "Arial, sans-serif", lineHeight: 1.08 }}>
                  {shed.name}
                </div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "Arial, sans-serif", lineHeight: 1.08 }}>
                  {formatPrice(shed.price)}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 14 }}>
        {sheds.slice(0, 10).map((shed, idx) => (
          <button
            key={shed.href}
            onClick={() => {
              const el = scrollRef.current;
              const card = el?.querySelector("[data-card]") as HTMLElement | null;
              if (!el || !card) return;
              el.scrollTo({ left: idx * (card.offsetWidth + 34), behavior: "smooth" });
            }}
            aria-label={`Go to featured shed ${idx + 1}`}
            style={{
              width: 13,
              height: 13,
              borderRadius: "50%",
              border: "none",
              background: idx === 2 ? "#000" : "#777",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
