import { initialConfig } from 'config';
import i18n from 'locales/i18n';
import paths from 'routes/paths';

const screenshot = (index) => `${initialConfig.assetsDir}/images/showcase/${index}.webp`;
const video = (name) => `${initialConfig.assetsDir}/videos/showcase/${name}.webm`;

export const showcaseAssets = {
  hero: {
    video: video('beam'),
    planet: screenshot(16),
  },
  customizeLayout: {
    dark: screenshot(1),
    light: screenshot(2),
  },
  prefixedLayout: {
    dark: screenshot(3),
    light: screenshot(4),
    illustrations: [screenshot(17), screenshot(18)],
  },
  elegantCards: [screenshot(5), screenshot(6), screenshot(7), screenshot(8)],
  webApps: {
    apps: [screenshot(9), screenshot(10), screenshot(11), screenshot(12), screenshot(13)],
    illustrations: [screenshot(19)],
  },
  figmaCTA: [screenshot(14), screenshot(15)],
};

export const preloadAssets = [
  screenshot(16),
  video('beam'),
  screenshot(1),
  screenshot(2),
  screenshot(3),
  screenshot(4),
];

export const figmaPreviewLink =
  'https://www.figma.com/design/OsomtrWKKBgiWvASVVqnIh/Aurora_-Preview--v2.2.0-?node-id=201-89946&t=CsVyE0sFpqpGSqWW-1';

export const navItems = [
  {
    get label() {
      return i18n.t('ui.data.showcase.documentation_9e9cf322');
    },
    href: 'https://aurora.themewagon.com/documentation/getting-started',
  },
  {
    get label() {
      return i18n.t('ui.data.showcase.support_f32d5a3b');
    },
    href: 'mailto:support@themewagon.com',
  },
  {
    get label() {
      return i18n.t('ui.data.showcase.hire_us_6b2e944f');
    },
    href: 'https://themewagon.com/hire-us/',
  },
];

export const footerNavItems = [
  {
    get label() {
      return i18n.t('ui.data.showcase.support_f32d5a3b');
    },
    to: 'mailto:support@themewagon.com',
  },
  {
    get label() {
      return i18n.t('ui.data.showcase.documentations_63673c36');
    },
    to: 'https://aurora.themewagon.com/documentation/getting-started',
  },
  {
    get label() {
      return i18n.t('ui.data.showcase.changelog_164b3d48');
    },
    to: 'https://aurora.themewagon.com/documentation/changelog',
  },
];

export const layoutConfigs = [
  {
    fieldname: 'sidenavShape',
    get title() {
      return i18n.t('ui.data.showcase.sidenav_shape_61ea250d');
    },
    options: [
      {
        value: 'default',
        get label() {
          return i18n.t('ui.data.showcase.default_808d7dca');
        },
      },
      {
        value: 'slim',
        get label() {
          return i18n.t('ui.data.showcase.slim_5ee371a1');
        },
      },
      {
        value: 'stacked',
        get label() {
          return i18n.t('ui.data.showcase.stacked_9eafca46');
        },
      },
    ],
  },
  {
    fieldname: 'layout',
    get title() {
      return i18n.t('ui.data.showcase.layout_972ad8d8');
    },
    options: [
      {
        value: 'combo',
        get label() {
          return i18n.t('ui.data.showcase.combo_dcae5862');
        },
      },
      {
        value: 'sidenav',
        get label() {
          return i18n.t('ui.data.showcase.sidenav_0b22dd7d');
        },
      },
      {
        value: 'topnav',
        get label() {
          return i18n.t('ui.data.showcase.topnav_f1732fb1');
        },
      },
    ],
  },
  {
    fieldname: 'topnavShape',
    get title() {
      return i18n.t('ui.data.showcase.topnav_shape_5378944c');
    },
    options: [
      {
        value: 'default',
        get label() {
          return i18n.t('ui.data.showcase.default_808d7dca');
        },
      },
      {
        value: 'slim',
        get label() {
          return i18n.t('ui.data.showcase.slim_5ee371a1');
        },
      },
      {
        value: 'stacked',
        get label() {
          return i18n.t('ui.data.showcase.stacked_9eafca46');
        },
      },
    ],
  },
];

export const prefixedLayouts = [
  {
    get title() {
      return i18n.t('ui.data.showcase.combo_default_54666e04');
    },
    link: `${paths.ecommerce}?navigationMenuType=combo&sidenavType=default&topnavType=default`,
  },
  {
    title: 'RTL',
    link: `${paths.project}?textDirection=rtl`,
  },
  {
    get title() {
      return i18n.t('ui.data.showcase.topnav_default_5d0a7d1b');
    },
    link: `${paths.crm}?navigationMenuType=topnav&topnavType=default`,
  },
  {
    get title() {
      return i18n.t('ui.data.showcase.sidenav_slim_9f3ea0b9');
    },
    link: `${paths.analytics}?navigationMenuType=sidenav&sidenavType=slim`,
  },
  {
    get title() {
      return i18n.t('ui.data.showcase.topnav_stacked_0166f5cc');
    },
    link: `${paths.hrm}?navigationMenuType=topnav&topnavType=stacked`,
  },
  {
    get title() {
      return i18n.t('ui.data.showcase.vibrant_sidenav_d92d6cbf');
    },
    link: `${paths.timeTracker}?navigationMenuType=sidenav&navColor=vibrant`,
  },
];

export const webApps = [
  {
    get title() {
      return i18n.t('ui.data.showcase.e_commerce_d19533b9');
    },
    link: `${paths.ecommerceHomepage}?defaultConfigs=true`,
  },
  {
    get title() {
      return i18n.t('ui.data.showcase.kanban_38955467');
    },
    link: `${paths.kanban}?defaultConfigs=true`,
  },
  {
    get title() {
      return i18n.t('ui.data.showcase.calendar_adab5090');
    },
    link: `${paths.calendar}?defaultConfigs=true`,
  },
  {
    get title() {
      return i18n.t('ui.data.showcase.chat_2ced57f1');
    },
    link: `${paths.chat}?defaultConfigs=true`,
  },
  {
    title: 'CRM',
    link: `${paths.deals}?defaultConfigs=true`,
  },
];
