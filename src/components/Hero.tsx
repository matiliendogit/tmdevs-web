import { useState, useEffect } from 'react';

export default function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ((window as any).__tmLoadingDone) {
      setReady(true);
      return;
    }
    const handler = () => setReady(true);
    window.addEventListener('tmLoadingDone', handler, { once: true });
    return () => window.removeEventListener('tmLoadingDone', handler);
  }, []);

  const anim = (css: string): React.CSSProperties =>
    ready ? { animation: css } : { opacity: 0 };

  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden h-dvh"
      style={{
        background:
          "radial-gradient(ellipse 100% 70% at 50% -10%, #2e2e2b 0%, #222220 65%)",
      }}
    >

      {/* Left vertical label */}
      <div
        className="absolute left-8 md:left-14 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4"
        style={anim("heroFadeUp 0.7s ease 0.45s both")}
      >
        <span className="text-stone-500 text-[0.55rem] tracking-[0.3em] uppercase [writing-mode:vertical-rl] rotate-180">
          00
        </span>
        <div className="w-px h-14 bg-[rgba(138,138,128,0.2)]" />
      </div>

      {/* Right vertical label */}
      <div
        className="absolute right-8 md:right-14 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4"
        style={anim("heroFadeUp 0.7s ease 0.5s both")}
      >
        <div className="w-px h-14 bg-[rgba(138,138,128,0.2)]" />
        <span className="text-stone-500 text-[0.55rem] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">
          Software Solutions
        </span>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center text-center px-6 relative z-10">
        {/* Small label above */}
        <p
          className="text-stone-200 text-[0.58rem] tracking-[0.32em] uppercase mb-4"
          style={anim("heroFadeUp 0.7s ease 0.3s both")}
        >
          Somos
        </p>

        {/* Main heading — Inter kept specifically for the logo mark */}
        <h1
          className="font-black leading-none text-stone-100 text-[clamp(1.8rem,9vw,4rem)] tracking-[0.01em]"
          style={{
            fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
            ...anim("heroFadeUp 0.7s ease 0.1s both"),
          }}
        >
          <span className="tracking-[0.01em] text-[clamp(3.6rem,9vw,4rem)]">tm</span>
          <span> </span>
          <span className="tracking-[-0.01em] text-[clamp(1.8rem,9vw,4rem)]">devs</span>
        </h1>

        {/* Thin divider */}
        <div
          className="h-px bg-[rgba(138,138,128,0.28)] my-5 mx-auto"
          style={anim("heroLineExpand 0.8s ease 0.55s both")}
        />

        {/* Tag below */}
        <p
          className="hero-subtitle text-stone-200"
          style={anim("heroFadeUp 0.7s ease 0.5s both")}
        >
          Software / Solutions
        </p>

        {/* Subheadline */}
        <p
          className="text-stone-400 text-[clamp(0.75rem,1.8vw,0.9rem)] tracking-[0.02em] max-w-[28rem] leading-[1.6] mt-5"
          style={anim("heroFadeUp 0.7s ease 0.75s both")}
        >
          Construimos sitios web, aplicaciones y software especializado que
          resuelven problemas reales de negocio.
        </p>

        {/* Social proof snippet */}
        <p
          className="text-stone-500 text-[0.55rem] tracking-[0.2em] uppercase mt-4"
          style={anim("heroFadeUp 0.7s ease 0.95s both")}
        >
          100+ usuarios activos en producción &nbsp;·&nbsp; Córdoba y La Pampa,
          Argentina
        </p>

        {/* Primary CTA — last to appear, 2× duration */}
        <a
          href="#casos"
          className="inline-block mt-6 px-7 py-[0.7rem] bg-accent text-graphite-950 text-[0.7rem] font-bold tracking-[0.18em] uppercase no-underline rounded-xs min-h-11 transition-opacity duration-200"
          style={anim("heroFadeUp 1.4s ease 1.2s both")}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Ver casos reales
        </a>
      </div>
    </section>
  );
}
