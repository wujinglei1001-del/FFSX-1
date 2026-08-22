import { Controller, useFormContext } from 'react-hook-form';
import { MenuItem, Stack, Typography } from '@mui/material';
import StyledTextField from 'components/styled/StyledTextField';
import { GROUP_OPTIONS } from '../common/constants';

const GroupSelectActionFields = ({ index, paramKey }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors.actions?.[index]?.params?.[paramKey];

  return (
    <Stack sx={{ gap: 1 }}>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Group
      </Typography>
      <Controller
        control={control}
        name={`actions.${index}.params.${paramKey}`}
        render={({ field }) => (
          <StyledTextField
            select
            size="medium"
            value={field.value ?? ''}
            onChange={field.onChange}
            error={!!fieldError}
            helperText={fieldError?.message}
            slotProps={{
              select: {
                displayEmpty: true,
                renderValue: (selected) => (selected ? String(selected) : 'Select a group'),
              },
            }}
          >
            <MenuItem value="" disabled>
              Select a group
            </MenuItem>
            {GROUP_OPTIONS.map((group) => (
              <MenuItem key={group} value={group}>
                {group}
              </MenuItem>
            ))}
          </StyledTextField>
        )}
      />
    </Stack>
  );
};

export default GroupSelectActionFields;
