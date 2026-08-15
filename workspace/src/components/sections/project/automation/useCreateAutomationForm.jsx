import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import { validateActionParams } from './common/actionUtils';
import { getConditionFieldVariant } from './common/conditionRegistry';
import { DEFAULT_ACTIONS, DEFAULT_CONDITIONS, isConditionFilterType } from './common/constants';

const needsFromToValues = (condition) => {
  const variant = getConditionFieldVariant(condition.type);
  return variant === 'status_from_to' || variant === 'priority_from_to';
};

const needsDateOffset = (condition) =>
  getConditionFieldVariant(condition.type) === 'date_before_after';

const needsTargetDate = (condition) =>
  condition.type === 'start_date_before_after' ||
  condition.type === 'due_date_before_after' ||
  condition.type === 'start_date_is' ||
  condition.type === 'due_date_is';

const needsMultiSelectValue = (condition) => {
  if (isConditionFilterType(condition.type)) {
    return condition.type === 'assignee_is' || condition.type === 'label_is';
  }

  const variant = getConditionFieldVariant(condition.type);
  return variant === 'assignee' || variant === 'label';
};

const needsConditionalFilterValue = (condition) => {
  if (!isConditionFilterType(condition.type)) return false;
  if (condition.operator === 'is_set' || condition.operator === 'is_not_set') return false;
  if (condition.type === 'start_date_is' || condition.type === 'due_date_is') return false;
  return true;
};

const conditionSchema = yup.object({
  type: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.project.automation.usecreateautomationform.condition_type_is_required_dd2d9b7d',
      ),
    ),
  field: yup
    .string()
    .required(
      i18n.t('ui.sections.project.automation.usecreateautomationform.field_is_required_79829e87'),
    ),
  operator: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.project.automation.usecreateautomationform.operator_is_required_1adba31d',
      ),
    ),
  value: yup
    .mixed()
    .test('not-empty', 'Value is required', function (value) {
      const condition = this.parent;

      if (
        needsFromToValues(condition) ||
        getConditionFieldVariant(condition.type) === 'date_before_after' ||
        getConditionFieldVariant(condition.type) === 'none' ||
        isConditionFilterType(condition.type)
      ) {
        if (needsConditionalFilterValue(condition)) {
          if (needsMultiSelectValue(condition)) {
            return Array.isArray(value) && value.length > 0;
          }
          if (typeof value === 'string') return value.trim().length > 0;
        }
        return true;
      }

      if (needsMultiSelectValue(condition)) {
        return Array.isArray(value) && value.length > 0;
      }

      if (typeof value === 'string') return value.trim().length > 0;
      if (Array.isArray(value)) return value.length > 0;
      return false;
    })
    .required(
      i18n.t('ui.sections.project.automation.usecreateautomationform.value_is_required_30b22827'),
    ),
  fromValue: yup.string().test('required-if-from-to', 'From is required', function (value) {
    const condition = this.parent;
    if (!needsFromToValues(condition)) return true;
    return !!value && value.trim().length > 0;
  }),
  toValue: yup.string().test('required-if-from-to', 'To is required', function (value) {
    const condition = this.parent;
    if (!needsFromToValues(condition)) return true;
    return !!value && value.trim().length > 0;
  }),
  dateOffset: yup
    .string()
    .test('required-if-date-before-after', 'Offset is required', function (value) {
      const condition = this.parent;
      if (!needsDateOffset(condition)) return true;
      return !!value && value.trim().length > 0;
    }),
  dateOffsetUnit: yup.string().oneOf(['days', 'weeks']).notRequired(),
  dateRelation: yup.string().oneOf(['before', 'after']).notRequired(),
  targetDate: yup
    .string()
    .test('required-if-date-before-after', 'Target date is required', function (value) {
      const condition = this.parent;
      if (!needsTargetDate(condition)) return true;
      if (
        isConditionFilterType(condition.type) &&
        (condition.operator === 'is_set' || condition.operator === 'is_not_set')
      ) {
        return true;
      }
      return !!value && value.trim().length > 0;
    }),
});

const actionSchema = yup.object({
  type: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.project.automation.usecreateautomationform.action_type_is_required_ed3d5e7e',
      ),
    ),
  params: yup
    .object()
    .required(
      i18n.t(
        'ui.sections.project.automation.usecreateautomationform.action_params_are_required_22697301',
      ),
    )
    .test('validate-params', 'Action params are invalid', function (params) {
      const action = this.parent;
      return validateActionParams(action, params ?? {}, {
        basePath: this.path || '',
        createError: (error) => this.createError(error),
      });
    }),
});

export const automationFormSchema = yup.object({
  conditions: yup
    .array()
    .of(conditionSchema)
    .min(
      1,
      i18n.t(
        'ui.sections.project.automation.usecreateautomationform.at_least_one_condition_is_required_f01f149e',
      ),
    )
    .required(
      i18n.t(
        'ui.sections.project.automation.usecreateautomationform.conditions_are_required_332e8742',
      ),
    ),
  actions: yup
    .array()
    .of(actionSchema)
    .min(
      1,
      i18n.t(
        'ui.sections.project.automation.usecreateautomationform.at_least_one_action_is_required_f1087452',
      ),
    )
    .required(
      i18n.t(
        'ui.sections.project.automation.usecreateautomationform.actions_are_required_a6ddd06a',
      ),
    ),
});

const useCreateAutomationForm = () => {
  const methods = useForm({
    resolver: yupResolver(automationFormSchema),
    defaultValues: {
      conditions: DEFAULT_CONDITIONS,
      actions: DEFAULT_ACTIONS,
    },
  });

  return { methods };
};

export default useCreateAutomationForm;
