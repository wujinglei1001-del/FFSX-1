import i18n from 'locales/i18n';
import AccessibilityTabPanel from 'components/sections/account/accessibility/AccessibilityTabPanel';
import AudioVideoTabPanel from 'components/sections/account/audio-video/AudioVideoTabPanel';
import ChatPreferencesTabPanel from 'components/sections/account/chat-preferences/ChatPreferencesTabPanel';
import CreditCardInfoTabPanel from 'components/sections/account/credit-card/CreditCardInfoTabPanel';
import DateTimeTabPanel from 'components/sections/account/date-time/DateTimeTabPanel';
import LanguageRegionTabPanel from 'components/sections/account/language-region/LanguageRegionTabPanel';
import NotificationAlertsTabPanel from 'components/sections/account/notification-alerts/NotificationAlertsTabPanel';
import PersonalInfoTabPanel from 'components/sections/account/personal-info/PersonalInfoTabPanel';
import PrivacyProtectionTabPanel from 'components/sections/account/privacy-protection/PrivacyProtectionTabPanel';
import ShippingBillingAddressTabPanel from 'components/sections/account/shipping-billing-address/ShippingBillingAddressTabPanel';
import StorageTabPanel from 'components/sections/account/storage/StorageTabPanel';
import TouchIDTabPanel from 'components/sections/account/touch-id/TouchIdTabPanel';
import UsersPermissionsTabPanel from 'components/sections/account/users-permissions/UsersPermissionsTabPanel';
import WorkEducationTabPanel from 'components/sections/account/work-education/WorkEducationTabPanel';

export const accountTabs = [
  {
    id: 1,
    get label() {
      return i18n.t('ui.data.account.account_tabs.personal_information_ad12e422');
    },
    get title() {
      return i18n.t('ui.data.account.account_tabs.personal_info_87a403cb');
    },
    value: 'personal_information',
    icon: 'material-symbols:person-outline',
    panelIcon: 'material-symbols:person-outline',
    tabPanel: <PersonalInfoTabPanel />,
  },
  {
    id: 2,
    get label() {
      return i18n.t('ui.data.account.account_tabs.work_education_5db90158');
    },
    get title() {
      return i18n.t('ui.data.account.account_tabs.work_education_5db90158');
    },
    value: 'work_education',
    icon: 'material-symbols:school-outline',
    panelIcon: 'material-symbols:school-outline',
    tabPanel: <WorkEducationTabPanel />,
  },
  {
    id: 3,
    get label() {
      return i18n.t('ui.data.account.account_tabs.privacy_protection_a7b060ea');
    },
    get title() {
      return i18n.t('ui.data.account.account_tabs.privacy_protection_a7b060ea');
    },
    value: 'privacy_protection',
    icon: 'material-symbols:shield-outline',
    panelIcon: 'material-symbols:shield-outline',
    tabPanel: <PrivacyProtectionTabPanel />,
  },
  {
    id: 4,
    get label() {
      return i18n.t('ui.data.account.account_tabs.language_region_618d2c41');
    },
    get title() {
      return i18n.t('ui.data.account.account_tabs.language_region_618d2c41');
    },
    value: 'language_region',
    icon: 'material-symbols:language',
    panelIcon: 'material-symbols:language',
    tabPanel: <LanguageRegionTabPanel />,
  },
  {
    id: 5,
    get label() {
      return i18n.t('ui.data.account.account_tabs.notification_alerts_670eeebb');
    },
    get title() {
      return i18n.t('ui.data.account.account_tabs.notification_alerts_670eeebb');
    },
    value: 'notification_alerts',
    icon: 'material-symbols:notifications-outline-rounded',
    panelIcon: 'material-symbols:notifications-outline-rounded',
    tabPanel: <NotificationAlertsTabPanel />,
  },
  {
    id: 6,
    get label() {
      return i18n.t('ui.data.account.account_tabs.accessibility_d660049b');
    },
    get title() {
      return i18n.t('ui.data.account.account_tabs.accessibility_d660049b');
    },
    value: 'accessibility',
    icon: 'material-symbols:front-hand-outline-rounded',
    panelIcon: 'material-symbols:front-hand-outline-rounded',
    tabPanel: <AccessibilityTabPanel />,
  },
  {
    id: 7,
    get label() {
      return i18n.t('ui.data.account.account_tabs.credit_card_information_1e3e79a4');
    },
    get title() {
      return i18n.t('ui.data.account.account_tabs.credit_card_information_1e3e79a4');
    },
    value: 'credit_card_information',
    icon: 'material-symbols:credit-card-outline',
    panelIcon: 'material-symbols:credit-card-outline',
    tabPanel: <CreditCardInfoTabPanel />,
  },
  {
    id: 8,
    get label() {
      return i18n.t('ui.data.account.account_tabs.date_time_63ae7caf');
    },
    get title() {
      return i18n.t('ui.data.account.account_tabs.date_and_time_e6a0d7eb');
    },
    value: 'date_time',
    icon: 'material-symbols:calendar-month-outline-rounded',
    panelIcon: 'material-symbols:calendar-month-outline-rounded',
    tabPanel: <DateTimeTabPanel />,
  },
  {
    id: 9,
    get label() {
      return i18n.t('ui.data.account.account_tabs.users_permissions_2dc9af22');
    },
    get title() {
      return i18n.t('ui.data.account.account_tabs.users_permissions_2dc9af22');
    },
    value: 'users_permissions',
    icon: 'material-symbols:manage-accounts-outline',
    panelIcon: 'material-symbols:manage-accounts-outline',
    tabPanel: <UsersPermissionsTabPanel />,
  },
  {
    id: 10,
    get label() {
      return i18n.t('ui.data.account.account_tabs.shipping_billing_address_00779369');
    },
    get title() {
      return i18n.t('ui.data.account.account_tabs.shipping_billing_address_00779369');
    },
    value: 'shipping_billing_address',
    icon: 'material-symbols:home-pin-outline',
    panelIcon: 'material-symbols:home-pin-outline',
    tabPanel: <ShippingBillingAddressTabPanel />,
  },
  {
    id: 11,
    get label() {
      return i18n.t('ui.data.account.account_tabs.storage_9e092dda');
    },
    get title() {
      return i18n.t('ui.data.account.account_tabs.storage_9e092dda');
    },
    value: 'storage',
    icon: 'material-symbols:data-usage',
    panelIcon: 'material-symbols:data-usage',
    tabPanel: <StorageTabPanel />,
  },
  {
    id: 12,
    get label() {
      return i18n.t('ui.data.account.account_tabs.fingerprint_access_setup_c91512ff');
    },
    get title() {
      return i18n.t('ui.data.account.account_tabs.fingerprint_access_setup_c91512ff');
    },
    value: 'touch_id',
    icon: 'material-symbols:touch-app-outline',
    panelIcon: 'material-symbols:touch-app-outline',
    tabPanel: <TouchIDTabPanel />,
  },
  {
    id: 13,
    get label() {
      return i18n.t('ui.data.account.account_tabs.audio_video_c1bb3f99');
    },
    get title() {
      return i18n.t('ui.data.account.account_tabs.audio_video_c1bb3f99');
    },
    value: 'audio_video',
    icon: 'material-symbols:video-settings-rounded',
    panelIcon: 'material-symbols:video-settings-rounded',
    tabPanel: <AudioVideoTabPanel />,
  },
  {
    id: 14,
    get label() {
      return i18n.t('ui.data.account.account_tabs.chat_preferences_663fe786');
    },
    get title() {
      return i18n.t('ui.data.account.account_tabs.chat_preferences_663fe786');
    },
    value: 'chat_preferences',
    icon: 'material-symbols:chat-outline-rounded',
    panelIcon: 'material-symbols:chat-outline-rounded',
    tabPanel: <ChatPreferencesTabPanel />,
  },
];
