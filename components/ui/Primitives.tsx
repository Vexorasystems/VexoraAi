'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// ============================================================
// Button (with magnetic hover and sheen)
// ============================================================
interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: 'solid' | 'ghost';
  className?: string;
}

export function Button({ href, onClick, children, variant = 'solid', className }: ButtonProps) {
  const cls = cn(
    'btn',
    variant === 'ghost' && 'btn-ghost',
    className
  );
  if (href) {
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http')) {
      return (
        <a href={href} className={cls} data-magnet>
          <span>{children}</span>
        </a>
      );
    }
    return (
      <Link href={href} className={cls} data-magnet>
        <span>{children}</span>
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={cls} data-magnet>
      <span>{children}</span>
    </button>
  );
}

// ============================================================
// Architectural corner brackets
// ============================================================
export function ArchBrackets() {
  return (
    <>
      <span className="arch-bracket tl" />
      <span className="arch-bracket tr" />
      <span className="arch-bracket bl" />
      <span className="arch-bracket br" />
    </>
  );
}

// ============================================================
// Flow divider between sections (animated traveling dot + gradient line)
// ============================================================
export function FlowDivider() {
  return <div className="flow-divider" aria-hidden />;
}

// ============================================================
// Activity bars (signal cells indicator)
// ============================================================
export function ActivityBars({ count = 14 }: { count?: number }) {
  return (
    <div className="activity-bars">
      {Array.from({ length: count }).map((_, i) => (
        <i
          key={i}
          style={{
            ['--bd' as any]: `${1.4 + (i % 5) * 0.18}s`,
            ['--bdd' as any]: `${(i % 6) * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// Section number tag — e.g. §01 / DIVISIONS
// ============================================================
export function SectionTag({ num, label }: { num: string; label: string }) {
  return (
    <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-3 mb-6 flex items-center gap-3">
      <span className="live-d" />
      <span>§{num}</span>
      <span className="opacity-50">/</span>
      <span className="text-text-2">{label}</span>
    </div>
  );
}

// ============================================================
// sparkPath — deterministic SVG sparkline path generator
// Defined here as a primary, first-class named export so any
// file in the project can import it from this module without
// transitive resolution. Also defined in lib/utils.ts.
// ============================================================
export function sparkPath(seed: number): string {
  let s = seed;
  function r(): number { s = (s * 9301 + 49297) % 233280; return s / 233280; }
  const points: [number, number][] = Array.from({ length: 24 }, (_, i) => {
    const x = (i / 23) * 100;
    const y = 9 + Math.sin(i * 0.5 + seed) * 4 + (r() - 0.5) * 3;
    return [x, Math.max(1, Math.min(17, y))];
  });
  return points.map((p, i) => (i === 0 ? `M${p[0]} ${p[1]}` : `L${p[0]} ${p[1]}`)).join(' ');
}
