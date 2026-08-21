import i18n from 'locales/i18n';

const createItem = (category, item, id) => ({
  id,
  get question() {
    return i18n.t(`ffax.faq.categories.${category}.items.${item}.question`);
  },
  get answer() {
    return i18n.t(`ffax.faq.categories.${category}.items.${item}.answer`);
  },
});

const createCategory = ({ id, icon, color, items, isPopular = false }) => ({
  id,
  get title() {
    return i18n.t(`ffax.faq.categories.${id}.title`);
  },
  get description() {
    return i18n.t(`ffax.faq.categories.${id}.description`);
  },
  avatar: { icon, color },
  isPopular,
  items: items.map((item, index) => createItem(id, item, index + 1)),
});

export const ffaxFaqCategories = [
  createCategory({
    id: 'platform',
    icon: 'material-symbols:hub-outline-rounded',
    color: 'success',
    isPopular: true,
    items: ['overview', 'participants', 'ai', 'modules'],
  }),
  createCategory({
    id: 'access',
    icon: 'material-symbols:verified-user-outline-rounded',
    color: 'primary',
    isPopular: true,
    items: ['login', 'protection', 'roles', 'logout'],
  }),
  createCategory({
    id: 'connections',
    icon: 'material-symbols:lan-outline-rounded',
    color: 'info',
    isPopular: true,
    items: ['api', 'workspace', 'records', 'transactions'],
  }),
  createCategory({
    id: 'workbench',
    icon: 'material-symbols:dashboard-customize-outline-rounded',
    color: 'warning',
    isPopular: true,
    items: ['navigation', 'responsive', 'themes', 'languages'],
  }),
];
