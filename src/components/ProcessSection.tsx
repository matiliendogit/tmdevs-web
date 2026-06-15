import { useRef, useEffect } from 'react';
import { MagnifyingGlass, Code, RocketLaunch } from '@phosphor-icons/react';
import { useInView } from '../hooks/useInView';

const steps = [
  {
    id: '01',
    icon: MagnifyingGlass,
    title: 'Diagnóstico',
    description:
      'Primera reunión gratuita: entendemos el problema, el flujo de trabajo actual y qué tiene que resolver el software. Sin tecnicismos, sin compromiso.',
  },
  {
    id: '02',
    icon: Code,
    title: 'Diseño y desarrollo',
    description:
      'Iteramos rápido con entregas reales, no mockups. Ves el producto funcionando desde la primera semana y podés dar feedback en cada etapa.',
  },
  {
    id: '03',
    icon: RocketLaunch,
    title: 'Lanzamiento y soporte',
    description:
      'Desplegamos en Railway o Vercel, monitoreamos el lanzamiento y te acompañamos después. Tu producto crece con vos.',
  },
];

function stepAnim(visible: boolean, isLeft: boolean): React.CSSProperties {
  return visible
    ? { animation: `${isLeft ? 'slideFromLeft' : 'slideFromRight'} 0.6s ease both` }
    : { opacity: 0 };
}

function VideoTimeline({
  sectionRef,
  videoRef,
  stepRefs,
  stepVis,
  cardClass,
  iconSize,
  titleClass,
  descClass,
  stepGap,
  containerClass,
}: {
  sectionRef: React.RefObject<HTMLDivElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  stepRefs: React.RefObject<HTMLDivElement>[];
  stepVis: boolean[];
  cardClass: string;
  iconSize: number;
  titleClass: string;
  descClass: string;
  stepGap: string;
  containerClass: string;
}) {
  return (
    <div ref={sectionRef} className={`relative overflow-hidden min-h-dvh ${containerClass}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/work-bg-mobile.webm"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-black/62 pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-center px-5 py-24 min-h-dvh">
        <div className="relative max-w-2xl mx-auto w-full">

          {/* Línea central */}
          <div
            className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-px bg-white/20"
            aria-hidden="true"
          />

          {steps.map(({ id, icon: Icon, title, description }, i) => {
            const isLeft = i % 2 === 0;
            const ref = stepRefs[i];
            const visible = stepVis[i];

            return (
              <div key={id} className={`flex items-center ${stepGap} last:mb-0`}>

                {/* Slot izquierdo */}
                <div className="flex-1 pr-4 flex justify-end">
                  {isLeft && (
                    <div
                      ref={ref}
                      style={stepAnim(visible, true)}
                      className={`${cardClass} w-full`}
                    >
                      <div className="flex items-center gap-1.5 mb-2 justify-end">
                        <h3 className={`${titleClass} text-right`}>{title}</h3>
                        <Icon size={iconSize} weight="light" className="text-accent shrink-0" aria-hidden="true" />
                      </div>
                      <p className={`${descClass} text-right`}>{description}</p>
                    </div>
                  )}
                </div>

                {/* Dot central */}
                <div
                  className="relative z-10 w-2.5 h-2.5 rounded-full bg-accent shrink-0 ring-4 ring-accent/20"
                  aria-hidden="true"
                />

                {/* Slot derecho */}
                <div className="flex-1 pl-4 flex justify-start">
                  {!isLeft && (
                    <div
                      ref={ref}
                      style={stepAnim(visible, false)}
                      className={`${cardClass} w-full`}
                    >
                      <div className="flex items-center gap-1.5 mb-2">
                        <Icon size={iconSize} weight="light" className="text-accent shrink-0" aria-hidden="true" />
                        <h3 className={titleClass}>{title}</h3>
                      </div>
                      <p className={descClass}>{description}</p>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-graphite-950 text-[0.65rem] font-bold tracking-[0.18em] uppercase rounded-xs"
          >
            Empezar ahora <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProcessSection() {
  // Mobile
  const sectionMobileRef = useRef<HTMLDivElement>(null);
  const videoMobileRef   = useRef<HTMLVideoElement>(null);
  const [mref1, mvis1] = useInView({ threshold: 0.5, once: true });
  const [mref2, mvis2] = useInView({ threshold: 0.5, once: true });
  const [mref3, mvis3] = useInView({ threshold: 0.5, once: true });

  // Desktop
  const sectionDesktopRef = useRef<HTMLDivElement>(null);
  const videoDesktopRef   = useRef<HTMLVideoElement>(null);
  const [dref1, dvis1] = useInView({ threshold: 0.4, once: true });
  const [dref2, dvis2] = useInView({ threshold: 0.4, once: true });
  const [dref3, dvis3] = useInView({ threshold: 0.4, once: true });

  useEffect(() => {
    const el = sectionMobileRef.current;
    const video = videoMobileRef.current;
    if (!el || !video) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting ? video.play().catch(() => {}) : video.pause(),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionDesktopRef.current;
    const video = videoDesktopRef.current;
    if (!el || !video) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting ? video.play().catch(() => {}) : video.pause(),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* MOBILE */}
      <div className="md:hidden">
        <VideoTimeline
          sectionRef={sectionMobileRef}
          videoRef={videoMobileRef}
          stepRefs={[mref1, mref2, mref3] as React.RefObject<HTMLDivElement>[]}
          stepVis={[mvis1, mvis2, mvis3]}
          cardClass="rounded-xl p-3.5 backdrop-blur-sm bg-white/[0.08] border border-white/[0.12]"
          iconSize={13}
          titleClass="text-stone-100 text-[0.7rem] font-bold uppercase tracking-wide leading-tight"
          descClass="text-stone-300 text-[0.67rem] leading-relaxed"
          stepGap="mb-14"
          containerClass=""
        />
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block">
        <VideoTimeline
          sectionRef={sectionDesktopRef}
          videoRef={videoDesktopRef}
          stepRefs={[dref1, dref2, dref3] as React.RefObject<HTMLDivElement>[]}
          stepVis={[dvis1, dvis2, dvis3]}
          cardClass="rounded-xl p-5 backdrop-blur-sm bg-white/[0.08] border border-white/[0.12]"
          iconSize={16}
          titleClass="text-stone-100 text-[0.82rem] font-bold uppercase tracking-wide leading-tight"
          descClass="text-stone-300 text-[0.78rem] leading-relaxed"
          stepGap="mb-16"
          containerClass=""
        />
      </div>
    </>
  );
}
