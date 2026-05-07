'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SectionTag, ArchBrackets, ActivityBars } from '@/components/ui/Primitives';

const Globe = dynamic(() => import('@/components/three/Globe').then(m => m.Globe), { ssr: false });

const FEED_VERBS = [
  'route optimised', 'turnaround coordinated', 'guest request fulfilled', 'AML check passed',
  'matter intake reconciled', 'anomaly auto-resolved', 'donor outreach queued', 'comp pulled',
  'kitchen pace tuned', 'fleet rebalanced', 'prior-auth submitted', 'permit fast-tracked',
];

export function Operations() {
  const [feed, setFeed] = useState<{ id: number; verb: string; region: string; lat: number }[]>([]);

  useEffect(() => {
    const regions = ['EMEA', 'NA', 'APAC', 'LATAM', 'MEA'];
    let id = 0;
    function tick() {
      setFeed(prev => {
        const next = [
          { id: id++, verb: FEED_VERBS[Math.floor(Math.random() * FEED_VERBS.length)],
            region: regions[Math.floor(Math.random() * regions.length)],
            lat: Math.round(80 + Math.random() * 160) },
          ...prev,
        ];
        return next.slice(0, 5);
      });
    }
    tick();
    const t = setInterval(tick, 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="ops" className="relative py-32">
      <div className="container-pad">
        <SectionTag num="06" label="OPERATIONS NETWORK" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-text font-light tracking-[-0.03em] leading-[0.98] text-[clamp(36px,5.5vw,72px)] max-w-3xl mb-6"
        >
          247 deployments. <em className="italic text-text-2">Six continents. One truth.</em>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-14">
          {/* Globe */}
          <div className="lg:col-span-2 relative h-[500px] rounded-2xl border border-line bg-graphite/30 overflow-hidden">
            <ArchBrackets />
            <Globe />
            <div className="absolute top-5 left-5 font-mono text-[9.5px] tracking-[0.18em] uppercase text-text-3">
              VEX/GRID · LIVE
            </div>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.18em] uppercase text-text-3 bg-ink/60 backdrop-blur-md px-3 py-1 rounded-full border border-line">
              drag to orbit
            </div>
          </div>

          {/* Stats + feed */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: '247', l: 'deployments' },
                { v: '6', l: 'continents' },
                { v: '142ms', l: 'p50 latency' },
                { v: '99.998%', l: 'uptime' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="glob-stat relative rounded-xl border border-line bg-graphite/30 p-5 backdrop-blur-md"
                >
                  <div className="font-serif italic text-3xl text-text leading-none">{s.v}</div>
                  <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-text-3 mt-2">{s.l}</div>
                </motion.div>
              ))}
            </div>

            {/* Live feed */}
            <div className="rounded-xl border border-line bg-graphite/30 p-5 backdrop-blur-md">
              <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-text-3 mb-3 flex items-center gap-2">
                <span className="live-d" />
                Live network feed
              </div>
              <div className="space-y-2">
                {feed.map(row => (
                  <motion.div
                    key={row.id}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-[1fr_auto_auto] gap-3 font-mono text-[10px] tracking-[0.10em] text-text-2 py-1.5 border-b border-white/5"
                  >
                    <span><span className="text-text">VEX</span> · {row.verb}</span>
                    <span className="text-text-3">{row.region}</span>
                    <span className="text-text-3">{row.lat}ms</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-line">
                <ActivityBars />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
