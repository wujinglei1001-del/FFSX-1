import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import NewCycleDialog from './NewCycleDialog';

const NewAppraisalCycle = () => {
  const { t: translateUi } = useTranslation();
  const { only } = useBreakpoints();
  const [open, setOpen] = useState(false);

  const isXs = only('xs');

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  return (
    <Fragment>
      <Button
        variant="contained"
        fullWidth={isXs}
        startIcon={<IconifyIcon icon="material-symbols:add" />}
        onClick={handleOpen}
        sx={{ textWrap: 'nowrap', width: { xs: 1, sm: 'auto' } }}
      >
        {translateUi(
          'ui.sections.hrm.performance_management.appraisal_cycle.new_appraisal_cycle_09a2d685',
        )}
      </Button>
      <NewCycleDialog open={open} onClose={handleClose} handleClose={handleClose} />
    </Fragment>
  );
};

export default NewAppraisalCycle;
