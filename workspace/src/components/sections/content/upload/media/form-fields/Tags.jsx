import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Autocomplete, Chip, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import StyledTextField from 'components/styled/StyledTextField';

const Tags = () => {
  const { t: translateUi } = useTranslation();
  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <div>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          mb: 1,
        }}
      >
        {translateUi('ui.sections.content.upload.media.tags_848eed0f')}
      </Typography>
      <Controller
        name="tags"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <Autocomplete
            {...field}
            multiple
            freeSolo
            options={[]}
            onChange={(_, newValue) => field.onChange(newValue)}
            value={field.value}
            renderValue={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...rest } = getTagProps({ index });
                return <Chip key={key} label={option} size="small" {...rest} />;
              })
            }
            renderInput={(params) => (
              <StyledTextField
                {...params}
                placeholder={field.value.length === 0 ? 'Type and press Enter' : ''}
                error={!!errors.tags}
                helperText={errors.tags?.message}
              />
            )}
          />
        )}
      />
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          mt: 0.5,
          mx: 1.5,
        }}
      >
        <IconifyIcon icon="material-symbols:info-outline" sx={{ fontSize: 14 }} />
        {translateUi('ui.sections.content.upload.media.limit_of_10_506115c7')}
      </Typography>
    </div>
  );
};

export default Tags;
