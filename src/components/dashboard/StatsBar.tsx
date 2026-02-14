"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface MetricItem {
  value: number;
  suffix: string;
  label: string;
}

const IMPACT_METRICS: MetricItem[] = [
  { value: 5, suffix: "", label: "Production Systems" },
  { value: 11, suffix: "", label: "AI Agents" },
  { value: 6, suffix: "", label: "Microservices" },
  { value: 1, suffix: "M+", label: "Data Rows" },
  { value: 35, suffix: "%", label: "Perf Optimization" },
  { value: 95, suffix: "%", label: "Automation Precision" },
];

function useCountUp(target: number, duration: number = 1.8) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

export function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="border-b border-border-dim bg-surface/30"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-3 sm:grid-cols-6 gap-6 py-6 px-6">
        {IMPACT_METRICS.map((metric, i) => (
          <MetricCell key={metric.label} metric={metric} delay={i * 0.06} />
        ))}
      </div>
    </motion.div>
  );
}

function MetricCell({ metric, delay }: { metric: MetricItem; delay: number }) {
  const { count, ref } = useCountUp(metric.value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + 0.3, duration: 0.4 }}
      className="flex flex-col items-center gap-1"
    >
      <span className="text-xl sm:text-2xl font-mono font-bold text-cyan tabular-nums tracking-tight">
        {count.toLocaleString()}{metric.suffix}
      </span>
      <span className="text-[10px] font-mono tracking-[0.15em] text-foreground/30 uppercase text-center leading-tight">
        {metric.label}
      </span>
    </motion.div>
  );
}
