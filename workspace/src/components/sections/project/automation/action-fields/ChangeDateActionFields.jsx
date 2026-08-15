import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import StyledTextField from 'components/styled/StyledTextField';
import DatePickerWithShortcuts from '../shared/DatePickerWithShortcuts';

const ChangeDateActionFields = ({ index }) => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const dateMode = useWatch({ control, name: `actions.${index}.params.dateMode` }) ?? 'weeks';

  return (
    <Stack sx={{ gap: 2 }}>
      <Controller
        control={control}
        name={`actions.${index}.params.dateMode`}
        render={({ field }) => (
          <RadioGroup value={field.value ?? 'weeks'} onChange={(_, value) => field.onChange(value)}>
            <Stack sx={{ gap: 1 }}>
              <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                <FormControlLabel value="days" control={<Radio />} label="" sx={{ m: 0 }} />
                <Controller
                  control={control}
                  name={`actions.${index}.params.dateOffset`}
                  render={({ field: offsetField }) => (
                    <StyledTextField
                      size="small"
                      type="number"
                      disabledSpinButton
                      value={offsetField.value ? String(offsetField.value) : ''}
                      onChange={offsetField.onChange}
                      disabled={dateMode !== 'days'}
                      sx={{ width: 56 }}
                      error={!!errors.actions?.[index]?.params?.dateOffset}
                      helperText={errors.actions?.[index]?.params?.dateOffset?.message}
                    />
                  )}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  {translateUi(
                    'ui.sections.project.automation.action_fields.day_s_after_trigger_dac987f2',
                  )}
                </Typography>
              </Stack>

              <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                <FormControlLabel value="weeks" control={<Radio />} label="" sx={{ m: 0 }} />
                <Controller
                  control={control}
                  name={`actions.${index}.params.dateOffset`}
                  render={({ field: offsetField }) => (
                    <StyledTextField
                      size="small"
                      type="number"
                      disabledSpinButton
                      value={offsetField.value ? String(offsetField.value) : ''}
                      onChange={offsetField.onChange}
                      disabled={dateMode !== 'weeks'}
                      sx={{ width: 56 }}
                      error={!!errors.actions?.[index]?.params?.dateOffset}
                      helperText={errors.actions?.[index]?.params?.dateOffset?.message}
                    />
                  )}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  {translateUi(
                    'ui.sections.project.automation.action_fields.week_s_after_trigger_dee59302',
                  )}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                sx={{
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <FormControlLabel value="custom" control={<Radio />} label="" sx={{ m: 0 }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  {translateUi(
                    'ui.sections.project.automation.action_fields.set_custom_date_90458e7d',
                  )}
                </Typography>
              </Stack>
            </Stack>
          </RadioGroup>
        )}
      />
      <DatePickerWithShortcuts
        name={`actions.${index}.params.customDate`}
        placeholder={translateUi(
          'ui.sections.project.automation.action_fields.change_start_end_date_a2003dc1',
        )}
        disabled={dateMode !== 'custom'}
      />
    </Stack>
  );
};

export default ChangeDateActionFields;
