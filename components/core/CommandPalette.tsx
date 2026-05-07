'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { systems } from '@/lib/systems';

const SECTIONS = [
  { target: '#divisions',  title: 'Divisions',           sub: 'VEX/I → VEX/VI · operating divisions',  badge: '§01' },
  { target: '#systems',    title: 'Operating Ecosystem', sub: 'AI solar system · 6 modules',            badge: '§02' },
  { target: '#catalog',    title: 'Systems Catalog',     sub: '65 enterprise systems · 26 sectors',     badge: '§03' },
  { target: '#industries', title: 'Industries',          sub: 'Sector deployments',                      badge: '§04' },
  { target: '#ops',        title: 'Operations Network',  sub: '247 deployments · 6 continents',         badge: '§05' },
  { target: '#voices',     title: 'Voices',              sub: 'Operator testimony',                      badge: '§06' },
  { target: '#contact',    title: 'Engage',              sub: 'Begin engagement',                        badge: '§07' },
] as const;

type Item =
  | { type: 'jump'; target: string; title: string; sub: string; badge: string }
  | { type: 'system'; index: number; code: string; slug: string; name: string; sector: string; search: string };

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build system items
  const systemItems: Item[] = systems.map((s, i) => ({
    type: 'system',
    index: i,
    code: s.code,
    slug: s.slug,
    name: s.name,
    sector: `${s.industry} · ${s.category}`,
    search: `${s.code} ${s.name} ${s.industry} ${s.category}`.toLowerCase(),
  }));

  const sectionItems: Item[] = SECTIONS.map(s => ({ type: 'jump', ...s }));

  const q = query.toLowerCase().trim();
  const filtered: Item[] = !q
    ? [...sectionItems, ...systemItems.slice(0, 12)]
    : [
        ...sectionItems.filter(s => s.type === 'jump' && (s.title + s.sub).toLowerCase().includes(q)),
        ...systemItems.filter(it => it.type === 'system' && it.search.includes(q)),
      ];

  // Expose to window
  useEffect(() => {
    (window as any).__VEX_OPEN_PALETTE = () => setOpen(true);
    (window as any).__VEX_CLOSE_PALETTE = () => setOpen(false);
  }, []);

  // Keyboard
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(o => !o);
        return;
      }
      if (!open) return;
      if (e.key === 'Escape') { setOpen(false); }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
      if (e.key === 'Enter')     { e.preventDefault(); activate(filtered[active]); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, active]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  function activate(item: Item | undefined) {
    if (!item) return;
    setOpen(false);
    setTimeout(() => {
      if (item.type === 'jump') {
        const el = document.querySelector(item.target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        router.push(`/systems/${item.slug}`);
      }
    }, 180);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1100]" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-ink/78 backdrop-blur-2xl"
        onClick={() => setOpen(false)}
      />
      <div className="absolute top-[14vh] left-1/2 -translate-x-1/2 w-[min(680px,92vw)] bg-ink-2/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-lift overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-line">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-text-3">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            placeholder="Search 65 systems · sectors · sections"
            className="flex-1 bg-transparent outline-none text-text placeholder:text-text-3 text-[15px]"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="text-[10px] font-mono tracking-[0.14em] uppercase text-text-3 px-2 py-1 border border-line rounded bg-white/5">esc</kbd>
        </div>

        <div className="max-h-[50vh] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="py-12 text-center font-mono text-[10px] tracking-[0.18em] uppercase text-text-3">No matches</div>
          ) : (
            filtered.map((it, i) => (
              <button
                key={i}
                onClick={() => activate(it)}
                onMouseEnter={() => setActive(i)}
                className={`w-full flex gap-3 items-center px-6 py-3 border-l-2 text-left transition-colors ${
                  i === active
                    ? 'bg-white/[0.04] border-white/85'
                    : 'border-transparent hover:bg-white/[0.02]'
                }`}
              >
                <span className={`w-8 h-8 grid place-items-center border rounded font-mono text-[10px] tracking-[0.14em] uppercase ${
                  i === active ? 'border-white/45 text-text bg-white/5' : 'border-line text-text-2 bg-white/[0.02]'
                }`}>
                  {it.type === 'jump' ? it.badge : it.code.split('/')[1]}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-text text-[14px] truncate">
                    {it.type === 'jump' ? (
                      it.title
                    ) : (
                      <>
                        <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-text-3 mr-1">{it.code}</span>
                        · <em className="font-serif text-[15px] not-italic-fix italic">{it.name}</em>
                      </>
                    )}
                  </span>
                  <span className="block font-mono text-[9.5px] tracking-[0.16em] uppercase text-text-3 truncate mt-0.5">
                    {it.type === 'jump' ? it.sub : it.sector}
                  </span>
                </span>
              </button>
            ))
          )}
        </div>

        <div className="flex gap-6 px-6 py-3 border-t border-line bg-white/[0.012] font-mono text-[9px] tracking-[0.14em] uppercase text-text-3">
          <span><kbd className="px-1.5 py-0.5 border border-line rounded text-text-2 mr-1.5">↵</kbd>open</span>
          <span><kbd className="px-1.5 py-0.5 border border-line rounded text-text-2 mr-1">↑</kbd><kbd className="px-1.5 py-0.5 border border-line rounded text-text-2 mr-1.5">↓</kbd>navigate</span>
          <span><kbd className="px-1.5 py-0.5 border border-line rounded text-text-2 mr-1.5">esc</kbd>close</span>
        </div>
      </div>
    </div>
  );
}
