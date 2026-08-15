import { users } from 'data/users';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import { defaultLabelOptions as taskLabelOptions } from '../labels/labelConfig';

export { taskLabelOptions };

export const validationSchema = yup.object({
  task: yup
    .string()
    .required(i18n.t('ui.sections.project.common.task_dialog.task_is_required_dfd1415b'))
    .min(
      3,
      i18n.t('ui.sections.project.common.task_dialog.task_must_be_at_least_3_characters_64e04cde'),
    ),
  group: yup
    .string()
    .required(i18n.t('ui.sections.project.common.task_dialog.group_is_required_4805ce55')),
  status: yup
    .string()
    .required(i18n.t('ui.sections.project.common.task_dialog.status_is_required_d88cae16')),
  startDate: yup
    .date()
    .required(i18n.t('ui.sections.project.common.task_dialog.start_date_is_required_438387af')),
  endDate: yup
    .date()
    .required(i18n.t('ui.sections.project.common.task_dialog.end_date_is_required_0f750cd5')),
  priority: yup
    .string()
    .required(i18n.t('ui.sections.project.common.task_dialog.priority_is_required_d0f01e4d')),
  collaborators: yup
    .array()
    .of(yup.number().required())
    .min(
      1,
      i18n.t('ui.sections.project.common.task_dialog.select_at_least_one_collaborator_d3885b44'),
    )
    .required(),
});

export const collaboratorData = [
  { id: 1, user: users[0], checked: true },
  { id: 2, user: users[1], checked: true },
  { id: 3, user: users[2], checked: false },
  { id: 4, user: users[3], checked: false },
  { id: 5, user: users[4], checked: false },
  { id: 6, user: users[5], checked: false },
  { id: 7, user: users[6], checked: false },
];

export const defaultFormValues = {
  task: '',
  group: 'group-1',
  status: 'This week',
  startDate: new Date(),
  endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
  priority: 'Normal',
  collaborators: collaboratorData
    .filter((collaboratorItem) => collaboratorItem.checked)
    .map((collaboratorItem) => collaboratorItem.user.id),
};

export const taskGroupOptions = [
  {
    value: 'group-1',
    get label() {
      return i18n.t('ui.sections.project.common.task_dialog.planning_phase_448907fb');
    },
  },
  {
    value: 'group-2',
    get label() {
      return i18n.t('ui.sections.project.common.task_dialog.developement_phase_6dcfd35d');
    },
  },
  {
    value: 'group-3',
    get label() {
      return i18n.t('ui.sections.project.common.task_dialog.testing_deployment_5f280215');
    },
  },
];

export const taskStatusOptions = [
  {
    value: 'This week',
    get label() {
      return i18n.t('ui.sections.project.common.task_dialog.this_week_7b72883e');
    },
  },
  {
    value: 'Completed',
    get label() {
      return i18n.t('ui.sections.project.common.task_dialog.completed_1798b3ba');
    },
  },
];

export const taskPriorityOptions = [
  {
    get label() {
      return i18n.t('ui.sections.project.common.task_dialog.normal_45e118d0');
    },
    color: 'primary',
  },
  {
    get label() {
      return i18n.t('ui.sections.project.common.task_dialog.high_b1a5954a');
    },
    color: 'warning',
  },
  {
    get label() {
      return i18n.t('ui.sections.project.common.task_dialog.urgent_ecb26f46');
    },
    color: 'error',
  },
];
