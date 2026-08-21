import { useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as pickerLocales from '@mui/x-date-pickers/locales';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useSettingsContext } from './SettingsProvider';

const adapterLocales = {
  'en-US': 'en',
  'zh-CN': 'zh-cn',
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
