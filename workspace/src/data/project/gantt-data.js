import dayjs from 'dayjs';
import i18n from 'locales/i18n';

const fmt = (date) => date.format('DD-MM-YYYY');

export const generateGanttTasks = () => {
  const today = dayjs();
  const startWindow = today.startOf('month');

  const planningStart = startWindow.add(21, 'day');
  const planningEnd = planningStart.add(21, 'day');

  const developmentStart = planningEnd;
  const developmentEnd = developmentStart.add(27, 'day');

  const testingStart = developmentEnd.subtract(6, 'day');
  const testingEnd = testingStart.add(13, 'day');

  return [
    {
      id: 'group-1',
      get text() {
        return i18n.t('ui.data.project.gantt_data.planning_phase_448907fb');
      },
      start_date: fmt(planningStart),
      end_date: fmt(planningEnd),
      progress: 0.4,
      type: 'project',
      priority: 1,
      group: 'group-1',
      open: true,
    },
    {
      id: 'task-1-1',
      get text() {
        return i18n.t('ui.data.project.gantt_data.requirements_analysis_cd6e9ecb');
      },
      start_date: fmt(planningStart),
      end_date: fmt(planningStart.add(13, 'day')),
      progress: 0.8,
      parent: 'group-1',
      type: 'task',
      priority: 1,
      group: 'group-1',
      completed: true,
    },
    {
      id: 'task-1-2',
      get text() {
        return i18n.t('ui.data.project.gantt_data.project_scope_definition_c525317f');
      },
      start_date: fmt(planningStart.add(7, 'day')),
      end_date: fmt(planningStart.add(20, 'day')),
      progress: 0.6,
      parent: 'group-1',
      type: 'task',
      priority: 2,
      group: 'group-1',
      completed: false,
    },
    {
      id: 'task-1-3',
      get text() {
        return i18n.t(
          'ui.data.project.gantt_data.resource_planning_resource_planning_resource_plannin_5f1a5c44',
        );
      },
      start_date: fmt(planningStart.add(15, 'day')),
      end_date: fmt(planningEnd),
      progress: 0.3,
      parent: 'group-1',
      type: 'task',
      priority: 3,
      group: 'group-1',
    },

    {
      id: 'group-2',
      get text() {
        return i18n.t('ui.data.project.gantt_data.development_phase_310b35b6');
      },
      start_date: fmt(developmentStart),
      end_date: fmt(developmentEnd),
      progress: 0.1,
      type: 'project',
      priority: 2,
      group: 'group-2',
      open: true,
    },
    {
      id: 'task-2-1',
      get text() {
        return i18n.t('ui.data.project.gantt_data.frontend_development_d9f38c98');
      },
      start_date: fmt(developmentStart),
      end_date: fmt(developmentStart.add(20, 'day')),
      progress: 0.1,
      parent: 'group-2',
      type: 'task',
      priority: 1,
      group: 'group-2',
      completed: true,
    },
    {
      id: 'task-2-2',
      get text() {
        return i18n.t('ui.data.project.gantt_data.backend_development_2554cd31');
      },
      start_date: fmt(developmentStart.add(7, 'day')),
      end_date: fmt(developmentEnd),
      progress: 0.15,
      parent: 'group-2',
      type: 'task',
      priority: 2,
      group: 'group-2',
    },
    {
      id: 'task-2-3',
      get text() {
        return i18n.t('ui.data.project.gantt_data.api_integration_eec15045');
      },
      start_date: fmt(developmentStart.add(14, 'day')),
      end_date: fmt(developmentEnd),
      progress: 0.9,
      parent: 'group-2',
      type: 'task',
      priority: 3,
      group: 'group-2',
    },

    {
      id: 'group-3',
      get text() {
        return i18n.t('ui.data.project.gantt_data.testing_deployment_5f280215');
      },
      start_date: fmt(testingStart),
      end_date: fmt(testingEnd),
      progress: 0.9,
      type: 'project',
      priority: 3,
      group: 'group-3',
      open: true,
    },
    {
      id: 'task-3-1',
      get text() {
        return i18n.t('ui.data.project.gantt_data.unit_testing_438d2345');
      },
      start_date: fmt(testingStart),
      end_date: fmt(testingStart.add(6, 'day')),
      progress: 0.1,
      parent: 'group-3',
      type: 'task',
      priority: 1,
      group: 'group-3',
    },
    {
      id: 'task-3-2',
      get text() {
        return i18n.t('ui.data.project.gantt_data.integration_testing_ed8e7536');
      },
      start_date: fmt(testingStart.add(3, 'day')),
      end_date: fmt(testingStart.add(10, 'day')),
      progress: 0.55,
      parent: 'group-3',
      type: 'task',
      priority: 2,
      group: 'group-3',
    },
    {
      id: 'task-3-3',
      get text() {
        return i18n.t('ui.data.project.gantt_data.production_deployment_c5c5063b');
      },
      start_date: fmt(testingStart.add(7, 'day')),
      end_date: fmt(testingEnd),
      progress: 0.82,
      parent: 'group-3',
      type: 'task',
      priority: 3,
      group: 'group-3',
    },
  ];
};

export const ganttTasks = generateGanttTasks();

export const ganttResources = [
  {
    id: 'resource-1',
    get text() {
      return i18n.t('ui.data.project.gantt_data.project_manager_92e918a7');
    },
    type: 'resource',
    color: '#4CAF50',
  },
  {
    id: 'resource-2',
    get text() {
      return i18n.t('ui.data.project.gantt_data.ui_ux_designer_a3c75d30');
    },
    type: 'resource',
    color: '#FF9800',
  },
  {
    id: 'resource-3',
    get text() {
      return i18n.t('ui.data.project.gantt_data.frontend_developer_c56054b1');
    },
    type: 'resource',
    color: '#9C27B0',
  },
  {
    id: 'resource-4',
    get text() {
      return i18n.t('ui.data.project.gantt_data.backend_developer_9d4b5f2f');
    },
    type: 'resource',
    color: '#F44336',
  },
  {
    id: 'resource-5',
    get text() {
      return i18n.t('ui.data.project.gantt_data.qa_engineer_0d309ac1');
    },
    type: 'resource',
    color: '#607D8B',
  },
  {
    id: 'resource-6',
    get text() {
      return i18n.t('ui.data.project.gantt_data.devops_engineer_44daf5ae');
    },
    type: 'resource',
    color: '#795548',
  },
];

export const ganttLinks = [
  {
    id: 'link-1',
    source: 'task-1-1',
    target: 'task-1-2',
    type: '0',
  },
  {
    id: 'link-2',
    source: 'task-1-2',
    target: 'task-1-3',
    type: '0',
  },

  {
    id: 'link-3',
    source: 'task-1-3',
    target: 'task-2-1',
    type: '0',
  },

  {
    id: 'link-4',
    source: 'task-2-1',
    target: 'task-2-3',
    type: '0',
  },
  {
    id: 'link-5',
    source: 'task-2-2',
    target: 'task-2-3',
    type: '0',
  },

  {
    id: 'link-6',
    source: 'task-2-3',
    target: 'task-3-1',
    type: '0',
  },

  {
    id: 'link-7',
    source: 'task-3-1',
    target: 'task-3-2',
    type: '0',
  },
  {
    id: 'link-8',
    source: 'task-3-2',
    target: 'task-3-3',
    type: '0',
  },
];

export const ganttAssignments = [
  { task: 'group-1', resource: 'resource-1' },
  { task: 'task-1-1', resource: 'resource-1' },
  { task: 'task-1-2', resource: 'resource-1' },
  { task: 'task-1-3', resource: 'resource-1' },

  { task: 'group-2', resource: 'resource-1' },
  { task: 'task-2-1', resource: 'resource-3' },
  { task: 'task-2-2', resource: 'resource-4' },
  { task: 'task-2-3', resource: 'resource-4' },

  { task: 'group-3', resource: 'resource-1' },
  { task: 'task-3-1', resource: 'resource-5' },
  { task: 'task-3-2', resource: 'resource-5' },
  { task: 'task-3-3', resource: 'resource-6' },
];
