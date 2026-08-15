import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, FormControl, FormHelperText, MenuItem, Typography } from '@mui/material';
import StyledSelect from 'components/styled/StyledSelect';

const ACCESSIBILITY_OPTIONS = ['Ev', 'Unlisted', 'Private'];

const Accessibility = () => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box sx={{ flex: 1 }}>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          mb: 1,
        }}
      >
        {translateUi('ui.sections.content.upload.common.accessibility_d660049b')}
      </Typography>
      <FormControl fullWidth error={!!errors.accessibility}>
        <Controller
          name="accessibility"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <StyledSelect {...field} displayEmpty>
              <MenuItem value="" disabled>
                {translateUi('ui.sections.content.upload.common.select_85982229')}
              </MenuItem>
              {ACCESSIBILITY_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </StyledSelect>
          )}
        />

        {errors.accessibility && <FormHelperText>{errors.accessibility.message}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default Accessibility;
