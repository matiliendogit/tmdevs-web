import type { FooterSocialLink } from '../types/index';

const footerLinks: FooterSocialLink[] = [
  { label: 'Email', href: 'mailto:hola@tmdevs.com' },
];

export default function Footer() {
  return (
    <footer
      className="py-20 md:py-28 px-6 text-center border-t border-graphite-600/50"
    >
      {/* Main text */}
      <p className="font-black uppercase select-none leading-none tracking-widest text-graphite-600 font-display text-[clamp(1.4rem,4vw,3rem)]">
        HABLEMOS DE TU PROYECTO
      </p>

      {/* Footer CTA button */}
      <div className="mt-8">
        <a
          href="#contacto"
          className="inline-flex items-center justify-center px-9 py-[0.85rem] border border-accent text-accent text-[0.65rem] font-bold tracking-[0.2em] uppercase no-underline rounded-xs min-h-11 transition-opacity duration-200 hover:opacity-80"
        >
          Contactanos
        </a>
      </div>

      {/* Social links */}
      <nav className="flex justify-center gap-8 mt-10" aria-label="Redes sociales">
        {footerLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-graphite-500 text-[0.58rem] tracking-[0.22em] uppercase transition-colors duration-300
                       hover:text-stone-200
                       focus-visible:outline-2 focus-visible:outline-offset-4
                       focus-visible:outline-[--color-accent] focus-visible:rounded-sm"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Copyright */}
      <p className="mt-10 text-graphite-500 text-[0.55rem] tracking-[0.18em] uppercase">
        © {new Date().getFullYear()} TMdevs. All rights reserved.
      </p>
    </footer>
  );
}
