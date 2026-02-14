"use client";

import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "ACTIVE" | "DEPLOYED" | "CLASSIFIED";
  className?: string;
}

const STATUS_COLORS = {
  ACTIVE: "#00ff88",
  DEPLOYED: "#00f0ff",
  CLASSIFIED: "#ff3333",
};

export function StatusIndicator({ status, className }: StatusIndicatorProps) {
  const color = STATUS_COLORS[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-mono", className)}>
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
        style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
      />
      <span style={{ color }}>{status}</span>
    </span>
  );
}
