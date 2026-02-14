"use client";

import { useState, useEffect } from "react";

interface TypeWriterProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorColor?: string;
}

export function TypeWriter({
  texts,
  speed = 50,
  deleteSpeed = 30,
  pauseDuration = 2000,
  className,
  cursorColor = "#00f0ff",
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < current.length) {
            setDisplayText(current.slice(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          } else {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          if (charIndex > 0) {
            setDisplayText(current.slice(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          } else {
            setIsDeleting(false);
            setTextIndex((textIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, deleteSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayText}
      <span
        className="inline-block w-[2px] h-[1em] ml-1 animate-pulse-glow align-middle"
        style={{ backgroundColor: cursorColor }}
      />
    </span>
  );
}
