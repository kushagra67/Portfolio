"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HudFrame } from "@/components/ui/HudFrame";
import { PROFILE } from "@/lib/data";

function Toast({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 bg-green/15 border border-green/40 backdrop-blur-sm"
    >
      <span className="text-xs font-mono text-green tracking-widest">{message}</span>
    </motion.div>
  );
}

export function ContactSection() {
  const [toast, setToast] = useState<string | null>(null);

  const copyToClipboard = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToast(`${label} copied to clipboard`);
      setTimeout(() => setToast(null), 2000);
    });
  }, []);

  const handleScheduleCall = () => {
    window.location.href = "tel:+918955531225";
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <div className="text-[10px] font-mono tracking-[0.3em] text-foreground/30 mb-2">SECURE CHANNEL</div>
        <h2 className="text-2xl font-mono font-bold text-cyan glow-cyan">ESTABLISH CONNECTION</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HudFrame title="CONTACT PROTOCOLS" glowColor="#00f0ff" className="p-6" animate={false}>
          <div className="space-y-3">
            <ContactRow
              label="EMAIL"
              value={PROFILE.email}
              href={`mailto:${PROFILE.email}`}
              color="#00f0ff"
              onCopy={() => copyToClipboard(PROFILE.email, "Email")}
              ariaLabel="Send email to Kushagra"
            />
            <ContactRow
              label="PHONE"
              value={PROFILE.phone}
              href={`tel:${PROFILE.phone}`}
              color="#00ff88"
              onCopy={() => copyToClipboard(PROFILE.phone, "Phone")}
              ariaLabel="Call Kushagra"
            />
            <ContactRow
              label="WHATSAPP"
              value="Chat on WhatsApp"
              href={PROFILE.whatsapp}
              color="#25D366"
              ariaLabel="Open WhatsApp chat with Kushagra"
            />
            <ContactRow
              label="GITHUB"
              value="github.com/kushagra67"
              href={PROFILE.github}
              color="#e0e8f0"
              onCopy={() => copyToClipboard(PROFILE.github, "GitHub")}
              ariaLabel="Visit Kushagra's GitHub"
            />
            <ContactRow
              label="LINKEDIN"
              value="linkedin.com/in/kushagra-singhal20"
              href={PROFILE.linkedin}
              color="#f000ff"
              onCopy={() => copyToClipboard(PROFILE.linkedin, "LinkedIn")}
              ariaLabel="Visit Kushagra's LinkedIn"
            />
          </div>
        </HudFrame>

        <HudFrame title="QUICK ACTIONS" glowColor="#00ff88" className="p-6" animate={false}>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <p className="text-[10px] font-mono tracking-[0.2em] text-foreground/30 uppercase text-center mb-2">Download Resume By Role</p>
              {PROFILE.resumes.map((r) => (
                <a
                  key={r.role}
                  href={r.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Download ${r.role} resume`}
                  className="block w-full py-2.5 px-4 border border-cyan/20 text-cyan/80 font-mono text-xs tracking-[0.15em] text-center
                           hover:bg-cyan/10 hover:border-cyan/50 hover:text-cyan transition-colors duration-200"
                >
                  {r.role.toUpperCase()}
                </a>
              ))}
            </div>
            <button
              onClick={handleScheduleCall}
              aria-label="Call Kushagra to schedule a meeting"
              className="block w-full py-3 px-4 border border-green/30 text-green font-mono text-sm tracking-[0.15em] text-center
                       hover:bg-green/10 hover:border-green/60 transition-colors duration-200 cursor-pointer"
            >
              SCHEDULE CALL
            </button>
            <a
              href={PROFILE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Kushagra on WhatsApp"
              className="block w-full py-3 px-4 border border-[#25D366]/30 text-[#25D366] font-mono text-sm tracking-[0.15em] text-center
                       hover:bg-[#25D366]/10 hover:border-[#25D366]/60 transition-colors duration-200"
            >
              WHATSAPP MESSAGE
            </a>
          </div>

          <div className="mt-6 pt-4 border-t border-border-dim">
            <div className="text-[9px] font-mono text-foreground/20 tracking-widest mb-2">OPERATOR STATUS</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green animate-pulse-glow" />
              <span className="text-xs font-mono text-green/80">Available for opportunities</span>
            </div>
          </div>
        </HudFrame>
      </div>

      {/* Credibility signals */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {[
          { label: "Systems Built", value: "5", color: "#00f0ff" },
          { label: "AI Agents", value: "11", color: "#f000ff" },
          { label: "Microservices", value: "6", color: "#00ff88" },
          { label: "Threat Accuracy", value: "97%+", color: "#ffaa00" },
        ].map((stat) => (
          <div key={stat.label} className="text-center py-3 border border-border-dim">
            <div className="text-lg font-mono font-bold" style={{ color: stat.color, textShadow: `0 0 10px ${stat.color}44` }}>
              {stat.value}
            </div>
            <div className="text-[9px] font-mono text-foreground/25 tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Toast notification */}
      <AnimatePresence>{toast && <Toast message={toast} />}</AnimatePresence>
    </div>
  );
}

interface ContactRowProps {
  label: string;
  value: string;
  href: string;
  color: string;
  onCopy?: () => void;
  ariaLabel: string;
}

function ContactRow({ label, value, href, color, onCopy, ariaLabel }: ContactRowProps) {
  return (
    <div className="flex items-start gap-3 py-2 group">
      <span className="text-[10px] font-mono tracking-widest text-foreground/30 shrink-0 w-20 pt-0.5">{label}</span>
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className="text-xs font-mono hover:underline transition-colors truncate"
          style={{ color }}
        >
          {value}
        </a>
        {onCopy && (
          <button
            onClick={onCopy}
            aria-label={`Copy ${label} to clipboard`}
            className="text-[10px] font-mono text-foreground/20 hover:text-foreground/60 transition-colors px-1.5 py-0.5 border border-transparent hover:border-border-dim cursor-pointer shrink-0"
            title="Copy"
          >
            ⎘
          </button>
        )}
      </div>
    </div>
  );
}
