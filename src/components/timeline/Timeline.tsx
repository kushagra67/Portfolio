"use client";

import { motion } from "framer-motion";
import { HudFrame } from "@/components/ui/HudFrame";
import { GlowText } from "@/components/ui/GlowText";
import { TIMELINE } from "@/lib/data";

const TYPE_COLORS = {
  work: "#00f0ff",
  project: "#f000ff",
  milestone: "#00ff88",
};

export function Timeline() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="text-[10px] font-mono tracking-[0.3em] text-foreground/30 mb-2">
          CAREER PROGRESSION
        </div>
        <h2 className="text-2xl font-mono font-bold">
          <GlowText color="#ffaa00">OPERATOR TIMELINE</GlowText>
        </h2>
      </motion.div>

      <div className="relative">
        {/* Central line */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute left-6 sm:left-8 top-0 w-px bg-gradient-to-b from-cyan/40 via-magenta/40 to-green/40"
        />

        <div className="space-y-6">
          {TIMELINE.map((event, i) => {
            const color = TYPE_COLORS[event.type];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative pl-16 sm:pl-20"
              >
                {/* Timeline node */}
                <div
                  className="absolute left-[18px] sm:left-[26px] top-4 w-3 h-3 border-2 transform -translate-x-1/2"
                  style={{
                    borderColor: color,
                    backgroundColor: `${color}22`,
                    boxShadow: `0 0 10px ${color}44`,
                  }}
                />

                {/* Level indicator */}
                <div
                  className="absolute left-0 top-3 text-[10px] font-mono tracking-widest"
                  style={{ color: `${color}88` }}
                >
                  L{event.level}
                </div>

                <HudFrame glowColor={color} className="p-4" animate={false}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-mono font-bold text-foreground">
                        {event.title}
                      </h3>
                    </div>
                    <span
                      className="text-[9px] font-mono tracking-widest px-2 py-0.5 border uppercase shrink-0"
                      style={{
                        color: `${color}88`,
                        borderColor: `${color}33`,
                      }}
                    >
                      {event.type}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-foreground/40 leading-relaxed">
                    {event.description}
                  </p>

                  {/* XP bar */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[9px] font-mono text-foreground/20 tracking-widest">LVL</span>
                    <div className="flex-1 h-1 bg-border-dim overflow-hidden">
                      <motion.div
                        className="h-full"
                        style={{ backgroundColor: color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(event.level / 42) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                      />
                    </div>
                    <span className="text-[9px] font-mono" style={{ color }}>
                      {event.level}/42
                    </span>
                  </div>
                </HudFrame>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
