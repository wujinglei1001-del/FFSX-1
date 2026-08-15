import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Button, Stack, TextField } from '@mui/material';

const InvoiceFooter = () => {
  const { t: translateUi } = useTranslation();
  const { register } = useFormContext();
  return (
    <>
      <Box sx={{ my: 4 }}>
        <TextField
          multiline
          rows={2}
          label={translateUi(
            'ui.sections.invoice.create_invoice.items_details.note_to_recipient_79052e00',
          )}
          {...register('note')}
          fullWidth
        />
      </Box>
      <Stack direction="row" sx={{ justifyContent: 'end', alignItems: 'center', gap: 1 }}>
        <Button variant="soft" color="neutral">
          {translateUi('ui.sections.invoice.create_invoice.items_details.save_as_draft_77d9d759')}
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {translateUi('ui.sections.invoice.create_invoice.items_details.create_preview_ad6001cd')}
        </Button>
      </Stack>
    </>
  );
};
export default InvoiceFooter;
