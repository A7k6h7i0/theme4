import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { n: "I", title: "Sketch", body: "Speak your idea. NOVA composes the scene graph in seconds." },
  { n: "II", title: "Sculpt", body: "Refine in 3D. Every layer is editable, every pixel inspectable." },
  { n: "III", title: "Ship", body: "One command. Edge-deployed, globally cached, infinitely scalable." },
];

export function ProcessScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative py-32 md:py-48">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--neon-violet)]">Process</p>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight md:text-6xl">
            From thought to <span className="text-gradient">live product</span>.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Animated line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 overflow-hidden bg-white/5 md:block">
            <motion.div style={{ height: lineHeight }} className="w-full" >
              <div className="h-full w-px" style={{ background: "linear-gradient(to bottom, var(--neon-violet), var(--neon-cyan))" }} />
            </motion.div>
          </div>

          <div className="space-y-24">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col items-center gap-6 md:flex-row md:items-center ${i % 2 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="flex-1 text-center md:text-left">
                  <p className="font-mono text-sm tracking-[0.4em] text-[var(--neon-cyan)]">{s.n}</p>
                  <h3 className="mt-3 font-display text-3xl font-light md:text-4xl">{s.title}</h3>
                  <p className="mt-3 max-w-sm text-muted-foreground md:max-w-md">{s.body}</p>
                </div>

                <div className="relative grid h-16 w-16 shrink-0 place-items-center">
                  <div className="absolute inset-0 rounded-full glass-strong" />
                  <div className="absolute inset-0 rounded-full pulse-ring border border-[var(--neon-violet)]/30" />
                  <span className="relative font-display text-lg text-gradient">{s.n}</span>
                </div>

                <div className="hidden flex-1 md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
