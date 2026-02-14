"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  className?: string;
  showValue?: boolean;
  label?: string;
  delay?: number;
}

export function ProgressBar({ value, max, color = "#00f0ff", className, showValue = true, label, delay = 0 }: ProgressBarProps) {
  const pct = (value / max) * 100;

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-[11px] font-mono text-foreground/60">{label}</span>}
          {showValue && <span className="text-[11px] font-mono" style={{ color }}>{value}/{max}</span>}
        </div>
      )}
      <div className="relative h-1.5 bg-border-dim overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}44` }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
