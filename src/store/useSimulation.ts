import { create } from "zustand";

export type ClearanceLevel = "PUBLIC" | "CONFIDENTIAL" | "SECRET" | "TOP_SECRET" | "OMEGA";
export type SystemSection = "missions" | "skills" | "console" | "timeline" | "contact" | "agents" | "impact" | "architecture" | "experience";
export type ViewMode = "recruiter" | "engineer";

interface SimulationState {
  // Core system
  systemOnline: boolean;
  bootComplete: boolean;
  bootProgress: number;
  powerLevel: number;

  // Operator
  xp: number;
  rank: string;
  level: number;
  clearanceLevel: ClearanceLevel;

  // Navigation
  activeSection: SystemSection;
  activeMission: string | null;
  missionBriefingOpen: boolean;

  // Skills
  unlockedSkills: string[];
  systemStrengthIndex: number;

  // UI State
  viewMode: ViewMode;
  architectMode: boolean;
  glitchActive: boolean;
  spotlightActive: boolean;
  audioEnabled: boolean;
  cursorPosition: { x: number; y: number };
  showLevelUpModal: boolean;
  showDossierCTA: boolean;

  // System logs
  systemLogs: string[];

  // Actions
  bootSystem: () => void;
  setBootProgress: (progress: number) => void;
  completeboot: () => void;
  setActiveSection: (section: SystemSection) => void;
  openMission: (missionId: string) => void;
  closeMission: () => void;
  unlockSkill: (skillId: string) => void;
  addXP: (amount: number) => void;
  triggerGlitch: () => void;
  setCursorPosition: (x: number, y: number) => void;
  toggleAudio: () => void;
  showCTA: () => void;
  dismissLevelUp: () => void;
  addSystemLog: (log: string) => void;
  setPowerLevel: (level: number) => void;
  setViewMode: (mode: ViewMode) => void;
  toggleArchitectMode: () => void;
}

const RANK_THRESHOLDS: { xp: number; rank: string; level: number; clearance: ClearanceLevel }[] = [
  { xp: 0, rank: "Initiate", level: 1, clearance: "PUBLIC" },
  { xp: 2000, rank: "Operative", level: 15, clearance: "CONFIDENTIAL" },
  { xp: 4000, rank: "Architect", level: 25, clearance: "SECRET" },
  { xp: 6000, rank: "Senior Architect", level: 35, clearance: "TOP_SECRET" },
  { xp: 8000, rank: "Architect Prime", level: 42, clearance: "OMEGA" },
];

function computeRank(xp: number) {
  let result = RANK_THRESHOLDS[0];
  for (const t of RANK_THRESHOLDS) {
    if (xp >= t.xp) result = t;
  }
  return result;
}

export const useSimulation = create<SimulationState>((set, get) => ({
  systemOnline: false,
  bootComplete: false,
  bootProgress: 0,
  powerLevel: 0,

  xp: 9500,
  rank: "Architect Prime",
  level: 42,
  clearanceLevel: "OMEGA",

  activeSection: "missions",
  activeMission: null,
  missionBriefingOpen: false,

  unlockedSkills: [],
  systemStrengthIndex: 88,

  viewMode: "recruiter",
  architectMode: false,
  glitchActive: false,
  spotlightActive: false,
  audioEnabled: false,
  cursorPosition: { x: 0, y: 0 },
  showLevelUpModal: false,
  showDossierCTA: false,

  systemLogs: [],

  bootSystem: () => {
    set({ systemOnline: true, powerLevel: 10 });
  },

  setBootProgress: (progress: number) => {
    set({ bootProgress: progress, powerLevel: Math.min(100, progress) });
  },

  completeboot: () => {
    set({ bootComplete: true, powerLevel: 100 });
  },

  setActiveSection: (section: SystemSection) => {
    set({
      activeSection: section,
      activeMission: null,
      missionBriefingOpen: false,
      spotlightActive: false,
    });
  },

  openMission: (missionId: string) => {
    set({
      activeMission: missionId,
      missionBriefingOpen: true,
      spotlightActive: true,
    });
    get().addSystemLog(`MISSION BRIEFING: ${missionId.toUpperCase()} loaded`);
  },

  closeMission: () => {
    set({
      activeMission: null,
      missionBriefingOpen: false,
      spotlightActive: false,
    });
  },

  unlockSkill: (skillId: string) => {
    const current = get().unlockedSkills;
    if (!current.includes(skillId)) {
      const updated = [...current, skillId];
      const strengthIndex = Math.min(100, Math.round((updated.length / 30) * 100));
      set({ unlockedSkills: updated, systemStrengthIndex: strengthIndex });
    }
  },

  addXP: (amount: number) => {
    const newXP = get().xp + amount;
    const oldLevel = get().level;
    const rankData = computeRank(newXP);
    const leveledUp = rankData.level > oldLevel;
    set({
      xp: newXP,
      rank: rankData.rank,
      level: rankData.level,
      clearanceLevel: rankData.clearance,
      showLevelUpModal: leveledUp,
    });
    if (leveledUp) {
      get().addSystemLog(`LEVEL UP: ${rankData.rank} (LVL ${rankData.level})`);
    }
  },

  triggerGlitch: () => {
    set({ glitchActive: true });
    setTimeout(() => set({ glitchActive: false }), 200);
  },

  setCursorPosition: (x: number, y: number) => {
    set({ cursorPosition: { x, y } });
  },

  toggleAudio: () => {
    set({ audioEnabled: !get().audioEnabled });
  },

  showCTA: () => {
    set({ showDossierCTA: true });
  },

  dismissLevelUp: () => {
    set({ showLevelUpModal: false });
  },

  addSystemLog: (log: string) => {
    const timestamp = new Date().toLocaleTimeString("en-US", { hour12: false });
    set({ systemLogs: [...get().systemLogs.slice(-50), `[${timestamp}] ${log}`] });
  },

  setPowerLevel: (level: number) => {
    set({ powerLevel: Math.max(0, Math.min(100, level)) });
  },

  setViewMode: (mode: ViewMode) => {
    set({ viewMode: mode });
    get().addSystemLog(`VIEW MODE: Switched to ${mode.toUpperCase()}`);
  },

  toggleArchitectMode: () => {
    const next = !get().architectMode;
    set({ architectMode: next });
    get().addSystemLog(`ARCHITECT MODE: ${next ? "ENABLED" : "DISABLED"}`);
  },
}));
