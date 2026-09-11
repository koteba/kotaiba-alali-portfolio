'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';
import { useContent } from '@/lib/content-context';
import { nav, misc } from '@/lib/ui-strings';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

const sections = ['about', 'skills', 'experience', 'projects', 'services', 'certifications', 'contact'] as const;

export function Navbar() {
  const { t } = useLocale();
  const { content } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-paper-line/80 bg-paper/80 shadow-[0_1px_0_0_rgba(0,0,0,0.02)] backdrop-blur-lg dark:border-ink-line/80 dark:bg-ink/70'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-base font-semibold tracking-tight">
          {content.hero.name}
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="text-sm text-ink/70 transition-colors hover:text-signal-violet dark:text-paper/70"
            >
              {t(nav[s])}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href="/cv.pdf"
            download
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-bridge-gradient px-4 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.03]"
          >
            <Download className="h-3.5 w-3.5" />
            {t(misc.downloadCv)}
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-paper-line dark:border-ink-line lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-paper-line bg-paper/95 backdrop-blur-lg dark:border-ink-line dark:bg-ink/95 lg:hidden"
        >
          <div className="container-page flex flex-col gap-4 py-5">
            {sections.map((s) => (
              <a
                key={s}
                href={`#${s}`}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-ink/80 dark:text-paper/80"
              >
                {t(nav[s])}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <a
              href="/cv.pdf"
              download
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-bridge-gradient px-4 text-sm font-medium text-white"
            >
              <Download className="h-3.5 w-3.5" />
              {t(misc.downloadCv)}
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
