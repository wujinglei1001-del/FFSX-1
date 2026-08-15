import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MenuItem, Stack, Typography } from '@mui/material';
import StyledTextField from 'components/styled/StyledTextField';
import { LABEL_OPTIONS, PROJECT_OPTIONS, STATUS_OPTIONS } from '../common/constants';
import AutomationDatePicker from '../shared/AutomationDatePicker';

const CreateTaskSubtaskActionFields = ({ index }) => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack sx={{ gap: 2 }}>
      <Stack sx={{ gap: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          {translateUi('ui.sections.project.automation.action_fields.task_name_c78d2fc3')}
        </Typography>
        <Controller
          control={control}
          name={`actions.${index}.params.taskName`}
          render={({ field }) => (
            <StyledTextField
              size="medium"
              fullWidth
              value={field.value ?? ''}
              onChange={field.onChange}
              placeholder={translateUi(
                'ui.sections.project.automation.action_fields.task_name_c78d2fc3',
              )}
              error={!!errors.actions?.[index]?.params?.taskName}
              helperText={errors.actions?.[index]?.params?.taskName?.message}
            />
          )}
        />
      </Stack>
      <Stack sx={{ gap: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          {translateUi('ui.sections.project.automation.action_fields.project_f6f4da8d')}
        </Typography>
        <Controller
          control={control}
          name={`actions.${index}.params.project`}
          render={({ field }) => (
            <StyledTextField
              select
              size="medium"
              fullWidth
              value={field.value ?? ''}
              onChange={field.onChange}
              slotProps={{
                select: {
                  displayEmpty: true,
                  renderValue: (selected) => (selected ? String(selected) : 'Select project'),
                },
              }}
            >
              <MenuItem value="" disabled>
                {translateUi(
                  'ui.sections.project.automation.action_fields.select_project_b4b37dd6',
                )}
              </MenuItem>
              {PROJECT_OPTIONS.map((project) => (
                <MenuItem key={project} value={project}>
                  {project}
                </MenuItem>
              ))}
            </StyledTextField>
          )}
        />
      </Stack>
      <Stack sx={{ gap: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          {translateUi('ui.sections.project.automation.action_fields.status_bae7d5be')}
        </Typography>
        <Controller
          control={control}
          name={`actions.${index}.params.status`}
          render={({ field }) => (
            <StyledTextField
              select
              size="medium"
              fullWidth
              value={field.value ?? ''}
              onChange={field.onChange}
              slotProps={{
                select: {
                  displayEmpty: true,
                  renderValue: (selected) => (selected ? String(selected) : 'Select status'),
                },
              }}
            >
              <MenuItem value="" disabled>
                {translateUi('ui.sections.project.automation.action_fields.select_status_03320176')}
              </MenuItem>
              {STATUS_OPTIONS.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </StyledTextField>
          )}
        />
      </Stack>
      <Stack sx={{ gap: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          {translateUi('ui.sections.project.automation.action_fields.description_55f8ebc8')}
        </Typography>
        <Controller
          control={control}
          name={`actions.${index}.params.description`}
          render={({ field }) => (
            <StyledTextField
              size="medium"
              fullWidth
              value={field.value ?? ''}
              onChange={field.onChange}
              placeholder={translateUi(
                'ui.sections.project.automation.action_fields.write_a_description_dda9f030',
              )}
              multiline
              minRows={3}
            />
          )}
        />
      </Stack>
      <Stack direction="row" sx={{ gap: 2, minWidth: 0 }}>
        <Stack sx={{ gap: 1, flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
            }}
          >
            {translateUi('ui.sections.project.automation.action_fields.start_date_9d7ab1a5')}
          </Typography>
          <AutomationDatePicker name={`actions.${index}.params.startDate`} />
        </Stack>

        <Stack sx={{ gap: 1, flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
            }}
          >
            {translateUi('ui.sections.project.automation.action_fields.end_date_84b14781')}
          </Typography>
          <AutomationDatePicker name={`actions.${index}.params.endDate`} />
        </Stack>
      </Stack>
      <Stack sx={{ gap: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          {translateUi('ui.sections.project.automation.action_fields.label_74341e3c')}
        </Typography>
        <Controller
          control={control}
          name={`actions.${index}.params.label`}
          render={({ field }) => (
            <StyledTextField
              select
              size="medium"
              fullWidth
              value={field.value ?? ''}
              onChange={field.onChange}
              slotProps={{
                select: {
                  displayEmpty: true,
                  renderValue: (selected) => (selected ? String(selected) : 'Select label'),
                },
              }}
            >
              <MenuItem value="" disabled>
                {translateUi('ui.sections.project.automation.action_fields.select_label_239dc2b6')}
              </MenuItem>
              {LABEL_OPTIONS.map((label) => (
                <MenuItem key={label} value={label}>
                  {label}
                </MenuItem>
              ))}
            </StyledTextField>
          )}
        />
      </Stack>
    </Stack>
  );
};

export default CreateTaskSubtaskActionFields;
