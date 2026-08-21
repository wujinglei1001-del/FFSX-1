import { initialConfig } from 'config';
import i18n from 'locales/i18n';
import paths from 'routes/paths';

const banner = (index) => `${initialConfig.assetsDir}/images/ecommerce/banners/${index}.webp`;
const category = (index) => `${initialConfig.assetsDir}/images/ecommerce/categories/${index}.webp`;

export const categories = [
  {
    id: '1',
    get label() {
      return i18n.t('ui.data.e_commerce.homepage.shop_by_room_9266b7df');
    },
    items: [
      {
        id: '1-1',
        get title() {
          return i18n.t('ui.data.e_commerce.homepage.living_room_25ff70b3');
        },
        items: [
          {
            id: '1-1-1',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.sofas_e65935d7');
            },
            url: paths.products,
          },
          {
            id: '1-1-2',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.coffee_tables_82250e0d');
            },
            url: paths.products,
          },
          {
            id: '1-1-3',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.tv_stands_9ae1d944');
            },
            url: paths.products,
          },
          {
            id: '1-1-4',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.living_room_sets_4fc9877d');
            },
            url: paths.products,
          },
          {
            id: '1-1-5',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.ottomans_ca0e9645');
            },
            url: paths.products,
            items: [
              {
                id: '1-1-5-1',
                get title() {
                  return i18n.t('ui.data.e_commerce.homepage.sofassss_2a6766ba');
                },
                url: paths.products,
              },
              {
                id: '1-1-5-2',
                get title() {
                  return i18n.t('ui.data.e_commerce.homepage.coffee_tables_82250e0d');
                },
                url: paths.products,
              },
              {
                id: '1-1-5-3',
                get title() {
                  return i18n.t('ui.data.e_commerce.homepage.tv_stands_9ae1d944');
                },
                url: paths.products,
              },
              {
                id: '1-1-5-4',
                get title() {
                  return i18n.t('ui.data.e_commerce.homepage.living_room_sets_4fc9877d');
                },
                url: paths.products,
              },
              {
                id: '1-1-5-5',
                get title() {
                  return i18n.t('ui.data.e_commerce.homepage.ottomans_ca0e9645');
                },
                url: paths.products,
              },
            ],
          },
        ],
      },
      {
        id: '1-2',
        get title() {
          return i18n.t('ui.data.e_commerce.homepage.sofas_e65935d7');
        },
        url: paths.products,
      },
      {
        id: '1-3',
        get title() {
          return i18n.t('ui.data.e_commerce.homepage.dining_room_0e3c56af');
        },
        items: [
          {
            id: '1-3-1',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.dining_tables_c541d18e');
            },
            url: paths.products,
          },
          {
            id: '1-3-2',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.dining_chairs_2d8ae8bf');
            },
            url: paths.products,
          },
          {
            id: '1-3-3',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.buffets_sideboards_de2b569b');
            },
            url: paths.products,
          },
          {
            id: '1-3-4',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.bar_stools_8ba0ddf9');
            },
            url: paths.products,
          },
          {
            id: '1-3-5',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.dining_sets_d713cfa6');
            },
            url: paths.products,
          },
        ],
      },
      {
        id: '1-4',
        get title() {
          return i18n.t('ui.data.e_commerce.homepage.bedroom_f69fecd6');
        },
        items: [
          {
            id: '1-4-1',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.beds_79411e97');
            },
            url: paths.products,
          },
          {
            id: '1-4-2',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.dressers_90bf13ed');
            },
            url: paths.products,
          },
          {
            id: '1-4-3',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.nightstands_4017cf30');
            },
            url: paths.products,
          },
          {
            id: '1-4-4',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.bedroom_sets_23278af1');
            },
            url: paths.products,
          },
          {
            id: '1-4-5',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.mattresses_8e7b4d32');
            },
            url: paths.products,
          },
        ],
      },
      {
        id: '1-5',
        get title() {
          return i18n.t('ui.data.e_commerce.homepage.kitchen_018618c0');
        },
        items: [
          {
            id: '1-5-1',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.kitchen_islands_5be5e79f');
            },
            url: paths.products,
          },
          {
            id: '1-5-2',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.bar_stools_8ba0ddf9');
            },
            url: paths.products,
          },
          {
            id: '1-5-3',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.pantry_cabinets_21e5a89d');
            },
            url: paths.products,
          },
          {
            id: '1-5-4',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.kitchen_carts_d4334e8e');
            },
            url: paths.products,
          },
          {
            id: '1-5-5',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.dining_sets_d713cfa6');
            },
            url: paths.products,
          },
        ],
      },
      {
        id: '1-6',
        get title() {
          return i18n.t('ui.data.e_commerce.homepage.washroom_72d190dc');
        },
        items: [
          {
            id: '1-6-1',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.bathroom_vanities_29053700');
            },
            url: paths.products,
          },
          {
            id: '1-6-2',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.bathroom_cabinets_b83c43cc');
            },
            url: paths.products,
          },
          {
            id: '1-6-3',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.towel_racks_413263d3');
            },
            url: paths.products,
          },
          {
            id: '1-6-4',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.laundry_hampers_d298861e');
            },
            url: paths.products,
          },
          {
            id: '1-6-5',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.bathroom_shelves_10112eae');
            },
            url: paths.products,
          },
        ],
      },
      {
        id: '1-7',
        get title() {
          return i18n.t('ui.data.e_commerce.homepage.outdoor_c28c9990');
        },
        items: [
          {
            id: '1-7-1',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.patio_furniture_sets_9be889fc');
            },
            url: paths.products,
          },
          {
            id: '1-7-2',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.outdoor_chairs_9f212a14');
            },
            url: paths.products,
          },
          {
            id: '1-7-3',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.outdoor_tables_1a0bca50');
            },
            url: paths.products,
          },
          {
            id: '1-7-4',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.hammocks_499a4c51');
            },
            url: paths.products,
          },
          {
            id: '1-7-5',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.outdoor_storage_ed49e535');
            },
            url: paths.products,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    get label() {
      return i18n.t('ui.data.e_commerce.homepage.shop_by_furniture_12789626');
    },
    items: [
      {
        id: '2-1',
        get title() {
          return i18n.t('ui.data.e_commerce.homepage.table_0424f6e7');
        },
        items: [
          {
            id: '2-1-1',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.coffee_tables_82250e0d');
            },
            url: paths.products,
          },
          {
            id: '2-1-2',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.side_tables_fcbbb30e');
            },
            url: paths.products,
          },
          {
            id: '2-1-3',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.dining_tables_c541d18e');
            },
            url: paths.products,
          },
          {
            id: '2-1-4',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.console_tables_fb318681');
            },
            url: paths.products,
          },
          {
            id: '2-1-5',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.bedside_tables_cf5f88c9');
            },
            url: paths.products,
          },
        ],
      },
      {
        id: '2-2',
        get title() {
          return i18n.t('ui.data.e_commerce.homepage.chair_9feb5376');
        },
        items: [
          {
            id: '2-2-1',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.armchairs_9f1035cc');
            },
            url: paths.products,
          },
          {
            id: '2-2-2',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.dining_chairs_2d8ae8bf');
            },
            url: paths.products,
          },
          {
            id: '2-2-3',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.office_chairs_7e83ab14');
            },
            url: paths.products,
          },
          {
            id: '2-2-4',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.recliners_6468d4f5');
            },
            url: paths.products,
          },
          {
            id: '2-2-5',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.accent_chairs_547f5ec4');
            },
            url: paths.products,
          },
        ],
      },
      {
        id: '2-3',
        get title() {
          return i18n.t('ui.data.e_commerce.homepage.bed_1a706e23');
        },
        items: [
          {
            id: '2-3-1',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.platform_beds_ad788821');
            },
            url: paths.products,
          },
          {
            id: '2-3-2',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.canopy_beds_3a7ab8ac');
            },
            url: paths.products,
          },
          {
            id: '2-3-3',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.storage_beds_a688b3bf');
            },
            url: paths.products,
          },
          {
            id: '2-3-4',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.bunk_beds_a26ab680');
            },
            url: paths.products,
          },
          {
            id: '2-3-5',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.sleigh_beds_c5d8a281');
            },
            url: paths.products,
          },
        ],
      },
      {
        id: '2-4',
        get title() {
          return i18n.t('ui.data.e_commerce.homepage.bookshelf_0d88689c');
        },
        items: [
          {
            id: '2-4-1',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.wall_bookshelves_5f10d200');
            },
            url: paths.products,
          },
          {
            id: '2-4-2',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.corner_bookshelves_0f36eb77');
            },
            url: paths.products,
          },
          {
            id: '2-4-3',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.ladder_bookshelves_c78ce0af');
            },
            url: paths.products,
          },
          {
            id: '2-4-4',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.cube_bookshelves_4b99e844');
            },
            url: paths.products,
          },
          {
            id: '2-4-5',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.kids_bookshelves_b3dffa02');
            },
            url: paths.products,
          },
        ],
      },
      {
        id: '2-5',
        get title() {
          return i18n.t('ui.data.e_commerce.homepage.sofa_7cde12e5');
        },
        items: [
          {
            id: '2-5-1',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.sectional_sofas_b73911b3');
            },
            url: paths.products,
          },
          {
            id: '2-5-2',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.sleeper_sofas_95626140');
            },
            url: paths.products,
          },
          {
            id: '2-5-3',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.loveseats_72817700');
            },
            url: paths.products,
          },
          {
            id: '2-5-4',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.reclining_sofas_7043c754');
            },
            url: paths.products,
          },
          {
            id: '2-5-5',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.chaise_sofas_98d52b98');
            },
            url: paths.products,
          },
        ],
      },
      {
        id: '2-6',
        get title() {
          return i18n.t('ui.data.e_commerce.homepage.couch_80ada11a');
        },
        items: [
          {
            id: '2-6-1',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.fabric_couches_54be64a3');
            },
            url: paths.products,
          },
          {
            id: '2-6-2',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.leather_couches_a3f1f50a');
            },
            url: paths.products,
          },
          {
            id: '2-6-3',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.microfiber_couches_cedb9997');
            },
            url: paths.products,
          },
          {
            id: '2-6-4',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.convertible_couches_bae846ce');
            },
            url: paths.products,
          },
          {
            id: '2-6-5',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.modular_couches_e899345d');
            },
            url: paths.products,
          },
        ],
      },
      {
        id: '2-7',
        get title() {
          return i18n.t('ui.data.e_commerce.homepage.decor_00cbb1a0');
        },
        items: [
          {
            id: '2-7-1',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.wall_art_f26f90a4');
            },
            url: paths.products,
          },
          {
            id: '2-7-2',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.mirrors_c92a133e');
            },
            url: paths.products,
          },
          {
            id: '2-7-3',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.rugs_8bcce73b');
            },
            url: paths.products,
          },
          {
            id: '2-7-4',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.throw_pillows_b544016a');
            },
            url: paths.products,
          },
          {
            id: '2-7-5',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.vases_a7779882');
            },
            url: paths.products,
          },
        ],
      },
      {
        id: '2-8',
        get title() {
          return i18n.t('ui.data.e_commerce.homepage.sofa_7cde12e5');
        },
        items: [
          {
            id: '2-8-1',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.sectional_sofas_b73911b3');
            },
            url: paths.products,
          },
          {
            id: '2-8-2',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.sleeper_sofas_95626140');
            },
            url: paths.products,
          },
          {
            id: '2-8-3',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.loveseats_72817700');
            },
            url: paths.products,
          },
          {
            id: '2-8-4',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.reclining_sofas_7043c754');
            },
            url: paths.products,
          },
          {
            id: '2-8-5',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.chaise_sofas_98d52b98');
            },
            url: paths.products,
          },
        ],
      },
      {
        id: '2-9',
        get title() {
          return i18n.t('ui.data.e_commerce.homepage.couch_80ada11a');
        },
        items: [
          {
            id: '2-9-1',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.fabric_couches_54be64a3');
            },
            url: paths.products,
          },
          {
            id: '2-9-2',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.leather_couches_a3f1f50a');
            },
            url: paths.products,
          },
          {
            id: '2-9-3',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.microfiber_couches_cedb9997');
            },
            url: paths.products,
          },
          {
            id: '2-9-4',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.convertible_couches_bae846ce');
            },
            url: paths.products,
          },
          {
            id: '2-9-5',
            get title() {
              return i18n.t('ui.data.e_commerce.homepage.modular_couches_e899345d');
            },
            url: paths.products,
          },
        ],
      },
    ],
  },
];

export const features = [
  {
    get label() {
      return i18n.t('ui.data.e_commerce.homepage.fastest_delivery_42104778');
    },
    icon: 'material-symbols-light:local-shipping-outline-rounded',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.homepage.smooth_shopping_a848aea4');
    },
    icon: 'material-symbols-light:shopping-bag-outline',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.homepage.authentic_products_252ecdeb');
    },
    icon: 'material-symbols-light:verified-outline-rounded',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.homepage.easy_payment_cd250731');
    },
    icon: 'material-symbols-light:credit-score-outline-rounded',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.homepage.secured_data_b0349921');
    },
    icon: 'material-symbols-light:verified-user-outline-rounded',
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.homepage.free_and_easy_return_73f906b5');
    },
    icon: 'material-symbols-light:keyboard-return-rounded',
  },
];

export const popularCategories = [
  {
    get label() {
      return i18n.t('ui.data.e_commerce.homepage.armchair_d5727b18');
    },
    image: category(1),
    url: paths.products,
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.homepage.couch_80ada11a');
    },
    image: category(2),
    url: paths.products,
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.homepage.sofa_7cde12e5');
    },
    image: category(3),
    url: paths.products,
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.homepage.chair_9feb5376');
    },
    image: category(4),
    url: paths.products,
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.homepage.nightstand_e83fcb09');
    },
    image: category(5),
    url: paths.products,
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.homepage.stool_053a20a3');
    },
    image: category(6),
    url: paths.products,
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.homepage.table_0424f6e7');
    },
    image: category(7),
    url: paths.products,
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.homepage.bed_1a706e23');
    },
    image: category(8),
    url: paths.products,
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.homepage.coffee_table_9ee3c1bd');
    },
    image: category(9),
    url: paths.products,
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.homepage.dresser_b7370ab6');
    },
    image: category(10),
    url: paths.products,
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.homepage.work_desk_80785be4');
    },
    image: category(11),
    url: paths.products,
  },
  {
    get label() {
      return i18n.t('ui.data.e_commerce.homepage.shelf_1bf5eaa6');
    },
    image: category(12),
    url: paths.products,
  },
];

export const categoryBanners = [
  {
    id: 1,
    title: (
      <>{i18n.t('ui.data.e_commerce.homepage.browse_furnitures_for_your_living_room_2bbb0e2c')}</>
    ),
    image: banner(1),
    url: paths.products,
  },
  {
    id: 2,
    title: (
      <>{i18n.t('ui.data.e_commerce.homepage.spend_leisure_on_your_lawn_with_comfort_61861720')}</>
    ),
    image: banner(2),
    url: paths.products,
  },
  {
    id: 3,
    title: (
      <>{i18n.t('ui.data.e_commerce.homepage.let_ergonomics_meet_style_in_your_office_06151c17')}</>
    ),
    image: banner(3),
    url: paths.products,
  },
];
