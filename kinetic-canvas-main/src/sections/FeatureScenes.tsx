import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, type MouseEvent, lazy, Suspense } from "react";

const GlassScene = lazy(() => import("@/3d/GlassScene").then((m) => ({ default: m.GlassScene })));

const features = [
  {
    tag: "01 — Engine",
    title: "Render reality in real-time.",
    body: "A WebGPU-accelerated render pipeline that compiles your component tree into cinematic frames at 120fps.",
    accent: "violet",
  },
  {
    tag: "02 — Agents",
    title: "A studio of AI collaborators.",
    body: "Multi-agent orchestration. Designers, engineers and reviewers — running in parallel, shipping autonomously.",
    accent: "cyan",
  },
  {
    tag: "03 — Sync",
    title: "Edit together, anywhere.",
    body: "CRDT-backed live multiplayer with sub-50ms presence. Your team feels the same room.",
    accent: "magenta",
  },
];

function TiltCard({ children, accent }: { children: React.ReactNode; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sy = useSpring(ry, { stiffness: 150, damping: 15 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 16);
    rx.set(-py * 16);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  const glow =
    accent === "violet" ? "oklch(0.7 0.25 295 / 0.5)" :
    accent === "cyan" ? "oklch(0.85 0.18 200 / 0.5)" :
    "oklch(0.72 0.28 340 / 0.5)";

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d", transformPerspective: 1200 }}
      className="group relative h-full rounded-3xl"
    >
      <div className="absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `linear-gradient(135deg, ${glow}, transparent 60%)`, filter: "blur(20px)" }} />
      <div className="relative h-full rounded-3xl glass-strong p-8" style={{ boxShadow: "var(--shadow-card)" }}>
        {children}
      </div>
    </motion.div>
  );
}

export function FeatureScenes() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} id="features" className="relative py-32 md:py-48">
      {/* Floating 3D backdrop */}
      <motion.div style={{ y: sceneY }} className="pointer-events-none absolute inset-0 opacity-70">
        <Suspense fallback={null}>
          <GlassScene />
        </Suspense>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--neon-cyan)]">Capabilities</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-light leading-tight tracking-tight md:text-6xl">
            Three forces. <span className="text-gradient">One canvas.</span>
          </h2>
        </motion.div>

        <div className="mt-20 grid gap-6 md:grid-cols-3 md:[perspective:1200px]">
          {features.map((f, i) => (
            <motion.div
              key={f.tag}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={i === 1 ? "md:translate-y-12" : ""}
            >
              <TiltCard accent={f.accent}>
                <div style={{ transform: "translateZ(40px)" }}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{f.tag}</p>
                  <h3 className="mt-4 font-display text-2xl font-light leading-tight md:text-3xl">{f.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                  <div className="mt-10 flex items-center gap-2 text-xs text-foreground/80">
                    <span>Explore</span>
                    <span className="h-px w-8 bg-foreground/40 transition-all duration-500 group-hover:w-16" />
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
