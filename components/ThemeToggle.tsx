'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';
import { misc } from '@/lib/ui-strings';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLocale();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch: only read resolvedTheme after mount.
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label={t(misc.darkMode)}
      title={t(misc.darkMode)}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-paper-line text-ink/70 transition-colors hover:border-signal-violet/60 hover:text-signal-violet dark:border-ink-line dark:text-paper/70 dark:hover:text-signal-violet"
    >
      {mounted && (
        <span className="relative flex h-4 w-4 items-center justify-center">
          <Sun
            className={`absolute h-4 w-4 transition-all duration-300 ${
              isDark ? 'scale-0 opacity-0 rotate-90' : 'scale-100 opacity-100 rotate-0'
            }`}
          />
          <Moon
            className={`absolute h-4 w-4 transition-all duration-300 ${
              isDark ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-90'
            }`}
          />
        </span>
      )}
    </button>
  );
}
