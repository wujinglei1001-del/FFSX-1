import i18n from 'locales/i18n';

export const automationsData = [
  {
    id: 1,
    name: 'Automation #1: Status update',
    isActive: true,
    conditions: [
      {
        type: 'status_changes',
        field: 'status',
        operator: 'changes_from_to',
        value: '',
        fromValue: 'To do',
        toValue: 'Done',
      },
      { type: 'status_is', field: 'status', operator: 'equals', value: 'Done' },
      { type: 'priority_is', field: 'priority', operator: 'equals', value: 'High' },
    ],
    actions: [
      { type: 'move_to_group', params: { targetGroup: 'Next week' } },
      { type: 'change_date', params: { dateOffset: '1 week after trigger' } },
      { type: 'change_priority', params: { newPriority: 'High' } },
      { type: 'duplicate', params: { targetProject: 'Another project' } },
    ],
    createdAt: '2024-01-15T10:30:00',
    createdBy: 'John Doe',
    get description() {
      return i18n.t(
        'ui.data.project.automations.when_status_changes_and_status_done_and_priority_hig_860e47a3',
      );
    },
  },
  {
    id: 2,
    name: 'Automation #1: Status update',
    isActive: false,
    conditions: [
      {
        type: 'status_changes',
        field: 'status',
        operator: 'changes_from_to',
        value: '',
        fromValue: 'To do',
        toValue: 'Done',
      },
      { type: 'status_is', field: 'status', operator: 'equals', value: 'Done' },
      { type: 'priority_is', field: 'priority', operator: 'equals', value: 'High' },
    ],
    actions: [
      { type: 'move_to_group', params: { targetGroup: 'Next week' } },
      { type: 'change_date', params: { dateOffset: '1 week after trigger' } },
      { type: 'change_priority', params: { newPriority: 'High' } },
      { type: 'duplicate', params: { targetProject: 'Another project' } },
    ],
    createdAt: '2024-01-14T09:20:00',
    createdBy: 'Jane Smith',
    get description() {
      return i18n.t(
        'ui.data.project.automations.when_status_changes_and_status_done_and_priority_hig_860e47a3',
      );
    },
  },
  {
    id: 3,
    name: 'Automation #1: Status update',
    isActive: false,
    conditions: [
      {
        type: 'status_changes',
        field: 'status',
        operator: 'changes_from_to',
        value: '',
        fromValue: 'To do',
        toValue: 'Done',
      },
      { type: 'status_is', field: 'status', operator: 'equals', value: 'Done' },
      { type: 'priority_is', field: 'priority', operator: 'equals', value: 'High' },
    ],
    actions: [
      { type: 'move_to_group', params: { targetGroup: 'Next week' } },
      { type: 'change_date', params: { dateOffset: '1 week after trigger' } },
      { type: 'change_priority', params: { newPriority: 'High' } },
      { type: 'duplicate', params: { targetProject: 'Another project' } },
    ],
    createdAt: '2024-01-13T14:15:00',
    createdBy: 'Bob Johnson',
    get description() {
      return i18n.t(
        'ui.data.project.automations.when_status_changes_and_status_done_and_priority_hig_860e47a3',
      );
    },
  },
  {
    id: 4,
    name: 'Automation #1: Status update',
    isActive: false,
    conditions: [
      {
        type: 'status_changes',
        field: 'status',
        operator: 'changes_from_to',
        value: '',
        fromValue: 'To do',
        toValue: 'Done',
      },
      { type: 'status_is', field: 'status', operator: 'equals', value: 'Done' },
      { type: 'priority_is', field: 'priority', operator: 'equals', value: 'High' },
    ],
    actions: [
      { type: 'move_to_group', params: { targetGroup: 'Next week' } },
      { type: 'change_date', params: { dateOffset: '1 week after trigger' } },
      { type: 'change_priority', params: { newPriority: 'High' } },
      { type: 'duplicate', params: { targetProject: 'Another project' } },
    ],
    createdAt: '2024-01-12T11:45:00',
    createdBy: 'Alice Williams',
    get description() {
      return i18n.t(
        'ui.data.project.automations.when_status_changes_and_status_done_and_priority_hig_860e47a3',
      );
    },
  },
  {
    id: 5,
    name: 'Automation #1: Status update',
    isActive: false,
    conditions: [
      {
        type: 'status_changes',
        field: 'status',
        operator: 'changes_from_to',
        value: '',
        fromValue: 'To do',
        toValue: 'Done',
      },
      { type: 'status_is', field: 'status', operator: 'equals', value: 'Done' },
      { type: 'priority_is', field: 'priority', operator: 'equals', value: 'High' },
    ],
    actions: [
      { type: 'move_to_group', params: { targetGroup: 'Next week' } },
      { type: 'change_date', params: { dateOffset: '1 week after trigger' } },
      { type: 'change_priority', params: { newPriority: 'High' } },
      { type: 'duplicate', params: { targetProject: 'Another project' } },
    ],
    createdAt: '2024-01-11T16:30:00',
    createdBy: 'Charlie Brown',
    get description() {
      return i18n.t(
        'ui.data.project.automations.when_status_changes_and_status_done_and_priority_hig_860e47a3',
      );
    },
  },
  {
    id: 6,
    name: 'Automation #1: Status update',
    isActive: false,
    conditions: [
      {
        type: 'status_changes',
        field: 'status',
        operator: 'changes_from_to',
        value: '',
        fromValue: 'To do',
        toValue: 'Done',
      },
      { type: 'status_is', field: 'status', operator: 'equals', value: 'Done' },
      { type: 'priority_is', field: 'priority', operator: 'equals', value: 'High' },
    ],
    actions: [
      { type: 'move_to_group', params: { targetGroup: 'Next week' } },
      { type: 'change_date', params: { dateOffset: '1 week after trigger' } },
      { type: 'change_priority', params: { newPriority: 'High' } },
      { type: 'duplicate', params: { targetProject: 'Another project' } },
    ],
    createdAt: '2024-01-10T08:20:00',
    createdBy: 'Diana Prince',
    get description() {
      return i18n.t(
        'ui.data.project.automations.when_status_changes_and_status_done_and_priority_hig_860e47a3',
      );
    },
  },
];
