import { initialConfig } from 'config';
import { users } from 'data/users';
import i18n from 'locales/i18n';

const image = (index) => `${initialConfig.assetsDir}/images/ecommerce/products/96x96/${index}.webp`;

export const topProducts = [
  {
    id: 1,
    product: {
      name: 'Shanty Cotton Seat',
      image: image(1),
    },
    vendors: [users[2], users[7], users[15]],
    margin: 981.0,
    sold: 29536,
    stock: 'In Stock',
  },
  {
    id: 2,
    product: {
      name: 'Practical Soft Couch',
      image: image(2),
    },
    vendors: [users[6], users[11], users[7], users[13]],
    margin: 199,
    sold: 27700,
    stock: 'In Stock',
  },
  {
    id: 3,
    product: {
      name: 'Rustic Rubber Chair',
      image: image(3),
    },
    vendors: [users[4], users[3], users[5], users[14], users[1], users[2]],
    margin: 609,
    sold: 21778,
    stock: 'Low Stock',
  },
  {
    id: 4,
    product: {
      name: 'Ergonomic Frozen Bacon',
      image: image(4),
    },
    vendors: [users[6], users[5], users[11], users[15]],
    margin: 923,
    sold: 20272,
    stock: 'In Stock',
  },
  {
    id: 5,
    product: {
      name: 'Unbranded Metal Sofa',
      image: image(5),
    },
    vendors: [users[12], users[1]],
    margin: 119,
    sold: 17374,
    stock: 'In Stock',
  },
  {
    id: 6,
    product: {
      name: 'Intelligent Soft Sofa',
      image: image(6),
    },
    vendors: [users[1], users[2], users[3]],
    margin: 595,
    sold: 14374,
    stock: 'Low Stock',
  },
  {
    id: 7,
    product: {
      name: 'Handmade Cotton Chair',
      image: image(7),
    },
    vendors: [users[2], users[3], users[13], users[14], users[15], users[12]],
    margin: 472,
    sold: 12084,
    stock: 'Stockout',
  },
  {
    id: 8,
    product: {
      name: 'Fantastic Rubber Chair',
      image: image(8),
    },
    vendors: [users[2], users[7], users[15]],
    margin: 98,
    sold: 48604,
    stock: 'In Stock',
  },
  {
    id: 9,
    product: {
      name: 'Generic Steel Divan',
      image: image(9),
    },
    vendors: [users[10], users[13], users[5], users[11], users[12], users[13]],
    margin: 931,
    sold: 2329,
    stock: 'In Stock',
  },
  {
    id: 10,
    product: {
      name: 'Handmade Beanbag',
      image: image(10),
    },
    vendors: [users[10], users[2]],
    margin: 5300,
    sold: 70946,
    stock: 'Low Stock',
  },
  {
    id: 11,
    product: {
      name: 'Practical Metal Sofa',
      image: image(11),
    },
    vendors: [users[4], users[3], users[13], users[14], users[15], users[11]],
    margin: 282,
    sold: 57682,
    stock: 'In Stock',
  },
  {
    id: 12,
    product: {
      name: 'Advanced Soft Couch',
      image: image(12),
    },
    vendors: [users[15], users[10], users[7], users[9]],
    margin: 427,
    sold: 32587,
    stock: 'Low Stock',
  },
];

export const generatedRevenueData = {
  currentYear: [
    200000, 120000, 160000, 140000, 260000, 160000, 175000, 180000, 110000, 130000, 80000, 160000,
    160000, 150000, 90000,
  ],
  lastYear: [
    100000, 150000, 95000, 95000, 98000, 140000, 130000, 150000, 150000, 160000, 255000, 140000,
    140000, 160000, 160000,
  ],
};

export const storages = [
  {
    get label() {
      return i18n.t('ui.data.e_commerce.dashboard.bed_1a706e23');
    },
    value: 20,
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.dashboard.table_0424f6e7');
    },
    value: 30,
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.dashboard.couch_80ada11a');
    },
    value: 40,
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.dashboard.unoccupied_ac9f27ad');
    },
    value: 10,
  },
];

export const clientLocations = [
  {
    name: 'Japan',
    value: 44000,
  },
  {
    name: 'Greenland',
    value: 41000,
  },
  {
    name: 'India',
    value: 38000,
  },
  {
    name: 'Egypt',
    value: 27000,
  },
  {
    name: 'Mexico',
    value: 19000,
  },
  {
    name: 'Angola',
    value: 13000,
  },
  {
    name: 'Colombia',
    value: 11000,
  },
  {
    name: 'Finland',
    value: 7000,
  },
];

export const visitorRevenueChartData = {
  currentYear: [600, 400, 530, 210, 300, 400, 600],
  lastYear: [500, 480, 200, 250, 250, 280, 280],
};

export const monthlyProfitChartData = {
  currentYear: [0, 400, 250, 300, 80, 600],
  lastYear: [100, 250, 150, 200, 400, 250],
};

export const promoSliderData = [
  {
    get title() {
      return i18n.t('ui.data.e_commerce.dashboard.grow_your_store_confidently_4cb9295a');
    },
    get subtitle() {
      return i18n.t(
        'ui.data.e_commerce.dashboard.access_advanced_tools_and_proven_strategies_to_grow__633fa63c',
      );
    },
    buttonText: 'Upgrade Now',
    buttonLink: '#!',
    imageKey: 'rocket',
  },
  {
    get title() {
      return i18n.t('ui.data.e_commerce.dashboard.smarter_selling_with_ai_tools_ba675a37');
    },
    get subtitle() {
      return i18n.t(
        'ui.data.e_commerce.dashboard.automate_tasks_reply_instantly_and_gain_helpful_insi_5bf50c7d',
      );
    },
    buttonText: 'Explore AI',
    buttonLink: '#!',
    imageKey: 'aiTools',
  },
  {
    get title() {
      return i18n.t('ui.data.e_commerce.dashboard.priority_help_anytime_e7c6411e');
    },
    get subtitle() {
      return i18n.t(
        'ui.data.e_commerce.dashboard.receive_quicker_responses_and_dedicated_support_for__936ae5bc',
      );
    },
    buttonText: 'Learn More',
    buttonLink: '#!',
    imageKey: 'customer',
  },
];
