import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, lazy, Suspense } from "react";

const ParticleField = lazy(() => import("@/3d/ParticleField").then((m) => ({ default: m.ParticleField })));

const stats = [
  { value: "120", suffix: "fps", label: "Real-time render pipeline" },
  { value: "50", suffix: "ms", label: "Live multiplayer presence" },
  { value: "0", suffix: "config", label: "From idea to deployed" },
];

export function ShowcaseScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  return (
    <section ref={ref} id="showcase" className="relative overflow-hidden py-32 md:py-48">
      <Suspense fallback={null}>
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <ParticleField />
        </div>
      </Suspense>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--neon-magenta)]">Studio</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
              An interface <br /><span className="text-neon">that breathes.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Every panel is a layer in space. Drag, tilt, depth-blur. The IDE you've always wanted —
              composed in WebGL, scored by physics.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                >
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl font-light text-gradient md:text-4xl">{s.value}</span>
                    <span className="font-mono text-xs text-muted-foreground">{s.suffix}</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Floating UI mockup */}
          <motion.div style={{ rotate, y, scale }} className="relative" >
            <div className="relative [perspective:1500px]">
              <motion.div
                animate={{ rotateY: [-4, 4, -4], rotateX: [2, -2, 2] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative aspect-[4/3] w-full rounded-2xl glass-strong p-3"
              >
                <div className="absolute -inset-8 -z-10 rounded-3xl opacity-60 blur-3xl" style={{ background: "var(--gradient-aurora)" }} />

                {/* Window chrome */}
                <div className="flex items-center gap-1.5 px-2 pb-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--neon-magenta)]/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--neon-violet)]/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--neon-cyan)]/70" />
                  <span className="ml-3 font-mono text-[10px] text-muted-foreground">nova / scene.tsx</span>
                </div>

                <div className="grid h-[calc(100%-1.75rem)] grid-cols-[1fr_2fr] gap-2">
                  {/* Sidebar */}
                  <div className="rounded-lg bg-black/40 p-3">
                    {["Hero", "Orbit", "Particles", "Camera", "Grade"].map((n, i) => (
                      <div key={n} className="mb-1.5 flex items-center gap-2 rounded px-2 py-1.5 text-[11px]" style={{ background: i === 1 ? "oklch(0.7 0.25 295 / 0.18)" : "transparent" }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: i === 1 ? "var(--neon-violet)" : "oklch(1 0 0 / 0.3)" }} />
                        <span className={i === 1 ? "text-foreground" : "text-muted-foreground"}>{n}</span>
                      </div>
                    ))}
                  </div>

                  {/* Canvas */}
                  <div className="relative overflow-hidden rounded-lg" style={{ background: "radial-gradient(circle at 30% 40%, oklch(0.4 0.18 290 / 0.6), oklch(0.1 0.02 270))" }}>
                    <motion.div
                      animate={{ scale: [1, 1.08, 1], rotate: [0, 90, 0] }}
                      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ background: "conic-gradient(from 0deg, var(--neon-violet), var(--neon-cyan), var(--neon-magenta), var(--neon-violet))", filter: "blur(8px)" }}
                    />
                    <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full glass-strong" />
                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                      {[...Array(4)].map((_, i) => (
                        <span key={i} className="h-1 w-6 rounded-full" style={{ background: i === 0 ? "var(--neon-cyan)" : "oklch(1 0 0 / 0.15)" }} />
                      ))}
                    </div>
                    <div className="absolute right-3 top-3 font-mono text-[9px] text-foreground/60">120 FPS</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
