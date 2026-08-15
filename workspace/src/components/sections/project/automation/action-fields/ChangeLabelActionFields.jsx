import { Stack, Typography } from '@mui/material';
import i18n from 'locales/i18n';
import LabelConditionFields from '../condition-fields/LabelConditionFields';

const ChangeLabelActionFields = ({ index }) => (
  <Stack sx={{ gap: 2 }}>
    <Stack sx={{ gap: 1 }}>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
        }}
      >
        {i18n.t('ui.sections.project.automation.action_fields.add_label_591203a2')}
      </Typography>
      <LabelConditionFields
        name={`actions.${index}.params.addLabels`}
        textFieldLabel=""
        placeholder={i18n.t('ui.sections.project.automation.action_fields.select_a_label_65a33e38')}
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
        {i18n.t('ui.sections.project.automation.action_fields.remove_label_57817546')}
      </Typography>
      <LabelConditionFields
        name={`actions.${index}.params.removeLabels`}
        textFieldLabel=""
        placeholder={i18n.t('ui.sections.project.automation.action_fields.select_a_label_65a33e38')}
        hideSearch
      />
    </Stack>
  </Stack>
);

export default ChangeLabelActionFields;
