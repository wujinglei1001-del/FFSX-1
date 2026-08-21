import { useTranslation } from 'react-i18next';
import { Box, Button, Container, Link, Stack, Typography } from '@mui/material';
import { externalLinks } from 'config';
import StyledTextField from 'components/styled/StyledTextField';
import RevealItems from '../common/RevealItems';
import RevealText from '../common/RevealText';
import { StripedBackground } from '../common/StripedBackground';

const Newsletter = () => {
  const { t: translateUi } = useTranslation();
  return (
    <StripedBackground
      fadeWidth="0"
      sx={{
        px: { xs: 4, sm: 10 },
        py: { xs: 5, sm: 11 },
        bgcolor: 'background.elevation1',
        zIndex: 1,

        '&::before': {
          maskImage: `linear-gradient(
            to right,
            transparent 0%,
            black 30%,
            transparent 60%
          )`,
        },
      }}
    >
      <Container maxWidth={false} sx={{ position: 'relative', maxWidth: 1048, px: { xs: 0 } }}>
        <Stack
          direction={{ md: 'row' }}
          sx={{
            gap: { xs: 4, md: 0 },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Stack
            sx={{
              gap: 1,
              height: 1,
            }}
          >
            <RevealText>
              <Typography variant="h4">
                {translateUi(
                  'ui.sections.landing.homepage.newsletter.want_to_stay_updated_baa1d75b',
                )}
              </Typography>
            </RevealText>
            <RevealText>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 400,
                }}
              >
                {translateUi(
                  'ui.sections.landing.homepage.newsletter.subscribe_to_our_newsletter_3ae5a4f2',
                )}
              </Typography>
            </RevealText>
          </Stack>
          <RevealItems sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: 1 }}>
            <Stack
              component="form"
              onSubmit={(e) => e.preventDefault()}
              direction="row"
              sx={{
                gap: 1,
              }}
            >
              <StyledTextField
                placeholder={translateUi('ui.sections.landing.homepage.newsletter.email_84add5b2')}
                fullWidth
                sx={{ maxWidth: 291 }}
              />
              <Button type="submit" variant="contained">
                {translateUi('ui.sections.landing.homepage.newsletter.subscribe_d6981f74')}
              </Button>
            </Stack>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 400, color: 'text.secondary', px: '10.5px' }}
            >
              {translateUi(
                'ui.sections.landing.homepage.newsletter.your_privacy_is_safe_with_us_read_our_e30ffd34',
              )}
              <Box
                component={externalLinks.legal.terms ? Link : 'span'}
                href={externalLinks.legal.terms || undefined}
              >
                {translateUi(
                  'ui.sections.landing.homepage.newsletter.terms_and_conditions_9b45e625',
                )}
              </Box>
            </Typography>
          </RevealItems>
        </Stack>
      </Container>
    </StripedBackground>
  );
};

export default Newsletter;
