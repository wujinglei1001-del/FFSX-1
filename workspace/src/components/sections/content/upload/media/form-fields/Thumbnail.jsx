import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import FileDropZone from 'components/base/FileDropZone';
import IconifyIcon from 'components/base/IconifyIcon';

const MAX_THUMBNAIL_SIZE_BYTES = 15 * 1024 * 1024; // 15MB
const ACCEPT_IMAGE_TYPES = {
  'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
};

const Thumbnail = () => {
  const { t: translateUi } = useTranslation();
  const {
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useFormContext();

  const thumbnailValue = useWatch({ name: 'thumbnail' });
  const defaultFiles = thumbnailValue?.file ? [thumbnailValue.file] : undefined;

  const onDrop = (acceptedFiles) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      setValue('thumbnail', { id: newFile.name, file: newFile }, { shouldValidate: true });
    }
  };

  const onRemove = () => {
    setValue('thumbnail', null, { shouldValidate: true });
  };

  return (
    <div>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          mb: 1,
        }}
      >
        {translateUi('ui.sections.content.upload.media.thumbnail_20f9b91f')}
      </Typography>
      <FileDropZone
        key={`thumbnail-${thumbnailValue?.file?.name || 'empty'}-${isSubmitSuccessful ? 'reset' : 'default'}`}
        accept={ACCEPT_IMAGE_TYPES}
        inlinePreview
        multiple={false}
        maxSize={MAX_THUMBNAIL_SIZE_BYTES}
        defaultFiles={defaultFiles}
        onDrop={onDrop}
        onRemove={onRemove}
        error={errors.thumbnail?.message}
        sx={{
          bgcolor: errors.thumbnail ? 'error.lighter' : 'background.elevation2',
          borderColor: errors.thumbnail ? 'error.main' : 'divider',
          height: { xs: 80, md: 60 },
        }}
      />
      <Stack
        direction="row"
        sx={{
          gap: 1,
          mt: 2,
          alignItems: 'flex-start',
        }}
      >
        <IconifyIcon
          icon="material-symbols:info-outline-rounded"
          sx={{ color: 'info.main', fontSize: 16, flexShrink: 0, transform: 'translateY(4px)' }}
        />
        <Typography
          variant="body2"
          sx={{
            color: 'info.main',
            fontWeight: 'medium',
          }}
        >
          {translateUi(
            'ui.sections.content.upload.media.images_should_be_in_jpeg_or_png_format_up_to_15mb_in_ec30bde4',
          )}
        </Typography>
      </Stack>
    </div>
  );
};

export default Thumbnail;
