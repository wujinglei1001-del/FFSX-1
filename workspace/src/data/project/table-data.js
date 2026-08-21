import { users } from 'data/users';
import i18n from 'locales/i18n';

export const thisMonthTasks = [
  {
    id: '0',
    get name() {
      return i18n.t(
        'ui.data.project.table_data.plan_and_organize_the_design_review_meeting_541343a3',
      );
    },
    collaborator: [users[15], users[5], users[13]],
    status: 'Running',
    get label() {
      return i18n.t('ui.data.project.table_data.feature_ad565d9d');
    },
    priority: 'Medium',
    dependingOn: 'Prepare all design drafts before final submission.',
    startDate: '2025-03-03',
    dueDate: '2025-03-15',
  },
  {
    id: '1',
    get name() {
      return i18n.t(
        'ui.data.project.table_data.finalize_sprint_backlog_for_the_current_iteration_09c08e88',
      );
    },
    collaborator: [users[2], users[1], users[3], users[12], users[14]],
    status: 'Pending',
    get label() {
      return i18n.t('ui.data.project.table_data.update_fb91e24f');
    },
    priority: 'High',
    dependingOn: 'Wait for feedback from QA before final merge.',
    startDate: '2025-03-05',
    dueDate: '2025-03-22',
    subTasks: [
      {
        id: '1.0',
        get name() {
          return i18n.t(
            'ui.data.project.table_data.fix_critical_ui_bugs_from_latest_release_1183e73a',
          );
        },
        collaborator: [users[4], users[8], users[7]],
        status: 'Running',
        get label() {
          return i18n.t('ui.data.project.table_data.bug_271befc0');
        },
        priority: 'Critical',
        dependingOn: 'Dependent on API bug fix.',
        startDate: '2025-03-06',
        dueDate: '2025-03-12',
      },
      {
        id: '1.1',
        name: 'Integrate user analytics module.',
        collaborator: [users[9], users[0]],
        status: 'Running',
        get label() {
          return i18n.t('ui.data.project.table_data.feature_ad565d9d');
        },
        priority: 'Medium',
        dependingOn: 'Requires backend endpoints from analytics team.',
        startDate: '2025-03-08',
        dueDate: '2025-03-20',
      },
      {
        id: '1.2',
        name: 'Optimize image loading performance.',
        collaborator: [users[9], users[0]],
        status: 'Pending',
        get label() {
          return i18n.t('ui.data.project.table_data.update_fb91e24f');
        },
        priority: 'Low',
        dependingOn: 'Wait for updated CDN configuration.',
        startDate: '2025-03-09',
        dueDate: '2025-03-19',
      },
    ],
  },
  {
    id: '2',
    name: 'Prepare documentation for client handoff.',
    collaborator: [users[9], users[0]],
    status: 'Completed',
    get label() {
      return i18n.t('ui.data.project.table_data.issue_73781a12');
    },
    priority: 'Medium',
    dependingOn: 'Review internal QA report before delivery.',
    startDate: '2025-03-10',
    dueDate: '2025-03-18',
  },
  {
    id: '3',
    name: 'Conduct team retrospective meeting.',
    collaborator: [users[4], users[8], users[7]],
    status: 'Running',
    get label() {
      return i18n.t('ui.data.project.table_data.update_fb91e24f');
    },
    priority: 'Low',
    dependingOn: 'All sprint tasks should be completed first.',
    startDate: '2025-03-11',
    dueDate: '2025-03-13',
  },
];

export const nextMonthTasks = [
  {
    id: '0',
    get name() {
      return i18n.t(
        'ui.data.project.table_data.launch_the_beta_version_of_the_new_dashboard_961205ba',
      );
    },
    collaborator: [users[2], users[3], users[14]],
    status: 'Running',
    get label() {
      return i18n.t('ui.data.project.table_data.feature_ad565d9d');
    },
    priority: 'High',
    dependingOn: 'Finalize frontend QA checklist before release.',
    startDate: '2025-04-02',
    dueDate: '2025-04-18',
    subTasks: [
      {
        id: '0.0',
        get name() {
          return i18n.t(
            'ui.data.project.table_data.refine_authentication_flow_and_token_refresh_cbbad0ad',
          );
        },
        collaborator: [users[9], users[0]],
        status: 'Running',
        get label() {
          return i18n.t('ui.data.project.table_data.bug_271befc0');
        },
        priority: 'High',
        dependingOn: 'Needs backend API integration first.',
        startDate: '2025-04-03',
        dueDate: '2025-04-10',
      },
      {
        id: '0.1',
        get name() {
          return i18n.t(
            'ui.data.project.table_data.implement_responsive_design_for_tablet_view_b791ab52',
          );
        },
        collaborator: [users[5], users[7]],
        status: 'Running',
        get label() {
          return i18n.t('ui.data.project.table_data.update_fb91e24f');
        },
        priority: 'Medium',
        dependingOn: 'Wait for design team’s final layout specs.',
        startDate: '2025-04-04',
        dueDate: '2025-04-15',
      },
    ],
  },
  {
    id: '1',
    name: 'Prepare financial report for Q2 planning.',
    collaborator: [users[11], users[6]],
    status: 'Pending',
    get label() {
      return i18n.t('ui.data.project.table_data.issue_73781a12');
    },
    priority: 'High',
    dependingOn: 'Collect data from all regional managers.',
    startDate: '2025-04-10',
    dueDate: '2025-04-25',
  },
  {
    id: '2',
    name: 'Set up monitoring and alerting pipeline.',
    collaborator: [users[4], users[8]],
    status: 'Running',
    get label() {
      return i18n.t('ui.data.project.table_data.feature_ad565d9d');
    },
    priority: 'Critical',
    dependingOn: 'Dependent on infra team’s environment setup.',
    startDate: '2025-04-08',
    dueDate: '2025-04-21',
  },
];

export const followingMonthTasks = [
  {
    id: '0',
    get name() {
      return i18n.t(
        'ui.data.project.table_data.run_usability_testing_for_onboarding_flow_ed55a513',
      );
    },
    collaborator: [users[12], users[5], users[6]],
    status: 'Running',
    get label() {
      return i18n.t('ui.data.project.table_data.feature_ad565d9d');
    },
    priority: 'Medium',
    dependingOn: 'Collect feedback before final UI pass.',
    startDate: '2025-05-05',
    dueDate: '2025-05-20',
    subTasks: [
      {
        id: '0.0',
        get name() {
          return i18n.t(
            'ui.data.project.table_data.prepare_test_scripts_for_usability_interviews_dd3bf59a',
          );
        },
        collaborator: [users[4], users[8]],
        status: 'Completed',
        get label() {
          return i18n.t('ui.data.project.table_data.update_fb91e24f');
        },
        priority: 'Low',
        dependingOn: 'Confirm testing schedule with users.',
        startDate: '2025-05-06',
        dueDate: '2025-05-10',
      },
      {
        id: '0.1',
        get name() {
          return i18n.t(
            'ui.data.project.table_data.summarize_results_and_create_presentation_slides_30caa896',
          );
        },
        collaborator: [users[9], users[0]],
        status: 'Pending',
        get label() {
          return i18n.t('ui.data.project.table_data.issue_73781a12');
        },
        priority: 'Medium',
        dependingOn: 'Dependent on final interview recordings.',
        startDate: '2025-05-11',
        dueDate: '2025-05-17',
      },
    ],
  },
  {
    id: '1',
    get name() {
      return i18n.t(
        'ui.data.project.table_data.upgrade_all_dependencies_to_the_latest_versions_5f138a37',
      );
    },
    collaborator: [users[3], users[11]],
    status: 'Running',
    get label() {
      return i18n.t('ui.data.project.table_data.update_fb91e24f');
    },
    priority: 'Medium',
    dependingOn: 'Check for breaking changes in MUI v7.',
    startDate: '2025-05-08',
    dueDate: '2025-05-14',
  },
  {
    id: '2',
    name: 'Deploy production release for v3.0.',
    collaborator: [users[7], users[12], users[5]],
    status: 'Pending',
    get label() {
      return i18n.t('ui.data.project.table_data.feature_ad565d9d');
    },
    priority: 'High',
    dependingOn: 'Wait for final QA approval.',
    startDate: '2025-05-15',
    dueDate: '2025-05-25',
  },
  {
    id: '3',
    name: 'Conduct customer feedback analysis.',
    collaborator: [users[0], users[9], users[3]],
    status: 'Running',
    get label() {
      return i18n.t('ui.data.project.table_data.issue_73781a12');
    },
    priority: 'Low',
    dependingOn: 'Collect survey results before meeting.',
    startDate: '2025-05-12',
    dueDate: '2025-05-18',
  },
];
