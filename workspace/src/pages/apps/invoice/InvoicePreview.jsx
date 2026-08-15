import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Button, Paper, Stack } from '@mui/material';
import { invoiceData } from 'data/invoice';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import PageHeader from 'components/sections/ecommerce/admin/common/PageHeader';
import InvoicePreviewContainer from 'components/sections/invoice/invoice-preview/InvoicePreviewContainer';

const InvoicePreview = () => {
  const { t: translateUi } = useTranslation();
  const { id } = useParams();

  return (
    <>
      <Stack>
        <PageHeader
          title={`Invoice #${id || invoiceData.invoiceDetails.invoiceNumber}`}
          breadcrumb={[
            { label: translateUi('ui.pages.apps.invoice.invoicepreview.home_70f8bb9a'), url: '/' },
            {
              label: translateUi('ui.pages.apps.invoice.invoicepreview.invoice_f9f38818'),
              url: paths.createInvoice,
            },
            {
              label: translateUi('ui.pages.apps.invoice.invoicepreview.invoice_preview_e6cf1d96'),
              active: true,
            },
          ]}
          actionComponent={
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: { xs: 0.5, sm: 1 } }}>
              <Button variant="contained" color="primary">
                {translateUi('ui.pages.apps.invoice.invoicepreview.send_invoice_0c9fed25')}
              </Button>
              <Button variant="soft" shape="square" color="neutral">
                <IconifyIcon icon="mdi:edit-outline" sx={{ fontSize: 20 }} />
              </Button>
              <Button variant="soft" shape="square" color="neutral">
                <IconifyIcon icon="mdi:visibility-outline" sx={{ fontSize: 20 }} />
              </Button>
              <Button variant="soft" shape="square" color="neutral">
                <IconifyIcon icon="mdi:tray-download" sx={{ fontSize: 20 }} />
              </Button>
              <Button variant="soft" shape="square" color="neutral">
                <IconifyIcon icon="mdi:printer-outline" sx={{ fontSize: 20 }} />
              </Button>
              <Button variant="soft" shape="square" color="neutral">
                <IconifyIcon icon="mdi:share-variant-outline" sx={{ fontSize: 20 }} />
              </Button>
            </Stack>
          }
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'flex-end' },
          }}
        />
        <Paper
          variant="elevation"
          elevation={0}
          background={1}
          sx={{ width: 1, p: { xs: 3, lg: 5 }, mt: '1px', borderRadius: 0 }}
        >
          <InvoicePreviewContainer invoiceData={invoiceData} />
        </Paper>
      </Stack>
    </>
  );
};

export default InvoicePreview;
