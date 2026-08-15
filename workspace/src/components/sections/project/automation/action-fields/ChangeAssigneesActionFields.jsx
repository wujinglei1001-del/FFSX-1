import { Stack, Typography } from '@mui/material';
import i18n from 'locales/i18n';
import AssigneeConditionFields from '../condition-fields/AssigneeConditionFields';

const ChangeAssigneesActionFields = ({ index }) => (
  <Stack sx={{ gap: 2 }}>
    <Stack sx={{ gap: 1 }}>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
        }}
      >
        {i18n.t('ui.sections.project.automation.action_fields.remove_assignees_956d9ac6')}
      </Typography>
      <AssigneeConditionFields
        name={`actions.${index}.params.removeAssignees`}
        textFieldLabel=""
        placeholder={i18n.t('ui.sections.project.automation.action_fields.select_a_user_188d2103')}
        hideSearch
      />
    </Stack>

    <Stack sx={{ gap: 1 }}>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
        }}
      >
        {i18n.t('ui.sections.project.automation.action_fields.add_assignees_20945e3f')}
      </Typography>
      <AssigneeConditionFields
        name={`actions.${index}.params.addAssignees`}
        textFieldLabel=""
        placeholder={i18n.t('ui.sections.project.automation.action_fields.select_a_user_188d2103')}
        hideSearch
      />
    </Stack>
  </Stack>
);

export default ChangeAssigneesActionFields;
