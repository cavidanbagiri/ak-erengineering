// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your JSON files
import azTranslations from './locales/az.json';
import enTranslations from './locales/en.json';
import ruTranslations from './locales/ru.json';
import trTranslations from './locales/tr.json';

// The resources object
const resources = {
  az: {
    translation: azTranslations.az // Access the 'az' key from your JSON
  },
  en: {
    translation: enTranslations.en // Access the 'en' key from your JSON
  },
  ru: {
    translation: ruTranslations.ru // Access the 'ru' key from your JSON
  },
  tr: {
    translation: trTranslations.tr // Access the 'tr' key from your JSON
  }
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Init i18next
  .init({
    resources,
    lng: 'az', // Default language (Azerbaijani)
    fallbackLng: 'az', // Fallback language if translation missing
    debug: false, // Set to true for debugging
    
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'], // Cache the language in localStorage
    }
  });

export default i18n;