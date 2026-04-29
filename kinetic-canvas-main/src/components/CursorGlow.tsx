import { useEffect, useRef, useState } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    let x = 0, y = 0, tx = 0, ty = 0;
    const onMove = (e: PointerEvent) => { x = e.clientX; y = e.clientY; };
    window.addEventListener("pointermove", onMove);
    let raf = 0;
    const tick = () => {
      tx += (x - tx) * 0.18; ty += (y - ty) * 0.18;
      if (ref.current) ref.current.style.transform = `translate3d(${x - 6}px, ${y - 6}px, 0)`;
      if (trail.current) trail.current.style.transform = `translate3d(${tx - 140}px, ${ty - 140}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div ref={trail} className="pointer-events-none fixed left-0 top-0 z-[60] h-[280px] w-[280px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.78 0.22 290 / 0.45), transparent 60%)" }} />
      <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-[61] h-3 w-3 rounded-full bg-white mix-blend-difference" />
    </>
  );
}
