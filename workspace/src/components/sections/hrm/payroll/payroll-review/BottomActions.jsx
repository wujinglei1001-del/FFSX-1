import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { useSnackbar } from 'notistack';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';

const BottomActions = () => {
  const { t: translateUi } = useTranslation();
  const { down } = useBreakpoints();
  const [open, setOpen] = useState(false);

  const downSm = down('sm');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      sx={{
        gap: 2,
        justifyContent: { sm: 'flex-end' },
      }}
    >
      <Stack
        direction="row"
        sx={{
          gap: 2,
          ml: { xs: 0, sm: 'auto' },
        }}
      >
        <Button
          fullWidth={downSm}
          color="neutral"
          sx={{ textWrap: 'nowrap', flexShrink: { sm: 0 } }}
        >
          {translateUi('ui.sections.hrm.payroll.payroll_review.cancel_77dfd213')}
        </Button>
        <Button
          fullWidth={downSm}
          variant="soft"
          color="neutral"
          sx={{ textWrap: 'nowrap', flexShrink: { sm: 0 } }}
        >
          {translateUi('ui.sections.hrm.payroll.payroll_review.edit_payroll_aa3f9fd2')}
        </Button>
      </Stack>
      <Button
        fullWidth={downSm}
        variant="contained"
        onClick={handleOpen}
        sx={{ textWrap: 'nowrap', flexShrink: { sm: 0 } }}
      >
        {translateUi('ui.sections.hrm.payroll.payroll_review.approve_payroll_32b028bb')}
      </Button>
      <ApprovePayrollDialog open={open} onClose={handleClose} />
    </Stack>
  );
};

export default BottomActions;

const ApprovePayrollDialog = ({ sx, open, onClose, ...rest }) => {
  const { t: translateUi } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const onApprove = () => {
    enqueueSnackbar('Payroll approved!', { variant: 'success' });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      {...rest}
      sx={{
        [`& .${dialogClasses.paper}`]: {
          borderRadius: 6,
          p: 3,
          maxWidth: 463,
          ...sx,
        },
      }}
    >
      <DialogTitle
        sx={{ p: 0, mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Box component="span">
          {translateUi('ui.sections.hrm.payroll.payroll_review.approve_payroll_32b028bb')}
        </Box>
        <Button shape="circle" color="neutral" size="small" onClick={onClose}>
          <IconifyIcon icon="material-symbols:close-rounded" sx={{ fontSize: 20 }} />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ mb: 2, p: { xs: 0 } }}>
        <DialogContentText sx={{ typography: 'body2' }}>
          {translateUi(
            'ui.sections.hrm.payroll.payroll_review.approve_payroll_for_oct_1_oct_31_2025_once_confirmed_81eecde6',
          )}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ p: { xs: 0 } }}>
        <Button variant="soft" color="neutral" onClick={onClose}>
          {translateUi('ui.sections.hrm.payroll.payroll_review.cancel_77dfd213')}
        </Button>
        <Button variant="contained" onClick={onApprove}>
          {translateUi('ui.sections.hrm.payroll.payroll_review.confirm_04a21221')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
