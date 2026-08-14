import { DESTRUCTIVE_ACTION_TYPES } from './common/actionRegistry';
import { ACTION_GROUPS, getActionTypeLabel } from './common/constants';
import GroupedSearchableSelect from './shared/GroupedSearchableSelect';

const ActionDropdown = ({ value, onChange, excludedTypes = [] }) => (
  <GroupedSearchableSelect
    value={value}
    onChange={onChange}
    groups={ACTION_GROUPS}
    getLabel={getActionTypeLabel}
    excludedValues={excludedTypes}
    destructiveValues={DESTRUCTIVE_ACTION_TYPES}
    showSearchIcon
  />
);

export default ActionDropdown;
