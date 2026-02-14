"use client";

import { useState, useRef, useEffect } from "react";

export function AudioToggle() {
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create a subtle ambient oscillator hum using Web Audio API
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.value = 80;
    filter.type = "lowpass";
    filter.frequency.value = 120;
    gain.gain.value = 0;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    audioRef.current = null;

    const toggle = (on: boolean) => {
      gain.gain.linearRampToValueAtTime(on ? 0.03 : 0, ctx.currentTime + 0.5);
    };

    if (!muted) {
      ctx.resume();
      toggle(true);
    }

    // Store toggle ref
    (window as unknown as Record<string, unknown>).__audioToggle = toggle;
    (window as unknown as Record<string, unknown>).__audioCtx = ctx;

    return () => {
      osc.stop();
      ctx.close();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = () => {
    const ctx = (window as unknown as Record<string, unknown>).__audioCtx as AudioContext | undefined;
    const toggle = (window as unknown as Record<string, unknown>).__audioToggle as ((on: boolean) => void) | undefined;
    if (ctx && toggle) {
      if (muted) {
        ctx.resume();
        toggle(true);
      } else {
        toggle(false);
      }
    }
    setMuted(!muted);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={muted ? "Unmute ambient audio" : "Mute ambient audio"}
      className="fixed bottom-6 left-6 z-50 w-9 h-9 flex items-center justify-center
                 border border-border-dim bg-surface/80 text-foreground/30
                 hover:text-foreground/50 hover:border-foreground/15
                 transition-colors duration-200 cursor-pointer text-sm font-mono"
      title={muted ? "Unmute" : "Mute"}
    >
      {muted ? "◌" : "◉"}
    </button>
  );
}
