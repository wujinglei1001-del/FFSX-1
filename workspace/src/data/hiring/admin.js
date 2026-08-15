import { users } from 'data/users';
import i18n from 'locales/i18n';

export const jobOpenings = [
  {
    id: 1,
    get title() {
      return i18n.t('ui.data.hiring.admin.customer_support_manager_75bb9b1a');
    },
    field: 'Support',
    branch: 'Chicago',
    vacancy: 1,
    candidates: 12,
    hiringLead: 'Mason Rivers',
    tags: [
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.fulltime_a8ea7bb5');
        },
        color: 'primary',
      },
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.remote_c93f6536');
        },
        color: 'warning',
      },
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.day_shift_70395dd5');
        },
        color: 'info',
      },
    ],
    postedDate: '2024-10-23',
  },
  {
    id: 2,
    get title() {
      return i18n.t('ui.data.hiring.admin.sales_executive_1d4a31e5');
    },
    field: 'Sales',
    branch: 'UK',
    vacancy: 4,
    candidates: 30,
    hiringLead: 'Oliver Stone',
    tags: [
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.fulltime_a8ea7bb5');
        },
        color: 'primary',
      },
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.onsite_26d61588');
        },
        color: 'warning',
      },
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.night_shift_ae6f283d');
        },
        color: 'info',
      },
    ],
    postedDate: '2024-08-21',
  },
  {
    id: 3,
    get title() {
      return i18n.t('ui.data.hiring.admin.data_scientist_e13230c6');
    },
    field: 'Data & Analytics',
    branch: 'Dhaka',
    vacancy: 10,
    candidates: 8,
    hiringLead: 'Lucas Grant',
    tags: [
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.fulltime_a8ea7bb5');
        },
        color: 'primary',
      },
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.hybrid_8e01f6bc');
        },
        color: 'warning',
      },
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.day_shift_70395dd5');
        },
        color: 'info',
      },
    ],
    postedDate: '2024-06-22',
  },
  {
    id: 4,
    get title() {
      return i18n.t('ui.data.hiring.admin.frontend_developer_c56054b1');
    },
    field: 'Engineering',
    branch: 'New York',
    vacancy: 1,
    candidates: 12,
    hiringLead: 'Mason Rivers',
    tags: [
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.contract_5a0ba3bb');
        },
        color: 'primary',
      },
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.onsite_26d61588');
        },
        color: 'warning',
      },
    ],
    postedDate: '2025-12-01',
  },
  {
    id: 5,
    get title() {
      return i18n.t('ui.data.hiring.admin.ui_ux_designer_a3c75d30');
    },
    field: 'Design',
    branch: 'UK',
    vacancy: 4,
    candidates: 30,
    hiringLead: 'Oliver Stone',
    tags: [
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.parttime_cff88811');
        },
        color: 'primary',
      },
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.remote_c93f6536');
        },
        color: 'warning',
      },
    ],
    postedDate: '2025-10-5',
  },
  {
    id: 6,
    get title() {
      return i18n.t('ui.data.hiring.admin.financial_analyst_eb44e1c0');
    },
    field: 'Finance',
    branch: 'Manchester',
    vacancy: 10,
    candidates: 8,
    hiringLead: 'Lucas Grant',
    tags: [
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.fulltime_a8ea7bb5');
        },
        color: 'primary',
      },
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.onsite_26d61588');
        },
        color: 'warning',
      },
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.day_shift_70395dd5');
        },
        color: 'info',
      },
    ],
    postedDate: '2025-08-15',
  },
  {
    id: 7,
    get title() {
      return i18n.t('ui.data.hiring.admin.backend_developer_9d4b5f2f');
    },
    field: 'Engineering',
    branch: 'Los Angeles',
    vacancy: 1,
    candidates: 12,
    hiringLead: 'Mason Rivers',
    tags: [
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.fulltime_a8ea7bb5');
        },
        color: 'primary',
      },
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.onsite_26d61588');
        },
        color: 'warning',
      },
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.night_shift_ae6f283d');
        },
        color: 'info',
      },
    ],
    postedDate: '2026-01-20',
  },
  {
    id: 8,
    get title() {
      return i18n.t('ui.data.hiring.admin.product_manager_564b6173');
    },
    field: 'Product',
    branch: 'Birmingham',
    vacancy: 4,
    candidates: 30,
    hiringLead: 'Oliver Stone',
    tags: [
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.parttime_cff88811');
        },
        color: 'primary',
      },
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.onsite_26d61588');
        },
        color: 'warning',
      },
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.day_shift_70395dd5');
        },
        color: 'info',
      },
    ],
    postedDate: '2026-05-12',
  },
  {
    id: 9,
    get title() {
      return i18n.t('ui.data.hiring.admin.hr_manager_9ff495c2');
    },
    field: 'HR',
    branch: 'Liverpool',
    vacancy: 10,
    candidates: 8,
    hiringLead: 'Lucas Grant',
    tags: [
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.parttime_cff88811');
        },
        color: 'primary',
      },
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.remote_c93f6536');
        },
        color: 'warning',
      },
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.night_shift_ae6f283d');
        },
        color: 'info',
      },
    ],
    postedDate: '2026-04-25',
  },
  {
    id: 10,
    get title() {
      return i18n.t('ui.data.hiring.admin.devops_engineer_44daf5ae');
    },
    field: 'IT',
    branch: 'San Fransisco',
    vacancy: 1,
    candidates: 12,
    hiringLead: 'Mason Rivers',
    tags: [
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.parttime_cff88811');
        },
        color: 'primary',
      },
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.hybrid_8e01f6bc');
        },
        color: 'warning',
      },
    ],
    postedDate: '2026-02-14',
  },
  {
    id: 11,
    get title() {
      return i18n.t('ui.data.hiring.admin.sales_executive_1d4a31e5');
    },
    field: 'Sales',
    branch: 'Edinburgh',
    vacancy: 4,
    candidates: 30,
    hiringLead: 'Oliver Stone',
    tags: [
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.fulltime_a8ea7bb5');
        },
        color: 'primary',
      },
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.remote_c93f6536');
        },
        color: 'warning',
      },
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.day_shift_70395dd5');
        },
        color: 'info',
      },
    ],
    postedDate: '2026-05-30',
  },
  {
    id: 12,
    get title() {
      return i18n.t('ui.data.hiring.admin.data_scientist_e13230c6');
    },
    field: 'Data & Analytics',
    branch: 'Glasgow',
    vacancy: 10,
    candidates: 8,
    hiringLead: 'Lucas Grant',
    tags: [
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.contract_5a0ba3bb');
        },
        color: 'primary',
      },
      {
        get label() {
          return i18n.t('ui.data.hiring.admin.onsite_26d61588');
        },
        color: 'warning',
      },
    ],
    postedDate: '2026-06-18',
  },
];

export const pipelineData = [
  {
    id: 'list-1',
    get title() {
      return i18n.t('ui.data.hiring.admin.applied_a3e4a569');
    },
    items: [
      {
        id: 'item-1',
        user: users[2],
        rating: 0,
        appliedDate: '2025-03-23',
      },
      {
        id: 'item-2',
        user: users[15],
        rating: 0,
        appliedDate: '2025-03-12',
      },
      {
        id: 'item-3',
        user: users[13],
        rating: 0,
        appliedDate: '2025-03-14',
      },
      {
        id: 'item-4',
        user: users[4],
        rating: 0,
        appliedDate: '2025-02-16',
      },
      {
        id: 'item-5',
        user: users[14],
        rating: 0,
        appliedDate: '2025-02-14',
      },
      {
        id: 'item-6',
        user: users[12],
        rating: 0,
        appliedDate: '2025-02-14',
        comments: 1,
      },
    ],
  },
  {
    id: 'list-2',
    get title() {
      return i18n.t('ui.data.hiring.admin.reviewed_31ef8593');
    },
    items: [
      {
        id: 'item-7',
        user: users[3],
        rating: 3,
        appliedDate: '2025-04-4',
      },
      {
        id: 'item-8',
        user: users[2],
        rating: 3,
        appliedDate: '2025-04-3',
      },
      {
        id: 'item-9',
        user: users[1],
        rating: 3,
        appliedDate: '2025-04-2',
      },
      {
        id: 'item-10',
        user: users[9],
        rating: 3,
        appliedDate: '2025-04-1',
      },
    ],
  },
  {
    id: 'list-3',
    get title() {
      return i18n.t('ui.data.hiring.admin.mobile_screening_62809f11');
    },
    items: [
      {
        id: 'item-11',
        user: users[12],
        rating: 3,
        appliedDate: '2025-04-15',
        comments: 1,
      },
      {
        id: 'item-12',
        user: users[10],
        rating: 3,
        appliedDate: '2025-04-5',
      },
      {
        id: 'item-13',
        user: users[11],
        rating: 3,
        appliedDate: '2025-04-12',
      },
      {
        id: 'item-14',
        user: users[7],
        rating: 3,
        appliedDate: '2025-04-10',
        comments: 1,
      },
    ],
  },
  {
    id: 'list-4',
    get title() {
      return i18n.t('ui.data.hiring.admin.interview_19ad8ec7');
    },
    items: [
      {
        id: 'item-15',
        user: users[5],
        rating: 3,
        appliedDate: '2025-04-13',
      },
      {
        id: 'item-16',
        user: users[4],
        rating: 3,
        appliedDate: '2025-04-10',
        comments: 2,
      },
      {
        id: 'item-17',
        user: users[15],
        rating: 3,
        appliedDate: '2025-04-5',
      },
      {
        id: 'item-18',
        user: users[8],
        rating: 3,
        appliedDate: '2025-04-7',
        comments: 6,
      },
    ],
  },
  {
    id: 'list-5',
    get title() {
      return i18n.t('ui.data.hiring.admin.offer_3898b9aa');
    },
    items: [
      {
        id: 'item-19',
        user: users[2],
        rating: 3,
        appliedDate: '2025-04-9',
        comments: 4,
      },
      {
        id: 'item-20',
        user: users[10],
        rating: 3,
        appliedDate: '2025-04-12',
        comments: 5,
      },
      {
        id: 'item-21',
        user: users[3],
        rating: 3,
        appliedDate: '2025-04-8',
        comments: 6,
      },
      {
        id: 'item-22',
        user: users[5],
        rating: 3,
        appliedDate: '2025-04-6',
        comments: 3,
      },
    ],
  },
  {
    id: 'list-6',
    get title() {
      return i18n.t('ui.data.hiring.admin.hired_115779ef');
    },
    items: [
      {
        id: 'item-23',
        user: users[13],
        rating: 4,
        appliedDate: '2025-04-11',
        comments: 12,
      },
      {
        id: 'item-24',
        user: users[0],
        rating: 4,
        appliedDate: '2025-04-14',
        comments: 10,
      },
    ],
  },
];
