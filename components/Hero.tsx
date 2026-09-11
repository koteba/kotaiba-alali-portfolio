'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';
import { useContent } from '@/lib/content-context';

/** Reveals a string one character at a time. Restarts when the text itself changes (e.g. locale switch). */
function useTypedText(text: string, speedMs = 42) {
  const [output, setOutput] = useState('');

  useEffect(() => {
    setOutput('');
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speedMs);
    return () => clearInterval(interval);
  }, [text, speedMs]);

  return output;
}

export function Hero() {
  const { t } = useLocale();
  const { content } = useContent();
  const typedTitle = useTypedText(t(content.hero.title));

  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-40 sm:pt-48">
      {/* Animated gradient mesh background — a single deliberate ambient moment, not decoration everywhere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-paper dark:bg-ink" />
        <div className="absolute inset-0 bg-bridge-gradient-radial opacity-90 dark:opacity-100" />
        <motion.div
          className="absolute -top-24 left-1/2 h-[34rem] w-[34rem] -translate-x-[75%] rounded-full bg-signal-indigo/25 blur-[120px] animate-float-slow"
        />
        <motion.div
          className="absolute top-1/4 right-0 h-[28rem] w-[28rem] translate-x-1/3 rounded-full bg-signal-rose/20 blur-[120px] animate-float-slower"
        />
        <motion.div
          className="absolute bottom-0 left-1/4 h-[22rem] w-[22rem] rounded-full bg-signal-amber/15 blur-[120px] animate-float-slow"
        />
        <div className="absolute inset-0 bg-bridge-gradient-soft opacity-50" />
      </div>

      <div className="container-page">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-sm text-ink/60 dark:text-paper/60"
        >
          <MapPin className="h-3.5 w-3.5" />
          {t(content.hero.location)}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          {content.hero.name}
        </motion.h1>

        <div className="mt-4 h-[2.5rem] sm:h-[2rem]">
          <p className="text-xl font-medium text-signal-violet sm:text-2xl md:text-[1.7rem]">
            {typedTitle}
            <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] animate-pulse bg-signal-rose align-middle" />
          </p>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-3 font-display text-xl font-semibold text-gradient sm:text-2xl"
        >
          {t(content.hero.tagline)}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-6 max-w-xl text-balance text-base leading-relaxed text-ink/70 dark:text-paper/70 sm:text-lg"
        >
          {t(content.hero.valueProposition)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-bridge-gradient px-6 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
          >
            {t(content.hero.ctaPrimary)}
          </a>
          <a
            href="/cv.pdf"
            download
            className="inline-flex h-11 items-center gap-2 rounded-full border border-paper-line px-6 text-sm font-semibold text-ink transition-colors hover:border-signal-violet/60 hover:text-signal-violet dark:border-ink-line dark:text-paper"
          >
            <Download className="h-4 w-4" />
            {t(content.hero.ctaSecondary)}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex items-center gap-4"
        >
          <SocialIcon href={`mailto:${content.social.email}`} label="Email">
            <Mail className="h-4 w-4" />
          </SocialIcon>
          <SocialIcon href={`https://wa.me/${content.social.phone.replace(/\D/g, '')}`} label="WhatsApp">
            <Phone className="h-4 w-4" />
          </SocialIcon>
          <SocialIcon href={content.social.github} label="GitHub">
            <Github className="h-4 w-4" />
          </SocialIcon>
          <SocialIcon href={content.social.linkedin} label="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </SocialIcon>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1, duration: 0.6 }, y: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }}
        className="mx-auto mt-16 hidden h-9 w-9 items-center justify-center rounded-full border border-paper-line text-ink/50 dark:border-ink-line dark:text-paper/50 sm:flex"
      >
        <ArrowDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-paper-line text-ink/70 transition-colors hover:border-signal-violet/60 hover:text-signal-violet dark:border-ink-line dark:text-paper/70"
    >
      {children}
    </a>
  );
}
