import { useTranslation } from 'react-i18next';
import { Button, Stack, Typography } from '@mui/material';
import paths from 'routes/paths';
import OrderConfirmationList from './OrderConfirmationList';

const OrderConfirmationPreview = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack sx={{ gap: 5 }}>
      <div>
        <Typography
          variant="h4"
          sx={{
            mb: 1,
          }}
        >
          {translateUi(
            'ui.sections.ecommerce.customer.order_confirmation.thank_you_for_purchasing_91b2560a',
          )}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: 'success.main',
            mb: 3,
          }}
        >
          {translateUi(
            'ui.sections.ecommerce.customer.order_confirmation.your_order_has_been_placed_52e2ba05',
          )}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            mb: 1,
          }}
        >
          {translateUi(
            'ui.sections.ecommerce.customer.order_confirmation.order_1411241235_974d6e9f',
          )}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
          }}
        >
          {translateUi(
            'ui.sections.ecommerce.customer.order_confirmation.we_ve_sent_a_confirmation_email_to_your_inbox_fac33ba6',
          )}
        </Typography>
      </div>
      <OrderConfirmationList />
      <Stack direction="row" sx={{ gap: 1 }}>
        <Button variant="soft" color="neutral">
          {translateUi('ui.sections.ecommerce.customer.order_confirmation.order_list_86e684a4')}
        </Button>
        <Button variant="contained" color="primary" href={paths.products}>
          {translateUi(
            'ui.sections.ecommerce.customer.order_confirmation.browse_more_items_465a7c99',
          )}
        </Button>
      </Stack>
    </Stack>
  );
};

export default OrderConfirmationPreview;
