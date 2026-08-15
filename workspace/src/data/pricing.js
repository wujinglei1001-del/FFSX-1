import starterDark from 'assets/images/illustrations/22-dark.webp';
import starter from 'assets/images/illustrations/22.webp';
import proDark from 'assets/images/illustrations/23-dark.webp';
import pro from 'assets/images/illustrations/23.webp';
import saverDark from 'assets/images/illustrations/24-dark.webp';
import saver from 'assets/images/illustrations/24.webp';
import industryDark from 'assets/images/illustrations/25-dark.webp';
import industry from 'assets/images/illustrations/25.webp';
import i18n from 'locales/i18n';

export const pricing = [
  {
    id: 1,
    image: {
      light: starter,
      dark: starterDark,
    },
    columnTitle: 'Pricing Starter',
    tableTitle: 'Starter',
    price: null,
    features: [
      {
        get title() {
          return i18n.t('ui.data.pricing.unlimited_leads_922252e7');
        },
        active: true,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.unlimited_emails_5a234119');
        },
        active: true,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.no_aurora_s_branding_38b62b2f');
        },
        active: true,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.email_automation_d5ae589e');
        },
        active: false,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.custom_fields_d1f86d52');
        },
        active: false,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.pro_templates_377c3fa8');
        },
        active: false,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.export_leads_and_reports_f5b51ca5');
        },
        active: false,
      },
    ],
    tableFeatures: [
      {
        category: 'Core Features',
        features: [
          {
            id: 1,
            get title() {
              return i18n.t('ui.data.pricing.unlimited_leads_922252e7');
            },
            active: true,
          },
          {
            id: 2,
            get title() {
              return i18n.t('ui.data.pricing.unlimited_emails_5a234119');
            },
            active: true,
          },
          {
            id: 3,
            get title() {
              return i18n.t('ui.data.pricing.no_aurora_s_branding_38b62b2f');
            },
            active: true,
          },
        ],
      },
      {
        category: 'Advanced Features',
        features: [
          {
            id: 1,
            get title() {
              return i18n.t('ui.data.pricing.email_automation_d5ae589e');
            },
            active: false,
          },
          {
            id: 2,
            get title() {
              return i18n.t('ui.data.pricing.custom_fields_d1f86d52');
            },
            active: false,
          },
          {
            id: 3,
            get title() {
              return i18n.t('ui.data.pricing.pro_templates_377c3fa8');
            },
            active: false,
          },
          {
            id: 4,
            get title() {
              return i18n.t('ui.data.pricing.export_leads_and_reports_f5b51ca5');
            },
            active: false,
          },
        ],
      },
      {
        category: 'Pro Features',
        features: [
          {
            id: 1,
            get title() {
              return i18n.t('ui.data.pricing.advanced_reporting_aad563ea');
            },
            active: false,
          },
          {
            id: 2,
            get title() {
              return i18n.t('ui.data.pricing.priority_customer_support_60383815');
            },
            active: false,
          },
          {
            id: 3,
            get title() {
              return i18n.t('ui.data.pricing.custom_branding_438ee422');
            },
            active: false,
          },
          {
            id: 4,
            get title() {
              return i18n.t('ui.data.pricing.dedicated_account_manager_21926cc0');
            },
            active: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    get label() {
      return i18n.t('ui.data.pricing.best_value_8173c2a9');
    },
    image: {
      light: pro,
      dark: proDark,
    },
    columnTitle: 'Pricing Pro',
    tableTitle: 'Pro',
    price: {
      monthly: 14.99,
      yearly: 149.99,
    },
    recommended: true,
    features: [
      {
        get title() {
          return i18n.t('ui.data.pricing.unlimited_leads_922252e7');
        },
        active: true,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.unlimited_emails_5a234119');
        },
        active: true,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.no_aurora_s_branding_38b62b2f');
        },
        active: true,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.email_automation_d5ae589e');
        },
        active: true,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.custom_fields_d1f86d52');
        },
        active: true,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.pro_templates_377c3fa8');
        },
        active: false,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.export_leads_and_reports_f5b51ca5');
        },
        active: false,
      },
    ],
    tableFeatures: [
      {
        category: 'Core Features',
        features: [
          {
            id: 1,
            get title() {
              return i18n.t('ui.data.pricing.unlimited_leads_922252e7');
            },
            active: true,
          },
          {
            id: 2,
            get title() {
              return i18n.t('ui.data.pricing.unlimited_emails_5a234119');
            },
            active: true,
          },
          {
            id: 3,
            get title() {
              return i18n.t('ui.data.pricing.no_aurora_s_branding_38b62b2f');
            },
            active: true,
          },
        ],
      },
      {
        category: 'Advanced Features',
        features: [
          {
            id: 1,
            get title() {
              return i18n.t('ui.data.pricing.email_automation_d5ae589e');
            },
            active: true,
          },
          {
            id: 2,
            get title() {
              return i18n.t('ui.data.pricing.custom_fields_d1f86d52');
            },
            active: false,
          },
          {
            id: 3,
            get title() {
              return i18n.t('ui.data.pricing.pro_templates_377c3fa8');
            },
            active: false,
          },
          {
            id: 4,
            get title() {
              return i18n.t('ui.data.pricing.export_leads_and_reports_f5b51ca5');
            },
            active: false,
          },
        ],
      },
      {
        category: 'Pro Features',
        features: [
          {
            id: 1,
            get title() {
              return i18n.t('ui.data.pricing.advanced_reporting_aad563ea');
            },
            active: true,
          },
          {
            id: 2,
            get title() {
              return i18n.t('ui.data.pricing.priority_customer_support_60383815');
            },
            active: true,
          },
          {
            id: 3,
            get title() {
              return i18n.t('ui.data.pricing.custom_branding_438ee422');
            },
            active: true,
          },
          {
            id: 4,
            get title() {
              return i18n.t('ui.data.pricing.dedicated_account_manager_21926cc0');
            },
            active: true,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    image: {
      light: saver,
      dark: saverDark,
    },
    columnTitle: 'Pricing Saver',
    tableTitle: 'Bundle',
    price: {
      monthly: 24.99,
      yearly: 249.99,
    },
    features: [
      {
        get title() {
          return i18n.t('ui.data.pricing.unlimited_leads_922252e7');
        },
        active: true,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.unlimited_emails_5a234119');
        },
        active: true,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.no_aurora_s_branding_38b62b2f');
        },
        active: true,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.email_automation_d5ae589e');
        },
        active: true,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.custom_fields_d1f86d52');
        },
        active: true,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.pro_templates_377c3fa8');
        },
        active: true,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.export_leads_and_reports_f5b51ca5');
        },
        active: true,
      },
    ],
    tableFeatures: [
      {
        category: 'Core Features',
        features: [
          {
            id: 1,
            get title() {
              return i18n.t('ui.data.pricing.unlimited_leads_922252e7');
            },
            active: true,
          },
          {
            id: 2,
            get title() {
              return i18n.t('ui.data.pricing.unlimited_emails_5a234119');
            },
            active: true,
          },
          {
            id: 3,
            get title() {
              return i18n.t('ui.data.pricing.no_aurora_s_branding_38b62b2f');
            },
            active: true,
          },
        ],
      },
      {
        category: 'Advanced Features',
        features: [
          {
            id: 1,
            get title() {
              return i18n.t('ui.data.pricing.email_automation_d5ae589e');
            },
            active: true,
          },
          {
            id: 2,
            get title() {
              return i18n.t('ui.data.pricing.custom_fields_d1f86d52');
            },
            active: true,
          },
          {
            id: 3,
            get title() {
              return i18n.t('ui.data.pricing.pro_templates_377c3fa8');
            },
            active: true,
          },
          {
            id: 4,
            get title() {
              return i18n.t('ui.data.pricing.export_leads_and_reports_f5b51ca5');
            },
            active: true,
          },
        ],
      },
      {
        category: 'Pro Features',
        features: [
          {
            id: 1,
            get title() {
              return i18n.t('ui.data.pricing.advanced_reporting_aad563ea');
            },
            active: false,
          },
          {
            id: 2,
            get title() {
              return i18n.t('ui.data.pricing.priority_customer_support_60383815');
            },
            active: false,
          },
          {
            id: 3,
            get title() {
              return i18n.t('ui.data.pricing.custom_branding_438ee422');
            },
            active: false,
          },
          {
            id: 4,
            get title() {
              return i18n.t('ui.data.pricing.dedicated_account_manager_21926cc0');
            },
            active: false,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    image: {
      light: industry,
      dark: industryDark,
    },
    columnTitle: 'Pricing Industry',
    tableTitle: 'Industry',
    price: {
      monthly: 49.99,
      yearly: 449.99,
    },
    features: [
      {
        get title() {
          return i18n.t('ui.data.pricing.unlimited_leads_922252e7');
        },
        active: true,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.unlimited_emails_5a234119');
        },
        active: true,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.no_aurora_s_branding_38b62b2f');
        },
        active: true,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.email_automation_d5ae589e');
        },
        active: true,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.custom_fields_d1f86d52');
        },
        active: true,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.pro_templates_377c3fa8');
        },
        active: true,
      },
      {
        get title() {
          return i18n.t('ui.data.pricing.export_leads_and_reports_f5b51ca5');
        },
        active: true,
      },
    ],
    tableFeatures: [
      {
        category: 'Core Features',
        features: [
          {
            id: 1,
            get title() {
              return i18n.t('ui.data.pricing.unlimited_leads_922252e7');
            },
            active: true,
          },
          {
            id: 2,
            get title() {
              return i18n.t('ui.data.pricing.unlimited_emails_5a234119');
            },
            active: true,
          },
          {
            id: 3,
            get title() {
              return i18n.t('ui.data.pricing.no_aurora_s_branding_38b62b2f');
            },
            active: true,
          },
        ],
      },
      {
        category: 'Advanced Features',
        features: [
          {
            id: 1,
            get title() {
              return i18n.t('ui.data.pricing.email_automation_d5ae589e');
            },
            active: true,
          },
          {
            id: 2,
            get title() {
              return i18n.t('ui.data.pricing.custom_fields_d1f86d52');
            },
            active: true,
          },
          {
            id: 3,
            get title() {
              return i18n.t('ui.data.pricing.pro_templates_377c3fa8');
            },
            active: true,
          },
          {
            id: 4,
            get title() {
              return i18n.t('ui.data.pricing.export_leads_and_reports_f5b51ca5');
            },
            active: true,
          },
        ],
      },
      {
        category: 'Pro Features',
        features: [
          {
            id: 1,
            get title() {
              return i18n.t('ui.data.pricing.advanced_reporting_aad563ea');
            },
            active: true,
          },
          {
            id: 2,
            get title() {
              return i18n.t('ui.data.pricing.priority_customer_support_60383815');
            },
            active: true,
          },
          {
            id: 3,
            get title() {
              return i18n.t('ui.data.pricing.custom_branding_438ee422');
            },
            active: true,
          },
          {
            id: 4,
            get title() {
              return i18n.t('ui.data.pricing.dedicated_account_manager_21926cc0');
            },
            active: true,
          },
        ],
      },
    ],
  },
];
