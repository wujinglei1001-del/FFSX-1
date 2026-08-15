import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormHelperText, Grid, Paper } from '@mui/material';
import clsx from 'clsx';
import RecipientCard from './RecipientCard';
import RecipientsFormDialogue from './RecipientsFormDialogue';

const Recipients = () => {
  const { t: translateUi } = useTranslation();
  const {
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const [invoiceFromOpen, setInvoiceFromOpen] = useState(false);
  const [invoiceToOpen, setInvoiceToOpen] = useState(false);
  const invoiceForm = watch('invoiceFrom');
  const invoiceTo = watch('invoiceTo');
  const invoiceFormSubmitHandler = (data) => {
    setValue('invoiceFrom.name', data.name);
    setValue('invoiceFrom.phone', data.phone);
    setValue('invoiceFrom.email', data.email);
    setValue('invoiceFrom.address', data.location);
    clearErrors('invoiceFrom');
  };
  const invoiceToSubmitHandler = (data) => {
    setValue('invoiceTo.name', data.name);
    setValue('invoiceTo.email', data.email);
    setValue('invoiceTo.phone', data.phone);
    setValue('invoiceTo.address', data.location);
    clearErrors('invoiceTo');
  };
  const hasInvoiceFromError = !!errors.invoiceFrom;
  const hasInvoiceToError = !!errors.invoiceTo;
  return (
    <>
      <Paper
        variant="elevation"
        elevation={0}
        background={1}
        className={clsx({
          'Mui-error': hasInvoiceFromError || hasInvoiceToError,
        })}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          outline: 0,
          '&.MuiPaper-root.Mui-error': {
            bgcolor: 'error.lighter',
          },
        }}
      >
        <Grid container spacing={{ xs: 3, md: 5, lg: 10 }} sx={{ justifyContent: 'space-between' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <RecipientCard
              title={translateUi(
                'ui.sections.invoice.create_invoice.invoice_details.invoice_from_4ea0feb2',
              )}
              data={invoiceForm}
              setOpen={setInvoiceFromOpen}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <RecipientCard
              title={translateUi(
                'ui.sections.invoice.create_invoice.invoice_details.invoice_to_6aab5f7e',
              )}
              data={invoiceTo}
              setOpen={setInvoiceToOpen}
            />
          </Grid>
        </Grid>
      </Paper>
      {hasInvoiceFromError && (
        <FormHelperText error sx={{ mx: '14px' }}>
          {translateUi(
            'ui.sections.invoice.create_invoice.invoice_details.invoice_sender_information_is_required_b806644a',
          )}
        </FormHelperText>
      )}
      {hasInvoiceToError && (
        <FormHelperText error sx={{ mx: '14px' }}>
          {translateUi(
            'ui.sections.invoice.create_invoice.invoice_details.invoice_recipient_information_is_required_89b4aacb',
          )}
        </FormHelperText>
      )}
      <RecipientsFormDialogue
        open={invoiceFromOpen}
        title={translateUi(
          'ui.sections.invoice.create_invoice.invoice_details.select_admin_57504a4a',
        )}
        handleDialogClose={() => setInvoiceFromOpen(false)}
        onSubmit={invoiceFormSubmitHandler}
        subtitle={translateUi(
          'ui.sections.invoice.create_invoice.invoice_details.select_a_admin_to_continue_with_the_process_298119ed',
        )}
        mode="admin"
      ></RecipientsFormDialogue>
      <RecipientsFormDialogue
        open={invoiceToOpen}
        title={translateUi(
          'ui.sections.invoice.create_invoice.invoice_details.select_customer_80b02e00',
        )}
        handleDialogClose={() => setInvoiceToOpen(false)}
        subtitle={translateUi(
          'ui.sections.invoice.create_invoice.invoice_details.select_a_customer_to_continue_with_the_process_8f12ae4b',
        )}
        onSubmit={invoiceToSubmitHandler}
        mode="customer"
      ></RecipientsFormDialogue>
    </>
  );
};
export default Recipients;
