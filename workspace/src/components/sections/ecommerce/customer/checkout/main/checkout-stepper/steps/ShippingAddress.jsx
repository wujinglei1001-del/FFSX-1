import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Checkbox, FormControl, FormControlLabel, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import i18n from 'locales/i18n';
import * as yup from 'yup';

export const shippingAddressFormSchema = yup
  .object({
    shippingAddress: yup.object({
      street: yup
        .string()
        .required(
          i18n.t('ui.sections.ecommerce.customer.checkout.this_field_is_required_dedbaded'),
        ),
      townCity: yup
        .string()
        .required(
          i18n.t('ui.sections.ecommerce.customer.checkout.this_field_is_required_dedbaded'),
        ),
      postcode: yup
        .string()
        .required(
          i18n.t('ui.sections.ecommerce.customer.checkout.this_field_is_required_dedbaded'),
        ),
      country: yup
        .string()
        .required(
          i18n.t('ui.sections.ecommerce.customer.checkout.this_field_is_required_dedbaded'),
        ),
      state: yup
        .string()
        .required(
          i18n.t('ui.sections.ecommerce.customer.checkout.this_field_is_required_dedbaded'),
        ),
      differentBillingAddress: yup.boolean(),
    }),
  })
  .required();

const ShippingAddress = () => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <Grid
      container
      columnSpacing={2}
      sx={{
        rowGap: 3,
        my: 3,
      }}
    >
      <Grid
        size={{
          xs: 12,
          sm: 6,
        }}
      >
        <TextField
          fullWidth
          id="street"
          type="text"
          label={translateUi('ui.sections.ecommerce.customer.checkout.street_address_bc48b235')}
          variant="filled"
          error={!!errors.shippingAddress?.street}
          helperText={errors.shippingAddress?.street?.message}
          {...register('shippingAddress.street')}
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6,
        }}
      >
        <TextField
          fullWidth
          id="townCity"
          type="text"
          label={translateUi('ui.sections.ecommerce.customer.checkout.town_city_e44cf3b5')}
          variant="filled"
          error={!!errors.shippingAddress?.townCity}
          helperText={errors.shippingAddress?.townCity?.message}
          {...register('shippingAddress.townCity')}
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 4,
        }}
      >
        <TextField
          fullWidth
          id="postcode"
          type="text"
          label={translateUi('ui.sections.ecommerce.customer.checkout.postcode_50767273')}
          variant="filled"
          error={!!errors.shippingAddress?.postcode}
          helperText={errors.shippingAddress?.postcode?.message}
          {...register('shippingAddress.postcode')}
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 4,
        }}
      >
        <TextField
          fullWidth
          id="country"
          type="text"
          label={translateUi('ui.sections.ecommerce.customer.checkout.country_2bd5a736')}
          variant="filled"
          error={!!errors.shippingAddress?.country}
          helperText={errors.shippingAddress?.country?.message}
          {...register('shippingAddress.country')}
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 4,
        }}
      >
        <TextField
          fullWidth
          id="state"
          type="text"
          label={translateUi('ui.sections.ecommerce.customer.checkout.state_c3ffd085')}
          variant="filled"
          error={!!errors.shippingAddress?.state}
          helperText={errors.shippingAddress?.state?.message}
          {...register('shippingAddress.state')}
        />
      </Grid>
      <Grid size={12}>
        <FormControl component="fieldset" variant="filled" sx={{ display: 'block' }}>
          <FormControlLabel
            sx={{ color: 'text.secondary' }}
            control={
              <Controller
                name="shippingAddress.differentBillingAddress"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} checked={field.value} />}
              />
            }
            label={translateUi(
              'ui.sections.ecommerce.customer.checkout.use_a_different_billing_address_1693a0e6',
            )}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default ShippingAddress;
