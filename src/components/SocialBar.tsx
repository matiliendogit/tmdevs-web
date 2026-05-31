import { motion } from 'motion/react';
import { InstagramLogo, WhatsappLogo, EnvelopeSimple } from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';

interface SocialEntry {
  label: string;
  href: string;
  Icon: Icon;
  cta: string;
  color: string;
}

const socials: SocialEntry[] = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/tmdevs_/',
    Icon: InstagramLogo,
    cta: 'Seguinos',
    color: '#E4405F',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5493512341032',
    Icon: WhatsappLogo,
    cta: 'Escribinos',
    color: '#25d366',
  },
  {
    label: 'Gmail',
    href: 'mailto:tmdevsdigitallab@gmail.com',
    Icon: EnvelopeSimple,
    cta: 'Mandanos un mail',
    color: '#FBBC05',
  },
];

const iconVariants = {
  rest: {
    color: 'rgba(224, 224, 216, 1)',
    filter: 'drop-shadow(0 0 0px transparent)',
  },
  hover: (color: string) => ({
    color,
    filter: `drop-shadow(0 0 7px ${color})`,
  }),
};

const labelVariants = {
  rest: { opacity: 0, x: -6, pointerEvents: 'none' as const },
  hover: { opacity: 1, x: 0, pointerEvents: 'auto' as const },
};

const labelTransition = { duration: 0.22, ease: 'easeOut' };

export default function SocialBar() {
  return (
    <div
      className="fixed left-4 md:left-5 bottom-0 z-50 flex flex-col items-center gap-6 pb-0"
      aria-label="Redes sociales"
      style={{ animation: 'heroFadeUp 0.7s ease 0.9s both' }}
    >
      {socials.map(({ label, href, Icon, cta, color }) => (
        <motion.a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          aria-label={label}
          className="relative flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[--color-accent] focus-visible:rounded-sm"
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          {/* Icon with glow */}
          <motion.span
            className="flex items-center justify-center"
            variants={iconVariants}
            custom={color}
            transition={{ duration: 0.22 }}
          >
            <Icon size={20} weight="regular" />
          </motion.span>

          {/* CTA label */}
          <motion.span
            className="absolute left-full ml-3 px-3 py-1.5 rounded text-[0.65rem] font-semibold tracking-wide text-white whitespace-nowrap select-none"
            style={{ backgroundColor: color }}
            variants={labelVariants}
            transition={labelTransition}
            aria-hidden="true"
          >
            {cta}
          </motion.span>
        </motion.a>
      ))}

      {/* Vertical line anchoring icons to the bottom */}
      <div
        className="w-px h-20 bg-linear-to-b from-[rgba(200,200,192,0.3)] to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
