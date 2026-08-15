import { currencyFormat, getCurrencySymbol, numberFormat } from 'lib/utils';
import { useSettingsContext } from 'providers/SettingsProvider';

const useNumberFormat = () => {
  const {
    config: { locale, currency },
  } = useSettingsContext();

  return {
    currencyFormat: (amount, options) =>
      currencyFormat(amount, locale, {
        currency,
        ...options,
      }),
    numberFormat: (number, options) => numberFormat(number, locale, options),
    currencySymbol: getCurrencySymbol(currency, locale),
  };
};

export default useNumberFormat;
