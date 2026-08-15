import { recentProjects, sharedProjects, userProjects } from 'data/kanban/boards';
import i18n from 'locales/i18n';

export const ACTION_GROUPS = [
  {
    group: 'MOST USED',
    options: [
      {
        value: 'change_assignees',
        get label() {
          return i18n.t('ui.sections.project.automation.common.change_assignees_c5bf8fd0');
        },
      },
      {
        value: 'change_status',
        get label() {
          return i18n.t('ui.sections.project.automation.common.change_status_6fc0529f');
        },
      },
    ],
  },
  {
    group: 'ADD OR MOVE',
    options: [
      {
        value: 'add_to_group',
        get label() {
          return i18n.t('ui.sections.project.automation.common.add_to_group_4f5edc11');
        },
      },
      {
        value: 'move_to_group',
        get label() {
          return i18n.t('ui.sections.project.automation.common.move_to_group_c988fe03');
        },
      },
      {
        value: 'move_to_project',
        get label() {
          return i18n.t('ui.sections.project.automation.common.move_to_project_ce1b439b');
        },
      },
    ],
  },
  {
    group: 'COMMUNICATION',
    options: [
      {
        value: 'add_comment',
        get label() {
          return i18n.t('ui.sections.project.automation.common.add_a_comment_3e183615');
        },
      },
      {
        value: 'notify_someone',
        get label() {
          return i18n.t('ui.sections.project.automation.common.notify_someone_dcb0ebf9');
        },
      },
    ],
  },
  {
    group: 'CREATE AND COMPLETE',
    options: [
      {
        value: 'archive_task_subtask',
        get label() {
          return i18n.t('ui.sections.project.automation.common.archive_task_or_subtask_29285aaf');
        },
      },
      {
        value: 'create_subtask',
        get label() {
          return i18n.t('ui.sections.project.automation.common.create_a_subtask_167030a9');
        },
      },
      {
        value: 'create_task',
        get label() {
          return i18n.t('ui.sections.project.automation.common.create_a_task_c071049b');
        },
      },
      {
        value: 'delete_task_subtask',
        get label() {
          return i18n.t('ui.sections.project.automation.common.delete_task_or_subtask_3944d239');
        },
      },
      {
        value: 'duplicate',
        get label() {
          return i18n.t('ui.sections.project.automation.common.duplicate_972d5737');
        },
      },
    ],
  },
  {
    group: 'DATES AND TIMES',
    options: [
      {
        value: 'change_date',
        get label() {
          return i18n.t('ui.sections.project.automation.common.change_start_end_date_a2003dc1');
        },
      },
      {
        value: 'change_due_date',
        get label() {
          return i18n.t('ui.sections.project.automation.common.change_due_date_fbf46874');
        },
      },
      {
        value: 'change_start_date',
        get label() {
          return i18n.t('ui.sections.project.automation.common.change_start_date_2e8e62e7');
        },
      },
    ],
  },
  {
    group: 'TASK MANAGEMENT',
    options: [
      {
        value: 'change_priority',
        get label() {
          return i18n.t('ui.sections.project.automation.common.change_priority_8b8c862f');
        },
      },
      {
        value: 'change_label',
        get label() {
          return i18n.t('ui.sections.project.automation.common.change_label_6c7d2fc9');
        },
      },
    ],
  },
];

export const ACTION_TYPE_OPTIONS = ACTION_GROUPS.flatMap((actionGroup) => actionGroup.options);

export const getActionTypeLabel = (value) =>
  ACTION_TYPE_OPTIONS.find((option) => option.value === value)?.label ?? value;

export const CONDITION_TRIGGER_GROUPS = [
  {
    group: 'MOST USED',
    options: [
      {
        value: 'task_or_subtask_created',
        get label() {
          return i18n.t('ui.sections.project.automation.common.task_or_subtask_created_a662bd16');
        },
      },
      {
        value: 'status_changes',
        get label() {
          return i18n.t('ui.sections.project.automation.common.status_changes_31a6bc61');
        },
      },
    ],
  },
  {
    group: 'ADD OR MOVE',
    options: [
      {
        value: 'existing_task_or_subtask_added_here',
        get label() {
          return i18n.t(
            'ui.sections.project.automation.common.existing_task_or_subtask_added_here_5f0dd104',
          );
        },
      },
      {
        value: 'existing_task_or_subtask_moved_here',
        get label() {
          return i18n.t(
            'ui.sections.project.automation.common.existing_task_or_subtask_moved_here_8f237b99',
          );
        },
      },
    ],
  },
  {
    group: 'COMMUNICATION',
    options: [
      {
        value: 'comment_is_added',
        get label() {
          return i18n.t('ui.sections.project.automation.common.comment_is_added_11b767f1');
        },
      },
    ],
  },
  {
    group: 'CREATE AND COMPLETE',
    options: [
      {
        value: 'all_checklists_resolved',
        get label() {
          return i18n.t('ui.sections.project.automation.common.all_checklists_resolved_fa4e2dc8');
        },
      },
      {
        value: 'all_immediate_subtasks_resolved',
        get label() {
          return i18n.t(
            'ui.sections.project.automation.common.all_immediate_subtasks_resolved_1556052c',
          );
        },
      },
    ],
  },
  {
    group: 'DATES AND TIMES',
    options: [
      {
        value: 'due_date_arrives',
        get label() {
          return i18n.t('ui.sections.project.automation.common.due_date_arrives_a7b054cd');
        },
      },
      {
        value: 'due_date_changes',
        get label() {
          return i18n.t('ui.sections.project.automation.common.due_date_changes_941d2111');
        },
      },
      {
        value: 'start_date_arrives',
        get label() {
          return i18n.t('ui.sections.project.automation.common.start_date_arrives_03b73ce2');
        },
      },
      {
        value: 'start_date_changes',
        get label() {
          return i18n.t('ui.sections.project.automation.common.start_date_changes_2cd6e6bb');
        },
      },
      {
        value: 'date_is_before_or_after',
        get label() {
          return i18n.t('ui.sections.project.automation.common.date_is_before_after_cbabdb78');
        },
      },
    ],
  },
  {
    group: 'TASK MANAGEMENT',
    options: [
      {
        value: 'assignee_added',
        get label() {
          return i18n.t(
            'ui.sections.project.automation.common.assignee_added_assignee_removed_2f27583f',
          );
        },
      },
      {
        value: 'priority_changes',
        get label() {
          return i18n.t('ui.sections.project.automation.common.priority_changes_f67c47a7');
        },
      },
      {
        value: 'task_management_status_changes',
        get label() {
          return i18n.t('ui.sections.project.automation.common.status_changes_31a6bc61');
        },
      },
      {
        value: 'label_added',
        get label() {
          return i18n.t('ui.sections.project.automation.common.label_added_label_removed_adab9bfd');
        },
      },
      {
        value: 'task_or_subtask_linked',
        get label() {
          return i18n.t('ui.sections.project.automation.common.task_or_subtask_linked_bbddc173');
        },
      },
    ],
  },
];

const CONDITION_TRIGGER_LABELS = Object.fromEntries(
  CONDITION_TRIGGER_GROUPS.flatMap((group) =>
    group.options.map((option) => [option.value, option.label]),
  ),
);

export const getConditionTriggerLabel = (value) =>
  CONDITION_TRIGGER_LABELS[value] ?? value.replace(/_/g, ' ');

export const CONDITION_TYPE_OPTIONS = CONDITION_TRIGGER_GROUPS.flatMap((group) => group.options);

export const CONDITION_FILTER_TYPES = [
  'assignee_is',
  'start_date_is',
  'due_date_is',
  'status_is',
  'priority_is',
  'label_is',
];

export const CONDITION_FILTER_OPTIONS = [
  {
    value: 'assignee_is',
    get label() {
      return i18n.t('ui.sections.project.automation.common.assignee_049e3ce5');
    },
  },
  {
    value: 'start_date_is',
    get label() {
      return i18n.t('ui.sections.project.automation.common.start_date_ff99f5b5');
    },
  },
  {
    value: 'due_date_is',
    get label() {
      return i18n.t('ui.sections.project.automation.common.due_date_4c1aeebc');
    },
  },
  {
    value: 'status_is',
    get label() {
      return i18n.t('ui.sections.project.automation.common.status_bae7d5be');
    },
  },
  {
    value: 'priority_is',
    get label() {
      return i18n.t('ui.sections.project.automation.common.priority_886cbff9');
    },
  },
  {
    value: 'label_is',
    get label() {
      return i18n.t('ui.sections.project.automation.common.label_74341e3c');
    },
  },
];

const CONDITION_FILTER_LABELS = Object.fromEntries(
  CONDITION_FILTER_OPTIONS.map((option) => [option.value, option.label]),
);

export const getConditionFilterLabel = (value) =>
  CONDITION_FILTER_LABELS[value] ?? value.replace(/_/g, ' ');

export const isConditionFilterType = (type) => CONDITION_FILTER_TYPES.includes(type);

export const REFERENCE_DATE_OPTIONS = [
  {
    value: 'start_date',
    get label() {
      return i18n.t('ui.sections.project.automation.common.the_start_date_61735522');
    },
  },
  {
    value: 'due_date',
    get label() {
      return i18n.t('ui.sections.project.automation.common.the_due_date_94df29c1');
    },
  },
];

export const DATE_OFFSET_UNITS = ['days', 'weeks'];
export const DATE_RELATIONS = ['before', 'after'];
export const DATE_MODES = ['days', 'weeks', 'custom'];

export const DATE_OFFSET_UNIT_OPTIONS = [
  {
    value: 'days',
    get label() {
      return i18n.t('ui.sections.project.automation.common.days_f6bb0f46');
    },
  },
  {
    value: 'weeks',
    get label() {
      return i18n.t('ui.sections.project.automation.common.weeks_7d75266a');
    },
  },
];

export const DATE_RELATION_OPTIONS = [
  {
    value: 'before',
    get label() {
      return i18n.t('ui.sections.project.automation.common.before_74f39697');
    },
  },
  {
    value: 'after',
    get label() {
      return i18n.t('ui.sections.project.automation.common.after_79ba5e1b');
    },
  },
];

export const STATUS_OPTIONS = ['To do', 'In Progress', 'Done'];
export const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Urgent'];
export const LABEL_OPTIONS = ['Admin', 'Modification', 'Bug'];
export const GROUP_OPTIONS = ['This week', 'Next week', 'Following week', 'In two weeks'];

export const PROJECT_OPTIONS = Array.from(
  new Set([
    ...recentProjects.boards.map((board) => board.name),
    ...userProjects.boards.map((board) => board.name),
    ...sharedProjects.boards.map((board) => board.name),
  ]),
);

export const getPriorityDotColor = (priority) => (theme) => {
  switch (priority) {
    case 'Low':
      return theme.vars?.palette?.chBlue?.[500] ?? theme.palette.info.main;
    case 'Medium':
      return theme.vars?.palette?.chOrange?.[500] ?? theme.palette.warning.main;
    case 'High':
      return theme.vars?.palette?.chGreen?.[500] ?? theme.palette.success.main;
    case 'Urgent':
      return theme.vars?.palette?.chRed?.[500] ?? theme.palette.error.main;
    default:
      return theme.palette.text.disabled;
  }
};

export const OPERATOR_OPTIONS = [
  {
    value: 'equals',
    get label() {
      return i18n.t('ui.sections.project.automation.common.is_equal_to_db81567d');
    },
  },
  {
    value: 'not_equals',
    get label() {
      return i18n.t('ui.sections.project.automation.common.is_not_equal_to_bc59a50d');
    },
  },
  {
    value: 'is_any_of',
    get label() {
      return i18n.t('ui.sections.project.automation.common.is_any_of_d38f513c');
    },
  },
  {
    value: 'is_all_of',
    get label() {
      return i18n.t('ui.sections.project.automation.common.is_all_of_6a831512');
    },
  },
  {
    value: 'is_not_any_of',
    get label() {
      return i18n.t('ui.sections.project.automation.common.is_not_any_of_f165c80f');
    },
  },
  {
    value: 'is_not_all_of',
    get label() {
      return i18n.t('ui.sections.project.automation.common.is_not_all_of_7f0b1e64');
    },
  },
  {
    value: 'is_set',
    get label() {
      return i18n.t('ui.sections.project.automation.common.is_set_b95d33c0');
    },
  },
  {
    value: 'is_not_set',
    get label() {
      return i18n.t('ui.sections.project.automation.common.is_not_set_6d014bcb');
    },
  },
];

export const ASSIGNEE_OPERATOR_OPTIONS = OPERATOR_OPTIONS.filter(
  (option) => option.value !== 'equals' && option.value !== 'not_equals',
);

export const getOperatorOptionsForFilterType = (type) => {
  if (type === 'assignee_is') {
    return ASSIGNEE_OPERATOR_OPTIONS;
  }

  return OPERATOR_OPTIONS;
};

export const DEFAULT_CONDITIONS = [
  {
    type: 'task_or_subtask_created',
    field: 'task',
    operator: 'is_set',
    value: '',
  },
  {
    type: 'status_is',
    field: 'status',
    operator: 'is_any_of',
    value: 'Done',
  },
  {
    type: 'priority_is',
    field: 'priority',
    operator: 'equals',
    value: 'High',
  },
];

export const DEFAULT_ACTIONS = [
  { type: 'move_to_group', params: { targetGroup: '' } },
  { type: 'change_date', params: { dateMode: 'weeks', dateOffset: '1', customDate: '' } },
  { type: 'change_priority', params: { fromPriority: 'Low', newPriority: 'High' } },
  { type: 'duplicate', params: { targetProject: '' } },
];
