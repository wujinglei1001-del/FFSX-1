import i18n from 'locales/i18n';

export const faqCategories = [
  {
    id: 'aws',
    title: 'AWS',
    get description() {
      return i18n.t(
        'ui.data.landing.faqs.optimize_performance_and_reduce_costs_using_scalable_298d61d5',
      );
    },
    avatar: {
      icon: 'material-symbols:desktop-cloud-stack-outline-rounded',
      color: 'primary',
    },
    isPopular: true,
    items: [
      {
        id: 1,
        get question() {
          return i18n.t('ui.data.landing.faqs.how_much_do_your_services_cost_091d67ea');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.our_pricing_is_influenced_by_several_key_factors_rel_303a9454',
          );
        },
      },
      {
        id: 2,
        get question() {
          return i18n.t('ui.data.landing.faqs.do_you_offer_any_money_back_guarantee_56b6d997');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_we_provide_a_30_day_money_back_guarantee_for_new_912a3f11',
          );
        },
      },
      {
        id: 3,
        get question() {
          return i18n.t('ui.data.landing.faqs.is_24_7_customer_support_available_cc06b39f');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_we_offer_24_7_support_through_email_live_chat_an_c9f688ec',
          );
        },
      },
      {
        id: 4,
        get question() {
          return i18n.t('ui.data.landing.faqs.do_you_offer_a_trial_version_0a7ffd05');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_we_provide_a_14_day_free_trial_to_let_users_expl_0b924710',
          );
        },
      },
      {
        id: 5,
        get question() {
          return i18n.t('ui.data.landing.faqs.what_currencies_do_you_support_63f3f4bd');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.we_accept_all_major_currencies_including_usd_eur_and_e06f0650',
          );
        },
      },
      {
        id: 6,
        get question() {
          return i18n.t('ui.data.landing.faqs.how_can_i_integrate_aws_with_my_project_80cd0f06');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.integrating_aws_with_your_project_offers_extensive_f_e555526e',
          );
        },
      },
      {
        id: 7,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_use_aws_for_machine_learning_d5cfab13');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_aws_provides_sagemaker_a_comprehensive_service_d_48096307',
          );
        },
      },
      {
        id: 8,
        get question() {
          return i18n.t('ui.data.landing.faqs.what_regions_do_aws_services_cover_90eabedc');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.aws_has_a_global_footprint_with_data_centers_in_nort_e6a914ba',
          );
        },
      },
      {
        id: 9,
        get question() {
          return i18n.t('ui.data.landing.faqs.how_does_aws_handle_data_security_1efb3a0a');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.data_security_is_a_cornerstone_of_aws_s_service_offe_819316f0',
          );
        },
      },
      {
        id: 10,
        get question() {
          return i18n.t('ui.data.landing.faqs.is_aws_cost_effective_for_startups_ea812bf3');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.aws_s_pay_as_you_go_model_and_extensive_free_tier_ma_c0055de0',
          );
        },
      },
      {
        id: 11,
        get question() {
          return i18n.t('ui.data.landing.faqs.what_slas_are_offered_by_aws_7b23f9a7');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.aws_provides_service_level_agreements_slas_that_assu_e98fe4cb',
          );
        },
      },
      {
        id: 12,
        get question() {
          return i18n.t('ui.data.landing.faqs.does_aws_offer_hybrid_cloud_solutions_608c439b');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.aws_supports_hybrid_cloud_architectures_through_solu_82403783',
          );
        },
      },
    ],
  },
  {
    id: 'aurora',
    get title() {
      return i18n.t('ui.data.landing.faqs.aurora_eeee9b76');
    },
    get description() {
      return i18n.t(
        'ui.data.landing.faqs.simplify_backend_operations_with_aurora_s_clean_mode_29535c96',
      );
    },
    avatar: {
      icon: 'material-symbols:other-houses-outline-rounded',
      color: 'success',
    },
    isPopular: true,
    items: [
      {
        id: 1,
        get question() {
          return i18n.t('ui.data.landing.faqs.what_makes_aurora_unique_1668d19a');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.aurora_is_designed_for_seamless_integration_with_mat_85e9fdf8',
          );
        },
      },
      {
        id: 2,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_use_third_party_plugins_6692934f');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.absolutely_aurora_is_compatible_with_numerous_third__f264c945',
          );
        },
      },
      {
        id: 3,
        get question() {
          return i18n.t('ui.data.landing.faqs.is_aurora_responsive_0009bcac');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.aurora_is_fully_responsive_ensuring_smooth_functiona_34ce0587',
          );
        },
      },
      {
        id: 4,
        get question() {
          return i18n.t('ui.data.landing.faqs.what_themes_are_available_53997f3c');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.aurora_includes_both_light_and_dark_themes_with_opti_e36082e3',
          );
        },
      },
      {
        id: 5,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_use_aurora_with_next_js_97d5cb39');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_aurora_is_designed_to_integrate_smoothly_with_ne_ae47fc07',
          );
        },
      },
      {
        id: 6,
        get question() {
          return i18n.t('ui.data.landing.faqs.do_you_offer_customer_support_for_aurora_a48652f3');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_aurora_has_a_dedicated_support_team_to_assist_at_8347c441',
          );
        },
      },
      {
        id: 7,
        get question() {
          return i18n.t('ui.data.landing.faqs.does_aurora_support_localization_a771f01c');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_aurora_is_fully_equipped_for_localization_suppor_f003acb3',
          );
        },
      },
      {
        id: 8,
        get question() {
          return i18n.t('ui.data.landing.faqs.is_aurora_seo_friendly_91592564');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_aurora_is_developed_with_seo_best_practices_in_m_c8b962ba',
          );
        },
      },
      {
        id: 9,
        get question() {
          return i18n.t(
            'ui.data.landing.faqs.what_customization_options_does_aurora_provide_735b1b80',
          );
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.aurora_offers_a_wide_range_of_customization_options__0326b44b',
          );
        },
      },
      {
        id: 10,
        get question() {
          return i18n.t('ui.data.landing.faqs.how_secure_is_aurora_4437c9f9');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.aurora_prioritizes_security_by_supporting_best_codin_11b585c2',
          );
        },
      },
      {
        id: 11,
        get question() {
          return i18n.t('ui.data.landing.faqs.does_aurora_support_animation_99ac64b4');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_aurora_includes_built_in_support_for_animations__4e7da64e',
          );
        },
      },
      {
        id: 12,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_integrate_aurora_with_rest_apis_eebdd93a');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.aurora_is_fully_compatible_with_rest_apis_allowing_d_4d3b92ed',
          );
        },
      },
    ],
  },
  {
    id: 'pricing',
    get title() {
      return i18n.t('ui.data.landing.faqs.pricing_a0d9bbad');
    },
    get description() {
      return i18n.t(
        'ui.data.landing.faqs.choose_a_plan_that_fits_your_team_goals_and_budget_f61c24bb',
      );
    },
    avatar: {
      icon: 'material-symbols:paid-outline-rounded',
      color: 'error',
    },
    isPopular: true,
    items: [
      {
        id: 1,
        get question() {
          return i18n.t('ui.data.landing.faqs.do_you_offer_discounts_for_annual_plans_78361afd');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_we_provide_a_10_discount_on_annual_subscriptions_56f0180c',
          );
        },
      },
      {
        id: 2,
        get question() {
          return i18n.t('ui.data.landing.faqs.do_you_provide_volume_based_pricing_ab557f8d');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_our_service_includes_volume_based_pricing_ideal__d40921a4',
          );
        },
      },
      {
        id: 3,
        get question() {
          return i18n.t('ui.data.landing.faqs.are_there_any_hidden_fees_dff23c26');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.no_we_prioritize_transparency_with_a_clear_pricing_m_9289ed56',
          );
        },
      },
      {
        id: 4,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_upgrade_or_downgrade_my_plan_3edabc94');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_our_platform_is_designed_for_flexibility_allowin_38e4ac0a',
          );
        },
      },
      {
        id: 5,
        get question() {
          return i18n.t('ui.data.landing.faqs.what_payment_methods_are_accepted_5b6d1356');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.we_accept_a_range_of_payment_methods_including_major_8497ed73',
          );
        },
      },
      {
        id: 6,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_try_the_product_before_purchasing_3c808ac2');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_a_14_day_free_trial_allows_new_users_to_explore__a264e636',
          );
        },
      },
      {
        id: 7,
        get question() {
          return i18n.t('ui.data.landing.faqs.do_you_offer_refunds_845533ed');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_we_provide_refunds_under_specific_conditions_wit_5cb06423',
          );
        },
      },
      {
        id: 8,
        get question() {
          return i18n.t('ui.data.landing.faqs.is_customer_support_included_in_all_plans_16457d59');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_customer_support_is_included_across_all_subscrip_6c7b9625',
          );
        },
      },
      {
        id: 9,
        get question() {
          return i18n.t('ui.data.landing.faqs.how_is_customer_data_protected_0610045d');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.customer_data_security_is_paramount_we_utilize_data__9f8fe32c',
          );
        },
      },
      {
        id: 10,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_cancel_my_subscription_anytime_1204aadf');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_users_have_the_freedom_to_cancel_subscriptions_a_0c172a20',
          );
        },
      },
      {
        id: 11,
        get question() {
          return i18n.t('ui.data.landing.faqs.is_there_an_onboarding_process_dfae4531');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_we_offer_a_comprehensive_onboarding_experience_c_93dbc6ef',
          );
        },
      },
      {
        id: 12,
        get question() {
          return i18n.t(
            'ui.data.landing.faqs.are_there_discounts_for_educational_institutions_71cfa921',
          );
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_we_offer_exclusive_discounts_for_educational_ins_d07535c2',
          );
        },
      },
    ],
  },
  {
    id: 'campaign',
    get title() {
      return i18n.t('ui.data.landing.faqs.campaign_69390e16');
    },
    get description() {
      return i18n.t(
        'ui.data.landing.faqs.plan_smarter_campaigns_with_data_driven_tools_and_au_394797ab',
      );
    },
    avatar: {
      icon: 'material-symbols:campaign-outline-rounded',
      color: 'warning',
    },
    isPopular: true,
    items: [
      {
        id: 1,
        get question() {
          return i18n.t('ui.data.landing.faqs.how_do_i_create_a_new_campaign_4088403b');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.to_begin_creating_a_new_campaign_first_navigate_to_y_b6ca3b65',
          );
        },
      },
      {
        id: 2,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_duplicate_existing_campaigns_6deffb4b');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_duplicating_a_campaign_is_easy_just_select_the_c_4b9f04a2',
          );
        },
      },
      {
        id: 3,
        get question() {
          return i18n.t('ui.data.landing.faqs.what_metrics_are_available_for_tracking_cfb12c60');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.our_platform_offers_a_range_of_tracking_metrics_that_83a7d05c',
          );
        },
      },
      {
        id: 4,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_schedule_campaigns_72aa8384');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_scheduling_your_campaigns_is_a_simple_and_effici_4ec1f6e5',
          );
        },
      },
      {
        id: 5,
        get question() {
          return i18n.t('ui.data.landing.faqs.does_your_platform_support_a_b_testing_aa20160f');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_a_b_testing_is_built_into_our_campaign_tools_thi_09cfb1bb',
          );
        },
      },
      {
        id: 6,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_use_custom_audiences_ba8c7948');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_you_can_create_custom_audiences_to_tailor_your_c_3fdf3f76',
          );
        },
      },
      {
        id: 7,
        get question() {
          return i18n.t('ui.data.landing.faqs.how_is_budget_allocation_managed_d70223ba');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.budget_allocation_within_each_campaign_is_fully_cust_6ea0bd7d',
          );
        },
      },
      {
        id: 8,
        get question() {
          return i18n.t('ui.data.landing.faqs.how_can_i_target_specific_demographics_47c7f30f');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.our_platform_provides_advanced_demographic_targeting_392747a0',
          );
        },
      },
      {
        id: 9,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_adjust_campaigns_in_real_time_c6e23ad1');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_real_time_adjustments_are_not_only_possible_but__76c45993',
          );
        },
      },
      {
        id: 10,
        get question() {
          return i18n.t('ui.data.landing.faqs.is_there_a_report_generation_feature_93a91ddc');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_our_reporting_feature_enables_you_to_generate_in_fe531ea3',
          );
        },
      },
    ],
  },
  {
    id: 'templates',
    get title() {
      return i18n.t('ui.data.landing.faqs.templates_f25b700e');
    },
    get description() {
      return i18n.t(
        'ui.data.landing.faqs.save_time_with_pre_built_templates_for_every_common__b01ab97d',
      );
    },
    avatar: {
      icon: 'material-symbols:web',
      color: 'primary',
    },
    isPopular: true,
    items: [
      {
        id: 1,
        get question() {
          return i18n.t('ui.data.landing.faqs.how_do_i_customize_templates_8008100d');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.use_our_built_in_editor_to_easily_adjust_layouts_sty_0a7e4c81',
          );
        },
      },
      {
        id: 2,
        get question() {
          return i18n.t('ui.data.landing.faqs.are_the_templates_responsive_f3808093');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_all_templates_are_fully_responsive_and_meticulou_8312fc0a',
          );
        },
      },
      {
        id: 3,
        get question() {
          return i18n.t('ui.data.landing.faqs.do_you_provide_email_templates_a3e96262');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.absolutely_we_offer_a_wide_range_of_professionally_d_ced9259f',
          );
        },
      },
      {
        id: 4,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_upload_custom_templates_c1472661');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_our_platform_supports_custom_template_uploads_al_174643aa',
          );
        },
      },
      {
        id: 5,
        get question() {
          return i18n.t('ui.data.landing.faqs.do_you_offer_industry_specific_templates_2530ef0f');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_we_provide_a_wide_selection_of_templates_specifi_740b499b',
          );
        },
      },
      {
        id: 6,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_preview_templates_before_using_them_296d2fba');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_you_can_preview_each_template_before_starting_th_aa4998be',
          );
        },
      },
      {
        id: 7,
        get question() {
          return i18n.t('ui.data.landing.faqs.do_templates_support_custom_branding_97c0c00e');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.absolutely_you_can_fully_customize_templates_to_refl_1803da2b',
          );
        },
      },
      {
        id: 8,
        get question() {
          return i18n.t(
            'ui.data.landing.faqs.is_coding_knowledge_required_to_edit_templates_85197460',
          );
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.no_coding_knowledge_is_required_to_use_our_platform__903811ad',
          );
        },
      },
      {
        id: 9,
        get question() {
          return i18n.t(
            'ui.data.landing.faqs.do_templates_include_support_for_interactive_element_e4ef1468',
          );
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_our_templates_can_support_interactive_elements_s_a66a400a',
          );
        },
      },
      {
        id: 10,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_use_templates_for_multiple_projects_40af6398');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_templates_are_versatile_and_can_be_used_across_m_42b57d8d',
          );
        },
      },
      {
        id: 11,
        get question() {
          return i18n.t('ui.data.landing.faqs.are_the_templates_optimized_for_seo_75bde0f6');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_all_of_our_templates_are_optimized_according_to__efcb4c10',
          );
        },
      },
      {
        id: 12,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_collaborate_on_template_editing_9489ab27');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_our_platform_supports_real_time_collaboration_so_d8fa5098',
          );
        },
      },
    ],
  },
  {
    id: 'segments',
    get title() {
      return i18n.t('ui.data.landing.faqs.segments_6648f8ac');
    },
    get description() {
      return i18n.t(
        'ui.data.landing.faqs.build_custom_segments_that_adapt_to_your_users_in_re_0f8c5fb3',
      );
    },
    avatar: {
      icon: 'material-symbols:pie-chart-outline',
      color: 'warning',
    },
    isPopular: true,
    items: [
      {
        id: 1,
        get question() {
          return i18n.t('ui.data.landing.faqs.what_are_segments_d7521b16');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.segments_allow_grouping_users_by_specific_criteria_t_2afe2111',
          );
        },
      },
      {
        id: 2,
        get question() {
          return i18n.t('ui.data.landing.faqs.how_do_i_create_a_new_segment_148780bc');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.to_create_a_new_segment_click_on_the_create_segment__d760e992',
          );
        },
      },
      {
        id: 3,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_automate_segment_updates_cfea8a61');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_you_can_automate_segment_updates_by_setting_your_deed0d12',
          );
        },
      },
      {
        id: 4,
        get question() {
          return i18n.t('ui.data.landing.faqs.what_data_can_be_used_for_segmentation_af670bdb');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.you_can_use_a_wide_variety_of_data_for_segmentation__9b1fe870',
          );
        },
      },
      {
        id: 5,
        get question() {
          return i18n.t('ui.data.landing.faqs.is_there_a_limit_to_the_number_of_segments_f041f4c5');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.no_our_system_allows_you_to_create_unlimited_segment_b0ace070',
          );
        },
      },
      {
        id: 6,
        get question() {
          return i18n.t(
            'ui.data.landing.faqs.can_i_combine_multiple_criteria_for_a_segment_53663cc4',
          );
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_you_can_combine_multiple_criteria_when_defining__dd98447c',
          );
        },
      },
      {
        id: 7,
        get question() {
          return i18n.t('ui.data.landing.faqs.how_often_should_i_update_my_segments_62816227');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.the_frequency_of_updating_your_segments_depends_on_y_eac62d03',
          );
        },
      },
      {
        id: 8,
        get question() {
          return i18n.t('ui.data.landing.faqs.do_segments_support_custom_attributes_c5086fce');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_you_can_include_custom_attributes_in_your_segmen_bb35bfd9',
          );
        },
      },
      {
        id: 9,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_exclude_certain_users_from_a_segment_37a97e8a');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_you_can_exclude_specific_users_or_groups_of_user_54e38182',
          );
        },
      },
      {
        id: 10,
        get question() {
          return i18n.t('ui.data.landing.faqs.what_is_dynamic_segmentation_987c77c3');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.dynamic_segmentation_is_a_powerful_feature_that_auto_ed4da681',
          );
        },
      },
    ],
  },
  {
    id: 'billing',
    get title() {
      return i18n.t('ui.data.landing.faqs.billing_abaec452');
    },
    get description() {
      return i18n.t(
        'ui.data.landing.faqs.billing_made_easy_transparent_flexible_and_always_up_fe499b32',
      );
    },
    avatar: {
      icon: 'material-symbols:request-quote-outline-rounded',
      color: 'info',
    },
    isPopular: true,
    items: [
      {
        id: 1,
        get question() {
          return i18n.t('ui.data.landing.faqs.how_do_i_update_my_billing_information_22337515');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.to_update_your_billing_information_go_to_the_billing_77dfd20d',
          );
        },
      },
      {
        id: 2,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_download_my_invoices_fb7c5ed1');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_invoices_can_be_downloaded_from_the_billing_sect_373be5e1',
          );
        },
      },
      {
        id: 3,
        get question() {
          return i18n.t('ui.data.landing.faqs.do_you_send_billing_reminders_f5e42d10');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_billing_reminders_are_sent_7_days_before_payment_91d473eb',
          );
        },
      },
      {
        id: 4,
        get question() {
          return i18n.t('ui.data.landing.faqs.what_happens_if_a_payment_fails_3b5c45a1');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.if_a_payment_fails_you_will_receive_an_immediate_ema_ca5fb05e',
          );
        },
      },
      {
        id: 5,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_set_up_auto_renewal_e37329eb');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_auto_renewal_is_available_for_all_plans_to_enabl_063d6ce2',
          );
        },
      },
      {
        id: 6,
        get question() {
          return i18n.t('ui.data.landing.faqs.how_can_i_view_my_billing_history_60333766');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.to_view_your_billing_history_navigate_to_the_billing_5d283051',
          );
        },
      },
      {
        id: 7,
        get question() {
          return i18n.t('ui.data.landing.faqs.is_there_a_late_fee_for_missed_payments_c12892db');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_a_late_fee_may_apply_if_a_payment_is_missed_howe_11e41991',
          );
        },
      },
      {
        id: 8,
        get question() {
          return i18n.t(
            'ui.data.landing.faqs.can_i_receive_invoices_in_a_specific_currency_465c0ce2',
          );
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.invoices_are_generally_issued_in_your_account_s_defa_56c64f02',
          );
        },
      },
      {
        id: 9,
        get question() {
          return i18n.t('ui.data.landing.faqs.what_payment_methods_are_accepted_5b6d1356');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.we_accept_a_variety_of_payment_methods_including_cre_cfc63666',
          );
        },
      },
      {
        id: 10,
        get question() {
          return i18n.t('ui.data.landing.faqs.how_do_i_apply_a_discount_code_1fcd026d');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.to_apply_a_discount_code_go_to_the_billing_section_o_64718a9c',
          );
        },
      },
    ],
  },
  {
    id: 'accounts',
    get title() {
      return i18n.t('ui.data.landing.faqs.accounts_36bae316');
    },
    get description() {
      return i18n.t(
        'ui.data.landing.faqs.manage_user_accounts_access_levels_and_personal_sett_c4b77913',
      );
    },
    avatar: {
      icon: 'material-symbols:manage-accounts-outline-rounded',
      color: 'error',
    },
    isPopular: true,
    items: [
      {
        id: 1,
        get question() {
          return i18n.t('ui.data.landing.faqs.how_do_i_reset_my_password_644ffa3e');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.to_reset_your_password_click_the_forgot_password_lin_573c9658',
          );
        },
      },
      {
        id: 2,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_have_multiple_accounts_e1368310');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_you_can_create_multiple_accounts_but_each_accoun_75de8a67',
          );
        },
      },
      {
        id: 3,
        get question() {
          return i18n.t('ui.data.landing.faqs.how_do_i_delete_my_account_33e3b64a');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.to_delete_your_account_navigate_to_the_account_setti_50c56250',
          );
        },
      },
      {
        id: 4,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_change_my_email_address_d25de7da');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_you_can_change_your_email_address_from_the_accou_3d79372b',
          );
        },
      },
      {
        id: 5,
        get question() {
          return i18n.t('ui.data.landing.faqs.is_two_factor_authentication_available_ab865e88');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_two_factor_authentication_2fa_is_available_and_c_b6544356',
          );
        },
      },
    ],
  },
  {
    id: 'security',
    get title() {
      return i18n.t('ui.data.landing.faqs.security_f25ce1b8');
    },
    get description() {
      return i18n.t(
        'ui.data.landing.faqs.covering_data_protection_access_controls_and_complia_ca9bedeb',
      );
    },
    avatar: {
      icon: 'material-symbols:verified-user-outline-rounded',
      color: 'error',
    },
    items: [
      {
        id: 1,
        get question() {
          return i18n.t('ui.data.landing.faqs.how_is_my_data_protected_3934bd8b');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.we_implement_strong_encryption_both_in_transit_and_a_9592cb81',
          );
        },
      },
      {
        id: 2,
        get question() {
          return i18n.t('ui.data.landing.faqs.do_you_comply_with_gdpr_and_hipaa_9c9363bd');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_our_platform_is_fully_compliant_with_gdpr_and_hi_f66b8156',
          );
        },
      },
      {
        id: 3,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_set_role_based_access_controls_647dfd93');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_administrators_can_assign_different_access_level_145f0b56',
          );
        },
      },
      {
        id: 4,
        get question() {
          return i18n.t('ui.data.landing.faqs.do_you_perform_regular_security_audits_62d0d3b9');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_we_perform_internal_and_external_audits_regularl_f355a4a6',
          );
        },
      },
      {
        id: 5,
        get question() {
          return i18n.t('ui.data.landing.faqs.is_multi_factor_authentication_available_e9ba9d68');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.absolutely_mfa_can_be_enabled_for_all_accounts_to_ad_1c7007fd',
          );
        },
      },
    ],
  },
  {
    id: 'support',
    get title() {
      return i18n.t('ui.data.landing.faqs.support_f32d5a3b');
    },
    get description() {
      return i18n.t(
        'ui.data.landing.faqs.for_contacting_help_tickets_or_using_the_help_center_3562a9fb',
      );
    },
    avatar: {
      icon: 'material-symbols:support-agent-rounded',
      color: 'info',
    },
    items: [
      {
        id: 1,
        get question() {
          return i18n.t('ui.data.landing.faqs.how_can_i_contact_support_3c3bd904');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.you_can_reach_support_through_email_live_chat_or_by__454b5b98',
          );
        },
      },
      {
        id: 2,
        get question() {
          return i18n.t('ui.data.landing.faqs.do_you_offer_priority_support_4015e7bf');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_premium_plans_include_priority_support_with_fast_081cd1ce',
          );
        },
      },
      {
        id: 3,
        get question() {
          return i18n.t(
            'ui.data.landing.faqs.where_can_i_find_tutorials_or_documentation_66a54ae8',
          );
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.all_guides_faqs_and_tutorials_are_available_in_our_h_4c09b22c',
          );
        },
      },
      {
        id: 4,
        get question() {
          return i18n.t('ui.data.landing.faqs.what_is_the_typical_response_time_31090361');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.response_times_vary_by_plan_standard_support_typical_d8e02ab9',
          );
        },
      },
      {
        id: 5,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_track_my_support_tickets_7f4dff84');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_all_submitted_tickets_can_be_tracked_within_your_68bd2a6a',
          );
        },
      },
    ],
  },
  {
    id: 'usersTeams',
    get title() {
      return i18n.t('ui.data.landing.faqs.users_teams_2e8858a0');
    },
    get description() {
      return i18n.t(
        'ui.data.landing.faqs.manage_user_roles_permissions_and_team_collaboration_c6f17218',
      );
    },
    avatar: {
      icon: 'material-symbols:supervisor-account-outline-rounded',
      color: 'primary',
    },
    items: [
      {
        id: 1,
        get question() {
          return i18n.t('ui.data.landing.faqs.how_do_i_add_new_team_members_53a5b2fe');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.to_add_a_new_user_go_to_the_users_teams_section_in_y_7e7dc65b',
          );
        },
      },
      {
        id: 2,
        get question() {
          return i18n.t('ui.data.landing.faqs.what_roles_are_available_05670a11');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.roles_include_admin_manager_and_member_admins_have_f_3e7ced50',
          );
        },
      },
      {
        id: 3,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_assign_custom_permissions_e5d3707b');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_admins_can_configure_custom_permissions_to_restr_d8c1bc93',
          );
        },
      },
      {
        id: 4,
        get question() {
          return i18n.t(
            'ui.data.landing.faqs.is_there_a_limit_to_the_number_of_team_members_efef70dc',
          );
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.no_our_platform_supports_unlimited_team_members_pric_8f777095',
          );
        },
      },
      {
        id: 5,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_remove_or_deactivate_users_44c7cdd8');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_users_can_be_deactivated_or_permanently_removed__07eafc1b',
          );
        },
      },
    ],
  },
  {
    id: 'analyticsReports',
    get title() {
      return i18n.t('ui.data.landing.faqs.analytics_reports_982d33da');
    },
    get description() {
      return i18n.t('ui.data.landing.faqs.for_dashboards_kpis_and_performance_metrics_cfd3e660');
    },
    avatar: {
      icon: 'material-symbols:analytics-outline-rounded',
      color: 'warning',
    },
    items: [
      {
        id: 1,
        get question() {
          return i18n.t('ui.data.landing.faqs.what_analytics_are_included_8bfe25cf');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.our_analytics_dashboard_includes_kpis_like_active_us_b962d543',
          );
        },
      },
      {
        id: 2,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_i_export_reports_958e5316');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_reports_can_be_exported_in_pdf_csv_or_excel_form_dc319d86',
          );
        },
      },
      {
        id: 3,
        get question() {
          return i18n.t('ui.data.landing.faqs.do_you_support_custom_dashboards_bb45865b');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_you_can_create_custom_dashboards_by_selecting_wi_161bad07',
          );
        },
      },
      {
        id: 4,
        get question() {
          return i18n.t('ui.data.landing.faqs.are_real_time_insights_available_401ddd43');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_real_time_data_updates_allow_you_to_monitor_perf_f597ea74',
          );
        },
      },
      {
        id: 5,
        get question() {
          return i18n.t('ui.data.landing.faqs.can_reports_be_scheduled_automatically_b434dcbe');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_you_can_schedule_automated_report_deliveries_on__46f01134',
          );
        },
      },
      {
        id: 6,
        get question() {
          return i18n.t('ui.data.landing.faqs.do_you_integrate_with_bi_tools_8c79524f');
        },
        get answer() {
          return i18n.t(
            'ui.data.landing.faqs.yes_our_analytics_can_integrate_with_tools_like_tabl_37033f47',
          );
        },
      },
    ],
  },
];
