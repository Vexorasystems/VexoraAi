'use client';

import { useEffect, useRef } from 'react';

export function AmbientParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let W = window.innerWidth, H = window.innerHeight;

    function resize() {
      if (!cv || !ctx) return;
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      cv.style.width = W + 'px'; cv.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    const N = 70;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vy: -(0.08 + Math.random() * 0.22),
      vx: (Math.random() - 0.5) * 0.08,
      r: 0.4 + Math.random() * 1.1,
      a: 0.10 + Math.random() * 0.35,
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.018 + Math.random() * 0.025,
    }));

    let mx = -9999, my = -9999;
    function onMove(e: MouseEvent) { mx = e.clientX; my = e.clientY; }
    window.addEventListener('mousemove', onMove);

    let raf = 0;
    function frame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;

        if (mx > -9000) {
          const dx = p.x - mx, dy = p.y - my;
          const d = Math.hypot(dx, dy);
          if (d < 90) {
            const f = (1 - d / 90) * 0.6;
            p.x += (dx / (d || 1)) * f;
            p.y += (dy / (d || 1)) * f;
          }
        }

        p.phase += p.twinkleSpeed;
        const tw = (Math.sin(p.phase) + 1) * 0.5;
        const alpha = p.a * (0.5 + tw * 0.5);

        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        halo.addColorStop(0, `rgba(220,230,245,${alpha * 0.6})`);
        halo.addColorStop(1, 'rgba(220,230,245,0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-[1] pointer-events-none opacity-55"
    />
  );
}
