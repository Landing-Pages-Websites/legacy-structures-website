"use client";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  variant?: "navy" | "light" | "image";
}

// Default fallback image (a clean shed lineup) used when variant is "navy" but we still want some imagery
const DEFAULT_BG_IMAGE =
  "https://legacystructuresusa.com/wp-content/themes/barndealer/assets/images/byo-hero-slider-3.jpg";

export default function PageHero({
  title,
  subtitle,
  backgroundImage,
  variant = "navy",
}: PageHeroProps) {
  // Use the provided image, or default for navy variant
  const imageToUse = backgroundImage || (variant === "navy" ? DEFAULT_BG_IMAGE : undefined);

  const bgStyle: React.CSSProperties =
    variant === "light"
      ? { background: "linear-gradient(135deg, #f7f5f2 0%, #eae7e2 100%)" }
      : imageToUse
      ? {
          backgroundImage: `linear-gradient(135deg, rgba(15,36,64,0.92) 0%, rgba(26,58,92,0.78) 50%, rgba(15,36,64,0.85) 100%), url(${imageToUse})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#0f2440",
        }
      : { background: "linear-gradient(135deg, #1a3a5c 0%, #0f2440 100%)" };

  const textColor = variant === "light" ? "#1a3a5c" : "#fff";
  const subtitleColor = variant === "light" ? "#5a6c7e" : "rgba(255,255,255,0.85)";

  return (
    <section
      style={{
        ...bgStyle,
        padding: "96px 24px 110px",
        marginBottom: 64,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle dot grid pattern overlay */}
      {variant !== "light" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Soft gold glow accent */}
      {variant !== "light" && (
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-150px",
            width: 500,
            height: 500,
            background: "radial-gradient(circle, rgba(212,160,23,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Top gold accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(212,160,23,0.7), transparent)",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            color: textColor,
            fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif",
            fontSize: "clamp(36px, 6.5vw, 72px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: 0,
            padding: 0,
            textShadow: variant !== "light" ? "0 2px 24px rgba(0,0,0,0.4)" : undefined,
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
              textShadow: variant !== "light" ? "0 1px 12px rgba(0,0,0,0.4)" : undefined,
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
          style={{ height: 4, background: "#d4a017", margin: "32px auto 0", borderRadius: 2 }}
        />
      </div>

      {/* Bottom angled fade for smooth transition to next section */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background: variant === "light" ? "transparent" : "linear-gradient(to bottom, transparent, rgba(0,0,0,0.25))",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
