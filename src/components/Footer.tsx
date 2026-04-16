import type { FooterSocialLink } from '../types/index';

const footerLinks: FooterSocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com/tmdevs' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/tmdevs' }, // TODO: confirm handle
  { label: 'GitHub', href: 'https://github.com/tmdevs' }, // TODO: confirm handle
];

export default function Footer() {
  return (
    <footer
      className="py-20 md:py-28 px-6 text-center"
      style={{ borderTop: '1px solid rgba(46,46,43,0.5)' }}
    >
      {/* Main text */}
      <p
        className="font-black uppercase select-none leading-none tracking-widest"
        style={{
          fontSize: 'clamp(1.4rem, 4vw, 3rem)',
          color: 'var(--color-graphite-600)',
          fontFamily: 'var(--font-display)',
        }}
      >
        HABLEMOS DE TU PROYECTO
      </p>

      {/* Social links */}
      <nav className="flex justify-center gap-8 mt-10" aria-label="Redes sociales">
        {footerLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.58rem] tracking-[0.22em] uppercase transition-colors duration-300
                       text-graphite-500 hover:text-stone-200
                       focus-visible:outline-2 focus-visible:outline-offset-4
                       focus-visible:outline-[--color-accent] focus-visible:rounded-sm"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Copyright */}
      <p
        className="mt-10 text-[0.55rem] tracking-[0.18em] uppercase"
        style={{ color: 'var(--color-graphite-500)' }}
      >
        © {new Date().getFullYear()} TMdevs. All rights reserved.
      </p>
    </footer>
  );
}
