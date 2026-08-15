import { initialConfig } from 'config';
import { users } from 'data/users';
import i18n from 'locales/i18n';
import { products } from './products';

const image = (index) => `${initialConfig.assetsDir}/images/ecommerce/products/${index}.webp`;

export const trackOrdersList = [
  {
    id: 1,
    image: image(3),
    status: 'Delivered',
    url: '#!',
  },
  {
    id: 2,
    image: image(4),
    status: 'Pending',
    url: '#!',
  },
  {
    id: 3,
    image: image(5),
    status: 'Cancelled',
    url: '#!',
  },
];

export const customerInfo = {
  name: 'Captain Haddock',
  avatar: users[7].avatar,
  isStarMember: true,
  contactInfo: {
    email: 'anyname@email.com',
    phone: '+12514463453',
    address: {
      shipping: 'Apt: 6/B, 192 Edsel Road, Van Nuys, California, USA 96580',
      billing: 'Apt: 6/B, 192 Edsel Road, Van Nuys, California, USA 96580',
      billingAddressSameAsShipping: true,
    },
  },
  conversations: [
    {
      id: 1,
      icon: 'material-symbols:orders-outline-rounded',
      get message() {
        return i18n.t('ui.data.e_commerce.customeraccount.this_is_their_4th_order_ed4fc842');
      },
    },
    {
      id: 2,
      icon: 'material-symbols:looks-one-outline-rounded',
      get message() {
        return i18n.t(
          'ui.data.e_commerce.customeraccount.1st_visit_was_direct_to_your_store_ba94927a',
        );
      },
    },
    {
      id: 3,
      icon: 'material-symbols:storefront-outline-rounded',
      get message() {
        return i18n.t('ui.data.e_commerce.customeraccount.13_visits_over_4_days_4ba8853f');
      },
    },
  ],
  stats: {
    wishlist: 5,
    favourites: 24,
    vouchers: 3,
    toPay: 0,
    toShip: 0,
    toReceive: 2,
    toReview: 1,
  },
  orderTracks: [
    {
      product: products[0],
      status: 'delivered',
    },
    {
      product: products[1],
      status: 'out_for_delivery',
    },
    {
      product: products[2],
      status: 'shipped',
    },
  ],
};

export const summaryList = [
  {
    id: 1,
    get label() {
      return i18n.t('ui.data.e_commerce.customeraccount.wishlist_6ff33102');
    },
    icon: 'material-symbols:favorite-outline-rounded',
    url: '#!',
  },
  {
    id: 2,
    get label() {
      return i18n.t('ui.data.e_commerce.customeraccount.favourites_e6ccc0fd');
    },
    icon: 'material-symbols:store-outline-rounded',
    url: '#!',
  },
  {
    id: 3,
    get label() {
      return i18n.t('ui.data.e_commerce.customeraccount.vouchers_ffaa62ec');
    },
    icon: 'material-symbols:sell-outline',
    url: '#!',
  },
];

export const customerServices = [
  {
    id: 1,
    get label() {
      return i18n.t('ui.data.e_commerce.customeraccount.login_security_f6cf96a8');
    },
    icon: 'material-symbols:lock-outline',
    url: '#!',
  },
  {
    id: 2,
    get label() {
      return i18n.t('ui.data.e_commerce.customeraccount.gift_cards_b65882d3');
    },
    icon: 'material-symbols:redeem-rounded',
    url: '#!',
  },
  {
    id: 3,
    get label() {
      return i18n.t('ui.data.e_commerce.customeraccount.my_payments_5f5c638c');
    },
    icon: 'material-symbols:payments-outline-rounded',
    url: '#!',
  },
  {
    id: 4,
    get label() {
      return i18n.t('ui.data.e_commerce.customeraccount.digital_support_7849a1ed');
    },
    icon: 'material-symbols:support',
    url: '#!',
  },
  {
    id: 5,
    get label() {
      return i18n.t('ui.data.e_commerce.customeraccount.my_messages_d04104be');
    },
    icon: 'material-symbols:chat-outline-rounded',
    url: '#!',
  },
  {
    id: 6,
    get label() {
      return i18n.t('ui.data.e_commerce.customeraccount.my_lists_dc1d2989');
    },
    icon: 'material-symbols:list-rounded',
    url: '#!',
  },
  {
    id: 7,
    get label() {
      return i18n.t('ui.data.e_commerce.customeraccount.customer_service_1d0c9a65');
    },
    icon: 'material-symbols:support-agent-rounded',
    url: '#!',
  },
];

export const orderStatusList = [
  {
    id: 1,
    get label() {
      return i18n.t('ui.data.e_commerce.customeraccount.to_pay_58d1265e');
    },
    icon: 'material-symbols:credit-card-outline',
    count: 0,
    url: '#!',
  },
  {
    id: 2,
    get label() {
      return i18n.t('ui.data.e_commerce.customeraccount.to_ship_fbd8eebc');
    },
    icon: 'material-symbols:local-shipping-outline-rounded',
    count: 0,
    url: '#!',
  },
  {
    id: 3,
    get label() {
      return i18n.t('ui.data.e_commerce.customeraccount.to_receive_3184f080');
    },
    icon: 'material-symbols:package-2-outline',
    count: 2,
    url: '#!',
  },
  {
    id: 4,
    get label() {
      return i18n.t('ui.data.e_commerce.customeraccount.to_review_066f77ce');
    },
    icon: 'material-symbols:reviews-outline-rounded',
    count: 0,
    url: '#!',
  },
];
