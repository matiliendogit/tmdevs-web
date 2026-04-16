import { useState, useEffect, useRef } from 'react';
import type { Project } from '../types/index';

const projects: Project[] = [
  {
    id: '01',
    title: 'NEXUS',
    subtitle: 'Aplicación Web a Medida',
    tag: 'WEB APP',
    description:
      'Plataforma de gestión interna desarrollada con tecnologías modernas. Flujos de trabajo automatizados y panel de control en tiempo real.',
    cta: 'Ver Proyecto',
    ctaHref: '#',
  },
  {
    id: '02',
    title: 'HELIX',
    subtitle: 'E-Commerce Platform',
    tag: 'E-COMMERCE',
    description:
      'Tienda online de alto rendimiento con catálogo dinámico, pasarela de pago integrada y dashboard de analítica para el negocio.',
    cta: 'Ver Proyecto',
    ctaHref: '#',
  },
  {
    id: '03',
    title: 'FORGE',
    subtitle: 'Software Empresarial',
    tag: 'ENTERPRISE',
    description:
      'Sistema ERP personalizado para la gestión de operaciones, inventario y reportes. Diseñado para escalar con el crecimiento del negocio.',
    cta: 'Ver Proyecto',
    ctaHref: '#',
  },
];

function CornerMarks() {
  return (
    <div className="absolute inset-3 md:inset-6 pointer-events-none" aria-hidden="true">
      <span
        className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8"
        style={{ borderTop: '1px solid rgba(138,138,128,0.3)', borderLeft: '1px solid rgba(138,138,128,0.3)' }}
      />
      <span
        className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8"
        style={{ borderTop: '1px solid rgba(138,138,128,0.3)', borderRight: '1px solid rgba(138,138,128,0.3)' }}
      />
      <span
        className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8"
        style={{ borderBottom: '1px solid rgba(138,138,128,0.3)', borderLeft: '1px solid rgba(138,138,128,0.3)' }}
      />
      <span
        className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8"
        style={{ borderBottom: '1px solid rgba(138,138,128,0.3)', borderRight: '1px solid rgba(138,138,128,0.3)' }}
      />
    </div>
  );
}

function GhostImages({ index }: { index: number }) {
  const colors = [
    ['bg-stone-700', 'bg-stone-600'],
    ['bg-stone-600', 'bg-stone-500'],
    ['bg-stone-800', 'bg-stone-700'],
  ];
  const [c1, c2] = colors[index % colors.length];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        className={`absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2
                    w-48 h-64 md:w-72 md:h-80 rounded-sm ${c1}
                    opacity-[0.07] blur-sm`}
        style={{ transform: 'translate(-50%, -50%) rotate(-8deg)' }}
      />
      <div
        className={`absolute top-1/4 right-1/4 w-36 h-52 md:w-56 md:h-72
                    rounded-sm ${c2} opacity-[0.05] blur-[1px]`}
        style={{ transform: 'rotate(6deg)' }}
      />
    </div>
  );
}

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [activeContent, setActiveContent] = useState(0);
  const touchStartX = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const total = projects.length;

  const goTo = (index: number) => {
    if (animating) return;

    const next = ((index % total) + total) % total;

    setAnimating(true);
    setActiveContent(-1);
    setCurrent(next);

    setTimeout(() => {
      setActiveContent(next);
      setAnimating(false);
    }, 720);
  };

  // Activate first slide on mount
  useEffect(() => {
    const t = setTimeout(() => setActiveContent(0), 100);
    return () => clearTimeout(t);
  }, []);

  // Keyboard navigation — scoped to when focus is inside the section
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!sectionRef.current?.contains(document.activeElement)) return;
      if (e.key === 'ArrowLeft') goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, animating]);

  const isActive = (idx: number) => activeContent === idx;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100dvh' }}
    >
      {/* Track */}
      <div
        className="flex w-full h-full"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: 'transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)',
        }}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const delta = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(delta) > 50) goTo(delta > 0 ? current + 1 : current - 1);
        }}
      >
        {projects.map((project, i) => (
          <article
            key={project.id}
            className="relative flex-shrink-0 w-full h-full flex items-center justify-center"
          >
            <CornerMarks />
            <GhostImages index={i} />

            {/* Tag — top right */}
            <div className="absolute top-6 right-8 md:top-8 md:right-12 z-10">
              <span
                className="text-[0.58rem] tracking-[0.22em] uppercase"
                style={{ color: 'var(--color-stone-500)' }}
              >
                {project.tag}
              </span>
            </div>

            {/* Vertical section number — desktop only */}
            <div
              className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 z-10"
              aria-hidden="true"
            >
              <span
                className="text-[0.58rem] tracking-[0.3em] uppercase"
                style={{
                  color: 'var(--color-stone-500)',
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                }}
              >
                {project.id}
              </span>
              <div
                className="w-px h-14"
                style={{ background: 'rgba(138,138,128,0.25)' }}
              />
            </div>

            {/* Main content */}
            <div className="flex flex-col items-center text-center px-12 md:px-32 lg:px-48 relative z-10 max-w-5xl mx-auto">
              {/* Title */}
              <h2
                className={`slide-content font-black uppercase leading-none tracking-tight ${isActive(i) ? 'active' : ''}`}
                style={{
                  fontSize: 'clamp(3rem, 12vw, 10rem)',
                  color: 'var(--color-stone-100)',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.03em',
                }}
              >
                {project.title}
              </h2>

              {/* Subtitle */}
              <p
                className={`slide-content delay-1 mt-3 md:mt-4 text-[0.62rem] tracking-[0.22em] uppercase ${isActive(i) ? 'active' : ''}`}
                style={{ color: 'var(--color-stone-500)' }}
              >
                {project.subtitle}
              </p>

              {/* Description */}
              <p
                className={`slide-content delay-2 mt-5 md:mt-6 text-sm leading-relaxed max-w-xs md:max-w-sm ${isActive(i) ? 'active' : ''}`}
                style={{ color: 'var(--color-stone-400)' }}
              >
                {project.description}
              </p>

              {/* CTA */}
              <a
                href={project.ctaHref}
                className={`slide-content delay-3 mt-7 md:mt-8 inline-flex items-center gap-3 text-[0.62rem] tracking-[0.22em] uppercase transition-colors duration-300 group ${isActive(i) ? 'active' : ''}`}
                style={{ color: 'var(--color-stone-300)' }}
              >
                {project.cta}
                <span
                  className="inline-block h-px transition-all duration-300 group-hover:opacity-60"
                  style={{ width: '1.5rem', background: 'currentColor' }}
                  aria-hidden="true"
                />
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Prev arrow */}
      <button
        onClick={() => goTo(current - 1)}
        className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 z-20
                   w-9 h-9 md:w-11 md:h-11 flex items-center justify-center
                   transition-colors duration-300 hover:opacity-60"
        style={{ color: 'var(--color-stone-400)' }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={() => goTo(current + 1)}
        className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 z-20
                   w-9 h-9 md:w-11 md:h-11 flex items-center justify-center
                   transition-colors duration-300 hover:opacity-60"
        style={{ color: 'var(--color-stone-400)' }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-7 md:bottom-9 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="h-[3px] rounded-full transition-all duration-400"
            style={{
              width: i === current ? '1.5rem' : '0.25rem',
              background: i === current ? 'var(--color-stone-300)' : 'rgba(138,138,128,0.35)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
