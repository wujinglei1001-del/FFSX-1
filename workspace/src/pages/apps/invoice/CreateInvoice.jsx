import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import paths from 'routes/paths';
import PageBreadcrumb from 'components/sections/common/PageBreadcrumb';
import CreateInvoiceContainer from 'components/sections/invoice/create-invoice';
import { useCreateInvoiceForm } from 'components/sections/invoice/create-invoice/useCreateInvoiceForm';

const CreateInvoice = () => {
  const { t: translateUi } = useTranslation();
  const navigate = useNavigate();
  const { methods } = useCreateInvoiceForm();

  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    console.log(data);
    navigate(paths.invoicePreview);
    reset();
  };

  return (
    <>
      <Paper sx={{ px: 5, py: 3, flex: 1 }}>
        <Box>
          <PageBreadcrumb
            items={[
              { label: translateUi('ui.pages.apps.invoice.createinvoice.home_70f8bb9a'), url: '/' },
              {
                label: translateUi('ui.pages.apps.invoice.createinvoice.invoice_f9f38818'),
                url: paths.createInvoice,
              },
              {
                label: translateUi('ui.pages.apps.invoice.createinvoice.new_invoice_878bae99'),
                active: true,
              },
            ]}
            sx={{
              mb: 2,
            }}
          />
          <Typography variant="h4">
            {translateUi('ui.pages.apps.invoice.createinvoice.create_invoice_a0567cf7')}
          </Typography>
        </Box>
      </Paper>
      <FormProvider {...methods}>
        <Stack
          direction="row"
          component="form"
          id="createInvoiceFrom"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ py: { xs: 3, md: 5 } }}
        >
          <Container maxWidth={false} sx={{ maxWidth: 900 }}>
            <CreateInvoiceContainer />
          </Container>
        </Stack>
      </FormProvider>
    </>
  );
};

export default CreateInvoice;
