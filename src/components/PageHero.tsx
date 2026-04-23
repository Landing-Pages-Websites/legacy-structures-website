"use client";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  variant?: "navy" | "light" | "image";
}

export default function PageHero({ title, subtitle, backgroundImage, variant = "navy" }: PageHeroProps) {
  const bgStyle: React.CSSProperties =
    variant === "image" && backgroundImage
      ? { backgroundImage: `linear-gradient(135deg, rgba(26,58,92,0.85) 0%, rgba(15,36,64,0.75) 100%), url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }
      : variant === "light"
      ? { background: "linear-gradient(135deg, #f7f5f2 0%, #eae7e2 100%)" }
      : { background: "linear-gradient(135deg, #1a3a5c 0%, #0f2440 100%)" };

  const textColor = variant === "light" ? "#1a3a5c" : "#fff";
  const subtitleColor = variant === "light" ? "#5a6c7e" : "rgba(255,255,255,0.8)";

  return (
    <section style={{ ...bgStyle, padding: "72px 24px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      {/* Subtle gradient accent */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(212,160,23,0.6), transparent)" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            color: textColor,
            fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif",
            fontSize: "clamp(32px, 6vw, 64px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: 0,
            padding: 0,
          }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              color: subtitleColor,
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: "clamp(16px, 1.8vw, 19px)",
              fontWeight: 400,
              marginTop: 20,
              maxWidth: 720,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </motion.p>
        )}
        {/* Gold accent line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: 4, background: "#d4a017", margin: "28px auto 0", borderRadius: 2 }}
        />
      </div>
    </section>
  );
}
