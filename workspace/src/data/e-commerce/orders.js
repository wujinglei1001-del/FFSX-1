import { users } from 'data/users';
import dayjs from 'dayjs';
import i18n from 'locales/i18n';
import { customerInfo } from './customerAccount';
import { products } from './products';

export const orderActivities = [
  {
    id: 1,
    get content() {
      return i18n.t('ui.data.e_commerce.orders.this_product_was_archived_5d665f22');
    },
    createdAt: dayjs().toDate(),
  },
  {
    id: 2,
    get content() {
      return i18n.t('ui.data.e_commerce.orders.you_fulfilled_1_item_c482f6d4');
    },
    createdAt: dayjs().toDate(),
  },
  {
    id: 3,
    get content() {
      return i18n.t(
        'ui.data.e_commerce.orders.a_1454_50_payment_was_processed_on_bank_deposit_9ed489d8',
      );
    },
    createdAt: dayjs().subtract(23, 'h').toDate(),
  },
  {
    id: 4,
    get content() {
      return i18n.t(
        'ui.data.e_commerce.orders.order_confirmation_email_was_sent_to_customer_email__f4c5ab51',
      );
    },
    createdAt: dayjs().subtract(23, 'h').toDate(),
  },
  {
    id: 5,
    get content() {
      return i18n.t(
        'ui.data.e_commerce.orders.a_1454_50_payment_is_pending_on_bank_deposit_01402da2',
      );
    },
    createdAt: dayjs().subtract(23, 'h').toDate(),
  },
  {
    id: 6,
    get content() {
      return i18n.t('ui.data.e_commerce.orders.a_customer_placed_order_5562345234_059c3931');
    },
    createdAt: dayjs().subtract(23, 'h').toDate(),
  },
];

export const orderDetailsList = [
  {
    id: '#141135',
    items: [
      {
        ...products[4],
        status: 'Delivered',
        quantity: 2,
        variants: [
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.size_b7152342');
            },
            value: 'S',
          },
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.color_1d0c8304');
            },
            value: 'Black, White',
          },
        ],
        shopSku: '1680423523000_US-XYZ123',
        sellerSku: 'sofamodern',
        shippingAddress: 'Apt: 6/B, 192 Edsel Road, Van Nuys, California, USA 96580',
        billlingAddress: 'Apt: 6/B, 192 Edsel Road, Van Nuys, California, USA 96580',
        billingAddressSameAsShipping: true,
        vendor: 'Little Smile Ltd.',
        priorRefunds: {
          product: 350,
          shipping: 0,
          concession: 0,
        },
      },
      {
        ...products[0],
        status: 'Shipped',
        quantity: 3,
        variants: [
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.size_b7152342');
            },
            value: 'S',
          },
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.color_1d0c8304');
            },
            value: 'White Chocolate',
          },
        ],
        shopSku: '1680423523001_US-ABC456',
        sellerSku: 'chairclassic',
        shippingAddress: 'Apt: 6/B, 192 Edsel Road, Van Nuys, California, USA 96580',
        billlingAddress: 'Apt: 6/B, 192 Edsel Road, Van Nuys, California, USA 96580',
        billingAddressSameAsShipping: true,
        vendor: 'Milano Accent Decor',
        priorRefunds: {
          product: 0,
          shipping: 0,
          concession: 0,
        },
      },
      {
        ...products[1],
        status: 'Shipped',
        quantity: 1,
        variants: [
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.size_b7152342');
            },
            value: 'L',
          },
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.color_1d0c8304');
            },
            value: 'Chinese Black',
          },
        ],
        shopSku: '1680423523002_US-DEF789',
        sellerSku: 'tablevintage',
        shippingAddress: 'Apt: 6/B, 192 Edsel Road, Van Nuys, California, USA 96580',
        billlingAddress: 'Apt: 6/B, 192 Edsel Road, Van Nuys, California, USA 96580',
        billingAddressSameAsShipping: true,
        vendor: 'Fotobi Furniture',
        priorRefunds: {
          product: 0,
          shipping: 0,
          concession: 100,
        },
      },
    ],
    status: 'unfulfilled',
    payment: {
      subtotal: 1510,
      shippingCost: 4.49,
      discount: -60,
      total: 1454.5,
      status: 'Paid',
    },
    activities: orderActivities,
    customer: customerInfo,
    createdAt: '2024-02-24T20:03:00',
  },
  {
    id: '#345261',
    items: [
      {
        ...products[5],
        status: 'Processing',
        quantity: 1,
        variants: [
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.size_b7152342');
            },
            value: 'M',
          },
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.color_1d0c8304');
            },
            value: 'Navy Blue',
          },
        ],
        shippingAddress: 'Apt: 4/C, 321 Elm Street, San Francisco, California, USA 94110',
        billlingAddress: 'Apt: 4/C, 321 Elm Street, San Francisco, California, USA 94110',
        billingAddressSameAsShipping: true,
        vendor: 'California Style Co.',
        shopSku: '1680423523003_US-GHI012',
        sellerSku: 'bedluxury',
        priorRefunds: {
          product: 0,
          shipping: 0,
          concession: 0,
        },
      },
      {
        ...products[6],
        status: 'Pending',
        quantity: 1,
        variants: [
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.size_b7152342');
            },
            value: 'L',
          },
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.color_1d0c8304');
            },
            value: 'Red',
          },
        ],
        shippingAddress: 'Apt: 4/C, 321 Elm Street, San Francisco, California, USA 94110',
        billlingAddress: 'Apt: 4/C, 321 Elm Street, San Francisco, California, USA 94110',
        billingAddressSameAsShipping: true,
        vendor: 'Sunny Fashion Hub',
        shopSku: '1680423523004_US-JKL345',
        sellerSku: 'lamppremium',
        priorRefunds: {
          product: 0,
          shipping: 0,
          concession: 0,
        },
      },
      {
        ...products[7],
        status: 'Delivered',
        quantity: 2,
        variants: [
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.size_b7152342');
            },
            value: 'S',
          },
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.color_1d0c8304');
            },
            value: 'Green',
          },
        ],
        shippingAddress: 'Apt: 4/C, 321 Elm Street, San Francisco, California, USA 94110',
        billlingAddress: 'Apt: 4/C, 321 Elm Street, San Francisco, California, USA 94110',
        billingAddressSameAsShipping: true,
        vendor: 'Green Forest Wearables',
        shopSku: '1680423523005_US-MNO678',
        sellerSku: 'rugminimal',
        priorRefunds: {
          product: 0,
          shipping: 0,
          concession: 0,
        },
      },
      {
        ...products[8],
        status: 'Shipped',
        quantity: 1,
        variants: [
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.size_b7152342');
            },
            value: 'XL',
          },
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.color_1d0c8304');
            },
            value: 'Gray',
          },
        ],
        shippingAddress: 'Apt: 4/C, 321 Elm Street, San Francisco, California, USA 94110',
        billlingAddress: 'Apt: 4/C, 321 Elm Street, San Francisco, California, USA 94110',
        billingAddressSameAsShipping: true,
        vendor: 'Urban Outfitters',
        shopSku: '1680423523006_US-PQR901',
        sellerSku: 'shelfindustrial',
        priorRefunds: {
          product: 0,
          shipping: 0,
          concession: 0,
        },
      },
    ],
    status: 'fulfilled',
    payment: {
      subtotal: 1200,
      shippingCost: 7.99,
      discount: -30,
      total: 1177.99,
      status: 'Paid',
    },
    activities: orderActivities,
    customer: customerInfo,
    createdAt: '2024-03-12T14:30:00',
  },
  {
    id: '#126371',
    items: [
      {
        ...products[1],
        status: 'Processing',
        quantity: 1,
        variants: [
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.size_b7152342');
            },
            value: 'M',
          },
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.color_1d0c8304');
            },
            value: 'Black',
          },
        ],
        shippingAddress: '123 Oak Street, Dallas, Texas, USA 75201',
        billlingAddress: '123 Oak Street, Dallas, Texas, USA 75201',
        billingAddressSameAsShipping: true,
        vendor: 'Classic Wear Inc.',
        shopSku: '1680423523007_US-STU234',
        sellerSku: 'cabinetrustic',
        priorRefunds: {
          product: 0,
          shipping: 0,
          concession: 0,
        },
      },
      {
        ...products[2],
        status: 'Delivered',
        quantity: 2,
        variants: [
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.size_b7152342');
            },
            value: 'L',
          },
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.color_1d0c8304');
            },
            value: 'Blue',
          },
        ],
        shippingAddress: '123 Oak Street, Dallas, Texas, USA 75201',
        billlingAddress: '123 Oak Street, Dallas, Texas, USA 75201',
        billingAddressSameAsShipping: true,
        vendor: 'Texan Apparel Co.',
        shopSku: '1680423523008_US-VWX567',
        sellerSku: 'couchcontemporary',
        priorRefunds: {
          product: 0,
          shipping: 0,
          concession: 0,
        },
      },
      {
        ...products[3],
        status: 'Shipped',
        quantity: 3,
        variants: [
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.size_b7152342');
            },
            value: 'S',
          },
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.color_1d0c8304');
            },
            value: 'Red',
          },
        ],
        shippingAddress: '123 Oak Street, Dallas, Texas, USA 75201',
        billlingAddress: '123 Oak Street, Dallas, Texas, USA 75201',
        billingAddressSameAsShipping: true,
        vendor: 'Modern Chic Clothing',
        shopSku: '1680423523009_US-YZA890',
        sellerSku: 'deskergonomic',
        priorRefunds: {
          product: 0,
          shipping: 0,
          concession: 0,
        },
      },
      {
        ...products[4],
        status: 'Shipped',
        quantity: 1,
        variants: [
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.size_b7152342');
            },
            value: 'XL',
          },
          {
            get label() {
              return i18n.t('ui.data.e_commerce.orders.color_1d0c8304');
            },
            value: 'White',
          },
        ],
        shippingAddress: '123 Oak Street, Dallas, Texas, USA 75201',
        billlingAddress: '123 Oak Street, Dallas, Texas, USA 75201',
        billingAddressSameAsShipping: true,
        vendor: 'Trendsetters Inc.',
        shopSku: '1680423523010_US-BCD123',
        sellerSku: 'stoolergonomic',
        priorRefunds: {
          product: 0,
          shipping: 0,
          concession: 0,
        },
      },
    ],
    status: 'fulfilled',
    payment: {
      subtotal: 980,
      shippingCost: 5.49,
      discount: -50,
      total: 935.49,
      status: 'Paid',
    },
    activities: orderActivities,
    customer: customerInfo,
    createdAt: '2024-04-02T10:15:00',
  },
];

export const orderListAdmin = [
  {
    id: '#4544321',
    date: '04 February, 2024',
    customer: users[0],
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    shippingMethod: 'standard',
    items: [
      { product: products[2], quantity: 2 },
      { product: products[6], quantity: 1 },
      { product: products[1], quantity: 3 },
    ],
  },
  {
    id: '#1644322',
    date: '05 February, 2024',
    customer: users[1],
    paymentStatus: 'paid',
    fulfillmentStatus: 'partially fulfilled',
    shippingMethod: 'express',
    items: [{ product: products[1], quantity: 3 }],
  },
  {
    id: '#8244323',
    date: '06 February, 2024',
    customer: users[2],
    paymentStatus: 'refunded',
    fulfillmentStatus: 'unfulfilled',
    shippingMethod: 'standard',
    items: [
      { product: products[3], quantity: 1 },
      { product: products[7], quantity: 2 },
      { product: products[4], quantity: 1 },
      { product: products[9], quantity: 2 },
    ],
  },
  {
    id: '#6944324',
    date: '07 February, 2024',
    customer: users[3],
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    shippingMethod: 'standard',
    items: [
      { product: products[4], quantity: 3 },
      { product: products[8], quantity: 1 },
      { product: products[12], quantity: 2 },
    ],
  },
  {
    id: '#1244325',
    date: '07 February, 2024',
    customer: users[4],
    paymentStatus: 'cancelled',
    fulfillmentStatus: 'fulfilled',
    shippingMethod: 'economy',
    items: [
      { product: products[0], quantity: 2 },
      { product: products[9], quantity: 1 },
      { product: products[14], quantity: 3 },
      { product: products[5], quantity: 1 },
    ],
  },
  {
    id: '#4844326',
    date: '08 February, 2024',
    customer: users[5],
    paymentStatus: 'due',
    fulfillmentStatus: 'partially fulfilled',
    shippingMethod: 'express',
    items: [
      { product: products[10], quantity: 3 },
      { product: products[14], quantity: 2 },
      { product: products[2], quantity: 1 },
    ],
  },
  {
    id: '#2744327',
    date: '09 February, 2024',
    customer: users[6],
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    shippingMethod: 'standard',
    items: [
      { product: products[11], quantity: 1 },
      { product: products[12], quantity: 2 },
      { product: products[7], quantity: 3 },
      { product: products[3], quantity: 1 },
    ],
  },
  {
    id: '#3544328',
    date: '10 February, 2024',
    customer: users[7],
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    shippingMethod: 'economy',
    items: [
      { product: products[13], quantity: 3 },
      { product: products[14], quantity: 1 },
      { product: products[8], quantity: 2 },
    ],
  },
  {
    id: '#3644329',
    date: '11 February, 2024',
    customer: users[8],
    paymentStatus: 'due',
    fulfillmentStatus: 'unfulfilled',
    shippingMethod: 'standard',
    items: [
      { product: products[2], quantity: 2 },
      { product: products[7], quantity: 1 },
      { product: products[10], quantity: 3 },
      { product: products[14], quantity: 1 },
    ],
  },
  {
    id: '#3744330',
    date: '12 February, 2024',
    customer: users[9],
    paymentStatus: 'paid',
    fulfillmentStatus: 'partially fulfilled',
    shippingMethod: 'express',
    items: [
      { product: products[4], quantity: 3 },
      { product: products[10], quantity: 2 },
      { product: products[1], quantity: 1 },
    ],
  },
  {
    id: '#3844331',
    date: '13 February, 2024',
    customer: users[10],
    paymentStatus: 'refunded',
    fulfillmentStatus: 'fulfilled',
    shippingMethod: 'express',
    items: [
      { product: products[1], quantity: 1 },
      { product: products[14], quantity: 2 },
      { product: products[5], quantity: 3 },
    ],
  },
  {
    id: '#3944332',
    date: '14 February, 2024',
    customer: users[11],
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    shippingMethod: 'standard',
    items: [
      { product: products[3], quantity: 2 },
      { product: products[12], quantity: 1 },
      { product: products[6], quantity: 3 },
    ],
  },
  {
    id: '#4044333',
    date: '15 February, 2024',
    customer: users[12],
    paymentStatus: 'cancelled',
    fulfillmentStatus: 'unfulfilled',
    shippingMethod: 'standard',
    items: [
      { product: products[5], quantity: 3 },
      { product: products[9], quantity: 1 },
      { product: products[13], quantity: 2 },
    ],
  },
  {
    id: '#4144334',
    date: '16 February, 2024',
    customer: users[13],
    paymentStatus: 'paid',
    fulfillmentStatus: 'partially fulfilled',
    shippingMethod: 'standard',
    items: [
      { product: products[6], quantity: 2 },
      { product: products[11], quantity: 1 },
      { product: products[2], quantity: 3 },
    ],
  },
  {
    id: '#4244335',
    date: '17 February, 2024',
    customer: users[14],
    paymentStatus: 'due',
    fulfillmentStatus: 'fulfilled',
    shippingMethod: 'standard',
    items: [
      { product: products[8], quantity: 3 },
      { product: products[13], quantity: 2 },
      { product: products[4], quantity: 1 },
    ],
  },
  {
    id: '#4344336',
    date: '18 February, 2024',
    customer: users[15],
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    shippingMethod: 'standard',
    items: [
      { product: products[0], quantity: 1 },
      { product: products[14], quantity: 2 },
      { product: products[7], quantity: 3 },
    ],
  },
  {
    id: '#4444337',
    date: '19 February, 2024',
    customer: users[0],
    paymentStatus: 'refunded',
    fulfillmentStatus: 'fulfilled',
    shippingMethod: 'standard',
    items: [
      { product: products[2], quantity: 3 },
      { product: products[10], quantity: 1 },
      { product: products[12], quantity: 2 },
    ],
  },
  {
    id: '#4544338',
    date: '20 February, 2024',
    customer: users[1],
    paymentStatus: 'paid',
    fulfillmentStatus: 'partially fulfilled',
    shippingMethod: 'express',
    items: [
      { product: products[4], quantity: 2 },
      { product: products[12], quantity: 1 },
      { product: products[9], quantity: 3 },
    ],
  },
  {
    id: '#4644339',
    date: '21 February, 2024',
    customer: users[2],
    paymentStatus: 'cancelled',
    fulfillmentStatus: 'unfulfilled',
    shippingMethod: 'economy',
    items: [
      { product: products[6], quantity: 3 },
      { product: products[14], quantity: 2 },
      { product: products[1], quantity: 1 },
    ],
  },
  {
    id: '#4744340',
    date: '22 February, 2024',
    customer: users[3],
    paymentStatus: 'due',
    fulfillmentStatus: 'fulfilled',
    shippingMethod: 'standard',
    items: [
      { product: products[8], quantity: 1 },
      { product: products[13], quantity: 2 },
      { product: products[3], quantity: 3 },
    ],
  },
  {
    id: '#4844341',
    date: '23 February, 2024',
    customer: users[4],
    paymentStatus: 'paid',
    fulfillmentStatus: 'partially fulfilled',
    shippingMethod: 'economy',
    items: [
      { product: products[1], quantity: 2 },
      { product: products[9], quantity: 1 },
      { product: products[5], quantity: 3 },
    ],
  },
  {
    id: '#4944342',
    date: '24 February, 2024',
    customer: users[5],
    paymentStatus: 'refunded',
    fulfillmentStatus: 'fulfilled',
    shippingMethod: 'standard',
    items: [
      { product: products[3], quantity: 3 },
      { product: products[11], quantity: 1 },
      { product: products[7], quantity: 2 },
    ],
  },
  {
    id: '#5044343',
    date: '25 February, 2024',
    customer: users[6],
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    shippingMethod: 'express',
    items: [
      { product: products[5], quantity: 2 },
      { product: products[14], quantity: 1 },
      { product: products[10], quantity: 3 },
    ],
  },
];

export const defaultInvoice = {
  id: '#52132463423234',
  order: orderDetailsList[0],
};

export const invoiceListAdmin = orderListAdmin.map((order) => ({
  ...order,
  invoiceId: `INV-${order.id}`,
}));

export const orderTrackDetails = {
  id: '#1411241235',
  number: '8646890435',
  orderDate: new Date().getTime(),
  shipDate: new Date().getTime() + 86400000,
  shippingAddress: 'Apt: 6/B, 192 Edsel Road, Van Nuys, California, USA 96580',
  carrier: 'Redtrack',
  carrierTrackingNumber: '341794953109834590147124',
  tracks: [
    {
      id: 1,
      date: '2 Feb, 2024',
      time: '12:21 AM',
      get description() {
        return i18n.t('ui.data.e_commerce.orders.shipped_dec6e329');
      },
      place: 'Carol Stream, IL',
    },
    {
      id: 2,
      date: '2 Feb, 2024',
      time: '12:09 AM',
      get description() {
        return i18n.t('ui.data.e_commerce.orders.shipping_info_recieved_a658d59a');
      },
      place: 'Chicago, IL',
    },
    {
      id: 3,
      date: '2 Feb, 2024',
      time: '6:26 PM',
      get description() {
        return i18n.t('ui.data.e_commerce.orders.origin_scan_323f6d93');
      },
      place: 'Carol Stream, IL',
    },
    {
      id: 4,
      date: '2 Feb, 2024',
      time: '3:46 AM',
      get description() {
        return i18n.t('ui.data.e_commerce.orders.shipping_info_recieved_a658d59a');
      },
      place: 'Carol Stream, IL',
    },
  ],
  trackSteps: [
    {
      get title() {
        return i18n.t('ui.data.e_commerce.orders.prepared_d8b21a67');
      },
      get subtitle() {
        return i18n.t('ui.data.e_commerce.orders.we_are_preparing_to_ship_your_items_89f8c7bb');
      },
    },
    {
      get title() {
        return i18n.t('ui.data.e_commerce.orders.shipped_dec6e329');
      },
      get subtitle() {
        return i18n.t('ui.data.e_commerce.orders.your_package_has_been_shipped_c14580b4');
      },
    },
    {
      get title() {
        return i18n.t('ui.data.e_commerce.orders.delivered_eea956cd');
      },
      get subtitle() {
        return i18n.t('ui.data.e_commerce.orders.your_package_has_been_delivered_efece8e9');
      },
    },
  ],
};
