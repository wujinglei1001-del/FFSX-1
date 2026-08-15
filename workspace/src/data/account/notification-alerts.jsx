import { Typography } from '@mui/material';
import { initialConfig } from 'config';
import i18n from 'locales/i18n';
import Image from 'components/base/Image';

export const desktopNotifications = [
  {
    name: 'googleChrome',
    checked: true,
    label: (
      <>
        <Image
          key="google-chrome-logo"
          width={24}
          src={`${initialConfig.assetsDir}/images/logo/21.svg`}
          alt={i18n.t('ui.data.account.notification_alerts.chrome_logo_becc74a3')}
        />
        <Typography key="google-chrome-title" component="span" variant="body2">
          {i18n.t('ui.data.account.notification_alerts.google_chrome_f6bf9c35')}
        </Typography>
      </>
    ),
  },
];
export const taggedNotifications = [
  {
    name: 'anyone',
    checked: false,
    get label() {
      return i18n.t('ui.data.account.notification_alerts.anyone_9b5641a9');
    },
  },
  {
    name: 'followers',
    checked: false,
    get label() {
      return i18n.t('ui.data.account.notification_alerts.followers_78eaabf4');
    },
  },
  {
    name: 'friends',
    checked: true,
    get label() {
      return i18n.t('ui.data.account.notification_alerts.friends_c11d5e1d');
    },
  },
];
export const muteNotifications = [
  {
    name: 'youDontFollow',
    checked: false,
    get label() {
      return i18n.t('ui.data.account.notification_alerts.you_don_t_follow_44e9b49c');
    },
  },
  {
    name: 'whoDontFollowYou',
    checked: false,
    get label() {
      return i18n.t('ui.data.account.notification_alerts.who_don_t_follow_you_3aa2ab97');
    },
  },
  {
    name: 'withNewAccount',
    checked: false,
    get label() {
      return i18n.t('ui.data.account.notification_alerts.with_a_new_account_a3d1ddb8');
    },
  },
  {
    name: 'whoHaventConfirmedEmail',
    checked: true,
    get label() {
      return i18n.t(
        'ui.data.account.notification_alerts.who_haven_t_confirmed_their_email_c5cc9fd1',
      );
    },
  },
  {
    name: 'whoHaventConfirmedPhoneNumber',
    checked: true,
    get label() {
      return i18n.t(
        'ui.data.account.notification_alerts.who_haven_t_confirmed_their_phone_number_6956c997',
      );
    },
  },
];
