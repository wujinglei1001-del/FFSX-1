import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import Menu from '@mui/material/Menu';
import { languages } from 'locales/languages';
import { useSettingsContext } from 'providers/SettingsProvider';
import { SET_LOCALE } from 'reducers/SettingsReducer';
import IconifyIcon from 'components/base/IconifyIcon';

const LanguageMenu = ({ type = 'default' }) => {
  const { t: translateUi } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    config: { locale },
    configDispatch,
  } = useSettingsContext();
  const open = Boolean(anchorEl);

  const selectedLanguage = useMemo(() => {
    return languages.find((lang) => lang.locale === locale) || languages[0];
  }, [locale]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (language) => {
    configDispatch({
      type: SET_LOCALE,
      payload: language.locale,
    });
  };

  return (
    <>
      <Button
        color="neutral"
        size={type === 'slim' ? 'small' : 'medium'}
        variant="text"
        shape="circle"
        onClick={handleClick}
        aria-label={translateUi('ffax.navigation.language')}
        title={translateUi('ffax.navigation.language')}
      >
        {locale === 'zh-CN' ? (
          'CN'
        ) : (
          <IconifyIcon icon={selectedLanguage.icon} sx={{ fontSize: type === 'slim' ? 20 : 24 }} />
        )}
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="language-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.shortLabel}
            onClick={() => {
              handleItemClick(language);
            }}
            selected={locale === language.locale}
            sx={{ minWidth: 200 }}
          >
            <ListItemIcon>
              {language.locale === 'zh-CN' ? (
                'CN'
              ) : (
                <IconifyIcon icon={language.icon} sx={{ fontSize: 24 }} />
              )}
            </ListItemIcon>
            <ListItemText
              primary={language.label}
              slotProps={{
                primary: { sx: { fontSize: 14 } },
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageMenu;
