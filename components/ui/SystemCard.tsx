'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { VexSystem } from '@/lib/systems';
import { deriveStackType } from '@/lib/systems';
import { sparkPath } from './Primitives';

interface SystemCardProps {
  system: VexSystem;
  index: number;
}

export function SystemCard({ system, index }: SystemCardProps) {
  const statusLabel =
    system.status === 'op' ? 'Operational' :
    system.status === 'heat' ? 'High Load' : 'Provisioning';

  const stackType = deriveStackType(system.category);
  const spark = sparkPath(index + 1);
  const initSync = (index * 7 % 50) + 4;

  return (
    <Link href={`/systems/${system.slug}`} className="block">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
        className="product holo-edge group relative rounded-2xl border border-line bg-graphite/60 backdrop-blur-md p-7 h-full flex flex-col overflow-hidden hover:border-white/15 transition-colors duration-500"
        data-magnet
      >
        <span className="arch-bracket tl !w-3 !h-3 !top-3 !left-3" />
        <span className="arch-bracket tr !w-3 !h-3 !top-3 !right-3" />

        {/* Head row: code + status */}
        <div className="flex items-center justify-between font-mono text-[9.5px] tracking-[0.16em] uppercase mb-5">
          <span className="text-text-2">{system.code}</span>
          <span
            className={`inline-flex items-center gap-1.5 ${
              system.status === 'heat' ? 'text-signal-amber' :
              system.status === 'idle' ? 'text-signal-blue' : 'text-signal-green'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full inline-block ${
                system.status === 'heat' ? 'bg-signal-amber shadow-[0_0_8px_currentColor]' :
                system.status === 'idle' ? 'bg-signal-blue shadow-[0_0_8px_currentColor]' :
                'bg-signal-green shadow-[0_0_8px_currentColor] animate-pulse-soft'
              }`}
            />
            {statusLabel}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-serif italic text-2xl leading-tight tracking-[-0.02em] text-text mb-2">
          {system.name}
        </h3>

        {/* Stack-type chip */}
        <div className="inline-flex self-start font-mono text-[9px] tracking-[0.16em] uppercase text-text px-2.5 py-1 border border-line rounded bg-white/[0.025] mb-3">
          {stackType}
        </div>

        {/* Sector breadcrumb */}
        <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-text-3 mb-4">
          {system.industry} · {system.category}
        </div>

        {/* Description */}
        <p className="text-text-2 text-[13px] leading-relaxed mb-5 flex-1">
          {system.description}
        </p>

        {/* Sparkline */}
        <div className="relative h-5 mb-4">
          <svg viewBox="0 0 100 18" preserveAspectRatio="none" className="w-full h-full">
            <path
              d={spark}
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={spark}
              fill="none"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="0.85"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="200"
              strokeDashoffset="200"
              style={{
                animation: `sparkRun 4s cubic-bezier(0.65, 0, 0.35, 1) ${(index % 6) * 0.3}s infinite`,
              }}
            />
          </svg>
        </div>

        {/* Features pills */}
        <ul className="flex flex-wrap gap-1.5 mb-5">
          {system.features.map((f, i) => (
            <li key={i} className="font-mono text-[9px] tracking-[0.12em] uppercase text-text-2 px-2 py-0.5 border border-line rounded">
              {f}
            </li>
          ))}
        </ul>

        {/* Foot */}
        <div className="flex items-center justify-between pt-4 border-t border-line text-[10px] font-mono">
          <span className="text-text-3 tracking-[0.14em] uppercase">
            {system.metricLabel} <strong className="text-text font-normal ml-1">{system.metricValue}</strong>
          </span>
          <span className="text-text-3 tracking-[0.12em]">last sync · {initSync}s</span>
          <span className="w-6 h-6 grid place-items-center border border-line rounded-full text-text-2 group-hover:text-text group-hover:border-white/40 transition-colors">
            <svg viewBox="0 0 14 14" width="9" height="9" fill="none">
              <path d="M3 11L11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <style jsx>{`
          @keyframes sparkRun {
            0%   { stroke-dashoffset: 200; }
            45%  { stroke-dashoffset: 0; }
            55%  { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -200; }
          }
        `}</style>
      </motion.article>
    </Link>
  );
}
