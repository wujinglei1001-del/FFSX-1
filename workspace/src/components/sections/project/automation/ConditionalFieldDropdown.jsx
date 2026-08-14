import { CONDITION_FILTER_OPTIONS, getConditionFilterLabel } from './common/constants';
import GroupedSearchableSelect from './shared/GroupedSearchableSelect';

const ConditionalFieldDropdown = ({ value, onChange, excludedTypes = [] }) => (
  <GroupedSearchableSelect
    value={value}
    onChange={onChange}
    flatOptions={CONDITION_FILTER_OPTIONS}
    getLabel={getConditionFilterLabel}
    excludedValues={excludedTypes}
    hideSearch
  />
);

export default ConditionalFieldDropdown;
