import i18n from 'locales/i18n';

export const languages = [
  {
    get label() {
      return i18n.t('ui.locales.languages.english_649df08a');
    },
    shortLabel: 'eng',
    icon: 'twemoji:flag-united-kingdom',
    locale: 'en-US',
  },
  {
    get label() {
      return i18n.t('ui.locales.languages.fran_aise_27488481');
    },
    shortLabel: 'fra',
    icon: 'twemoji:flag-france',
    locale: 'fr-FR',
  },
  {
    label: 'বাংলা',
    shortLabel: 'ben',
    icon: 'twemoji:flag-bangladesh',
    locale: 'bn-BD',
  },
  {
    label: '简体中文',
    shortLabel: 'zho',
    icon: 'twemoji:flag-china',
    locale: 'zh-CN',
  },
  {
    label: 'हिन्दी',
    shortLabel: 'hin',
    icon: 'twemoji:flag-india',
    locale: 'hi-IN',
  },
  {
    get label() {
      return i18n.t('ui.locales.languages.arabic_af4f4762');
    },
    shortLabel: 'ara',
    icon: 'twemoji:flag-saudi-arabia',
    locale: 'ar-SA',
  },
];
