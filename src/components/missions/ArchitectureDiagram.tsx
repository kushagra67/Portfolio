"use client";

import { motion } from "framer-motion";
import type { ArchNode } from "@/lib/data";

interface ArchitectureDiagramProps {
  nodes: ArchNode[];
  color: string;
}

const NODE_STYLES: Record<string, { bg: string; border: string }> = {
  input: { bg: "#00f0ff11", border: "#00f0ff44" },
  process: { bg: "#ffaa0011", border: "#ffaa0044" },
  output: { bg: "#00ff8811", border: "#00ff8844" },
  ai: { bg: "#f000ff11", border: "#f000ff44" },
  database: { bg: "#ff333311", border: "#ff333344" },
};

const NODE_LABEL_COLORS: Record<string, string> = {
  input: "#00f0ff",
  process: "#ffaa00",
  output: "#00ff88",
  ai: "#f000ff",
  database: "#ff3333",
};

export function ArchitectureDiagram({ nodes, color }: ArchitectureDiagramProps) {
  return (
    <div className="relative w-full h-48 sm:h-56 md:h-64">
      {/* Connection lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodes.map((node) =>
          node.connections.map((targetId) => {
            const target = nodes.find((n) => n.id === targetId);
            if (!target) return null;
            return (
              <motion.line
                key={`${node.id}-${targetId}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke={`${color}33`}
                strokeWidth="0.3"
                strokeDasharray="2,2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            );
          })
        )}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => {
        const style = NODE_STYLES[node.type] || NODE_STYLES.process;
        const labelColor = NODE_LABEL_COLORS[node.type] || color;

        return (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
            }}
          >
            <div
              className="relative px-2 py-1 sm:px-3 sm:py-1.5 border text-center whitespace-nowrap"
              style={{
                backgroundColor: style.bg,
                borderColor: style.border,
                boxShadow: `0 0 10px ${style.border}`,
              }}
            >
              <span className="text-[8px] sm:text-[10px] font-mono tracking-wider" style={{ color: labelColor }}>
                {node.label}
              </span>
              {node.type === "ai" && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-pulse-glow" style={{ backgroundColor: "#f000ff" }} />
              )}
            </div>
          </motion.div>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-0 right-0 flex flex-wrap gap-3">
        {["input", "ai", "process", "database", "output"].map((type) => (
          <div key={type} className="flex items-center gap-1">
            <span className="w-2 h-2 border" style={{ backgroundColor: NODE_STYLES[type].bg, borderColor: NODE_STYLES[type].border }} />
            <span className="text-[8px] font-mono text-foreground/30 uppercase">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
