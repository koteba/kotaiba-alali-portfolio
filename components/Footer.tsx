'use client';

import { useLocale } from '@/lib/locale-context';
import { useContent } from '@/lib/content-context';
import { footer } from '@/lib/ui-strings';

export function Footer() {
  const { t } = useLocale();
  const { content } = useContent();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-paper-line py-8 dark:border-ink-line">
      <div className="container-page flex flex-col items-center justify-between gap-3 text-sm text-ink/50 dark:text-paper/50 sm:flex-row">
        <p>
          © {year} {content.hero.name}. {t(footer.rights)}
        </p>
        <p>{t(footer.builtWith)}</p>
      </div>
    </footer>
  );
}
