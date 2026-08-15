import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import IconifyIcon from 'components/base/IconifyIcon';
import ColorPicker from 'components/base/color-picker/ColorPicker';
import ImagesDialog from './ImagesDialog';

const OptionValueField = (props) => {
  const { t: translateUi } = useTranslation();
  const { itemsFiledArray, variantIndex, valueIndex, id } = props;

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const { fields, remove, update } = itemsFiledArray;

  const [openImagesDialog, setOpenImagesDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const variants = watch('variants') || [];
  const images = watch('images');

  const handleImagesDialogOpen = () => setOpenImagesDialog(true);
  const handleImagesDialogClose = () => setOpenImagesDialog(false);

  const handleUpdateImages = (images) => {
    update(valueIndex, { ...fields[valueIndex], images });
  };

  return (
    <Stack
      direction="row"
      sx={{
        mb: 1,
        gap: 1,
        alignItems: { sm: 'center' },
      }}
    >
      <Button
        variant="text"
        color="neutral"
        shape="square"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        sx={{ cursor: 'grab', transform: CSS.Transform.toString(transform), transition }}
      >
        <IconifyIcon icon="material-symbols:drag-indicator" fontSize={20} />
      </Button>

      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          gap: 1,
          flex: 1,
          transform: CSS.Transform.toString(transform),
          transition,
          flexWrap: 'wrap',
        }}
      >
        {variants?.[variantIndex]?.name === 'color' && (
          <Controller
            name={`variants.${variantIndex}.items.${valueIndex}.color`}
            render={({ field }) => (
              <ColorPicker
                value={field.value || '#000000'}
                onChange={(color) => field.onChange(color)}
                id={`variant-color-picker-${variantIndex}-${valueIndex}`}
              />
            )}
          />
        )}
        <TextField
          label={translateUi('ui.sections.ecommerce.admin.product_listing.value_8dce170d')}
          type="text"
          {...register(`variants.${variantIndex}.items.${valueIndex}.value`, {
            required: 'This field is required',
          })}
          error={!!errors?.variants?.[variantIndex]?.items?.[valueIndex]?.value}
          helperText={errors?.variants?.[variantIndex]?.items?.[valueIndex]?.value?.message || ''}
          sx={{ flex: { xs: '0 0 100%', sm: 1 }, order: { xs: 1, sm: 0 } }}
        />
        <Typography
          variant="body2"
          sx={{
            color: 'text.disabled',
            display: { xs: 'none', md: 'block' },
          }}
        >
          {variants?.[variantIndex]?.items?.[valueIndex]?.images?.length ?? 0}
          {translateUi('ui.sections.ecommerce.admin.product_listing.images_linked_a4b79f87')}
        </Typography>
        <IconButton
          onClick={() => {
            if (images.length) handleImagesDialogOpen();
            else
              enqueueSnackbar('Upload images first to attach with variant.', {
                variant: 'info',
                autoHideDuration: 3000,
              });
          }}
        >
          <IconifyIcon icon="material-symbols:link-rounded" color="text.primary" fontSize={20} />
        </IconButton>
        {openImagesDialog && (
          <ImagesDialog
            open={openImagesDialog}
            handleClose={handleImagesDialogClose}
            handleUpdateImages={handleUpdateImages}
            field={fields[valueIndex]}
          />
        )}

        <IconButton
          color="error"
          onClick={() => remove(valueIndex)}
          disabled={variants[variantIndex].items?.length === 1}
          sx={{ ml: 'auto' }}
        >
          <IconifyIcon icon="material-symbols:close-rounded" fontSize={20} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default OptionValueField;
