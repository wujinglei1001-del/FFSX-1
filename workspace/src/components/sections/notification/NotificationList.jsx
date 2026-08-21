import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  Stack,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import paths from 'routes/paths';
import Image from 'components/base/Image';
import NotificationListItemAvatar from './NotificationListItemAvatar';

dayjs.extend(relativeTime);

const NotificationList = ({ title, notifications, sx, variant = 'default', onItemClick }) => {
  if (notifications.length > 0) {
    return (
      <List
        subheader={
          <ListSubheader
            component={Typography}
            variant="body2"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              lineHeight: 1.45,
              mb: 0.5,
              position: 'static',
              bgcolor: 'transparent',
            }}
          >
            {title}
          </ListSubheader>
        }
        sx={sx}
      >
        {notifications.map((notification) => (
          <ListItem key={notification.id} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={notification.href || paths.notifications}
              disableRipple
              onClick={(event) => onItemClick?.(notification, event)}
              sx={[
                {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  borderRadius: 0,
                  p: 2,
                  gap: 1,
                  '&:hover': {
                    bgcolor: 'background.menuElevation1',
                  },
                },
                variant === 'default' && {
                  borderRadius: 6,
                  '&:hover': {
                    bgcolor: 'background.elevation1',
                  },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
              ]}
            >
              <Stack
                direction="row"
                sx={{
                  alignItems: 'flex-start',
                  gap: 1,
                  width: 1,
                }}
              >
                <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                  <Box sx={{ width: 8, height: 1 }}>
                    {!notification.readAt && (
                      <Box
                        component="span"
                        sx={{
                          display: 'block',
                          height: 8,
                          width: 8,
                          bgcolor: 'error.main',
                          outline: 2,
                          outlineColor: 'background.paper',
                          borderRadius: '50%',
                        }}
                      />
                    )}
                  </Box>
                  <NotificationListItemAvatar notification={notification} variant={variant} />
                </Stack>
                <Box
                  sx={{
                    flex: 1,
                    ml: 1,
                    mt: 0.5,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineClamp: 2,
                    }}
                  >
                    {notification.detail}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                    }}
                  >
                    {dayjs(notification.createdAt).fromNow()}
                  </Typography>
                </Box>
              </Stack>
              {notification.images && (
                <Stack
                  direction="row"
                  sx={[
                    {
                      gap: 1,
                      ml: 12,
                    },
                    variant === 'small' && {
                      ml: 10,
                    },
                  ]}
                >
                  {notification.images.slice(0, 3).map((image) => (
                    <Image
                      src={image}
                      key={image}
                      height={80}
                      width={80}
                      sx={{ borderRadius: 2 }}
                    />
                  ))}
                </Stack>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  }
};

export default NotificationList;
