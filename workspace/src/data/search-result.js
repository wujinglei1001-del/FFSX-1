import { initialConfig } from 'config';
import i18n from 'locales/i18n';
import { users } from './users';

export const files = [
  {
    name: 'aurora_test17.zip',
    path: ':: files / New folder / aurora /',
    icon: 'material-symbols:folder-zip-outline-rounded',
  },
  {
    name: 'Product image(11).webp',
    path: ':: files / ... / assets /',
    image: `${initialConfig.assetsDir}/images/ecommerce/products/96x96/3.webp`,
  },
  {
    get name() {
      return i18n.t(
        'ui.data.search_result.how_to_not_click_on_perfectly_innocent_looking_links_ab207acf',
      );
    },
    path: ':: files / Download /',
    icon: 'material-symbols:picture-as-pdf-outline-rounded',
  },
];

export const contacts = [
  {
    name: 'Gojo Satoru',
    avatar: users[11].avatar,
  },
  {
    name: 'Nanami Kento',
    avatar: users[4].avatar,
    disabled: true,
  },
  {
    name: 'Kugisaki Nobara',
    avatar: users[3].avatar,
  },
  {
    name: 'Zenin Maki',
    avatar: users[14].avatar,
  },
  {
    name: 'Todo Aoi',
    avatar: users[8].avatar,
  },
];

export const tags = [
  'Calender',
  'Starter',
  'Back',
  'Procrastination',
  'Support',
  'Ideate',
  'Brainstorm',
  'How Might We',
];

export const breadcrumbs = [
  [
    {
      get label() {
        return i18n.t('ui.data.search_result.app_fc4a695f');
      },
      href: '#!',
    },
    {
      get label() {
        return i18n.t('ui.data.search_result.e_commerce_c991b729');
      },
      href: '#!',
    },
    {
      get label() {
        return i18n.t('ui.data.search_result.customers_035eae60');
      },
      href: '#!',
    },
    {
      get label() {
        return i18n.t('ui.data.search_result.create_new_54770339');
      },
      href: '#!',
      active: true,
    },
  ],
  [
    {
      get label() {
        return i18n.t('ui.data.search_result.homepage_ac066591');
      },
      href: '#!',
    },
    {
      get label() {
        return i18n.t('ui.data.search_result.e_commerce_c991b729');
      },
      href: '#!',
      active: true,
    },
  ],
  [
    {
      get label() {
        return i18n.t('ui.data.search_result.pages_600584c2');
      },
      href: '#!',
    },
    {
      get label() {
        return i18n.t('ui.data.search_result.starter_438226dc');
      },
      href: '#!',
      active: true,
    },
  ],
];

export default {
  files,
  contacts,
  tags,
  breadcrumbs,
};
