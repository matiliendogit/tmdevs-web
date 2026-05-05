export default function Hero() {
  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden h-dvh">
      {/* Atmospheric white glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 5% -8%, rgba(255,255,255,0.15) 0%, transparent 65%)",
        }}
      />

      {/* Left vertical label */}
      <div
        className="absolute left-8 md:left-14 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4"
        style={{ animation: "heroFadeUp 0.7s ease 0.45s both" }}
      >
        <span className="text-stone-500 text-[0.55rem] tracking-[0.3em] uppercase [writing-mode:vertical-rl] rotate-180">
          00
        </span>
        <div className="w-px h-14 bg-[rgba(138,138,128,0.2)]" />
      </div>

      {/* Right vertical label */}
      <div
        className="absolute right-8 md:right-14 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4"
        style={{ animation: "heroFadeUp 0.7s ease 0.5s both" }}
      >
        <div className="w-px h-14 bg-[rgba(138,138,128,0.2)]" />
        <span className="text-stone-500 text-[0.55rem] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">
          Software Solutions
        </span>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center text-center px-8 relative z-10">
        {/* Small label above */}
        <p
          className="text-stone-200 text-[0.6rem] tracking-[0.32em] uppercase mb-5"
          style={{ animation: "heroFadeUp 0.7s ease 0.08s both" }}
        >
          Somos
        </p>

        {/* Main heading */}
        <h1
          className="font-black leading-none text-stone-100 font-display text-[clamp(2.4rem,12vw,5rem)] tracking-[0.01em]"
          style={{ animation: "heroFadeUp 0.7s ease 0s both" }}
        >
          <span className="tracking-[0.01em] text-[clamp(6rem,12vw,3rem)]">tm</span>
          <span> </span>
          <span className="tracking-[-0.01em] text-[clamp(2.4rem,12vw,3rem)]">devs</span>
        </h1>

        {/* Thin divider */}
        <div
          className="h-px bg-[rgba(138,138,128,0.28)] my-7 mx-auto"
          style={{ animation: "heroLineExpand 0.8s ease 0.3s both" }}
        />

        {/* Tag below */}
        <p
          className="hero-subtitle text-stone-200"
          style={{ animation: "heroFadeUp 0.7s ease 0.18s both" }}
        >
          Software / Solutions
        </p>

        {/* Subheadline */}
        <p
          className="text-stone-400 text-[clamp(0.8rem,2vw,1rem)] tracking-[0.02em] max-w-[36rem] leading-[1.6] mt-7"
          style={{ animation: "heroFadeUp 0.7s ease 0.28s both" }}
        >
          Construimos sitios web, aplicaciones y software especializado que
          resuelven problemas reales de negocio.
        </p>

        {/* Primary CTA */}
        <a
          href="#casos"
          className="inline-block mt-8 px-9 py-[0.85rem] bg-accent text-graphite-950 text-[0.7rem] font-bold tracking-[0.18em] uppercase no-underline rounded-xs min-h-11 transition-opacity duration-200"
          style={{ animation: "heroFadeUp 0.7s ease 0.38s both" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Ver casos reales
        </a>

        {/* Social proof snippet */}
        <p
          className="text-stone-500 text-[0.58rem] tracking-[0.2em] uppercase mt-6"
          style={{ animation: "heroFadeUp 0.7s ease 0.48s both" }}
        >
          100+ usuarios activos en producción &nbsp;·&nbsp; Córdoba y La Pampa,
          Argentina
        </p>
      </div>
    </section>
  );
}
