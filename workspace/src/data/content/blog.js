import { initialConfig } from 'config';
import i18n from 'locales/i18n';

const blog = (index) => `${initialConfig.assetsDir}/images/content/details/blog/${index}.webp`;

export const moreFromCreator = [
  {
    id: 1,
    type: 'blogs',
    category: 'Architecture',
    requiredTime: '12 min read',
    get title() {
      return i18n.t(
        'ui.data.content.blog.futuristic_architecture_how_cutting_edge_designs_are_fa34d7a8',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.blog.explore_the_latest_trends_in_futuristic_architecture_dff3a498',
      );
    },
    date: '2024-12-11',
    thumbnail: blog(5),
    uploadedBy: {
      name: 'Wild Planet Films',
    },
  },
  {
    id: 2,
    type: 'blogs',
    category: 'Architecture',
    requiredTime: '7 min read',
    get title() {
      return i18n.t(
        'ui.data.content.blog.from_sketch_to_structure_the_role_of_concept_art_in__87596285',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.blog.learn_how_concept_art_plays_a_crucial_role_in_archit_ad19c4b9',
      );
    },
    date: '2024-12-12',
    thumbnail: blog(6),
    uploadedBy: {
      name: 'Wild Planet Films',
    },
  },
  {
    id: 3,
    type: 'blogs',
    category: 'Concept Art',
    requiredTime: '11 min read',
    get title() {
      return i18n.t(
        'ui.data.content.blog.the_art_behind_world_building_how_concept_art_shapes_18d4c089',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.blog.dive_into_the_world_of_concept_art_and_discover_how__fee6f260',
      );
    },
    date: '2024-12-23',
    thumbnail: blog(7),
    uploadedBy: {
      name: 'Wild Planet Films',
    },
  },
];

export const blogDetailsTags = [
  {
    id: 1,
    get label() {
      return i18n.t('ui.data.content.blog.architecture_b040b417');
    },
  },
  {
    id: 2,
    get label() {
      return i18n.t('ui.data.content.blog.modern_3a4e447e');
    },
  },
  {
    id: 3,
    get label() {
      return i18n.t('ui.data.content.blog.design_59b03536');
    },
  },
  {
    id: 4,
    get label() {
      return i18n.t('ui.data.content.blog.modern_architecture_91d1a0ef');
    },
  },
  {
    id: 5,
    get label() {
      return i18n.t('ui.data.content.blog.sustainable_1797710f');
    },
  },
  {
    id: 6,
    get label() {
      return i18n.t('ui.data.content.blog.architect_16639cf7');
    },
  },
  {
    id: 7,
    get label() {
      return i18n.t('ui.data.content.blog.structure_9482c5d5');
    },
  },
  {
    id: 8,
    get label() {
      return i18n.t('ui.data.content.blog.landmark_8f625382');
    },
  },
  {
    id: 9,
    get label() {
      return i18n.t('ui.data.content.blog.innovative_material_ef7585eb');
    },
  },
  {
    id: 10,
    get label() {
      return i18n.t('ui.data.content.blog.form_80446347');
    },
  },
  {
    id: 11,
    get label() {
      return i18n.t('ui.data.content.blog.technology_d018b082');
    },
  },
];

export const blogRecommendations = [
  {
    id: 1,
    type: 'blogs',
    category: 'Architecture',
    requiredTime: '11 min read',
    get title() {
      return i18n.t(
        'ui.data.content.blog.the_future_of_architecture_how_smart_cities_are_tran_f57b677d',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.blog.explore_how_technology_ai_and_sustainable_design_are_615f1302',
      );
    },
    author: 'Alexander Quinn',
    date: '10 Dec, 2024',
    thumbnail: blog(8),
    uploadedBy: {
      name: 'Bob Borson',
    },
  },
  {
    id: 2,
    type: 'blogs',
    category: 'Concept Art',
    requiredTime: '3 min read',
    get title() {
      return i18n.t(
        'ui.data.content.blog.the_art_of_environment_design_how_concept_artists_cr_d8ba9cd8',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.blog.discover_the_techniques_concept_artists_use_to_craft_03b149de',
      );
    },
    author: 'Sophia Bennett',
    date: '10 Dec, 2024',
    thumbnail: blog(9),
    uploadedBy: {
      name: 'Syd Mead',
    },
  },
  {
    id: 3,
    type: 'blogs',
    category: 'Architecture',
    requiredTime: '20 min read',
    get title() {
      return i18n.t(
        'ui.data.content.blog.revolutionizing_skylines_the_rise_of_parametric_arch_617934ce',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.blog.learn_how_computational_design_and_algorithms_are_re_7fd0b514',
      );
    },
    author: 'Olivia Grant',
    date: '12 Dec, 2024',
    thumbnail: blog(10),
    uploadedBy: {
      name: 'Zaha Hadid',
    },
  },
  {
    id: 4,
    type: 'blogs',
    category: 'Concept Art',
    requiredTime: '7 min read',
    get title() {
      return i18n.t(
        'ui.data.content.blog.from_sketch_to_masterpiece_the_creative_process_behi_7da4439d',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.blog.a_deep_dive_into_how_concept_artists_develop_their_i_90b06f3a',
      );
    },
    author: 'Kevin Blake',
    date: '14 Dec, 2024',
    thumbnail: blog(11),
    uploadedBy: {
      name: 'Ralph McQuarrie',
    },
  },
  {
    id: 5,
    type: 'blogs',
    category: 'Architecture',
    requiredTime: '10 min read',
    get title() {
      return i18n.t(
        'ui.data.content.blog.adaptive_reuse_how_architects_are_breathing_new_life_a31aba38',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.content.blog.explore_how_historic_buildings_are_being_transformed_2741f7aa',
      );
    },
    author: 'Ralph McQuarrie',
    date: '17 Dec, 2024',
    thumbnail: blog(12),
    uploadedBy: {
      name: 'Francis D.K. Ching',
    },
  },
  {
    id: 6,
    type: 'blogs',
    category: 'Architecture',
    requiredTime: '15 min read',
    get title() {
      return i18n.t('ui.data.content.blog.fantastic_architecture_concepts_and_dreams_3be22cfe');
    },
    get description() {
      return i18n.t(
        'ui.data.content.blog.see_how_architects_are_pushing_the_boundaries_of_des_06435f3c',
      );
    },
    author: 'Syd Mead',
    date: '17 Dec, 2024',
    thumbnail: blog(13),
    uploadedBy: {
      name: 'Santiago Calatrava',
    },
  },
];

export const blogTableOfContents = [
  {
    id: 1,
    url: 'introduction',
    get label() {
      return i18n.t('ui.data.content.blog.introduction_2473e96b');
    },
  },
  {
    id: 2,
    url: 'evolution',
    get label() {
      return i18n.t('ui.data.content.blog.the_evolution_of_architecture_3b42d01c');
    },
  },
  {
    id: 3,
    url: 'principle',
    get label() {
      return i18n.t('ui.data.content.blog.core_principles_of_architecture_9cfe0d5d');
    },
  },
  {
    id: 4,
    url: 'iconic',
    get label() {
      return i18n.t('ui.data.content.blog.iconic_architecture_styles_87a979fb');
    },
  },
  {
    id: 5,
    url: 'role-of-technology',
    get label() {
      return i18n.t('ui.data.content.blog.the_role_of_technology_in_architecture_dff9ecc7');
    },
  },
  {
    id: 6,
    url: 'future-of-architecture',
    get label() {
      return i18n.t('ui.data.content.blog.the_future_of_architecture_8b5bed6a');
    },
  },
  {
    id: 7,
    url: 'conclusion',
    get label() {
      return i18n.t('ui.data.content.blog.conclusion_e39262de');
    },
  },
];
