"use client";

import { motion } from "framer-motion";
import { useSimulation, type ViewMode } from "@/store/useSimulation";

export function ViewModeToggle() {
  const viewMode = useSimulation((s) => s.viewMode);
  const setViewMode = useSimulation((s) => s.setViewMode);

  return (
    <div className="flex items-center gap-1 bg-surface/80 border border-border-dim rounded-sm p-0.5">
      {(["recruiter", "engineer"] as ViewMode[]).map((mode) => (
        <button
          key={mode}
          onClick={() => setViewMode(mode)}
          className={`
            relative px-3 py-1 text-[10px] font-mono tracking-[0.15em] uppercase cursor-pointer
            transition-colors duration-200 rounded-sm
            ${viewMode === mode
              ? "text-cyan"
              : "text-foreground/25 hover:text-foreground/40"
            }
          `}
        >
          {viewMode === mode && (
            <motion.div
              layoutId="viewmode-bg"
              className="absolute inset-0 bg-cyan/8 border border-cyan/15 rounded-sm"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{mode}</span>
        </button>
      ))}
    </div>
  );
}
