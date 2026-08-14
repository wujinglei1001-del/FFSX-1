import { getConditionFieldVariant } from './common/conditionRegistry';
import AssigneeConditionFields from './condition-fields/AssigneeConditionFields';
import DateBeforeAfterConditionFields from './condition-fields/DateBeforeAfterConditionFields';
import LabelConditionFields from './condition-fields/LabelConditionFields';
import PriorityChangesConditionFields from './condition-fields/PriorityChangesConditionFields';
import StatusChangesConditionFields from './condition-fields/StatusChangesConditionFields';

const FIELD_COMPONENTS = {
  status_from_to: StatusChangesConditionFields,
  priority_from_to: PriorityChangesConditionFields,
  date_before_after: DateBeforeAfterConditionFields,
  assignee: ({ index }) => (
    <AssigneeConditionFields index={index} hideSearch placeholder="Select a user" />
  ),
  label: ({ index }) => <LabelConditionFields index={index} hideSearch placeholder="Any Label" />,
  conditional_filter: () => null,
  none: () => null,
};

const ConditionFields = ({ index, type }) => {
  const FieldComponent = FIELD_COMPONENTS[getConditionFieldVariant(type)];
  return <FieldComponent index={index} />;
};

export default ConditionFields;
