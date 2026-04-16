export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  cta: string;
  ctaHref: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface FooterSocialLink {
  label: string;
  href: string;
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ContactFormState {
  name: string;
  email: string;
  project: string;
  message: string;
}
