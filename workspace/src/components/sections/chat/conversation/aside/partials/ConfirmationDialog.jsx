import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const ConfirmationDialog = ({ isOpen, handleConfirmation }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Dialog maxWidth="xs" open={isOpen} onClose={handleConfirmation.close}>
      <DialogTitle sx={{ pt: 3 }}>
        {translateUi('ui.sections.chat.conversation.aside.delete_conversation_81f08f28')}
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        <DialogContentText>
          {translateUi(
            'ui.sections.chat.conversation.aside.are_you_sure_you_want_to_delete_this_conversation_th_18e52f5a',
          )}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ pb: 3, px: 3, pt: 0 }}>
        <Button variant="soft" color="neutral" onClick={handleConfirmation.close}>
          {translateUi('ui.sections.chat.conversation.aside.cancel_77dfd213')}
        </Button>
        <Button variant="contained" onClick={handleConfirmation.confirm} color="error" autoFocus>
          {translateUi('ui.sections.chat.conversation.aside.delete_f6fdbe48')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
