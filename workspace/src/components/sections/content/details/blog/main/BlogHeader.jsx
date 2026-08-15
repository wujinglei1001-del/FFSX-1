import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Button, Chip, Grid, Link, Stack, Typography } from '@mui/material';
import { users } from 'data/users';
import dayjs from 'dayjs';
import useNumberFormat from 'hooks/useNumberFormat';
import IconifyIcon from 'components/base/IconifyIcon';
import DashboardMenu from 'components/common/DashboardMenu';
import BookmarkButton from 'components/sections/content/common/BookmarkButton';
import ContentComments from '../../common/comments';

const BlogHeader = () => {
  const { t: translateUi } = useTranslation();
  const [isLiked, setIsLiked] = useState(false);
  const { numberFormat } = useNumberFormat();

  const handleReaction = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <Box sx={{ mb: { xs: 3, md: 5 } }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {translateUi(
          'ui.sections.content.details.blog.architecture_through_the_ages_from_ancient_masterpie_d7e24f5c',
        )}
      </Typography>

      <Stack direction="row" sx={{ gap: 2, alignItems: 'center', mb: 3 }}>
        <Chip
          size="small"
          label={translateUi('ui.sections.content.details.blog.science_d2d06637')}
        />

        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          {translateUi('ui.sections.content.details.blog.12_min_read_3efdc80b')}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          {dayjs('2024-12-31').format('DD MMM,YYYY')}
        </Typography>
      </Stack>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 'auto' }}>
          <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
            <Avatar
              src={users[12].avatar}
              alt={translateUi('ui.sections.content.details.blog.avatar_9c3bb49f')}
              sx={{ width: 32, height: 32 }}
            />
            <Typography
              component={Link}
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
              }}
            >
              {translateUi('ui.sections.content.details.blog.tsamina_mina_f6bd64fe')}
            </Typography>
          </Stack>
        </Grid>

        <Grid
          size={{ xs: 12, sm: 'auto' }}
          sx={{
            ml: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
            <Button color="neutral" onClick={handleReaction}>
              <IconifyIcon
                icon={
                  isLiked
                    ? `material-symbols:thumb-up-rounded`
                    : `material-symbols:thumb-up-outline-rounded`
                }
                sx={{ fontSize: 16, mr: 0.5 }}
              />

              {numberFormat(14200, {
                notation: 'compact',
                compactDisplay: 'short',
                maximumFractionDigits: 1,
              })}
            </Button>

            <ContentComments isDrawer />
          </Stack>

          <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
            <Button color="neutral" shape="square">
              <IconifyIcon icon="material-symbols:share-outline" sx={{ fontSize: 16 }} />
            </Button>

            <BookmarkButton />

            <DashboardMenu sx={{ minWidth: 36, minHeight: 36 }} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlogHeader;
