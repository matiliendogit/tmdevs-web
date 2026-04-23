import { MagnifyingGlass, Code, RocketLaunch } from '@phosphor-icons/react';

const steps = [
  {
    id: '01',
    icon: MagnifyingGlass,
    title: 'Diagnóstico',
    description:
      'Entendemos tu negocio, objetivos y desafíos técnicos en una reunión inicial gratuita. Sin compromiso.',
  },
  {
    id: '02',
    icon: Code,
    title: 'Diseño y desarrollo',
    description:
      'Iteramos rápido con entregas semanales. Ves el avance en tiempo real y podés dar feedback en cada etapa.',
  },
  {
    id: '03',
    icon: RocketLaunch,
    title: 'Lanzamiento y soporte',
    description:
      'Desplegamos, monitoreamos y te acompañamos post-lanzamiento. Tu producto sigue evolucionando con vos.',
  },
];

export default function ProcessSection() {
  return (
    <div
      id="proceso"
      className="w-full pt-28 pb-48 px-10 md:pt-40 md:pb-52 md:px-12 lg:px-20"
      style={{ borderTop: '1px solid rgba(46,46,43,0.4)' }}
    >
      {/* Section header */}
      <div className="mb-10 md:mb-20 animate-fade-in timeline-view animate-range-[entry_0%_entry_100%]">
        <span
          className="block text-[0.58rem] tracking-[0.22em] uppercase mb-5"
          style={{ color: 'var(--color-stone-500)' }}
        >
          Section 03
        </span>
        <h2
          className="font-black uppercase leading-none"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: 'var(--color-stone-100)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.03em',
          }}
        >
          PROCESO
        </h2>
        <div
          className="mt-6 md:mt-8 w-10"
          style={{ height: '1px', background: 'rgba(138,138,128,0.2)' }}
          aria-hidden="true"
        />
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px"
        style={{ background: 'rgba(46,46,43,0.4)', border: '1px solid rgba(46,46,43,0.4)' }}
      >
        {steps.map(({ id, icon: Icon, title, description }) => (
          <div
            key={id}
            className="relative p-8 md:p-12 lg:p-14 animate-zoom-in timeline-view animate-range-[entry_0%_entry_100%]"
            style={{ background: 'var(--color-graphite-800)' }}
          >
            {/* Step number */}
            <span
              className="absolute top-6 right-7 md:top-8 md:right-10 text-[0.55rem] tracking-[0.28em] uppercase"
              style={{ color: 'var(--color-graphite-600)' }}
              aria-hidden="true"
            >
              {id}
            </span>

            {/* Icon */}
            <div className="mb-6" aria-hidden="true">
              <Icon
                size={24}
                weight="light"
                style={{ color: 'var(--color-accent)' }}
              />
            </div>

            {/* Title */}
            <h3
              className="font-black uppercase leading-tight mb-3 md:mb-5"
              style={{
                fontSize: 'clamp(1.1rem, 3.8vw, 1.6rem)',
                color: 'var(--color-stone-100)',
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </h3>

            {/* Description */}
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--color-stone-200)' }}
            >
              {description}
            </p>
          </div>
        ))}
      </div>

      {/* Section CTA */}
      <div className="mt-12 md:mt-16 text-center">
        <a
          href="#contacto"
          className="inline-block text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-300 hover:opacity-70"
          style={{ color: 'var(--color-accent)' }}
        >
          Empezar ahora →
        </a>
      </div>
    </div>
  );
}
