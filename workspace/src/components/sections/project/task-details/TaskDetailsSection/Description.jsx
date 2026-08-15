import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { taskDetailsData } from 'data/project/task-details';
import { useTextTruncation } from 'hooks/useTextTruncation';
import Editor from 'components/base/Editor';
import IconifyIcon from 'components/base/IconifyIcon';
import DescriptionEditorToolbar from 'components/sections/project/common/DescriptionEditorToolbar';

const Description = () => {
  const { t: translateUi } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [descriptionContent, setDescriptionContent] = useState(
    () => taskDetailsData.descriptionHtml,
  );
  const [descriptionPlainText, setDescriptionPlainText] = useState(taskDetailsData.description);
  const editorRef = useRef(null);

  const { displayText, shouldTruncate, expand, collapse, isExpanded, expandText, collapseText } =
    useTextTruncation(descriptionPlainText, {
      maxLength: 288,
      expandText: 'See more',
      collapseText: 'See less',
    });

  const handleOpenEdit = () => setDialogOpen(true);

  const handleCloseDialog = () => setDialogOpen(false);

  const handleSave = () => {
    const editor = editorRef.current?.editor;
    if (editor) {
      const plainText = editor.state.doc.textContent || taskDetailsData.description;
      setDescriptionPlainText(plainText.trim() || taskDetailsData.description);
      setDescriptionContent(editor.isEmpty ? '' : editor.getHTML());
    }
    handleCloseDialog();
  };

  return (
    <>
      <Paper sx={{ overflow: 'hidden', p: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
            }}
          >
            {translateUi(
              'ui.sections.project.task_details.taskdetailssection.description_55f8ebc8',
            )}
          </Typography>
          <IconButton
            size="small"
            onClick={handleOpenEdit}
            aria-label={translateUi(
              'ui.sections.project.task_details.taskdetailssection.edit_description_2ebe5b37',
            )}
            sx={{ color: 'text.secondary' }}
          >
            <IconifyIcon icon="material-symbols:edit-outline-rounded" fontSize={20} />
          </IconButton>
        </Box>
        <Stack>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: shouldTruncate ? 1.5 : 0,
            }}
          >
            {displayText}
          </Typography>
          {shouldTruncate && (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Button
                variant="text"
                color="primary"
                disableRipple
                fullWidth
                onClick={isExpanded ? collapse : expand}
                sx={{
                  '&:hover': {
                    bgcolor: 'transparent !important',
                    textDecoration: 'underline',
                  },
                  minWidth: 0,
                }}
              >
                {isExpanded ? collapseText : expandText}
              </Button>
            </Box>
          )}
        </Stack>
      </Paper>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: { m: { xs: 2, sm: 4 }, width: { xs: '100%', sm: 'auto' } },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          {translateUi('ui.sections.project.task_details.taskdetailssection.description_55f8ebc8')}
        </DialogTitle>
        <DialogContent>
          <Editor
            ref={editorRef}
            content={descriptionContent}
            placeholder={translateUi(
              'ui.sections.project.task_details.taskdetailssection.add_a_description_for_your_task_039d61af',
            )}
            renderControls={() => <DescriptionEditorToolbar />}
            sx={{
              '& .MuiTiptap-RichTextContent-root .tiptap': {
                minHeight: 200,
                maxHeight: 320,
                color: 'text.secondary',
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="outlined" color="neutral" onClick={handleCloseDialog}>
            {translateUi('ui.sections.project.task_details.taskdetailssection.cancel_77dfd213')}
          </Button>
          <Button variant="contained" onClick={handleSave}>
            {translateUi('ui.sections.project.task_details.taskdetailssection.save_efc007a3')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Description;
