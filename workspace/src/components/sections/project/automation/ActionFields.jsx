import { Typography } from '@mui/material';
import i18n from 'locales/i18n';
import ChangeAssigneesActionFields from './action-fields/ChangeAssigneesActionFields';
import ChangeDateActionFields from './action-fields/ChangeDateActionFields';
import ChangeLabelActionFields from './action-fields/ChangeLabelActionFields';
import ChangePriorityActionFields from './action-fields/ChangePriorityActionFields';
import CreateTaskSubtaskActionFields from './action-fields/CreateTaskSubtaskActionFields';
import GroupSelectActionFields from './action-fields/GroupSelectActionFields';
import StatusSelectActionFields from './action-fields/StatusSelectActionFields';
import { getActionFieldVariant } from './common/actionRegistry';

const NoConfigActionFields = () => (
  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    {i18n.t(
      'ui.sections.project.automation.actionfields.no_additional_configuration_required_b192df1b',
    )}
  </Typography>
);

const FIELD_COMPONENTS = {
  group: ({ index }) => <GroupSelectActionFields index={index} paramKey="targetGroup" />,
  project: ({ index }) => <GroupSelectActionFields index={index} paramKey="targetProject" />,
  date: ChangeDateActionFields,
  priority: ChangePriorityActionFields,
  status: StatusSelectActionFields,
  assignees: ChangeAssigneesActionFields,
  label: ChangeLabelActionFields,
  create_task: CreateTaskSubtaskActionFields,
  none: NoConfigActionFields,
};

const ActionFields = ({ index, type }) => {
  const FieldComponent = FIELD_COMPONENTS[getActionFieldVariant(type)];
  return <FieldComponent index={index} />;
};

export default ActionFields;
