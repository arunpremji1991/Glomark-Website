"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Thin fixed bar tracking whole-page scroll progress through the article.
// Global reduced-motion CSS (app/globals.css) already zeroes transition
// durations, so this degrades to a plain (non-animated) progress indicator
// rather than being hidden outright.
export function ReadingProgress({ dir }: { dir: "ltr" | "rtl" }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        transformOrigin: dir === "rtl" ? "right" : "left",
      }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-lime"
    />
  );
}
