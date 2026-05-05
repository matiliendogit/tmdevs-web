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

export default function ProcessSection() {
  return (
    <div
      id="proceso"
      className="w-full pt-28 pb-48 px-10 md:pt-40 md:pb-52 md:px-12 lg:px-20 border-t border-graphite-600/40"
    >
      {/* Section header */}
      <div className="mb-10 md:mb-20 animate-fade-in timeline-view animate-range-[entry_0%_entry_100%]">
        <span className="block text-stone-500 text-[0.58rem] tracking-[0.22em] uppercase mb-5">
          Section 03
        </span>
        <h2
          className="font-black uppercase leading-none text-stone-100 font-display text-[clamp(2.5rem,6vw,5rem)] tracking-[-0.03em]"
        >
          PROCESO
        </h2>
        <div
          className="mt-6 md:mt-8 w-10 h-px bg-[rgba(138,138,128,0.2)]"
          aria-hidden="true"
        />
      </div>

      {/* Steps grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-px bg-graphite-600/40 border border-graphite-600/40"
      >
        {steps.map(({ id, icon: Icon, title, description }) => (
          <div
            key={id}
            className="relative p-8 md:p-12 lg:p-14 bg-graphite-800 animate-zoom-in timeline-view animate-range-[entry_0%_entry_100%]"
          >
            {/* Step number */}
            <span
              className="absolute top-6 right-7 md:top-8 md:right-10 text-graphite-600 text-[0.55rem] tracking-[0.28em] uppercase"
              aria-hidden="true"
            >
              {id}
            </span>

            {/* Icon */}
            <div className="mb-6 text-accent" aria-hidden="true">
              <Icon size={24} weight="light" />
            </div>

            {/* Title */}
            <h3
              className="font-black uppercase leading-tight mb-3 md:mb-5 text-stone-100 font-display text-[clamp(1.1rem,3.8vw,1.6rem)] tracking-[-0.02em]"
            >
              {title}
            </h3>

            {/* Description */}
            <p className="text-stone-200 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>

      {/* Section CTA */}
      <div className="mt-12 md:mt-16 text-center">
        <a
          href="#contacto"
          className="inline-block text-accent text-[0.65rem] tracking-[0.2em] uppercase transition-colors duration-300 hover:opacity-70"
        >
          Empezar ahora →
        </a>
      </div>
    </div>
  );
}
