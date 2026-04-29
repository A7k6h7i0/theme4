import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 9 + 3;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => {
          setShow(false);
          setTimeout(onDone, 900);
        }, 500);
      }
      setProgress(Math.min(100, p));
    }, 140);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="absolute inset-0" style={{ background: "var(--gradient-aurora)" }} />
          <div className="relative flex flex-col items-center gap-8">
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -90 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full pulse-ring border border-[var(--neon-violet)]/40" />
              <div className="relative grid h-24 w-24 place-items-center rounded-full glass-strong glow-violet">
                <svg viewBox="0 0 32 32" className="h-10 w-10">
                  <defs>
                    <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="oklch(0.82 0.2 290)" />
                      <stop offset="100%" stopColor="oklch(0.85 0.18 200)" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M6 22 L16 6 L26 22 L20 22 L16 14 L12 22 Z"
                    fill="url(#lg)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.4, delay: 0.2 }}
                  />
                </svg>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center">
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">Initializing</p>
              <p className="mt-2 text-2xl font-light text-gradient">NOVA</p>
            </motion.div>

            <div className="relative h-px w-64 overflow-hidden bg-white/5">
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{ width: `${progress}%`, background: "var(--gradient-neon)" }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <p className="font-mono text-xs tabular-nums text-muted-foreground">{Math.floor(progress)}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
