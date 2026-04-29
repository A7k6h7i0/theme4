import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative border-t border-white/5 px-6 py-16"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="grid h-7 w-7 place-items-center rounded-md" style={{ background: "var(--gradient-neon)" }}>
            <span className="text-xs font-bold text-background">N</span>
          </div>
          <span className="font-display text-sm tracking-wider">NOVA</span>
          <span className="font-mono text-[10px] text-muted-foreground">© 2026 — composed in orbit</span>
        </div>
        <div className="flex gap-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <a href="#" className="transition-colors hover:text-foreground">Twitter</a>
          <a href="#" className="transition-colors hover:text-foreground">Discord</a>
          <a href="#" className="transition-colors hover:text-foreground">GitHub</a>
          <a href="#" className="transition-colors hover:text-foreground">Manifesto</a>
        </div>
      </div>
      <div className="mx-auto mt-12 h-px max-w-6xl shimmer" />
      <p className="mt-12 text-center font-display text-[18vw] font-light leading-none text-foreground/[0.04]">NOVA</p>
    </motion.footer>
  );
}
