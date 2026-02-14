"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSimulation } from "@/store/useSimulation";

function AnimatedUptime() {
  const [uptime, setUptime] = useState(99.97);

  useEffect(() => {
    const id = setInterval(() => {
      setUptime((prev) => {
        const next = prev + 0.001;
        return next >= 99.999 ? 99.97 : parseFloat(next.toFixed(3));
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return <span className="tabular-nums">{uptime.toFixed(2)}%</span>;
}

export function SystemStatusBar() {
  const viewMode = useSimulation((s) => s.viewMode);
  const architectMode = useSimulation((s) => s.architectMode);

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border-dim bg-background/90 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-1.5">
        {/* Left: core status */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none">
          <StatusItem
            label="System"
            value="PRODUCTION"
            color="text-green/60"
            dot="bg-green/60"
          />
          <StatusItem
            label="Agents"
            value="11 ACTIVE"
            color="text-cyan/50"
            dot="bg-cyan/50"
          />
          <StatusItem
            label="Services"
            value="6 DEPLOYED"
            color="text-cyan/50"
            dot="bg-cyan/50"
          />
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-[9px] font-mono text-foreground/20 tracking-wider uppercase">Uptime:</span>
            <span className="text-[9px] font-mono text-green/50 tracking-wider">
              <AnimatedUptime />
            </span>
          </div>
        </div>

        {/* Right: mode indicators */}
        <div className="flex items-center gap-3">
          {architectMode && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[9px] font-mono tracking-[0.2em] text-magenta/50 uppercase hidden sm:inline"
            >
              Architect Access
            </motion.span>
          )}
          <span className="text-[9px] font-mono tracking-wider text-foreground/15 uppercase">
            {viewMode} mode
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function StatusItem({
  label,
  value,
  color,
  dot,
}: {
  label: string;
  value: string;
  color: string;
  dot: string;
}) {
  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap">
      <span className={`w-1 h-1 rounded-full ${dot} animate-pulse-subtle`} />
      <span className="text-[9px] font-mono text-foreground/20 tracking-wider uppercase">
        {label}:
      </span>
      <span className={`text-[9px] font-mono tracking-wider uppercase ${color}`}>
        {value}
      </span>
    </div>
  );
}
