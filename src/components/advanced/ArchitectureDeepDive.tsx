"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HudFrame } from "@/components/ui/HudFrame";

type ViewMode = "recruiter" | "engineer";

const RECRUITER_VIEW = [
  { title: "5 Production Systems", desc: "EdTech, AdTech, Fleet Intelligence, Defense, Conversational AI", color: "#00f0ff" },
  { title: "11 AI Agents", desc: "Autonomous agents handling monitoring, routing, detection, and orchestration", color: "#f000ff" },
  { title: "6 Microservices", desc: "Independent, scalable services with event-driven communication", color: "#00ff88" },
  { title: "Full-Stack Ownership", desc: "Backend, AI/ML, DevOps, Frontend — end-to-end system delivery", color: "#ffaa00" },
];

const ENGINEER_LAYERS = [
  {
    name: "PRESENTATION LAYER",
    color: "#ffaa00",
    items: ["Next.js 14 App Router", "React Server Components", "Tailwind CSS + Framer Motion", "Real-time WebSocket dashboards"],
  },
  {
    name: "API GATEWAY",
    color: "#00f0ff",
    items: ["FastAPI with async endpoints", "Keycloak RBAC authorization", "Rate limiting + request validation", "OpenAPI auto-documentation"],
  },
  {
    name: "AI / ORCHESTRATION",
    color: "#f000ff",
    items: ["LangGraph state machines", "LangChain agent tooling", "RAG pipeline (chunk → embed → retrieve → generate)", "Gemini / Vertex AI / Ollama inference"],
  },
  {
    name: "DATA LAYER",
    color: "#00ff88",
    items: ["PostgreSQL + pgvector (semantic search)", "ClickHouse (real-time analytics)", "Redis (sessions, caching, pub/sub)", "Event-driven message bus"],
  },
  {
    name: "INFRASTRUCTURE",
    color: "#ff3333",
    items: ["Docker containerization", "CI/CD pipelines", "Edge deployment (YOLOv10)", "WebSocket real-time transport"],
  },
];

export function ArchitectureDeepDive() {
  const [mode, setMode] = useState<ViewMode>("recruiter");

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-center">
        <div className="text-[10px] font-mono tracking-[0.3em] text-foreground/30 mb-2">SYSTEM ARCHITECTURE</div>
        <h2 className="text-2xl font-mono font-bold text-cyan glow-cyan">ARCHITECTURE DEEP DIVE</h2>
      </motion.div>

      {/* Mode toggle */}
      <div className="flex justify-center gap-2 mb-8">
        <button
          onClick={() => setMode("recruiter")}
          className={`px-5 py-2 font-mono text-xs tracking-[0.15em] border transition-colors duration-150 cursor-pointer ${
            mode === "recruiter"
              ? "border-cyan/50 text-cyan bg-cyan/10"
              : "border-border-dim text-foreground/40 hover:text-foreground/60"
          }`}
        >
          RECRUITER MODE
        </button>
        <button
          onClick={() => setMode("engineer")}
          className={`px-5 py-2 font-mono text-xs tracking-[0.15em] border transition-colors duration-150 cursor-pointer ${
            mode === "engineer"
              ? "border-magenta/50 text-magenta bg-magenta/10"
              : "border-border-dim text-foreground/40 hover:text-foreground/60"
          }`}
        >
          ENGINEER MODE
        </button>
      </div>

      <AnimatePresence mode="wait">
        {mode === "recruiter" ? (
          <motion.div
            key="recruiter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {RECRUITER_VIEW.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="border border-border-dim bg-surface/40 p-5"
              >
                <h3 className="text-lg font-mono font-bold mb-2" style={{ color: item.color }}>
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-foreground/40 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="engineer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            {ENGINEER_LAYERS.map((layer, i) => (
              <motion.div
                key={layer.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <HudFrame glowColor={layer.color} className="p-4" animate={false}>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-40">
                      <span className="text-[10px] font-mono tracking-[0.2em] font-bold" style={{ color: layer.color }}>
                        {layer.name}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {layer.items.map((item) => (
                        <span key={item} className="text-xs font-mono text-foreground/50">
                          • {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </HudFrame>
              </motion.div>
            ))}

            {/* Security callout */}
            <div className="border border-red/20 bg-red/5 p-4 mt-4">
              <span className="text-[10px] font-mono tracking-widest text-red/60 font-bold">SECURITY:</span>
              <span className="text-xs font-mono text-foreground/40 ml-2">
                Keycloak RBAC • JWT validation • Row-level security • Encrypted sessions • Geofence enforcement
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
