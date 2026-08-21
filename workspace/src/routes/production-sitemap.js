import i18n from 'locales/i18n';
import paths, { workbenchEntryPath } from 'routes/paths';

const productionSitemap = [
  {
    id: 'ffax',
    subheader: 'FFA-X',
    key: 'ffax.public.footer.brand',
    icon: 'material-symbols:apps-rounded',
    items: [
      {
        get name() {
          return i18n.t('ffax.navigation.workbench');
        },
        key: 'workbench',
        path: workbenchEntryPath,
        pathName: 'workbench',
        icon: 'material-symbols:apps-rounded',
        active: true,
      },
      {
        get name() {
          return i18n.t('ffax.navigation.notifications');
        },
        key: 'notifications',
        path: paths.notifications,
        pathName: 'notifications',
        icon: 'material-symbols:notifications-outline-rounded',
        active: true,
      },
    ],
  },
];

export default productionSitemap;
