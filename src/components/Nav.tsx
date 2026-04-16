import { useState, useEffect } from "react";
import { List, X } from "@phosphor-icons/react";
import logoFull from "../assets/TM-devs-logo-full.png";
import type { NavLink } from "../types/index";

const navLinks: NavLink[] = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Cursor tracker
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <>
      {/* ── Top bar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-7 md:px-14 md:py-8">
        {/* Logo */}
        <a
          href="/"
          aria-label="TMdevs — Inicio"
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[--color-accent] focus-visible:rounded-sm"
        >
          <img
            src={logoFull.src}
            alt="TMdevs"
            className="h-9 md:h-11 w-auto"
            style={{ display: "block" }}
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-[0.68rem] tracking-[0.25em] uppercase transition-opacity duration-300 hover:opacity-50
                         focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[--color-accent] focus-visible:rounded-sm"
              style={{ color: "var(--color-stone-200)" }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex md:hidden items-center justify-center w-9 h-9 transition-opacity duration-300
                     focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[--color-accent] focus-visible:rounded-sm"
          style={{ color: "var(--color-stone-200)" }}
        >
          {open ? (
            <X size={20} weight="light" />
          ) : (
            <List size={20} weight="light" />
          )}
        </button>
      </nav>

      {/* ── Mobile overlay menu ── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 md:hidden
                   mobile-menu-overlay ${open ? "open" : ""}`}
        style={{ background: "var(--color-graphite-900)" }}
        aria-hidden={!open}
      >
        {navLinks.map(({ label, href }) => (
          <button
            key={href}
            onClick={() => handleNavClick(href)}
            className="font-black uppercase transition-colors duration-300 hover:opacity-60
                       focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[--color-accent] focus-visible:rounded"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 8vw, 3rem)",
              letterSpacing: "0.1em",
              color: "var(--color-stone-100)",
              background: "none",
              border: "none",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
}
