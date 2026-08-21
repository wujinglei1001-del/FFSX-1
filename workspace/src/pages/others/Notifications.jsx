import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router';
import useSWR from 'swr';
import { useSnackbar } from 'notistack';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Alert, Breadcrumbs, Button, Link, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab, { tabClasses } from '@mui/material/Tab';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import paths, { apiEndpoints, workbenchEntryPath } from 'routes/paths';
import axiosInstance from 'services/axios/axiosInstance';
import { normalizeNotifications } from 'lib/notifications';
import IconifyIcon from 'components/base/IconifyIcon';
import NotificationTabPanel from 'components/sections/notification/NotificationTabPanel';

const Notifications = () => {
  const { t: translateUi } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [currentTab, setCurrentTab] = useState('all');
  const [markingAllRead, setMarkingAllRead] = useState(false);
  const { data, error, isLoading, mutate } = useSWR(apiEndpoints.notifications);
  const notifications = useMemo(
    () => normalizeNotifications(data, translateUi),
    [data, translateUi],
  );
  const unreadNotifications = useMemo(
    () => notifications.filter((notification) => !notification.readAt),
    [notifications],
  );

  const { up } = useBreakpoints();

  const upSm = up('sm');

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleMarkAllRead = async () => {
    if (!unreadNotifications.length) return;
    setMarkingAllRead(true);

    try {
      await Promise.all(
        unreadNotifications.map((notification) =>
          axiosInstance.put(apiEndpoints.notificationRead(notification.id)),
        ),
      );
      await mutate();
    } catch {
      enqueueSnackbar(translateUi('ffax.notifications.mark_failed'), { variant: 'error' });
    } finally {
      setMarkingAllRead(false);
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 3, md: 5 },
      }}
    >
      <Breadcrumbs
        aria-label={translateUi('ffax.notifications.breadcrumb')}
        sx={{ mb: 2 }}
      >
        <Link component={RouterLink} to={workbenchEntryPath}>
          {translateUi('ffax.navigation.workbench')}
        </Link>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          {translateUi('ffax.navigation.notifications')}
        </Typography>
      </Breadcrumbs>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
        }}
      >
        {translateUi('ffax.navigation.notifications')}
      </Typography>
      <TabContext value={currentTab}>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <TabList
            onChange={handleChange}
            aria-label={translateUi('ffax.notifications.tabs_label')}
          >
            <Tab
              label={upSm ? translateUi('ffax.notifications.all') : undefined}
              value="all"
              icon={
                <IconifyIcon icon="material-symbols:notifications-outline-rounded" fontSize={20} />
              }
              iconPosition="start"
              sx={{
                [`& .${tabClasses.icon}`]: {
                  mr: 0.5,
                },
              }}
            />
            <Tab
              label={upSm ? translateUi('ffax.notifications.unread') : undefined}
              value="unread"
              icon={
                <IconifyIcon icon="material-symbols:mark-email-unread-outline-rounded" fontSize={20} />
              }
              iconPosition="start"
            />
          </TabList>

          <Button
            variant="soft"
            color="neutral"
            startIcon={<IconifyIcon icon="material-symbols:check-rounded" />}
            disabled={!unreadNotifications.length || markingAllRead}
            onClick={handleMarkAllRead}
          >
            {translateUi('ffax.notifications.mark_all_read')}
          </Button>
        </Stack>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {translateUi('ffax.notifications.load_failed')}
          </Alert>
        )}
        {!error && !isLoading && notifications.length === 0 && (
          <Alert severity="info" sx={{ mt: 2 }}>
            {translateUi('ffax.notifications.empty')}
          </Alert>
        )}
        <NotificationTabPanel value="all" notificationsData={notifications} />
        <NotificationTabPanel value="unread" notificationsData={unreadNotifications} />
      </TabContext>
    </Box>
  );
};

export default Notifications;
