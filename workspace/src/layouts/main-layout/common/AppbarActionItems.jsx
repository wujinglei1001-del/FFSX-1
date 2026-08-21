import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import { Button, Stack } from '@mui/material';
import { useSettingsPanelContext } from 'providers/SettingsPanelProvider';
import { workbenchEntryPath } from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import LanguageMenu from './LanguageMenu';
import NotificationMenu from './NotificationMenu';
import ProfileMenu from './ProfileMenu';
import ThemeToggler from './ThemeToggler';

const AppbarActionItems = ({ type = 'default', sx, searchComponent }) => {
  const { t: translateUi } = useTranslation();
  const { setSettingsPanelConfig } = useSettingsPanelContext();

  return (
    <Stack
      className="action-items"
      direction="row"
      sx={{
        gap: 1,
        alignItems: 'center',
        ml: 'auto',
        ...sx,
      }}
    >
      {searchComponent}
      <LanguageMenu type={type} />
      <Button
        color="neutral"
        size={type === 'slim' ? 'small' : 'medium'}
        variant={type === 'default' ? 'soft' : 'text'}
        shape="circle"
        aria-label={translateUi('ffax.ui.preferences')}
        title={translateUi('ffax.ui.preferences')}
        onClick={() => setSettingsPanelConfig({ openSettingPanel: true })}
      >
        <IconifyIcon
          icon="material-symbols:settings-outline-rounded"
          sx={{ fontSize: type === 'slim' ? 18 : 22 }}
        />
      </Button>
      <ThemeToggler type={type} />
      <NotificationMenu type={type} />
      <Button
        component={RouterLink}
        color="neutral"
        size={type === 'slim' ? 'small' : 'medium'}
        variant={type === 'default' ? 'soft' : 'text'}
        shape="circle"
        to={workbenchEntryPath}
        aria-label={translateUi('ffax.navigation.workbench')}
        title={translateUi('ffax.navigation.workbench')}
      >
        <IconifyIcon
          icon="material-symbols:apps-rounded"
          sx={{ fontSize: type === 'slim' ? 18 : 22 }}
        />
      </Button>
      <ProfileMenu type={type} />
    </Stack>
  );
};

export default AppbarActionItems;
