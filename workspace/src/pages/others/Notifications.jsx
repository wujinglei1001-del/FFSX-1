import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Breadcrumbs, Button, Link, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab, { tabClasses } from '@mui/material/Tab';
import { notifications } from 'data/notifications';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import NotificationTabPanel from 'components/sections/notification/NotificationTabPanel';

const Notifications = () => {
  const { t: translateUi } = useTranslation();
  const [currentTab, setCurrentTab] = useState('all');

  const { up } = useBreakpoints();

  const upSm = up('sm');

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box
      sx={{
        p: { xs: 3, md: 5 },
      }}
    >
      <Breadcrumbs
        aria-label={translateUi('ui.pages.others.notifications.breadcrumb_6e5ce570')}
        sx={{ mb: 2 }}
      >
        <Link href="#!">{translateUi('ui.pages.others.notifications.pages_600584c2')}</Link>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          {translateUi('ui.pages.others.notifications.notifications_753a22b2')}
        </Typography>
      </Breadcrumbs>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
        }}
      >
        {translateUi('ui.pages.others.notifications.notifications_753a22b2')}
      </Typography>
      <TabContext value={currentTab}>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <TabList
            onChange={handleChange}
            aria-label={translateUi('ui.pages.others.notifications.lab_api_tabs_example_85ee26b7')}
          >
            <Tab
              label={upSm ? 'All notifications' : undefined}
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
              label={upSm ? 'Friend requests' : undefined}
              value="friend_requests"
              icon={
                <IconifyIcon icon="material-symbols:person-add-outline-rounded" fontSize={20} />
              }
              iconPosition="start"
            />
          </TabList>

          <Button
            variant="soft"
            color="neutral"
            startIcon={<IconifyIcon icon="material-symbols:check-rounded" />}
          >
            {translateUi('ui.pages.others.notifications.mark_all_as_read_1b83163b')}
          </Button>
        </Stack>
        <NotificationTabPanel value="all" notificationsData={notifications} />
        <NotificationTabPanel
          value="friend_requests"
          notificationsData={notifications.filter(
            (notification) => notification.type === 'friend_request',
          )}
        />
      </TabContext>
    </Box>
  );
};

export default Notifications;
