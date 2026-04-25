"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function HeroWithOverlay() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "clamp(440px, 65vh, 620px)",
        background:
          "linear-gradient(135deg, #1a3a5c 0%, #0f2440 50%, #1a3a5c 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        overflow: "hidden",
      }}
    >
      {/* Decorative grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />

      {/* Soft gold glow accent */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          right: "-200px",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(212,160,23,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-200px",
          left: "-150px",
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(192,57,43,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(212,160,23,0.7), transparent)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{
          textAlign: "center",
          maxWidth: 1000,
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.div
          variants={item}
          style={{
            display: "inline-block",
            marginBottom: 24,
            padding: "6px 16px",
            background: "rgba(212,160,23,0.15)",
            border: "1px solid rgba(212,160,23,0.4)",
            borderRadius: 999,
            color: "#f0c040",
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "var(--font-poppins)",
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          Hudson Falls, NY · Family-Owned
        </motion.div>

        <motion.h1
          variants={item}
          style={{
            fontFamily: "var(--font-bricolage)",
            fontSize: "clamp(40px, 7.5vw, 84px)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
            margin: 0,
          }}
        >
          Built to Last.
          <br />
          <span style={{ color: "#f0c040" }}>Built for You.</span>
        </motion.h1>

        <motion.p
          variants={item}
          style={{
            marginTop: 24,
            color: "rgba(255,255,255,0.82)",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "clamp(16px, 1.7vw, 19px)",
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: 720,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Premium storage sheds, lofted barns, cabins, garages, chicken coops
          &amp; greenhouses — delivered fully assembled to your property.
        </motion.p>

        <motion.div
          variants={item}
          style={{
            marginTop: 40,
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <motion.div
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            <Link
              href="/inventory"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#d4a017",
                color: "#fff",
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: 15,
                padding: "16px 36px",
                borderRadius: 8,
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: 1,
                boxShadow: "0 12px 32px rgba(212,160,23,0.4)",
              }}
            >
              Browse Inventory →
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            <a
              href="https://orders.barnportal.com/myquote?dealerid=&dir=1&template=1"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: 15,
                padding: "14px 34px",
                borderRadius: 8,
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: 1,
                border: "2px solid rgba(255,255,255,0.4)",
                backdropFilter: "blur(8px)",
              }}
            >
              Design Your Shed
            </a>
          </motion.div>

          <motion.div
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            <a
              href="tel:518-544-2889"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#c0392b",
                color: "#fff",
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: 15,
                padding: "16px 30px",
                borderRadius: 8,
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: 1,
                boxShadow: "0 12px 32px rgba(192,57,43,0.4)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call Now
            </a>
          </motion.div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          variants={item}
          style={{
            marginTop: 48,
            display: "flex",
            gap: 32,
            justifyContent: "center",
            flexWrap: "wrap",
            color: "rgba(255,255,255,0.6)",
            fontSize: 13,
            fontFamily: "var(--font-inter)",
            fontWeight: 500,
          }}
        >
          <span>✓ Free Delivery (30 mi)</span>
          <span>✓ Rent-to-Own Available</span>
          <span>✓ 5-Year Warranty</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
