import { notFound } from 'next/navigation';
import Link from 'next/link';
import { systems, getSystemBySlug, getRelatedSystems, deriveStackType, generateMetrics } from '@/lib/systems';
import { pickVerbs } from '@/lib/utils';
import { Footer } from '@/components/core/Footer';
import { Button, ArchBrackets, ActivityBars, SectionTag, FlowDivider } from '@/components/ui/Primitives';
import { SystemDashboard } from '@/components/sections/SystemDashboard';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return systems.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const system = getSystemBySlug(params.slug);
  if (!system) return { title: 'Vexora · System' };
  return {
    title: `${system.name} · ${system.code} · Vexora`,
    description: system.description,
  };
}

export default function SystemPage({ params }: { params: { slug: string } }) {
  const system = getSystemBySlug(params.slug);
  if (!system) notFound();

  const stackType = deriveStackType(system.category);
  const metrics = generateMetrics(system.slug);
  const verbs = pickVerbs(system.industry);
  const related = getRelatedSystems(params.slug, 4);

  return (
    <>
      {/* ============================================================
          CINEMATIC HERO
          ============================================================ */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-line">
        <div className="absolute inset-0 z-[1] opacity-[0.18]" style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)',
        }} />

        <div className="container-pad relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.18em] uppercase text-text-3 mb-10">
            <Link href="/" className="hover:text-text transition-colors">VEXORA</Link>
            <span>/</span>
            <Link href="/#catalog" className="hover:text-text transition-colors">SYSTEMS</Link>
            <span>/</span>
            <span className="text-text">{system.code}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
            <div>
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.18em] uppercase mb-8">
                <span className="text-text-2">{system.code}</span>
                <span className="opacity-30">·</span>
                <span className={`inline-flex items-center gap-2 ${
                  system.status === 'heat' ? 'text-signal-amber' :
                  system.status === 'idle' ? 'text-signal-blue' : 'text-signal-green'
                }`}>
                  <span className="live-d" />
                  {system.status === 'heat' ? 'HIGH LOAD' : system.status === 'idle' ? 'PROVISIONING' : 'OPERATIONAL'}
                </span>
              </div>

              <h1 className="font-serif italic text-text font-light leading-[0.95] tracking-[-0.04em] text-[clamp(72px,11vw,168px)] mb-8">
                {system.name}
              </h1>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-text px-3 py-1.5 border border-line rounded bg-white/[0.03]">
                  {stackType}
                </span>
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-text-3 px-3 py-1.5 border border-line rounded">
                  {system.industry} · {system.category}
                </span>
              </div>

              <p className="text-text-2 text-[18px] leading-relaxed max-w-2xl mb-10">
                {system.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button href="/#contact">Begin engagement</Button>
                <Button href="/#catalog" variant="ghost">Explore systems</Button>
              </div>
            </div>

            {/* Right: hero metric tile */}
            <div className="lg:w-80 relative rounded-2xl border border-line bg-graphite/40 backdrop-blur-md p-7">
              <ArchBrackets />
              <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-text-3 mb-1">
                {system.metricLabel}
              </div>
              <div className="font-serif italic text-text text-[68px] leading-none tracking-[-0.03em] mb-6">
                {system.metricValue}
              </div>
              <ActivityBars count={18} />
              <div className="mt-6 pt-5 border-t border-line grid grid-cols-2 gap-4">
                <Metric label="Accuracy" value={metrics.accuracy} />
                <Metric label="Latency" value={metrics.latency} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FlowDivider />

      {/* ============================================================
          OVERVIEW · WHAT IT AUTOMATES
          ============================================================ */}
      <section className="py-28 border-b border-line">
        <div className="container-pad">
          <SectionTag num="01" label="OVERVIEW" />
          <h2 className="font-serif text-text font-light tracking-[-0.03em] leading-[0.98] text-[clamp(36px,5.5vw,72px)] max-w-3xl mb-6">
            What <em className="italic text-text-2">{system.name}</em> automates.
          </h2>
          <p className="text-text-2 text-[16px] leading-relaxed max-w-2xl mb-16">
            {system.name} composes a continuous {stackType.toLowerCase()} across your {system.industry.toLowerCase()} operating surface. Every action observable, reversible, and audit-ready.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {system.features.map((f, i) => (
              <div key={i} className="case-card relative rounded-2xl border border-line bg-graphite/30 p-7 backdrop-blur-md hover:border-white/15 transition-colors">
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-3 mb-4">CAPABILITY · {String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-serif italic text-2xl text-text mb-3">{f}</h3>
                <p className="text-text-2 text-[13px] leading-relaxed">
                  Continuous {f.toLowerCase()} across the {system.industry.toLowerCase()} operating surface, observable through the Vexora command layer.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          LIVE DASHBOARD (client component)
          ============================================================ */}
      <section className="py-28 border-b border-line">
        <div className="container-pad mb-12">
          <SectionTag num="02" label="LIVE DASHBOARD" />
          <h2 className="font-serif text-text font-light tracking-[-0.03em] leading-[0.98] text-[clamp(36px,5.5vw,72px)] max-w-3xl mb-6">
            Real-time <em className="italic text-text-2">operating posture</em>.
          </h2>
          <p className="text-text-2 text-[16px] leading-relaxed max-w-2xl">
            A live view of {system.code} in production. Throughput, latency, capture rate and active workflows — all observable through the Vexora command layer.
          </p>
        </div>

        <div className="container-pad">
          <SystemDashboard system={system} verbs={verbs} metrics={metrics} />
        </div>
      </section>

      {/* ============================================================
          ROI · WORKFLOW VISUALIZATION
          ============================================================ */}
      <section className="py-28 border-b border-line">
        <div className="container-pad">
          <SectionTag num="03" label="OPERATIONAL IMPACT" />
          <h2 className="font-serif text-text font-light tracking-[-0.03em] leading-[0.98] text-[clamp(36px,5.5vw,72px)] max-w-3xl mb-12">
            ROI, <em className="italic text-text-2">audit-grade</em>.
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden mb-16">
            {[
              { v: '−68%', l: 'manual workload' },
              { v: '+312%', l: 'throughput' },
              { v: '14s', l: 'avg. response' },
              { v: '99.4%', l: 'capture rate' },
            ].map((s, i) => (
              <div key={i} className="bg-graphite/40 p-10">
                <div className="font-serif italic text-text font-light leading-none text-[clamp(36px,5vw,64px)] tracking-[-0.03em]">{s.v}</div>
                <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-text-3 mt-4">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Workflow process flow */}
          <div className="relative rounded-2xl border border-line bg-graphite/30 backdrop-blur-md p-10 overflow-hidden">
            <ArchBrackets />
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-3 mb-8">VEX/WORKFLOW · live trace</div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
              {['Intake', 'Triage', 'Decision', 'Execute', 'Audit'].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="flex-1 rounded-lg border border-line bg-ink/50 p-5">
                    <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-text-3 mb-2">§{String(i + 1).padStart(2, '0')}</div>
                    <div className="font-serif italic text-xl text-text">{step}</div>
                    <div className="font-mono text-[9.5px] tracking-[0.14em] text-text-3 mt-2">{(metrics.latency.replace('ms','')).slice(0,2)}{i*4}ms</div>
                  </div>
                  {i < 4 && (
                    <svg viewBox="0 0 14 14" width="14" height="14" fill="none" className="text-text-3 hidden md:block">
                      <path d="M3 7L11 7M8 4L11 7L8 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          INDUSTRY USE CASES
          ============================================================ */}
      <section className="py-28 border-b border-line">
        <div className="container-pad">
          <SectionTag num="04" label="INDUSTRY USE CASES" />
          <h2 className="font-serif text-text font-light tracking-[-0.03em] leading-[0.98] text-[clamp(36px,5.5vw,72px)] max-w-3xl mb-16">
            Where <em className="italic text-text-2">{system.name}</em> deploys.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'Tier-1 Enterprise', body: `${system.name} integrates as the operational AI layer for ${system.industry.toLowerCase()} groups operating across multiple regions.` },
              { title: 'Mid-Market', body: `Deployed as a focused operations engine for ${system.industry.toLowerCase()} firms scaling from regional to national posture.` },
              { title: 'Specialist Operators', body: `Configured for boutique ${system.industry.toLowerCase()} operators who require white-glove operational discretion.` },
            ].map((u, i) => (
              <div key={i} className="case-card relative rounded-2xl border border-line bg-graphite/30 p-8 backdrop-blur-md">
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-3 mb-4">DEPLOYMENT · {String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-serif italic text-2xl text-text mb-4">{u.title}</h3>
                <p className="text-text-2 text-[13px] leading-relaxed">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          RELATED SYSTEMS
          ============================================================ */}
      {related.length > 0 && (
        <section className="py-28 border-b border-line">
          <div className="container-pad">
            <SectionTag num="05" label="RELATED SYSTEMS" />
            <h2 className="font-serif text-text font-light tracking-[-0.03em] leading-[0.98] text-[clamp(32px,5vw,60px)] max-w-3xl mb-12">
              Other systems in <em className="italic text-text-2">{system.industry}</em>.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((r, i) => (
                <Link key={r.slug} href={`/systems/${r.slug}`} className="block group" data-magnet>
                  <div className="rounded-xl border border-line bg-graphite/30 p-6 backdrop-blur-md hover:border-white/15 hover:bg-graphite/50 transition-all">
                    <div className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-text-3 mb-3">{r.code}</div>
                    <h3 className="font-serif italic text-2xl text-text mb-2">{r.name}</h3>
                    <p className="text-text-2 text-[12.5px] leading-relaxed line-clamp-2">{r.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          CTA
          ============================================================ */}
      <section className="py-32 border-b border-line relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04),transparent_70%)]" />
        <div className="container-pad relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-text font-light tracking-[-0.04em] leading-[0.95] text-[clamp(48px,8vw,120px)] mb-8">
              Engage <em className="italic text-text-2">{system.name}</em>.
            </h2>
            <p className="text-text-2 text-[17px] leading-relaxed mb-10">
              All engagements start with a confidential operating audit. Two senior partners will respond personally within seventy-two hours.
            </p>
            <div className="flex flex-wrap items-center gap-4 justify-center">
              <Button href="/#contact">Begin engagement</Button>
              <Button href="/#catalog" variant="ghost">View all systems</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[8.5px] tracking-[0.18em] uppercase text-text-3 mb-1">{label}</div>
      <div className="font-serif italic text-xl text-text leading-none">{value}</div>
    </div>
  );
}
