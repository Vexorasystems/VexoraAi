'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { systems, industries } from '@/lib/systems';
import { SystemCard } from '@/components/ui/SystemCard';
import { SectionTag } from '@/components/ui/Primitives';

export function Catalog() {
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return systems.filter(s => {
      if (filter !== 'All' && s.industry !== filter) return false;
      if (q) {
        const hay = (s.code + ' ' + s.name + ' ' + s.industry + ' ' + s.category + ' ' + s.description).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [filter, search]);

  return (
    <section id="catalog" className="relative py-32">
      <div className="container-pad">
        <SectionTag num="04" label="SYSTEMS CATALOG" />
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-text font-light tracking-[-0.03em] leading-[0.98] text-[clamp(36px,5.5vw,72px)] max-w-3xl mb-4"
            >
              Sixty-five systems, <em className="italic text-text-2">in production</em>.
            </motion.h2>
            <p className="text-text-2 text-[15px] max-w-xl leading-relaxed">
              Every Vexora system is operational, deployed, and observable. Search and filter the live catalog.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Search 65 systems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full lg:w-80 bg-graphite/50 border border-line rounded-full px-5 py-3 text-[13px] text-text placeholder:text-text-3 outline-none focus:border-white/30 transition-all"
              data-magnet
            />
            <div className="text-[10px] font-mono tracking-[0.16em] uppercase text-text-3">
              {filtered.length} of {systems.length} matching
            </div>
          </div>
        </div>

        {/* Industry filter chips */}
        <div className="flex flex-wrap gap-2 mb-12">
          {['All', ...industries].map(ind => (
            <button
              key={ind}
              onClick={() => setFilter(ind)}
              className={`chip font-mono text-[10px] tracking-[0.14em] uppercase px-3 py-1.5 border rounded-full transition-all ${
                filter === ind
                  ? 'border-white text-text bg-white/10'
                  : 'border-line text-text-3 hover:text-text hover:border-white/30 hover:bg-white/5'
              }`}
              data-magnet
            >
              {ind}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((s, i) => (
            <SystemCard key={s.code + i} system={s} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
