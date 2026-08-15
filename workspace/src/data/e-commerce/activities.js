import i18n from 'locales/i18n';

export const activities = [
  {
    id: 1,
    get title() {
      return i18n.t('ui.data.e_commerce.activities.an_item_was_sold_6f057b50');
    },
    get description() {
      return i18n.t(
        'ui.data.e_commerce.activities.see_track_and_monitor_product_purchase_details_based_fc838f84',
      );
    },
    time: '2s ago',
    icon: 'material-symbols:attach-money-rounded',
  },
  {
    id: 2,
    get title() {
      return i18n.t('ui.data.e_commerce.activities.product_out_on_the_amazon_market_c86d9698');
    },
    get description() {
      return i18n.t(
        'ui.data.e_commerce.activities.organize_your_inventory_track_and_monitor_the_availa_0072e501',
      );
    },
    time: '5m ago',
    icon: 'material-symbols:storefront-outline-rounded',
  },
  {
    id: 3,
    get title() {
      return i18n.t(
        'ui.data.e_commerce.activities.you_responded_to_a_support_ticket_from_jonah_simson_9d0018ff',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.e_commerce.activities.get_updates_on_resolved_and_unresolved_support_ticke_150048b9',
      );
    },
    time: '2 hr ago',
    icon: 'material-symbols:help-outline-rounded',
  },
  {
    id: 4,
    get title() {
      return i18n.t(
        'ui.data.e_commerce.activities.sale_on_the_summer_collection_has_started_bdd1bcc1',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.e_commerce.activities.monitor_all_your_sales_products_for_a_better_overvie_de4334cb',
      );
    },
    time: '2 hr ago',
    icon: 'material-symbols:sell-outline',
  },
  {
    id: 5,
    get title() {
      return i18n.t('ui.data.e_commerce.activities.a_distributer_sold_an_item_f567a9f6');
    },
    get description() {
      return i18n.t(
        'ui.data.e_commerce.activities.keep_track_of_redistributed_products_for_a_concise_v_ef1263cf',
      );
    },
    time: '1 day ago',
    icon: 'material-symbols:attach-money-rounded',
  },
  {
    id: 6,
    get title() {
      return i18n.t('ui.data.e_commerce.activities.a_new_supplier_added_85e20612');
    },
    get description() {
      return i18n.t(
        'ui.data.e_commerce.activities.keep_track_of_all_the_suppliers_and_relevant_communi_8ebc33c2',
      );
    },
    time: '1 day ago',
    icon: 'material-symbols:box-add-outline-rounded',
  },
  {
    id: 7,
    get title() {
      return i18n.t('ui.data.e_commerce.activities.a_new_product_was_launched_0203e04c');
    },
    get description() {
      return i18n.t(
        'ui.data.e_commerce.activities.find_all_your_new_released_products_and_services_at__e1a91f81',
      );
    },
    time: '2 days ago',
    icon: 'material-symbols:rocket-launch-outline-rounded',
  },
  {
    id: 8,
    get title() {
      return i18n.t('ui.data.e_commerce.activities.you_got_a_new_recommendation_e4d55761');
    },
    get description() {
      return i18n.t(
        'ui.data.e_commerce.activities.track_and_monitor_how_your_customers_behave_across_t_fe92fa07',
      );
    },
    time: '3 days ago',
    icon: 'material-symbols:live-help-outline-rounded',
  },
];
