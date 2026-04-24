import { useState } from 'react';
import type { ContactFormState, FormStatus } from '../types/index';

const CONTACT_EMAIL = 'hola@tmdevs.com';
const CONTACT_LOCATION = 'Córdoba · La Pampa, Argentina';
const CONTACT_SERVICES = 'Sitios Web · Web Apps & PWA · Software para Laboratorios';

export default function ContactSection() {
  const [form, setForm] = useState<ContactFormState>({
    name: '',
    email: '',
    project: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // TODO: Replace with real endpoint when backend is ready
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus('success');
      setForm({ name: '', email: '', project: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const isLoading = status === 'loading';

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 pt-28 md:min-h-dvh md:pt-40">
      {/* Left column — Contact info */}
      <div
        className="flex flex-col justify-between px-10 pb-10 border-b md:border-b-0 md:border-r md:pl-12 md:pr-8 md:pb-52 lg:pl-20 lg:pr-10"
        style={{ borderColor: 'rgba(46,46,43,0.6)' }}
      >
        <div>
          <span
            className="block text-[0.58rem] tracking-[0.22em] uppercase mb-5"
            style={{ color: 'var(--color-stone-400)' }}
          >
            Section 04
          </span>

          <h2
            id="contact-heading"
            className="font-black uppercase leading-none"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              color: 'var(--color-stone-100)',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.03em',
            }}
          >
            CONTACTO
          </h2>

          <div
            className="mt-8 mb-10 w-10"
            style={{ height: '1px', background: 'rgba(138,138,128,0.2)' }}
            aria-hidden="true"
          />
        </div>

        {/* Info blocks */}
        <div className="space-y-8">
          <div>
            <p
              className="text-[0.58rem] tracking-[0.22em] uppercase mb-2"
              style={{ color: 'var(--color-stone-400)' }}
            >
              Email
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm transition-opacity duration-300 hover:opacity-60
                         focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[--color-accent] focus-visible:rounded-sm"
              style={{ color: 'var(--color-stone-100)' }}
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div>
            <p
              className="text-[0.58rem] tracking-[0.22em] uppercase mb-2"
              style={{ color: 'var(--color-stone-400)' }}
            >
              Ubicación
            </p>
            <p className="text-sm" style={{ color: 'var(--color-stone-100)' }}>
              {CONTACT_LOCATION}
            </p>
          </div>

          <div>
            <p
              className="text-[0.58rem] tracking-[0.22em] uppercase mb-2"
              style={{ color: 'var(--color-stone-400)' }}
            >
              Trabajamos en
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-stone-100)' }}>
              {CONTACT_SERVICES}
            </p>
          </div>
        </div>
      </div>

      {/* Right column — Contact form */}
      <div className="flex flex-col px-10 pb-48 md:pl-8 md:pr-12 md:pb-52 lg:pl-10 lg:pr-20">
        <span
          className="block text-[0.58rem] tracking-[0.22em] uppercase mb-5 md:mb-10"
          style={{ color: 'var(--color-stone-400)' }}
        >
          Formulario de Contacto
        </span>

        <form
          className="flex flex-col gap-5 md:gap-8"
          noValidate
          onSubmit={handleSubmit}
          aria-label="Formulario de contacto"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="contact-name"
              className="block text-[0.55rem] tracking-[0.22em] uppercase mb-1.5 md:mb-3"
              style={{ color: 'var(--color-stone-400)' }}
            >
              Nombre
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              aria-required="true"
              className="form-input w-full bg-transparent text-sm py-2 md:py-3 outline-none
                         placeholder:text-graphite-500"
              style={{ color: 'var(--color-stone-100)' }}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="contact-email"
              className="block text-[0.55rem] tracking-[0.22em] uppercase mb-1.5 md:mb-3"
              style={{ color: 'var(--color-stone-400)' }}
            >
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              aria-required="true"
              className="form-input w-full bg-transparent text-sm py-2 md:py-3 outline-none
                         placeholder:text-graphite-500"
              style={{ color: 'var(--color-stone-100)' }}
            />
          </div>

          {/* Project type */}
          <div>
            <label
              htmlFor="contact-project"
              className="block text-[0.55rem] tracking-[0.22em] uppercase mb-1.5 md:mb-3"
              style={{ color: 'var(--color-stone-400)' }}
            >
              Tipo de Proyecto
            </label>
            <input
              id="contact-project"
              type="text"
              name="project"
              value={form.project}
              onChange={handleChange}
              placeholder="Sitio web, app de gestión, software de laboratorio..."
              className="form-input w-full bg-transparent text-sm py-2 md:py-3 outline-none
                         placeholder:text-graphite-500"
              style={{ color: 'var(--color-stone-100)' }}
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="contact-message"
              className="block text-[0.55rem] tracking-[0.22em] uppercase mb-1.5 md:mb-3"
              style={{ color: 'var(--color-stone-400)' }}
            >
              Mensaje
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              placeholder="Contanos sobre tu proyecto"
              aria-required="true"
              className="form-input w-full bg-transparent text-sm py-2 md:py-3 outline-none resize-none
                         placeholder:text-graphite-500"
              style={{ color: 'var(--color-stone-100)' }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="mt-2 flex items-center gap-4 text-[0.58rem] tracking-[0.22em] uppercase
                       transition-colors duration-300 group self-start
                       disabled:opacity-50 disabled:cursor-not-allowed
                       focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[--color-accent] focus-visible:rounded-sm"
            style={{ color: 'var(--color-stone-100)' }}
          >
            {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
            <span
              className="inline-block h-px transition-all duration-400 group-hover:opacity-50"
              style={{ width: '2rem', background: 'currentColor' }}
              aria-hidden="true"
            />
          </button>
        </form>

        {/* Live region for form feedback */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="mt-6 text-sm min-h-5"
          style={{
            color: status === 'error' ? '#f87171' : 'var(--color-accent)',
          }}
        >
          {status === 'success' && 'Mensaje enviado. Te contactamos pronto.'}
          {status === 'error' && 'Hubo un error. Por favor intentá de nuevo.'}
        </div>
      </div>
    </div>
  );
}
