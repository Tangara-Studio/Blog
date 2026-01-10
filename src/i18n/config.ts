// i18n configuration
export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'en';

// Language labels for UI
export const languageLabels: Record<Language, string> = {
  en: 'EN',
  es: 'ES',
};

// Supported languages array
export const supportedLanguages = Object.keys(languages) as Language[];

// Check if a language is supported
export function isValidLanguage(lang: string): lang is Language {
  return supportedLanguages.includes(lang as Language);
}
