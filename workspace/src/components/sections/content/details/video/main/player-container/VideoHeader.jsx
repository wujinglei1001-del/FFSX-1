import { useTranslation } from 'react-i18next';
import { Chip, Stack, Typography } from '@mui/material';

const VideoHeader = () => {
  const { t: translateUi } = useTranslation();
  return (
    <div>
      <Typography variant="h4" sx={{ lineClamp: 2, mb: 1 }}>
        {translateUi(
          'ui.sections.content.details.video.exploring_modern_architecture_innovative_designs_sha_5133e4e9',
        )}
      </Typography>

      <Stack direction="row" sx={{ gap: 1, alignItems: 'center', mb: 3 }}>
        <Chip
          size="small"
          label={translateUi('ui.sections.content.details.video.architecture_b040b417')}
        />
        <Typography variant="caption" sx={{ fontWeight: 'medium', color: 'text.secondary' }}>
          {translateUi('ui.sections.content.details.video.1_aug_2024_23d58b3b')}
        </Typography>
      </Stack>
    </div>
  );
};

export default VideoHeader;
