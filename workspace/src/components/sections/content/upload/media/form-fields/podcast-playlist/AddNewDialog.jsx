import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
  IconButton,
  Stack,
  Typography,
  dialogClasses,
} from '@mui/material';
import Editor from 'components/base/Editor';
import FileDropZone from 'components/base/FileDropZone';
import IconifyIcon from 'components/base/IconifyIcon';
import StyledTextField from 'components/styled/StyledTextField';

const ACCEPT_IMAGE_TYPES = { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] };
const MAX_THUMBNAIL_SIZE_BYTES = 15 * 1024 * 1024; // 15MB

const AddNewDialog = () => {
  const { t: translateUi } = useTranslation();
  const [open, setOpen] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [description, setDescription] = useState('');

  const handleDialog = (value) => setOpen(value ? value : !open);

  const handleDialogClose = () => {
    setThumbnailFile(null);
    setDescription('');
    handleDialog(false);
  };

  const onDrop = (acceptedFiles) => {
    const newFile = acceptedFiles[0];
    if (newFile) setThumbnailFile(newFile);
  };

  const onRemove = () => setThumbnailFile(null);

  return (
    <>
      <Button
        color="primary"
        startIcon={<IconifyIcon icon="material-symbols:add-2-rounded" />}
        onClick={() => handleDialog()}
      >
        {translateUi('ui.sections.content.upload.media.add_new_07c4aaf0')}
      </Button>

      <Dialog
        open={open}
        onClose={handleDialogClose}
        maxWidth={false}
        component="form"
        sx={{
          [`& .${dialogClasses.paper}`]: {
            borderRadius: 6,
            overflow: 'visible',
            maxWidth: 550,
          },
        }}
      >
        <DialogTitle
          component="h6"
          sx={{
            pt: 3,
            pb: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {translateUi('ui.sections.content.upload.media.create_a_podcast_playlist_28f05d32')}
          <IconButton onClick={() => handleDialog(false)}>
            <IconifyIcon
              icon="material-symbols:close"
              sx={{ fontSize: 20, color: 'neutral.dark' }}
            />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pb: 0, position: 'relative' }}>
          <DialogContentText
            variant="body2"
            sx={{ color: 'text.secondary', mb: 2, textWrap: 'pretty' }}
          >
            {translateUi(
              'ui.sections.content.upload.media.enter_your_playlist_title_thumbnail_and_descriptions_73411c9c',
            )}
          </DialogContentText>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
              {translateUi('ui.sections.content.upload.media.title_768e0c1c')}
            </Typography>
            <StyledTextField
              type="text"
              fullWidth
              variant="filled"
              size="large"
              placeholder={translateUi('ui.sections.content.upload.media.title_768e0c1c')}
              name="title"
              sx={{ mb: 0.5 }}
              slotProps={{
                input: {
                  sx: {
                    '& .MuiInputBase-input': {
                      color: 'text.secondary',
                      padding: '3px 16px !important',
                    },
                  },
                  inputProps: { maxLength: 30 },
                },
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
              {translateUi('ui.sections.content.upload.media.thumbnail_20f9b91f')}
            </Typography>

            <FileDropZone
              accept={ACCEPT_IMAGE_TYPES}
              multiple={false}
              maxSize={MAX_THUMBNAIL_SIZE_BYTES}
              previewType="thumbnail"
              defaultFiles={thumbnailFile ? [thumbnailFile] : undefined}
              onDrop={onDrop}
              onRemove={onRemove}
              sx={{
                bgcolor: 'background.elevation2',
                borderColor: 'divider',
                height: { xs: 80, md: 60 },
              }}
            />

            <Stack direction="row" sx={{ gap: 1, mt: 2, alignItems: 'flex-start' }}>
              <IconifyIcon
                icon="material-symbols:info-outline-rounded"
                sx={{ color: 'info.main', fontSize: 16, flexShrink: 0, mt: 0.5 }}
              />
              <Typography
                variant="body2"
                color="info"
                sx={{
                  fontWeight: 'medium',
                }}
              >
                {translateUi(
                  'ui.sections.content.upload.media.images_should_be_in_jpeg_or_png_format_up_to_15mb_in_27c465d7',
                )}
              </Typography>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
              {translateUi('ui.sections.content.upload.media.description_55f8ebc8')}
            </Typography>
            <Editor
              onChange={(value) => setDescription(value)}
              sx={{
                '& .MuiTiptap-RichTextContent-root': {
                  height: 1,
                  minHeight: 155,
                },
              }}
            />
            <FormHelperText
              sx={{
                textAlign: 'end',
                fontWeight: 'medium',
                color: 'text.secondary',
              }}
            >
              <Box
                component="span"
                sx={{
                  color: description.length > 2000 ? 'error.main' : 'text.secondary',
                }}
              >
                {description.length}
              </Box>
              /2000
            </FormHelperText>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, justifyContent: 'flex-start' }}>
          <Button color="error" onClick={handleDialogClose}>
            {translateUi('ui.sections.content.upload.media.remove_e963907d')}
          </Button>
          <Stack direction="row" sx={{ gap: 1, justifyContent: 'flex-end', width: 1 }}>
            <Button
              variant="soft"
              color="neutral"
              onClick={handleDialogClose}
              sx={{ ml: 'auto !important' }}
            >
              {translateUi('ui.sections.content.upload.media.discard_36fff63c')}
            </Button>
            <Button type="button" variant="contained" color="primary" onClick={handleDialogClose}>
              {translateUi('ui.sections.content.upload.media.confirm_04a21221')}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNewDialog;
