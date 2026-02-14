"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Metric {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  color: string;
  description: string;
}

const METRICS: Metric[] = [
  { label: "ETL Rows Processed", value: 1000000, suffix: "+", color: "#00f0ff", description: "Data pipeline throughput at Nineleaps" },
  { label: "SQL Precision", value: 95, suffix: "%", color: "#00ff88", description: "AI-generated SQL query accuracy" },
  { label: "Performance Boost", value: 35, suffix: "%", color: "#f000ff", description: "System optimization improvement" },
  { label: "Reliability Increase", value: 15, suffix: "%", color: "#ffaa00", description: "Uptime & stability gains" },
  { label: "Production Products", value: 5, suffix: "", color: "#00f0ff", description: "Shipped and operational systems" },
  { label: "AI Agents Deployed", value: 11, suffix: "", color: "#f000ff", description: "Autonomous agents in production" },
  { label: "Microservices", value: 6, suffix: "", color: "#00ff88", description: "Independent service modules" },
  { label: "Threat Accuracy", value: 97, suffix: "%+", color: "#ff3333", description: "YOLOv10 drone detection precision" },
];

function useCountUp(target: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!startOnView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, startOnView]);

  return { count, ref };
}

export function ImpactMetrics() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <div className="text-[10px] font-mono tracking-[0.3em] text-foreground/30 mb-2">QUANTIFIED OUTPUT</div>
        <h2 className="text-2xl font-mono font-bold text-cyan glow-cyan">IMPACT METRICS</h2>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {METRICS.map((metric, i) => (
          <MetricCard key={metric.label} metric={metric} delay={i * 0.1} />
        ))}
      </div>
    </div>
  );
}

function MetricCard({ metric, delay }: { metric: Metric; delay: number }) {
  const { count, ref } = useCountUp(metric.value, 2000);

  const displayValue = metric.value >= 10000
    ? `${(count / 1000000).toFixed(count >= 1000000 ? 0 : 1)}M`
    : count.toLocaleString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="border border-border-dim bg-surface/40 p-4 text-center group hover:bg-surface/60 transition-colors duration-200"
    >
      <div
        className="text-2xl sm:text-3xl font-mono font-bold tabular-nums"
        style={{ color: metric.color, textShadow: `0 0 15px ${metric.color}44` }}
      >
        {metric.prefix}{displayValue}{metric.suffix}
      </div>
      <div className="text-[10px] font-mono text-foreground/30 tracking-wider mt-1 uppercase">
        {metric.label}
      </div>
      <div className="text-[9px] font-mono text-foreground/15 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {metric.description}
      </div>
    </motion.div>
  );
}
