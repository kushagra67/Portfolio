"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { HudFrame } from "@/components/ui/HudFrame";
import { TERMINAL_COMMANDS, MISSIONS } from "@/lib/data";
import { useSimulation } from "@/store/useSimulation";

interface ConsoleLine {
  type: "input" | "output" | "error" | "system" | "log";
  text: string;
}

const SYSTEM_LOGS = [
  "Agent heartbeat: all 11 agents responsive",
  "Memory usage: 2.4GB / 8GB",
  "Request queue: 0 pending",
  "Cache hit rate: 94.2%",
  "Model inference: avg 45ms",
  "WebSocket connections: 3 active",
];

export function AIConsole() {
  const [lines, setLines] = useState<ConsoleLine[]>([
    { type: "system", text: "> KUSHAGRA.OS TERMINAL v4.2.0" },
    { type: "system", text: "> Type 'help' for available commands" },
    { type: "system", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addSystemLog, openMission } = useSimulation();

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Auto system logs
  useEffect(() => {
    const interval = setInterval(() => {
      const log = SYSTEM_LOGS[Math.floor(Math.random() * SYSTEM_LOGS.length)];
      setLines((prev) => [...prev, { type: "log", text: `[SYS] ${log}` }]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const animateOutput = useCallback((text: string, type: ConsoleLine["type"] = "output") => {
    setIsTyping(true);
    const outputLines = text.split("\n");
    let idx = 0;

    const interval = setInterval(() => {
      if (idx < outputLines.length) {
        setLines((prev) => [...prev, { type, text: outputLines[idx] }]);
        idx++;
      } else {
        clearInterval(interval);
        setLines((prev) => [...prev, { type: "output", text: "" }]);
        setIsTyping(false);
      }
    }, 30);
  }, []);

  const handleCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const original = cmd.trim();

    // Add to history
    setCommandHistory((prev) => [...prev, original]);
    setHistoryIndex(-1);

    setLines((prev) => [...prev, { type: "input", text: `> ${original}` }]);
    addSystemLog(`CMD: ${original}`);

    if (trimmed === "clear") {
      setLines([{ type: "system", text: "> Terminal cleared." }, { type: "system", text: "" }]);
      return;
    }

    // Direct command match
    if (TERMINAL_COMMANDS[trimmed]) {
      animateOutput(TERMINAL_COMMANDS[trimmed]);
      return;
    }

    // Legacy aliases
    if (trimmed === "run kushagra --skills") {
      animateOutput(TERMINAL_COMMANDS["skills"]);
      return;
    }
    if (trimmed === "run kushagra --stats") {
      animateOutput(TERMINAL_COMMANDS["status"]);
      return;
    }
    if (trimmed === "list missions") {
      animateOutput(TERMINAL_COMMANDS["missions"]);
      return;
    }

    // Handle "load <name>"
    const loadMatch = trimmed.match(/^load\s+(.+)/);
    if (loadMatch) {
      const name = loadMatch[1];
      const mission = MISSIONS.find(
        (m) =>
          m.title.toLowerCase().includes(name) ||
          m.codename.toLowerCase().replace(/-/g, "").includes(name.replace(/-/g, "")) ||
          m.id.includes(name)
      );
      if (mission) {
        const output = `> LOADING MISSION: ${mission.codename}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Title:    ${mission.title}
  Subtitle: ${mission.subtitle}
  Domain:   ${mission.domain}
  Status:   ${mission.status}
  Threat:   Level ${mission.threatLevel}
  Impact:   ${mission.impactScore}/100
  
  Stack:    ${mission.techStack.join(", ")}
  
  ${mission.summary}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  >> Switching to mission briefing...`;
        animateOutput(output);
        setTimeout(() => openMission(mission.id), output.split("\n").length * 30 + 500);
        return;
      } else {
        animateOutput(`> ERROR: Mission "${loadMatch[1]}" not found. Type 'missions' to list.`, "error");
        return;
      }
    }

    animateOutput(`> ERROR: Unknown command "${original}". Type 'help' for commands.`, "error");
  }, [animateOutput, addSystemLog, openMission]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    handleCommand(input);
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <div className="text-[10px] font-mono tracking-[0.3em] text-foreground/30 mb-2">SMART COMMAND ENGINE</div>
        <h2 className="text-2xl font-mono font-bold text-green glow-green">AI AGENT CONSOLE</h2>
      </motion.div>

      <HudFrame title="TERMINAL" glowColor="#00ff88" className="p-0 overflow-hidden" animate={false}>
        {/* Terminal header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border-dim bg-surface-light/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green/60" />
            </div>
            <span className="text-[10px] font-mono text-foreground/20 tracking-widest ml-2">
              kushagra@arch-prime:~
            </span>
          </div>
          <span className="text-[9px] font-mono text-foreground/15">
            {commandHistory.length} commands | ↑↓ history
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="h-80 sm:h-[420px] overflow-y-auto overflow-x-auto p-4 font-mono text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.05 }}
              className={`leading-relaxed whitespace-pre ${
                line.type === "input"
                  ? "text-cyan"
                  : line.type === "error"
                  ? "text-red"
                  : line.type === "system"
                  ? "text-foreground/30"
                  : line.type === "log"
                  ? "text-foreground/15 text-[11px]"
                  : "text-green/80"
              }`}
            >
              {line.text || "\u00A0"}
            </motion.div>
          ))}

          {/* Input line */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
            <span className="text-cyan text-sm shrink-0">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              className="flex-1 bg-transparent border-none outline-none text-sm text-foreground font-mono caret-cyan"
              placeholder={isTyping ? "Processing..." : "Enter command..."}
              autoFocus
            />
          </form>
        </div>
      </HudFrame>

      {/* Quick commands */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="mt-4 flex flex-wrap gap-2 justify-center"
      >
        {["help", "whoami", "skills", "missions", "status", "contact"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => { if (!isTyping) handleCommand(cmd); }}
            className="text-[10px] font-mono tracking-wider px-3 py-1.5 border border-border-dim text-foreground/30 hover:text-green hover:border-green/30 transition-all cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
