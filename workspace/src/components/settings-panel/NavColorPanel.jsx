import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useSettingsContext } from 'providers/SettingsProvider';
import { SET_NAV_COLOR } from 'reducers/SettingsReducer';
import IconifyIcon from 'components/base/IconifyIcon';

const Item = ({ label, sx, active, onClick }) => {
  return (
    <Button
      sx={{
        p: 1,
        pt: 1.5,
        gap: 1,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        bgcolor: active ? 'primary.lighter' : 'background.elevation1',
        position: 'relative',
      }}
      onClick={onClick}
    >
      {active && (
        <IconifyIcon
          icon="material-symbols:check-circle-rounded"
          sx={{
            color: 'primary.main',
            fontSize: 20,
            position: 'absolute',
            top: 4,
            left: 4,
          }}
        />
      )}
      <Box
        sx={{
          height: 24,
          width: 24,
          borderRadius: '50%',
          position: 'relative',
          ...sx,
        }}
      ></Box>
      <Typography
        variant="body2"
        sx={{
          fontWeight: active ? 500 : 400,
          color: active ? 'primary.main' : 'text.secondary',
        }}
      >
        {label}
      </Typography>
    </Button>
  );
};

const NavColorPanel = () => {
  const { t: translateUi } = useTranslation();
  const {
    config: { navColor },
    configDispatch,
  } = useSettingsContext();
  const [, setSearchParams] = useSearchParams();

  const handleClick = (value) => {
    setSearchParams({}, { replace: true });

    configDispatch({
      type: SET_NAV_COLOR,
      payload: value,
    });
  };

  return (
    <Stack direction="row" sx={{ gap: 1 }}>
      <Item
        label={translateUi('ui.components.settings_panel.navcolorpanel.default_808d7dca')}
        sx={{
          bgcolor: 'background.default',
          border: 2,
          borderColor: 'divider',
        }}
        active={navColor === 'default'}
        onClick={() => handleClick('default')}
      />
      <Item
        label={translateUi('ui.components.settings_panel.navcolorpanel.vibrant_0ebbd495')}
        sx={{
          background: 'linear-gradient(163.93deg, #7DB1F5 3.83%, #62C29F 132.96%)',
        }}
        active={navColor === 'vibrant'}
        onClick={() => handleClick('vibrant')}
      />
    </Stack>
  );
};

export default NavColorPanel;
