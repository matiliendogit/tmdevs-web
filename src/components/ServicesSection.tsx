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

export default function ServicesSection() {
  const [sectionRef, sectionInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div ref={sectionRef} className="w-full py-24 md:py-32 px-8 md:px-14 lg:px-20">

      {/* Section header */}
      <div className="mb-16 md:mb-20">
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
          className={`mt-8 w-10
            ${sectionInView ? 'animate-fade-in-up animate-duration-500 [animation-delay:200ms]' : 'opacity-0'}`}
          style={{ height: '1px', background: 'rgba(138,138,128,0.2)' }}
          aria-hidden="true"
        />
      </div>

      {/* Services grid — gap-px + wrapper bg creates clean 1px dividers */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-px"
        style={{ background: 'rgba(46,46,43,0.4)', border: '1px solid rgba(46,46,43,0.4)' }}
      >
        {services.map((service, index) => (
          <article
            key={service.id}
            className={`group relative p-10 md:p-12 lg:p-14
              ${sectionInView ? 'animate-fade-in-up animate-duration-700' : 'opacity-0'}`}
            style={{
              background: 'var(--color-graphite-800)',
              animationDelay: sectionInView ? `${index * 100 + 300}ms` : undefined,
            }}
          >
            {/* Service number (decorative) */}
            <span
              className="absolute top-8 right-10 text-[0.55rem] tracking-[0.28em] uppercase"
              style={{ color: 'var(--color-graphite-600)' }}
              aria-hidden="true"
            >
              {service.id}
            </span>

            {/* Title */}
            <h3
              className="font-black uppercase leading-tight mb-5 transition-colors duration-300
                         group-hover:text-[--color-accent]"
              style={{
                fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                color: 'var(--color-stone-100)',
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.02em',
              }}
            >
              {service.title}
            </h3>

            {/* Description */}
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: 'var(--color-stone-400)' }}
            >
              {service.description}
            </p>

            {/* Tags */}
            <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
              {service.tags.map((tag) => (
                <li
                  key={tag}
                  className="text-[0.5rem] tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm"
                  style={{
                    color: 'var(--color-stone-500)',
                    border: '1px solid rgba(46,46,43,0.8)',
                  }}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
