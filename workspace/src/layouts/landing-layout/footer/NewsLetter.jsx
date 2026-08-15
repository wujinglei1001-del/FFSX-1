import { useTranslation } from 'react-i18next';
import { Button, Stack, Typography } from '@mui/material';
import StyledTextField from 'components/styled/StyledTextField';

const NewsLetter = () => {
  const { t: translateUi } = useTranslation();
  return (
    <div>
      <Typography
        variant="overline"
        component="p"
        sx={{
          fontWeight: 700,
          mb: 2,
          color: 'text.disabled',
        }}
      >
        {translateUi('ui.layouts.landing_layout.footer.newsletter.newsletter_6ed05e72')}
      </Typography>
      <Stack
        direction="row"
        sx={{
          gap: 1,
          width: 1,
        }}
      >
        <StyledTextField
          placeholder={translateUi('ui.layouts.landing_layout.footer.newsletter.email_84add5b2')}
          fullWidth
          sx={{ flexGrow: 1 }}
        />
        <Button variant="soft" color="neutral" sx={{ minWidth: 110 }}>
          {translateUi('ui.layouts.landing_layout.footer.newsletter.subscribe_d6981f74')}
        </Button>
      </Stack>
    </div>
  );
};
export default NewsLetter;
