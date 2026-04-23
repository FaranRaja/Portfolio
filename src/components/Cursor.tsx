import { useEffect, useRef } from 'react';

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;
    let hovering = false;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const el = (e.target as HTMLElement).closest('a, button, [data-hover]');
      hovering = !!el;
    };

    const tick = () => {
      // Dot follows instantly
      dotX += (mouseX - dotX) * 0.85;
      dotY += (mouseY - dotY) * 0.85;

      // Ring lags smoothly
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`;
      }
      if (ringRef.current) {
        const scale = hovering ? 1.7 : 1;
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px) scale(${scale})`;
        ringRef.current.style.borderColor = hovering ? 'rgba(124,106,255,0.9)' : 'rgba(124,106,255,0.5)';
        ringRef.current.style.background = hovering ? 'rgba(124,106,255,0.1)' : 'transparent';
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-10 h-10 rounded-full border transition-colors duration-200"
        style={{ willChange: 'transform', borderColor: 'rgba(124,106,255,0.5)' }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-1.5 h-1.5 rounded-full bg-accent"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
