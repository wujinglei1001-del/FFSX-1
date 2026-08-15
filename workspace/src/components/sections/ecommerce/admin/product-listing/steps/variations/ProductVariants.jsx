import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import VariantsList from './VariantsList';

export const productVariantSchema = yup.object({
  variants: yup
    .array()
    .of(
      yup.object({
        items: yup
          .array()
          .of(
            yup.object({
              name: yup.string().optional(),
              value: yup
                .string()
                .required(
                  i18n.t('ui.sections.ecommerce.admin.product_listing.value_is_required_30b22827'),
                ),
              images: yup.array().of(yup.mixed()).optional(),
            }),
          )
          .required(),
      }),
    )
    .required(),
});

const ProductVariants = () => {
  const { t: translateUi } = useTranslation();
  const { control } = useFormContext();

  const variantsFieldArray = useFieldArray({
    control,
    name: 'variants',
  });
  const { fields: variants, append, replace } = variantsFieldArray;

  const handleVariantsChange = (e) => {
    if (e.target.value === 'hasVariants') {
      append({
        name: '',
        items: [],
      });
    } else {
      replace([]);
    }
  };

  return (
    <Stack sx={{ rowGap: 5 }}>
      <RadioGroup
        onChange={handleVariantsChange}
        value={variants?.length ? 'hasVariants' : 'noVariants'}
      >
        <FormControlLabel
          value="noVariants"
          control={<Radio />}
          label={translateUi(
            'ui.sections.ecommerce.admin.product_listing.this_product_does_not_have_variants_77cf1b60',
          )}
        />
        <FormControlLabel
          value="hasVariants"
          control={<Radio />}
          label={translateUi(
            'ui.sections.ecommerce.admin.product_listing.this_product_has_variants_like_size_or_color_f9004450',
          )}
        />
      </RadioGroup>

      {!!variants?.length && <VariantsList variantsFieldArray={variantsFieldArray} />}
    </Stack>
  );
};

export default ProductVariants;
