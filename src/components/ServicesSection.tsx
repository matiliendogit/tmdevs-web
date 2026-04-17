import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import type { Service } from '../types/index';

const services: Service[] = [
  {
    id: '01',
    title: 'Aplicaciones Web',
    description:
      'Desarrollo a medida de plataformas web modernas. Dashboards, SaaS, portales internos y herramientas de gestión adaptadas a tu negocio.',
    tags: ['React', 'Node.js', 'TypeScript'],
  },
  {
    id: '02',
    title: 'E-Commerce',
    description:
      'Tiendas online de alto rendimiento con pasarelas de pago, catálogos dinámicos y analítica en tiempo real para maximizar tus ventas.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
  },
  {
    id: '03',
    title: 'Software Empresarial',
    description:
      'Automatización de procesos, ERPs y CRMs a medida. Sistemas que escalan con el crecimiento de tu empresa y se integran con tus operaciones.',
    tags: ['API REST', 'Microservices', 'Cloud'],
  },
  {
    id: '04',
    title: 'APIs e Integraciones',
    description:
      'Conexión con plataformas externas, pasarelas de pago, CRMs y cualquier servicio de terceros que tu negocio necesite para operar.',
    tags: ['REST', 'GraphQL', 'Webhooks'],
  },
];

const getPreview = (desc: string) => desc.split(' ').slice(0, 4).join(' ');

const TagList = ({ tags }: { tags: string[] }) => (
  <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
    {tags.map((tag) => (
      <li
        key={tag}
        className="text-[0.55rem] tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm"
        style={{
          color: 'var(--color-stone-400)',
          border: '1px solid rgba(138,138,128,0.3)',
        }}
      >
        {tag}
      </li>
    ))}
  </ul>
);

export default function ServicesSection() {
  const [sectionRef, sectionInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div ref={sectionRef} className="w-full md:min-h-dvh pt-28 pb-48 px-10 md:pt-40 md:pb-52 md:px-12 lg:px-20">

      {/* Section header */}
      <div className="mb-10 md:mb-20">
        <span
          className={`block text-[0.58rem] tracking-[0.22em] uppercase mb-5
            ${sectionInView ? 'animate-fade-in-up animate-duration-700' : 'opacity-0'}`}
          style={{
            color: 'var(--color-stone-500)',
            animationDelay: sectionInView ? '0ms' : undefined,
          }}
        >
          Section 02
        </span>
        <h2
          id="servicios-heading"
          className={`font-black uppercase leading-none
            ${sectionInView ? 'animate-fade-in-up animate-duration-700 [animation-delay:100ms]' : 'opacity-0'}`}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: 'var(--color-stone-100)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.03em',
          }}
        >
          SERVICIOS
        </h2>
        <div
          className={`mt-6 md:mt-8 w-10
            ${sectionInView ? 'animate-fade-in-up animate-duration-500 [animation-delay:200ms]' : 'opacity-0'}`}
          style={{ height: '1px', background: 'rgba(138,138,128,0.2)' }}
          aria-hidden="true"
        />
      </div>

      {/* Services grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-px"
        style={{ background: 'rgba(46,46,43,0.4)', border: '1px solid rgba(46,46,43,0.4)' }}
      >
        {services.map((service, index) => {
          const isExpanded = expandedIds.has(service.id);

          return (
            <article
              key={service.id}
              className={`group relative p-8 md:p-12 lg:p-14
                ${sectionInView ? 'animate-fade-in-up animate-duration-700' : 'opacity-0'}`}
              style={{
                background: 'var(--color-graphite-800)',
                animationDelay: sectionInView ? `${index * 100 + 300}ms` : undefined,
              }}
            >
              {/* Service number (decorative) */}
              <span
                className="absolute top-6 right-7 md:top-8 md:right-10 text-[0.55rem] tracking-[0.28em] uppercase"
                style={{ color: 'var(--color-graphite-600)' }}
                aria-hidden="true"
              >
                {service.id}
              </span>

              {/* Title */}
              <h3
                className="font-black uppercase leading-tight mb-3 md:mb-5 transition-colors duration-300
                           group-hover:text-[--color-accent]"
                style={{
                  fontSize: 'clamp(1.1rem, 3.8vw, 2rem)',
                  color: 'var(--color-stone-100)',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.02em',
                }}
              >
                {service.title}
              </h3>

              {/* ── Mobile: expandable description ── */}
              <div className="md:hidden">
                {/* Collapsed preview + toggle */}
                <button
                  onClick={() => toggle(service.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`service-desc-${service.id}`}
                  className="w-full text-left flex items-start justify-between gap-3 group/toggle"
                >
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--color-stone-200)' }}
                  >
                    {getPreview(service.description)}
                    <span style={{ color: 'var(--color-stone-400)' }}>…</span>
                  </p>
                  <span
                    className="flex-shrink-0 mt-0.5 text-base font-light leading-none transition-transform duration-400"
                    style={{
                      color: 'var(--color-accent)',
                      transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
                      display: 'inline-block',
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {/* Expand panel — grid-template-rows trick for smooth height animation */}
                <div
                  id={`service-desc-${service.id}`}
                  style={{
                    display: 'grid',
                    gridTemplateRows: isExpanded ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <p
                      className="text-sm leading-relaxed mt-4 mb-5"
                      style={{ color: 'var(--color-stone-200)' }}
                    >
                      {service.description}
                    </p>
                    <TagList tags={service.tags} />
                  </div>
                </div>
              </div>

              {/* ── Desktop: full description always visible ── */}
              <div className="hidden md:block">
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: 'var(--color-stone-200)' }}
                >
                  {service.description}
                </p>
                <TagList tags={service.tags} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
