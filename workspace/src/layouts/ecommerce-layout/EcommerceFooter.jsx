import { useTranslation } from 'react-i18next';
import { Box, Button, Link, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { kebabCase } from 'lib/utils';
import i18n from 'locales/i18n';
import IconifyIcon from 'components/base/IconifyIcon';
import StyledTextField from 'components/styled/StyledTextField';

const footerLinks = {
  company: [
    {
      get label() {
        return i18n.t('ui.layouts.ecommerce_layout.ecommercefooter.about_us_c887b9d3');
      },
      url: '#!',
    },
    {
      get label() {
        return i18n.t('ui.layouts.ecommerce_layout.ecommercefooter.press_ea683ad6');
      },
      url: '#!',
    },
    {
      get label() {
        return i18n.t('ui.layouts.ecommerce_layout.ecommercefooter.sustainability_31bc1b17');
      },
      url: '#!',
    },
    {
      get label() {
        return i18n.t('ui.layouts.ecommerce_layout.ecommercefooter.request_a_catalog_b01d6f07');
      },
      url: '#!',
    },
    {
      get label() {
        return i18n.t('ui.layouts.ecommerce_layout.ecommercefooter.careers_68d70e59');
      },
      url: '#!',
    },
    {
      get label() {
        return i18n.t('ui.layouts.ecommerce_layout.ecommercefooter.blog_0b9d2b23');
      },
      url: '#!',
    },
  ],
  help: [
    {
      get label() {
        return i18n.t('ui.layouts.ecommerce_layout.ecommercefooter.help_center_11015825');
      },
      url: '#!',
    },
    {
      get label() {
        return i18n.t('ui.layouts.ecommerce_layout.ecommercefooter.track_your_order_57efbb02');
      },
      url: '#!',
    },
    {
      get label() {
        return i18n.t('ui.layouts.ecommerce_layout.ecommercefooter.shipping_694e6062');
      },
      url: '#!',
    },
    {
      get label() {
        return i18n.t('ui.layouts.ecommerce_layout.ecommercefooter.information_0eb5ed50');
      },
      url: '#!',
    },
    {
      get label() {
        return i18n.t('ui.layouts.ecommerce_layout.ecommercefooter.return_policy_63f82a94');
      },
      url: '#!',
    },
    {
      get label() {
        return i18n.t('ui.layouts.ecommerce_layout.ecommercefooter.faqs_ab9dcd4a');
      },
      url: '#!',
    },
  ],
  contacts: [
    {
      get label() {
        return i18n.t('ui.layouts.ecommerce_layout.ecommercefooter.contact_us_9ad0ccff');
      },
      url: '#!',
    },
    {
      get label() {
        return i18n.t('ui.layouts.ecommerce_layout.ecommercefooter.shops_outlets_9f448448');
      },
      url: '#!',
    },
    {
      get label() {
        return i18n.t('ui.layouts.ecommerce_layout.ecommercefooter.feedback_c8d7677e');
      },
      url: '#!',
    },
  ],
};

const EcommerceFooter = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper background={1} sx={{ position: 'relative', px: { xs: 3, md: 5 }, py: { xs: 5, md: 7 } }}>
      <Grid container columnSpacing={1}>
        <Grid
          sx={{ mb: { xs: 6, md: 8, lg: 0 } }}
          size={{
            xs: 12,
            lg: 6,
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row', lg: 'column' }}
            sx={{
              rowGap: 6,
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'text.disabled',
                lineHeight: 1.5,
              }}
            >
              <Box
                component="span"
                sx={{
                  display: 'block',
                  mb: 0.5,
                }}
              >
                {translateUi(
                  'ui.layouts.ecommerce_layout.ecommercefooter.thoughtfully_designed_2c5fa4fe',
                )}
              </Box>
              <Box component="span" sx={{ display: 'block' }}>
                {translateUi(
                  'ui.layouts.ecommerce_layout.ecommercefooter.masterfully_coded_c7e80ef0',
                )}
              </Box>
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={(e) => e.preventDefault()}
              sx={{
                textAlign: { md: 'right', lg: 'left' },
              }}
            >
              <Stack
                direction="row"
                sx={{
                  gap: 2,
                  mb: 2,
                  justifyContent: { md: 'flex-end', lg: 'flex-start' },
                }}
              >
                <StyledTextField
                  id="email"
                  type="email"
                  placeholder={translateUi(
                    'ui.layouts.ecommerce_layout.ecommercefooter.your_email_3fa6f5fb',
                  )}
                  variant="filled"
                  sx={{
                    maxWidth: 260,
                    width: 1,
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="neutral"
                  sx={{
                    flexShrink: 0,
                  }}
                  endIcon={<IconifyIcon icon="material-symbols:arrow-right-alt-rounded" />}
                >
                  {translateUi('ui.layouts.ecommerce_layout.ecommercefooter.subscribe_d6981f74')}
                </Button>
              </Stack>
              <Typography
                component="p"
                variant="subtitle2"
                sx={{
                  color: 'text.secondary',
                }}
              >
                {translateUi(
                  'ui.layouts.ecommerce_layout.ecommercefooter.subscribe_to_our_newsletter_for_exclusive_deals_and__c9611e57',
                )}
              </Typography>
            </Box>
          </Stack>
        </Grid>

        <Grid
          sx={{ mb: { xs: 6, sm: 0 } }}
          size={{
            xs: 12,
            sm: 4,
            lg: 2,
          }}
        >
          <Stack sx={{ gap: 2 }}>
            {footerLinks['company'].map(({ label, url }) => (
              <Link
                key={kebabCase(label)}
                href={url}
                variant="subtitle2"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  alignSelf: 'flex-start',
                }}
              >
                {label}
              </Link>
            ))}
          </Stack>
        </Grid>

        <Grid
          sx={{ mb: { xs: 6, sm: 0 } }}
          size={{
            xs: 12,
            sm: 4,
            lg: 2,
          }}
        >
          <Stack sx={{ gap: 2 }}>
            {footerLinks['help'].map(({ label, url }) => (
              <Link
                key={kebabCase(label)}
                href={url}
                variant="subtitle2"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  alignSelf: 'flex-start',
                }}
              >
                {label}
              </Link>
            ))}
          </Stack>
        </Grid>

        <Grid
          size={{
            xs: 12,
            sm: 4,
            lg: 2,
          }}
        >
          <Stack
            sx={{
              gap: 2,
              height: 1,
              justifyContent: 'space-between',
            }}
          >
            {footerLinks['contacts'].map(({ label, url }) => (
              <Link
                key={kebabCase(label)}
                href={url}
                variant="subtitle2"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  alignSelf: 'flex-start',
                }}
              >
                {label}
              </Link>
            ))}
            <Box
              sx={{
                mt: 'auto',
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 'bold',
                  mb: 2,
                }}
              >
                {translateUi('ui.layouts.ecommerce_layout.ecommercefooter.follow_us_at_cd0644d4')}
              </Typography>
              <Stack direction="row" sx={{ gap: 1, color: 'text.secondary' }}>
                <Button
                  href="#!"
                  shape="circle"
                  variant="soft"
                  color="neutral"
                  size="small"
                  sx={{
                    '&:hover': {
                      bgcolor: 'background.elevation2',
                    },
                  }}
                >
                  <IconifyIcon icon="eva:facebook-fill" fontSize={16} />
                </Button>
                <Button
                  href="#!"
                  shape="circle"
                  variant="soft"
                  color="neutral"
                  size="small"
                  sx={{
                    '&:hover': {
                      bgcolor: 'background.elevation2',
                    },
                  }}
                >
                  <IconifyIcon icon="ri:twitter-x-fill" fontSize={16} />
                </Button>
                <Button
                  href="#!"
                  shape="circle"
                  variant="soft"
                  color="neutral"
                  size="small"
                  sx={{
                    '&:hover': {
                      bgcolor: 'background.elevation2',
                    },
                  }}
                >
                  <IconifyIcon icon="entypo-social:pinterest" fontSize={16} />
                </Button>
                <Button
                  href="#!"
                  shape="circle"
                  variant="soft"
                  color="neutral"
                  size="small"
                  sx={{
                    '&:hover': {
                      bgcolor: 'background.elevation2',
                    },
                  }}
                >
                  <IconifyIcon icon="ri:instagram-line" fontSize={16} />
                </Button>
                <Button
                  href="#!"
                  shape="circle"
                  variant="soft"
                  color="neutral"
                  size="small"
                  sx={{
                    '&:hover': {
                      bgcolor: 'background.elevation2',
                    },
                  }}
                >
                  <IconifyIcon icon="ic:sharp-tiktok" fontSize={16} />
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EcommerceFooter;
