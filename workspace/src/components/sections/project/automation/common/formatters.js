import dayjs from 'dayjs';
import { formatActionChipByType } from './actionUtils';
import { getConditionFieldVariant } from './conditionRegistry';
import {
  OPERATOR_OPTIONS,
  getConditionFilterLabel,
  getConditionTriggerLabel,
  isConditionFilterType,
} from './constants';

export const formatShortDate = (isoDate) => dayjs(isoDate).format('D MMM');

export const pluralize = (countStr, singular, plural) => {
  const count = Number(countStr);
  if (!Number.isFinite(count)) return plural;
  return count === 1 ? singular : plural;
};

const formatDateBeforeAfter = (condition, label) => {
  const offset = condition.dateOffset ?? '10';
  const unit = condition.dateOffsetUnit ?? 'days';
  const relation = condition.dateRelation ?? 'before';
  const dateText = condition.targetDate ? formatShortDate(condition.targetDate) : 'Select a Date';
  const unitSingular = unit ? unit.slice(0, -1) : 'day';
  return `${label}: ${offset} ${pluralize(offset, unitSingular, unit ?? 'days')} ${relation} ${dateText},`;
};

const OPERATOR_LABELS = Object.fromEntries(
  OPERATOR_OPTIONS.map((option) => [option.value, option.label.toLowerCase()]),
);

const formatConditionalFilterLabel = (condition) => {
  if (!isConditionFilterType(condition.type)) {
    return `${condition.type},`;
  }

  const fieldLabel = getConditionFilterLabel(condition.type);

  if (condition.operator === 'is_set' || condition.operator === 'is_not_set') {
    return `${fieldLabel}: ${OPERATOR_LABELS[condition.operator]},`;
  }

  if (condition.type === 'assignee_is' || condition.type === 'label_is') {
    const selected = Array.isArray(condition.value) ? condition.value : [];
    return selected.length
      ? `${fieldLabel}: ${selected.join(', ')},`
      : `${fieldLabel}: ${OPERATOR_LABELS[condition.operator]},`;
  }

  if (condition.type === 'start_date_is' || condition.type === 'due_date_is') {
    const dateText = condition.targetDate ? formatShortDate(condition.targetDate) : 'Select a date';
    return `${fieldLabel}: ${dateText},`;
  }

  const valueText = typeof condition.value === 'string' ? condition.value : '';
  return valueText ? `${fieldLabel}: ${valueText},` : `${fieldLabel},`;
};

export const formatConditionChipLabel = (condition) => {
  if (isConditionFilterType(condition.type)) {
    return formatConditionalFilterLabel(condition);
  }

  const variant = getConditionFieldVariant(condition.type);

  switch (variant) {
    case 'status_from_to':
      return 'Status changes,';
    case 'priority_from_to':
      return 'Priority changes,';
    case 'date_before_after':
      if (condition.type === 'date_is_before_or_after') {
        const offset = condition.dateOffset ?? '10';
        const unit = condition.dateOffsetUnit ?? 'days';
        const relation = condition.dateRelation ?? 'before';
        const reference = condition.field === 'due_date' ? 'the due date' : 'the start date';
        const unitSingular = unit ? unit.slice(0, -1) : 'day';
        return `Date: ${offset} ${pluralize(offset, unitSingular, unit ?? 'days')} ${relation} ${reference},`;
      }
      if (condition.type === 'start_date_before_after') {
        return formatDateBeforeAfter(condition, 'Start date');
      }
      return formatDateBeforeAfter(condition, 'Due date');
    case 'assignee': {
      const selected = Array.isArray(condition.value) ? condition.value : [];
      return selected.length ? `Assignee: ${selected.length},` : 'Assignee added/removed,';
    }
    case 'label': {
      const selected = Array.isArray(condition.value) ? condition.value : [];
      return selected.length ? `Label: ${selected.join(', ')},` : 'Label added/removed,';
    }
    default:
      return `${getConditionTriggerLabel(condition.type)},`;
  }
};

export const formatActionChipLabel = (action) => formatActionChipByType(action);

const AUTOMATION_DESCRIPTION_CONNECTORS = /^(When |, and |, then )$/;

export const parseAutomationDescription = (description) =>
  description
    .split(/(When |, and |, then )/)
    .filter((part) => part.length > 0)
    .map((part) => ({
      text: part,
      isSemibold: !AUTOMATION_DESCRIPTION_CONNECTORS.test(part),
    }));
