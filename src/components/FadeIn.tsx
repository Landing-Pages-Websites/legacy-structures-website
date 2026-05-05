import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

export default function FadeIn({ children, className }: FadeInProps) {
  return <div className={className}>{children}</div>;
}
