import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MenuItem, Stack, Typography } from '@mui/material';
import StyledTextField from 'components/styled/StyledTextField';
import { STATUS_OPTIONS } from '../common/constants';

const StatusSelectActionFields = ({ index }) => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack sx={{ gap: 1 }}>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {translateUi('ui.sections.project.automation.action_fields.status_bae7d5be')}
      </Typography>
      <Controller
        control={control}
        name={`actions.${index}.params.status`}
        render={({ field }) => (
          <StyledTextField
            select
            size="medium"
            value={field.value ?? ''}
            onChange={field.onChange}
            error={!!errors.actions?.[index]?.params?.status}
            helperText={errors.actions?.[index]?.params?.status?.message}
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
  );
};

export default StatusSelectActionFields;
