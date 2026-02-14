"use client";

import { motion } from "framer-motion";
import type { Mission } from "@/lib/data";
import { useSimulation } from "@/store/useSimulation";

interface MissionCardProps {
  mission: Mission;
  index: number;
}

export function MissionCard({ mission, index }: MissionCardProps) {
  const openMission = useSimulation((s) => s.openMission);
  const triggerGlitch = useSimulation((s) => s.triggerGlitch);

  const statusColor = {
    ACTIVE: "#00ff88",
    DEPLOYED: "#00f0ff",
    CLASSIFIED: "#ff3333",
  }[mission.status];

  const handleClick = () => {
    triggerGlitch();
    openMission(mission.id);
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={handleClick}
      className="group relative w-full text-left border border-border-dim bg-surface/60 backdrop-blur-sm p-5 cursor-pointer transition-all duration-300 hover:border-opacity-60 hud-corner"
      whileHover={{
        borderColor: mission.color + "44",
        boxShadow: `0 0 30px ${mission.color}15, inset 0 0 30px ${mission.color}08`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-[10px] font-mono tracking-[0.2em] text-foreground/25 uppercase mb-1">
            {mission.domain} // {mission.codename}
          </div>
          <h3 className="text-lg font-mono font-bold text-foreground/90 group-hover:text-foreground transition-colors">
            {mission.icon}{mission.title}
          </h3>
          <p className="text-[10px] font-mono mt-0.5" style={{ color: mission.color + "88" }}>
            {mission.subtitle}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
              style={{ backgroundColor: statusColor }}
            />
            <span className="text-[10px] font-mono tracking-wider" style={{ color: statusColor }}>
              {mission.status}
            </span>
          </div>
          <span
            className="text-[10px] font-mono px-1.5 py-0.5 border"
            style={{ borderColor: mission.color + "33", color: mission.color + "aa" }}
          >
            THREAT: {mission.threatLevel}
          </span>
        </div>
      </div>

      {/* Summary */}
      <p className="text-xs font-mono text-foreground/40 leading-relaxed mb-4 line-clamp-2">
        {mission.summary}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {mission.techStack.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="text-[10px] font-mono px-2 py-0.5 border border-border-dim text-foreground/30
                       group-hover:border-foreground/15 transition-colors"
          >
            {tech}
          </span>
        ))}
        {mission.techStack.length > 5 && (
          <span className="text-[10px] font-mono px-2 py-0.5 text-foreground/20">
            +{mission.techStack.length - 5}
          </span>
        )}
      </div>

      {/* Impact Bar */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono text-foreground/25 tracking-widest">IMPACT</span>
        <div className="flex-1 h-1.5 bg-surface-light rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${mission.impactScore}%` }}
            transition={{ duration: 1.2, delay: index * 0.1 + 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-full rounded-full"
            style={{ backgroundColor: mission.color, boxShadow: `0 0 8px ${mission.color}66` }}
          />
        </div>
        <span className="text-xs font-mono font-bold" style={{ color: mission.color }}>
          {mission.impactScore}
        </span>
      </div>

      {/* Hover indicator */}
      <div className="absolute bottom-2 right-3 text-[10px] font-mono text-foreground/15 group-hover:text-foreground/40 transition-colors tracking-wider">
        OPEN BRIEFING →
      </div>
    </motion.button>
  );
}
