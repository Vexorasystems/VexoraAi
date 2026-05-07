'use client';

import { useEffect, useRef } from 'react';

type CursorState = 'default' | 'button' | 'card' | 'text' | 'pressed';

export function CustomCursor() {
  const haloRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    document.body.classList.add('cursor-active');

    // Build 6 trail particles
    const trails: HTMLDivElement[] = [];
    for (let i = 0; i < 6; i++) {
      const t = document.createElement('div');
      t.className = 'cx-trail';
      document.body.appendChild(t);
      trails.push(t);
    }
    trailsRef.current = trails;

    const halo = haloRef.current;
    const mid = midRef.current;
    const ring = ringRef.current;
    const core = coreRef.current;
    if (!halo || !mid || !ring || !core) return;
    const layers: HTMLDivElement[] = [halo, mid, ring, core];

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let lastX = mx, lastY = my;
    const pos = {
      halo: { x: mx, y: my, ease: 0.10 },
      mid:  { x: mx, y: my, ease: 0.20 },
      ring: { x: mx, y: my, ease: 0.30 },
      core: { x: mx, y: my, ease: 1.00 },
    };
    const history: { x: number; y: number }[] = [];
    for (let i = 0; i < 30; i++) history.push({ x: mx, y: my });

    function setState(s: CursorState) {
      layers.forEach(l => {
        l.classList.remove('is-default', 'is-button', 'is-card', 'is-text', 'is-pressed');
        l.classList.add('is-' + s);
      });
    }
    setState('default');

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
    }
    window.addEventListener('mousemove', onMove, { passive: true });

    function onDown(e: MouseEvent) {
      layers.forEach(l => l.classList.add('is-pressed'));
      const rip = document.createElement('div');
      rip.className = 'cx-ripple';
      rip.style.left = e.clientX + 'px';
      rip.style.top = e.clientY + 'px';
      document.body.appendChild(rip);
      setTimeout(() => rip.remove(), 1100);
    }
    function onUp() {
      layers.forEach(l => l.classList.remove('is-pressed'));
    }
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    // Hover state delegation via mouseover bubbling
    function detectState(target: Element | null): CursorState {
      if (!target) return 'default';
      if (target.closest('input, textarea, select, [contenteditable]')) return 'text';
      if (target.closest('a, button, .btn, [data-magnet], .nav-mega li, .sys-chip, .chip')) return 'button';
      if (target.closest('.product, .div-card, .voice, .testi-card, .stat, .glob-stat, .ind-row, .cap, .case-card')) return 'card';
      return 'default';
    }
    let currentState: CursorState = 'default';
    function onOver(e: MouseEvent) {
      const s = detectState(e.target as Element);
      if (s !== currentState) {
        setState(s);
        currentState = s;
      }
    }
    document.addEventListener('mouseover', onOver);

    let raf = 0;
    function tick() {
      const vx = mx - lastX, vy = my - lastY;
      lastX = mx; lastY = my;
      const speed = Math.min(Math.hypot(vx, vy), 80);

      Object.values(pos).forEach(p => {
        p.x += (mx - p.x) * p.ease;
        p.y += (my - p.y) * p.ease;
      });

      halo!.style.transform = `translate3d(${pos.halo.x}px, ${pos.halo.y}px, 0) translate(-50%, -50%)`;
      mid!.style.transform  = `translate3d(${pos.mid.x}px, ${pos.mid.y}px, 0) translate(-50%, -50%)`;
      ring!.style.transform = `translate3d(${pos.ring.x}px, ${pos.ring.y}px, 0) translate(-50%, -50%)`;
      core!.style.transform = `translate3d(${pos.core.x}px, ${pos.core.y}px, 0) translate(-50%, -50%)`;

      history.unshift({ x: mx, y: my });
      history.pop();

      trails.forEach((t, i) => {
        const sample = history[(i + 1) * 4] || history[history.length - 1];
        const op = Math.min(speed * 0.025, 0.55) * (1 - i / trails.length);
        const sz = Math.max(2, 5 - i * 0.6);
        t.style.transform = `translate3d(${sample.x}px, ${sample.y}px, 0) translate(-50%, -50%)`;
        t.style.opacity = String(op);
        t.style.width = sz + 'px';
        t.style.height = sz + 'px';
      });

      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
      trails.forEach(t => t.remove());
      document.body.classList.remove('cursor-active');
    };
  }, []);

  return (
    <>
      <div ref={haloRef} className="cx cx-halo is-default" />
      <div ref={midRef} className="cx cx-mid is-default" />
      <div ref={ringRef} className="cx cx-ring is-default" />
      <div ref={coreRef} className="cx cx-core is-default" />
    </>
  );
}
