'use client';

import { useEffect, useRef, useState } from 'react';
import type { VexSystem } from '@/lib/systems';
import { ArchBrackets, ActivityBars } from '@/components/ui/Primitives';

interface Props {
  system: VexSystem;
  verbs: string[];
  metrics: { accuracy: string; latency: string; ops: string; uptime: string };
}

const REGIONS = ['EMEA', 'NA', 'APAC', 'LATAM', 'MEA'];

export function SystemDashboard({ system, verbs, metrics }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [feed, setFeed] = useState<{ id: number; verb: string; region: string; lat: number }[]>([]);
  const [current, setCurrent] = useState('—');
  const [sync, setSync] = useState(2);

  useEffect(() => {
    const cv = canvasRef.current;
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

    // Seed from slug
    let seed = 0;
    for (let i = 0; i < system.slug.length; i++) seed = (seed * 31 + system.slug.charCodeAt(i)) >>> 0;
    const f1 = 0.10 + ((seed % 1000) / 1000) * 0.18;
    const f2 = 0.30 + ((seed % 777) / 777) * 0.40;
    const a1 = 0.10 + ((seed % 1234) / 1234) * 0.12;
    const a2 = 0.05 + ((seed % 999) / 999) * 0.08;
    const offset = 0.45 + ((seed % 555) / 555) * 0.10;

    const POINTS = 80;
    const data: number[] = [];
    const baseline: number[] = [];
    let phase = 0;

    let raf = 0;
    function frame() {
      if (!ctx) return;
      phase += 0.09;
      data.push(offset + Math.sin(phase * f1) * a1 + Math.sin(phase * f2) * a2 + (Math.random() - 0.5) * 0.06);
      if (data.length > POINTS) data.shift();
      baseline.push(offset + Math.sin(phase * f1 * 0.6) * a1 * 0.5);
      if (baseline.length > POINTS) baseline.shift();

      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < W; x += 36) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
      for (let y = 0; y < H; y += 30) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
      ctx.stroke();

      // Baseline (dashed)
      ctx.beginPath();
      ctx.setLineDash([3, 4]);
      ctx.strokeStyle = 'rgba(180,200,230,0.4)';
      ctx.lineWidth = 0.8;
      baseline.forEach((v, i) => {
        const x = (i / (POINTS - 1)) * W;
        const y = H - v * H;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);

      // Fill area
      ctx.beginPath();
      ctx.moveTo(0, H);
      data.forEach((v, i) => {
        const x = (i / (POINTS - 1)) * W;
        const y = H - v * H;
        i === 0 ? ctx.lineTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.lineTo(W, H);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, 'rgba(255,255,255,0.22)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fill();

      // Stroke
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,0.9)';
      ctx.lineWidth = 1.4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      data.forEach((v, i) => {
        const x = (i / (POINTS - 1)) * W;
        const y = H - v * H;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Trailing dot
      if (data.length > 0) {
        const lastV = data[data.length - 1];
        const lx = W;
        const ly = H - lastV * H;
        const dotGrad = ctx.createRadialGradient(lx, ly, 0, lx, ly, 14);
        dotGrad.addColorStop(0, 'rgba(255,255,255,0.95)');
        dotGrad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = dotGrad;
        ctx.beginPath();
        ctx.arc(lx, ly, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(lx, ly, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    }
    frame();

    const curT = setInterval(() => {
      const cur = data[data.length - 1] || 0.5;
      setCurrent((cur * 100).toFixed(1) + '%');
    }, 350);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      clearInterval(curT);
    };
  }, [system.slug]);

  // Live feed ticker
  useEffect(() => {
    let id = 0;
    function tick() {
      setFeed(prev => [
        { id: id++, verb: verbs[Math.floor(Math.random() * verbs.length)],
          region: REGIONS[Math.floor(Math.random() * REGIONS.length)],
          lat: Math.round(80 + Math.random() * 160) },
        ...prev,
      ].slice(0, 6));
    }
    // Initial
    for (let i = 0; i < 4; i++) tick();
    const t = setInterval(tick, 2200);
    const syncT = setInterval(() => setSync(s => s + 1), 1000);
    return () => { clearInterval(t); clearInterval(syncT); };
  }, [verbs]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      {/* Chart */}
      <div className="relative rounded-2xl border border-line bg-graphite/40 backdrop-blur-md p-6 h-[400px] overflow-hidden">
        <ArchBrackets />
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-3">VEX/SIGNAL · live throughput</div>
            <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-text-3 mt-1">{system.code}</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-text-3">now</div>
            <div className="font-serif italic text-3xl text-text leading-none">{current}</div>
          </div>
        </div>
        <canvas ref={canvasRef} className="absolute inset-0 mt-16" />
      </div>

      {/* Side stats + feed */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {[
            { l: system.metricLabel, v: system.metricValue },
            { l: 'ops · 24h', v: metrics.ops },
            { l: 'response', v: metrics.latency },
            { l: 'accuracy', v: metrics.accuracy },
          ].map((s, i) => (
            <div key={i} className="bg-graphite/40 p-4 backdrop-blur-md">
              <div className="font-serif italic text-2xl text-text leading-none">{s.v}</div>
              <div className="font-mono text-[8.5px] tracking-[0.16em] uppercase text-text-3 mt-2">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-line bg-graphite/40 backdrop-blur-md p-5">
          <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-text-3 mb-3 flex items-center gap-2">
            <span className="live-d" />
            Live activity
          </div>
          <div className="space-y-1.5">
            {feed.map(row => (
              <div key={row.id} className="grid grid-cols-[1fr_auto_auto] gap-3 font-mono text-[10px] tracking-[0.10em] py-1.5 border-b border-white/5 last:border-0">
                <span className="text-text-2 truncate"><span className="text-text">{system.code.split('/').slice(-1)}</span> · {row.verb}</span>
                <span className="text-text-3">{row.region}</span>
                <span className="text-text-3">{row.lat}ms</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-line">
            <ActivityBars />
          </div>
        </div>

        <div className="flex items-center justify-between font-mono text-[9.5px] tracking-[0.16em] uppercase text-text-3 px-2">
          <span>last sync · {sync}s ago</span>
          <span className="flex gap-3">
            <span>SOC 2</span><span>·</span><span>ISO</span><span>·</span><span>GDPR</span>
          </span>
        </div>
      </div>
    </div>
  );
}
