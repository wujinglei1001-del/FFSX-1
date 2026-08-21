import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Box,
  Button,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';

const Creator = ({ item }) => {
  const { t: translateUi } = useTranslation();
  const { down } = useBreakpoints();
  const downSm = down('sm');
  const [isFollowing, setIsFollowing] = useState(item.isFollowing);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFollowing((prev) => !prev);
  };

  const uploads = [
    {
      label: translateUi('ui.sections.content.search.creator.blogs_5ef44397'),
      count: item.uploadedCount.blog,
    },
    {
      label: translateUi('ui.sections.content.search.creator.videos_56b71e89'),
      count: item.uploadedCount.videos,
    },
    {
      label: translateUi('ui.sections.content.search.creator.podcasts_fd52b45d'),
      count: item.uploadedCount.podcasts,
    },
  ].filter((u) => u.count);

  return (
    <ListItem
      sx={{
        gap: { xs: 1.5, sm: 2 },
        alignItems: { xs: 'flex-start', sm: 'center' },
        p: 1.5,
        mb: 2,
        borderRadius: 2,
        cursor: 'pointer',

        '&: hover': {
          bgcolor: 'background.elevation1',
        },
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <ListItemAvatar sx={{ minWidth: 48, mt: { xs: 0.75, sm: 0 } }}>
        <Avatar
          src={item.avatar || undefined}
          alt={item.name}
          sx={{ width: 48, height: 48 }}
          slotProps={{ img: { sx: { objectFit: 'contain' } } }}
        >
          {!item.avatar && item.name.slice(0, 1)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={
          <Typography
            variant="subtitle1"
            component={Link}
            href={paths.memberProfile}
            sx={{
              fontWeight: 700,
              color: 'inherit',
              mb: 0.5,
              display: 'inline-block',
            }}
          >
            {item.name}
          </Typography>
        }
        secondary={
          <Stack
            direction="row"
            sx={{ gap: { xs: 1, sm: 2 }, alignItems: 'center', flexWrap: 'wrap' }}
          >
            {uploads.map(({ label, count }) => (
              <Typography
                key={label}
                variant="caption"
                sx={{
                  color: 'text.secondary',
                }}
              >
                <Box component="strong">{count} </Box>
                {label}
              </Typography>
            ))}
          </Stack>
        }
      />
      <Button
        variant={isFollowing ? 'soft' : 'contained'}
        color="neutral"
        onClick={handleClick}
        shape={downSm ? 'square' : undefined}
        sx={{ flexShrink: 0, ml: { xs: 0, sm: 'auto' }, mt: { xs: 1, sm: 0 } }}
      >
        <IconifyIcon
          icon={
            isFollowing
              ? 'material-symbols:person-check-outline-rounded'
              : 'material-symbols:person-add-outline-rounded'
          }
          sx={{ fontSize: 20, display: { xs: 'block', sm: 'none' } }}
        />
        <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
          {isFollowing ? 'Following' : 'Follow'}
        </Box>
      </Button>
    </ListItem>
  );
};

export default Creator;
