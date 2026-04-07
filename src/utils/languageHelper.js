export const getInitialLanguage = () => {
  // Check localStorage first
  const savedLang = localStorage.getItem('i18nextLng');
  if (savedLang && ['az', 'en', 'ru'].includes(savedLang)) {
    return savedLang;
  }
  
  // Check browser language
  const browserLang = navigator.language.split('-')[0];
  if (['az', 'en', 'ru'].includes(browserLang)) {
    return browserLang;
  }
  
  // Default to Azerbaijani
  return 'az';
};

export const languageNames = {
  az: 'Azərbaycan',
  en: 'English',
  ru: 'Русский'
};