import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TabPanel from '@mui/lab/TabPanel';
import { Button, Divider, dividerClasses, listItemClasses } from '@mui/material';
import dayjs from 'dayjs';
import NotificationList from 'components/sections/notification/NotificationList';

const NotificationTabPanel = ({ value, notificationsData }) => {
  const { t: translateUi } = useTranslation();
  const [notifications, setNotifications] = useState({
    today: [],
    older: [],
  });

  useEffect(() => {
    const datewiseNotification = notificationsData.reduce(
      (acc, val) => {
        if (dayjs().diff(dayjs(val.createdAt), 'days') === 0) {
          acc.today.push(val);
        } else {
          acc.older.push(val);
        }

        return acc;
      },
      {
        today: [],
        older: [],
      },
    );

    setNotifications(datewiseNotification);
  }, [notificationsData]);

  return (
    <TabPanel value={value} sx={{ px: 0, pb: 0, mx: -2 }}>
      <NotificationList
        title={translateUi('ui.sections.notification.notificationtabpanel.today_24345a14')}
        notifications={notifications.today}
        sx={{
          pb: 2,
          [`& .${listItemClasses.root}`]: {
            borderRadius: 6,
          },
        }}
      />
      <NotificationList
        title={translateUi('ui.sections.notification.notificationtabpanel.older_63f34dd2')}
        notifications={notifications.older}
        sx={{
          pb: 2,
          [`& .${listItemClasses.root}`]: {
            borderRadius: 6,
          },
        }}
      />
      {notificationsData.length > 10 && (
        <Divider sx={{ [`& .${dividerClasses.wrapper}`]: { p: 0 } }}>
          <Button color="neutral" variant="soft" sx={{ borderRadius: 10 }}>
            {translateUi(
              'ui.sections.notification.notificationtabpanel.load_more_notifications_160c9a66',
            )}
          </Button>
        </Divider>
      )}
    </TabPanel>
  );
};

export default NotificationTabPanel;
