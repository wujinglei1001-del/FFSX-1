import { useTranslation } from 'react-i18next';
import { Divider, Stack } from '@mui/material';
import AccountTabPanelSection from '../common/AccountTabPanelSection';
import Biometrics from './Biometrics';
import TouchIdFeatures from './TouchIdFeatures';

const TouchIDTabPanel = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack divider={<Divider />} sx={{ gap: 5 }}>
      <AccountTabPanelSection
        title={translateUi('ui.sections.account.touch_id.touchidtabpanel.touch_id_54983019')}
        subtitle={translateUi(
          'ui.sections.account.touch_id.touchidtabpanel.touch_id_enables_quick_login_secure_payments_autofil_fdbbdfa1',
        )}
        icon="material-symbols:lock-person-outline"
      >
        <Biometrics />
      </AccountTabPanelSection>
      <AccountTabPanelSection
        title={translateUi(
          'ui.sections.account.touch_id.touchidtabpanel.touch_id_features_settings_b0b720fe',
        )}
        subtitle={translateUi(
          'ui.sections.account.touch_id.touchidtabpanel.enable_touch_id_for_secure_login_payments_autofill_a_4f9a98f0',
        )}
        icon="material-symbols:lock-clock-outline"
      >
        <TouchIdFeatures />
      </AccountTabPanelSection>
    </Stack>
  );
};

export default TouchIDTabPanel;
