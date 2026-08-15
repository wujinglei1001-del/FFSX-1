import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ListItemText, MenuItem, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import { currencies } from 'locales/currencies';
import { useSettingsContext } from 'providers/SettingsProvider';
import { SET_CURRENCY } from 'reducers/SettingsReducer';

const CurrencyMenu = ({ type = 'default' }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    config: { currency },
    configDispatch,
  } = useSettingsContext();
  const selectedCurrency = useMemo(
    () => currencies.find((item) => item.code === currency) || currencies[0],
    [currency],
  );

  const handleCurrencyChange = (code) => {
    configDispatch({ type: SET_CURRENCY, payload: code });
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color="neutral"
        size={type === 'slim' ? 'small' : 'medium'}
        variant="text"
        shape="circle"
        aria-label={t('settings.currency')}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{ minWidth: type === 'slim' ? 32 : 40, px: 1 }}
      >
        {selectedCurrency.code}
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="currency-menu"
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {currencies.map((item) => (
          <MenuItem
            key={item.code}
            selected={currency === item.code}
            onClick={() => handleCurrencyChange(item.code)}
            sx={{ minWidth: 200 }}
          >
            <ListItemText primary={t(item.labelKey)} />
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              {item.code} {item.symbol}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CurrencyMenu;
