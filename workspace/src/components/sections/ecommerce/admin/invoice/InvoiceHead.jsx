import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import Logo from 'components/common/Logo';

const InvoiceHead = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      sx={{
        gap: 2,
        justifyContent: 'space-between',
      }}
    >
      <Logo showName={false} sx={{ width: 50, height: 80 }} />
      <Typography variant="h6">
        {translateUi(
          'ui.sections.ecommerce.admin.invoice.tax_invoice_bill_of_supply_cash_memo_182d5df0',
        )}
      </Typography>
    </Stack>
  );
};

export default InvoiceHead;
