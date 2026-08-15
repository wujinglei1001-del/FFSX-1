import { users } from 'data/users';
import dayjs from 'dayjs';
import i18n from 'locales/i18n';

// Filter datasets (presentation only)
export const filterCollaborators = [
  {
    id: users[0].id,
    name: users[0].name,
    email: users[0].email,
    avatar: users[0].avatar,
    checked: true,
  },
  {
    id: users[1].id,
    name: users[1].name,
    email: users[1].email,
    avatar: users[1].avatar,
    checked: true,
  },
  {
    id: users[2].id,
    name: users[2].name,
    email: users[2].email,
    avatar: users[2].avatar,
    checked: false,
  },
  {
    id: users[3].id,
    name: users[3].name,
    email: users[3].email,
    avatar: users[3].avatar,
    checked: false,
  },
  {
    id: users[4].id,
    name: users[4].name,
    email: users[4].email,
    avatar: users[4].avatar,
    checked: false,
  },
  {
    id: users[5].id,
    name: users[5].name,
    email: users[5].email,
    avatar: users[5].avatar,
    checked: false,
  },
];

export const filterStatuses = [
  {
    get label() {
      return i18n.t('ui.data.project.timeline_data.to_do_8665aed3');
    },
    color: 'neutral',
  },
  {
    get label() {
      return i18n.t('ui.data.project.timeline_data.doing_9f1ffa41');
    },
    color: 'primary',
  },
  {
    get label() {
      return i18n.t('ui.data.project.timeline_data.done_e9b450d1');
    },
    color: 'success',
  },
];

export const filterPriorities = [
  {
    get label() {
      return i18n.t('ui.data.project.timeline_data.normal_45e118d0');
    },
    color: 'primary',
  },
  {
    get label() {
      return i18n.t('ui.data.project.timeline_data.high_b1a5954a');
    },
    color: 'warning',
  },
  {
    get label() {
      return i18n.t('ui.data.project.timeline_data.urgent_ecb26f46');
    },
    color: 'error',
  },
];

export const roleOptions = [
  {
    value: 'Member',
    get label() {
      return i18n.t('ui.data.project.timeline_data.member_6853c98a');
    },
  },
  {
    value: 'Admin',
    get label() {
      return i18n.t('ui.data.project.timeline_data.admin_4e7afebc');
    },
  },
  {
    value: 'Editor',
    get label() {
      return i18n.t('ui.data.project.timeline_data.editor_c7e9fb2e');
    },
  },
  {
    value: 'Viewer',
    get label() {
      return i18n.t('ui.data.project.timeline_data.viewer_dbad9f12');
    },
  },
  {
    value: 'Guest',
    get label() {
      return i18n.t('ui.data.project.timeline_data.guest_face83ee');
    },
  },
];

const fmt = (date) => date.format('DD-MM-YYYY');

export const generateTimelineTasks = () => {
  const today = dayjs();

  const startWindow = today.startOf('month');

  const ranges = {
    planning: {
      start: startWindow.add(3, 'day'),
      end: startWindow.add(30, 'day'),
    },
    development: {
      start: startWindow.add(3, 'day'),
      end: today.add(29, 'day'),
    },
    testing: {
      start: startWindow.add(3, 'day'),
      end: today.add(46, 'day'),
    },
  };

  return [
    // Planning
    {
      id: 'group-1',
      get text() {
        return i18n.t('ui.data.project.timeline_data.this_month_0f6cc3a8');
      },
      start_date: fmt(ranges.planning.start),
      end_date: fmt(ranges.planning.end),
      progress: 0.5,
      type: 'project',
      group: 'group-1',
      open: true,
    },
    {
      id: 'task-1-1',
      get text() {
        return i18n.t('ui.data.project.timeline_data.requirements_analysis_cd6e9ecb');
      },
      start_date: fmt(ranges.planning.start.subtract(3, 'day')),
      end_date: fmt(ranges.planning.start.add(7, 'day')),
      progress: 0.8,
      parent: 'group-1',
      type: 'task',
      group: 'group-1',
      completed: true,
    },
    {
      id: 'task-1-2',
      get text() {
        return i18n.t('ui.data.project.timeline_data.project_scope_definition_c525317f');
      },
      start_date: fmt(ranges.planning.start.add(8, 'day')),
      end_date: fmt(ranges.planning.start.add(15, 'day')),
      progress: 0.4,
      parent: 'group-1',
      type: 'task',
      group: 'group-1',
    },
    {
      id: 'task-1-3',
      get text() {
        return i18n.t('ui.data.project.timeline_data.resource_planning_15f74a6c');
      },
      start_date: fmt(ranges.planning.start.add(16, 'day')),
      end_date: fmt(ranges.planning.end),
      progress: 0.2,
      parent: 'group-1',
      type: 'task',
      group: 'group-1',
    },

    // Development
    {
      id: 'group-2',
      get text() {
        return i18n.t('ui.data.project.timeline_data.next_month_534c34cd');
      },
      start_date: fmt(ranges.development.start),
      end_date: fmt(ranges.development.end),
      progress: 0.2,
      type: 'project',
      group: 'group-2',
      open: true,
    },
    {
      id: 'task-2-1',
      get text() {
        return i18n.t('ui.data.project.timeline_data.frontend_development_d9f38c98');
      },
      start_date: fmt(ranges.development.start),
      end_date: fmt(ranges.development.start.add(10, 'day')),
      progress: 0.3,
      parent: 'group-2',
      type: 'task',
      group: 'group-2',
    },
    {
      id: 'task-2-2',
      get text() {
        return i18n.t('ui.data.project.timeline_data.backend_development_2554cd31');
      },
      start_date: fmt(ranges.development.start.add(5, 'day')),
      end_date: fmt(ranges.development.start.add(14, 'day')),
      progress: 0.1,
      parent: 'group-2',
      type: 'task',
      group: 'group-2',
    },
    {
      id: 'task-2-3',
      get text() {
        return i18n.t('ui.data.project.timeline_data.api_integration_eec15045');
      },
      start_date: fmt(ranges.development.start.add(15, 'day')),
      end_date: fmt(ranges.development.end),
      progress: 0.0,
      parent: 'group-2',
      type: 'task',
      group: 'group-2',
    },

    // Testing
    {
      id: 'group-3',
      get text() {
        return i18n.t('ui.data.project.timeline_data.following_month_67d3226f');
      },
      start_date: fmt(ranges.testing.start),
      end_date: fmt(ranges.testing.end),
      progress: 0.7,
      type: 'project',
      group: 'group-3',
      open: true,
    },
    {
      id: 'task-3-1',
      get text() {
        return i18n.t('ui.data.project.timeline_data.unit_testing_438d2345');
      },
      start_date: fmt(ranges.testing.start),
      end_date: fmt(ranges.testing.start.add(12, 'day')),
      progress: 0.2,
      parent: 'group-3',
      type: 'task',
      group: 'group-3',
    },
    {
      id: 'task-3-2',
      get text() {
        return i18n.t('ui.data.project.timeline_data.integration_testing_ed8e7536');
      },
      start_date: fmt(ranges.testing.start.add(3, 'day')),
      end_date: fmt(ranges.testing.start.add(9, 'day')),
      progress: 0.6,
      parent: 'group-3',
      type: 'task',
      group: 'group-3',
    },
    {
      id: 'task-3-3',
      get text() {
        return i18n.t('ui.data.project.timeline_data.production_deployment_c5c5063b');
      },
      start_date: fmt(ranges.testing.start.add(14, 'day')),
      end_date: fmt(ranges.testing.start.add(20, 'day')),
      progress: 0.9,
      parent: 'group-3',
      type: 'task',
      group: 'group-3',
    },
    {
      id: 'task-3-4',
      get text() {
        return i18n.t('ui.data.project.timeline_data.performance_testing_9b69332b');
      },
      start_date: fmt(ranges.testing.start.add(1, 'day')),
      end_date: fmt(ranges.testing.start.add(8, 'day')),
      progress: 0.3,
      parent: 'group-3',
      type: 'task',
      group: 'group-3',
    },
    {
      id: 'task-3-5',
      get text() {
        return i18n.t('ui.data.project.timeline_data.user_acceptance_testing_86f76dee');
      },
      start_date: fmt(ranges.testing.start.add(20, 'day')),
      end_date: fmt(ranges.testing.end),
      progress: 0.1,
      parent: 'group-3',
      type: 'task',
      group: 'group-3',
    },
  ];
};

export const timelineTasks = generateTimelineTasks();
