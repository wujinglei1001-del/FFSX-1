import { initialConfig } from 'config';
import i18n from 'locales/i18n';

export const cart = [
  {
    id: 1,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.cart.vingli_56_modern_sofa_small_corduroy_couch_deep_seat_ce3c5079',
      );
    },
    image: `${initialConfig.assetsDir}/images/ecommerce/products/96x96/1.webp`,
    stock: 5,
    price: {
      regular: 1600,
      discounted: 1000,
    },
  },
  {
    id: 2,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.cart.vingli_56_modern_sofa_small_corduroy_couch_deep_seat_ce3c5079',
      );
    },
    image: `${initialConfig.assetsDir}/images/ecommerce/products/96x96/1.webp`,
    stock: 4,
    price: {
      regular: 1600,
      discounted: 1000,
    },
  },
  {
    id: 3,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.cart.vingli_56_modern_sofa_small_corduroy_couch_deep_seat_ce3c5079',
      );
    },
    image: `${initialConfig.assetsDir}/images/ecommerce/products/96x96/1.webp`,
    stock: 10,
    price: {
      regular: 1600,
      discounted: 1000,
    },
  },
];
