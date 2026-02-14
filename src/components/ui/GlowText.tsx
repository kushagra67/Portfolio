"use client";

import { cn } from "@/lib/utils";

interface GlowTextProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function GlowText({ children, color = "#00f0ff", className, as: Tag = "span" }: GlowTextProps) {
  return (
    <Tag
      className={cn("font-mono", className)}
      style={{
        color,
        textShadow: `0 0 10px ${color}88, 0 0 40px ${color}33, 0 0 80px ${color}11`,
      }}
    >
      {children}
    </Tag>
  );
}
