import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import type { Project } from "../types/index";
import iphoneImg from "../assets/images/summit-iphone.webp";
import laptopImg from "../assets/images/summit-laptop.webp";

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

const projects: Project[] = [
  {
    id: "01",
    title: "SUMMIT",
    subtitle: "PWA para gimnasio · Santa Rosa, La Pampa",
    tag: "EN PRODUCCIÓN",
    description:
      "Sistema completo de gestión de clases y reservas. Más de 100 alumnos activos reservan, cancelan y gestionan su plan desde el celular. Panel de administración para clases, horarios, docentes y alumnos. Reemplazó la gestión por WhatsApp y papel.",
    cta: "Ver la app",
    ctaHref: "https://summit-tc.up.railway.app/",
  },
];

function CornerMarks() {
  return (
    <div
      className="absolute inset-3 md:inset-6 pointer-events-none"
      aria-hidden="true"
    >
      <span className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-t border-l border-[rgba(138,138,128,0.3)]" />
      <span className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 border-t border-r border-[rgba(138,138,128,0.3)]" />
      <span className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 border-b border-l border-[rgba(138,138,128,0.3)]" />
      <span className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-b border-r border-[rgba(138,138,128,0.3)]" />
    </div>
  );
}

interface ImageLayout {
  dx: number;
  dy: number;
  scale: number;
}

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [activeContent, setActiveContent] = useState(0);
  const touchStartX = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const uiLayerRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLImageElement>(null);
  const iphoneRef = useRef<HTMLImageElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<{ laptop: ImageLayout; iphone: ImageLayout } | null>(
    null
  );
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

  useEffect(() => {
    const t = setTimeout(() => setActiveContent(0), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!sectionRef.current?.contains(document.activeElement)) return;
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "ArrowRight") goTo(current + 1);
    };
    globalThis.addEventListener("keydown", onKey);
    return () => globalThis.removeEventListener("keydown", onKey);
  }, [current, animating]);

  // Pre-compute animation targets from current (background) image positions to
  // their centered final positions. Uses transform-only animation (no reflow).
  const computeLayout = useCallback(() => {
    const section = sectionRef.current;
    const laptop = laptopRef.current;
    const iphone = iphoneRef.current;
    if (!section || !laptop || !iphone) return;

    const W = section.offsetWidth;
    const H = section.offsetHeight;
    const sr = section.getBoundingClientRect();
    const lr = laptop.getBoundingClientRect();
    const ir = iphone.getBoundingClientRect();

    if (lr.width === 0 || ir.width === 0) return;

    // Current centers relative to section (small rotation error is negligible)
    const lCX = lr.left + lr.width / 2 - sr.left;
    const lCY = lr.top + lr.height / 2 - sr.top;
    const iCX = ir.left + ir.width / 2 - sr.left;
    const iCY = ir.top + ir.height / 2 - sr.top;

    // Target end sizes — iPhone 1.5× the previous value
    const laptopEndW = Math.min(Math.max(220, W * 0.38), 500);
    const iphoneEndW = Math.min(Math.max(90, W * 0.165), 225);
    const gap = Math.min(W * 0.04, 40);

    // Scale relative to current rendered width (accounts for clamp at current viewport)
    const laptopScale = laptopEndW / lr.width;
    const iphoneScale = iphoneEndW / ir.width;

    // Target centers: side by side, shifted up to leave room for buttons below
    const totalW = laptopEndW + iphoneEndW + gap;
    const startLeft = (W - totalW) / 2;
    const lEndCX = startLeft + laptopEndW / 2;
    const lEndCY = H * 0.45;
    const iEndCX = startLeft + laptopEndW + gap + iphoneEndW / 2;
    const iEndCY = H * 0.45;

    layoutRef.current = {
      laptop: { dx: lEndCX - lCX, dy: lEndCY - lCY, scale: laptopScale },
      iphone: { dx: iEndCX - iCX, dy: iEndCY - iCY, scale: iphoneScale },
    };
  }, []);

  // Measure before first paint (images at natural CSS position, no scroll transform)
  useLayoutEffect(() => {
    computeLayout();
  }, [computeLayout]);

  // Scroll-driven animation
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const uiLayer = uiLayerRef.current;
    const laptop = laptopRef.current;
    const iphone = iphoneRef.current;
    const buttons = buttonsRef.current;
    if (!wrapper || !uiLayer || !laptop || !iphone) return;

    let rafId: number;

    const update = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrollable = wrapper.offsetHeight - globalThis.innerHeight;
      if (scrollable <= 0) return;

      const raw = Math.max(0, Math.min(1, -rect.top / scrollable));

      // UI layer: fade + shrink over first 50% of scroll
      const uiP = easeOutCubic(Math.min(1, raw / 0.5));
      uiLayer.style.opacity = String(1 - uiP);
      uiLayer.style.transform = `scale(${lerp(1, 0.9, uiP)}) translateY(${lerp(0, -16, uiP)}px)`;

      // Images: stay in background during text fade, then move to center
      const imgRaw = Math.max(0, Math.min(1, (raw - 0.5) / 0.5));
      const imgP = easeOutCubic(imgRaw);
      const L = layoutRef.current;

      const lOpacity = lerp(0.1, 1, imgP);
      const lRotate = lerp(-4, 0, imgP);
      laptop.style.opacity = String(lOpacity);
      laptop.style.transform = L
        ? `translate(${lerp(0, L.laptop.dx, imgP)}px, ${lerp(0, L.laptop.dy, imgP)}px) scale(${lerp(1, L.laptop.scale, imgP)}) rotate(${lRotate}deg)`
        : `rotate(${lRotate}deg)`;

      const iOpacity = lerp(0.16, 1, imgP);
      const iRotate = lerp(6, 0, imgP);
      iphone.style.opacity = String(iOpacity);
      iphone.style.transform = L
        ? `translate(${lerp(0, L.iphone.dx, imgP)}px, ${lerp(0, L.iphone.dy, imgP)}px) scale(${lerp(1, L.iphone.scale, imgP)}) rotate(${iRotate}deg)`
        : `rotate(${iRotate}deg)`;

      // Buttons: fade in after images are mostly settled (imgP > 0.75)
      if (buttons) {
        const btnsP = easeOutCubic(Math.max(0, Math.min(1, (imgP - 0.75) / 0.25)));
        buttons.style.opacity = String(btnsP);
        buttons.style.pointerEvents = btnsP > 0.5 ? "auto" : "none";
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    const onResize = () => {
      // Reset to initial state before re-measuring
      if (laptopRef.current) {
        laptopRef.current.style.transform = "rotate(-4deg)";
        laptopRef.current.style.opacity = "0.10";
      }
      if (iphoneRef.current) {
        iphoneRef.current.style.transform = "rotate(6deg)";
        iphoneRef.current.style.opacity = "0.16";
      }
      if (buttonsRef.current) {
        buttonsRef.current.style.opacity = "0";
        buttonsRef.current.style.pointerEvents = "none";
      }
      computeLayout();
      requestAnimationFrame(update);
    };

    globalThis.addEventListener("scroll", onScroll, { passive: true });
    globalThis.addEventListener("resize", onResize);
    update();

    return () => {
      globalThis.removeEventListener("scroll", onScroll);
      globalThis.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, [computeLayout]);

  const isActive = (idx: number) => activeContent === idx;

  return (
    <div ref={wrapperRef} className="relative" style={{ height: "200vh" }}>
      <section
        ref={sectionRef}
        className="sticky top-0 w-full overflow-hidden h-dvh"
      >
        {/* Images layer — single source of truth, behind text, animates to center */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <img
            ref={laptopRef}
            src={laptopImg.src}
            alt=""
            loading="eager"
            decoding="async"
            onLoad={computeLayout}
            className="absolute"
            style={{
              bottom: "-5%",
              left: "-8%",
              width: "clamp(340px, 62vw, 780px)",
              opacity: 0.1,
              objectFit: "contain",
              transform: "rotate(-4deg)",
              transformOrigin: "center center",
            }}
          />
          <img
            ref={iphoneRef}
            src={iphoneImg.src}
            alt=""
            loading="eager"
            decoding="async"
            onLoad={computeLayout}
            className="absolute"
            style={{
              bottom: "-2%",
              right: "-3%",
              width: "clamp(100px, 18vw, 240px)",
              opacity: 0.16,
              objectFit: "contain",
              transform: "rotate(6deg)",
              transformOrigin: "center center",
            }}
          />
        </div>

        {/* Demo buttons — appear after images settle, styled as Hero CTAs */}
        <div
          ref={buttonsRef}
          className="absolute inset-x-0 bottom-[6%] flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 px-6 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <button
            type="button"
            className="px-7 sm:px-9 py-[0.75rem] sm:py-[0.85rem] bg-accent text-graphite-950 text-[0.65rem] sm:text-[0.7rem] font-bold tracking-[0.18em] uppercase rounded-xs min-h-11 transition-opacity duration-200 hover:opacity-85 w-full sm:w-auto max-w-[16rem]"
          >
            Ver demo laptop
          </button>
          <button
            type="button"
            className="px-7 sm:px-9 py-[0.75rem] sm:py-[0.85rem] bg-accent text-graphite-950 text-[0.65rem] sm:text-[0.7rem] font-bold tracking-[0.18em] uppercase rounded-xs min-h-11 transition-opacity duration-200 hover:opacity-85 w-full sm:w-auto max-w-[16rem]"
          >
            Ver demo mobile
          </button>
        </div>

        {/* UI layer — fades out and shrinks on scroll */}
        <div ref={uiLayerRef} className="relative w-full h-full px-7 py-11">
          {/* Carousel track */}
          <div
            className="flex w-full h-full"
            style={{
              transform: `translateX(-${current * 100}%)`,
              transition: "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)",
            }}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const delta = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(delta) > 50)
                goTo(delta > 0 ? current + 1 : current - 1);
            }}
          >
            {projects.map((project, i) => (
              <article
                key={project.id}
                className="relative shrink-0 w-full h-full flex items-center justify-center"
              >
                <CornerMarks />

                {/* Tag — top right */}
                <div className="absolute top-6 right-8 md:top-8 md:right-12 z-10">
                  <span className="text-stone-500 text-[0.58rem] tracking-[0.22em] uppercase">
                    {project.tag}
                  </span>
                </div>

                {/* Vertical section number — desktop only */}
                <div
                  className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 z-10"
                  aria-hidden="true"
                >
                  <span className="text-stone-500 text-[0.58rem] tracking-[0.3em] uppercase [writing-mode:vertical-rl] rotate-180">
                    {project.id}
                  </span>
                  <div className="w-px h-14 bg-[rgba(138,138,128,0.25)]" />
                </div>

                {/* Main content */}
                <div className="flex flex-col items-center text-center px-12 md:px-32 lg:px-48 relative z-10 max-w-5xl mx-auto">
                  <h2
                    className={`slide-content font-black uppercase leading-none text-stone-100 font-display text-[clamp(3rem,12vw,10rem)] tracking-[-0.03em] ${
                      isActive(i) ? "active" : ""
                    }`}
                  >
                    {project.title}
                  </h2>
                  <p
                    className={`slide-content delay-1 mt-3 md:mt-4 text-stone-400 text-[0.62rem] tracking-[0.22em] uppercase ${
                      isActive(i) ? "active" : ""
                    }`}
                  >
                    {project.subtitle}
                  </p>
                  <p
                    className={`slide-content delay-2 mt-5 md:mt-6 text-stone-200 text-sm leading-relaxed max-w-xs md:max-w-sm ${
                      isActive(i) ? "active" : ""
                    }`}
                  >
                    {project.description}
                  </p>
                  <a
                    href={project.ctaHref}
                    target={
                      project.ctaHref.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      project.ctaHref.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={`slide-content delay-3 mt-7 md:mt-8 inline-flex items-center gap-3 text-stone-100 text-[0.62rem] tracking-[0.22em] uppercase transition-colors duration-300 group ${
                      isActive(i) ? "active" : ""
                    }`}
                  >
                    {project.cta}
                    <span
                      className="inline-block h-px w-6 bg-current transition-all duration-300 group-hover:opacity-60"
                      aria-hidden="true"
                    />
                    <span
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
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
                       text-stone-400 transition-colors duration-300 hover:opacity-60"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
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
                       text-stone-400 transition-colors duration-300 hover:opacity-60"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
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
            {projects.map((project, i) => (
              <button
                key={project.id}
                onClick={() => goTo(i)}
                className="h-0.75 rounded-full transition-all duration-400"
                style={{
                  width: i === current ? "1.5rem" : "0.25rem",
                  background:
                    i === current
                      ? "var(--color-stone-300)"
                      : "rgba(138,138,128,0.35)",
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
