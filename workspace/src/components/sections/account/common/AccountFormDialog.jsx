import { useFormContext } from 'react-hook-form';
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

const AccountFormDialog = (props) => {
  const { t: translateUi } = useTranslation();
  const {
    open,
    handleDialogClose,
    title,
    subtitle,
    onSubmit,
    handleDiscard,
    handleRemove,
    children,
    sx,
  } = props;

  const { handleSubmit, reset } = useFormContext();

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      maxWidth={false}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        [`& .${dialogClasses.paper}`]: {
          borderRadius: 6,
          overflow: 'visible',
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
      <DialogContent sx={{ pb: 3 }}>
        {subtitle && (
          <DialogContentText
            variant="body2"
            sx={{ color: 'text.secondary', mb: 2, textWrap: 'pretty' }}
          >
            {subtitle}
          </DialogContentText>
        )}
        {children}
      </DialogContent>
      <DialogActions
        sx={{
          p: 3,
          pt: 0,
          justifyContent: 'flex-start',
        }}
      >
        {handleRemove && (
          <Button color="error" onClick={handleRemove}>
            {translateUi('ui.sections.account.common.accountformdialog.remove_e963907d')}
          </Button>
        )}
        <Button
          variant="soft"
          color="neutral"
          onClick={() => {
            if (handleDiscard) {
              handleDiscard();

              return;
            }
            handleDialogClose();
            reset();
          }}
          sx={{ ml: 'auto !important' }}
        >
          {translateUi('ui.sections.account.common.accountformdialog.discard_36fff63c')}
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {translateUi('ui.sections.account.common.accountformdialog.confirm_04a21221')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountFormDialog;
