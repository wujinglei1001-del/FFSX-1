import { users } from 'data/users';
import i18n from 'locales/i18n';

// Stats
export const statData = [
  {
    get title() {
      return i18n.t('ui.data.hiring.dashboard.active_job_277c9b2c');
    },
    subTitle: 'previous month',
    value: '2080',
    icon: 'material-symbols:work-outline',
  },
  {
    get title() {
      return i18n.t('ui.data.hiring.dashboard.applied_a3e4a569');
    },
    subTitle: 'previous month',
    value: 1000100,
    icon: 'material-symbols:person-outline-rounded',
  },
  {
    get title() {
      return i18n.t('ui.data.hiring.dashboard.reviewed_31ef8593');
    },
    subTitle: 'previous month',
    value: 900200,
    icon: 'material-symbols:preview-outline',
  },
  {
    get title() {
      return i18n.t('ui.data.hiring.dashboard.interviewed_9d7031dc');
    },
    subTitle: 'previous month',
    value: 800400,
    icon: 'material-symbols:group-outline',
  },
  {
    get title() {
      return i18n.t('ui.data.hiring.dashboard.offered_a1bf1adc');
    },
    subTitle: 'previous month',
    value: 3500,
    icon: 'material-symbols:docs-outline-rounded',
  },
  {
    get title() {
      return i18n.t('ui.data.hiring.dashboard.hired_115779ef');
    },
    subTitle: 'previous month',
    value: 1400,
    icon: 'material-symbols:thumb-up-outline',
  },
];

// Candidate Sources
export const candidateSourcesData = [
  {
    name: 'Boards',
    value: 19444,
  },
  {
    name: 'Referrals',
    value: 13889,
  },
  {
    name: 'Agency',
    value: 11111,
  },
  {
    name: 'Socials',
    value: 25000,
  },
  {
    name: 'Website',
    value: 16667,
  },
  {
    name: 'Others',
    value: 13889,
  },
];

// My Positions
export const positionsData = [
  {
    get title() {
      return i18n.t('ui.data.hiring.dashboard.customer_support_manager_75bb9b1a');
    },
    field: 'Support',
    location: 'New York',
    users: [users[4], users[1], users[15], users[12], users[0], users[13]],
    status: {
      get text() {
        return i18n.t('ui.data.hiring.dashboard.active_a733b809');
      },
      color: 'success',
    },
  },
  {
    get title() {
      return i18n.t('ui.data.hiring.dashboard.software_engineer_84f982e5');
    },
    field: 'Engineering',
    location: 'San Francisco',
    users: [users[4], users[8], users[5], users[7]],
    status: {
      get text() {
        return i18n.t('ui.data.hiring.dashboard.active_a733b809');
      },
      color: 'success',
    },
  },
  {
    get title() {
      return i18n.t('ui.data.hiring.dashboard.ui_ux_designer_a3c75d30');
    },
    field: 'Design',
    location: 'London',
    users: [users[2], users[1], users[3], users[12], users[0], users[13]],
    status: {
      get text() {
        return i18n.t('ui.data.hiring.dashboard.active_a733b809');
      },
      color: 'success',
    },
  },
  {
    get title() {
      return i18n.t('ui.data.hiring.dashboard.product_manager_564b6173');
    },
    field: 'Product',
    location: 'Chicago',
    users: [users[15], users[5], users[13]],
    status: {
      get text() {
        return i18n.t('ui.data.hiring.dashboard.closed_88d86b77');
      },
      color: 'neutral',
    },
  },
  {
    get title() {
      return i18n.t('ui.data.hiring.dashboard.digital_marketing_executive_ef223438');
    },
    field: 'Support',
    location: 'New York',
    users: [users[2], users[1], users[3], users[12], users[0], users[13]],
    status: {
      get text() {
        return i18n.t('ui.data.hiring.dashboard.active_a733b809');
      },
      color: 'success',
    },
  },
];

// New Hires
export const newHiresData = [
  { ...users[7], designation: 'HR Manager', location: 'Dhaka', joiningDate: '2025-06-01' },
  { ...users[2], designation: 'Software Engineer', location: 'Seoul', joiningDate: '2025-06-02' },
  { ...users[13], designation: 'Sales Executive', location: 'Dubai', joiningDate: '2025-06-03' },
  { ...users[5], designation: 'UI/UX Designer', location: 'Toronto', joiningDate: '2025-06-04' },
  { ...users[8], designation: 'QA Analyst', location: 'London', joiningDate: '2025-06-05' },
];

// Meetings
export const meetingsData = [
  {
    type: 'Panel Interview',
    get title() {
      return i18n.t('ui.data.hiring.dashboard.technical_interview_with_martin_parr_7618f997');
    },
    time: '02:00 pm',
    duration: '45 min',
    status: {
      icon: 'material-symbols:autorenew-rounded',
      color: 'primary',
      get text() {
        return i18n.t('ui.data.hiring.dashboard.on_going_e284b4ea');
      },
    },
  },
  {
    type: 'One-on-One',
    get title() {
      return i18n.t('ui.data.hiring.dashboard.hr_screening_with_emily_tran_142b6ae3');
    },
    time: '12:00 pm',
    duration: '45 min',
    status: {
      icon: 'material-symbols:check-rounded',
      color: 'success',
      get text() {
        return i18n.t('ui.data.hiring.dashboard.done_e9b450d1');
      },
    },
  },
  {
    type: 'Panel Interview',
    get title() {
      return i18n.t('ui.data.hiring.dashboard.final_round_interview_with_jake_oliver_26da8882');
    },
    time: '10:00 pm',
    duration: '1 hr',
    status: {
      icon: 'material-symbols:close-rounded',
      color: 'error',
      get text() {
        return i18n.t('ui.data.hiring.dashboard.cancelled_a1bf92ef');
      },
    },
  },
  {
    type: 'Panel Interview',
    get title() {
      return i18n.t('ui.data.hiring.dashboard.technical_interview_with_sarah_williams_54fbcbec');
    },
    time: '09:00 am',
    duration: '45 min',
    status: {
      icon: 'material-symbols:check-rounded',
      color: 'success',
      get text() {
        return i18n.t('ui.data.hiring.dashboard.done_e9b450d1');
      },
    },
  },
];

// Candidates
export const candidatesData = [
  7000, 9000, 8500, 9000, 6000, 8500, 5000, 7500, 10500, 5000, 5500, 8500, 10500, 6500, 4000, 6000,
  9000, 8000,
];

// Pipeline
export const pipelineData = [
  {
    id: 1,
    jobPosition: {
      get title() {
        return i18n.t('ui.data.hiring.dashboard.software_engineer_84f982e5');
      },
      field: 'Engineering',
    },
    vacancy: 1,
    hiringManager: users[0],
    applied: 300,
    reviewed: 150,
    mobileScreen: 80,
    interview: 50,
    offer: 20,
    hired: 2,
    rejected: 16,
  },
  {
    id: 2,
    jobPosition: {
      get title() {
        return i18n.t('ui.data.hiring.dashboard.digital_marketing_executive_ef223438');
      },
      field: 'Marketing',
    },
    vacancy: 2,
    hiringManager: users[7],
    applied: 300,
    reviewed: 150,
    mobileScreen: 80,
    interview: 50,
    offer: 20,
    hired: null,
    rejected: null,
  },
  {
    id: 3,
    jobPosition: {
      get title() {
        return i18n.t('ui.data.hiring.dashboard.qa_engineering_ac4389c5');
      },
      field: 'Engineering',
    },
    vacancy: 3,
    hiringManager: users[15],
    applied: 300,
    reviewed: 150,
    mobileScreen: 80,
    interview: null,
    offer: null,
    hired: null,
    rejected: null,
  },
  {
    id: 4,
    jobPosition: {
      get title() {
        return i18n.t('ui.data.hiring.dashboard.finance_associate_8d9793ee');
      },
      field: 'Finance',
    },
    vacancy: 5,
    hiringManager: users[5],
    applied: 300,
    reviewed: 150,
    mobileScreen: 80,
    interview: null,
    offer: 20,
    hired: null,
    rejected: null,
  },
  {
    id: 5,
    jobPosition: {
      get title() {
        return i18n.t('ui.data.hiring.dashboard.ui_ux_designer_a3c75d30');
      },
      field: 'Designer',
    },
    vacancy: 1,
    hiringManager: users[8],
    applied: 300,
    reviewed: 150,
    mobileScreen: 80,
    interview: 50,
    offer: 20,
    hired: null,
    rejected: null,
  },
  {
    id: 6,
    jobPosition: {
      get title() {
        return i18n.t('ui.data.hiring.dashboard.customer_support_specialist_15624923');
      },
      field: 'Customer Support',
    },
    vacancy: 2,
    hiringManager: users[1],
    applied: 300,
    reviewed: 150,
    mobileScreen: null,
    interview: null,
    offer: null,
    hired: null,
    rejected: null,
  },
  {
    id: 7,
    jobPosition: {
      get title() {
        return i18n.t('ui.data.hiring.dashboard.sales_executive_1d4a31e5');
      },
      field: 'Sales',
    },
    vacancy: 1,
    hiringManager: users[11],
    applied: 300,
    reviewed: 150,
    mobileScreen: 80,
    interview: null,
    offer: 20,
    hired: 2,
    rejected: 16,
  },
  {
    id: 8,
    jobPosition: {
      get title() {
        return i18n.t('ui.data.hiring.dashboard.hr_coordinator_1fc1cd43');
      },
      field: 'Human Resources',
    },
    vacancy: 2,
    hiringManager: users[3],
    applied: 300,
    reviewed: 150,
    mobileScreen: null,
    interview: 40,
    offer: 10,
    hired: 1,
    rejected: 8,
  },
  {
    id: 9,
    jobPosition: {
      get title() {
        return i18n.t('ui.data.hiring.dashboard.product_manager_564b6173');
      },
      field: 'Product',
    },
    vacancy: 1,
    hiringManager: users[9],
    applied: 300,
    reviewed: 150,
    mobileScreen: 80,
    interview: 60,
    offer: 15,
    hired: null,
    rejected: null,
  },
  {
    id: 10,
    jobPosition: {
      get title() {
        return i18n.t('ui.data.hiring.dashboard.data_analyst_c5923c83');
      },
      field: 'Data Science',
    },
    vacancy: 2,
    hiringManager: users[12],
    applied: 300,
    reviewed: 150,
    mobileScreen: 80,
    interview: 45,
    offer: 12,
    hired: 1,
    rejected: 6,
  },
  {
    id: 11,
    jobPosition: {
      get title() {
        return i18n.t('ui.data.hiring.dashboard.content_writer_b718c88f');
      },
      field: 'Marketing',
    },
    vacancy: 3,
    hiringManager: users[4],
    applied: 300,
    reviewed: 150,
    mobileScreen: null,
    interview: null,
    offer: null,
    hired: null,
    rejected: null,
  },
  {
    id: 12,
    jobPosition: {
      get title() {
        return i18n.t('ui.data.hiring.dashboard.devops_engineer_44daf5ae');
      },
      field: 'Engineering',
    },
    vacancy: 2,
    hiringManager: users[6],
    applied: 300,
    reviewed: 150,
    mobileScreen: 80,
    interview: 55,
    offer: 18,
    hired: 2,
    rejected: 10,
  },
  {
    id: 13,
    jobPosition: {
      get title() {
        return i18n.t('ui.data.hiring.dashboard.legal_advisor_7e6e8464');
      },
      field: 'Legal',
    },
    vacancy: 1,
    hiringManager: users[14],
    applied: 300,
    reviewed: 150,
    mobileScreen: null,
    interview: 20,
    offer: 5,
    hired: null,
    rejected: 4,
  },
  {
    id: 14,
    jobPosition: {
      get title() {
        return i18n.t('ui.data.hiring.dashboard.operations_manager_72cfe578');
      },
      field: 'Operations',
    },
    vacancy: 2,
    hiringManager: users[10],
    applied: 300,
    reviewed: 150,
    mobileScreen: 80,
    interview: 50,
    offer: 22,
    hired: 2,
    rejected: 15,
  },
];
