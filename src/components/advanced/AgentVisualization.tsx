"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AI_AGENTS = [
  { id: "dms", name: "DMS Agent", desc: "Driver Monitoring via MediaPipe face/eye tracking", product: "PravahVedam", color: "#00ff88" },
  { id: "v2v", name: "V2V Comm Agent", desc: "Vehicle-to-Vehicle communication protocol", product: "PravahVedam", color: "#00ff88" },
  { id: "route", name: "Route Optimizer", desc: "AI-powered optimal route planning", product: "PravahVedam", color: "#00ff88" },
  { id: "maint", name: "Predictive Maintenance", desc: "Failure prediction from sensor telemetry", product: "PravahVedam", color: "#00ff88" },
  { id: "alert", name: "Alert Dispatcher", desc: "Real-time threat alerting system", product: "PravahVedam", color: "#00ff88" },
  { id: "fleet", name: "Fleet Orchestrator", desc: "Multi-agent coordination hub", product: "PravahVedam", color: "#00ff88" },
  { id: "fuel", name: "Fuel Optimizer", desc: "Consumption analysis and optimization", product: "PravahVedam", color: "#00ff88" },
  { id: "principal", name: "Virtual Principal", desc: "Autonomous institutional operations AI", product: "ShikshaVedam", color: "#00f0ff" },
  { id: "rag", name: "RAG Pipeline Agent", desc: "10K+ document retrieval and synthesis", product: "ShikshaVedam", color: "#00f0ff" },
  { id: "adgen", name: "Ad Generation AI", desc: "Gemini-powered creative generation", product: "PracharVedam", color: "#f000ff" },
  { id: "drone", name: "Drone Detector", desc: "YOLOv10 real-time threat detection", product: "AstraVedam", color: "#ff3333" },
];

export function AgentVisualization() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const cx = 200, cy = 200;

  const agentPositions = useMemo(() => {
    return AI_AGENTS.map((agent, i) => {
      const angle = (i / AI_AGENTS.length) * Math.PI * 2 - Math.PI / 2;
      const r = 130;
      return { ...agent, x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
    });
  }, []);

  const active = selectedAgent ? agentPositions.find((a) => a.id === selectedAgent) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-center">
        <div className="text-[10px] font-mono tracking-[0.3em] text-foreground/30 mb-2">MULTI-AGENT ORCHESTRATION</div>
        <h2 className="text-2xl font-mono font-bold text-magenta glow-magenta">AI AGENT NETWORK</h2>
        <p className="text-xs font-mono text-foreground/30 mt-2">11 specialized agents across 4 products — click to inspect</p>
      </motion.div>

      <div className="relative w-full aspect-square max-h-[480px] border border-border-dim bg-surface/40">
        <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="agent-glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Orbit ring */}
          <circle cx={cx} cy={cy} r="130" fill="none" stroke="#f000ff15" strokeWidth="0.8" strokeDasharray="6,4" />
          <circle cx={cx} cy={cy} r="90" fill="none" stroke="#f000ff08" strokeWidth="0.5" />

          {/* Core */}
          <circle cx={cx} cy={cy} r="35" fill="#f000ff08" stroke="#f000ff44" strokeWidth="1" filter="url(#agent-glow)" />
          <text x={cx} y={cy - 6} textAnchor="middle" fill="#f000ff88" fontSize="7" fontFamily="monospace" fontWeight="bold">LANGGRAPH</text>
          <text x={cx} y={cy + 4} textAnchor="middle" fill="#f000ff66" fontSize="6" fontFamily="monospace">ORCHESTRATOR</text>
          <text x={cx} y={cy + 14} textAnchor="middle" fill="#f000ff44" fontSize="8" fontFamily="monospace" fontWeight="bold">11</text>

          {/* Connection lines from core to each agent */}
          {agentPositions.map((a) => (
            <line
              key={`line-${a.id}`}
              x1={cx} y1={cy} x2={a.x} y2={a.y}
              stroke={selectedAgent === a.id ? a.color : "#f000ff"}
              strokeWidth={selectedAgent === a.id ? 1 : 0.3}
              opacity={selectedAgent === a.id ? 0.6 : 0.1}
              strokeDasharray={selectedAgent === a.id ? undefined : "3,5"}
            />
          ))}

          {/* Agent nodes */}
          {agentPositions.map((a) => {
            const isSelected = selectedAgent === a.id;
            return (
              <g
                key={a.id}
                onClick={() => setSelectedAgent(isSelected ? null : a.id)}
                style={{ cursor: "pointer" }}
                role="button"
                aria-label={`${a.name}: ${a.desc}`}
              >
                {isSelected && (
                  <circle cx={a.x} cy={a.y} r="18" fill={`${a.color}12`} stroke={`${a.color}55`} strokeWidth="0.6" filter="url(#agent-glow)" />
                )}
                <circle
                  cx={a.x} cy={a.y} r="10"
                  fill={`${a.color}${isSelected ? "55" : "22"}`}
                  stroke={a.color}
                  strokeWidth={isSelected ? 1.5 : 0.6}
                  filter={isSelected ? "url(#agent-glow)" : undefined}
                />
                <text
                  x={a.x} y={a.y + 18}
                  textAnchor="middle"
                  fill={isSelected ? "#fff" : `${a.color}aa`}
                  fontSize={isSelected ? 7 : 5.5}
                  fontFamily="monospace"
                  fontWeight={isSelected ? "bold" : "normal"}
                >
                  {a.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Detail panel */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="absolute top-3 right-3 w-56 px-4 py-3 bg-surface/95 border border-border-dim z-10"
            >
              <p className="text-sm font-mono font-bold" style={{ color: active.color }}>{active.name}</p>
              <p className="text-[10px] font-mono text-foreground/40 mt-1">{active.desc}</p>
              <div className="mt-2 pt-2 border-t border-border-dim">
                <span className="text-[9px] font-mono text-foreground/25 tracking-widest">PRODUCT: </span>
                <span className="text-[10px] font-mono text-green">{active.product}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Agent count by product */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { name: "PravahVedam", count: 7, color: "#00ff88" },
          { name: "ShikshaVedam", count: 2, color: "#00f0ff" },
          { name: "PracharVedam", count: 1, color: "#f000ff" },
          { name: "AstraVedam", count: 1, color: "#ff3333" },
        ].map((p) => (
          <div key={p.name} className="border border-border-dim p-3 text-center">
            <div className="text-lg font-mono font-bold" style={{ color: p.color }}>{p.count}</div>
            <div className="text-[9px] font-mono text-foreground/25 tracking-wider">{p.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
