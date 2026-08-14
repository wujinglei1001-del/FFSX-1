export const ACTION_FIELD_VARIANT = {
  move_to_group: 'group',
  add_to_group: 'group',
  move_to_project: 'project',
  duplicate: 'project',
  change_date: 'date',
  change_due_date: 'date',
  change_start_date: 'date',
  change_priority: 'priority',
  change_status: 'status',
  change_assignees: 'assignees',
  change_label: 'label',
  create_subtask: 'create_task',
  create_task: 'create_task',
  add_comment: 'none',
  notify_someone: 'none',
  archive_task_subtask: 'none',
  delete_task_subtask: 'none',
};

export const DESTRUCTIVE_ACTION_TYPES = ['delete_task_subtask'];

export const getActionFieldVariant = (type) => ACTION_FIELD_VARIANT[type];
