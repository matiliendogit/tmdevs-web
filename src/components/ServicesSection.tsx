import { useState } from "react";
import type { Service } from "../types/index";

const services: Service[] = [
  {
    id: "01",
    title: "Sitios Web Modernos",
    description:
      "Sitios rápidos, mobile-first y optimizados para buscadores. Landings, portafolios y páginas institucionales que generan confianza y atraen clientes desde la primera visita.",
    tags: ["Webs de Negocios", "Webs para eventos", "Emprendimientos"],
    cta: "Hablemos de tu sitio web",
  },
  {
    id: "02",
    title: "APPs para Celulares y computadoras",
    description:
      "Aplicaciones a medida que automatizan procesos reales, reduciendo la carga de trabajo y mejorando la eficiencia. Llegá a tus usuarios o clientes de la mejor manera y con el sello de tu marca o negocio.",
    tags: [
      "Administración de negocio",
      "Gestión de Turnos",
      "Gestión de clases",
      "Gestión de pedidos",
      "Gestión de productos",
    ],
    cta: "Hablemos de tu app personalizada",
  },
  {
    id: "03",
    title: "Software para Laboratorios",
    description:
      "Sistemas diseñados desde adentro: uno de nuestros fundadores es bioquímico con experiencia en laboratorios de análisis clínicos, químicos, veterinarios y agronómicos. Soluciones que entienden los flujos reales del lab.",
    tags: [
      "Interfases",
      "Sistemas de Stock",
      "Gestión de resultados",
      "Automatización",
    ],
    cta: "Hablemos de tu software para laboratorios",
  },
];

const getPreview = (desc: string) => desc.split(" ").slice(0, 4).join(" ");

const TagList = ({ tags }: { readonly tags: string[] }) => (
  <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
    {tags.map((tag) => (
      <li
        key={tag}
        className="text-graphite-500 text-[0.55rem] tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm border border-graphite-600/20"
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
    <div className="w-full pt-28 pb-48 px-10 md:h-dvh md:pt-0 md:pb-0 md:px-12 lg:px-20 md:flex md:flex-col md:justify-center bg-white">
      {/* Section header */}
      <div className="mb-10 md:mb-12 animate-fade-in timeline-view animate-range-[entry_0%_entry_100%]">
        <h2
          id="servicios-heading"
          className="font-black uppercase leading-none text-graphite-900 font-display text-[clamp(2.5rem,6vw,5rem)] tracking-[-0.03em]"
        >
          SERVICIOS
        </h2>
        <div
          className="mt-6 md:mt-8 w-10 h-px bg-graphite-600/20"
          aria-hidden="true"
        />
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-graphite-600/[0.07] border border-graphite-600/[0.1]">
        {services.map((service) => {
          const isExpanded = expandedIds.has(service.id);

          return (
            <article
              key={service.id}
              className="group relative p-8 md:p-8 lg:p-10 bg-white/75 backdrop-blur-sm animate-zoom-in timeline-view animate-range-[entry_0%_entry_100%]"
            >
              {/* Title */}
              <h3 className="font-black uppercase leading-tight mb-3 md:mb-5 text-graphite-900 font-display text-[clamp(1.1rem,3.8vw,2rem)] tracking-[-0.02em] transition-colors duration-300 group-hover:text-[--color-accent]">
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
                  {!isExpanded && (
                    <p className="text-graphite-700 text-sm leading-relaxed">
                      {getPreview(service.description)}
                      <span className="text-graphite-500">…</span>
                    </p>
                  )}
                  <span
                    className="ml-auto text-graphite-500 shrink-0 mt-0.5 text-base font-light leading-none transition-transform duration-400 inline-block"
                    style={{
                      transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  className="grid"
                  style={{
                    gridTemplateRows: isExpanded ? "1fr" : "0fr",
                    transition:
                      "grid-template-rows 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="text-graphite-700 text-sm leading-relaxed mt-4 mb-5">
                      {service.description}
                    </p>
                    <TagList tags={service.tags} />
                    <a
                      href="#contacto"
                      className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 bg-graphite-900 text-cream text-[0.62rem] font-bold tracking-[0.16em] uppercase rounded-xs transition-opacity duration-200 hover:opacity-80"
                    >
                      {service.cta} <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Desktop: full description always visible */}
              <div className="hidden md:block">
                <p className="text-graphite-700 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <TagList tags={service.tags} />
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 mt-6 px-4 py-2.5 bg-graphite-900 text-cream text-[0.62rem] font-bold tracking-[0.16em] uppercase rounded-xs transition-opacity duration-200 hover:opacity-80"
                >
                  {service.cta} <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
