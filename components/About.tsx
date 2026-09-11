'use client';

import { GraduationCap, Code2, LineChart } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';
import { useContent } from '@/lib/content-context';
import { AnimatedSection } from './AnimatedSection';

export function About() {
  const { t } = useLocale();
  const { content } = useContent();

  return (
    <section id="about" className="py-24 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <AnimatedSection>
          <span className="text-sm font-medium text-signal-violet">{t(content.about.heading)}</span>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {t(content.hero.tagline)}
          </h2>
          <div className="mt-6 flex items-center gap-2 text-sm text-ink/60 dark:text-paper/60">
            <GraduationCap className="h-4 w-4 shrink-0 text-signal-amber" />
            {t(content.about.education)}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="text-balance text-lg leading-relaxed text-ink/75 dark:text-paper/75">
            {t(content.about.paragraph)}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-paper-line p-5 dark:border-ink-line">
              <Code2 className="h-5 w-5 text-signal-violet" />
              <p className="mt-3 text-sm font-medium text-ink/80 dark:text-paper/80">
                {t({ en: 'Engineering', ar: 'الهندسة' })}
              </p>
              <p className="mt-1 text-sm text-ink/55 dark:text-paper/55">
                {t({ en: 'Ships working software', ar: 'يبني برمجيات تعمل فعليًا' })}
              </p>
            </div>
            <div className="rounded-2xl border border-paper-line p-5 dark:border-ink-line">
              <LineChart className="h-5 w-5 text-signal-amber" />
              <p className="mt-3 text-sm font-medium text-ink/80 dark:text-paper/80">
                {t({ en: 'Analysis', ar: 'التحليل' })}
              </p>
              <p className="mt-1 text-sm text-ink/55 dark:text-paper/55">
                {t({ en: 'Makes sure it solves the right problem', ar: 'يضمن حل المشكلة الصحيحة' })}
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
