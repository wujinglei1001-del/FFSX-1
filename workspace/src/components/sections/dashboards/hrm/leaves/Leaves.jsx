import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import SectionHeader from 'components/common/SectionHeader';
import LeaveCard from './LeaveCard';

const Leaves = ({ leaves }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper
      background={1}
      sx={{ display: 'flex', flexDirection: 'column', p: { xs: 3, md: 5 }, height: 1 }}
    >
      <SectionHeader
        title={translateUi('ui.sections.dashboards.hrm.leaves.leaves_left_2cc225d7')}
        subTitle=""
        actionComponent={
          <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
            <Button>{translateUi('ui.sections.dashboards.hrm.leaves.history_90ccd649')}</Button>
            <Button variant="contained">
              {translateUi('ui.sections.dashboards.hrm.leaves.apply_cfea419c')}
            </Button>
          </Stack>
        }
      />
      <Grid container spacing={1} size={12}>
        {leaves.map((leave) => (
          <Grid size={{ xs: 6, sm: 3, md: 6, lg: 3 }} key={leave.title}>
            <LeaveCard leaveData={leave} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Leaves;
