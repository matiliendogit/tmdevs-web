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
    href: 'https://wa.me/5493512341032',
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
      className="fixed left-4 md:left-5 bottom-0 z-50 flex flex-col items-center gap-6 pb-0"
      aria-label="Redes sociales"
      style={{ animation: "heroFadeUp 0.7s ease 0.9s both" }}
    >
      {socials.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          aria-label={label}
          className="text-stone-200 transition-opacity duration-300 hover:opacity-50
                     focus-visible:outline-2 focus-visible:outline-offset-4
                     focus-visible:outline-[--color-accent] focus-visible:rounded-sm"
        >
          <Icon size={20} weight="regular" />
        </a>
      ))}

      {/* Vertical line anchoring icons to the bottom */}
      <div
        className="w-px h-20 bg-linear-to-b from-[rgba(200,200,192,0.3)] to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
