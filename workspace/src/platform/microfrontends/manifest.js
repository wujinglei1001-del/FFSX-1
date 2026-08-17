export const MICRO_APPS = {
  marketplace: {
    name: 'ffax-marketplace',
    productionEntry: '/workbench/microapps/marketplace/',
    developmentEntry: import.meta.env.VITE_MARKETPLACE_MICROAPP_URL || 'http://localhost:7101',
  },
  community: {
    name: 'ffax-community',
    productionEntry: '/workbench/microapps/community/',
    developmentEntry: import.meta.env.VITE_COMMUNITY_MICROAPP_URL || 'http://localhost:7102',
  },
  plugins: {
    name: 'ffax-plugins',
    productionEntry: '/workbench/microapps/plugins/',
    developmentEntry: import.meta.env.VITE_PLUGINS_MICROAPP_URL || 'http://localhost:7103',
  },
};

export const getMicroAppEntry = (app) =>
  import.meta.env.DEV ? app.developmentEntry : app.productionEntry;
