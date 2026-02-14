"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useSimulation } from "@/store/useSimulation";

interface BootSequenceProps {
  onComplete: () => void;
}

// ─── Layer 2: Canvas particle field with mouse parallax ───
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const N = 25;
    const ps: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < N; i++) {
      ps.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.2 + 0.4,
        a: Math.random() * 0.2 + 0.06,
      });
    }

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = (mouse.current.x - 0.5) * 18;
      const my = (mouse.current.y - 0.5) * 18;

      for (const p of ps) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x + mx * p.r, p.y + my * p.r, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.a})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />;
}

// ─── Holographic AI Core: wireframe sphere + orbiting nodes ───
function HolographicCore({ phase, exiting }: { phase: number; exiting: boolean }) {
  return (
    <motion.div
      className="relative w-48 h-48 sm:w-60 sm:h-60 mx-auto mb-10"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={
        exiting
          ? { scale: [1, 2.5], opacity: [1, 0] }
          : { scale: 1, opacity: 1 }
      }
      transition={
        exiting
          ? { duration: 1, ease: [0.4, 0, 0.2, 1] }
          : { duration: 1.2, ease: "easeOut" }
      }
    >
      {/* Layer 3: Volumetric glow — breathing */}
      <div
        className="absolute inset-[-60%] pointer-events-none animate-breathe"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 55%)" }}
      />

      {/* Wireframe layer 1 — pure CSS rotate, GPU composited */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
        style={{ animation: "spin 40s linear infinite", willChange: "transform" }}
      >
        <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(0,212,255,0.06)" strokeWidth="0.5" />
        <ellipse cx="100" cy="100" rx="82" ry="28" fill="none" stroke="rgba(0,212,255,0.12)" strokeWidth="0.4" />
        <ellipse cx="100" cy="100" rx="82" ry="28" fill="none" stroke="rgba(0,212,255,0.1)" strokeWidth="0.4" transform="rotate(60 100 100)" />
        <ellipse cx="100" cy="100" rx="82" ry="28" fill="none" stroke="rgba(0,212,255,0.1)" strokeWidth="0.4" transform="rotate(120 100 100)" />
      </svg>

      {/* Wireframe layer 2 — reverse rotate */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
        style={{ animation: "spin 35s linear infinite reverse", willChange: "transform" }}
      >
        <ellipse cx="100" cy="100" rx="28" ry="82" fill="none" stroke="rgba(0,212,255,0.1)" strokeWidth="0.4" />
        <ellipse cx="100" cy="100" rx="50" ry="82" fill="none" stroke="rgba(0,212,255,0.06)" strokeWidth="0.4" transform="rotate(30 100 100)" />
      </svg>

      {/* Inner dashed ring — CSS rotate */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
        style={{ animation: "spin 20s linear infinite", willChange: "transform" }}
      >
        <circle cx="100" cy="100" r="42" fill="none" stroke="rgba(0,212,255,0.18)" strokeWidth="0.6" strokeDasharray="6 5" />
      </svg>

      {/* Orbiting micro nodes — pure CSS rotation, no JS overhead */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            animation: `spin ${16 + i * 4}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
            willChange: "transform",
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: 2,
              height: 2,
              background: `rgba(0,212,255,${0.35 + (i % 3) * 0.08})`,
              top: "50%",
              left: `${8 + i * 5}%`,
              transform: "translate(-50%,-50%)",
            }}
          />
        </div>
      ))}

      {/* Center core with glow pulse — CSS only */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-3 h-3 rounded-full animate-pulse-glow"
          style={{ background: "rgba(0,212,255,0.5)" }}
        />
      </div>

      {/* Progress arc */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
        <motion.circle
          cx="100" cy="100" r="88" fill="none" stroke="rgba(0,212,255,0.2)" strokeWidth="1.5"
          strokeLinecap="round" strokeDasharray="553"
          initial={{ strokeDashoffset: 553 }}
          animate={{ strokeDashoffset: phase >= 4 ? 0 : 553 - (phase / 4) * 553 }}
          transition={{ duration: 1, ease: "easeOut" }}
          transform="rotate(-90 100 100)"
        />
      </svg>
    </motion.div>
  );
}

// ─── Atmospheric: live clock ───
function EntryClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="absolute top-6 right-8 z-10 flex items-center gap-2">
      <span className="w-1 h-1 rounded-full bg-cyan/40 animate-pulse-subtle" />
      <span className="text-[10px] font-mono text-foreground/20 tabular-nums tracking-wider">{time}</span>
    </div>
  );
}

// ─── Atmospheric: status indicator line ───
function StatusLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-1 h-1 rounded-full bg-cyan/30 animate-pulse-subtle" style={{ animationDelay: `${delay}ms` }} />
      <span className="text-[9px] font-mono tracking-[0.2em] text-foreground/15 uppercase">{children}</span>
    </div>
  );
}

// ─── Main Entry Component ───
export function BootSequence({ onComplete }: BootSequenceProps) {
  const [phase, setPhase] = useState(0);
  const [exiting, setExiting] = useState(false);
  const bootSystem = useSimulation((s) => s.bootSystem);
  const setProgress = useSimulation((s) => s.setBootProgress);
  const completeboot = useSimulation((s) => s.completeboot);

  // Phase timeline — cinematic staged reveal
  // 0: Layers initialize (0ms)
  // 1: "Intelligence Grid Online" (500ms)
  // 2: "Architect Node Detected" (1500ms)
  // 3: Name scale-in + subtitle (2600ms)
  // 4: CTA appears (3800ms)
  useEffect(() => {
    bootSystem();
    const t = [
      setTimeout(() => { setPhase(1); setProgress(15); }, 500),
      setTimeout(() => { setPhase(2); setProgress(40); }, 1500),
      setTimeout(() => { setPhase(3); setProgress(75); }, 2600),
      setTimeout(() => { setPhase(4); setProgress(100); }, 3800),
    ];
    return () => t.forEach(clearTimeout);
  }, [bootSystem, setProgress]);

  const handleEnter = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => { completeboot(); onComplete(); }, 1000);
  }, [onComplete, completeboot, exiting]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && phase >= 4) handleEnter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, handleEnter]);

  return (
    <div className={`fixed inset-0 z-50 bg-background overflow-hidden ${exiting ? "animate-cinematic-zoom" : ""}`}>

      {/* Layer 1: Animated grid — very slow drift */}
      <div className="absolute inset-0 bg-grid-drift opacity-12" />

      {/* Layer 2: Particle field with mouse parallax */}
      <ParticleField />

      {/* Scanline overlay — very subtle */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan/15 to-transparent"
          initial={{ top: "-2%" }}
          animate={{ top: "102%" }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 25%, #060b11 75%)" }}
      />

      {/* Light burst flash on exit */}
      {exiting && (
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ duration: 0.8 }}
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.35) 0%, transparent 60%)" }}
        />
      )}

      {/* Atmospheric: clock */}
      <EntryClock />

      {/* Atmospheric: status panel */}
      <div className="absolute bottom-8 left-8 z-10 space-y-1">
        <StatusLine delay={0}>Status: Production</StatusLine>
        <StatusLine delay={300}>Agents: 11 Active</StatusLine>
        <StatusLine delay={600}>Services: 6 Deployed</StatusLine>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-5 h-5 border-l border-t border-cyan/10" />
      <div className="absolute top-4 right-4 w-5 h-5 border-r border-t border-cyan/10" />
      <div className="absolute bottom-4 left-4 w-5 h-5 border-l border-b border-cyan/10" />
      <div className="absolute bottom-4 right-4 w-5 h-5 border-r border-b border-cyan/10" />

      {/* Main content — centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">

        {/* Holographic AI Core */}
        <HolographicCore phase={phase} exiting={exiting} />

        {/* Staged text reveal — additive, each line stays */}
        <div className="text-center max-w-xl w-full space-y-3 mb-8">
          {phase >= 1 && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] font-mono tracking-[0.5em] text-foreground/18 uppercase"
            >
              Intelligence Grid Online
            </motion.p>
          )}
          {phase >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[11px] font-mono tracking-[0.35em] text-cyan/30 uppercase"
            >
              Architect Node Detected
            </motion.p>
          )}
          {phase >= 3 && (
            <motion.h1
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight pt-3"
            >
              Kushagra Singhal
            </motion.h1>
          )}
          {phase >= 3 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-xs font-mono tracking-[0.25em] text-cyan/35 uppercase"
            >
              AI Systems Architect
            </motion.p>
          )}
        </div>

        {/* CTA — enhanced with glow, sweep, scale */}
        {phase >= 4 && !exiting && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center"
          >
            <button
              onClick={handleEnter}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5
                       border border-cyan/20 text-cyan/70 font-mono text-xs tracking-[0.25em] uppercase
                       cursor-pointer btn-sweep transition-all duration-300
                       hover:bg-cyan/5 hover:border-cyan/40 hover:text-cyan
                       hover:scale-[1.03] hover:-translate-y-0.5
                       hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]"
            >
              Enter Intelligence Grid
              <span className="text-cyan/40 group-hover:text-cyan/70 group-hover:translate-x-1 transition-all duration-300">→</span>
            </button>
            <p className="text-[10px] font-mono text-foreground/10 mt-4 tracking-wider">
              Press Enter or Space
            </p>
          </motion.div>
        )}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border-dim">
        <motion.div
          className="h-full bg-cyan/40"
          initial={{ width: "0%" }}
          animate={{ width: phase >= 4 ? "100%" : `${phase * 25}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
