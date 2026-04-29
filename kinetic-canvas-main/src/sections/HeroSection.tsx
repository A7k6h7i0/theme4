import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, lazy, Suspense } from "react";
import { MagneticButton } from "@/components/MagneticButton";

const HeroScene = lazy(() => import("@/3d/HeroScene").then((m) => ({ default: m.HeroScene })));

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <section ref={ref} className="relative h-[100vh] overflow-hidden">
      <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
        <motion.div style={{ scale, opacity }} className="absolute inset-0">
          <HeroScene />
        </motion.div>
      </Suspense>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, oklch(0.08 0.02 270 / 0.85) 100%)" }} />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease }}
          className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--neon-cyan)]" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--neon-cyan)]" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">v3.0 — now in orbit</span>
        </motion.div>

        <h1 className="text-balance font-display text-5xl font-light leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
          {["Build", "at the speed", "of imagination."].map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.4, delay: 1.6 + i * 0.18, ease }}
              className={`block ${i === 1 ? "text-gradient" : ""}`}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.4, ease }}
          className="mt-8 max-w-xl text-balance text-base text-muted-foreground md:text-lg"
        >
          NOVA is a real-time collaborative engine that turns ideas into shipped product —
          rendered in cinematic 3D, powered by a multi-agent runtime.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.7, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton>
            Start building
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </MagneticButton>
          <MagneticButton variant="ghost">Watch the film</MagneticButton>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="h-8 w-px bg-gradient-to-b from-foreground/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
