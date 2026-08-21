import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Stack, Typography } from '@mui/material';
import { externalLinks } from 'config';
import StyledTextField from 'components/styled/StyledTextField';

const NewsLetter = () => {
  const { t: translateUi } = useTranslation();
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!externalLinks.contact.email) return;
    const subject = encodeURIComponent(translateUi('ffax.contact.subscription_inquiry'));
    const body = encodeURIComponent(translateUi('ffax.public.footer.subscription_body', { email }));
    window.location.href = `mailto:${externalLinks.contact.email}?subject=${subject}&body=${body}`;
  };

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
        {translateUi('ffax.public.footer.subscription_title')}
      </Typography>
      <Stack
        component="form"
        onSubmit={handleSubmit}
        direction="row"
        sx={{
          gap: 1,
          width: 1,
        }}
      >
        <StyledTextField
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={translateUi('ffax.public.footer.subscription_email')}
          fullWidth
          sx={{ flexGrow: 1 }}
        />
        <Button
          type="submit"
          variant="soft"
          color="neutral"
          disabled={!externalLinks.contact.email}
          sx={{ minWidth: 110 }}
        >
          {translateUi('ffax.public.footer.subscription_action')}
        </Button>
      </Stack>
    </div>
  );
};
export default NewsLetter;
