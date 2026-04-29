import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
  onClick?: () => void;
};

export function MagneticButton({ children, className, variant = "primary", onClick }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const r = ref.current!.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(mx * 0.35);
    y.set(my * 0.35);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const styles =
    variant === "primary"
      ? "text-primary-foreground bg-[linear-gradient(135deg,var(--neon-violet),var(--neon-cyan))] glow-violet"
      : "text-foreground glass hover:bg-white/5";

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-shadow",
        styles,
        className,
      )}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 hover:opacity-100"
          style={{ background: "radial-gradient(circle at 50% 50%, oklch(1 0 0 / 0.25), transparent 60%)" }} />
      )}
    </motion.button>
  );
}
