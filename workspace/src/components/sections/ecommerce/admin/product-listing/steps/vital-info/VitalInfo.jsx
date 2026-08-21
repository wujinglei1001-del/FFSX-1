import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import paths from 'routes/paths';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import Category from './CategorySelect';

export const vitalInfoFormSchema = yup
  .object({
    vitalInfo: yup.object({
      productId: yup
        .string()
        .required(
          i18n.t('ui.sections.ecommerce.admin.product_listing.this_field_is_required_dedbaded'),
        ),
      productIdType: yup
        .string()
        .required(
          i18n.t('ui.sections.ecommerce.admin.product_listing.this_field_is_required_dedbaded'),
        ),
      category: yup
        .string()
        .required(
          i18n.t('ui.sections.ecommerce.admin.product_listing.this_field_is_required_dedbaded'),
        ),
      title: yup
        .string()
        .required(
          i18n.t('ui.sections.ecommerce.admin.product_listing.this_field_is_required_dedbaded'),
        ),
      brand: yup
        .string()
        .required(
          i18n.t('ui.sections.ecommerce.admin.product_listing.this_field_is_required_dedbaded'),
        ),
      manufacturer: yup
        .string()
        .required(
          i18n.t('ui.sections.ecommerce.admin.product_listing.this_field_is_required_dedbaded'),
        ),
      mfrNumber: yup
        .string()
        .required(
          i18n.t('ui.sections.ecommerce.admin.product_listing.this_field_is_required_dedbaded'),
        ),
    }),
  })
  .required();

const VitalInfo = () => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <Grid container spacing={2}>
      <Grid
        size={{
          xs: 12,
          sm: 6,
        }}
      >
        <TextField
          fullWidth
          id="productId"
          type="text"
          label={translateUi('ui.sections.ecommerce.admin.product_listing.product_id_ea9c55c5')}
          variant="filled"
          error={!!errors.vitalInfo?.productId}
          helperText={errors.vitalInfo?.productId?.message}
          {...register('vitalInfo.productId')}
        />
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 6,
        }}
      >
        <FormControl variant="filled" fullWidth error={!!errors.vitalInfo?.productIdType}>
          <InputLabel id="productID-type-label">
            {translateUi('ui.sections.ecommerce.admin.product_listing.product_id_type_11c30276')}
          </InputLabel>

          <Controller
            name="vitalInfo.productIdType"
            control={control}
            defaultValue="upc"
            render={({ field }) => (
              <Select
                labelId="productID-type-label"
                label={translateUi(
                  'ui.sections.ecommerce.admin.product_listing.product_id_type_11c30276',
                )}
                {...field}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="upc">UPC</MenuItem>
                <MenuItem value="ean">EAN</MenuItem>
                <MenuItem value="gcid">GCID</MenuItem>
              </Select>
            )}
          />

          <FormHelperText>{errors.vitalInfo?.productIdType?.message}</FormHelperText>
        </FormControl>
      </Grid>
      <Grid size={12}>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 1,
          }}
        >
          {translateUi(
            'ui.sections.ecommerce.admin.product_listing.to_list_your_products_you_require_a_unique_identifie_f1281f24',
          )}{' '}
          <Link
            href={paths.landingFaq}
            sx={{
              fontWeight: 700,
            }}
          >
            {translateUi('ui.sections.ecommerce.admin.product_listing.learn_more_824d76b1')}
          </Link>
        </Typography>
      </Grid>
      <Grid size={12}>
        <Category />
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          id="title"
          type="text"
          label={translateUi('ui.sections.ecommerce.admin.product_listing.title_768e0c1c')}
          variant="filled"
          error={!!errors.vitalInfo?.title}
          helperText={errors.vitalInfo?.title?.message}
          {...register('vitalInfo.title')}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          id="brand"
          type="text"
          label={translateUi('ui.sections.ecommerce.admin.product_listing.brand_62b4aa57')}
          variant="filled"
          error={!!errors.vitalInfo?.brand}
          helperText={errors.vitalInfo?.brand?.message}
          {...register('vitalInfo.brand')}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          id="manufacturer"
          type="text"
          label={translateUi('ui.sections.ecommerce.admin.product_listing.manufacturer_7adfcd13')}
          variant="filled"
          error={!!errors.vitalInfo?.manufacturer}
          helperText={errors.vitalInfo?.manufacturer?.message}
          {...register('vitalInfo.manufacturer')}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          id="mfrNumber"
          type="text"
          label={translateUi(
            'ui.sections.ecommerce.admin.product_listing.mfr_part_number_cfa9980b',
          )}
          variant="filled"
          error={!!errors.vitalInfo?.mfrNumber}
          helperText={errors.vitalInfo?.mfrNumber?.message}
          {...register('vitalInfo.mfrNumber')}
        />
      </Grid>
    </Grid>
  );
};

export default VitalInfo;
