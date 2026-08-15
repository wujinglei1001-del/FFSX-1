import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MenuItem, Stack, Typography } from '@mui/material';
import StyledTextField from 'components/styled/StyledTextField';

const FromToSelectConditionFields = ({ index, options, renderOption, renderValue }) => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
      <Stack direction="row" sx={{ gap: 1, alignItems: 'center', flex: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {translateUi('ui.sections.project.automation.condition_fields.from_3f66052a')}
        </Typography>
        <Controller
          control={control}
          name={`conditions.${index}.fromValue`}
          render={({ field }) => (
            <StyledTextField
              select
              size="medium"
              sx={{ flex: 1 }}
              value={field.value ?? ''}
              onChange={field.onChange}
              error={!!errors.conditions?.[index]?.fromValue}
              helperText={errors.conditions?.[index]?.fromValue?.message}
              slotProps={renderValue ? { select: { renderValue } } : undefined}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {renderOption ? renderOption(option) : option}
                </MenuItem>
              ))}
            </StyledTextField>
          )}
        />
      </Stack>
      <Stack direction="row" sx={{ gap: 1, alignItems: 'center', flex: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {translateUi('ui.sections.project.automation.condition_fields.to_ae79ea1e')}
        </Typography>
        <Controller
          control={control}
          name={`conditions.${index}.toValue`}
          render={({ field }) => (
            <StyledTextField
              select
              size="medium"
              sx={{ flex: 1 }}
              value={field.value ?? ''}
              onChange={field.onChange}
              error={!!errors.conditions?.[index]?.toValue}
              helperText={errors.conditions?.[index]?.toValue?.message}
              slotProps={renderValue ? { select: { renderValue } } : undefined}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {renderOption ? renderOption(option) : option}
                </MenuItem>
              ))}
            </StyledTextField>
          )}
        />
      </Stack>
    </Stack>
  );
};

export default FromToSelectConditionFields;
