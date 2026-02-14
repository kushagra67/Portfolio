"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface HudFrameProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  glowColor?: string;
  animate?: boolean;
}

export function HudFrame({ children, title, className, glowColor = "#00f0ff", animate = true }: HudFrameProps) {
  if (!animate) {
    return (
      <div
        className={cn(
          "relative border border-border-dim bg-surface/80 backdrop-blur-sm",
          className
        )}
        style={{ boxShadow: `0 0 20px ${glowColor}11, inset 0 0 20px ${glowColor}05` }}
      >
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: `${glowColor}66` }} />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: `${glowColor}66` }} />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: `${glowColor}66` }} />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: `${glowColor}66` }} />
        {title && (
          <div
            className="absolute -top-3 left-4 px-2 text-[10px] tracking-[0.2em] uppercase font-mono"
            style={{ color: glowColor, background: "var(--surface)" }}
          >
            {title}
          </div>
        )}
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "relative border border-border-dim bg-surface/80 backdrop-blur-sm",
        className
      )}
      style={{ boxShadow: `0 0 20px ${glowColor}11, inset 0 0 20px ${glowColor}05` }}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: `${glowColor}66` }} />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: `${glowColor}66` }} />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: `${glowColor}66` }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: `${glowColor}66` }} />

      {title && (
        <div
          className="absolute -top-3 left-4 px-2 text-[10px] tracking-[0.2em] uppercase font-mono"
          style={{ color: glowColor, background: "var(--surface)" }}
        >
          {title}
        </div>
      )}
      {children}
    </motion.div>
  );
}
