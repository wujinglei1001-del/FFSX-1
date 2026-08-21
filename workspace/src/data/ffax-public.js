import { initialConfig } from 'config';
import i18n from 'locales/i18n';
import paths, { publicAuthPaths } from 'routes/paths';

const screenshot = (index) => `${initialConfig.assetsDir}/images/showcase/${index}.webp`;
const video = (name) => `${initialConfig.assetsDir}/videos/showcase/${name}.webm`;

export const publicShowcaseAssets = {
  hero: {
    video: video('beam'),
    planet: screenshot(16),
  },
};

export const publicNavItems = [
  {
    get label() {
      return i18n.t('ffax.public.navigation.about');
    },
    href: paths.landingAbout,
  },
  {
    get label() {
      return i18n.t('ffax.public.navigation.register');
    },
    href: publicAuthPaths.signup,
  },
  {
    get label() {
      return i18n.t('ffax.public.navigation.free_account');
    },
    href: publicAuthPaths.signup,
  },
  {
    get label() {
      return i18n.t('ffax.public.navigation.subscriptions');
    },
    href: paths.landingSubscriptions,
  },
];

export const publicFooterNavItems = [
  {
    get label() {
      return i18n.t('ffax.public.navigation.contact');
    },
    to: paths.landingContact,
  },
  {
    get label() {
      return i18n.t('ffax.public.navigation.faq');
    },
    to: paths.landingFaq,
  },
  {
    get label() {
      return i18n.t('ffax.public.navigation.about');
    },
    to: paths.landingAbout,
  },
];
