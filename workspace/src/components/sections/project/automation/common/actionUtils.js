import dayjs from 'dayjs';
import i18n from 'locales/i18n';
import { getActionFieldVariant } from './actionRegistry';
import { getActionTypeLabel } from './constants';

const formatShortDate = (isoDate) => dayjs(isoDate).format('D MMM');

export const validateActionParams = (action, params, context) => {
  const variant = getActionFieldVariant(action.type);
  const { createError, basePath } = context;

  switch (variant) {
    case 'group':
      if (!params.targetGroup?.trim()) {
        return createError({
          path: `${basePath}.targetGroup`,
          get message() {
            return i18n.t('ui.sections.project.automation.common.group_is_required_4805ce55');
          },
        });
      }
      return true;
    case 'project':
      if (!params.targetProject?.trim()) {
        return createError({
          path: `${basePath}.targetProject`,
          get message() {
            return i18n.t(
              'ui.sections.project.automation.common.target_project_is_required_2abcb8e1',
            );
          },
        });
      }
      return true;
    case 'date': {
      const mode = params.dateMode ?? 'weeks';
      if (mode === 'custom') {
        if (!params.customDate?.trim()) {
          return createError({
            path: `${basePath}.customDate`,
            get message() {
              return i18n.t(
                'ui.sections.project.automation.common.custom_date_is_required_0c72af10',
              );
            },
          });
        }
        return true;
      }
      if (!params.dateOffset?.trim()) {
        return createError({
          path: `${basePath}.dateOffset`,
          get message() {
            return i18n.t('ui.sections.project.automation.common.offset_is_required_25574025');
          },
        });
      }
      return true;
    }
    case 'priority':
      if (!params.fromPriority?.trim()) {
        return createError({
          path: `${basePath}.fromPriority`,
          get message() {
            return i18n.t(
              'ui.sections.project.automation.common.from_priority_is_required_a3384fd5',
            );
          },
        });
      }
      if (!params.newPriority?.trim()) {
        return createError({
          path: `${basePath}.newPriority`,
          get message() {
            return i18n.t('ui.sections.project.automation.common.to_priority_is_required_01c0eb81');
          },
        });
      }
      return true;
    case 'status':
      if (!params.status?.trim()) {
        return createError({
          path: `${basePath}.status`,
          get message() {
            return i18n.t('ui.sections.project.automation.common.status_is_required_d88cae16');
          },
        });
      }
      return true;
    case 'create_task':
      if (!params.taskName?.trim()) {
        return createError({
          path: `${basePath}.taskName`,
          get message() {
            return i18n.t('ui.sections.project.automation.common.task_name_is_required_17ee7cb7');
          },
        });
      }
      return true;
    default:
      return true;
  }
};

export const formatActionChipByType = (action) => {
  const label = getActionTypeLabel(action.type);
  const { params } = action;
  const variant = getActionFieldVariant(action.type);

  switch (variant) {
    case 'group':
      return `${label}: ${params.targetGroup || 'Select a group'},`;
    case 'project':
      return action.type === 'duplicate'
        ? `Duplicate to: ${params.targetProject || 'Select a group'}`
        : `${label}: ${params.targetProject || 'Select a project'},`;
    case 'date': {
      const mode = params.dateMode ?? 'weeks';
      if (mode === 'custom') {
        const dateText = params.customDate ? formatShortDate(params.customDate) : 'Select date';
        return `${label}: ${dateText},`;
      }
      const offset = params.dateOffset || '1';
      const unit = mode === 'days' ? 'day' : 'week';
      const plural = offset === '1' ? unit : `${unit}s`;
      return `${label}: ${offset} ${plural} after trigger,`;
    }
    case 'priority':
      return params.newPriority ? `${label}: ${params.newPriority},` : `${label},`;
    case 'status':
      return params.status ? `${label}: ${params.status},` : `${label},`;
    case 'assignees': {
      const add = params.addAssignees?.length ?? 0;
      const remove = params.removeAssignees?.length ?? 0;
      return add || remove ? `${label}: +${add}/-${remove},` : `${label},`;
    }
    case 'label': {
      const add = params.addLabels?.length ?? 0;
      const remove = params.removeLabels?.length ?? 0;
      return add || remove ? `${label}: +${add}/-${remove},` : `${label},`;
    }
    case 'create_task':
      return params.taskName ? `${label}: ${params.taskName},` : `${label},`;
    default:
      return `${label},`;
  }
};
