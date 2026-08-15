import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import i18n from 'locales/i18n';
import IconifyIcon from 'components/base/IconifyIcon';

const privacyOptions = [
  {
    value: 'public',
    get label() {
      return i18n.t('ui.sections.social.tab_panels.posts_panel.public_dc5eb704');
    },
    icon: <IconifyIcon icon="material-symbols:globe" fontSize={20} />,
  },
  {
    value: 'friends',
    get label() {
      return i18n.t('ui.sections.social.tab_panels.posts_panel.friends_c11d5e1d');
    },
    icon: <IconifyIcon icon="material-symbols:group-outline-rounded" fontSize={20} />,
  },
  {
    value: 'private',
    get label() {
      return i18n.t('ui.sections.social.tab_panels.posts_panel.private_237dfa0a');
    },
    icon: <IconifyIcon icon="material-symbols:lock-outline" fontSize={20} />,
  },
];

const SharePrivacy = () => {
  const { t: translateUi } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPrivacy, setSelectedPrivacy] = useState(privacyOptions[0]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option) => {
    setSelectedPrivacy(option);
    handleClose();
  };

  return (
    <Stack
      direction="row"
      sx={{
        gap: 1,
        alignItems: 'center',
        mb: 3,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          color: 'text.secondary',
        }}
      >
        {translateUi('ui.sections.social.tab_panels.posts_panel.set_privacy_ac0502e2')}
      </Typography>
      <Button
        onClick={handleClick}
        variant="soft"
        color="neutral"
        startIcon={selectedPrivacy.icon}
        endIcon={<IconifyIcon icon="material-symbols:keyboard-arrow-down-rounded" fontSize={20} />}
        aria-controls="privacy-menu"
        aria-haspopup="true"
      >
        {selectedPrivacy.label}
      </Button>
      <Menu
        id="privacy-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          list: {
            dense: true,
          },
        }}
      >
        {privacyOptions.map((option) => (
          <MenuItem
            dense
            key={option.value}
            onClick={() => handleSelect(option)}
            selected={option.value === selectedPrivacy.value}
            sx={{
              minWidth: 150,
              '&.Mui-selected': {
                backgroundColor: 'action.selected',
              },
            }}
          >
            <Stack direction="row" sx={{ alignItems: 'center' }}>
              {option.icon}
              <Typography sx={{ ml: 1 }}>{option.label}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  );
};

export default SharePrivacy;
