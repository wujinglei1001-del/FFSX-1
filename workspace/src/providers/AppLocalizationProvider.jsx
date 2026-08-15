import { useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as pickerLocales from '@mui/x-date-pickers/locales';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import 'dayjs/locale/bn';
import 'dayjs/locale/fr';
import 'dayjs/locale/hi';
import 'dayjs/locale/zh-cn';
import { useSettingsContext } from './SettingsProvider';

const adapterLocales = {
  'en-US': 'en',
  'fr-FR': 'fr',
  'bn-BD': 'bn',
  'zh-CN': 'zh-cn',
  'hi-IN': 'hi',
  'ar-SA': 'ar',
};

const AppLocalizationProvider = ({ children }) => {
  const {
    config: { locale },
  } = useSettingsContext();
  const localeKey = locale.replace('-', '');
  const localeText =
    pickerLocales[localeKey]?.components?.MuiLocalizationProvider?.defaultProps?.localeText;

  useEffect(() => {
    dayjs.locale(adapterLocales[locale] || 'en');
  }, [locale]);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={adapterLocales[locale] || 'en'}
      localeText={localeText}
    >
      {children}
    </LocalizationProvider>
  );
};

export default AppLocalizationProvider;
