import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IconButton, Stack, TextField, Typography, formHelperTextClasses } from '@mui/material';
import Grid from '@mui/material/Grid';
import IconifyIcon from 'components/base/IconifyIcon';

const OptionalInfo = () => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productInformation.specifications',
  });

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Stack
          direction="row"
          sx={{
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle2">
            {translateUi('ui.sections.ecommerce.admin.product_listing.optional_0c6c4102')}
          </Typography>
          <IconButton onClick={() => append({ label: '', value: '' })}>
            <IconifyIcon icon="material-symbols:add-rounded" color="neutral.main" fontSize={18} />
          </IconButton>
        </Stack>
      </Grid>
      {fields.map((field, index) => (
        <Grid key={field.id} size={12}>
          <Stack
            direction="row"
            sx={{
              gap: 1,
              alignItems: { xs: 'flex-start', sm: 'center' },
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              sx={{
                flex: 1,
                gap: 1,
              }}
            >
              <TextField
                label={`Option ${index + 1}`}
                type="text"
                sx={{
                  width: { xs: 1, sm: 170 },
                  [`& .${formHelperTextClasses.root}`]: {
                    position: 'absolute',
                    bottom: -16,
                  },
                }}
                error={!!errors.productInformation?.specifications?.[index]?.label?.message}
                helperText={errors.productInformation?.specifications?.[index]?.label?.message}
                {...register(`productInformation.specifications.${index}.label`)}
              />

              <TextField
                label={translateUi(
                  'ui.sections.ecommerce.admin.product_listing.information_0eb5ed50',
                )}
                type="text"
                sx={{
                  flex: 1,
                  [`& .${formHelperTextClasses.root}`]: {
                    position: 'absolute',
                    bottom: -16,
                  },
                }}
                error={!!errors.productInformation?.specifications?.[index]?.value?.message}
                helperText={errors.productInformation?.specifications?.[index]?.value?.message}
                {...register(`productInformation.specifications.${index}.value`)}
              />
            </Stack>

            <IconButton color="error" onClick={() => remove(index)}>
              <IconifyIcon icon="material-symbols:delete-outline-rounded" fontSize={20} />
            </IconButton>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

export default OptionalInfo;
