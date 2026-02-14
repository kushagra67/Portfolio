"use client";

import { motion } from "framer-motion";
import { useSimulation, type SystemSection } from "@/store/useSimulation";

const NAV_ITEMS: { id: SystemSection; label: string }[] = [
  { id: "missions", label: "Systems" },
  { id: "skills", label: "Skills" },
  { id: "agents", label: "Agents" },
  { id: "impact", label: "Impact" },
  { id: "architecture", label: "Architecture" },
  { id: "console", label: "Console" },
  { id: "timeline", label: "Timeline" },
  { id: "contact", label: "Contact" },
];

export function NavigationHud() {
  const activeSection = useSimulation((s) => s.activeSection);
  const setActiveSection = useSimulation((s) => s.setActiveSection);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-background/80 backdrop-blur-md border-b border-border-dim"
    >
      <div className="max-w-5xl mx-auto flex items-center gap-1 px-4 py-2 overflow-x-auto scrollbar-none">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`
                relative px-4 py-2 text-[13px] tracking-wide whitespace-nowrap
                transition-colors duration-150 cursor-pointer rounded-sm hover-glitch btn-sweep
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
    </motion.nav>
  );
}
