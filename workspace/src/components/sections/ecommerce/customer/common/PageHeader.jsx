import { useTranslation } from 'react-i18next';
import { Box, Button, ButtonBase, Paper, Stack, Typography } from '@mui/material';
import { cssVarRgba } from 'lib/utils';
import { useSettingsContext } from 'providers/SettingsProvider';
import paths from 'routes/paths';
import Image from 'components/base/Image';
import PageBreadcrumb from 'components/sections/common/PageBreadcrumb';

const PageHeader = ({ title, breadcrumb, userLoggedIn, sx }) => {
  const { t: translateUi } = useTranslation();
  const {
    config: { assetsDir },
  } = useSettingsContext();

  return (
    <Paper sx={{ py: 4, px: { xs: 3, md: 5 }, ...sx }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          rowGap: 3,
          columnGap: 5,
          alignItems: { md: 'center' },
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={[
            {
              flexShrink: 0,
            },
            userLoggedIn === true && {
              flex: { xl: '50%' },
            },
          ]}
        >
          <PageBreadcrumb items={breadcrumb} sx={{ mb: 1 }} />
          <Typography variant="h4">{title}</Typography>
        </Box>

        {userLoggedIn ? (
          <ButtonBase
            href={paths.products}
            sx={{
              display: 'flex',
              maxHeight: 90,
              position: 'relative',
              borderRadius: 2,
              py: 2,
              pl: 3,
              pr: 1,
              overflow: 'visible',
              bgcolor: ({ vars }) => cssVarRgba(vars.palette.error.mainChannel, 0.08),
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                left: 0,
                top: 0,
                width: 1,
                height: 1,
                backgroundImage: `url(${assetsDir}/images/ecommerce/promo/2.webp)`,
                opacity: 0.2,
                backgroundBlendMode: 'lighten',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                zIndex: 1,
                borderRadius: 'inherit',
              },
            }}
          >
            <Stack
              direction="row"
              sx={{
                gap: { md: 1 },
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  mr: 1,
                  color: 'error.darker',
                  fontSize: { xs: 'h6.fontSize', sm: 'h4.fontSize' },
                }}
              >
                <Box component="span" sx={{ fontWeight: 400 }}>
                  {translateUi('ui.sections.ecommerce.customer.common.plants_on_sale_for_02aa35a6')}
                </Box>{' '}
                <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
                  {translateUi('ui.sections.ecommerce.customer.common.mother_s_day_e897f130')}
                </Box>
              </Typography>

              <Image
                src={`${assetsDir}/images/ecommerce/promo/1.webp`}
                alt={translateUi('ui.sections.ecommerce.customer.common.plant_on_sale_c80b2351')}
                sx={{
                  position: 'relative',
                  display: 'block',
                  zIndex: 1,
                  bottom: 16,
                  right: 0,
                  height: 110,
                }}
              />
            </Stack>
          </ButtonBase>
        ) : (
          <Box
            sx={{
              bgcolor: 'primary.lighter',
              borderRadius: 6,
              py: 2,
              px: 3,
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              sx={{
                columnGap: 5,
                rowGap: 3,
                height: 1,
                alignItems: { sm: 'center' },
                justifyContent: 'space-between',
              }}
            >
              <Stack
                direction={{ xs: 'column', xl: 'row' }}
                sx={{
                  gap: 1,
                  alignItems: { xl: 'center' },
                }}
              >
                <Typography variant="h6">
                  {translateUi('ui.sections.ecommerce.customer.common.already_a_member_052100c2')}
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle1"
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  {translateUi('ui.sections.ecommerce.customer.common.log_in_for_a_2b16e1b9')}
                  <strong>
                    {translateUi(
                      'ui.sections.ecommerce.customer.common.faster_checkout_process_04ae74e5',
                    )}
                  </strong>
                </Typography>
              </Stack>
              <Stack
                direction={{ xs: 'column', lg: 'row' }}
                sx={{
                  gap: 1,
                  alignItems: { xs: 'stretch', lg: 'center' },
                }}
              >
                <Button
                  variant="contained"
                  color="neutral"
                  sx={{ whiteSpace: 'nowrap' }}
                  href={paths.defaultJwtLogin}
                >
                  {translateUi('ui.sections.ecommerce.customer.common.login_to_checkout_70d9af3b')}
                </Button>
                <Button
                  variant="text"
                  color="neutral"
                  sx={{ whiteSpace: 'nowrap' }}
                  href={paths.defaultJwtSignup}
                >
                  {translateUi(
                    'ui.sections.ecommerce.customer.common.create_a_new_account_19e93057',
                  )}
                </Button>
              </Stack>
            </Stack>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default PageHeader;
