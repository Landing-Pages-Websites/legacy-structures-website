"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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
  const itemsPerPage = 3;
  const totalPages = Math.ceil(sheds.length / itemsPerPage);
  const [page, setPage] = useState(0);

  const prev = useCallback(() => {
    setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
  }, [totalPages]);

  const next = useCallback(() => {
    setPage((p) => (p === totalPages - 1 ? 0 : p + 1));
  }, [totalPages]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const startIdx = page * itemsPerPage;
  const visible = sheds.slice(startIdx, startIdx + itemsPerPage);

  const arrowStyle: React.CSSProperties = {
    backgroundColor: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  };

  return (
    <div className="relative">
      {/* Prev Arrow */}
      <button
        onClick={prev}
        aria-label="Previous featured sheds"
        className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 text-white w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer"
        style={arrowStyle}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next Arrow */}
      <button
        onClick={next}
        aria-label="Next featured sheds"
        className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 text-white w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer"
        style={arrowStyle}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>

      {/* Items */}
      <div className="grid grid-cols-3 gap-4">
        {visible.map((shed, i) => (
          <motion.div
            key={`${shed.href}-${startIdx + i}`}
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={{
              rest: { scale: 1, y: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
              hover: {
                scale: 1.02,
                y: -4,
                boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
              },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ borderRadius: "8px" }}
          >
            <Link href={shed.href} className="block group">
              <div
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                {/* Image container with zoom-on-hover */}
                <div
                  style={{
                    position: "relative",
                    height: "280px",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    className="bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${shed.image})`,
                      width: "100%",
                      height: "100%",
                    }}
                    variants={{
                      rest: { scale: 1 },
                      hover: { scale: 1.05 },
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  {/* Hover overlay */}
                  <motion.div
                    variants={{
                      rest: { opacity: 0 },
                      hover: { opacity: 1 },
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 55%)",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      padding: "16px",
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      style={{
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "15px",
                        letterSpacing: "0.3px",
                      }}
                    >
                      View Details →
                    </span>
                  </motion.div>
                </div>
                <motion.div
                  style={{
                    backgroundColor: "#fff",
                    color: "#222",
                    textAlign: "center",
                    padding: "20px",
                    fontSize: "16px",
                    borderTop: "3px solid #00567a",
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{shed.name}</div>
                  <div style={{ color: "#999", fontSize: "12px", marginTop: "6px" }}>Starting at</div>
                  <motion.div
                    variants={{
                      rest: { scale: 1 },
                      hover: { scale: 1.08 },
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      color: "#e8573a",
                      fontWeight: 800,
                      fontSize: "18px",
                      marginTop: "2px",
                      transformOrigin: "center",
                    }}
                  >
                    {formatPrice(shed.price)}
                  </motion.div>
                </motion.div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            aria-label={`Go to page ${i + 1}`}
            className="cursor-pointer transition-colors"
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: i === page ? "#00567a" : "#ccc",
              border: "none",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
