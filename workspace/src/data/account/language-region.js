import i18n from 'locales/i18n';

export const languages = [
  {
    id: 1,
    name: 'English (US)',
    get label() {
      return i18n.t('ui.data.account.language_region.english_us_f20315fe');
    },
  },
  {
    id: 2,
    name: 'English (UK)',
    get label() {
      return i18n.t('ui.data.account.language_region.english_uk_d32cdaad');
    },
  },
  {
    id: 3,
    name: 'English (Australia)',
    get label() {
      return i18n.t('ui.data.account.language_region.english_australia_7fe6b57b');
    },
  },
  {
    id: 4,
    name: 'English (Canada)',
    get label() {
      return i18n.t('ui.data.account.language_region.english_canada_0b126000');
    },
  },
  {
    id: 5,
    name: 'English (Ireland)',
    get label() {
      return i18n.t('ui.data.account.language_region.english_ireland_05b9c382');
    },
  },
  {
    id: 6,
    name: 'English (India)',
    get label() {
      return i18n.t('ui.data.account.language_region.english_india_4b33a840');
    },
  },
  {
    id: 7,
    name: 'বাংলা',
    get label() {
      return i18n.t('ui.data.account.language_region.bengali_198e9c08');
    },
  },
  {
    id: 8,
    name: '日本語',
    get label() {
      return i18n.t('ui.data.account.language_region.japanese_9239c22d');
    },
  },
  {
    id: 9,
    name: 'Française',
    get label() {
      return i18n.t('ui.data.account.language_region.french_44389f6a');
    },
  },
  {
    id: 10,
    name: 'हिन्दी',
    get label() {
      return i18n.t('ui.data.account.language_region.hindi_c9e6b253');
    },
  },
];

export const regions = [
  'United States',
  'United Kingdom',
  'East Europe',
  'West Europe',
  'Africa',
  'Latin America',
  'Middle East',
  'South Asia',
  'Oceania',
];
export const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
export const dateFormats = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY/MM/DD', 'DD-MM-YYYY', 'MMMM D, YYYY'];
export const numberFormats = [
  '12,34,567.89',
  '123,456.78',
  '123.456,78',
  '1,23,45,678.90',
  '123 456,78',
];
export const listSortOrders = [
  'Universal',
  'Alphabetical (A-Z)',
  'Alphabetical (Z-A)',
  'By Date (Newest First)',
  'By Date (Oldest First)',
];
