"use client";

import { useState, useEffect } from "react";

function useLiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

function SignalBar() {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStrength((s) => (s >= 4 ? 0 : s + 1));
    }, 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-end gap-[2px] h-3">
      {[1, 2, 3, 4].map((level) => (
        <div
          key={level}
          className="w-[3px] transition-opacity duration-200"
          style={{
            height: `${level * 3}px`,
            backgroundColor: level <= strength ? "#00d4ff" : "#162030",
            opacity: level <= strength ? 0.7 : 0.3,
          }}
        />
      ))}
    </div>
  );
}

function BlinkingDot({ delay = 0 }: { delay?: number }) {
  return (
    <span
      className="inline-block w-1 h-1 rounded-full bg-cyan/50 animate-pulse-subtle"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

export function HudOverlay() {
  const clock = useLiveClock();

  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-cyan/15" />
      <div className="absolute top-4 right-4 w-6 h-6 border-r border-t border-cyan/15" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-l border-b border-cyan/15" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-cyan/15" />

      {/* Top-right: live clock */}
      <div className="absolute top-6 right-8 flex items-center gap-3">
        <SignalBar />
        <span className="text-[10px] font-mono text-foreground/20 tabular-nums tracking-wider">
          {clock}
        </span>
        <BlinkingDot />
      </div>

      {/* Bottom-left: status panel */}
      <div className="absolute bottom-8 left-8 space-y-1.5">
        <div className="flex items-center gap-2">
          <BlinkingDot delay={0} />
          <span className="text-[9px] font-mono tracking-[0.2em] text-foreground/15 uppercase">
            Status: Production
          </span>
        </div>
        <div className="flex items-center gap-2">
          <BlinkingDot delay={400} />
          <span className="text-[9px] font-mono tracking-[0.2em] text-foreground/15 uppercase">
            Agents: 11 Active
          </span>
        </div>
        <div className="flex items-center gap-2">
          <BlinkingDot delay={800} />
          <span className="text-[9px] font-mono tracking-[0.2em] text-foreground/15 uppercase">
            Services: 6 Deployed
          </span>
        </div>
      </div>

      {/* Occasional horizontal data pulse */}
      <DataPulse />
    </div>
  );
}

function DataPulse() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setActive(true);
      setTimeout(() => setActive(false), 1200);
    };
    // First pulse after 5s, then every 12-20s randomly
    const first = setTimeout(trigger, 5000);
    const interval = setInterval(() => {
      trigger();
    }, 12000 + Math.random() * 8000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, []);

  if (!active) return null;

  return (
    <div className="absolute top-1/2 left-0 right-0 h-[1px] overflow-hidden">
      <div
        className="h-full w-64 bg-gradient-to-r from-transparent via-cyan/20 to-transparent"
        style={{
          animation: "sweep 1.2s linear forwards",
        }}
      />
    </div>
  );
}
