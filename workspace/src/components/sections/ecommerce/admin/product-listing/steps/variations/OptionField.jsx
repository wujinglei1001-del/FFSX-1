import { useCallback } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import SortableDnd from 'components/base/SortableDnd';
import ValueItem from './OptionValueField';

const OptionField = ({ id, variantIndex, variantsFieldArray }) => {
  const { t: translateUi } = useTranslation();
  const { down } = useBreakpoints();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const {
    formState: { errors },
    control,
    watch,
  } = useFormContext();

  const variants = watch('variants') ?? [];

  const { remove } = variantsFieldArray;

  const itemsFiledArray = useFieldArray({
    control,
    name: `variants.${variantIndex}.items`,
  });

  const { fields: itemFields, append, move } = itemsFiledArray;

  const canRemoveOption = variants.length > 1;

  const downSm = down('sm');

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;

      if (over) {
        if (active.id !== over.id) {
          const oldIndex = itemFields.findIndex((variant) => variant.id === active.id);
          const newIndex = itemFields.findIndex((variant) => variant.id === over.id);
          move(oldIndex, newIndex);
        }
      }
    },
    [itemFields, move],
  );
  const draggingStyle = isDragging
    ? {
        opacity: 0.4,
      }
    : {};

  return (
    <Stack
      ref={setNodeRef}
      direction="row"
      sx={{
        gap: 2,
        transform: CSS.Translate.toString(transform),
        transition,
        mb: { xs: 3, sm: 4 },
        pb: { xs: 3, sm: 0 },
        borderBottom: { xs: '1px solid', sm: 'none' },
        borderColor: (theme) => `${theme.vars.palette.divider} !important`,
        ...draggingStyle,
      }}
    >
      {!downSm && (
        <Button
          variant="text"
          color="neutral"
          shape="square"
          {...attributes}
          {...listeners}
          sx={{ cursor: 'grab' }}
        >
          <IconifyIcon icon="material-symbols:drag-indicator" fontSize={20} />
        </Button>
      )}
      <Stack
        sx={{
          gap: 3,
          flex: 1,
        }}
      >
        <div>
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1,
              gap: 1,
            }}
          >
            {downSm && (
              <Button
                variant="text"
                color="neutral"
                shape="square"
                {...attributes}
                {...listeners}
                sx={{ cursor: 'grab' }}
              >
                <IconifyIcon icon="material-symbols:drag-indicator" fontSize={20} />
              </Button>
            )}

            <Typography
              variant="subtitle1"
              sx={{
                flex: 1,
              }}
            >
              {translateUi('ui.sections.ecommerce.admin.product_listing.option_e31d9722')}
              {variantIndex + 1}
            </Typography>

            <IconButton
              color="error"
              disabled={!canRemoveOption}
              onClick={() => remove(variantIndex)}
            >
              <IconifyIcon icon="material-symbols:delete-outline-rounded" fontSize={20} />
            </IconButton>
          </Stack>

          <FormControl variant="filled" fullWidth error={!!errors.variants?.[variantIndex]?.type}>
            <InputLabel id="variants-type-label">
              {translateUi('ui.sections.ecommerce.admin.product_listing.select_variant_3785e871')}
            </InputLabel>

            <Controller
              name={`variants.${variantIndex}.name`}
              control={control}
              render={({ field: { onChange, ...rest } }) => (
                <Select
                  labelId="variants-type-label"
                  label={translateUi(
                    'ui.sections.ecommerce.admin.product_listing.variants_type_91988971',
                  )}
                  displayEmpty
                  onChange={(e) => {
                    onChange(e);
                    itemsFiledArray.replace([
                      {
                        color: e.target.value === 'color' ? '' : undefined,
                        value: '',
                        images: [],
                      },
                    ]);
                  }}
                  {...rest}
                >
                  <MenuItem value="color">
                    {translateUi('ui.sections.ecommerce.admin.product_listing.color_1d0c8304')}
                  </MenuItem>
                  <MenuItem value="fabric">
                    {translateUi(
                      'ui.sections.ecommerce.admin.product_listing.fabric_material_c4a8b08b',
                    )}
                  </MenuItem>
                  <MenuItem value="size">
                    {translateUi('ui.sections.ecommerce.admin.product_listing.size_b7152342')}
                  </MenuItem>
                </Select>
              )}
            />

            <FormHelperText>{errors.variants?.[variantIndex]?.name?.message}</FormHelperText>
          </FormControl>
        </div>

        {variants[variantIndex].name && (
          <div>
            <Typography
              variant="subtitle1"
              sx={{
                mb: 2,
              }}
            >
              {translateUi('ui.sections.ecommerce.admin.product_listing.values_b1564f6b')}
            </Typography>

            <Stack sx={{ rowGap: 1 }}>
              <SortableDnd items={itemFields} onDragEnd={handleDragEnd}>
                {itemFields.map((item, valueIndex) => {
                  return (
                    <ValueItem
                      itemsFiledArray={itemsFiledArray}
                      key={item.id}
                      id={item.id}
                      valueIndex={valueIndex}
                      variantIndex={variantIndex}
                    />
                  );
                })}
              </SortableDnd>
              <Button
                variant="text"
                color="neutral"
                sx={{ alignSelf: 'flex-start' }}
                startIcon={
                  <IconifyIcon icon="material-symbols:add-rounded" fontSize="20px !important" />
                }
                onClick={() => append({ color: '', value: '', images: [] })}
              >
                {translateUi(
                  'ui.sections.ecommerce.admin.product_listing.add_another_value_368b6797',
                )}
              </Button>
            </Stack>
          </div>
        )}
      </Stack>
    </Stack>
  );
};

export default OptionField;
