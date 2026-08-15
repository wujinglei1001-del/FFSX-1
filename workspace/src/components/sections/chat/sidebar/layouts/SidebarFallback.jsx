import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import illustrationDark from 'assets/images/illustrations/9-dark.webp';
import illustration from 'assets/images/illustrations/9.webp';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import Image from 'components/base/Image';

const SidebarFallback = () => {
  const { t: translateUi } = useTranslation();
  const { only } = useBreakpoints();

  const onlySm = only('sm');

  if (onlySm) return;

  return (
    <Stack
      sx={{
        justifyContent: 'center',
        height: 1,
        alignItems: 'center',
        flex: 1,
        gap: 5,
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
        }}
      >
        {translateUi('ui.sections.chat.sidebar.layouts.no_chats_here_yet_a39ab1bd')}
      </Typography>
      <Image
        src={{ dark: illustrationDark, light: illustration }}
        alt=""
        sx={{
          maxWidth: 258,
          width: 1,
        }}
      />
    </Stack>
  );
};

export default SidebarFallback;
