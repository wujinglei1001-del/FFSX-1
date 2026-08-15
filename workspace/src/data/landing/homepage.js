import { initialConfig } from 'config';
import { users } from 'data/users';
import i18n from 'locales/i18n';

const blog = (index) => `${initialConfig.assetsDir}/images/landing/blog/${index}.webp`;
const gallery = (index) => `${initialConfig.assetsDir}/images/landing/gallery/${index}.webp`;
const testimonial = (index) =>
  `${initialConfig.assetsDir}/images/landing/testimonial/${index}.webp`;
const showcase = (index) => `${initialConfig.assetsDir}/images/landing/showcase/${index}.webp`;

export const showcaseData = [
  {
    get title() {
      return i18n.t('ui.data.landing.homepage.skyline_innovations_3311fec6');
    },
    img: showcase(1),
    get subtitle() {
      return i18n.t(
        'ui.data.landing.homepage.modern_architecture_reimagined_for_tomorrow_s_cities_36a0a5cc',
      );
    },
    desc: 'A forward-thinking project blending minimal design with functional elegance. This work emphasizes clean geometry and sustainable building practices to create inspiring spaces.',
  },
  {
    get title() {
      return i18n.t('ui.data.landing.homepage.quantum_leap_initiative_8f785a2e');
    },
    img: showcase(2),
    get subtitle() {
      return i18n.t(
        'ui.data.landing.homepage.pioneering_solutions_for_modern_infrastructure_755c8834',
      );
    },
    desc: 'A daring take on structural innovation merges advanced technology with classic design. This initiative demonstrates how contemporary construction can meet the urban challenges of the future.',
  },
  {
    get title() {
      return i18n.t('ui.data.landing.homepage.ecovision_project_246e5682');
    },
    img: showcase(3),
    get subtitle() {
      return i18n.t(
        'ui.data.landing.homepage.where_sustainability_meets_architectural_beauty_5b603c3a',
      );
    },
    desc: 'A project focused on eco-friendly materials and green architecture. Built with efficiency in mind, EcoVision highlights how smart design can minimize impact while maximizing aesthetic value.',
  },
];

export const featuresData = [
  {
    get title() {
      return i18n.t('ui.data.landing.homepage.real_time_collaboration_f67c2564');
    },
    get description() {
      return i18n.t(
        'ui.data.landing.homepage.an_intuitive_drag_and_drop_interface_for_easy_conten_aa2d7910',
      );
    },
  },
  {
    get title() {
      return i18n.t('ui.data.landing.homepage.guided_tutorials_491dfe8b');
    },
    get description() {
      return i18n.t(
        'ui.data.landing.homepage.a_notification_system_that_alerts_users_about_import_62fde3d0',
      );
    },
  },
  {
    get title() {
      return i18n.t('ui.data.landing.homepage.user_data_protection_c93265dc');
    },
    get description() {
      return i18n.t(
        'ui.data.landing.homepage.a_feedback_system_that_allows_users_to_share_their_t_2214fed2',
      );
    },
  },
  {
    get title() {
      return i18n.t('ui.data.landing.homepage.third_party_integration_503f5364');
    },
    get description() {
      return i18n.t(
        'ui.data.landing.homepage.a_responsive_design_that_ensures_optimal_performance_137ba95d',
      );
    },
  },
  {
    get title() {
      return i18n.t('ui.data.landing.homepage.adaptive_profiles_0a3e5574');
    },
    get description() {
      return i18n.t(
        'ui.data.landing.homepage.a_sleek_dashboard_that_provides_real_time_analytics__10e23476',
      );
    },
  },
  {
    get title() {
      return i18n.t('ui.data.landing.homepage.personalized_themes_4aef3556');
    },
    get description() {
      return i18n.t(
        'ui.data.landing.homepage.a_robust_search_feature_that_helps_users_find_conten_825f9a4a',
      );
    },
  },
];

export const galleryData = [
  {
    img: gallery(1),
    name: 'The Zenith UI/UX',
  },
  {
    img: gallery(2),
    name: 'The Atlas Interface',
  },
  {
    img: gallery(3),
    name: 'The Serpentine Design',
  },
  {
    img: gallery(4),
    name: 'Heritage Blueprint',
  },
  {
    img: gallery(5),
    name: 'The Vaulted Architecture',
  },
  {
    img: gallery(6),
    name: 'Quantum Framework',
  },
  {
    img: gallery(7),
    name: 'The Urban Experience',
  },
];

export const statsData = [
  {
    value: '4,000+',
    get label() {
      return i18n.t('ui.data.landing.homepage.users_and_still_counting_199d6e55');
    },
  },
  {
    value: '$25,000',
    get label() {
      return i18n.t('ui.data.landing.homepage.in_revenue_and_still_generating_31121901');
    },
  },
  {
    value: '3%',
    get label() {
      return i18n.t('ui.data.landing.homepage.flat_platform_fee_fa865c44');
    },
  },
  {
    value: '5,152',
    get label() {
      return i18n.t('ui.data.landing.homepage.transactions_this_year_e570c66c');
    },
  },
];

export const testimonialData = [
  {
    id: 0,
    rating: 5,
    review: 'I absolutely love the package I chose; it fits my needs perfectly!',
    name: 'Casey Adams',
    company: 'CEO, Limitless Ltd',
    img: testimonial(1),
  },
  {
    id: 1,
    rating: 4,
    review: 'I absolutely love the package I chose; it fits my needs perfectly!',
    name: 'Jake Peralta',
    company: 'CEO, Limitless Ltd',
    img: testimonial(2),
  },
  {
    id: 2,
    rating: 3,
    review: 'I absolutely love the package I chose; it fits my needs perfectly!',
    name: 'Charles Boyle',
    company: 'CEO, Limitless Ltd',
    img: testimonial(3),
  },
  {
    id: 3,
    rating: 4,
    review: 'I absolutely love the package I chose; it fits my needs perfectly!',
    name: 'Terry Jeffords',
    company: 'CEO, Limitless Ltd',
    img: testimonial(1),
  },
  {
    id: 4,
    rating: 5,
    review: 'I absolutely love the package I chose; it fits my needs perfectly!',
    name: 'Casey Adams',
    company: 'CEO, Limitless Ltd',
    img: testimonial(2),
  },
];

export const blogData = [
  {
    id: 1,
    img: blog(1),
    get title() {
      return i18n.t(
        'ui.data.landing.homepage.enhancing_your_conversion_rates_through_front_end_de_c23eb589',
      );
    },
    tag: 'Nature',
    date: '2024-12-31',
    timeRead: '12 min read',
    user: users[5],
    designation: 'Front end developer',
  },
  {
    id: 2,
    img: blog(2),
    get title() {
      return i18n.t(
        'ui.data.landing.homepage.boosting_your_conversion_rates_with_front_end_develo_590d771c',
      );
    },
    tag: 'Nature',
    date: '2024-12-31',
    timeRead: '12 min read',
    user: users[2],
    designation: 'Front end developer',
  },
  {
    id: 3,
    img: blog(3),
    get title() {
      return i18n.t(
        'ui.data.landing.homepage.improving_conversion_rates_via_front_end_development_1bc84e2d',
      );
    },
    tag: 'Nature',
    date: '2024-12-31',
    timeRead: '12 min read',
    user: users[13],
    designation: 'Front end developer',
  },
];

export const faqData = [
  {
    summary: 'How do I get started?',
    details:
      'Getting started is simple. Just sign up with your email, create an account, and you’ll have instant access to all the core features. You can explore the platform right away and upgrade later if you need advanced tools.',
  },
  {
    summary: 'Do I need to create an account to use this?',
    details:
      'Lorem ipsum dolor sit amet consectetur. Sed euismod scelerisque sed at. Adipiscing augue tempor tincidunt eu luctus massa facilisis. Mi a eget auctor et scelerisque bibendum sodales. Sagittis amet consequat integer blandit ut vitae tincidunt.',
  },
  {
    summary: 'Is there a free trial or demo available?',
    details:
      'Lorem ipsum dolor sit amet consectetur. Sed euismod scelerisque sed at. Adipiscing augue tempor tincidunt eu luctus massa facilisis. Mi a eget auctor et scelerisque bibendum sodales. Sagittis amet consequat integer blandit ut vitae tincidunt.',
  },
  {
    summary: 'What makes your product different from others?',
    details:
      'Lorem ipsum dolor sit amet consectetur. Sed euismod scelerisque sed at. Adipiscing augue tempor tincidunt eu luctus massa facilisis. Mi a eget auctor et scelerisque bibendum sodales. Sagittis amet consequat integer blandit ut vitae tincidunt.',
  },
  {
    summary: 'What payment methods do you accept?',
    details:
      'Lorem ipsum dolor sit amet consectetur. Sed euismod scelerisque sed at. Adipiscing augue tempor tincidunt eu luctus massa facilisis. Mi a eget auctor et scelerisque bibendum sodales. Sagittis amet consequat integer blandit ut vitae tincidunt.',
  },
];
