import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import illustrationDark from 'assets/images/illustrations/8-dark.webp';
import illustration from 'assets/images/illustrations/8.webp';
import Image from 'components/base/Image';

const Chat = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      sx={{
        p: { xs: 3, md: 5 },
        flex: 1,
        gap: 3,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        src={{
          dark: illustrationDark,
          light: illustration,
        }}
        alt=""
        sx={{ maxWidth: 300, width: 1, display: 'block' }}
      />
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
          textAlign: 'center',
        }}
      >
        {translateUi('ui.pages.apps.chat.select_a_conversation_to_30a184fd')}
        <br />
        {translateUi('ui.pages.apps.chat.view_its_messages_af4d8aac')}
      </Typography>
    </Stack>
  );
};

export default Chat;
