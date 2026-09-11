'use client';

import { useState } from 'react';
import { Github, Linkedin, Mail, Phone, Send } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';
import { useContent } from '@/lib/content-context';
import { AnimatedSection } from './AnimatedSection';

export function Contact() {
  const { t } = useLocale();
  const { content } = useContent();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend is wired up yet — this is a static export. In production,
    // point this at an email API route, form service (e.g. Formspree), or
    // a serverless function once the site is deployed with a backend.
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <AnimatedSection>
          <span className="text-sm font-medium text-signal-violet">{t(content.contact.heading)}</span>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {t(content.contact.subheading)}
          </h2>

          <div className="mt-8 space-y-4">
            <ContactRow icon={<Mail className="h-4 w-4" />} href={`mailto:${content.social.email}`} label={content.social.email} />
            <ContactRow icon={<Phone className="h-4 w-4" />} href={`https://wa.me/${content.social.phone.replace(/\D/g, '')}`} label={content.social.phone} />
            <ContactRow icon={<Linkedin className="h-4 w-4" />} href={content.social.linkedin} label="LinkedIn" />
            <ContactRow icon={<Github className="h-4 w-4" />} href={content.social.github} label="GitHub" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          {submitted ? (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-3xl border border-signal-violet/30 bg-bridge-gradient-soft p-10 text-center">
              <p className="font-display text-lg font-semibold">{t(content.contact.formSuccessMessage)}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-paper-line p-7 dark:border-ink-line">
              <input
                required
                type="text"
                placeholder={t(content.contact.formNamePlaceholder)}
                className="w-full rounded-xl border border-paper-line bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-signal-violet dark:border-ink-line"
              />
              <input
                required
                type="email"
                placeholder={t(content.contact.formEmailPlaceholder)}
                className="w-full rounded-xl border border-paper-line bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-signal-violet dark:border-ink-line"
              />
              <textarea
                required
                rows={5}
                placeholder={t(content.contact.formMessagePlaceholder)}
                className="w-full resize-none rounded-xl border border-paper-line bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-signal-violet dark:border-ink-line"
              />
              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-bridge-gradient text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] sm:w-auto sm:px-8"
              >
                <Send className="h-4 w-4" />
                {t(content.contact.formSubmitLabel)}
              </button>
            </form>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}

function ContactRow({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="flex items-center gap-3 text-ink/75 transition-colors hover:text-signal-violet dark:text-paper/75"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-paper-line dark:border-ink-line">
        {icon}
      </span>
      <span dir="ltr" className="text-sm">{label}</span>
    </a>
  );
}
