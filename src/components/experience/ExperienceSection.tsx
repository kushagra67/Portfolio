"use client";

import { motion } from "framer-motion";
import { EXPERIENCES, PROFILE } from "@/lib/data";
import { HudFrame } from "@/components/ui/HudFrame";

export function ExperienceSection() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <p className="text-[11px] font-mono tracking-[0.25em] text-foreground/25 mb-2 uppercase">Career Intel</p>
        <h2 className="text-2xl font-bold text-foreground tracking-tight">Experience Log</h2>
      </div>

      {/* Resume Downloads */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <HudFrame title="DOWNLOAD RESUME" glowColor="#00d4ff" className="p-5" animate={false}>
          <p className="text-[10px] font-mono tracking-[0.2em] text-foreground/25 uppercase mb-4 text-center">
            Select Role-Specific Resume
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PROFILE.resumes.map((r, i) => (
              <motion.a
                key={r.role}
                href={r.path}
                download
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="group flex items-center justify-center gap-2 py-3 px-4 border border-cyan/20 bg-cyan/5
                         hover:bg-cyan/15 hover:border-cyan/50 transition-all duration-200 text-center"
              >
                <svg
                  className="w-3.5 h-3.5 text-cyan/60 group-hover:text-cyan transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="text-xs font-mono tracking-[0.12em] text-cyan/80 group-hover:text-cyan transition-colors">
                  {r.role}
                </span>
              </motion.a>
            ))}
          </div>
        </HudFrame>
      </motion.div>

      <div className="space-y-6">
        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <HudFrame
              title={exp.company.toUpperCase()}
              glowColor={exp.color}
              className="p-0 overflow-hidden"
              animate={false}
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-border-dim">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div
                        className="w-2 h-2 rounded-full animate-pulse-glow"
                        style={{ backgroundColor: exp.color }}
                      />
                      <span
                        className="text-[10px] font-mono tracking-[0.2em] uppercase"
                        style={{ color: exp.color }}
                      >
                        {exp.type === "founding" ? "FOUNDER" : exp.type === "internship" ? "INTERN" : exp.type.toUpperCase()}
                      </span>
                    </div>
                    <h3
                      className="text-lg sm:text-xl font-mono font-bold text-foreground/90"
                    >
                      {exp.role}
                    </h3>
                    <p className="text-xs font-mono text-foreground/30 mt-1">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1">
                    <span
                      className="text-xs font-mono px-2.5 py-1 border"
                      style={{ color: exp.color, borderColor: `${exp.color}33`, backgroundColor: `${exp.color}08` }}
                    >
                      {exp.period}
                    </span>
                    <span className="text-[10px] font-mono text-foreground/25 tracking-wider">
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="text-sm font-mono text-foreground/45 leading-relaxed mt-4">
                  {exp.description}
                </p>
              </div>

              {/* Achievements */}
              <div className="p-5 sm:p-6 border-b border-border-dim">
                <p className="text-[10px] font-mono tracking-[0.2em] text-foreground/20 uppercase mb-4">
                  Key Achievements
                </p>
                <div className="space-y-3">
                  {exp.achievements.map((achievement, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 + j * 0.06 + 0.3, duration: 0.3 }}
                      className="flex items-start gap-3"
                    >
                      <span
                        className="mt-[7px] w-1.5 h-1.5 shrink-0"
                        style={{ backgroundColor: exp.color, boxShadow: `0 0 6px ${exp.color}` }}
                      />
                      <span className="text-xs sm:text-sm font-mono text-foreground/55 leading-relaxed">
                        {achievement}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="p-5 sm:p-6">
                <p className="text-[10px] font-mono tracking-[0.2em] text-foreground/20 uppercase mb-3">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.techStack.map((tech, k) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.15 + k * 0.04 + 0.5, duration: 0.25 }}
                      className="text-[10px] font-mono px-2.5 py-1 border"
                      style={{
                        color: `${exp.color}cc`,
                        borderColor: `${exp.color}25`,
                        backgroundColor: `${exp.color}06`,
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </HudFrame>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
