import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEn from 'locales/langs/en.json';
import translationZh from 'locales/langs/zh.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      enUS: { translation: translationEn },
      zhCN: { translation: translationZh },
    },
    lng: 'zhCN',
    ns: ['translation'],
    fallbackLng: 'zhCN',
    detection: {
      order: [],
      caches: [],
    },
    debug: false,
  });

export default i18n;
