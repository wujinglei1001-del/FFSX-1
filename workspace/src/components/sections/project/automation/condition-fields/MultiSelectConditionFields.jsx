import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, MenuItem, Stack, Typography } from '@mui/material';
import StyledTextField from 'components/styled/StyledTextField';
import { PRIORITY_OPTIONS, STATUS_OPTIONS, getPriorityDotColor } from '../common/constants';

const statusOptions = [...STATUS_OPTIONS];
const priorityOptions = [...PRIORITY_OPTIONS];

const MultiSelectConditionFields = ({ index, type }) => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
      <Controller
        control={control}
        name={`conditions.${index}.operator`}
        render={({ field }) => (
          <StyledTextField select size="medium" sx={{ flex: 1 }} {...field}>
            <MenuItem value="equals">
              {translateUi('ui.sections.project.automation.condition_fields.is_equal_to_db81567d')}
            </MenuItem>
            <MenuItem value="not_equals">
              {translateUi(
                'ui.sections.project.automation.condition_fields.is_not_equal_to_bc59a50d',
              )}
            </MenuItem>
            <MenuItem value="is_any_of">
              {translateUi('ui.sections.project.automation.condition_fields.is_any_of_d38f513c')}
            </MenuItem>
            <MenuItem value="is_all_of">
              {translateUi('ui.sections.project.automation.condition_fields.is_all_of_6a831512')}
            </MenuItem>
            <MenuItem value="is_not_any_of">
              {translateUi(
                'ui.sections.project.automation.condition_fields.is_not_any_of_f165c80f',
              )}
            </MenuItem>
            <MenuItem value="is_not_all_of">
              {translateUi(
                'ui.sections.project.automation.condition_fields.is_not_all_of_7f0b1e64',
              )}
            </MenuItem>
            <MenuItem value="is_set">
              {translateUi('ui.sections.project.automation.condition_fields.is_set_b95d33c0')}
            </MenuItem>
            <MenuItem value="is_not_set">
              {translateUi('ui.sections.project.automation.condition_fields.is_not_set_6d014bcb')}
            </MenuItem>
          </StyledTextField>
        )}
      />
      <Controller
        control={control}
        name={`conditions.${index}.value`}
        render={({ field }) => (
          <StyledTextField
            select
            size="medium"
            sx={{ flex: 1 }}
            {...field}
            error={!!errors.conditions?.[index]?.value}
            helperText={errors.conditions?.[index]?.value?.message}
            slotProps={
              type === 'priority_is'
                ? {
                    select: {
                      renderValue: (selected) => {
                        const value = String(selected ?? '');
                        return (
                          <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                bgcolor: getPriorityDotColor(value),
                                flexShrink: 0,
                              }}
                            />
                            <Typography variant="body2">{value}</Typography>
                          </Stack>
                        );
                      },
                    },
                  }
                : undefined
            }
          >
            {(type === 'status_is' ? statusOptions : priorityOptions).map((option) => (
              <MenuItem key={option} value={option}>
                {type === 'priority_is' ? (
                  <>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        mr: 1.5,
                        bgcolor: getPriorityDotColor(option),
                        flexShrink: 0,
                      }}
                    />
                    {option}
                  </>
                ) : (
                  option
                )}
              </MenuItem>
            ))}
          </StyledTextField>
        )}
      />
    </Stack>
  );
};

export default MultiSelectConditionFields;
