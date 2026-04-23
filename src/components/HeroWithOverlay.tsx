"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroSlider from "./HeroSlider";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
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
    <div style={{ position: "relative" }}>
      <HeroSlider />

      {/* Dark gradient + content overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.2))",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          style={{
            textAlign: "center",
            maxWidth: 980,
            pointerEvents: "auto",
          }}
        >
          <motion.h1
            variants={item}
            style={{
              fontFamily: "var(--font-bricolage)",
              fontSize: "clamp(40px, 7vw, 80px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: 0,
              textShadow: "0 2px 18px rgba(0,0,0,0.35)",
            }}
          >
            Built to Last in Hudson Falls, NY
          </motion.h1>

          <motion.p
            variants={item}
            style={{
              marginTop: 20,
              color: "rgba(255,255,255,0.92)",
              fontFamily: "var(--font-poppins)",
              fontSize: "clamp(15px, 1.6vw, 19px)",
              fontWeight: 400,
              lineHeight: 1.5,
              maxWidth: 720,
              marginLeft: "auto",
              marginRight: "auto",
              textShadow: "0 1px 8px rgba(0,0,0,0.4)",
            }}
          >
            Premium storage sheds, barns, cabins, and garages — delivered ready to use.
          </motion.p>

          <motion.div
            variants={item}
            style={{
              marginTop: 32,
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <Link
                href="/inventory"
                style={{
                  display: "inline-block",
                  background: "#d4a017",
                  color: "#fff",
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 700,
                  fontSize: 15,
                  padding: "14px 34px",
                  borderRadius: 6,
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                }}
              >
                Browse Inventory
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <a
                href="https://orders.barnportal.com/myquote?dealerid=&dir=1&template=1"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: "transparent",
                  color: "#fff",
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 700,
                  fontSize: 15,
                  padding: "12px 32px",
                  borderRadius: 6,
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  border: "2px solid #fff",
                }}
              >
                Design Your Shed
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
