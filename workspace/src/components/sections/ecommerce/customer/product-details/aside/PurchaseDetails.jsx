import { useTranslation } from 'react-i18next';
import { Box, Link, Paper, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import paths from 'routes/paths';

const PurchaseDetails = ({ sx }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, ...sx }}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
        }}
      >
        {translateUi('ui.sections.ecommerce.customer.product_details.purchase_details_540a0a5a')}
      </Typography>
      <Stack
        direction="row"
        sx={{
          gap: 2,
          mb: 3,
        }}
      >
        <IconifyIcon
          icon="material-symbols:local-shipping-outline-rounded"
          sx={{ flexShrink: 0, fontSize: 22 }}
        />
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          {translateUi(
            'ui.sections.ecommerce.customer.product_details.home_delivery_and_store_pickup_2440319d',
          )}
          <Box
            sx={{
              display: 'block',
              fontWeight: 700,
              color: 'success.main',
            }}
            component="span"
          >
            {translateUi('ui.sections.ecommerce.customer.product_details.both_available_cca90348')}
          </Box>
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ gap: 2 }}>
        <IconifyIcon
          icon="material-symbols:u-turn-left-rounded"
          sx={{ flexShrink: 0, fontSize: 22, rotate: '90deg' }}
        />
        <div>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
            }}
          >
            <strong>
              {translateUi(
                'ui.sections.ecommerce.customer.product_details.eligible_for_refund_within_30_days_ef044917',
              )}
            </strong>
            {translateUi(
              'ui.sections.ecommerce.customer.product_details.of_receiving_products_2271db01',
            )}{' '}
            <Link href={paths.landingFaq}>
              {translateUi('ui.sections.ecommerce.customer.product_details.view_details_00c3e21c')}
            </Link>
          </Typography>
        </div>
      </Stack>
    </Paper>
  );
};

export default PurchaseDetails;
