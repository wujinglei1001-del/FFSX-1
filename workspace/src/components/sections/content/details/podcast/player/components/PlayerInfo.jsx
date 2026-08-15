import { useTranslation } from 'react-i18next';
import { Box, Stack, Typography } from '@mui/material';
import { podcastPlaylist } from 'data/content/podcast';
import Image from 'components/base/Image';

const episode = podcastPlaylist[0].episodeLists[1];

const PlayerInfo = ({ sx }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack direction="row" sx={{ alignItems: 'center', ...sx }}>
      <Box sx={{ width: 36, height: 36, flexShrink: 0 }}>
        <Image
          src={episode.imageSrc}
          alt={translateUi('ui.sections.content.details.podcast.podcast_cover_8d9df7b7')}
          sx={{ width: 1, height: 1, borderRadius: 2, objectFit: 'cover' }}
        />
      </Box>

      <Box sx={{ flexGrow: 1, px: 1, py: 0.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', lineClamp: 1, mb: 0.5 }}>
          {episode.title}
        </Typography>

        <Typography
          component="p"
          variant="caption"
          sx={{ fontWeight: 'medium', color: 'text.secondary' }}
        >
          {translateUi('ui.sections.content.details.podcast.alexander_quinn_c5b88cba')}
        </Typography>
      </Box>
    </Stack>
  );
};

export default PlayerInfo;
