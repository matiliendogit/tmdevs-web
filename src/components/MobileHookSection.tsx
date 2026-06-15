import { useState, useEffect, useRef } from 'react';

export default function MobileHookSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoMobileRef = useRef<HTMLVideoElement>(null);
  const videoDesktopRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        [videoMobileRef.current, videoDesktopRef.current].forEach((v) => {
          if (!v) return;
          entry.isIntersecting ? v.play().catch(() => {}) : v.pause();
        });
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const anim = (css: string): React.CSSProperties =>
    inView ? { animation: css } : { opacity: 0 };

  const textContent = (
    <>
      {/* Overline */}
      <p
        className="text-stone-500 text-[0.58rem] tracking-[0.3em] uppercase mb-4"
        style={anim('heroFadeUp 0.6s ease 0s both')}
      >
        Software a medida
      </p>

      {/* Headline */}
      <h2
        className="font-black leading-[1.05] text-stone-100 mb-5"
        style={{
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
        }}
      >
        <span className="block" style={anim('heroFadeUp 0.7s ease 0.15s both')}>
          Imaginalo.
        </span>
        <span className="block" style={anim('heroFadeUp 0.7s ease 0.3s both')}>
          Nosotros lo construimos.
        </span>
      </h2>

      {/* Divider */}
      <div
        className="h-px bg-white/20 mb-5"
        style={inView ? { animation: 'heroLineExpand 0.8s ease 0.45s both' } : { opacity: 0 }}
      />

      {/* Body copy */}
      <p
        className="text-stone-300 text-[0.9rem] leading-relaxed mb-7 max-w-sm"
        style={anim('heroFadeUp 0.7s ease 0.5s both')}
      >
        La ventaja de poder imaginar tu propia app o software y hacerlo realidad.
        Somos tu socio ideal para dar ese paso y destacarte.
      </p>

      {/* CTA */}
      <a
        href="#casos"
        className="inline-flex items-center gap-2 text-accent text-[0.7rem] font-bold tracking-[0.18em] uppercase"
        style={anim('heroFadeUp 0.7s ease 0.7s both')}
      >
        Ver casos reales
        <span aria-hidden="true">→</span>
      </a>
    </>
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-dvh overflow-hidden bg-graphite-900"
    >

      {/* ── MOBILE: video de fondo + glass card ── */}
      <div className="md:hidden absolute inset-0">
        <video
          ref={videoMobileRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/bg-typing-video.webm"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-black/55 pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="w-full backdrop-blur-md bg-white/[0.07] border border-white/[0.12] rounded-2xl px-6 py-10">
            {textContent}
          </div>
        </div>
      </div>

      {/* ── DESKTOP: video centrado + texto overlay en la base ── */}
      <div className="hidden md:flex h-full items-center justify-center px-10 lg:px-16 py-10">
        <div className="relative w-full h-full rounded-2xl overflow-hidden ring-1 ring-white/10">
          <video
            ref={videoDesktopRef}
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/bg-typing-video.webm"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          {/* Gradient overlay para legibilidad del texto */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          {/* Texto en la base del video */}
          <div className="absolute bottom-0 left-0 right-0 px-12 lg:px-16 pb-12 lg:pb-16">
            {textContent}
          </div>
        </div>
      </div>

    </section>
  );
}
