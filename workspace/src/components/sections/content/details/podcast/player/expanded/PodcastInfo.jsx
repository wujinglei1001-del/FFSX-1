import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { podcastPlaylist } from 'data/content/podcast';
import Image from 'components/base/Image';

const episode = podcastPlaylist[0].episodeLists[1];

const PodcastInfo = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row', md: 'column' },
        gap: 3,
      }}
    >
      <Box sx={{ width: 1, aspectRatio: '1/1', overflow: 'hidden', borderRadius: 3 }}>
        <Image
          src={episode.imageSrc}
          alt={translateUi('ui.sections.content.details.podcast.podcast_image_8db13835')}
          sx={{ objectFit: 'cover', width: 1, height: 1, objectPosition: 'bottom' }}
        />
      </Box>
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 'medium', mb: 1, color: 'text.secondary' }}>
          {translateUi('ui.sections.content.details.podcast.episode_8669aa56')}
          {episode.episodeNumber}
        </Typography>
        <Typography variant="h5">{episode.title}</Typography>
      </Box>
    </Box>
  );
};

export default PodcastInfo;
