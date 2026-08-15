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
import IconifyIcon from 'components/base/IconifyIcon';

const AccountDialog = (props) => {
  const { t: translateUi } = useTranslation();
  const { title, subtitle, children, sx, open, handleDialogClose, handleConfirm, handleDiscard } =
    props;

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      scroll="body"
      maxWidth={false}
      sx={{
        [`& .${dialogClasses.paper}`]: {
          borderRadius: 6,
          overflow: 'visible',
          maxWidth: 463,
          ...sx,
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
        {title}
        <IconButton onClick={handleDialogClose}>
          <IconifyIcon icon="material-symbols:close" sx={{ fontSize: 20, color: 'neutral.dark' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        {subtitle && (
          <DialogContentText variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            {subtitle}
          </DialogContentText>
        )}
        {children}
      </DialogContent>
      <DialogActions
        sx={{
          p: 3,
        }}
      >
        <Button variant="soft" color="neutral" onClick={handleDiscard}>
          {translateUi('ui.sections.account.common.accountdialog.discard_36fff63c')}
        </Button>
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          {translateUi('ui.sections.account.common.accountdialog.confirm_04a21221')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountDialog;
