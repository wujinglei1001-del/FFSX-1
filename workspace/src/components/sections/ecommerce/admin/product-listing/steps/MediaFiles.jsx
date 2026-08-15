import { useFormContext } from 'react-hook-form';
import { Paper, Stack } from '@mui/material';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import FileDropZone from 'components/base/FileDropZone';

export const mediaFilesFormSchema = yup.object({
  images: yup
    .array()
    .of(
      yup
        .object({
          id: yup
            .string()
            .required(
              i18n.t('ui.sections.ecommerce.admin.product_listing.this_field_is_required_dedbaded'),
            ),
          file: yup
            .mixed()
            .required(
              i18n.t('ui.sections.ecommerce.admin.product_listing.file_is_required_7ef4e9c0'),
            ),
        })
        .required(),
    )
    .min(
      1,
      i18n.t('ui.sections.ecommerce.admin.product_listing.upload_at_least_1_media_file_87db6674'),
    )
    .required(),
});

const MediaFiles = () => {
  const {
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useFormContext();

  const images = watch('images');

  const onDrop = (acceptedFiles) => {
    const files = acceptedFiles.map((file) => ({
      id: file.name,
      file,
    }));

    setValue('images', [...(images || []), ...files]);
    trigger('images');
  };

  const removeImage = (index) => {
    setValue(
      'images',
      images.filter((_, i) => i !== index),
    );
    trigger('images');
  };

  return (
    <Paper background={1} sx={{ p: 3, borderRadius: 6, outline: 'none' }}>
      <Stack sx={{ rowGap: 3 }}>
        <FileDropZone
          accept={{
            'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
            'video/*': ['.mp4', '.mov'],
          }}
          onDrop={onDrop}
          onRemove={removeImage}
          defaultFiles={images.map((image) => image.file)}
          error={errors.images?.message}
          previewType="thumbnail"
        />
      </Stack>
    </Paper>
  );
};

export default MediaFiles;
