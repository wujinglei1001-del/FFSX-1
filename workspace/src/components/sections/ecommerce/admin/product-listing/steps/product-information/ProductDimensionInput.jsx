import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  formHelperTextClasses,
} from '@mui/material';

const ProductDimensionInput = ({ label, field }) => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <Stack
      direction="row"
      sx={{
        gap: 1,
        alignItems: 'center',
      }}
    >
      <TextField disabled label={label} sx={{ width: { xs: 80, sm: 170 } }} />
      <TextField
        label={translateUi('ui.sections.ecommerce.admin.product_listing.value_8dce170d')}
        type="number"
        sx={{
          flex: 1,
          [`& .${formHelperTextClasses.root}`]: {
            position: 'absolute',
            bottom: -16,
          },
        }}
        error={!!errors.productInformation?.[field]?.value?.message}
        helperText={errors.productInformation?.[field]?.value?.message}
        {...register(`productInformation.${field}.value`, {
          setValueAs: (value) => Number(value),
        })}
      />
      <FormControl
        variant="filled"
        sx={{ width: { xs: 80, sm: 96 } }}
        error={!!errors.productInformation?.[field]?.unit?.message}
      >
        <InputLabel>
          {translateUi('ui.sections.ecommerce.admin.product_listing.unit_f6b935ab')}
        </InputLabel>
        <Controller
          name={`productInformation.${field}.unit`}
          control={control}
          defaultValue="ft"
          render={({ field }) => (
            <Select sx={{ height: 1 }} {...field}>
              <MenuItem value="in">
                {translateUi('ui.sections.ecommerce.admin.product_listing.inches_79a0469d')}
              </MenuItem>
              <MenuItem value="ft">
                {translateUi('ui.sections.ecommerce.admin.product_listing.feet_7037c84e')}
              </MenuItem>
              <MenuItem value="m">
                {translateUi('ui.sections.ecommerce.admin.product_listing.meters_6ad427ce')}
              </MenuItem>
            </Select>
          )}
        />
        <FormHelperText>{errors.productInformation?.[field]?.unit?.message}</FormHelperText>
      </FormControl>
    </Stack>
  );
};

export default ProductDimensionInput;
