import { useTranslation } from 'react-i18next';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';

const PlaylistInfo = ({ togglePlaylist, isPlaylistShown }) => {
  const { t: translateUi } = useTranslation();
  const { up } = useBreakpoints();
  const upMd = up('md');

  const handleClick = () => {
    if (upMd) {
      togglePlaylist();
    } else {
      const section = document.querySelector('#video-playlist');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <Box sx={{ p: 1, mb: { xs: 3, md: 5 }, bgcolor: 'background.elevation1', borderRadius: 2 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            lineHeight: 1.3,
          }}
        >
          <Box
            component="strong"
            sx={{
              mr: 1,
            }}
          >
            {translateUi('ui.sections.content.details.video.playing_from_cbbeebe8')}
          </Box>
          {translateUi(
            'ui.sections.content.details.video.modern_architecture_unveiled_innovations_shaping_the_10e7294d',
          )}
        </Typography>

        <Button
          variant="soft"
          color="neutral"
          onClick={handleClick}
          sx={{ whiteSpace: 'nowrap', flexShrink: 0, gap: 0.5 }}
        >
          <IconifyIcon icon="material-symbols:playlist-play-rounded" sx={{ fontSize: 18 }} />
          {upMd && isPlaylistShown ? 'Hide' : 'Show'}
          {translateUi('ui.sections.content.details.video.playlist_c554c6d3')}
        </Button>
      </Stack>
    </Box>
  );
};

export default PlaylistInfo;
