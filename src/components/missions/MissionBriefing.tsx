"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Mission, ArchNode } from "@/lib/data";
import { useSimulation } from "@/store/useSimulation";
import { HudFrame } from "@/components/ui/HudFrame";

function InteractiveArchDiagram({ nodes, color }: { nodes: ArchNode[]; color: string }) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [animatedConnections, setAnimatedConnections] = useState<Set<string>>(new Set());

  const typeColors: Record<string, string> = {
    input: "#00f0ff",
    process: "#ffaa00",
    output: "#00ff88",
    ai: "#f000ff",
    database: "#ff3333",
  };

  // Simulate request flow on node hover
  const handleNodeHover = (nodeId: string) => {
    setHoveredNode(nodeId);
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      const newConns = new Set<string>();
      newConns.add(nodeId);
      node.connections.forEach((c) => newConns.add(c));
      setAnimatedConnections(newConns);
    }
  };

  return (
    <div className="relative w-full" style={{ height: 280 }}>
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Connection lines */}
        {nodes.map((node) =>
          node.connections.map((targetId) => {
            const target = nodes.find((n) => n.id === targetId);
            if (!target) return null;
            const isActive = animatedConnections.has(node.id) && animatedConnections.has(targetId);
            return (
              <motion.line
                key={`${node.id}-${targetId}`}
                x1={node.x}
                y1={node.y}
                x2={target.x}
                y2={target.y}
                stroke={isActive ? color : `${color}22`}
                strokeWidth={isActive ? 0.4 : 0.2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            );
          })
        )}

        {/* Data flow particles on active connections */}
        {hoveredNode &&
          nodes
            .find((n) => n.id === hoveredNode)
            ?.connections.map((targetId) => {
              const source = nodes.find((n) => n.id === hoveredNode);
              const target = nodes.find((n) => n.id === targetId);
              if (!source || !target) return null;
              return (
                <motion.circle
                  key={`flow-${hoveredNode}-${targetId}`}
                  r={0.6}
                  fill={color}
                  initial={{ cx: source.x, cy: source.y, opacity: 0 }}
                  animate={{
                    cx: [source.x, target.x],
                    cy: [source.y, target.y],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  style={{ filter: `drop-shadow(0 0 3px ${color})` }}
                />
              );
            })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const nodeColor = typeColors[node.type] || color;
          const isHovered = hoveredNode === node.id;
          const isConnected = animatedConnections.has(node.id);
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              onMouseEnter={() => handleNodeHover(node.id)}
              onMouseLeave={() => {
                setHoveredNode(null);
                setAnimatedConnections(new Set());
              }}
              style={{ cursor: "pointer" }}
            >
              {/* Node glow */}
              {(isHovered || isConnected) && (
                <circle cx={node.x} cy={node.y} r={4} fill={`${nodeColor}15`} />
              )}
              {/* Node shape */}
              <rect
                x={node.x - 3}
                y={node.y - 2}
                width={6}
                height={4}
                rx={0.5}
                fill={`${nodeColor}${isHovered ? "44" : "22"}`}
                stroke={nodeColor}
                strokeWidth={isHovered ? 0.3 : 0.15}
              />
              {/* Label */}
              <text
                x={node.x}
                y={node.y + 0.5}
                textAnchor="middle"
                fill={isHovered ? "#fff" : `${nodeColor}cc`}
                fontSize={1.8}
                fontFamily="monospace"
              >
                {node.label}
              </text>
            </motion.g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-2 justify-center">
        {Object.entries(typeColors).map(([type, clr]) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className="w-2 h-2" style={{ backgroundColor: clr + "44", border: `1px solid ${clr}` }} />
            <span className="text-[9px] font-mono text-foreground/30 uppercase">{type}</span>
          </div>
        ))}
      </div>

      {/* Hovered node details */}
      {hoveredNode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-2 right-2 px-3 py-2 bg-surface/90 border border-border-dim backdrop-blur-sm"
        >
          <p className="text-[10px] font-mono text-cyan">
            {nodes.find((n) => n.id === hoveredNode)?.label}
          </p>
          <p className="text-[9px] font-mono text-foreground/30 mt-0.5">
            Type: {nodes.find((n) => n.id === hoveredNode)?.type?.toUpperCase()}
          </p>
          <p className="text-[9px] font-mono text-foreground/20 mt-0.5">
            Connections: {nodes.find((n) => n.id === hoveredNode)?.connections.length || 0}
          </p>
        </motion.div>
      )}
    </div>
  );
}

interface MissionBriefingProps {
  mission: Mission;
}

export function MissionBriefing({ mission }: MissionBriefingProps) {
  const { closeMission } = useSimulation();

  const statusColor = {
    ACTIVE: "#00ff88",
    DEPLOYED: "#00f0ff",
    CLASSIFIED: "#ff3333",
  }[mission.status];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-4 py-8"
    >
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={closeMission}
        className="mb-6 text-xs font-mono tracking-widest text-foreground/30 hover:text-cyan transition-colors cursor-pointer flex items-center gap-2"
      >
        ← RETURN TO MISSION HUB
      </motion.button>

      {/* Mission header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{mission.icon}</span>
          <div className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: `${mission.color}88` }}>
            {mission.domain} // {mission.subtitle}
          </div>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-mono font-bold mb-1"
          style={{ color: mission.color, textShadow: `0 0 20px ${mission.color}44` }}
        >
          {mission.codename}
        </h1>
        <div className="flex flex-wrap items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ backgroundColor: statusColor }} />
            <span className="text-[10px] font-mono tracking-wider" style={{ color: statusColor }}>{mission.status}</span>
          </div>
          <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 border" style={{ color: mission.color, borderColor: `${mission.color}33` }}>
            THREAT: {mission.threatLevel}
          </span>
          <span className="text-[10px] font-mono tracking-widest" style={{ color: mission.color }}>
            IMPACT: {mission.impactScore}/100
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HudFrame title="PROBLEM STATEMENT" glowColor={mission.color} className="p-5">
          <p className="text-sm font-mono text-foreground/60 leading-relaxed">{mission.problem}</p>
        </HudFrame>
        <HudFrame title="ARCHITECTURE OVERVIEW" glowColor={mission.color} className="p-5">
          <p className="text-sm font-mono text-foreground/60 leading-relaxed">{mission.architecture}</p>
        </HudFrame>
      </div>

      {/* Interactive Architecture Diagram */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6">
        <HudFrame title="LIVE SYSTEM ARCHITECTURE" glowColor={mission.color} className="p-6" animate={false}>
          <p className="text-[10px] font-mono text-foreground/25 mb-4 tracking-widest">
            HOVER NODES TO SIMULATE REQUEST FLOW
          </p>
          <InteractiveArchDiagram nodes={mission.architectureNodes} color={mission.color} />
        </HudFrame>
      </motion.div>

      {/* Tech Stack */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6">
        <HudFrame title="TECH STACK" glowColor={mission.color} className="p-5" animate={false}>
          <div className="flex flex-wrap gap-2">
            {mission.techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="text-xs font-mono px-3 py-1.5 border glitch-hover"
                style={{ color: mission.color, borderColor: `${mission.color}33`, backgroundColor: `${mission.color}08` }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </HudFrame>
      </motion.div>

      {/* Impact */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-6">
        <HudFrame title="MISSION IMPACT" glowColor={mission.color} className="p-5" animate={false}>
          <div className="space-y-3">
            {mission.impact.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="mt-1 w-1.5 h-1.5 shrink-0" style={{ backgroundColor: mission.color, boxShadow: `0 0 6px ${mission.color}` }} />
                <span className="text-sm font-mono text-foreground/60">{item}</span>
              </motion.div>
            ))}
          </div>
        </HudFrame>
      </motion.div>
    </motion.div>
  );
}
