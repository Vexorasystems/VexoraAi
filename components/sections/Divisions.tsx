'use client';

import { motion } from 'framer-motion';
import { divisions } from '@/lib/divisions';
import { DivisionCard } from '@/components/ui/DivisionCard';
import { SectionTag } from '@/components/ui/Primitives';

export function Divisions() {
  return (
    <section id="divisions" className="relative py-32">
      <div className="container-pad">
        <SectionTag num="01" label="DIVISIONS" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="font-serif text-text font-light tracking-[-0.03em] leading-[0.98] text-[clamp(36px,5.5vw,72px)] max-w-3xl mb-6"
        >
          Six divisions, <em className="italic text-text-2">one operating layer</em>.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-text-2 text-[16px] leading-relaxed max-w-2xl mb-16"
        >
          Each division is a distinct cognitive layer of the platform. Together they compose the entire operational surface of the modern enterprise — from intake, through intelligence, to autonomous workflow execution and command override.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((d, i) => (
            <DivisionCard key={d.vex} division={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
