'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { SectionTag, ArchBrackets } from '@/components/ui/Primitives';

const SolarSystem = dynamic(
  () => import('@/components/three/SolarSystem').then(m => m.SolarSystem),
  { ssr: false, loading: () => <div className="absolute inset-0 grid place-items-center text-text-3 font-mono text-[10px] tracking-[0.18em] uppercase">// initializing solar system</div> }
);

export function Ecosystem() {
  return (
    <section id="systems" className="relative py-32">
      <div className="container-pad">
        <SectionTag num="02" label="OPERATING ECOSYSTEM" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="font-serif text-text font-light tracking-[-0.03em] leading-[0.98] text-[clamp(36px,5.5vw,72px)] max-w-4xl mb-6"
        >
          A neural ecosystem, <em className="italic text-text-2">orbiting in real-time</em>.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-text-2 text-[16px] leading-relaxed max-w-2xl mb-12"
        >
          Six operating divisions in continuous orbit around the central reactor core. Click any planet to inspect its systems and live operational state.
        </motion.p>
      </div>

      <div className="relative h-[80vh] min-h-[640px] mx-6 lg:mx-20 rounded-2xl border border-line bg-graphite/30 overflow-hidden">
        <ArchBrackets />
        <SolarSystem />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9.5px] tracking-[0.18em] uppercase text-text-3 bg-ink/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-line">
          Click any planet to expand · drag to orbit
        </div>
      </div>
    </section>
  );
}
