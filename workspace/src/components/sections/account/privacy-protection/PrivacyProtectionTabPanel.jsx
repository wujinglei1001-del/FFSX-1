import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Divider, Link, Stack, Typography } from '@mui/material';
import { zitadelConfig } from 'config/zitadel';
import { connectedDevices, loggedInDevices } from 'data/account/privacy-protection';
import { useSnackbar } from 'notistack';
import AccountTabPanelSection from '../common/AccountTabPanelSection';
import AlternateLoginMethod from './AlternateLoginMethod';
import ChangePassword from './ChangePassword';
import ConnectedDevice from './ConnectedDevice';
import LoggedDevice from './LoggedDevice';
import LoginAlerts from './LoginAlerts';
import TwoFactorAuthOTP from './TwoFactorAuthOTP';

const PrivacyProtectionTabPanel = () => {
  const { t: translateUi } = useTranslation();
  const methods = useForm({
    defaultValues: {
      otpMethod: 'send_text',
      email_alert: true,
      text_message_alert: false,
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    console.log(data);
    enqueueSnackbar('Updated successfully!', { variant: 'success', autoHideDuration: 3000 });
  };

  return (
    <FormProvider {...methods}>
      <Stack divider={<Divider />} sx={{ gap: 5, mt: 2 }}>
        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.privacy_protection.privacyprotectiontabpanel.password_modification_54e3cbe3',
          )}
          subtitle={translateUi(
            'ui.sections.account.privacy_protection.privacyprotectiontabpanel.update_your_password_regularly_to_enhance_account_se_6c588453',
          )}
          icon="material-symbols:key-outline"
        >
          <ChangePassword />
        </AccountTabPanelSection>

        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.privacy_protection.privacyprotectiontabpanel.two_factor_authentication_da7034b1',
          )}
          subtitleEl={
            <>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {translateUi(
                  'ui.sections.account.privacy_protection.privacyprotectiontabpanel.we_will_ask_for_otp_whenever_we_detect_login_from_an_b5582ef4',
                )}
              </Typography>
              <Typography
                component={zitadelConfig.accountUrl ? Link : 'span'}
                href={zitadelConfig.accountUrl || undefined}
                variant="body2"
                sx={{ display: 'inline-block', mb: 3 }}
              >
                {translateUi(
                  'ui.sections.account.privacy_protection.privacyprotectiontabpanel.click_here_to_turn_off_two_factor_authentication_7f33abf5',
                )}
              </Typography>
            </>
          }
          icon="material-symbols:lock-outline"
        >
          <TwoFactorAuthOTP />
        </AccountTabPanelSection>

        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.privacy_protection.privacyprotectiontabpanel.alternate_login_method_56619229',
          )}
          subtitle={translateUi(
            'ui.sections.account.privacy_protection.privacyprotectiontabpanel.set_up_different_alternate_methods_if_you_somehow_lo_55c30ac6',
          )}
          icon="material-symbols:lock-outline"
        >
          <Stack sx={{ gap: 2 }}>
            <AlternateLoginMethod />
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {translateUi(
                'ui.sections.account.privacy_protection.privacyprotectiontabpanel.you_are_connected_in_the_following_devices_3a657690',
              )}
            </Typography>
            {connectedDevices.map((device) => (
              <ConnectedDevice key={device.deviceName} connectedDevice={device} />
            ))}
          </Stack>
        </AccountTabPanelSection>

        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.privacy_protection.privacyprotectiontabpanel.recognized_devices_640aa3d4',
          )}
          subtitle={translateUi(
            'ui.sections.account.privacy_protection.privacyprotectiontabpanel.review_a_list_of_devices_in_which_you_won_t_have_to__2ed77d55',
          )}
          icon="material-symbols:devices-outline-rounded"
        >
          <Stack sx={{ gap: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {translateUi(
                'ui.sections.account.privacy_protection.privacyprotectiontabpanel.you_are_logged_in_the_following_devices_f7de85ac',
              )}
            </Typography>
            {loggedInDevices.map((device) => (
              <LoggedDevice key={device.name} loggedinDevice={device} />
            ))}
          </Stack>
        </AccountTabPanelSection>

        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.privacy_protection.privacyprotectiontabpanel.login_alerts_2280c3d1',
          )}
          subtitle={translateUi(
            'ui.sections.account.privacy_protection.privacyprotectiontabpanel.set_how_we_are_going_to_send_you_an_alert_if_there_i_90dbfb77',
          )}
          icon="material-symbols:notifications-outline-rounded"
        >
          <LoginAlerts />
          <Stack direction="row" sx={{ gap: 1, justifyContent: 'flex-end' }}>
            <Button variant="soft" color="neutral" onClick={() => reset()}>
              {translateUi(
                'ui.sections.account.privacy_protection.privacyprotectiontabpanel.discard_36fff63c',
              )}
            </Button>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              {translateUi(
                'ui.sections.account.privacy_protection.privacyprotectiontabpanel.confirm_04a21221',
              )}
            </Button>
          </Stack>
        </AccountTabPanelSection>
      </Stack>
    </FormProvider>
  );
};

export default PrivacyProtectionTabPanel;
