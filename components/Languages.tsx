'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/lib/locale-context';
import { useContent } from '@/lib/content-context';
import { sectionLabels } from '@/lib/ui-strings';
import { AnimatedSection } from './AnimatedSection';

export function Languages() {
  const { t } = useLocale();
  const { content } = useContent();

  return (
    <section className="py-4 sm:py-6">
      <div className="container-page">
        <AnimatedSection className="max-w-xl">
          <span className="text-sm font-medium text-signal-violet">{t(sectionLabels.languagesHeading)}</span>
        </AnimatedSection>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {content.languages.map((lang, i) => (
            <AnimatedSection key={lang.id} delay={i * 0.08}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{t(lang.name)}</span>
                <span className="text-ink/50 dark:text-paper/50">{t(lang.level)}</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-paper-soft dark:bg-ink-soft">
                <motion.div
                  className="h-full rounded-full bg-bridge-gradient"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.proficiency}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
