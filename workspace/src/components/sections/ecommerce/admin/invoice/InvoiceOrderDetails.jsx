import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

const InvoiceOrderDetails = ({ invoice }) => {
  const { t: translateUi } = useTranslation();
  const { order } = invoice;

  return (
    <div>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
        }}
      >
        {translateUi('ui.sections.ecommerce.admin.invoice.order_details_1a897948')}
      </Typography>
      <Stack
        sx={{
          gap: 3,
        }}
      >
        <Grid container spacing={1}>
          <Grid size={6}>
            <OrderDetailItem
              label={translateUi('ui.sections.ecommerce.admin.invoice.order_id_81415342')}
              value={order.id}
            />
          </Grid>
          <Grid size={6}>
            <OrderDetailItem
              label={translateUi('ui.sections.ecommerce.admin.invoice.invoice_id_ffa6d731')}
              value="#52132463423234"
            />
          </Grid>
          <Grid size={6}>
            <OrderDetailItem
              label={translateUi('ui.sections.ecommerce.admin.invoice.deliver_to_c229c05a')}
              value="Captain Haddock"
            />
          </Grid>
          <Grid size={6}>
            <OrderDetailItem
              label={translateUi('ui.sections.ecommerce.admin.invoice.phone_77064d52')}
              value="+12324354356"
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid size={6}>
            <OrderDetailItem
              label={translateUi('ui.sections.ecommerce.admin.invoice.order_date_121398e9')}
              value="8:30 pm, 19 March 2024"
            />
          </Grid>
          <Grid size={6}>
            <OrderDetailItem
              label={translateUi('ui.sections.ecommerce.admin.invoice.payment_status_9dfea404')}
              value="Paid"
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid size={6}>
            <OrderDetailItem
              label={translateUi('ui.sections.ecommerce.admin.invoice.paid_by_70c115d7')}
              value="Captain Haddock"
            />
          </Grid>
          <Grid size={6}>
            <OrderDetailItem
              label={translateUi('ui.sections.ecommerce.admin.invoice.bill_to_523ccce2')}
              value="Captain Haddock"
            />
          </Grid>
          <Grid size={6}>
            <OrderDetailItem
              label={translateUi('ui.sections.ecommerce.admin.invoice.delivery_address_beacd3ba')}
              value="Apt: 6/B, 192 Edsel Road, Van Nuys, California, USA 96580"
            />
          </Grid>
          <Grid size={6}>
            <OrderDetailItem
              label={translateUi('ui.sections.ecommerce.admin.invoice.billing_address_7f3f6883')}
              value="Apt: 6/B, 192 Edsel Road, Van Nuys, California, USA 96580"
            />
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
};

const OrderDetailItem = ({ label, value }) => (
  <Stack direction="row" sx={{ alignItems: 'center' }}>
    <Typography variant="body2" sx={{ fontWeight: 'bold', width: 120 }}>
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.secondary', pl: 2, pr: 3 }}>
      :
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {value}
    </Typography>
  </Stack>
);

export default InvoiceOrderDetails;
