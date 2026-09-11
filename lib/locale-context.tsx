'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Bilingual, Locale } from './types';

const STORAGE_KEY = 'portfolio_locale';

interface LocaleContextValue {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  /** Pick the right string out of a Bilingual object for the active locale. */
  t: (value: Bilingual) => string;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored === 'en' || stored === 'ar') {
        setLocaleState(stored);
      } else {
        // Default to the browser's language if it's Arabic, else English.
        const browserLang = navigator.language?.slice(0, 2);
        setLocaleState(browserLang === 'ar' ? 'ar' : 'en');
      }
    } catch {
      setLocaleState('en');
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
  }, []);

  const toggleLocale = useCallback(() => setLocale(locale === 'en' ? 'ar' : 'en'), [locale, setLocale]);

  const t = useCallback((value: Bilingual) => value[locale], [locale]);

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <LocaleContext.Provider value={{ locale, dir, setLocale, toggleLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}
