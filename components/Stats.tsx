'use client';

import { useContent } from '@/lib/content-context';
import { useLocale } from '@/lib/locale-context';
import { AnimatedSection, StaggerGroup, StaggerItem } from './AnimatedSection';

export function Stats() {
  const { content } = useContent();
  const { t } = useLocale();

  return (
    <section aria-label="Portfolio highlights" className="pb-20 pt-2 sm:pb-24">
      <div className="container-page">
        <StaggerGroup className="grid overflow-hidden rounded-3xl border border-paper-line dark:border-ink-line sm:grid-cols-2 lg:grid-cols-4">
          {content.stats.map((stat) => (
            <StaggerItem key={stat.id}>
              <AnimatedSection className="h-full border-b border-paper-line p-6 last:border-b-0 dark:border-ink-line sm:nth-[odd]:border-e lg:border-b-0 lg:border-e lg:last:border-e-0">
                <p className="font-display text-3xl font-semibold text-signal-violet">{stat.value}</p>
                <p className="mt-2 text-sm text-ink/60 dark:text-paper/60">{t(stat.label)}</p>
              </AnimatedSection>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
