import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import illustrationDark from 'assets/images/illustrations/12-dark.webp';
import illustration from 'assets/images/illustrations/12.webp';
import Image from 'components/base/Image';

const NoFilesFound = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack sx={{ height: 1, justifyContent: 'center' }}>
      <Stack
        sx={{
          gap: 5,
          justifyContent: 'center',
          alignItems: 'center',
          py: 10,
        }}
      >
        <Stack sx={{ maxWidth: 380, justifyContent: 'center', alignItems: 'center', mb: 3 }}>
          <Image
            src={{ light: illustration, dark: illustrationDark }}
            sx={{ width: 1, height: 1, objectFit: 'contain' }}
          />
        </Stack>

        <Stack
          sx={{
            gap: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            {translateUi(
              'ui.sections.file_manager.main.all_files.your_file_space_is_currently_empty_cb9a1a41',
            )}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: 'text.secondary', letterSpacing: 0, maxWidth: 395, textAlign: 'center' }}
          >
            {translateUi(
              'ui.sections.file_manager.main.all_files.start_by_clicking_the_upload_button_to_begin_adding__17986857',
            )}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default NoFilesFound;
