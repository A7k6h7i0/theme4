import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const links = [
  { label: "Product", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => scrollY.on("change", (v) => setScrolled(v > 40)), [scrollY]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-6 pt-6"
    >
      <motion.nav
        animate={{
          backdropFilter: scrolled ? "blur(24px)" : "blur(8px)",
          backgroundColor: scrolled ? "oklch(0.14 0.03 270 / 0.7)" : "oklch(0.14 0.03 270 / 0.25)",
        }}
        className="flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 px-6 py-3"
      >
        <a href="#" className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md" style={{ background: "var(--gradient-neon)" }}>
            <span className="text-xs font-bold text-background">N</span>
          </div>
          <span className="text-sm font-semibold tracking-wide">NOVA</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="group relative text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[var(--neon-violet)] to-[var(--neon-cyan)] transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </div>
        <a href="#cta" className="rounded-full glass px-4 py-1.5 text-xs font-medium text-foreground transition-all hover:bg-white/10">
          Launch app →
        </a>
      </motion.nav>
    </motion.header>
  );
}
