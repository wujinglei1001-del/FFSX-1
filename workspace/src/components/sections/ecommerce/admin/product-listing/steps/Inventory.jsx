import { useEffect } from 'react';
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import i18n from 'locales/i18n';
import * as yup from 'yup';

export const productInventoryFormSchema = yup.object({
  inventories: yup
    .array()
    .of(
      yup
        .object({
          variant: yup
            .string()
            .required(
              i18n.t('ui.sections.ecommerce.admin.product_listing.this_field_is_required_dedbaded'),
            ),
          sku: yup
            .string()
            .required(
              i18n.t('ui.sections.ecommerce.admin.product_listing.this_field_is_required_dedbaded'),
            ),
          barcode: yup
            .string()
            .required(
              i18n.t('ui.sections.ecommerce.admin.product_listing.this_field_is_required_dedbaded'),
            ),
        })
        .required(),
    )
    .required(),
  inventoryDetails: yup
    .object({
      trackQuantity: yup.boolean(),
      sellOnStockOut: yup.boolean(),
    })
    .required(),
});

const Inventory = () => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();
  console.log({ errors });

  const { fields, replace } = useFieldArray({
    control,
    name: 'inventories',
  });

  const combinedVariants = useWatch({
    control,
    name: 'combinedVariants',
  });

  useEffect(() => {
    if (combinedVariants && !!combinedVariants.length) {
      const currentFields = combinedVariants.map((variant) => {
        const field = fields.find((field) => field.variant === variant);

        return field
          ? field
          : {
              variant,
              sku: '',
              barcode: '',
            };
      });

      replace(currentFields);
    }
  }, [combinedVariants]);

  return (
    <Grid container rowSpacing={5} columnSpacing={1}>
      <Grid size={12}>
        <TableContainer>
          <Table
            sx={{ minWidth: 720 }}
            aria-label={translateUi(
              'ui.sections.ecommerce.admin.product_listing.pricing_table_dc8d8859',
            )}
          >
            <TableHead>
              <TableRow
                sx={{
                  '& th': {
                    whiteSpace: 'nowrap',
                  },
                }}
              >
                <TableCell sx={{ width: '30%' }}>
                  {translateUi('ui.sections.ecommerce.admin.product_listing.variant_cc91b1ea')}
                </TableCell>
                <TableCell sx={{ width: '35%' }}>
                  {translateUi(
                    'ui.sections.ecommerce.admin.product_listing.sku_stock_keeping_unit_7f384026',
                  )}
                </TableCell>
                <TableCell sx={{ width: '35%' }}>
                  {translateUi(
                    'ui.sections.ecommerce.admin.product_listing.barcode_isbn_upc_gtin_etc_2518a1ee',
                  )}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                '& tr:last-of-type td': { border: 'none' },
              }}
            >
              {fields.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell>{field.variant}</TableCell>
                  <TableCell>
                    <TextField
                      label={translateUi(
                        'ui.sections.ecommerce.admin.product_listing.sku_stock_keeping_unit_7f384026',
                      )}
                      type="text"
                      fullWidth
                      error={!!errors.inventories?.[index]?.sku?.message}
                      helperText={errors.inventories?.[index]?.sku?.message}
                      {...register(`inventories.${index}.sku`)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      label={translateUi(
                        'ui.sections.ecommerce.admin.product_listing.barcode_isbn_upc_gtin_etc_2518a1ee',
                      )}
                      type="text"
                      error={!!errors.inventories?.[index]?.barcode?.message}
                      helperText={errors.inventories?.[index]?.barcode?.message}
                      {...register(`inventories.${index}.barcode`)}
                      sx={{ px: 0.125 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid size={12}>
        <FormControl component="fieldset" variant="filled" sx={{ display: 'block' }}>
          <FormControlLabel
            control={
              <Controller
                name="invertoryDetails.trackQuantity"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} checked={field.value} />}
              />
            }
            label={translateUi(
              'ui.sections.ecommerce.admin.product_listing.track_quantity_8b8f12a0',
            )}
          />
        </FormControl>

        <FormControl component="fieldset" variant="filled">
          <FormControlLabel
            control={
              <Controller
                name="invertoryDetails.sellOnStockOut"
                control={control}
                defaultValue={false}
                render={({ field }) => <Checkbox {...field} checked={field.value} />}
              />
            }
            label={translateUi(
              'ui.sections.ecommerce.admin.product_listing.continue_selling_when_out_of_stock_0a6b5da3',
            )}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Inventory;
