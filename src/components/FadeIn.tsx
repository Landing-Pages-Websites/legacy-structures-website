import type { CSSProperties, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

export default function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
}: FadeInProps) {
  return (
    <div
      className={["motion-reveal", className].filter(Boolean).join(" ")}
      data-motion-managed="true"
      style={
        {
          "--motion-delay": `${delay * 1000}ms`,
          "--motion-y": `${y}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
