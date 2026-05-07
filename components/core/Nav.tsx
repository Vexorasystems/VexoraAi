'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '#divisions',  label: 'Divisions' },
  { href: '#systems',    label: 'Systems', mega: true },
  { href: '#industries', label: 'Industries' },
  { href: '#ops',        label: 'Operations' },
  { href: '#voices',     label: 'Voices' },
  { href: '#contact',    label: 'Contact' },
];

const MEGA_GROUPS = [
  { title: 'Cognitive Infrastructure', items: ['Aurelis', 'Cirrus', 'Concord', 'Civic'] },
  { title: 'Operational Intelligence', items: ['Citadel', 'Northstar', 'Aegis', 'Atlas'] },
  { title: 'Enterprise Automation',    items: ['Halcyon', 'Compass', 'Helix', 'Lattice'] },
  { title: 'Autonomous Workflows',     items: ['Sentinel', 'Beacon', 'Forge', 'Hardwall'] },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 24); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function openPalette() {
    if (typeof window !== 'undefined' && (window as any).__VEX_OPEN_PALETTE) {
      (window as any).__VEX_OPEN_PALETTE();
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl-2 bg-ink/72 border-b border-line' : 'bg-transparent'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)' }}
    >
      <nav className="container-pad flex items-center justify-between py-5">
        <Link href="/" className="font-serif italic text-2xl tracking-[-0.03em] font-light" data-magnet>
          Vexora
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <li
              key={l.href}
              onMouseEnter={() => l.mega && setMega(true)}
              onMouseLeave={() => l.mega && setMega(false)}
              className="relative"
            >
              <a
                href={l.href}
                data-magnet
                className="px-4 py-2 text-[13px] tracking-tight text-text-2 hover:text-text transition-colors duration-300 inline-flex items-center gap-2"
              >
                {l.label}
                {l.mega && (
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-text-3">
            <span className="live-d" />
            Operational · UK
          </span>
          <button
            onClick={openPalette}
            className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-line text-[10px] font-mono tracking-[0.14em] uppercase text-text-3 hover:text-text hover:border-white/30 hover:bg-white/5 transition-all"
            data-magnet
          >
            <span className="live-d" />
            Search
            <kbd className="text-[10px] text-text-2">⌘K</kbd>
          </button>
          <a href="#contact" className="btn btn-ghost text-[12px] py-2.5 px-5" data-magnet>
            <span>Book Consultation</span>
          </a>
        </div>
      </nav>

      <AnimatePresence>
        {mega && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            onMouseEnter={() => setMega(true)}
            onMouseLeave={() => setMega(false)}
            className="absolute top-full left-0 right-0 backdrop-blur-xl-2 bg-ink/95 border-b border-line"
          >
            <div className="container-pad py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {MEGA_GROUPS.map((g) => (
                <div key={g.title}>
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-3 mb-4 pb-3 border-b border-line">
                    {g.title}
                  </div>
                  <ul className="space-y-3">
                    {g.items.map((it) => (
                      <li key={it}>
                        <Link
                          href={`/systems/${it.toLowerCase().replace(/\s/g, '-')}`}
                          className="font-serif italic text-xl text-text hover:text-white transition-colors block"
                          data-magnet
                        >
                          {it}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
