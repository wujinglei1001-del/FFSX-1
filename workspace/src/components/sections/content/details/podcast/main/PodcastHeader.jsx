import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { podcastPlaylist } from 'data/content/podcast';
import { users } from 'data/users';
import dayjs from 'dayjs';
import useNumberFormat from 'hooks/useNumberFormat';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';
import DashboardMenu from 'components/common/DashboardMenu';
import BookmarkButton from 'components/sections/content/common/BookmarkButton';

const podcast = podcastPlaylist[0];

const PodcastHeader = () => {
  const { t: translateUi } = useTranslation();
  const { numberFormat } = useNumberFormat();
  const [following, setFollowing] = useState(false);

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 3 }}>
      <Box
        component="figure"
        sx={{
          m: 0,
          maxWidth: { xs: 1, sm: 232 },
          width: 1,
          height: 232,
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <Image src={podcast.image} sx={{ objectFit: 'cover', height: 1, width: 1 }} />
      </Box>

      <Stack sx={{ gap: 2, justifyContent: 'space-between' }}>
        <div>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {podcast.title}
          </Typography>

          <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
            <Chip size="small" label={podcast.category} />

            <Typography variant="caption" sx={{ fontWeight: 'medium' }}>
              {podcast.totalEpisodes}
              {translateUi('ui.sections.content.details.podcast.eps_85962fc8')}
            </Typography>

            <Typography variant="caption" sx={{ fontWeight: 'medium' }}>
              {dayjs(podcast.uploaderInfo.uploadedDate).format('D MMM,YYYY')}
            </Typography>
          </Stack>
        </div>

        <div>
          <List disablePadding sx={{ mb: 2, width: 1 }}>
            <ListItem sx={{ alignItems: 'center', gap: 1, p: 0 }}>
              <ListItemAvatar sx={{ minWidth: 48 }}>
                <Avatar
                  src={users[0].avatar}
                  alt={translateUi('ui.sections.content.details.podcast.avatar_9c3bb49f')}
                  sx={{ width: 48, height: 48 }}
                />
              </ListItemAvatar>

              <ListItemText
                disableTypography
                primary={
                  <Link
                    href={paths.memberProfile}
                    variant="subtitle1"
                    sx={{ fontWeight: 'bold', mb: 0.5, width: 'fit-content', color: 'inherit' }}
                  >
                    {users[0].name}
                  </Link>
                }
                secondary={
                  <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                    <Typography
                      variant="caption"
                      component="p"
                      sx={{ fontWeight: 'medium', color: 'text.secondary', whiteSpace: 'nowrap' }}
                    >
                      {numberFormat(20, {
                        notation: 'compact',
                        compactDisplay: 'short',
                      })}{' '}
                      {translateUi('ui.sections.content.details.podcast.stories_67b5fefd')}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="p"
                      sx={{ fontWeight: 'medium', color: 'text.secondary', whiteSpace: 'nowrap' }}
                    >
                      {translateUi('ui.sections.content.details.podcast.100_followers_9daf27de')}
                    </Typography>
                  </Stack>
                }
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  my: 0,
                }}
              />
              <Button variant="contained" color="neutral" onClick={() => setFollowing(!following)}>
                {following ? 'Following' : 'Follow'}
              </Button>
            </ListItem>
          </List>

          <Stack
            direction="row"
            sx={{
              gap: { xs: 1, sm: 2 },
              justifyContent: 'space-between',
              width: { xs: 1, lg: 'unset' },
            }}
          >
            <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
              <Button variant="text" color="neutral">
                <IconifyIcon
                  icon={`material-symbols:thumb-up-outline-rounded`}
                  sx={{ fontSize: 20, mr: 0.5 }}
                />
                {translateUi('ui.sections.content.details.podcast.14_2k_b3e2da1d')}
              </Button>
              <Button variant="text" color="neutral">
                <IconifyIcon
                  icon="material-symbols:mode-comment-outline-rounded"
                  sx={{ fontSize: 18, mr: 0.5 }}
                />{' '}
                34
              </Button>
            </Stack>

            <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
              <Button variant="text" color="neutral" shape="square">
                <IconifyIcon icon="material-symbols:share-outline" sx={{ fontSize: 20 }} />
              </Button>
              <BookmarkButton variant="text" />
              <DashboardMenu size="medium" variant="text" sx={{ fontSize: 20 }} />
            </Stack>
          </Stack>
        </div>
      </Stack>
    </Stack>
  );
};

export default PodcastHeader;
