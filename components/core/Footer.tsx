'use client';

export function Footer() {
  return (
    <footer className="relative bg-ink border-t border-line overflow-hidden">
      {/* Massive wordmark backdrop */}
      <div className="absolute -bottom-8 left-0 right-0 px-6 select-none pointer-events-none opacity-[0.05]">
        <div className="font-serif italic text-text font-light leading-none tracking-[-0.05em] text-[clamp(120px,24vw,420px)]">
          Vexora
        </div>
      </div>

      <div className="container-pad relative z-10 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-3 mb-3">VEX/INFRASTRUCTURE</div>
            <p className="text-text-2 text-[13px] leading-relaxed max-w-xs">
              Operational AI infrastructure for the modern enterprise. 65 systems · 26 sectors · 6 continents.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-3 mb-4">Platform</div>
            <ul className="space-y-2 text-[13px]">
              <li><a href="#divisions" className="text-text-2 hover:text-text transition-colors" data-magnet>Divisions</a></li>
              <li><a href="#systems" className="text-text-2 hover:text-text transition-colors" data-magnet>Systems</a></li>
              <li><a href="#industries" className="text-text-2 hover:text-text transition-colors" data-magnet>Industries</a></li>
              <li><a href="#ops" className="text-text-2 hover:text-text transition-colors" data-magnet>Operations</a></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-3 mb-4">Engagement</div>
            <ul className="space-y-2 text-[13px]">
              <li><a href="#voices" className="text-text-2 hover:text-text transition-colors" data-magnet>Voices</a></li>
              <li><a href="#process" className="text-text-2 hover:text-text transition-colors" data-magnet>Process</a></li>
              <li><a href="#contact" className="text-text-2 hover:text-text transition-colors" data-magnet>Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-text-3 mb-4">Headquarters</div>
            <p className="text-text-2 text-[13px] leading-relaxed">
              Leicester, UK<br />
              <a href="mailto:hello@vexora.uk" className="hover:text-text transition-colors">hello@vexora.uk</a>
            </p>
            <div className="flex items-center gap-2 mt-4 font-mono text-[10px] tracking-[0.16em] uppercase text-text-3">
              <span className="live-d" />
              Operational
            </div>
          </div>
        </div>

        {/* Ribbon ticker */}
        <div className="border-t border-line pt-8 overflow-hidden">
          <div className="flex gap-12 animate-[ribbon_60s_linear_infinite] whitespace-nowrap font-mono text-[10px] tracking-[0.16em] uppercase text-text-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="flex gap-12">
                <span>VEX/INFRASTRUCTURE</span>
                <span>·</span>
                <span>SOC 2 TYPE II</span>
                <span>·</span>
                <span>ISO 27001</span>
                <span>·</span>
                <span>GDPR</span>
                <span>·</span>
                <span>HIPAA-READY</span>
                <span>·</span>
                <span>247 DEPLOYMENTS</span>
                <span>·</span>
                <span>6 CONTINENTS</span>
                <span>·</span>
                <span>VEX/COGNITIVE/INFRASTRUCTURE</span>
                <span>·</span>
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-line mt-8 pt-8 flex flex-col md:flex-row justify-between gap-4 font-mono text-[10px] tracking-[0.14em] uppercase text-text-3">
          <span>© {new Date().getFullYear()} VEXORA SYSTEMS LTD · ALL RIGHTS RESERVED</span>
          <span className="flex gap-6">
            <a href="/privacy" className="hover:text-text transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-text transition-colors">Terms</a>
            <a href="/security" className="hover:text-text transition-colors">Security</a>
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes ribbon {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </footer>
  );
}
