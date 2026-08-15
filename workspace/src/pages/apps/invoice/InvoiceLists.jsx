import { useTranslation } from 'react-i18next';
import { Button, Paper, Stack } from '@mui/material';
import paths from 'routes/paths';
import PageHeader from 'components/sections/ecommerce/admin/common/PageHeader';
import InvoiceListContainer from 'components/sections/invoice/invoice-list/InvoiceListContainer';

const InvoiceLists = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      sx={{
        height: 1,
      }}
    >
      <PageHeader
        title={translateUi('ui.pages.apps.invoice.invoicelists.invoice_list_959018ff')}
        breadcrumb={[
          { label: translateUi('ui.pages.apps.invoice.invoicelists.home_70f8bb9a'), url: '/' },
          {
            label: translateUi('ui.pages.apps.invoice.invoicelists.invoice_f9f38818'),
            url: paths.invoiceList,
          },
          {
            label: translateUi('ui.pages.apps.invoice.invoicelists.invoice_list_c836ea0e'),
            active: true,
          },
        ]}
        actionComponent={
          <Stack
            direction="row"
            sx={{
              gap: 1,
            }}
          >
            <Button variant="soft" color="neutral">
              {translateUi('ui.pages.apps.invoice.invoicelists.export_f3e4fadb')}
            </Button>
            <Button variant="soft" color="neutral">
              {translateUi('ui.pages.apps.invoice.invoicelists.import_d6fbc9d2')}
            </Button>
            <Button href={paths.createInvoice} variant="contained" color="primary">
              {translateUi('ui.pages.apps.invoice.invoicelists.create_invoice_32815b0b')}
            </Button>
          </Stack>
        }
      />
      <Paper sx={{ flex: 1, p: { xs: 3, md: 5 } }}>
        <InvoiceListContainer />
      </Paper>
    </Stack>
  );
};

export default InvoiceLists;
