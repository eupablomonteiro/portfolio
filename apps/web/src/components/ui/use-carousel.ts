"use client";

import { useEffect, useState } from "react";

export function useCarousel(length: number, intervalMs = 4000) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (length < 2 || paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % length), intervalMs);
    return () => clearInterval(t);
  }, [length, paused, intervalMs]);
  useEffect(() => {
    setIndex(0);
  }, [length]);
  return { index, setPaused };
}
