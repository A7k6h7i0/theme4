import { useEffect, useRef } from "react";

/** Returns a ref with normalized [-1, 1] pointer coords, smoothed. */
export function usePointer() {
  const target = useRef({ x: 0, y: 0 });
  const value = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    let raf = 0;
    const tick = () => {
      value.current.x += (target.current.x - value.current.x) * 0.08;
      value.current.y += (target.current.y - value.current.y) * 0.08;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return value;
}
