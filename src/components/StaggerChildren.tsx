"use client";

import type { CSSProperties, ReactNode } from "react";

export function StaggerChildren({ children, className, stagger = 0.08 }: { children: ReactNode; className?: string; stagger?: number }) {
  return (
    <div
      className={className}
      data-motion-managed="true"
      style={{ "--stagger-step": `${stagger * 1000}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function StaggerItem({ children, y = 20, className }: { children: ReactNode; y?: number; className?: string }) {
  return (
    <div
      className={["motion-reveal", className].filter(Boolean).join(" ")}
      data-motion-managed="true"
      style={{ "--motion-y": `${y}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}
