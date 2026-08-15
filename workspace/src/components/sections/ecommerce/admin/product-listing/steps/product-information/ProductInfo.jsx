import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import OptionalInfo from './OptionalInfo';
import ProductDimensionInput from './ProductDimensionInput';

export const productInfoFormSchema = yup
  .object({
    productInformation: yup
      .object({
        length: yup.object({
          value: yup
            .number()
            .positive('Value must be a positive number')
            .required(
              i18n.t('ui.sections.ecommerce.admin.product_listing.value_is_required_30b22827'),
            ),
          unit: yup
            .string()
            .required(
              i18n.t('ui.sections.ecommerce.admin.product_listing.unit_is_required_c7db62de'),
            ),
        }),
        width: yup.object({
          value: yup
            .number()
            .positive('Value must be a positive number')
            .required(
              i18n.t('ui.sections.ecommerce.admin.product_listing.value_is_required_30b22827'),
            ),
          unit: yup
            .string()
            .required(
              i18n.t('ui.sections.ecommerce.admin.product_listing.unit_is_required_c7db62de'),
            ),
        }),
        height: yup.object({
          value: yup
            .number()
            .positive('Value must be a positive number')
            .required(
              i18n.t('ui.sections.ecommerce.admin.product_listing.value_is_required_30b22827'),
            ),
          unit: yup
            .string()
            .required(
              i18n.t('ui.sections.ecommerce.admin.product_listing.unit_is_required_c7db62de'),
            ),
        }),
        specifications: yup.array().of(
          yup.object({
            label: yup
              .string()
              .required(
                i18n.t('ui.sections.ecommerce.admin.product_listing.value_is_required_30b22827'),
              ),
            value: yup
              .string()
              .required(
                i18n.t('ui.sections.ecommerce.admin.product_listing.value_is_required_30b22827'),
              ),
          }),
        ),
      })
      .required(),
  })
  .required();

const ProductInfo = () => {
  const { t: translateUi } = useTranslation();
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          mb: 5,
        }}
      >
        <Grid size={12}>
          <Typography variant="subtitle2">
            {translateUi('ui.sections.ecommerce.admin.product_listing.required_eed6bfb4')}
            <Box
              component="span"
              sx={{
                color: 'error.main',
              }}
            >
              *
            </Box>
          </Typography>
        </Grid>

        <Grid size={12}>
          <ProductDimensionInput
            field="length"
            label={translateUi('ui.sections.ecommerce.admin.product_listing.length_3bade34e')}
          />
        </Grid>

        <Grid size={12}>
          <ProductDimensionInput
            field="width"
            label={translateUi('ui.sections.ecommerce.admin.product_listing.width_a58ddf50')}
          />
        </Grid>

        <Grid size={12}>
          <ProductDimensionInput
            field="height"
            label={translateUi('ui.sections.ecommerce.admin.product_listing.height_3f608b49')}
          />
        </Grid>
      </Grid>
      <OptionalInfo />
    </>
  );
};

export default ProductInfo;
