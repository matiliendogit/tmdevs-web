import { InstagramLogo, WhatsappLogo, EnvelopeSimple } from '@phosphor-icons/react';
import type { SocialLink } from '../types/index';
import type { Icon } from '@phosphor-icons/react';

interface SocialEntry extends SocialLink {
  Icon: Icon;
}

const socials: SocialEntry[] = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/tmdevs',
    Icon: InstagramLogo,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5491100000000', // TODO: replace with real business number
    Icon: WhatsappLogo,
  },
  {
    label: 'Email',
    href: 'mailto:hola@tmdevs.com',
    Icon: EnvelopeSimple,
  },
];

export default function SocialBar() {
  return (
    <div
      className="fixed left-8 md:left-14 bottom-0 z-50 flex flex-col items-center gap-6 pb-0"
      aria-label="Redes sociales"
    >
      {socials.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          aria-label={label}
          className="transition-opacity duration-300 hover:opacity-50
                     focus-visible:outline-2 focus-visible:outline-offset-4
                     focus-visible:outline-[--color-accent] focus-visible:rounded-sm"
          style={{ color: 'var(--color-stone-200)' }}
        >
          <Icon size={20} weight="regular" />
        </a>
      ))}

      {/* Vertical line anchoring icons to the bottom */}
      <div
        className="w-px"
        style={{
          height: '5rem',
          background: 'linear-gradient(to bottom, rgba(200,200,192,0.3), transparent)',
        }}
        aria-hidden="true"
      />
    </div>
  );
}
