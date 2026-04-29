import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const logos = ["LUMEN", "VECTRA", "ATLAS", "ORBIT", "PRISM", "AXIOM"];

export function MarqueeStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-white/5 py-8">
      <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
      <motion.div style={{ x }} className="flex items-center gap-16 whitespace-nowrap">
        {[...logos, ...logos, ...logos].map((l, i) => (
          <span key={i} className="font-display text-2xl font-light tracking-[0.3em] text-muted-foreground/60">
            {l} <span className="ml-16 text-foreground/20">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
