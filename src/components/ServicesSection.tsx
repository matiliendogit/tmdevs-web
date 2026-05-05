import { useState } from 'react';
import type { Service } from '../types/index';

const services: Service[] = [
  {
    id: '01',
    title: 'Sitios Web Modernos',
    description:
      'Sitios rápidos, mobile-first y optimizados para buscadores. Landings, portafolios y páginas institucionales que generan confianza desde el primer scroll.',
    tags: ['Astro', 'React', 'Tailwind CSS', 'SEO'],
  },
  {
    id: '02',
    title: 'Web Apps & PWA',
    description:
      'Aplicaciones a medida que automatizan procesos reales: turnos, reservas, gestión de alumnos, administración interna. Tu equipo las usa desde el día uno.',
    tags: ['React', 'Node.js', 'Express', 'SQL', 'PWA'],
  },
  {
    id: '03',
    title: 'Software para Laboratorios',
    description:
      'Sistemas diseñados desde adentro: uno de nuestros fundadores es bioquímico con experiencia en laboratorios de análisis clínicos, químicos, veterinarios y agronómicos. Soluciones que entienden los flujos reales del lab.',
    tags: ['Node.js', 'SQL', 'REST API', 'Railway'],
  },
];

const getPreview = (desc: string) => desc.split(' ').slice(0, 4).join(' ');

const TagList = ({ tags }: { readonly tags: string[] }) => (
  <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
    {tags.map((tag) => (
      <li
        key={tag}
        className="text-stone-400 text-[0.55rem] tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm border border-[rgba(138,138,128,0.3)]"
      >
        {tag}
      </li>
    ))}
  </ul>
);

export default function ServicesSection() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="w-full md:min-h-dvh pt-28 pb-48 px-10 md:pt-40 md:pb-52 md:px-12 lg:px-20">

      {/* Section header */}
      <div className="mb-10 md:mb-20 animate-fade-in timeline-view animate-range-[entry_0%_entry_100%]">
        <span className="block text-stone-500 text-[0.58rem] tracking-[0.22em] uppercase mb-5">
          Section 02
        </span>
        <h2
          id="servicios-heading"
          className="font-black uppercase leading-none text-stone-100 font-display text-[clamp(2.5rem,6vw,5rem)] tracking-[-0.03em]"
        >
          SERVICIOS
        </h2>
        <div
          className="mt-6 md:mt-8 w-10 h-px bg-[rgba(138,138,128,0.2)]"
          aria-hidden="true"
        />
      </div>

      {/* Services grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-px bg-graphite-600/40 border border-graphite-600/40"
      >
        {services.map((service) => {
          const isExpanded = expandedIds.has(service.id);

          return (
            <article
              key={service.id}
              className="group relative p-8 md:p-12 lg:p-14 bg-graphite-800 animate-zoom-in timeline-view animate-range-[entry_0%_entry_100%]"
            >
              {/* Service number (decorative) */}
              <span
                className="absolute top-6 right-7 md:top-8 md:right-10 text-graphite-600 text-[0.55rem] tracking-[0.28em] uppercase"
                aria-hidden="true"
              >
                {service.id}
              </span>

              {/* Title */}
              <h3
                className="font-black uppercase leading-tight mb-3 md:mb-5 text-stone-100 font-display text-[clamp(1.1rem,3.8vw,2rem)] tracking-[-0.02em] transition-colors duration-300 group-hover:text-[--color-accent]"
              >
                {service.title}
              </h3>

              {/* Mobile: expandable description */}
              <div className="md:hidden">
                <button
                  onClick={() => toggle(service.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`service-desc-${service.id}`}
                  className="w-full text-left flex items-start justify-between gap-3 group/toggle"
                >
                  <p className="text-stone-200 text-sm leading-relaxed">
                    {getPreview(service.description)}
                    <span className="text-stone-400">…</span>
                  </p>
                  <span
                    className="text-accent flex-shrink-0 mt-0.5 text-base font-light leading-none transition-transform duration-400 inline-block"
                    style={{
                      transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  className="grid"
                  style={{
                    gridTemplateRows: isExpanded ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="text-stone-200 text-sm leading-relaxed mt-4 mb-5">
                      {service.description}
                    </p>
                    <TagList tags={service.tags} />
                    <a
                      href="#contacto"
                      className="inline-block mt-5 text-accent text-[0.6rem] tracking-[0.16em] uppercase transition-colors duration-300"
                    >
                      Hablar sobre mi proyecto →
                    </a>
                  </div>
                </div>
              </div>

              {/* Desktop: full description always visible */}
              <div className="hidden md:block">
                <p className="text-stone-200 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <TagList tags={service.tags} />
                <a
                  href="#contacto"
                  className="inline-block mt-6 text-accent text-[0.6rem] tracking-[0.16em] uppercase transition-colors duration-300 hover:opacity-70"
                >
                  Hablar sobre mi proyecto →
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
