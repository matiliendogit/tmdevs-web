export default function Hero() {
  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* ── Atmospheric white glow — top-center ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 5% -8%, rgba(255,255,255,0.15) 0%, transparent 65%)",
        }}
      />

      {/* ── Left vertical label ── */}
      <div
        className="absolute left-8 md:left-14 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4"
        style={{ animation: "heroFadeUp 0.7s ease 0.45s both" }}
      >
        <span
          style={{
            color: "var(--color-stone-500)",
            fontSize: "0.55rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          00
        </span>
        <div
          style={{
            width: "1px",
            height: "3.5rem",
            background: "rgba(138,138,128,0.2)",
          }}
        />
      </div>

      {/* ── Right vertical label ── */}
      <div
        className="absolute right-8 md:right-14 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4"
        style={{ animation: "heroFadeUp 0.7s ease 0.5s both" }}
      >
        <div
          style={{
            width: "1px",
            height: "3.5rem",
            background: "rgba(138,138,128,0.2)",
          }}
        />
        <span
          style={{
            color: "var(--color-stone-500)",
            fontSize: "0.55rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
          }}
        >
          Software Solutions
        </span>
      </div>

      {/* ── Main content ── */}
      <div className="flex flex-col items-center text-center px-8 relative z-10">
        {/* Small label above */}
        <p
          style={{
            color: "var(--color-stone-200)",
            fontSize: "0.6rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            marginBottom: "1.25rem",
            animation: "heroFadeUp 0.7s ease 0.08s both",
          }}
        >
          Somos
        </p>

        {/* Main heading */}
        <h1
          className="font-black leading-none"
          style={{
            fontSize: "clamp(2.4rem, 12vw, 5rem)",
            color: "var(--color-stone-100)",
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.03em",
            animation: "heroFadeUp 0.7s ease 0s both",
          }}
        >
          Tm DEVS
        </h1>

        {/* Thin divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(138,138,128,0.28)",
            margin: "1.75rem auto",
            animation: "heroLineExpand 0.8s ease 0.3s both",
          }}
        />

        {/* Tag below */}
        <p
          className="hero-subtitle"
          style={{
            color: "var(--color-stone-200)",
            animation: "heroFadeUp 0.7s ease 0.18s both",
          }}
        >
          Software / Solutions
        </p>

        {/* Subheadline */}
        <p
          style={{
            color: "var(--color-stone-400)",
            fontSize: "clamp(0.8rem, 2vw, 1rem)",
            letterSpacing: "0.02em",
            maxWidth: "36rem",
            lineHeight: "1.6",
            marginTop: "1.75rem",
            animation: "heroFadeUp 0.7s ease 0.28s both",
          }}
        >
          Construimos aplicaciones web, e-commerce y software empresarial que escalan con tu negocio.
        </p>

        {/* Primary CTA */}
        <a
          href="#proyectos"
          style={{
            display: "inline-block",
            marginTop: "2rem",
            padding: "0.85rem 2.25rem",
            background: "var(--color-accent)",
            color: "var(--color-graphite-950)",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderRadius: "2px",
            minHeight: "44px",
            animation: "heroFadeUp 0.7s ease 0.38s both",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Ver nuestros proyectos
        </a>

        {/* Social proof snippet */}
        <p
          style={{
            color: "var(--color-stone-500)",
            fontSize: "0.58rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginTop: "1.5rem",
            animation: "heroFadeUp 0.7s ease 0.48s both",
          }}
        >
          10+ proyectos entregados &nbsp;·&nbsp; Buenos Aires, Argentina
        </p>
      </div>
    </section>
  );
}
