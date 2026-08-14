"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/** Lightweight, best-effort "should we run the heavy WebGL hero" check.
 *  Mobile / low-power / reduced-motion / no-WebGL devices get the static
 *  fallback instead — this is a capability gate, not a UA sniff. */
function shouldRunWebGL(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false;
  if (!supportsWebGL()) return false;

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  if (nav.deviceMemory && nav.deviceMemory < 4) return false;
  if (nav.connection?.saveData) return false;
  if (
    nav.connection?.effectiveType &&
    /2g/.test(nav.connection.effectiveType)
  )
    return false;

  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const isNarrow = window.innerWidth < 768;
  if (isCoarsePointer && isNarrow) return false;

  return true;
}

/** Static, brand-true substitute for phones/low-power devices and
 *  prefers-reduced-motion: a soft indigo-to-ink field with the lime arcs
 *  rendered as gentle CSS gradients — no motion required. */
function StaticHeroFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(60% 50% at 78% 20%, rgba(184,212,68,0.16), transparent 60%)," +
          "radial-gradient(70% 60% at 15% 85%, rgba(91,87,196,0.28), transparent 60%)," +
          "linear-gradient(180deg, #0a0a14 0%, #101024 60%, #0a0a14 100%)",
      }}
    />
  );
}

export function HeroCanvas() {
  const [mode, setMode] = useState<"pending" | "webgl" | "static">("pending");

  useEffect(() => {
    setMode(shouldRunWebGL() ? "webgl" : "static");
  }, []);

  return (
    <div className="absolute inset-0">
      <StaticHeroFallback />
      {mode === "webgl" ? (
        <div className="absolute inset-0 opacity-0 animate-[fade-up_1.2s_ease_forwards]">
          <HeroScene />
        </div>
      ) : null}
    </div>
  );
}
