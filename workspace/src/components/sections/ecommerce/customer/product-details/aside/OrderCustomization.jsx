import { useTranslation } from 'react-i18next';
import { Button, Paper, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

const OrderCustomization = ({ sx }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, ...sx }}>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
        }}
      >
        {translateUi('ui.sections.ecommerce.customer.product_details.need_customization_5193b137')}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          mb: 3,
        }}
      >
        {translateUi(
          'ui.sections.ecommerce.customer.product_details.have_this_product_modified_to_your_specifications_or_320db39a',
        )}
      </Typography>
      <Button
        variant="soft"
        color="neutral"
        fullWidth
        startIcon={
          <IconifyIcon icon="material-symbols:handyman-outline" fontSize="20px !important" />
        }
      >
        {translateUi('ui.sections.ecommerce.customer.product_details.order_customization_1dc659b8')}
      </Button>
    </Paper>
  );
};

export default OrderCustomization;
