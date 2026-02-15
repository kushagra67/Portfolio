"use client";

export function ScanLine() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan/15 to-transparent animate-scanline"
      />
    </div>
  );
}
