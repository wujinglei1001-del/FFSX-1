import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, FormControl, FormHelperText, MenuItem, Typography } from '@mui/material';
import StyledSelect from 'components/styled/StyledSelect';

const LANGUAGE_OPTIONS = ['English', 'Spanish', 'French', 'German'];

const Language = () => {
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
        {translateUi('ui.sections.content.upload.common.language_89b86ab0')}
      </Typography>
      <FormControl fullWidth error={!!errors.language}>
        <Controller
          name="language"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <StyledSelect {...field} displayEmpty>
              <MenuItem value="" disabled>
                {translateUi('ui.sections.content.upload.common.select_85982229')}
              </MenuItem>
              {LANGUAGE_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </StyledSelect>
          )}
        />

        {errors.language && <FormHelperText>{errors.language.message}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default Language;
