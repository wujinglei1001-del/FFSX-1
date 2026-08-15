import { useTranslation } from 'react-i18next';
import { Divider, Stack, Typography } from '@mui/material';
import AccountTabPanelSection from '../common/AccountTabPanelSection';
import PaymentMethodsSection from './PaymentMethodsSection';

const CreditCardInfoTabPanel = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack divider={<Divider />} sx={{ gap: 5 }}>
      <AccountTabPanelSection
        title={translateUi(
          'ui.sections.account.credit_card.creditcardinfotabpanel.payment_method_f383f6a2',
        )}
        subtitle={translateUi(
          'ui.sections.account.credit_card.creditcardinfotabpanel.update_your_payment_methods_add_credit_cards_and_sec_1e5263a0',
        )}
        icon="material-symbols:payments-outline"
      >
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700 }}>
          {translateUi(
            'ui.sections.account.credit_card.creditcardinfotabpanel.credit_cards_167745b2',
          )}
        </Typography>
        <PaymentMethodsSection />
      </AccountTabPanelSection>
    </Stack>
  );
};

export default CreditCardInfoTabPanel;
