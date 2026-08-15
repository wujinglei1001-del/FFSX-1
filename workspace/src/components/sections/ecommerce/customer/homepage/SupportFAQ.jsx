import { useTranslation } from 'react-i18next';
import { Box, Button, Stack, Typography } from '@mui/material';
import illustrationDark from 'assets/images/illustrations/20-dark.webp';
import illustration from 'assets/images/illustrations/20.webp';
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';

const SupportFAQ = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Box sx={{ px: { xs: 3, md: 5 }, py: 7 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}
      >
        <Image
          src={{ dark: illustrationDark, light: illustration }}
          alt={translateUi('ui.sections.ecommerce.customer.homepage.supportfaqbot_3f4e88c3')}
          width={336}
          sx={{ objectFit: 'contain' }}
        />
        <Box sx={{ textAlign: { xs: 'center', md: 'start' } }}>
          <Typography
            variant="h4"
            sx={{
              mb: 1,
            }}
          >
            {translateUi('ui.sections.ecommerce.customer.homepage.have_questions_f033a687')}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'text.secondary',
              mb: 5,
              maxWidth: 'sm',
            }}
          >
            {translateUi(
              'ui.sections.ecommerce.customer.homepage.feel_no_hesitation_in_knocking_us_a9274faf',
            )}
          </Typography>
          <Button
            variant="soft"
            color="neutral"
            startIcon={
              <IconifyIcon
                icon="material-symbols-light:chat-outline-rounded"
                sx={{ fontSize: '18px !important', mt: '3px' }}
              />
            }
          >
            {translateUi('ui.sections.ecommerce.customer.homepage.chat_with_our_support_6a7544aa')}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default SupportFAQ;
