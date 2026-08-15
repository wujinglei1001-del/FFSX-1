import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { countries } from 'data/countries';
import { hsCodeList } from 'data/e-commerce/product-listing';
import i18n from 'locales/i18n';
import * as yup from 'yup';

export const ShippingFormSchema = yup.object().shape({
  shippingDetails: yup.object().shape({
    isPhysicalProduct: yup.boolean(),
    weight: yup
      .object()
      .shape({
        value: yup.number(),
        unit: yup.string(),
      })
      .when('isPhysicalProduct', {
        is: true,
        then: (schema) =>
          schema.shape({
            value: yup
              .number()
              .required(
                i18n.t('ui.sections.ecommerce.admin.product_listing.value_is_required_30b22827'),
              )
              .positive('Value must be a positive number'),
            unit: yup
              .string()
              .required(
                i18n.t(
                  'ui.sections.ecommerce.admin.product_listing.weight_unit_is_required_d015e469',
                ),
              ),
          }),
      }),
    country: yup
      .string()
      .required(
        i18n.t('ui.sections.ecommerce.admin.product_listing.this_field_is_required_dedbaded'),
      ),
    hsCode: yup
      .object()
      .shape({
        code: yup
          .string()
          .required(
            i18n.t('ui.sections.ecommerce.admin.product_listing.hs_code_is_required_68804c4d'),
          ),
      })
      .required(
        i18n.t('ui.sections.ecommerce.admin.product_listing.this_field_is_required_dedbaded'),
      ),
  }),
});

const Shipping = () => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  console.log({ errors });

  const isPhysicalProduct = useWatch({ control, name: 'shippingDetails.isPhysicalProduct' });

  return (
    <>
      <Grid
        container
        sx={{
          gap: 5,
        }}
      >
        <Grid size={12}>
          <FormControl
            component="fieldset"
            variant="filled"
            error={!!errors.shippingDetails?.isPhysicalProduct?.message}
          >
            <FormControlLabel
              control={
                <Controller
                  name="shippingDetails.isPhysicalProduct"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => <Checkbox {...field} checked={field.value} />}
                />
              }
              label={translateUi(
                'ui.sections.ecommerce.admin.product_listing.this_is_a_physical_product_d7a4d3ef',
              )}
            />
          </FormControl>

          {isPhysicalProduct && (
            <Box
              sx={{
                mt: 4,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 1,
                }}
              >
                {translateUi('ui.sections.ecommerce.admin.product_listing.weight_69c0b815')}
              </Typography>
              <Typography
                component="p"
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  mb: 2,
                }}
              >
                {translateUi(
                  'ui.sections.ecommerce.admin.product_listing.used_to_calculate_shipping_rates_at_checkout_and_lab_85c41ce4',
                )}
              </Typography>
              <Stack
                direction="row"
                sx={{
                  gap: 1,
                }}
              >
                <TextField
                  label={translateUi('ui.sections.ecommerce.admin.product_listing.weight_69c0b815')}
                  variant="filled"
                  sx={{ width: 100 }}
                  error={!!errors.shippingDetails?.weight?.value}
                  helperText={errors.shippingDetails?.weight?.value?.message}
                  {...register('shippingDetails.weight.value', {
                    setValueAs: (value) => Number(value),
                  })}
                />
                <FormControl variant="filled">
                  <InputLabel id="weight-unit-label">
                    {translateUi('ui.sections.ecommerce.admin.product_listing.unit_f6b935ab')}
                  </InputLabel>
                  <Controller
                    name="shippingDetails.weight.unit"
                    control={control}
                    defaultValue="kg"
                    render={({ field }) => (
                      <Select labelId="weight-unit-label" sx={{ width: 80 }} {...field}>
                        <MenuItem value="kg">
                          {translateUi('ui.sections.ecommerce.admin.product_listing.kg_1389845b')}
                        </MenuItem>
                        <MenuItem value="lb">
                          {translateUi('ui.sections.ecommerce.admin.product_listing.lb_cba41814')}
                        </MenuItem>
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors.shippingDetails?.weight?.unit?.message}</FormHelperText>
                </FormControl>
              </Stack>
            </Box>
          )}
        </Grid>

        <Grid size={12}>
          <Controller
            name="shippingDetails.country"
            control={control}
            render={({ field }) => (
              <Autocomplete
                id="country-select"
                sx={{ width: 1, maxWidth: 410, mb: 2 }}
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                onChange={(_, value) => field.onChange(value ? value.label : '')}
                value={countries.find((country) => country.label === field.value) || null}
                renderOption={(props, option) => {
                  const { key, ...optionProps } = props;

                  return (
                    <Box key={key} component="li" {...optionProps}>
                      {option.label} ({option.code})
                    </Box>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    label={translateUi(
                      'ui.sections.ecommerce.admin.product_listing.select_country_region_38223838',
                    )}
                    error={!!errors.shippingDetails?.country?.message}
                    helperText={errors.shippingDetails?.country?.message}
                    {...params}
                  />
                )}
              />
            )}
          />
          <Controller
            name="shippingDetails.hsCode"
            control={control}
            render={({ field }) => (
              <Autocomplete
                id="hscode-select"
                sx={{ width: 1, maxWidth: 410, mb: 2 }}
                options={hsCodeList}
                autoHighlight
                getOptionLabel={(option) => String(option.code)}
                isOptionEqualToValue={(option, value) => option.code === value.code}
                onChange={(_, value) => field.onChange(value)}
                value={field.value || null}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Stack direction="row" sx={{ alignItems: 'flex-start' }}>
                      <Typography component="span" sx={{ fontSize: 14, fontWeight: 'bold' }}>
                        {option.code}
                      </Typography>
                      {' - '}
                      {option.desc}
                    </Stack>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    label={translateUi(
                      'ui.sections.ecommerce.admin.product_listing.enter_a_hs_code_25713809',
                    )}
                    error={!!errors.shippingDetails?.hsCode?.message}
                    helperText={errors.shippingDetails?.hsCode?.message}
                    {...params}
                  />
                )}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Shipping;
