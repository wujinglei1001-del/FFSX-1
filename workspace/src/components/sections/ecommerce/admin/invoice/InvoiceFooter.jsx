import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

const InvoiceFooter = () => {
  const { t: translateUi } = useTranslation();
  return (
    <div>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          mb: 2,
        }}
      >
        {translateUi(
          'ui.sections.ecommerce.admin.invoice.if_you_have_any_questions_concerning_this_invoice_co_23b20e8d',
        )}{' '}
        <strong>+1 242-352-234</strong>
        {translateUi('ui.sections.ecommerce.admin.invoice.or_send_an_email_at_a64e80b4')}{' '}
        <strong>
          {translateUi('ui.sections.ecommerce.admin.invoice.customerservice_example_com_30219b0f')}
        </strong>
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 700,
        }}
      >
        {translateUi('ui.sections.ecommerce.admin.invoice.thank_you_for_your_business_fd468091')}
      </Typography>
    </div>
  );
};

export default InvoiceFooter;
