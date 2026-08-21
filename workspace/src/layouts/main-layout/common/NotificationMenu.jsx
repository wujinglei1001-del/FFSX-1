import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router';
import {
  Alert,
  Box,
  Button,
  Popover,
  Stack,
  Typography,
  badgeClasses,
  paperClasses,
} from '@mui/material';
import dayjs from 'dayjs';
import { normalizeNotifications } from 'lib/notifications';
import { useSnackbar } from 'notistack';
import { useSettingsContext } from 'providers/SettingsProvider';
import paths, { apiEndpoints } from 'routes/paths';
import axiosInstance from 'services/axios/axiosInstance';
import useSWR from 'swr';
import IconifyIcon from 'components/base/IconifyIcon';
import SimpleBar from 'components/base/SimpleBar';
import NotificationList from 'components/sections/notification/NotificationList';
import OutlinedBadge from 'components/styled/OutlinedBadge';

const NotificationMenu = ({ type = 'default' }) => {
  const { t: translateUi } = useTranslation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);
  const { data, error, isLoading, mutate } = useSWR(apiEndpoints.notifications);
  const notificationRows = useMemo(
    () => normalizeNotifications(data, translateUi),
    [data, translateUi],
  );
  const notifications = useMemo(
    () =>
      notificationRows.reduce(
        (groups, notification) => {
          if (dayjs().diff(dayjs(notification.createdAt), 'days') === 0) {
            groups.today.push(notification);
          } else {
            groups.older.push(notification);
          }
          return groups;
        },
        { today: [], older: [] },
      ),
    [notificationRows],
  );
  const unreadCount = notificationRows.filter((notification) => !notification.readAt).length;

  const {
    config: { textDirection },
  } = useSettingsContext();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = async (notification, event) => {
    event.preventDefault();
    handleClose();

    try {
      if (!notification.readAt) {
        await axiosInstance.put(apiEndpoints.notificationRead(notification.id));
        await mutate();
      }
    } catch {
      enqueueSnackbar(translateUi('ffax.notifications.mark_failed'), { variant: 'error' });
    } finally {
      navigate(notification.href || paths.notifications);
    }
  };

  return (
    <>
      <Button
        color="neutral"
        variant={type === 'default' ? 'soft' : 'text'}
        shape="circle"
        size={type === 'slim' ? 'small' : 'medium'}
        onClick={handleClick}
        aria-label={translateUi('ffax.navigation.notifications')}
        title={translateUi('ffax.navigation.notifications')}
      >
        <OutlinedBadge
          variant="dot"
          color="error"
          invisible={unreadCount === 0}
          sx={{
            [`& .${badgeClasses.badge}`]: {
              height: 10,
              width: 10,
              top: -2,
              right: -2,
              borderRadius: '50%',
            },
          }}
        >
          <IconifyIcon
            icon={
              type === 'slim'
                ? 'material-symbols:notifications-outline-rounded'
                : 'material-symbols-light:notifications-outline-rounded'
            }
            sx={{ fontSize: type === 'slim' ? 18 : 22 }}
          />
        </OutlinedBadge>
      </Button>
      <Popover
        anchorEl={anchorEl}
        id="notification-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{
          horizontal: textDirection === 'rtl' ? 'left' : 'right',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: textDirection === 'rtl' ? 'left' : 'right',
          vertical: 'bottom',
        }}
        sx={{
          [`& .${paperClasses.root}`]: {
            width: 400,
            height: 650,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Box sx={{ pt: 2, flex: 1, overflow: 'hidden' }}>
          <SimpleBar disableHorizontal>
            {error && (
              <Alert severity="error" sx={{ mx: 2, mb: 2 }}>
                {translateUi('ffax.notifications.load_failed')}
              </Alert>
            )}
            {!error && !isLoading && notificationRows.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ px: 3, py: 2 }}>
                {translateUi('ffax.notifications.empty')}
              </Typography>
            )}
            <NotificationList
              title={translateUi('ffax.notifications.today')}
              notifications={notifications.today}
              variant="small"
              onItemClick={handleItemClick}
            />
            <NotificationList
              title={translateUi('ffax.notifications.older')}
              notifications={notifications.older}
              variant="small"
              onItemClick={handleItemClick}
            />
          </SimpleBar>
        </Box>
        <Stack
          direction="row"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            py: 1,
          }}
        >
          <Button
            component={RouterLink}
            underline="none"
            to={paths.notifications}
            variant="text"
            color="primary"
          >
            {translateUi('ffax.notifications.view_all')}
          </Button>
        </Stack>
      </Popover>
    </>
  );
};

export default NotificationMenu;
