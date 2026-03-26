import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language } from '../lib/translations';
import { t } from '../lib/translations';
import type { SectionKey, StringKey } from '../lib/translations';

interface LanguageContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  /** Shorthand translator — t('tools', 'badge') */
  tr: <S extends SectionKey, K extends StringKey<S>>(section: S, key: K) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'EN',
  setLang: () => {},
  tr: (section, key) => t(section, key, 'EN'),
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('vgu_lang');
    return (saved === 'EN' || saved === 'DE' || saved === 'VN') ? saved as Language : 'EN';
  });

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('vgu_lang', l);
  };

  const tr = <S extends SectionKey, K extends StringKey<S>>(section: S, key: K): string =>
    t(section, key, lang);

  useEffect(() => {
    document.documentElement.lang = lang === 'VN' ? 'vi' : lang === 'DE' ? 'de' : 'en';
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, tr }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
