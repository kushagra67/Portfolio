"use client";

export function ScanLine() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan/20 to-transparent animate-scanline"
      />
      {/* CRT-like overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.03) 2px, rgba(0,240,255,0.03) 4px)",
        }}
      />
    </div>
  );
}
