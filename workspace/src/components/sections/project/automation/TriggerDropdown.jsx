import { CONDITION_TRIGGER_GROUPS, getConditionTriggerLabel } from './common/constants';
import GroupedSearchableSelect from './shared/GroupedSearchableSelect';

const TriggerDropdown = ({ value, onChange, excludedTypes = [] }) => (
  <GroupedSearchableSelect
    value={value}
    onChange={onChange}
    groups={CONDITION_TRIGGER_GROUPS}
    getLabel={getConditionTriggerLabel}
    excludedValues={excludedTypes}
    hideSearch
  />
);

export default TriggerDropdown;
