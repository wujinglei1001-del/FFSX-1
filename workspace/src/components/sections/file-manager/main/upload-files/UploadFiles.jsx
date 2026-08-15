import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  dialogClasses,
} from '@mui/material';
import FileDropZone from 'components/base/FileDropZone';
import IconifyIcon from 'components/base/IconifyIcon';

const UploadFiles = () => {
  const { t: translateUi } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);

  const handleDiscard = () => handleDialogClose();

  return (
    <>
      <Button
        variant="text"
        color="neutral"
        sx={{ p: 1, flexShrink: 0, ml: 'auto' }}
        startIcon={
          <IconifyIcon icon="material-symbols:upload-rounded" sx={{ height: 20, width: 20 }} />
        }
        onClick={handleDialogOpen}
      >
        {translateUi('ui.sections.file_manager.main.upload_files.upload_8bdf057f')}
      </Button>

      <Dialog
        id="upload-files-dialog"
        scroll="paper"
        open={isDialogOpen}
        onClose={handleDialogClose}
        sx={{
          [`& .${dialogClasses.paper}`]: {
            maxWidth: 500,
            width: 1,
            bgcolor: 'background.default',
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
          {translateUi('ui.sections.file_manager.main.upload_files.upload_files_41aca16f')}
          <IconButton onClick={handleDialogClose}>
            <IconifyIcon
              icon="material-symbols:close-rounded"
              sx={{ fontSize: 20, color: 'neutral.dark' }}
            />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pb: 0 }}>
          <DialogContentText sx={{ mb: 3 }}>
            {translateUi(
              'ui.sections.file_manager.main.upload_files.securely_upload_manage_and_organize_your_files_with__7ed25fab',
            )}
          </DialogContentText>

          <FileDropZone
            multiple
            sx={{
              height: 140,
            }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button variant="soft" color="neutral" sx={{ px: 3 }} onClick={handleDiscard}>
            {translateUi('ui.sections.file_manager.main.upload_files.discard_36fff63c')}
          </Button>
          <Button variant="contained" color="primary" sx={{ px: 3 }} onClick={handleDialogClose}>
            {translateUi('ui.sections.file_manager.main.upload_files.done_e9b450d1')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UploadFiles;
