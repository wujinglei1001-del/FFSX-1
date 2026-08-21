import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TabPanel from '@mui/lab/TabPanel';
import { listItemClasses } from '@mui/material';
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
        title={translateUi('ffax.notifications.today')}
        notifications={notifications.today}
        sx={{
          pb: 2,
          [`& .${listItemClasses.root}`]: {
            borderRadius: 6,
          },
        }}
      />
      <NotificationList
        title={translateUi('ffax.notifications.older')}
        notifications={notifications.older}
        sx={{
          pb: 2,
          [`& .${listItemClasses.root}`]: {
            borderRadius: 6,
          },
        }}
      />
    </TabPanel>
  );
};

export default NotificationTabPanel;
