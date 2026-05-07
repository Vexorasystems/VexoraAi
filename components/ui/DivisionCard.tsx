'use client';

import { motion } from 'framer-motion';
import type { Division } from '@/lib/divisions';
import { ArchBrackets } from './Primitives';

interface DivisionCardProps {
  division: Division;
  index: number;
}

export function DivisionCard({ division, index }: DivisionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.65, 0, 0.35, 1] }}
      whileHover={{ y: -4 }}
      className="div-card holo-edge relative rounded-2xl border border-line bg-graphite/40 backdrop-blur-md p-8 h-full flex flex-col overflow-hidden hover:border-white/15 transition-colors duration-500 group"
      data-magnet
    >
      <ArchBrackets />

      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em] uppercase mb-6 relative z-10">
        <span className="text-text-2">{division.vex}</span>
        <span className="text-signal-green inline-flex items-center gap-2">
          <span className="live-d" />
          live
        </span>
      </div>

      <h3 className="font-serif italic text-3xl md:text-4xl leading-tight tracking-[-0.025em] text-text mb-6 relative z-10">
        {division.name}
      </h3>

      <p className="text-text-2 text-[14px] leading-relaxed mb-6 flex-1 relative z-10">
        {division.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-6 relative z-10">
        {division.tags.map((t, i) => (
          <span key={i} className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-text-3 px-2.5 py-1 border border-line rounded">
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-end justify-between pt-6 border-t border-line relative z-10">
        <div>
          <div className="font-serif italic text-3xl text-text leading-none">{division.metric}</div>
          <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-text-3 mt-2">{division.metricLabel}</div>
        </div>
        <span className="w-8 h-8 grid place-items-center border border-line rounded-full text-text-2 group-hover:text-text group-hover:border-white/45 group-hover:bg-white/5 transition-all">
          <svg viewBox="0 0 14 14" width="10" height="10" fill="none">
            <path d="M3 11L11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </motion.div>
  );
}
