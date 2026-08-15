import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import paths from 'routes/paths';

const BottomActions = () => {
  const { t: translateUi } = useTranslation();
  const navigate = useNavigate();
  const { down } = useBreakpoints();
  const downSm = down('sm');

  const saveLabel = downSm ? 'Save' : 'Save for Later';
  const calculateLabel = downSm ? 'Calculate' : 'Calculate Payroll';

  return (
    <Stack
      direction="row"
      sx={{
        gap: 2,
        justifyContent: downSm ? 'space-between' : 'flex-end',
      }}
    >
      <Button color="neutral" sx={{ flexShrink: 0 }}>
        {translateUi('ui.sections.hrm.payroll.earnings.cancel_77dfd213')}
      </Button>
      <Stack
        direction="row"
        sx={{
          gap: 1,
        }}
      >
        <Button variant="soft" color="neutral">
          {saveLabel}
        </Button>
        <Button variant="contained" onClick={() => navigate(paths.hrmPayrollReview)}>
          {calculateLabel}
        </Button>
      </Stack>
    </Stack>
  );
};

export default BottomActions;
