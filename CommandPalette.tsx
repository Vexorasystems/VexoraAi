'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Button, ArchBrackets } from '@/components/ui/Primitives';
import { useEffect, useRef } from 'react';

const HeroScene = dynamic(() => import('@/components/three/HeroScene').then(m => m.HeroScene), { ssr: false });

export function Hero() {
  const networkRef = useRef<HTMLCanvasElement>(null);

  // Lightweight 2D neural network overlay
  useEffect(() => {
    const cv = networkRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let W = 0, H = 0;
    function resize() {
      if (!cv || !ctx) return;
      const r = cv.getBoundingClientRect();
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    const N = 80;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
      r: 1 + Math.random() * 1.5,
    }));
    let mx = -1, my = -1;
    function onMove(e: MouseEvent) {
      const r = cv!.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width;
      my = (e.clientY - r.top) / r.height;
    }
    cv.addEventListener('mousemove', onMove);

    let raf = 0;
    function frame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
        // Cursor repulsion
        if (mx > 0) {
          const dx = n.x - mx, dy = n.y - my;
          const d = Math.hypot(dx, dy);
          if (d < 0.12) { n.x += dx * 0.04; n.y += dy * 0.04; }
        }
      });
      // Lines
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 0.4;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 0.13) {
            ctx.globalAlpha = (1 - d / 0.13) * 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x * W, nodes[i].y * H);
            ctx.lineTo(nodes[j].x * W, nodes[j].y * H);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      // Nodes
      nodes.forEach(n => {
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.beginPath();
        ctx.arc(n.x * W, n.y * H, n.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(frame);
    }
    frame();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      cv?.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden">
      {/* Tunnel grid backdrop */}
      <div className="absolute inset-0 z-[1] opacity-[0.18]" style={{
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse at 50% 60%, black 30%, transparent 80%)',
      }} />

      {/* Three.js scene */}
      <div className="absolute inset-0 z-[2]">
        <HeroScene />
      </div>

      {/* Neural network */}
      <canvas ref={networkRef} className="absolute inset-0 z-[3] pointer-events-none opacity-50" />

      {/* Telemetry HUD floating labels */}
      <div className="absolute inset-0 z-[4] pointer-events-none">
        {[
          { top: '20%', left: '8%', code: 'VEX/ROUTE', val: 'optimal', meta: '142ms' },
          { top: '32%', right: '10%', code: 'VEX/CAPTURE', val: '98.4%', meta: '↑ 1.2%' },
          { bottom: '36%', left: '12%', code: 'VEX/SIGNAL', val: 'clean', meta: 'low entropy' },
          { bottom: '28%', right: '8%', code: 'VEX/THROUGHPUT', val: '184k/d', meta: '↑ stable' },
          { top: '52%', left: '4%', code: 'VEX/SECTORS', val: '26 active', meta: '6 cont.' },
          { top: '58%', right: '4%', code: 'VEX/COMPUTE', val: '94.2%', meta: 'nominal' },
        ].map((h, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 + i * 0.1 }}
            className="absolute px-3 py-2 border border-line rounded bg-ink/60 backdrop-blur-md hidden lg:block"
            style={h as any}
          >
            <div className="font-mono text-[8.5px] tracking-[0.18em] uppercase text-text-3 mb-1">{h.code}</div>
            <div className="font-serif italic text-base text-text leading-none">{h.val}</div>
            <div className="font-mono text-[8.5px] tracking-[0.14em] uppercase text-text-3 mt-1">{h.meta}</div>
          </motion.div>
        ))}
      </div>

      <div className="container-pad relative z-[5]">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-3 mb-8 flex items-center gap-3"
          >
            <span className="live-d" />
            <span>VEX/PLATFORM</span>
            <span className="opacity-50">·</span>
            <span className="text-text-2">OPERATIONAL · 65 SYSTEMS · 6 CONTINENTS</span>
          </motion.div>

          <h1 className="font-serif text-text font-light tracking-[-0.04em] leading-[0.96] text-[clamp(48px,8.5vw,128px)] mb-6">
            <motion.span
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
              transition={{ duration: 1.0, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
              className="block"
            >
              Operational AI
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
              transition={{ duration: 1.0, delay: 0.55, ease: [0.65, 0, 0.35, 1] }}
              className="block italic text-text-2"
            >
              for the modern
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
              transition={{ duration: 1.0, delay: 0.7, ease: [0.65, 0, 0.35, 1] }}
              className="block"
            >
              enterprise.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-text-2 text-[17px] md:text-lg leading-relaxed max-w-xl mb-10"
          >
            Vexora builds the operational AI infrastructure capable of automating entire industries. Sixty-five enterprise systems, six divisions, six continents — one operating layer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button href="#contact">Begin engagement</Button>
            <Button href="#systems" variant="ghost">View systems</Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom HUD corners */}
      <ArchBrackets />
    </section>
  );
}
