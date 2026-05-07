'use client';

import { useEffect, useState } from 'react';

const BOOT_LINES: { key: string; val: string; cls?: 'header' | 'final' }[] = [
  { key: 'VEX/PLATFORM',         val: '// INITIALIZING', cls: 'header' },
  { key: 'VEX/CORE/PRIMARY',     val: 'ONLINE' },
  { key: 'VEX/NEURAL/L1',        val: 'SYNCED' },
  { key: 'VEX/NEURAL/L2',        val: 'SYNCED' },
  { key: 'VEX/EDGE/NA-EAST',     val: 'OK' },
  { key: 'VEX/EDGE/EMEA',        val: 'OK' },
  { key: 'VEX/EDGE/APAC',        val: 'OK' },
  { key: 'VEX/COMPUTE/CLUSTER',  val: 'OK' },
  { key: 'VEX/SYSTEMS · 65',     val: 'LOADED' },
  { key: 'VEX/CONTINENTS · 6',   val: 'ACTIVE' },
  { key: 'VEX/SECTORS · 26',     val: 'READY' },
  { key: 'VEX/SIGNAL/HANDSHAKE', val: 'COMPLETE' },
  { key: 'VEX/PLATFORM',         val: 'OPERATIONAL', cls: 'final' },
];

export function Preloader() {
  const [done, setDone] = useState(false);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [hideText, setHideText] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((_, i) => {
      timeouts.push(setTimeout(() => {
        setRevealed(prev => [...prev, i]);
      }, 150 + i * 100));
    });

    // Progress 0 -> 100 over 2.6s
    const start = performance.now() + 200;
    let raf = 0;
    function progFrame() {
      const t = (performance.now() - start) / 2600;
      if (t >= 1) { setProgress(100); return; }
      if (t > 0) setProgress(Math.floor(t * 100));
      raf = requestAnimationFrame(progFrame);
    }
    raf = requestAnimationFrame(progFrame);

    timeouts.push(setTimeout(() => setHideText(true), 2400));
    timeouts.push(setTimeout(() => setBurst(true), 2600));
    timeouts.push(setTimeout(() => setDone(true), 4200));

    return () => {
      timeouts.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-ink overflow-hidden transition-transform duration-[1.2s] ease-cinema ${
        done ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      aria-hidden={done}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(255,255,255,0.06),transparent_55%),radial-gradient(circle_at_30%_30%,rgba(180,200,220,0.04),transparent_50%)]" />

      {/* Boot feed */}
      <div
        className={`absolute top-[24%] left-1/2 -translate-x-1/2 w-[min(560px,80vw)] z-[4] transition-opacity duration-[600ms] font-mono text-[10.5px] tracking-[0.08em] uppercase text-text-3 leading-[1.85] ${
          hideText ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {BOOT_LINES.map((line, i) => (
          <div
            key={i}
            className={`flex items-center transition-all duration-[350ms] ${
              revealed.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-[2px]'
            } ${
              line.cls === 'header'
                ? 'justify-start gap-[14px] mb-[6px] pb-[6px] border-b border-line text-[11px] tracking-[0.18em] text-text'
                : line.cls === 'final'
                ? 'mt-[8px] pt-[8px] border-t border-line text-[11px] tracking-[0.16em] text-text justify-between'
                : 'justify-between py-[1px]'
            }`}
          >
            {line.cls === 'header' ? (
              <>
                <span className="live-d" />
                <span>{line.key}</span>
                <span className="text-signal-green">{line.val}</span>
              </>
            ) : (
              <>
                <span className="text-text-2 whitespace-nowrap">{line.key}</span>
                <span className="flex-1 mx-[10px] h-[0.7em] border-b border-dotted border-white/20 self-center" />
                <span className={line.cls === 'final' ? 'text-signal-green' : 'text-signal-green'}>[ {line.val} ]</span>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Center logo */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative">
          {/* Concentric ring bursts */}
          {burst && (
            <>
              {[0, 0.18, 0.36].map((d, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/60 rounded-full pointer-events-none"
                  style={{
                    animation: `bootBurst 1.6s cubic-bezier(0.22, 1, 0.36, 1) ${d}s forwards`,
                    width: 0, height: 0, opacity: 0,
                  }}
                />
              ))}
            </>
          )}
          {/* Scan line */}
          {!hideText && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[1px] bg-gradient-to-r from-transparent via-white/85 to-transparent z-[4] pointer-events-none"
              style={{
                animation: 'preScan 1.2s var(--ease) 2s forwards',
                opacity: 0,
                boxShadow: '0 0 14px 2px rgba(255,255,255,0.5)',
              }}
            />
          )}
          {/* VEXORA wordmark */}
          <h1
            className={`font-serif italic text-[clamp(64px,12vw,160px)] leading-none tracking-[-0.04em] text-text font-light transition-all duration-[900ms] ${
              hideText ? 'opacity-0 -translate-y-10 blur-xl' : 'opacity-100 translate-y-0'
            }`}
          >
            <span>V</span><span>e</span><span>x</span><span>o</span><span>r</span><span>a</span>
          </h1>
        </div>
      </div>

      {/* Bottom progress */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[min(360px,80vw)] z-[4]">
        <div className="flex justify-between items-center mb-3 font-mono text-[10px] tracking-[0.18em] uppercase text-text-3">
          <span>SYS · INIT</span>
          <span>{String(progress).padStart(3, '0')}</span>
        </div>
        <div className="h-px bg-line relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-text transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes bootBurst {
          0%   { width: 0; height: 0; opacity: 0; border-width: 2px; }
          15%  { opacity: 1; }
          100% { width: 1400px; height: 1400px; opacity: 0; border-width: 0.5px; }
        }
        @keyframes preScan {
          0%   { opacity: 0; transform: translate(-50%, -50%) translateY(-80px); }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%, -50%) translateY(80px); }
        }
      `}</style>
    </div>
  );
}
