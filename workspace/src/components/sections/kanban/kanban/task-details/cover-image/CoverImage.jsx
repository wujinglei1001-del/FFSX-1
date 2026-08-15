import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { convertFileToAttachment } from 'lib/utils';
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';
import CoverImageMenu from './CoverImageMenu';

const CoverImage = () => {
  const { t: translateUi } = useTranslation();
  const { setValue, watch } = useFormContext();
  const [preview, setPreview] = useState(null);

  const coverImage = watch('coverImage');

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const newFile = acceptedFiles[0];
      if (newFile) {
        setValue('coverImage', newFile);
        setPreview(convertFileToAttachment(newFile));
      }
    },
  });

  const handleRemoveFile = () => {
    setValue('coverImage', null);
    setPreview(null);
  };

  return (
    <Paper
      {...getRootProps()}
      sx={{
        display: 'flex',
        width: 1,
        minHeight: 260,
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      <input {...getInputProps()} />
      {preview || coverImage ? (
        <Box sx={{ position: 'relative', width: 1, height: 1 }}>
          <Image
            src={preview ? preview.preview : coverImage}
            sx={{ height: 1, width: 1, objectFit: 'cover' }}
          />
          <CoverImageMenu
            sx={{ position: 'absolute', top: 8, right: 8 }}
            handleRemoveFile={handleRemoveFile}
          />
        </Box>
      ) : (
        <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <IconifyIcon
            icon="material-symbols:add-photo-alternate-outline-rounded"
            sx={{
              fontSize: 50,
              color: 'text.disabled',
            }}
          />
          <Typography variant="subtitle2" sx={{ mt: 1, color: 'primary.main', fontWeight: 500 }}>
            {translateUi('ui.sections.kanban.kanban.task_details.add_cover_image_3f919377')}
          </Typography>
        </Stack>
      )}
    </Paper>
  );
};

export default CoverImage;
