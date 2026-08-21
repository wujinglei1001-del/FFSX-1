import i18n from 'locales/i18n';
import paths, { rootPaths, workbenchEntryPath } from 'routes/paths';

const publicSitemap = [
  {
    id: 'ffax-public',
    get subheader() {
      return i18n.t('ffax.public.footer.brand');
    },
    items: [
      {
        get name() {
          return i18n.t('ffax.public.navigation.home');
        },
        key: 'home',
        path: rootPaths.root,
        icon: 'material-symbols:home-outline-rounded',
        active: true,
      },
      {
        get name() {
          return i18n.t('ffax.public.navigation.about');
        },
        key: 'about',
        path: paths.landingAbout,
        icon: 'material-symbols:info-outline-rounded',
        active: true,
      },
      {
        get name() {
          return i18n.t('ffax.public.navigation.contact');
        },
        key: 'contact',
        path: paths.landingContact,
        icon: 'material-symbols:contact-support-outline-rounded',
        active: true,
      },
      {
        get name() {
          return i18n.t('ffax.public.navigation.faq');
        },
        key: 'faq',
        path: paths.landingFaq,
        icon: 'material-symbols:help-outline-rounded',
        active: true,
      },
      {
        get name() {
          return i18n.t('ffax.public.navigation.workbench');
        },
        key: 'workbench',
        path: workbenchEntryPath,
        icon: 'material-symbols:apps-rounded',
        active: true,
        external: true,
      },
    ],
  },
];

export default publicSitemap;
