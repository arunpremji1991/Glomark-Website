"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function SuccessModal({
  open,
  onClose,
  title,
  body,
  closeLabel,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  body: string;
  closeLabel: string;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
          className="fixed inset-0 z-[200] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="panel relative w-full max-w-sm rounded-2xl p-8 text-center"
            initial={{ opacity: 0, scale: reduce ? 1 : 0.92, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reduce ? 1 : 0.96, y: reduce ? 0 : 8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ scale: reduce ? 1 : 0, rotate: reduce ? 0 : -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lime/15"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7 text-lime"
                aria-hidden
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
                />
              </svg>
            </motion.div>

            <h2
              id="success-modal-title"
              className="mt-5 font-display text-2xl text-cream"
            >
              {title}
            </h2>
            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-cream/70 pretty">
              {body}
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-lime px-6 py-3 text-[0.9rem] font-semibold text-ink transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {closeLabel}
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
