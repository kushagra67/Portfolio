"use client";

import { motion } from "framer-motion";
import { useSimulation, type SystemSection, type ViewMode } from "@/store/useSimulation";

const NAV_ITEMS: { id: SystemSection; label: string }[] = [
  { id: "missions", label: "Systems" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "agents", label: "Agents" },
  { id: "impact", label: "Impact" },
  { id: "architecture", label: "Arch" },
  { id: "console", label: "Console" },
  { id: "timeline", label: "Timeline" },
  { id: "contact", label: "Contact" },
];

export function NavigationHud() {
  const activeSection = useSimulation((s) => s.activeSection);
  const setActiveSection = useSimulation((s) => s.setActiveSection);
  const viewMode = useSimulation((s) => s.viewMode);
  const setViewMode = useSimulation((s) => s.setViewMode);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-background/95 border-b border-border-dim"
    >
      <div className="max-w-5xl mx-auto px-2 sm:px-4 py-1.5">
        {/* Row 1: Nav items — horizontally scrollable */}
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`
                  relative px-2.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-[13px] tracking-wide whitespace-nowrap
                  transition-colors duration-150 cursor-pointer rounded-sm hover-glitch btn-sweep shrink-0
                  ${isActive
                    ? "text-cyan font-medium"
                    : "text-foreground/35 hover:text-foreground/60"
                  }
                `}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-cyan/60 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Row 2 (mobile) / inline (desktop): View mode toggle */}
        <div className="flex justify-center sm:justify-end pt-1.5 sm:pt-0 sm:-mt-[34px]">
          <div className="flex items-center gap-0.5 bg-surface/80 border border-border-dim rounded-sm p-0.5">
            {(["recruiter", "engineer"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`
                  relative px-3 py-1 text-[9px] sm:text-[10px] font-mono tracking-[0.12em] uppercase cursor-pointer
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
        </div>
      </div>
    </motion.nav>
  );
}
