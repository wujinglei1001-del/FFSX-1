import { users } from 'data/users';
import i18n from 'locales/i18n';

export const taskMetrics = [
  {
    get title() {
      return i18n.t('ui.data.project.dashboard.running_73989d9c');
    },
    count: 7,
    change: {
      amount: 2,
      direction: 'less',
      timeFrame: 'last month',
    },
    icon: {
      name: 'material-symbols:note-outline',
      color: 'primary',
    },
  },
  {
    get title() {
      return i18n.t('ui.data.project.dashboard.completed_1798b3ba');
    },
    count: 24,
    change: {
      amount: 5,
      direction: 'more',
      timeFrame: 'last week',
    },
    icon: {
      name: 'material-symbols:check-box-outline',
      color: 'success',
    },
  },
  {
    get title() {
      return i18n.t('ui.data.project.dashboard.due_soon_6975cc6c');
    },
    count: 23,
    deadlineRange: '03 Mar',
    icon: {
      name: 'material-symbols:hourglass-empty',
      color: 'warning',
    },
  },
];

export const deadlineMetrics = [
  { id: 1, completed: 'before', count: 3, prevCompleteCount: 3 },
  { id: 2, completed: 'on', count: 14, prevCompleteCount: 17 },
  { id: 3, completed: 'after', count: 6, prevCompleteCount: 5 },
];

export const upcomingMeetings = [
  {
    id: 1,
    get title() {
      return i18n.t('ui.data.project.dashboard.catching_up_on_regular_updates_0fbe24e0');
    },
    date: '11 March, 2023',
    time: '3:30 PM',
    status: {
      get label() {
        return i18n.t('ui.data.project.dashboard.now_e3b82040');
      },
      active: true,
    },
    joinMeetLink: '#!',
    attendants: [users[3], users[4], users[6], users[10], users[11], users[13]],
  },
  {
    id: 2,
    get title() {
      return i18n.t('ui.data.project.dashboard.meeting_with_project_lead_9fbcec00');
    },
    date: '13 March, 2023',
    time: '9:30 PM',
    status: {
      get label() {
        return i18n.t('ui.data.project.dashboard.2_days_4d2463e1');
      },
    },
    attendants: [users[2], users[3]],
  },
  {
    id: 3,
    get title() {
      return i18n.t(
        'ui.data.project.dashboard.discussion_with_the_developers_on_planning_b7fcec91',
      );
    },
    date: '16 March, 2023',
    time: '7:30 PM',
    status: {
      get label() {
        return i18n.t('ui.data.project.dashboard.3_days_09ad9df4');
      },
    },
    attendants: [users[5], users[7], users[8], users[9]],
  },
  {
    id: 4,
    get title() {
      return i18n.t('ui.data.project.dashboard.quick_idea_sharing_session_db16a025');
    },
    date: '17 March, 2023',
    time: '12:00 PM',
    status: {
      get label() {
        return i18n.t('ui.data.project.dashboard.4_days_8948b448');
      },
    },
    attendants: [users[3], users[1], users[10]],
  },
];

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

export const projectTimelineData = [
  {
    id: 1,
    get label() {
      return i18n.t('ui.data.project.dashboard.design_new_app_284fd187');
    },
    status: 'ongoing',
    tasks: [
      {
        id: 1,
        get label() {
          return i18n.t('ui.data.project.dashboard.research_user_needs_a1c76a4c');
        },
        amountDone: 100,
        startDate: new Date(currentYear, currentMonth, 1).getTime(),
        endDate: new Date(currentYear, currentMonth, 10).getTime(),
      },
      {
        id: 2,
        get label() {
          return i18n.t('ui.data.project.dashboard.create_wireframe_layouts_bf5d068e');
        },
        amountDone: 100,
        startDate: new Date(currentYear, currentMonth, 11).getTime(),
        endDate: new Date(currentYear, currentMonth, 20).getTime(),
      },
      {
        id: 15,
        get label() {
          return i18n.t('ui.data.project.dashboard.post_deployment_monitoring_a7241d9e');
        },
        amountDone: 0,
        startDate: new Date(currentYear, currentMonth, 22).getTime(),
        endDate: new Date(currentYear, currentMonth + 1, 10).getTime(),
      },
      {
        id: 16,
        get label() {
          return i18n.t('ui.data.project.dashboard.final_system_optimizations_e9546755');
        },
        amountDone: 0,
        startDate: new Date(currentYear, currentMonth + 1, 11).getTime(),
        endDate: new Date(currentYear, currentMonth + 1, 26).getTime(),
      },
    ],
  },
  {
    id: 2,
    get label() {
      return i18n.t('ui.data.project.dashboard.new_dashboard_892bc5fe');
    },
    status: 'ongoing',
    tasks: [
      {
        id: 3,
        get label() {
          return i18n.t('ui.data.project.dashboard.finish_designing_30534b46');
        },
        amountDone: 90,
        startDate: new Date(currentYear, currentMonth, 1).getTime(),
        endDate: new Date(currentYear, currentMonth, 5).getTime(),
      },
      {
        id: 4,
        get label() {
          return i18n.t('ui.data.project.dashboard.system_deployment_d298894c');
        },
        amountDone: 90,
        startDate: new Date(currentYear, currentMonth, 6).getTime(),
        endDate: new Date(currentYear, currentMonth, 24).getTime(),
      },
      {
        id: 13,
        get label() {
          return i18n.t('ui.data.project.dashboard.user_testing_and_feedback_a2f5de63');
        },
        amountDone: 0,
        startDate: new Date(currentYear, currentMonth, 25).getTime(),
        endDate: new Date(currentYear, currentMonth + 1, 15).getTime(),
      },
      {
        id: 14,
        get label() {
          return i18n.t('ui.data.project.dashboard.design_finalization_15435ce6');
        },
        amountDone: 0,
        startDate: new Date(currentYear, currentMonth + 1, 16).getTime(),
        endDate: new Date(currentYear, currentMonth + 1, 27).getTime(),
      },
    ],
  },
  {
    id: 3,
    get label() {
      return i18n.t('ui.data.project.dashboard.falcon_development_e35dc874');
    },
    status: 'due',
    tasks: [
      {
        id: 5,
        get label() {
          return i18n.t('ui.data.project.dashboard.analyze_competitor_apps_61c7dc2d');
        },
        amountDone: 0,
        startDate: new Date(currentYear, currentMonth, 1).getTime(),
        endDate: new Date(currentYear, currentMonth, 9).getTime(),
      },
      {
        id: 6,
        get label() {
          return i18n.t('ui.data.project.dashboard.design_database_schema_103a0393');
        },
        amountDone: 0,
        startDate: new Date(currentYear, currentMonth, 10).getTime(),
        endDate: new Date(currentYear, currentMonth, 27).getTime(),
      },
      {
        id: 17,
        get label() {
          return i18n.t('ui.data.project.dashboard.setup_development_environment_f2f0a502');
        },
        amountDone: 0,
        startDate: new Date(currentYear, currentMonth, 28).getTime(),
        endDate: new Date(currentYear, currentMonth + 1, 10).getTime(),
      },
      {
        id: 18,
        get label() {
          return i18n.t('ui.data.project.dashboard.begin_core_development_8ec48cbc');
        },
        amountDone: 0,
        startDate: new Date(currentYear, currentMonth + 1, 11).getTime(),
        endDate: new Date(currentYear, currentMonth + 1, 28).getTime(),
      },
    ],
  },
  {
    id: 4,
    get label() {
      return i18n.t('ui.data.project.dashboard.phoenix_travel_app_9aee7a6c');
    },
    status: 'complete',
    tasks: [
      {
        id: 7,
        get label() {
          return i18n.t('ui.data.project.dashboard.develop_backend_services_510009a4');
        },
        amountDone: 100,
        startDate: new Date(currentYear, currentMonth, 1).getTime(),
        endDate: new Date(currentYear, currentMonth, 3).getTime(),
      },
      {
        id: 8,
        get label() {
          return i18n.t('ui.data.project.dashboard.gather_user_requirements_376c5fe2');
        },
        amountDone: 100,
        startDate: new Date(currentYear, currentMonth, 4).getTime(),
        endDate: new Date(currentYear, currentMonth, 31).getTime(),
      },
      {
        id: 19,
        get label() {
          return i18n.t('ui.data.project.dashboard.app_integration_testing_3e2f5c01');
        },
        amountDone: 0,
        startDate: new Date(currentYear, currentMonth + 1, 3).getTime(),
        endDate: new Date(currentYear, currentMonth + 1, 12).getTime(),
      },
      {
        id: 20,
        get label() {
          return i18n.t('ui.data.project.dashboard.final_debugging_and_deployment_3a50ab67');
        },
        amountDone: 0,
        startDate: new Date(currentYear, currentMonth + 1, 14).getTime(),
        endDate: new Date(currentYear, currentMonth + 1, 28).getTime(),
      },
    ],
  },
  {
    id: 5,
    get label() {
      return i18n.t('ui.data.project.dashboard.design_finance_app_3b868179');
    },
    status: 'complete',
    tasks: [
      {
        id: 9,
        get label() {
          return i18n.t(
            'ui.data.project.dashboard.implement_authentication_and_authorization_11d4f550',
          );
        },
        amountDone: 100,
        startDate: new Date(currentYear, currentMonth, 1).getTime(),
        endDate: new Date(currentYear, currentMonth, 24).getTime(),
      },
      {
        id: 22,
        get label() {
          return i18n.t('ui.data.project.dashboard.security_audits_and_final_review_ec6a6b82');
        },
        amountDone: 0,
        startDate: new Date(currentYear, currentMonth, 26).getTime(),
        endDate: new Date(currentYear, currentMonth + 1, 24).getTime(),
      },
    ],
  },
  {
    id: 6,
    get label() {
      return i18n.t('ui.data.project.dashboard.update_figma_file_92b34fba');
    },
    status: 'complete',
    tasks: [
      {
        id: 10,
        get label() {
          return i18n.t('ui.data.project.dashboard.develop_initial_prototype_8c3c98d9');
        },
        amountDone: 100,
        startDate: new Date(currentYear, currentMonth, 1).getTime(),
        endDate: new Date(currentYear, currentMonth, 5).getTime(),
      },
      {
        id: 11,
        get label() {
          return i18n.t('ui.data.project.dashboard.identify_elements_to_be_updated_8ff28ac5');
        },
        amountDone: 100,
        startDate: new Date(currentYear, currentMonth, 6).getTime(),
        endDate: new Date(currentYear, currentMonth, 12).getTime(),
      },
      {
        id: 12,
        get label() {
          return i18n.t('ui.data.project.dashboard.create_detailed_project_plan_0273ec3f');
        },
        amountDone: 100,
        startDate: new Date(currentYear, currentMonth, 13).getTime(),
        endDate: new Date(currentYear, currentMonth, 27).getTime(),
      },
      {
        id: 23,
        get label() {
          return i18n.t('ui.data.project.dashboard.ui_ux_refinements_and_updates_ed7ba151');
        },
        amountDone: 0,
        startDate: new Date(currentYear, currentMonth, 28).getTime(),
        endDate: new Date(currentYear, currentMonth + 1, 15).getTime(),
      },
      {
        id: 24,
        get label() {
          return i18n.t('ui.data.project.dashboard.final_prototype_approval_cd2d8333');
        },
        amountDone: 0,
        startDate: new Date(currentYear, currentMonth + 1, 16).getTime(),
        endDate: new Date(currentYear, currentMonth + 1, 28).getTime(),
      },
    ],
  },
];

export const projectHours = {
  aurora: [65, 65, 90, 90, 275, 275, 375, 150, 120],
  falcon: [50, 26, 75, 50, 175, 175, 105, 260, 350],
  phoenix: [25, 85, 45, 140, 140, 340, 155, 205, 190],
};

export const projectsInfos = [
  {
    id: 1,
    name: 'Aurora',
    color: 'primary',
    tasks: [
      {
        id: 1,
        name: 'Design new app',
        eta: '2023-11-16',
        lead: users[5],
        members: [users[15], users[5], users[13]],
        progress: 100,
        state: 'Done',
      },
    ],
  },
  {
    id: 2,
    name: 'Falcon',
    color: 'warning',
    tasks: [
      {
        id: 1,
        name: 'Create Detailed Project Plan',
        eta: '2023-11-25',
        lead: users[15],
        members: [users[2], users[1], users[3], users[12], users[14], users[5]],
        progress: 46.8,
        state: 'Overdue',
      },
      {
        id: 2,
        name: 'Develop Initial Prototype',
        eta: '2023-11-29',
        lead: users[14],
        members: [users[3], users[13], users[2]],
        progress: 20.2,
        state: 'Delayed',
      },
      {
        id: 3,
        name: 'Perform Quality Assurance Testing',
        eta: '2023-12-02',
        lead: users[13],
        members: [users[4], users[8], users[5], users[7]],
        progress: 80,
        state: 'On Track',
      },
    ],
  },
];

export const events = [
  {
    id: 1,
    get title() {
      return i18n.t('ui.data.project.dashboard.redesign_module_96db2e81');
    },
    allDayEvent: true,
    category: 'important',
    startDate: '2024-11-19',
    startTime: '9:00 am',
    endDate: '2024-11-21',
    endTime: '5:00 pm',
    members: [users[15], users[5], users[13]],
    eventType: 'physical',
    virtualLink: '#!',
    physical: 'Abc street',
    notificationMinutesBefore: 15,
    color: 'warning',
  },
  {
    id: 2,
    get title() {
      return i18n.t(
        'ui.data.project.dashboard.monthly_team_meeting_for_falcon_react_project_2ec87ab6',
      );
    },
    allDayEvent: false,
    category: 'upcoming',
    startDate: '2024-11-30',
    startTime: '7:00 am',
    members: [users[2], users[1], users[3], users[12], users[14], users[5]],
    eventType: 'online',
    virtualLink: 'https://meet.google.com/abc-123',
    notificationMinutesBefore: 45,
    color: 'success',
  },
  {
    id: 3,
    get title() {
      return i18n.t('ui.data.project.dashboard.gta_vi_trailer_release_watch_party_43c397b9');
    },
    allDayEvent: false,
    category: 'my_events',
    startDate: '2024-12-05',
    startTime: '12:00 pm',
    eventType: 'physical',
    virtualLink: '#!',
    physical: 'Abc street',
    notificationMinutesBefore: 30,
    members: [users[4], users[8], users[5], users[7]],
    color: 'primary',
  },
  {
    id: 4,
    get title() {
      return i18n.t('ui.data.project.dashboard.celebration_for_gta_vi_trailer_release_12211acb');
    },
    allDayEvent: false,
    category: 'upcoming',
    startDate: '2024-12-08',
    startTime: '4:00 pm',
    members: [users[15], users[5], users[13]],
    eventType: 'hybrid',
    virtualLink: 'https://meet.google.com/abc-123',
    physical: 'Abc street',
    notificationMinutesBefore: 15,
    color: 'success',
  },
];

export const eventCategories = [
  {
    value: 'my_events',
    get label() {
      return i18n.t('ui.data.project.dashboard.my_events_6b1e7803');
    },
    color: 'primary',
  },
  {
    value: 'upcoming',
    get label() {
      return i18n.t('ui.data.project.dashboard.upcoming_523baab9');
    },
    color: 'success',
  },
  {
    value: 'important',
    get label() {
      return i18n.t('ui.data.project.dashboard.important_4b6d6a30');
    },
    color: 'warning',
  },
];
