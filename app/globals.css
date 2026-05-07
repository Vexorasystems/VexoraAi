@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --ink: #030305;
    --ink-2: #050507;
    --graphite: #0a0a0c;
    --line: rgba(255, 255, 255, 0.06);
    --line-strong: rgba(255, 255, 255, 0.12);
    --text: #f5f5f7;
    --text-2: #a8a8ad;
    --text-3: #65656a;
    --signal-green: #6cf07a;
    --signal-amber: #f0c264;
    --signal-blue: #6cb8f0;

    --ease: cubic-bezier(0.65, 0, 0.35, 1);
    --ease-soft: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-cinematic: cubic-bezier(0.22, 1, 0.36, 1);
  }

  html {
    background: var(--ink);
    color-scheme: dark;
    scroll-behavior: smooth;
  }

  body {
    background: var(--ink);
    color: var(--text);
    font-family: var(--font-geist), system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  ::selection {
    background: rgba(255, 255, 255, 0.18);
    color: var(--text);
  }

  /* Hide native cursor when v4 cursor active */
  body.cursor-active,
  body.cursor-active * {
    cursor: none !important;
  }
}

@layer components {
  .container-pad {
    @apply px-6 sm:px-10 md:px-14 lg:px-20 mx-auto max-w-[1400px];
  }

  /* ============================================================
     v4 Luxury Holographic Cursor
     ============================================================ */
  .cx {
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 99999;
    transform: translate3d(-50%, -50%, 0);
    will-change: transform;
    border-radius: 50%;
  }
  .cx-halo {
    width: 140px; height: 140px;
    background: radial-gradient(circle, rgba(180,200,230,0.18) 0%, rgba(180,200,230,0.04) 40%, transparent 70%);
    filter: blur(14px);
    transition: width 0.5s var(--ease), height 0.5s var(--ease), opacity 0.4s var(--ease);
  }
  .cx-mid {
    width: 60px; height: 60px;
    border: 1px solid rgba(255,255,255,0.18);
    background: radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%);
    transition: width 0.55s var(--ease), height 0.55s var(--ease), border-color 0.4s, opacity 0.4s, border-radius 0.4s;
  }
  .cx-mid::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    border: 1px solid rgba(255,255,255,0.12);
    animation: cxMidBreathe 3s ease-in-out infinite;
  }
  @keyframes cxMidBreathe {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50%      { transform: scale(1.18); opacity: 0.7; }
  }
  .cx-ring {
    width: 30px; height: 30px;
    border: 1px solid rgba(255,255,255,0.7);
    background: rgba(255,255,255,0.03);
    box-shadow: 0 0 14px rgba(255,255,255,0.18), inset 0 0 8px rgba(255,255,255,0.08);
    transition: width 0.45s var(--ease), height 0.45s var(--ease), border-color 0.3s, background 0.3s, border-radius 0.3s;
  }
  .cx-core {
    width: 5px; height: 5px;
    background: #fff;
    box-shadow:
      0 0 6px rgba(255,255,255,0.95),
      0 0 14px rgba(180,200,230,0.7),
      0 0 24px rgba(180,200,230,0.35);
  }
  .cx-trail {
    position: fixed;
    top: 0; left: 0;
    width: 4px; height: 4px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(255,255,255,0.7);
    pointer-events: none;
    z-index: 99998;
    opacity: 0;
    transform: translate3d(-50%, -50%, 0);
    will-change: transform;
  }
  .cx-ripple {
    position: fixed;
    top: 0; left: 0;
    border: 2px solid #fff;
    border-radius: 50%;
    pointer-events: none;
    z-index: 99997;
    transform: translate3d(-50%, -50%, 0);
    animation: cxRipple 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  @keyframes cxRipple {
    0%   { width: 8px; height: 8px; opacity: 0.9; }
    100% { width: 200px; height: 200px; opacity: 0; border-width: 0.5px; }
  }
  /* States */
  .cx.is-button .cx-mid  { width: 90px; height: 90px; border-color: rgba(255,255,255,0.45); }
  .cx.is-button .cx-ring { width: 50px; height: 50px; border-color: #fff; box-shadow: 0 0 22px rgba(255,255,255,0.35); }
  .cx.is-button .cx-halo { width: 220px; height: 220px; }
  .cx.is-card .cx-ring { width: 70px; height: 70px; border-color: rgba(255,255,255,0.5); }
  .cx.is-card .cx-mid  { width: 110px; height: 110px; }
  .cx.is-card .cx-halo { width: 200px; height: 200px; }
  .cx.is-text .cx-ring { width: 3px; height: 28px; border-radius: 1px; background: #fff; border-color: #fff; }
  .cx.is-text .cx-mid, .cx.is-text .cx-core { opacity: 0; }
  .cx.is-pressed .cx-ring { background: rgba(255,255,255,0.18); box-shadow: 0 0 24px rgba(255,255,255,0.5); }

  @media (max-width: 900px), (pointer: coarse) {
    .cx, .cx-trail, .cx-ripple { display: none !important; }
    body.cursor-active, body.cursor-active * { cursor: auto !important; }
  }

  /* ============================================================
     Architectural corner brackets
     ============================================================ */
  .arch-bracket {
    position: absolute;
    width: 18px; height: 18px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    pointer-events: none;
  }
  .arch-bracket.tl { top: 20px; left: 20px;    border-right: 0; border-bottom: 0; }
  .arch-bracket.tr { top: 20px; right: 20px;   border-left: 0;  border-bottom: 0; }
  .arch-bracket.bl { bottom: 20px; left: 20px; border-right: 0; border-top: 0; }
  .arch-bracket.br { bottom: 20px; right: 20px;border-left: 0;  border-top: 0; }

  /* ============================================================
     Holographic conic edge on cards
     ============================================================ */
  .holo-edge {
    position: relative;
  }
  .holo-edge::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: conic-gradient(
      from var(--holo-a, 0deg),
      transparent 0deg,
      rgba(255,255,255,0.55) 60deg,
      transparent 120deg,
      transparent 240deg,
      rgba(180,200,230,0.35) 300deg,
      transparent 360deg
    );
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.55s var(--ease);
    pointer-events: none;
    animation: holoSpin 7s linear infinite;
    z-index: 3;
  }
  .holo-edge:hover::after { opacity: 1; }
  @keyframes holoSpin { to { --holo-a: 360deg; } }
  @property --holo-a {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }

  /* ============================================================
     Live activity bars (signal cells)
     ============================================================ */
  .activity-bars {
    display: flex;
    gap: 2px;
    height: 12px;
    align-items: flex-end;
  }
  .activity-bars i {
    flex: 1;
    background: linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.12));
    height: 30%;
    border-radius: 1px;
    animation: barPulse var(--bd, 1.8s) ease-in-out infinite;
    animation-delay: var(--bdd, 0s);
  }
  @keyframes barPulse {
    0%, 100% { height: 25%; opacity: 0.4; }
    50%      { height: 90%; opacity: 1; }
  }

  /* ============================================================
     Section flow divider
     ============================================================ */
  .flow-divider {
    position: relative;
    height: 80px;
    pointer-events: none;
    overflow: hidden;
    z-index: 4;
  }
  .flow-divider::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 60%; height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.06) 70%, transparent 100%);
  }
  .flow-divider::after {
    content: '';
    position: absolute;
    top: 50%; left: -10%;
    transform: translateY(-50%);
    width: 60px; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent);
    box-shadow: 0 0 14px 2px rgba(255,255,255,0.5);
    animation: flowDot 8s linear infinite;
  }
  @keyframes flowDot {
    0%   { left: -10%; opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { left: 110%; opacity: 0; }
  }

  /* ============================================================
     Buttons
     ============================================================ */
  .btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 13px 22px;
    font-family: var(--font-geist), system-ui, sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.02em;
    border-radius: 999px;
    background: var(--text);
    color: var(--ink);
    border: 1px solid var(--text);
    transition: all 0.5s var(--ease);
    overflow: hidden;
    cursor: none;
    text-decoration: none;
  }
  .btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%);
    background-size: 220% 100%;
    background-position: 200% 0;
    transition: background-position 0.7s var(--ease);
    pointer-events: none;
  }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4); }
  .btn:hover::before { background-position: -120% 0; }
  .btn-ghost {
    background: transparent;
    color: var(--text);
    border-color: var(--line-strong);
  }
  .btn-ghost:hover { background: rgba(255,255,255,0.06); border-color: var(--text); }

  /* ============================================================
     Glass surface utility
     ============================================================ */
  .glass {
    background: rgba(8, 8, 11, 0.6);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    border: 1px solid var(--line);
  }

  /* ============================================================
     Live dot indicator
     ============================================================ */
  .live-d {
    width: 5px; height: 5px;
    background: var(--signal-green);
    border-radius: 50%;
    box-shadow: 0 0 8px var(--signal-green);
    animation: pulseSoft 1.6s infinite;
    display: inline-block;
  }
  @keyframes pulseSoft {
    0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--signal-green); }
    50%      { opacity: 0.4; box-shadow: 0 0 0px var(--signal-green); }
  }

  /* ============================================================
     Section reveal
     ============================================================ */
  .reveal {
    opacity: 0;
    transform: translateY(30px) scale(0.985);
    filter: blur(6px);
    transition: opacity 1s var(--ease), transform 1.2s var(--ease), filter 1s var(--ease);
  }
  .reveal.in {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@layer utilities {
  .text-balance { text-wrap: balance; }
}
