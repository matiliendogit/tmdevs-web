import { useRef, useEffect, useState } from 'react';
import { MagnifyingGlass, Code, RocketLaunch } from '@phosphor-icons/react';

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

const ITEM_DELAYS = ['0.3s', '0.6s', '0.9s'];

function VideoTimeline({
  sectionRef,
  videoRef,
  inView,
  cardClass,
  iconSize,
  titleClass,
  descClass,
}: {
  sectionRef: React.RefObject<HTMLDivElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  inView: boolean;
  cardClass: string;
  iconSize: number;
  titleClass: string;
  descClass: string;
}) {
  return (
    <div ref={sectionRef} className="relative overflow-hidden min-h-dvh">
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

          {/* Línea central — crece de arriba a abajo */}
          <div
            className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-px bg-white/20"
            style={
              inView
                ? { animation: 'growDown 1s ease both', transformOrigin: 'top' }
                : { transform: 'scaleY(0)', transformOrigin: 'top' }
            }
            aria-hidden="true"
          />

          {steps.map(({ id, icon: Icon, title, description }, i) => {
            const isLeft = i % 2 === 0;
            const itemStyle: React.CSSProperties = inView
              ? { animation: `${isLeft ? 'slideFromLeft' : 'slideFromRight'} 0.6s ease ${ITEM_DELAYS[i]} both` }
              : { opacity: 0 };

            return (
              <div key={id} className="flex items-center mb-14 last:mb-0">

                {/* Slot izquierdo */}
                <div className="flex-1 pr-4 flex justify-end">
                  {isLeft && (
                    <div style={itemStyle} className={`${cardClass} w-full`}>
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
                  style={inView
                    ? { animation: `heroFadeUp 0.4s ease ${ITEM_DELAYS[i]} both` }
                    : { opacity: 0 }
                  }
                  aria-hidden="true"
                />

                {/* Slot derecho */}
                <div className="flex-1 pl-4 flex justify-start">
                  {!isLeft && (
                    <div style={itemStyle} className={`${cardClass} w-full`}>
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
        <div
          className="mt-14 flex justify-center"
          style={inView ? { animation: 'heroFadeUp 0.6s ease 1.2s both' } : { opacity: 0 }}
        >
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

function useVideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el    = sectionRef.current;
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

  return { sectionRef, videoRef, inView };
}

export default function ProcessSection() {
  const mobile  = useVideoSection();
  const desktop = useVideoSection();

  const sharedProps = {
    cardClass: 'rounded-xl backdrop-blur-sm bg-white/[0.08] border border-white/[0.12]',
  };

  return (
    <>
      <div className="md:hidden">
        <VideoTimeline
          sectionRef={mobile.sectionRef}
          videoRef={mobile.videoRef}
          inView={mobile.inView}
          {...sharedProps}
          cardClass={`${sharedProps.cardClass} p-3.5`}
          iconSize={13}
          titleClass="text-stone-100 text-[0.7rem] font-bold uppercase tracking-wide leading-tight"
          descClass="text-stone-300 text-[0.67rem] leading-relaxed"
        />
      </div>

      <div className="hidden md:block">
        <VideoTimeline
          sectionRef={desktop.sectionRef}
          videoRef={desktop.videoRef}
          inView={desktop.inView}
          {...sharedProps}
          cardClass={`${sharedProps.cardClass} p-5`}
          iconSize={16}
          titleClass="text-stone-100 text-[0.82rem] font-bold uppercase tracking-wide leading-tight"
          descClass="text-stone-300 text-[0.78rem] leading-relaxed"
        />
      </div>
    </>
  );
}
