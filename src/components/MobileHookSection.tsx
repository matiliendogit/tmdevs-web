import { useState, useEffect, useRef } from 'react';

export default function MobileHookSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          setInView(true);
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const anim = (css: string): React.CSSProperties =>
    inView ? { animation: css } : { opacity: 0 };

  return (
    <section
      ref={sectionRef}
      className="md:hidden relative w-full h-dvh overflow-hidden"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/bg-typing-video.webm"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55 pointer-events-none" />

      {/* Card container */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="w-full backdrop-blur-md bg-white/[0.07] border border-white/[0.12] rounded-2xl px-6 py-10">

          {/* Overline */}
          <p
            className="text-stone-400 text-[0.58rem] tracking-[0.3em] uppercase mb-4"
            style={anim('heroFadeUp 0.6s ease 0s both')}
          >
            Software a medida
          </p>

          {/* Headline */}
          <h2
            className="font-black leading-[1.1] text-stone-100 text-[clamp(2rem,7vw,2.8rem)] mb-5"
            style={{ fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif' }}
          >
            <span
              className="block"
              style={anim('heroFadeUp 0.7s ease 0.15s both')}
            >
              Imaginalo.
            </span>
            <span
              className="block"
              style={anim('heroFadeUp 0.7s ease 0.3s both')}
            >
              Nosotros lo construimos.
            </span>
          </h2>

          {/* Divider */}
          <div
            className="h-px bg-white/[0.15] mb-5"
            style={inView ? { animation: 'heroLineExpand 0.8s ease 0.45s both' } : { opacity: 0 }}
          />

          {/* Body copy */}
          <p
            className="text-stone-300 text-[0.875rem] leading-relaxed mb-7"
            style={anim('heroFadeUp 0.7s ease 0.5s both')}
          >
            La ventaja de poder imaginar tu propia app o software y hacerlo realidad.
            Somos tu socio ideal para dar ese paso y destacarte.
          </p>

          {/* CTA link */}
          <a
            href="#casos"
            className="inline-flex items-center gap-2 text-accent text-[0.7rem] font-bold tracking-[0.18em] uppercase"
            style={anim('heroFadeUp 0.7s ease 0.7s both')}
          >
            Ver casos reales
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
