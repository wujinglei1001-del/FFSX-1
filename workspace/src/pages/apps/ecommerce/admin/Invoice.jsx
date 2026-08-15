import { useTranslation } from 'react-i18next';
import { Button, Container, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { defaultInvoice } from 'data/e-commerce/orders';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import PageHeader from 'components/sections/ecommerce/admin/common/PageHeader';
import InvoiceContainer from 'components/sections/ecommerce/admin/invoice';

const Invoice = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader
          title={translateUi('ui.pages.apps.ecommerce.admin.invoice_details_2325ca61')}
          breadcrumb={[
            {
              label: translateUi('ui.pages.apps.ecommerce.admin.invoice_list_959018ff'),
              url: paths.adminInvoiceList,
            },
            { label: translateUi('ui.pages.apps.ecommerce.admin.invoice_f9f38818'), active: true },
          ]}
          actionComponent={
            <Stack direction="row" sx={{ gap: 1 }}>
              <Button
                variant="soft"
                color="neutral"
                sx={{ whiteSpace: 'nowrap' }}
                startIcon={<IconifyIcon icon="mdi:edit-outline" fontSize="20px !important" />}
              >
                {translateUi('ui.pages.apps.ecommerce.admin.edit_invoice_840fa121')}
              </Button>
              <Button
                variant="soft"
                color="neutral"
                sx={{ whiteSpace: 'nowrap' }}
                startIcon={
                  <IconifyIcon
                    icon="material-symbols:download-rounded"
                    fontSize="20px !important"
                  />
                }
              >
                {translateUi('ui.pages.apps.ecommerce.admin.download_a479c9c3')}
              </Button>
              <Button
                variant="soft"
                color="neutral"
                sx={{ whiteSpace: 'nowrap' }}
                startIcon={
                  <IconifyIcon
                    icon="material-symbols:print-outline-rounded"
                    fontSize="20px !important"
                  />
                }
              >
                {translateUi('ui.pages.apps.ecommerce.admin.print_5b221e9c')}
              </Button>
            </Stack>
          }
        />
      </Grid>
      <Grid size={12} sx={{ overflowX: 'scroll' }}>
        <Container maxWidth={false} sx={{ width: 1340, px: { xs: 3, md: 5 }, py: 5 }}>
          <InvoiceContainer invoice={defaultInvoice} />
        </Container>
      </Grid>
    </Grid>
  );
};

export default Invoice;
