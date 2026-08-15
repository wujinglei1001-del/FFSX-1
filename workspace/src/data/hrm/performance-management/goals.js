import { users } from 'data/users';
import i18n from 'locales/i18n';

export const getTagChipColor = (tag) => {
  switch (tag) {
    case 'High':
      return 'success';
    case 'In Progress':
      return 'primary';
    case 'Hold':
      return 'neutral';
    case 'Medium':
    case 'Delayed':
      return 'warning';
    case 'At Risk':
    case 'Low':
      return 'error';
  }
};

export const goals = [
  {
    id: 1,
    get title() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.prepare_and_launch_the_next_version_of_the_aurora_pl_c71ea393',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.i_applied_to_this_company_because_of_its_strong_repu_2f03a318',
      );
    },
    createdBy: users[0],
    progress: 20,
    createdDate: '2022-07-10',
    dueDate: '2022-08-15',
    tags: ['High', 'In Progress'],
    subGoals: [
      'Release Aurora within 7 days',
      'Release Phoenix within 5 days',
      'Release Falcon within 3 days',
    ],
  },
  {
    id: 2,
    get title() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.launch_beta_testing_program_for_the_new_mobile_appli_35baca08',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.i_applied_to_this_company_because_of_its_strong_repu_2f03a318',
      );
    },
    createdBy: users[1],
    progress: 30,
    createdDate: '2025-04-01',
    dueDate: '2025-04-20',
    tags: ['High', 'Delayed'],
    subGoals: [
      'Release Aurora within 7 days',
      'Release Phoenix within 5 days',
      'Release Falcon within 3 days',
    ],
  },
  {
    id: 3,
    get title() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.integrate_third_party_payroll_system_with_internal_h_5d1298d4',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.i_applied_to_this_company_because_of_its_strong_repu_2f03a318',
      );
    },
    createdBy: users[2],
    progress: 30,
    createdDate: '2021-12-15',
    dueDate: '2022-01-10',
    tags: ['Medium', 'Hold'],
    subGoals: [
      'Release Aurora within 7 days',
      'Release Phoenix within 5 days',
      'Release Falcon within 3 days',
    ],
  },
  {
    id: 4,
    get title() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.roll_out_marketing_campaign_to_support_upcoming_feat_b6cb6c61',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.i_applied_to_this_company_because_of_its_strong_repu_2f03a318',
      );
    },
    createdBy: users[3],
    progress: 30,
    createdDate: '2023-06-01',
    dueDate: '2023-07-04',
    tags: ['High', 'In Progress'],
    subGoals: [
      'Release Aurora within 7 days',
      'Release Phoenix within 5 days',
      'Release Falcon within 3 days',
    ],
  },
  {
    id: 5,
    get title() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.redesign_the_user_dashboard_to_improve_engagement_an_47bb9231',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.i_applied_to_this_company_because_of_its_strong_repu_2f03a318',
      );
    },
    createdBy: users[4],
    progress: 50,
    createdDate: '2023-09-21',
    dueDate: '2023-10-14',
    tags: ['Low', 'In Progress'],
    subGoals: [
      'Release Aurora within 7 days',
      'Release Phoenix within 5 days',
      'Release Falcon within 3 days',
    ],
  },
  {
    id: 6,
    get title() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.develop_and_deploy_the_new_time_tracking_module_for__06646e76',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.i_applied_to_this_company_because_of_its_strong_repu_2f03a318',
      );
    },
    createdBy: users[5],
    progress: 30,
    createdDate: '2024-12-28',
    dueDate: '2025-02-28',
    tags: ['High', 'At Risk'],
    subGoals: [
      'Release Aurora within 7 days',
      'Release Phoenix within 5 days',
      'Release Falcon within 3 days',
    ],
  },
  {
    id: 7,
    get title() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.streamline_the_onboarding_workflow_across_all_depart_55852364',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.i_applied_to_this_company_because_of_its_strong_repu_2f03a318',
      );
    },
    createdBy: users[6],
    progress: 90,
    createdDate: '2023-05-15',
    dueDate: '2023-06-05',
    tags: ['High', 'In Progress'],
    subGoals: [
      'Release Aurora within 7 days',
      'Release Phoenix within 5 days',
      'Release Falcon within 3 days',
    ],
  },
  {
    id: 8,
    get title() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.conduct_a_full_security_audit_and_implement_recommen_a2949c61',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.i_applied_to_this_company_because_of_its_strong_repu_2f03a318',
      );
    },
    createdBy: users[7],
    progress: 30,
    createdDate: '2024-02-25',
    dueDate: '2024-03-15',
    tags: ['High', 'In Progress'],
    subGoals: [
      'Release Aurora within 7 days',
      'Release Phoenix within 5 days',
      'Release Falcon within 3 days',
    ],
  },
  {
    id: 9,
    get title() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.prepare_and_launch_the_next_version_of_the_aurora_pl_c71ea393',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.i_applied_to_this_company_because_of_its_strong_repu_2f03a318',
      );
    },
    createdBy: users[8],
    progress: 25,
    createdDate: '2022-10-10',
    dueDate: '2022-11-11',
    tags: ['High', 'In Progress'],
    subGoals: [
      'Release Aurora within 7 days',
      'Release Phoenix within 5 days',
      'Release Falcon within 3 days',
    ],
  },
  {
    id: 10,
    get title() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.prepare_and_launch_the_next_version_of_the_aurora_pl_c71ea393',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.i_applied_to_this_company_because_of_its_strong_repu_2f03a318',
      );
    },
    createdBy: users[9],
    progress: 40,
    createdDate: '2022-08-15',
    dueDate: '2022-09-30',
    tags: ['High', 'In Progress'],
    subGoals: [
      'Release Aurora within 7 days',
      'Release Phoenix within 5 days',
      'Release Falcon within 3 days',
    ],
  },
  {
    id: 11,
    get title() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.prepare_and_launch_the_next_version_of_the_aurora_pl_c71ea393',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.i_applied_to_this_company_because_of_its_strong_repu_2f03a318',
      );
    },
    createdBy: users[10],
    progress: 70,
    createdDate: '2022-04-15',
    dueDate: '2022-05-22',
    tags: ['High', 'In Progress'],
    subGoals: [
      'Release Aurora within 7 days',
      'Release Phoenix within 5 days',
      'Release Falcon within 3 days',
    ],
  },
  {
    id: 12,
    get title() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.prepare_and_launch_the_next_version_of_the_aurora_pl_c71ea393',
      );
    },
    get description() {
      return i18n.t(
        'ui.data.hrm.performance_management.goals.i_applied_to_this_company_because_of_its_strong_repu_2f03a318',
      );
    },
    createdBy: users[11],
    progress: 30,
    createdDate: '2021-11-13',
    dueDate: '2021-12-01',
    tags: ['High', 'In Progress'],
    subGoals: [
      'Release Aurora within 7 days',
      'Release Phoenix within 5 days',
      'Release Falcon within 3 days',
    ],
  },
];

export const comments = [
  {
    id: 1,
    author: {
      ...users[13],
      name: 'Uncle Owen',
    },
    createdAt: '2025-09-14T15:14:00',
    message: {
      get text() {
        return i18n.t(
          'ui.data.hrm.performance_management.goals.modern_architecture_is_truly_redefining_our_world_th_4f3a47a2',
        );
      },
    },
    engagement: {
      likes: 2000,
      comments: 34,
    },
    replies: [],
  },
  {
    id: 2,
    author: users[3],
    createdAt: '2025-09-14T14:28:00',
    message: {
      get text() {
        return i18n.t(
          'ui.data.hrm.performance_management.goals.loved_the_futuristic_designs_in_this_video_it_s_amaz_21e6a6e4',
        );
      },
    },
    engagement: {
      likes: 14200,
      comments: 134,
    },
    replies: [
      {
        id: 3,
        author: users[8],
        createdAt: '2025-09-14T14:50:00',
        message: {
          get text() {
            return i18n.t(
              'ui.data.hrm.performance_management.goals.the_focus_on_sustainability_in_architecture_is_inspi_a4627b52',
            );
          },
        },
        engagement: {
          likes: 11,
          comments: 3,
        },
        replies: [],
      },
      {
        id: 4,
        author: {
          ...users[13],
          name: 'Uncle Owen',
        },
        createdAt: '2025-09-14T15:15:00',
        message: {
          get text() {
            return i18n.t(
              'ui.data.hrm.performance_management.goals.these_structures_are_truly_ahead_of_their_time_can_t_80f002dc',
            );
          },
        },
        engagement: {
          likes: 32,
          comments: 19,
        },
        replies: [],
      },
      {
        id: 5,
        author: users[5],
        createdAt: '2025-09-14T15:20:00',
        message: {
          get text() {
            return i18n.t(
              'ui.data.hrm.performance_management.goals.incredible_how_modern_architecture_blends_technology_286ffa55',
            );
          },
        },
        engagement: {
          likes: 22,
          comments: 13,
        },
        replies: [],
      },
    ],
  },
];
