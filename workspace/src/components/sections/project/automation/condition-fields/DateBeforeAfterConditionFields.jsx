import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MenuItem, Stack } from '@mui/material';
import StyledTextField from 'components/styled/StyledTextField';
import {
  DATE_OFFSET_UNIT_OPTIONS,
  DATE_RELATION_OPTIONS,
  REFERENCE_DATE_OPTIONS,
} from '../common/constants';
import DatePickerWithShortcuts from '../shared/DatePickerWithShortcuts';

const DateBeforeAfterConditionFields = ({ index }) => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const conditionType = useWatch({
    control,
    name: `conditions.${index}.type`,
  });

  const showReferenceDateSelect = conditionType === 'date_is_before_or_after';

  return (
    <Stack sx={{ gap: 2 }}>
      <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
        <Controller
          control={control}
          name={`conditions.${index}.dateOffset`}
          render={({ field }) => (
            <StyledTextField
              size="medium"
              type="number"
              disabledSpinButton
              value={field.value ? String(field.value) : ''}
              onChange={field.onChange}
              sx={{ width: 88 }}
              error={!!errors.conditions?.[index]?.dateOffset}
              helperText={errors.conditions?.[index]?.dateOffset?.message}
            />
          )}
        />

        <Controller
          control={control}
          name={`conditions.${index}.dateOffsetUnit`}
          render={({ field }) => (
            <StyledTextField
              select
              size="medium"
              value={field.value ?? ''}
              onChange={field.onChange}
            >
              {DATE_OFFSET_UNIT_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </StyledTextField>
          )}
        />

        <Controller
          control={control}
          name={`conditions.${index}.dateRelation`}
          render={({ field }) => (
            <StyledTextField
              select
              size="medium"
              value={field.value ?? ''}
              onChange={field.onChange}
            >
              {DATE_RELATION_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </StyledTextField>
          )}
        />
      </Stack>

      {showReferenceDateSelect ? (
        <Controller
          control={control}
          name={`conditions.${index}.field`}
          render={({ field }) => (
            <StyledTextField
              select
              size="medium"
              fullWidth
              value={field.value ?? ''}
              onChange={field.onChange}
            >
              {REFERENCE_DATE_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </StyledTextField>
          )}
        />
      ) : (
        <DatePickerWithShortcuts
          name={`conditions.${index}.targetDate`}
          label={translateUi(
            'ui.sections.project.automation.condition_fields.select_a_date_71eb2ed4',
          )}
          placeholder={translateUi(
            'ui.sections.project.automation.condition_fields.select_a_date_71eb2ed4',
          )}
        />
      )}
    </Stack>
  );
};

export default DateBeforeAfterConditionFields;
