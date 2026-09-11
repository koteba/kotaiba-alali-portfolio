'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';
import { useContent } from '@/lib/content-context';
import { sectionLabels } from '@/lib/ui-strings';
import { AnimatedSection } from './AnimatedSection';

export function Experience() {
  const { t } = useLocale();
  const { content } = useContent();

  return (
    <section id="experience" className="py-24 sm:py-28">
      <div className="container-page">
        <AnimatedSection className="max-w-xl">
          <span className="text-sm font-medium text-signal-violet">{t(sectionLabels.experienceHeading)}</span>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {t(sectionLabels.experienceSub)}
          </h2>
        </AnimatedSection>

        <div className="relative mt-16 space-y-16 ps-8 sm:ps-10">
          {/* Timeline spine — grows in from the top as the section enters view */}
          <motion.div
            aria-hidden
            className="absolute start-[7px] top-2 w-[3px] rounded-full bg-bridge-gradient sm:start-[11px]"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />

          {content.experience.map((entry, index) => (
            <motion.div
              key={entry.id}
              className="relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="absolute -start-8 top-1.5 h-4 w-4 rounded-full border-[3px] border-signal-violet bg-paper shadow-glow-sm dark:bg-ink sm:-start-10" />

              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-xl font-semibold">
                  {t(entry.role)} · <span className="text-signal-violet">{entry.company}</span>
                </h3>
                <span className="text-sm text-ink/50 dark:text-paper/50">{t(entry.period)}</span>
              </div>
              <p className="mt-1 text-sm text-ink/50 dark:text-paper/50">{t(entry.location)}</p>
              <p className="mt-4 max-w-2xl text-ink/75 dark:text-paper/75">{t(entry.summary)}</p>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {entry.achievements.map((achievement) => (
                  <li key={achievement.id} className="flex items-start gap-2.5 text-sm text-ink/70 dark:text-paper/70">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-signal-amber" />
                    {t(achievement.text)}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
