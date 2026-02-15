"use client";

import { useState, useEffect, useCallback, useRef, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ParticleGrid } from "@/components/landing/ParticleGrid";
import { BootSequence } from "@/components/landing/BootSequence";
import { ScanLine } from "@/components/ui/ScanLine";
import { AudioToggle } from "@/components/ui/AudioToggle";
import { HudOverlay } from "@/components/ui/HudOverlay";
import { SystemStatusBar } from "@/components/ui/SystemStatusBar";
import { StatsBar } from "@/components/dashboard/StatsBar";
import { NavigationHud } from "@/components/dashboard/NavigationHud";
import { MissionCard } from "@/components/dashboard/MissionCard";
import { MissionBriefing } from "@/components/missions/MissionBriefing";
import { SkillTree } from "@/components/skills/SkillTree";
import { AIConsole } from "@/components/terminal/AIConsole";
import { Timeline } from "@/components/timeline/Timeline";
import { ContactSection } from "@/components/contact/ContactSection";
import { AgentVisualization } from "@/components/advanced/AgentVisualization";
import { ImpactMetrics } from "@/components/advanced/ImpactMetrics";
import { ArchitectureDeepDive } from "@/components/advanced/ArchitectureDeepDive";
import { PROFILE, MISSIONS } from "@/lib/data";
import { useSimulation } from "@/store/useSimulation";

const NeuralCore = lazy(() =>
  import("@/components/hero/NeuralCore").then((mod) => ({ default: mod.NeuralCore }))
);


export default function Home() {
  const [booted, setBooted] = useState(false);
  const [easterEggPulse, setEasterEggPulse] = useState(false);
  const keyBuffer = useRef("");
  const activeSection = useSimulation((s) => s.activeSection);
  const activeMission = useSimulation((s) => s.activeMission);
  const missionBriefingOpen = useSimulation((s) => s.missionBriefingOpen);
  const showDossierCTA = useSimulation((s) => s.showDossierCTA);
  const showCTA = useSimulation((s) => s.showCTA);

  const handleBoot = useCallback(() => {
    setBooted(true);
  }, []);

  // Cursor-reactive light + parallax — pure CSS vars, zero React re-renders
  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const el = document.documentElement;
        el.style.setProperty("--cursor-x", `${e.clientX}px`);
        el.style.setProperty("--cursor-y", `${e.clientY}px`);
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const px = (e.clientX - cx) * 0.015;
        const py = (e.clientY - cy) * 0.015;
        el.style.setProperty("--px", `${px}px`);
        el.style.setProperty("--py", `${py}px`);
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Show dossier CTA after 20 seconds
  useEffect(() => {
    if (!booted) return;
    const timer = setTimeout(() => showCTA(), 20000);
    return () => clearTimeout(timer);
  }, [booted, showCTA]);

  const toggleArchitectMode = useSimulation((s) => s.toggleArchitectMode);
  const architectMode = useSimulation((s) => s.architectMode);
  const viewMode = useSimulation((s) => s.viewMode);

  // Easter eggs: "override" → visual pulse, "/architect" → architect mode toggle
  useEffect(() => {
    if (!booted) return;
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      keyBuffer.current += e.key.toLowerCase();
      if (keyBuffer.current.length > 10) {
        keyBuffer.current = keyBuffer.current.slice(-10);
      }
      if (keyBuffer.current.endsWith("override")) {
        keyBuffer.current = "";
        setEasterEggPulse(true);
        setTimeout(() => setEasterEggPulse(false), 1500);
      }
      if (keyBuffer.current.endsWith("/architect")) {
        keyBuffer.current = "";
        toggleArchitectMode();
        setEasterEggPulse(true);
        setTimeout(() => setEasterEggPulse(false), 1500);
      }
    };
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [booted, toggleArchitectMode]);

  const missionData = activeMission
    ? MISSIONS.find((m) => m.id === activeMission)
    : null;

  if (!booted) {
    return (
      <>
        <ParticleGrid />
        <BootSequence onComplete={handleBoot} />
      </>
    );
  }

  return (
    <div className={`min-h-screen bg-background cursor-light pb-8 ${easterEggPulse ? "animate-visual-pulse" : ""} ${architectMode ? "architect-mode" : ""} ${viewMode === "engineer" ? "engineer-mode" : ""}`}>
      {viewMode === "engineer" && <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none z-0" />}
      <ScanLine />
      <AudioToggle />
      <HudOverlay />

      {/* Hero — cinematic staged reveal with parallax depth */}
      <header className="relative z-10 flex flex-col items-center justify-center min-h-[65vh] px-6 text-center overflow-hidden">

        {/* Volumetric light beam behind sphere */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none parallax-light"
        >
          <div
            className="w-[300px] h-[500px] animate-breathe"
            style={{
              background: "radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* 3D core — deeper parallax layer */}
        <div
          className="absolute inset-0 flex items-center justify-center parallax-core"
        >
          <Suspense fallback={null}>
            <NeuralCore />
          </Suspense>
        </div>

        {/* Staged text reveal — shallower parallax layer */}
        <div
          className="relative z-10 max-w-2xl parallax-text"
        >
          {/* Stage 1: Grid Online */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[10px] font-mono tracking-[0.5em] text-foreground/15 uppercase mb-3"
          >
            Intelligence Grid Online
          </motion.p>

          {/* Stage 2: Node Detected */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-[11px] font-mono tracking-[0.35em] text-cyan/30 uppercase mb-6"
          >
            Architect Node Detected
          </motion.p>

          {/* Stage 3: Name scale-in */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight mb-4"
          >
            {PROFILE.name}
          </motion.h1>

          {/* Stage 4: Subtitle + meta — mode-aware */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {viewMode === "engineer" ? (
                <motion.div key="eng" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                  <p className="text-sm sm:text-base font-mono text-green/40 leading-relaxed mb-8 max-w-xl mx-auto tracking-wide">
                    Python · FastAPI · LangGraph · RAG · YOLOv10 · Kafka · ClickHouse · Docker · K8s
                  </p>
                  <div className="flex items-center justify-center gap-6 text-[11px] font-mono tracking-wider text-foreground/25">
                    <span>{PROFILE.location}</span>
                    <span className="w-px h-3 bg-border-dim" />
                    <span className="text-green/50">distributed systems</span>
                    <span className="w-px h-3 bg-border-dim" />
                    <span className="text-green/50">real-time ML</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="rec" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                  <p className="text-base sm:text-lg text-foreground/40 leading-relaxed mb-8 max-w-xl mx-auto">
                    Building production AI systems across EdTech, AdTech, Fleet Intelligence, Defense &amp; Conversational AI.
                  </p>
                  <div className="flex items-center justify-center gap-6 text-[11px] font-mono tracking-wider text-foreground/25">
                    <span>{PROFILE.location}</span>
                    <span className="w-px h-3 bg-border-dim" />
                    <span className="text-cyan/60">5 production systems</span>
                    <span className="w-px h-3 bg-border-dim" />
                    <span className="text-cyan/60">11 AI agents</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="absolute bottom-10 z-10"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="text-foreground/15 text-xs tracking-widest"
          >
            ↓
          </motion.div>
        </motion.div>
      </header>

      {/* Recruiter Impact Strip */}
      <StatsBar />

      {/* Navigation + Mode Toggle */}
      <div className="sticky top-0 z-30">
        <NavigationHud />
      </div>

      {/* Main content */}
      <main className="relative z-10 pb-20">
        <AnimatePresence mode="wait">
          {missionData && missionBriefingOpen && (
            <motion.div
              key="briefing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MissionBriefing mission={missionData} />
            </motion.div>
          )}

          {!missionBriefingOpen && activeSection === "missions" && (
            <motion.div
              key="missions"
              initial={{ opacity: 0, y: 16, scale: 0.97, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-5xl mx-auto px-4 py-10"
            >
              <SectionHeader label="Active Deployments" title="Production Systems" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISSIONS.map((mission, i) => (
                  <MissionCard key={mission.id} mission={mission} index={i} />
                ))}
              </div>
            </motion.div>
          )}

          {!missionBriefingOpen && activeSection === "skills" && (
            <motion.div key="skills" initial={{ opacity: 0, y: 16, scale: 0.97, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, y: -12, scale: 0.98 }} transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <SkillTree />
            </motion.div>
          )}

          {!missionBriefingOpen && activeSection === "console" && (
            <motion.div key="console" initial={{ opacity: 0, y: 16, scale: 0.97, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, y: -12, scale: 0.98 }} transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <AIConsole />
            </motion.div>
          )}

          {!missionBriefingOpen && activeSection === "timeline" && (
            <motion.div key="timeline" initial={{ opacity: 0, y: 16, scale: 0.97, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, y: -12, scale: 0.98 }} transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <Timeline />
            </motion.div>
          )}

          {!missionBriefingOpen && activeSection === "agents" && (
            <motion.div key="agents" initial={{ opacity: 0, y: 16, scale: 0.97, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, y: -12, scale: 0.98 }} transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <AgentVisualization />
            </motion.div>
          )}

          {!missionBriefingOpen && activeSection === "impact" && (
            <motion.div key="impact" initial={{ opacity: 0, y: 16, scale: 0.97, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, y: -12, scale: 0.98 }} transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <ImpactMetrics />
            </motion.div>
          )}

          {!missionBriefingOpen && activeSection === "architecture" && (
            <motion.div key="architecture" initial={{ opacity: 0, y: 16, scale: 0.97, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, y: -12, scale: 0.98 }} transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <ArchitectureDeepDive />
            </motion.div>
          )}

          {!missionBriefingOpen && activeSection === "contact" && (
            <motion.div key="contact" initial={{ opacity: 0, y: 16, scale: 0.97, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, y: -12, scale: 0.98 }} transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <ContactSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Timed Dossier CTA — 20s */}
      <AnimatePresence>
        {showDossierCTA && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col gap-2"
          >
            <a
              href={PROFILE.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 bg-surface/95 border border-cyan/20
                       hover:bg-cyan/5 hover:border-cyan/40 transition-colors duration-200 group"
            >
              <span className="text-xs font-mono text-cyan/80 tracking-wider">Download Technical Dossier</span>
              <span className="text-cyan/60 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
            <div className="flex gap-2">
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex-1 px-3 py-2 bg-surface/95 border border-border-dim text-[11px] font-mono text-foreground/40 text-center
                         hover:text-foreground/60 hover:border-foreground/15 transition-colors duration-200"
              >
                Email
              </a>
              <a
                href={`tel:${PROFILE.phone}`}
                className="flex-1 px-3 py-2 bg-surface/95 border border-border-dim text-[11px] font-mono text-foreground/40 text-center
                         hover:text-foreground/60 hover:border-foreground/15 transition-colors duration-200"
              >
                Call
              </a>
              <a
                href={PROFILE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-3 py-2 bg-surface/95 border border-border-dim text-[11px] font-mono text-green/50 text-center
                         hover:text-green/70 hover:border-green/20 transition-colors duration-200"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border-dim py-8 text-center mb-8">
        <p className="text-[11px] tracking-wide text-foreground/15">
          Built by Kushagra Singhal · {new Date().getFullYear()}
        </p>
      </footer>

      {/* Persistent System Status Bar */}
      <SystemStatusBar />
    </div>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center mb-8">
      <p className="text-[11px] font-mono tracking-[0.25em] text-foreground/25 mb-2 uppercase">{label}</p>
      <h2 className="text-2xl font-bold text-foreground tracking-tight">{title}</h2>
    </div>
  );
}
