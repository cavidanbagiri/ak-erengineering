import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n, t } = useTranslation();
  
  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('i18nextLng', langCode);
  };
  
  const currentLanguage = i18n.language;
  
  return {
    currentLanguage,
    changeLanguage,
    t,
    languages: [
      { code: 'az', name: 'Azərbaycan', flag: '🇦🇿' },
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'ru', name: 'Русский', flag: '🇷🇺' },
      { code: 'tr', name: 'Turkce', flag: 'TR' },
    ]
  };
};