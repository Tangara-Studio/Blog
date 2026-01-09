import { defaultLang, type Language, isValidLanguage } from './config';
import en from './translations/en.json';
import es from './translations/es.json';

// Translation dictionaries
const translations = {
  en,
  es,
} as const;

// Get translation for a key
export function useTranslations(lang: Language = defaultLang) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: any = translations[lang];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key} for language: ${lang}`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };
}

// Get language from URL path
export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang && isValidLanguage(lang)) {
    return lang;
  }
  return defaultLang;
}

// Get localized path
export function getLocalizedPath(path: string, lang: Language): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // For default language, don't add prefix
  if (lang === defaultLang) {
    return `/${cleanPath}`;
  }
  
  // For other languages, add language prefix
  return `/${lang}/${cleanPath}`;
}

// Remove language prefix from path
export function removeLanguagePrefix(path: string): string {
  const [, maybeLang, ...rest] = path.split('/');
  if (maybeLang && isValidLanguage(maybeLang)) {
    return '/' + rest.join('/');
  }
  return path;
}

// Format date based on language
export function formatDate(date: Date, lang: Language): string {
  const locales: Record<Language, string> = {
    en: 'en-US',
    es: 'es-ES',
  };
  
  return new Intl.DateTimeFormat(locales[lang], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
