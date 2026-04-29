import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";

export function CtaScene() {
  return (
    <section id="cta" className="relative overflow-hidden py-32 md:py-48">
      <div className="absolute inset-0" style={{ background: "var(--gradient-aurora)", opacity: 0.7 }} />
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--neon-violet), transparent)" }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-4xl px-6 text-center"
      >
        <div className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
             style={{ background: "radial-gradient(circle, var(--neon-violet), transparent 70%)" }} />

        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--neon-cyan)]">Ready</p>
        <h2 className="mt-6 font-display text-5xl font-light leading-[0.95] tracking-tight md:text-7xl">
          Step inside the <br />
          <span className="text-gradient">next dimension.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-md text-muted-foreground">
          Free during private beta. No credit card. Just gravity, light, and you.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <MagneticButton>
            Request access
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </MagneticButton>
          <MagneticButton variant="ghost">Book a demo</MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}
