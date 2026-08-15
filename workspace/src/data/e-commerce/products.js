import { initialConfig } from 'config';
import { users } from 'data/users';
import i18n from 'locales/i18n';

const image = (name) => `${initialConfig.assetsDir}/images/ecommerce/products/${name}.webp`;

export const products = [
  {
    id: 1,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.products.vingli_56_modern_sofa_small_corduroy_couch_deep_seat_9531a49e',
      );
    },
    images: [
      { color: '#F1E6D5', src: image('details/stain_1') },
      { color: '#9E7B5D', src: image('details/chestnut_1') },
      { color: '#7C7B77', src: image('details/grey_1') },
    ],
    variants: [
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.size_b7152342');
        },
        value: 'S',
      },
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.color_1d0c8304');
        },
        value: 'Black, White',
      },
    ],
    tags: ['Living room', 'Armchair'],
    ratings: 4,
    reviews: 120,
    price: { regular: 440, discounted: 259, offer: '40%' },
    sold: 2476,
    stock: 2,
    vat: 10,
    margin: 15,
    availability: ['low-stock'],
    sale: ['voucher'],
    material: ['wood'],
    category: ['sofa'],
    features: ['swivel'],
  },
  {
    id: 2,
    name: 'Fabric Recliner Chair Single Sofa',
    images: [{ src: image('2') }],
    variants: [
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.size_b7152342');
        },
        value: 'S',
      },
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.color_1d0c8304');
        },
        value: 'White Chocolate',
      },
    ],
    tags: ['Living room', 'Armchair'],
    ratings: 3,
    reviews: 90,
    price: { regular: 400, discounted: 109, offer: '20%' },
    sold: 546,
    stock: 4,
    vat: 10,
    margin: 10,
    availability: ['in-stock'],
    sale: ['clearance-sale'],
    material: ['cotton'],
    category: ['recliner'],
    features: ['ergonomic'],
  },
  {
    id: 3,
    name: 'T- CAP  2 Seat Cotton Sofa',
    images: [{ src: image('3') }],
    tags: ['Living room', 'Armchair'],
    variants: [
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.size_b7152342');
        },
        value: 'L',
      },
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.color_1d0c8304');
        },
        value: 'Chinese Black',
      },
    ],
    ratings: 5,
    reviews: 210,
    price: { regular: 2000, discounted: 1099, offer: '30%' },
    sold: 2456,
    stock: 5,
    vat: 10,
    margin: 5,
    availability: ['in-stock'],
    sale: ['regular-price'],
    material: ['metal'],
    category: ['sectional'],
    features: ['adjustable'],
  },
  {
    id: 4,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.products.little_smile_3x6_size_for_1_person_moshi_fabric_wash_9f7b8a57',
      );
    },
    images: [{ src: image('4') }],
    tags: ['Living room', 'Armchair'],
    variants: [
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.size_b7152342');
        },
        value: 'M',
      },
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.color_1d0c8304');
        },
        value: 'Navy Blue',
      },
    ],
    ratings: 4,
    reviews: 150,
    price: { regular: 740, discounted: 369, offer: '50%' },
    sold: 1918,
    stock: 10,
    vat: 10,
    margin: 20,
    availability: ['in-stock'],
    sale: ['voucher'],
    material: ['upholstered'],
    category: ['divan'],
    features: ['handmade'],
  },
  {
    id: 5,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.products.century_accent_chair_modern_fabric_upholstered_armch_0dbf1123',
      );
    },
    images: [{ src: image('5') }],
    tags: ['Living room', 'Armchair'],
    variants: [
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.size_b7152342');
        },
        value: 'L',
      },
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.color_1d0c8304');
        },
        value: 'Red',
      },
    ],
    ratings: 5,
    reviews: 180,
    price: { regular: 600, discounted: 299, offer: '30%' },
    sold: 158,
    stock: 0,
    vat: 10,
    margin: 10,
    availability: ['out-of-stock'],
    sale: ['clearance-sale'],
    material: ['wood'],
    category: ['chair'],
    features: ['waterproof'],
  },
  {
    id: 6,
    name: 'Velvet Swoop Arm Accent Chair',
    images: [{ src: image('6') }],
    tags: ['Living room', 'Armchair'],
    ratings: 4,
    reviews: 120,
    price: { regular: 280, discounted: 109, offer: '20%' },
    sold: 1561,
    stock: 8,
    vat: 10,
    margin: 15,
    availability: ['in-stock'],
    sale: ['voucher'],
    material: ['glass'],
    category: ['loveseat'],
    features: ['stackable'],
  },
  {
    id: 7,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.products.mid_century_accent_arm_modern_retro_chair_with_solid_9a21b8af',
      );
    },
    images: [{ src: image('7') }],
    tags: ['Living room', 'Armchair'],
    variants: [
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.size_b7152342');
        },
        value: 'S',
      },
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.color_1d0c8304');
        },
        value: 'Green',
      },
    ],
    ratings: 4,
    reviews: 140,
    price: { regular: 120, discounted: 59, offer: '20%' },
    sold: 923,
    stock: 1,
    vat: 10,
    margin: 5,
    availability: ['low-stock'],
    sale: ['regular-price'],
    material: ['plastic'],
    category: ['chair'],
    features: ['adjustable'],
  },
  {
    id: 8,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.products.stuffed_animal_storage_bean_bag_chair_cover_no_fille_cd799594',
      );
    },
    images: [{ src: image('8') }],
    variants: [
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.size_b7152342');
        },
        value: 'XL',
      },
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.color_1d0c8304');
        },
        value: 'Gray',
      },
    ],
    tags: ['Living room', 'Armchair'],
    ratings: 5,
    reviews: 160,
    price: { regular: 160, discounted: 79, offer: '30%' },
    sold: 1656,
    stock: 1,
    vat: 10,
    margin: 20,
    availability: ['low-stock'],
    sale: ['clearance-sale'],
    material: ['upholstered'],
    category: ['ottoman'],
    features: ['outdoor'],
  },
  {
    id: 9,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.products.leisure_sofa_single_lazy_sofa_hotel_bar_small_apartm_7c10307b',
      );
    },
    images: [{ src: image('9') }],
    tags: ['Living room', 'Armchair'],
    ratings: 4,
    reviews: 130,
    variants: [
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.size_b7152342');
        },
        value: 'M',
      },
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.color_1d0c8304');
        },
        value: 'Black',
      },
    ],
    price: { regular: 360, discounted: 229, offer: '40%' },
    sold: 181,
    stock: 6,
    vat: 10,
    margin: 10,
    availability: ['in-stock'],
    sale: ['voucher'],
    material: ['metal'],
    category: ['sofa'],
    features: ['foldable'],
  },
  {
    id: 10,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.products.t_pop_modern_barrel_accent_chair_button_tufted_beige_6367ce96',
      );
    },
    images: [{ src: image('10') }],
    tags: ['Living room', 'Armchair'],
    ratings: 4,
    reviews: 110,
    variants: [
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.size_b7152342');
        },
        value: 'L',
      },
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.color_1d0c8304');
        },
        value: 'Blue',
      },
    ],
    price: { regular: 260, discounted: 169, offer: '30%' },
    sold: 918,
    stock: 1,
    vat: 10,
    margin: 15,
    availability: ['low-stock'],
    sale: ['clearance-sale'],
    material: ['glass'],
    category: ['sectional'],
    features: ['handmade'],
  },
  {
    id: 11,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.products.life_an_38_6_w_modern_style_rolled_arm_chair_sofa_2aa122fa',
      );
    },
    images: [{ src: image('11') }],
    tags: ['Living room', 'Armchair'],
    ratings: 4,
    reviews: 140,
    variants: [
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.size_b7152342');
        },
        value: 'S',
      },
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.color_1d0c8304');
        },
        value: 'Red',
      },
    ],
    price: { regular: 440, discounted: 319, offer: '20%' },
    sold: 628,
    stock: 1,
    vat: 10,
    margin: 20,
    availability: ['low-stock'],
    sale: ['regular-price'],
    material: ['upholstered'],
    category: ['bench'],
    features: ['ergonomic'],
  },
  {
    id: 12,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.products.milano_accent_chair_modern_retro_leisure_chair_with__73eff3c6',
      );
    },
    images: [{ src: image('12') }],
    tags: ['Living room', 'Armchair'],
    variants: [
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.size_b7152342');
        },
        value: 'XL',
      },
      {
        get label() {
          return i18n.t('ui.data.e_commerce.products.color_1d0c8304');
        },
        value: 'White',
      },
    ],
    ratings: 4,
    reviews: 130,
    price: { regular: 420, discounted: 239, offer: '30%' },
    sold: 2136,
    stock: 3,
    vat: 10,
    margin: 5,
    availability: ['in-stock'],
    sale: ['voucher'],
    material: ['wood'],
    category: ['loveseat'],
    features: ['outdoor'],
  },
  {
    id: 13,
    name: 'AIA Tri-Fold Wooden effect leg/Sofa',
    images: [{ src: image('13') }],
    tags: ['Living room', 'Armchair'],
    ratings: 3,
    reviews: 90,
    price: { regular: 240, discounted: 189, offer: '20%' },
    sold: 544,
    stock: 10,
    vat: 10,
    margin: 10,
    availability: ['in-stock'],
    sale: ['voucher'],
    material: ['plastic'],
    category: ['bench'],
    features: ['ergonomic'],
  },
  {
    id: 14,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.products.relax_lounge_accent_chair_for_living_room_355a6d66',
      );
    },
    images: [{ src: image('14') }],
    tags: ['Living room', 'Armchair'],
    ratings: 4,
    reviews: 120,
    price: { regular: 640, discounted: 389, offer: '40%' },
    sold: 1245,
    stock: 3,
    vat: 10,
    margin: 5,
    availability: ['in-stock'],
    sale: ['regular-price'],
    material: ['metal'],
    category: ['divan'],
    features: ['foldable'],
  },
  {
    id: 15,
    name: 'BRISTOL Linen Fabric Lounge Chair (Beige)',
    images: [{ src: image('15') }],
    tags: ['Living room', 'Armchair'],
    ratings: 4,
    reviews: 110,
    price: { regular: 290, discounted: 129, offer: '30%' },
    sold: 1445,
    stock: 2,
    vat: 10,
    margin: 15,
    availability: ['low-stock'],
    sale: ['clearance-sale'],
    material: ['cotton'],
    category: ['sofa'],
    features: ['swivel'],
  },
];

export const featuredProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);

export const suggestedProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 6);

export const wishlistedProducts = [...products].slice(0, 4);

export const productColorVariants = [
  {
    id: 'satin-linen',
    name: 'Satin linen',
    color: '#F1E6D5',
    images: [
      image('details/stain_1'),
      image('details/stain_2'),
      image('details/stain_3'),
      image('details/stain_4'),
      image('details/stain_5'),
      image('details/stain_6'),
    ],
  },
  {
    id: 'dark-chestnut',
    name: 'Dark chestnut',
    color: '#9E7B5D',
    images: [
      image('details/chestnut_1'),
      image('details/chestnut_2'),
      image('details/chestnut_3'),
      image('details/chestnut_4'),
      image('details/chestnut_5'),
    ],
  },
  {
    id: 'smokey-grey',
    name: 'Smokey grey',
    color: '#7C7B77',
    images: [
      image('details/grey_1'),
      image('details/grey_2'),
      image('details/grey_3'),
      image('details/grey_4'),
      image('details/grey_5'),
    ],
  },
];

export const productReviewTags = [
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.all_6a720856');
    },
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.quality_4ff18f00');
    },
    count: 110,
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.aesthetics_2bde6ad5');
    },
    count: 91,
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.comfort_4ea61f94');
    },
    count: 25,
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.graceful_be0de9ce');
    },
    count: 50,
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.value_for_money_0ed22281');
    },
    count: 70,
  },
];

export const productReviews = [
  {
    id: 1,
    user: {
      name: 'Gojo Satoru',
      image: users[6].avatar,
    },
    rating: 5,
    date: '22 December, 2023',
    content: {
      get title() {
        return i18n.t('ui.data.e_commerce.products.perfection_in_any_setting_c42b3a6e');
      },
      body: `LOVE THIS! This works great for my balcony. The aluminum legs are an integral component with a distinctive aesthetic. They are designed to resemble dancing shoes resting gracefully on the floor, perfectly complementing the shell's elegant curves.`,
    },
    helpfulCount: 130,
  },
  {
    id: 2,
    user: {
      name: 'Kugisaki Nobara',
      image: users[2].avatar,
    },
    rating: 5,
    date: '22 December, 2023',
    content: {
      get title() {
        return i18n.t('ui.data.e_commerce.products.great_chair_for_the_price_looks_good_9febd3f2');
      },
      get body() {
        return i18n.t(
          'ui.data.e_commerce.products.easy_to_put_together_packaged_very_well_with_red_tap_8556ea6f',
        );
      },
    },
    helpfulCount: 130,
  },
  {
    id: 3,
    user: {
      name: 'Kento Nanami',
      image: users[4].avatar,
    },
    rating: 5,
    date: '22 December, 2023',
    content: {
      get title() {
        return i18n.t('ui.data.e_commerce.products.easily_one_of_the_bests_in_the_market_5f8f3c5d');
      },
      get body() {
        return i18n.t(
          'ui.data.e_commerce.products.looks_great_feels_great_totally_comfortable_i_would__93269d0f',
        );
      },
    },
    helpfulCount: 130,
  },
];

export const productDescriptions = [
  {
    get title() {
      return i18n.t('ui.data.e_commerce.products.modern_looking_8e0244eb');
    },
    get description() {
      return i18n.t(
        'ui.data.e_commerce.products.go_for_a_modern_option_with_our_brown_leather_love_s_1e953ea7',
      );
    },
  },
  {
    get title() {
      return i18n.t('ui.data.e_commerce.products.plush_and_comfy_cushions_84e45043');
    },
    get description() {
      return i18n.t(
        'ui.data.e_commerce.products.high_density_sponge_and_metal_pocket_coils_are_adopt_cb61e6e1',
      );
    },
  },
  {
    get title() {
      return i18n.t('ui.data.e_commerce.products.made_to_last_0bd8c29d');
    },
    get description() {
      return i18n.t(
        'ui.data.e_commerce.products.when_it_comes_to_quality_sofa_couch_the_frame_and_se_7925ecb9',
      );
    },
  },
  {
    get title() {
      return i18n.t('ui.data.e_commerce.products.easy_assembly_5fe4377a');
    },
    get description() {
      return i18n.t(
        'ui.data.e_commerce.products.assembly_is_a_breeze_with_straightforward_instructio_06b66525',
      );
    },
  },
  {
    get title() {
      return i18n.t('ui.data.e_commerce.products.versatile_loveseat_13b5cfb8');
    },
    get description() {
      return i18n.t(
        'ui.data.e_commerce.products.it_has_a_small_footprint_to_fit_into_any_small_space_d8c22c80',
      );
    },
  },
];

export const productSpecifications = [
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.brand_62b4aa57');
    },
    value: 'VIngli',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.assembly_required_b125e655');
    },
    value: 'Yes',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.fabric_a010de5c');
    },
    value: '100% Cotton',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.dimensions_9f4ca9ec');
    },
    value: '56.7" depth x 31.8" width x 33" height',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.seat_depth_2085e3ba');
    },
    value: '21.2 inches',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.seat_height_c1eafbee');
    },
    value: '18.1 inches',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.item_weight_dae27df6');
    },
    value: '66 pounds',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.frame_91b06583');
    },
    value: 'Plywood, Polyurethane foam, Particleboard, PVA glue, Solid wood',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.leg_eda9a0f7');
    },
    value: 'Solid wood, Polished aluminium',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.cushion_d612c4cf');
    },
    value: 'Cotton, Polyurethane foam',
  },
];

export const ecomCoupons = [{ code: 'TAKE100', discount: 100, appliedDiscount: 100 }];

export const productListAdmin = [
  {
    id: 1,
    name: 'Fotobi 47" Black Wood Loveseat Sofa',
    image: { src: image('1') },
    category: 'Sofa',
    status: 'active',
    price: {
      regular: 440,
      discounted: 259,
    },
    vendor: 'Fotobi Furniture',
    stock: 2,
    publishedAt: '14 Feb, 23',
  },
  {
    id: 2,
    name: 'Fabric Recliner Chair Single Sofa',
    image: { src: image('2') },
    category: 'Chair',
    status: 'inactive',
    price: {
      regular: 400,
      discounted: 109,
    },
    vendor: 'Mojar Furniture',
    stock: 23,
    publishedAt: '14 Feb, 23',
  },
  {
    id: 3,
    name: 'T- CAP  2 Seat Cotton Sofa',
    image: { src: image('3') },
    category: 'Sofa',
    status: 'active',
    price: {
      regular: 2000,
      discounted: 1099,
    },
    vendor: 'T-CAP Living',
    stock: 12,
    publishedAt: '15 Feb, 23',
  },
  {
    id: 4,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.products.little_smile_3x6_size_for_1_person_moshi_fabric_wash_9f7b8a57',
      );
    },
    image: { src: image('4') },
    category: 'Sofa',
    status: 'draft',
    price: {
      regular: 740,
      discounted: 369,
    },
    vendor: 'Little Smile Ltd.',
    stock: 54,
    publishedAt: '16 Feb, 23',
  },
  {
    id: 5,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.products.century_accent_chair_modern_fabric_upholstered_armch_0dbf1123',
      );
    },
    image: { src: image('5') },
    category: 'Chair',
    status: 'active',
    price: {
      regular: 600,
      discounted: 299,
    },
    vendor: 'Home Furniture',
    stock: 45,
    publishedAt: '16 Feb, 23',
  },
  {
    id: 6,
    name: 'Velvet Swoop Arm Accent Chair',
    image: { src: image('6') },
    category: 'Chair',
    status: 'inactive',
    price: {
      regular: 280,
      discounted: 109,
    },
    vendor: 'Milano Accent Decor',
    stock: 16,
    publishedAt: '17 Feb, 23',
  },
  {
    id: 7,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.products.mid_century_accent_arm_modern_retro_chair_with_solid_9a21b8af',
      );
    },
    image: { src: image('7') },
    category: 'Chair',
    status: 'active',
    price: {
      regular: 120,
      discounted: 59,
    },
    vendor: 'Fotobi Furniture',
    stock: 34,
    publishedAt: '18 Feb, 23',
  },
  {
    id: 8,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.products.stuffed_animal_storage_bean_bag_chair_cover_no_fille_cd799594',
      );
    },
    image: { src: image('8') },
    category: 'Bean Bag',
    status: 'archive',
    price: {
      regular: 160,
      discounted: 79,
    },
    vendor: 'Mojar Furniture',
    stock: 25,
    publishedAt: '18 Feb, 23',
  },
  {
    id: 9,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.products.leisure_sofa_single_lazy_sofa_hotel_bar_small_apartm_7c10307b',
      );
    },
    image: { src: image('9') },
    category: 'Sofa',
    status: 'active',
    price: {
      regular: 360,
      discounted: 229,
    },
    vendor: 'T-CAP Living',
    stock: 19,
    publishedAt: '18 Feb, 23',
  },
  {
    id: 10,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.products.t_pop_modern_barrel_accent_chair_button_tufted_beige_6367ce96',
      );
    },
    image: { src: image('10') },
    category: 'Chair',
    status: 'active',
    price: {
      regular: 260,
      discounted: 169,
    },
    vendor: 'Milano Accent Decor',
    stock: 15,
    publishedAt: '19 Feb, 23',
  },
  {
    id: 11,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.products.life_an_38_6_w_modern_style_rolled_arm_chair_sofa_2aa122fa',
      );
    },
    image: { src: image('11') },
    category: 'Sofa',
    status: 'inactive',
    price: {
      regular: 440,
      discounted: 319,
    },
    vendor: 'Fotobi Furniture',
    stock: 7,
    publishedAt: '21 Feb, 23',
  },
  {
    id: 12,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.products.milano_accent_chair_modern_retro_leisure_chair_with__73eff3c6',
      );
    },
    image: { src: image('12') },
    category: 'Chair',
    status: 'active',
    price: {
      regular: 420,
      discounted: 239,
    },
    vendor: 'Milano Accent Decor',
    stock: 33,
    publishedAt: '22 Feb, 23',
  },
  {
    id: 13,
    name: 'AIA Tri-Fold Wooden effect leg/Sofa',
    image: { src: image('13') },
    category: 'Sofa',
    status: 'draft',
    price: {
      regular: 240,
      discounted: 189,
    },
    vendor: 'T-CAP Living',
    stock: 5,
    publishedAt: '22 Feb, 23',
  },
  {
    id: 14,
    get name() {
      return i18n.t(
        'ui.data.e_commerce.products.aia_home_furniture_series_classic_linen_wooden_leg_a_090f9f6a',
      );
    },
    image: { src: image('14') },
    category: 'Chair',
    status: 'active',
    price: {
      regular: 360,
      discounted: 229,
    },
    vendor: 'Home Furniture',
    stock: 20,
    publishedAt: '24 Feb, 23',
  },
  {
    id: 15,
    name: 'T-Pop Swoop Arm Chair',
    image: { src: image('15') },
    category: 'Chair',
    status: 'archive',
    price: {
      regular: 700,
      discounted: 459,
    },
    vendor: 'Milano Accent Decor',
    stock: 27,
    publishedAt: '24 Feb, 23',
  },
];

export const availabilityFilterOptions = [
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.in_stock_3f1356ad');
    },
    value: 'in-stock',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.low_stock_023d1181');
    },
    value: 'low-stock',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.out_of_stock_8b78c7ae');
    },
    value: 'out-of-stock',
  },
];

export const saleFilterOptions = [
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.clearance_sale_1d1c307d');
    },
    value: 'clearance-sale',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.voucher_409ca9fe');
    },
    value: 'voucher',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.regular_price_8b5ab297');
    },
    value: 'regular-price',
  },
];

export const materialFilterOptions = [
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.cotton_6e7f4c6b');
    },
    value: 'cotton',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.upholstered_abd92ade');
    },
    value: 'polyester',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.metal_90acb406');
    },
    value: 'metal',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.wood_b3b5a345');
    },
    value: 'wood',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.plastic_69bfe401');
    },
    value: 'plastic',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.glass_745b5a48');
    },
    value: 'glass',
  },
];

export const categoryFilterOptions = [
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.chair_9feb5376');
    },
    value: 'chair',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.divan_cadd43ba');
    },
    value: 'divan',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.sofa_7cde12e5');
    },
    value: 'sofa',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.sectional_3dd9940f');
    },
    value: 'sectional',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.loveseat_acbfbe1e');
    },
    value: 'loveseat',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.recliner_416fb683');
    },
    value: 'recliner',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.bench_931fa888');
    },
    value: 'bench',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.ottoman_0472f3f6');
    },
    value: 'ottoman',
  },
];

export const featuresFilterOptions = [
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.outdoor_c28c9990');
    },
    value: 'outdoor',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.adjustable_942951ab');
    },
    value: 'adjustable',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.swivel_008633fe');
    },
    value: 'swivel',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.handmade_d803091a');
    },
    value: 'handmade',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.ergonomic_e17c9629');
    },
    value: 'ergonomic',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.stackable_e6283f48');
    },
    value: 'stackable',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.foldable_8b610be1');
    },
    value: 'foldable',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.products.waterproof_54a65921');
    },
    value: 'waterproof',
  },
];

export const defaultProductFilterOptions = {
  availability: availabilityFilterOptions,
  sale: saleFilterOptions,
  material: materialFilterOptions,
  category: categoryFilterOptions,
  features: featuresFilterOptions,
  price: [0, 1500],
};
