'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SectionTag, Button, ArchBrackets } from '@/components/ui/Primitives';
import { industries, systems } from '@/lib/systems';

// ============================================================
// Industries — sector deployments
// ============================================================
export function Industries() {
  return (
    <section id="industries" className="relative py-32 border-t border-line">
      <div className="container-pad">
        <SectionTag num="05" label="INDUSTRIES" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-text font-light tracking-[-0.03em] leading-[0.98] text-[clamp(36px,5.5vw,72px)] max-w-4xl mb-6"
        >
          Twenty-six sectors. <em className="italic text-text-2">One operating layer.</em>
        </motion.h2>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {industries.map((ind, i) => {
            const count = systems.filter(s => s.industry === ind).length;
            return (
              <motion.div
                key={ind}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.03 }}
                className="ind-row group flex items-center justify-between py-6 px-2 hover:px-6 hover:bg-white/[0.02] transition-all duration-500"
                data-magnet
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-text-3 w-10">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-serif text-2xl md:text-3xl tracking-[-0.02em] text-text group-hover:italic transition-all duration-500">{ind}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-text-3">{count} systems</span>
                  <span className="w-7 h-7 grid place-items-center border border-line rounded-full text-text-3 group-hover:text-text group-hover:border-white/40 transition-all">
                    <svg viewBox="0 0 14 14" width="9" height="9" fill="none">
                      <path d="M3 11L11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Stats — animated counters
// ============================================================
function Counter({ to, suffix = '', duration = 2 }: { to: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    function frame(now: number) {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.floor(to * eased));
      if (t < 1) raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <>{val.toLocaleString()}{suffix}</>;
}

export function Stats() {
  return (
    <section className="relative py-32 border-t border-line">
      <div className="container-pad">
        <SectionTag num="07" label="ENTERPRISE METRICS" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {[
            { v: 65, suf: '', l: 'systems · operational' },
            { v: 184, suf: 'k', l: 'workflows · 24h' },
            { v: 247, suf: '', l: 'enterprise deployments' },
            { v: 99, suf: '.998%', l: 'platform uptime' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="stat bg-graphite/40 p-10 hover:bg-graphite/60 transition-colors"
            >
              <div className="font-serif italic text-text font-light leading-none text-[clamp(48px,6vw,84px)] tracking-[-0.03em]">
                {typeof s.v === 'number' && s.suf !== '.998%' ? <Counter to={s.v} suffix={s.suf} /> : `${s.v}${s.suf}`}
              </div>
              <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-text-3 mt-4">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Voices — testimonials with NDA stamps
// ============================================================
const VOICES = [
  { tier: 'GLOBAL HOTEL GROUP', sector: 'HOSPITALITY · 5★', quote: 'Concord moved our concierge response time from forty minutes to fourteen seconds. Across forty properties.', role: 'Group COO' },
  { tier: 'NHS TRUST', sector: 'HEALTHCARE · UK', quote: 'Cirrus replaced a triage layer that was burning out our staff. Patient throughput up 32%, clinician time back.', role: 'Director of Operations' },
  { tier: 'CITY HALL', sector: 'GOVERNMENT · NORTH AMERICA', quote: 'Civic processed two years of constituent backlog in eleven days. The audit trail is the cleanest we have.', role: 'Chief of Staff' },
  { tier: 'BIG-FOUR FIRM', sector: 'LEGAL · GLOBAL', quote: 'Aurelis is matter intake at the partner level — every conflict-check, every routing decision, observable.', role: 'Managing Partner' },
  { tier: 'TIER-1 BANK', sector: 'FINANCE · EMEA', quote: 'Northstar quietly does the work of our compliance backbone. We renewed a 5-year contract after eleven months.', role: 'Head of Compliance' },
  { tier: 'GLOBAL LOGISTICS', sector: 'LOGISTICS · APAC', quote: 'Compass rerouted ninety thousand shipments during the typhoon week. We didn\'t miss a single SLA.', role: 'VP Operations' },
];

export function Voices() {
  return (
    <section id="voices" className="relative py-32 border-t border-line">
      <div className="container-pad">
        <SectionTag num="08" label="OPERATOR TESTIMONY" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-text font-light tracking-[-0.03em] leading-[0.98] text-[clamp(36px,5.5vw,72px)] max-w-3xl mb-16"
        >
          Voices from <em className="italic text-text-2">the operating floor</em>.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {VOICES.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="voice testi-card relative rounded-2xl border border-line bg-graphite/30 p-7 backdrop-blur-md hover:border-white/15 transition-colors"
              data-magnet
            >
              {/* NDA stamp */}
              <div className="absolute top-5 right-5 font-mono text-[8.5px] tracking-[0.2em] uppercase text-text-3 px-2 py-0.5 border border-line rounded">
                NDA · CLASSIFIED
              </div>
              <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-text mb-1">{v.tier}</div>
              <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-text-3 mb-6">{v.sector}</div>
              <p className="font-serif italic text-text text-[18px] leading-snug tracking-[-0.005em] mb-6">"{v.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-line">
                {/* Waveform placeholder */}
                <div className="flex gap-0.5 h-3 items-end">
                  {Array.from({ length: 14 }).map((_, j) => (
                    <i key={j} className="w-0.5 bg-white/40 rounded-full" style={{ height: `${30 + (j * 7 % 70)}%` }} />
                  ))}
                </div>
                <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-text-3">{v.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Process — 4 steps
// ============================================================
const STEPS = [
  { n: '01', title: 'Discovery', body: 'A confidential operating audit. We map every system, signal and silent friction across your organization.' },
  { n: '02', title: 'Architecture', body: 'A bespoke platform layout. We compose the right Vexora systems against your operating posture and risk envelope.' },
  { n: '03', title: 'Integration', body: 'Quiet, observable rollout. Vexora deploys alongside your existing stack — never replacing trust, always extending it.' },
  { n: '04', title: 'Operate', body: 'Continuous co-piloting. Senior operators on call. Every workflow auditable, reversible and improving its own posture daily.' },
];

export function Process() {
  return (
    <section id="process" className="relative py-32 border-t border-line">
      <div className="container-pad">
        <SectionTag num="09" label="ENGAGEMENT PROCESS" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-text font-light tracking-[-0.03em] leading-[0.98] text-[clamp(36px,5.5vw,72px)] max-w-3xl mb-16"
        >
          Quiet onboarding. <em className="italic text-text-2">Loud results.</em>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="case-card relative rounded-2xl border border-line bg-graphite/30 p-8 backdrop-blur-md hover:border-white/15 transition-colors"
              data-magnet
            >
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-3 mb-6">§{s.n}</div>
              <h3 className="font-serif italic text-3xl text-text mb-4">{s.title}</h3>
              <p className="text-text-2 text-[13.5px] leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Contact
// ============================================================
export function Contact() {
  return (
    <section id="contact" className="relative py-32 border-t border-line">
      <div className="container-pad">
        <SectionTag num="10" label="ENGAGE" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-text font-light tracking-[-0.03em] leading-[0.98] text-[clamp(40px,6vw,84px)] mb-8"
            >
              Begin <em className="italic text-text-2">engagement</em>.
            </motion.h2>
            <p className="text-text-2 text-[16px] leading-relaxed max-w-md mb-10">
              All engagements start with a confidential operating audit. Two senior partners will respond personally within seventy-two hours.
            </p>

            <div className="space-y-5 font-mono text-[11px] tracking-[0.16em] uppercase">
              <div>
                <div className="text-text-3 mb-1">Headquarters</div>
                <div className="text-text">Leicester, United Kingdom</div>
              </div>
              <div>
                <div className="text-text-3 mb-1">Direct</div>
                <a href="mailto:hello@vexora.uk" className="text-text hover:text-white transition-colors" data-magnet>hello@vexora.uk</a>
              </div>
              <div>
                <div className="text-text-3 mb-1">Discretion</div>
                <div className="text-text">All engagements covered by NDA</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="relative rounded-2xl border border-line bg-graphite/40 backdrop-blur-md p-8 md:p-10">
            <ArchBrackets />
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Name" id="name" />
                <Field label="Role" id="role" />
              </div>
              <Field label="Organization" id="org" />
              <Field label="Email" id="email" type="email" />
              <div>
                <label className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-text-3 mb-2 block">Operating context</label>
                <textarea
                  rows={4}
                  className="w-full bg-ink/50 border border-line rounded-md px-4 py-3 text-text text-[14px] outline-none focus:border-white/30 transition-all resize-none"
                  placeholder="Briefly describe your operating posture and the surface you'd like reviewed."
                />
              </div>
              <div className="flex items-center justify-between pt-4">
                <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-text-3 inline-flex items-center gap-2">
                  <span className="live-d" /> response · 72h
                </span>
                <Button>Submit engagement</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, type = 'text' }: { label: string; id: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-text-3 mb-2 block">{label}</label>
      <input
        id={id}
        type={type}
        className="w-full bg-ink/50 border border-line rounded-md px-4 py-3 text-text text-[14px] outline-none focus:border-white/30 transition-all"
      />
    </div>
  );
}
