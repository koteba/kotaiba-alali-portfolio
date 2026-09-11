'use client';

import { useLocale } from '@/lib/locale-context';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { locale, toggleLocale } = useLocale();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label="Switch language"
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-paper-line px-3 text-sm font-medium text-ink/70 transition-colors hover:border-signal-violet/60 hover:text-signal-violet dark:border-ink-line dark:text-paper/70 dark:hover:text-signal-violet"
    >
      <Languages className="h-3.5 w-3.5" />
      {locale === 'en' ? 'العربية' : 'English'}
    </button>
  );
}
