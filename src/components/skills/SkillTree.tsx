"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILL_TREE, CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/data";
import { useSimulation } from "@/store/useSimulation";

const MISSIONS_USING_SKILL: Record<string, string[]> = {
  Python: ["ShikshaVedam", "PracharVedam", "PravahVedam", "AstraVedam", "Vebot"],
  FastAPI: ["ShikshaVedam", "PracharVedam", "PravahVedam", "AstraVedam", "Vebot"],
  LangChain: ["ShikshaVedam", "Vebot"],
  LangGraph: ["ShikshaVedam"],
  RAG: ["ShikshaVedam"],
  PostgreSQL: ["ShikshaVedam", "PracharVedam", "PravahVedam", "AstraVedam", "Vebot"],
  pgvector: ["ShikshaVedam"],
  ClickHouse: ["PracharVedam"],
  Redis: ["PracharVedam", "PravahVedam", "AstraVedam", "Vebot"],
  YOLOv10: ["AstraVedam", "PravahVedam"],
  Gemini: ["ShikshaVedam", "PracharVedam"],
  "Vertex AI": ["ShikshaVedam", "PracharVedam"],
  MediaPipe: ["PravahVedam"],
  Ollama: ["PravahVedam"],
  Docker: ["PracharVedam", "PravahVedam", "AstraVedam", "Vebot"],
  "CI/CD": ["PracharVedam"],
  Git: ["All Projects"],
  React: ["ShikshaVedam", "PracharVedam"],
  "Next.js": ["ShikshaVedam", "PracharVedam"],
  TypeScript: ["ShikshaVedam", "PracharVedam"],
  "Tailwind CSS": ["ShikshaVedam", "PracharVedam"],
  OpenCV: ["AstraVedam"],
};

interface SkillPos {
  x: number;
  y: number;
  name: string;
  level: number;
  category: string;
  color: string;
}

export function SkillTree() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const systemStrengthIndex = useSimulation((s) => s.systemStrengthIndex);

  const categories = useMemo(() => Object.keys(SKILL_TREE), []);

  // Radial positions — spread evenly around center, padded from edges
  const constellationPositions = useMemo<SkillPos[]>(() => {
    const positions: SkillPos[] = [];
    const cx = 250, cy = 250;
    const catAngles: Record<string, number> = {
      backend: -Math.PI / 2,
      ai: 0,
      devops: Math.PI / 2,
      frontend: Math.PI,
    };

    Object.entries(SKILL_TREE).forEach(([cat, skills]) => {
      const base = catAngles[cat] ?? 0;
      const spread = Math.PI / (2.2);
      const count = skills.length;
      skills.forEach((skill, i) => {
        const angle = base - spread / 2 + (spread / Math.max(count - 1, 1)) * i;
        const radius = 90 + (skill.level / 100) * 80;
        positions.push({
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
          name: skill.name,
          level: skill.level,
          category: cat,
          color: CATEGORY_COLORS[cat],
        });
      });
    });
    return positions;
  }, []);

  // Connections — skills used in same projects
  const connections = useMemo(() => {
    const conns: { from: number; to: number }[] = [];
    for (let i = 0; i < constellationPositions.length; i++) {
      for (let j = i + 1; j < constellationPositions.length; j++) {
        const a = MISSIONS_USING_SKILL[constellationPositions[i].name] || [];
        const b = MISSIONS_USING_SKILL[constellationPositions[j].name] || [];
        if (a.some((p) => b.includes(p))) conns.push({ from: i, to: j });
      }
    }
    return conns;
  }, [constellationPositions]);

  const visiblePositions = activeCategory
    ? constellationPositions.filter((p) => p.category === activeCategory)
    : constellationPositions;

  const visibleNames = useMemo(() => new Set(visiblePositions.map((p) => p.name)), [visiblePositions]);

  const handleNodeClick = useCallback((name: string) => {
    setSelectedSkill((prev) => (prev === name ? null : name));
  }, []);

  const activeSkill = selectedSkill || hoveredSkill;
  const activeSkillData = activeSkill ? constellationPositions.find((s) => s.name === activeSkill) : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-center">
        <div className="text-[10px] font-mono tracking-[0.3em] text-foreground/30 mb-2">OPERATOR CAPABILITIES</div>
        <h2 className="text-2xl font-mono font-bold text-cyan glow-cyan">SKILL CONSTELLATION</h2>
      </motion.div>

      {/* System Strength Index */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-wrap items-center justify-center gap-4 px-6 py-3 border border-border-dim bg-surface/60">
          <span className="text-[10px] font-mono tracking-widest text-foreground/30">SYSTEM STRENGTH INDEX</span>
          <div className="w-32 h-2 bg-surface-light rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${systemStrengthIndex}%` }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="h-full bg-cyan rounded-full"
              style={{ boxShadow: "0 0 10px #00f0ff88" }}
            />
          </div>
          <span className="text-sm font-mono font-bold text-cyan">{systemStrengthIndex}/100</span>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] border transition-colors duration-150 cursor-pointer uppercase ${
            !activeCategory ? "border-cyan/50 text-cyan bg-cyan/10" : "border-border-dim text-foreground/40 hover:text-foreground/60"
          }`}
        >
          ALL
        </button>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          const color = CATEGORY_COLORS[cat];
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(isActive ? null : cat)}
              className="px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] border transition-colors duration-150 cursor-pointer uppercase"
              style={{
                borderColor: isActive ? `${color}88` : "var(--border-dim)",
                color: isActive ? color : "var(--foreground)",
                opacity: isActive ? 1 : 0.5,
                backgroundColor: isActive ? `${color}15` : "transparent",
              }}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          );
        })}
      </div>

      {/* SVG Constellation — responsive via viewBox */}
      <div className="relative w-full aspect-square max-h-[520px] border border-border-dim bg-surface/40">
        <svg
          className="w-full h-full"
          viewBox="0 0 500 500"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Skill constellation diagram"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glow-strong">
              <feGaussianBlur stdDeviation="5" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Radial guide rings */}
          <circle cx="250" cy="250" r="100" fill="none" stroke="#00f0ff08" strokeWidth="0.5" strokeDasharray="4,6" />
          <circle cx="250" cy="250" r="150" fill="none" stroke="#00f0ff06" strokeWidth="0.5" strokeDasharray="4,6" />

          {/* Connection lines */}
          {!activeCategory &&
            connections.map(({ from, to }, i) => {
              const a = constellationPositions[from];
              const b = constellationPositions[to];
              const isLit = activeSkill === a.name || activeSkill === b.name;
              return (
                <line
                  key={`c-${i}`}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={isLit ? a.color : "#00f0ff"}
                  strokeWidth={isLit ? 1.2 : 0.3}
                  opacity={isLit ? 0.7 : 0.12}
                  filter={isLit ? "url(#glow)" : undefined}
                />
              );
            })}

          {/* Category region labels — high contrast */}
          <text x="250" y="28" textAnchor="middle" fill="#00f0ff66" fontSize="10" fontFamily="monospace" fontWeight="bold">BACKEND</text>
          <text x="475" y="254" textAnchor="end" fill="#f000ff66" fontSize="10" fontFamily="monospace" fontWeight="bold">AI / ML</text>
          <text x="250" y="492" textAnchor="middle" fill="#00ff8866" fontSize="10" fontFamily="monospace" fontWeight="bold">DEVOPS</text>
          <text x="25" y="254" textAnchor="start" fill="#ffaa0066" fontSize="10" fontFamily="monospace" fontWeight="bold">FRONTEND</text>

          {/* Center core */}
          <circle cx="250" cy="250" r="28" fill="#00f0ff08" stroke="#00f0ff44" strokeWidth="1" filter="url(#glow)" />
          <text x="250" y="247" textAnchor="middle" fill="#00f0ff88" fontSize="8" fontFamily="monospace" fontWeight="bold">CORE</text>
          <text x="250" y="259" textAnchor="middle" fill="#00f0ff66" fontSize="10" fontFamily="monospace" fontWeight="bold">{systemStrengthIndex}%</text>

          {/* Skill nodes */}
          {visiblePositions.map((pos) => {
            const isHovered = activeSkill === pos.name;
            const r = 5 + (pos.level / 100) * 6;
            return (
              <g
                key={pos.name}
                onMouseEnter={() => setHoveredSkill(pos.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                onClick={() => handleNodeClick(pos.name)}
                style={{ cursor: "pointer" }}
                role="button"
                aria-label={`${pos.name}: level ${pos.level}`}
              >
                {/* Glow halo */}
                {isHovered && (
                  <circle cx={pos.x} cy={pos.y} r={r + 8} fill={`${pos.color}18`} stroke={`${pos.color}55`} strokeWidth="0.8" filter="url(#glow-strong)" />
                )}
                {/* Main node */}
                <circle
                  cx={pos.x} cy={pos.y} r={r}
                  fill={`${pos.color}${isHovered ? "66" : "33"}`}
                  stroke={pos.color}
                  strokeWidth={isHovered ? 1.5 : 0.8}
                  filter={isHovered ? "url(#glow-strong)" : "url(#glow)"}
                />
                {/* Label — always visible with decent contrast */}
                <text
                  x={pos.x} y={pos.y + r + 12}
                  textAnchor="middle"
                  fill={isHovered ? "#ffffff" : `${pos.color}cc`}
                  fontSize={isHovered ? 9 : 7.5}
                  fontFamily="monospace"
                  fontWeight={isHovered ? "bold" : "normal"}
                >
                  {pos.name}
                </text>
                {/* Level badge */}
                <text x={pos.x} y={pos.y + 3} textAnchor="middle" fill={isHovered ? "#fff" : `${pos.color}aa`} fontSize={isHovered ? 8 : 6} fontFamily="monospace" fontWeight="bold">
                  {pos.level}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Info panel */}
        <AnimatePresence>
          {activeSkillData && (
            <motion.div
              key={activeSkill}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-3 right-3 w-52 px-4 py-3 bg-surface/95 border border-border-dim z-10"
            >
              <p className="text-sm font-mono font-bold" style={{ color: activeSkillData.color }}>{activeSkillData.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1.5 bg-surface-light rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${activeSkillData.level}%`, backgroundColor: activeSkillData.color }} />
                </div>
                <span className="text-[10px] font-mono text-foreground/50">{activeSkillData.level}/100</span>
              </div>
              <p className="text-[10px] font-mono text-foreground/30 mt-1 uppercase tracking-wider">
                {CATEGORY_LABELS[activeSkillData.category]}
              </p>
              {MISSIONS_USING_SKILL[activeSkillData.name] && (
                <div className="mt-2 pt-2 border-t border-border-dim">
                  <p className="text-[9px] font-mono text-foreground/25 tracking-widest mb-1">DEPLOYED IN:</p>
                  {MISSIONS_USING_SKILL[activeSkillData.name].map((m) => (
                    <p key={m} className="text-[10px] font-mono text-green">• {m}</p>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Category averages */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {categories.map((cat) => {
          const skills = SKILL_TREE[cat];
          const avgLevel = Math.round(skills.reduce((a, s) => a + s.level, 0) / skills.length);
          const color = CATEGORY_COLORS[cat];
          return (
            <button
              key={cat}
              className="border border-border-dim p-3 text-center cursor-pointer hover:bg-surface/40 transition-colors duration-150"
              style={{ borderColor: activeCategory === cat ? `${color}55` : undefined }}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            >
              <div className="text-[10px] font-mono tracking-widest text-foreground/30 uppercase mb-1">{cat}</div>
              <div className="text-lg font-mono font-bold" style={{ color }}>{avgLevel}</div>
              <div className="text-[9px] font-mono text-foreground/20">AVG PROFICIENCY</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
