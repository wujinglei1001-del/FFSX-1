import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Autocomplete, Chip } from '@mui/material';
import StyledTextField from 'components/styled/StyledTextField';

const defaultTags = [
  'Chair',
  'Sitting',
  'Comfort',
  'Comfy',
  'Velvet',
  'Corduroy',
  'Black',
  'Grey',
  'Living room',
  'Furniture',
  'Sofa',
  'Couch',
];

const Tags = () => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name="tags"
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <Autocomplete
          {...field}
          multiple
          freeSolo
          options={defaultTags}
          onChange={(_, newValue) => field.onChange(newValue)}
          value={field.value}
          renderValue={(value, getItemProps) =>
            value.map((option, index) => {
              const { key, ...rest } = getItemProps({ index });

              return (
                <Chip
                  key={key}
                  variant="outlined"
                  color="neutral"
                  sx={{ m: 0.5 }}
                  label={option}
                  {...rest}
                />
              );
            })
          }
          renderInput={(params) => (
            <StyledTextField
              {...params}
              variant="filled"
              placeholder={translateUi(
                'ui.sections.ecommerce.admin.product_listing.type_and_add_tags_e32fc6ee',
              )}
              error={!!errors.tags}
              helperText={errors.tags?.message}
            />
          )}
        />
      )}
    />
  );
};

export default Tags;
