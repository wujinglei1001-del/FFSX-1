import { initialConfig } from 'config';
import { users } from 'data/users';
import i18n from 'locales/i18n';
import paths from 'routes/paths';

const blog = (index) => `${initialConfig.assetsDir}/images/landing/blog/${index}.webp`;
const interfaceShowcase = (index) => `/assets/images/showcase/${index}.webp`;
const themedInterfaceShowcase = (light, dark) => ({
  light: interfaceShowcase(light),
  dark: interfaceShowcase(dark),
});
const landingExample = (index) => ({
  light: `${initialConfig.assetsDir}/images/landing/examples/${index}.webp`,
  dark: `${initialConfig.assetsDir}/images/landing/examples/${index}-dark.webp`,
});
const testimonial = (index) =>
  `${initialConfig.assetsDir}/images/landing/testimonial/${index}.webp`;

export const showcaseData = [
  {
    title: '全球贸易协作网络',
    img: landingExample(4),
    subtitle: '让需求、角色与服务能力建立可信连接',
    desc: '连接跨境卖家、工厂、采购商、物流、海外仓和企业服务机构，让真实需求进入统一的数字协作网络。',
    href: paths.chat,
  },
  {
    title: '跨境履约与全程追踪',
    img: landingExample(2),
    subtitle: '连接订单、仓储、物流与交付状态',
    desc: '将分散的订单和履约信息汇集到统一流程中，让企业持续掌握仓储、运输、异常与交付进度。',
    href: paths.ecommerce,
  },
  {
    title: '企业协同与任务执行',
    img: themedInterfaceShowcase(4, 3),
    subtitle: '让跨组织合作转化为清晰、可追踪的任务',
    desc: '通过团队任务、客户管理、文件、审批和数据看板，为贸易生态中的企业协作提供稳定的执行基础。',
    href: paths.project,
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
    img: interfaceShowcase(12),
    component: 'client-locations',
    name: '全球贸易协作网络',
  },
  {
    img: themedInterfaceShowcase(4, 3),
    name: 'AI 需求匹配界面',
  },
  {
    img: landingExample(2),
    name: '跨境履约控制台',
  },
  {
    img: landingExample(5),
    name: '开放 API 与系统集成',
  },
  {
    img: themedInterfaceShowcase(2, 1),
    name: '数据分析与业务追踪',
  },
  {
    img: landingExample(4),
    name: '企业实时协作',
  },
  {
    img: {
      light: `${initialConfig.assetsDir}/images/landing/examples/1.webp`,
      dark: `${initialConfig.assetsDir}/images/landing/examples/1.webp`,
    },
    name: '多语言与全球运营',
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
