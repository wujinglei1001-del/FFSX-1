import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { currentPayrollRun } from 'data/hrm/payroll/dashboard';
import dayjs from 'dayjs';

const PayrollCard = () => {
  const { t: translateUi } = useTranslation();
  const { start, end, payDate, paySchedule, approvePayroll, employeeNo } = currentPayrollRun;

  return (
    <Paper background={1} sx={{ outline: 0, py: 3, px: 4, borderRadius: 6, height: 1 }}>
      <Stack
        sx={{
          gap: 4,
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row', md: 'column', xl: 'row' }}
          sx={{
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center', md: 'flex-start', xl: 'center' },
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              lineHeight: 1.5,
            }}
          >
            {translateUi('ui.sections.hrm.payroll.dashboard.payroll_072a08ad')}
            {dayjs(start).format('D MMM')} - {dayjs(end).format('D MMM')},{' '}
            {dayjs(end).format('YYYY')}
          </Typography>
          <Button variant="contained">
            {translateUi('ui.sections.hrm.payroll.dashboard.run_payroll_e6657ad6')}
          </Button>
        </Stack>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, sm: 3, md: 6, xl: 3 }}>
            <CardInfo
              title={translateUi('ui.sections.hrm.payroll.dashboard.pay_date_02292742')}
              value={dayjs(payDate).format('D MMM, YYYY')}
              sx={{ alignItems: 'flex-start' }}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 3, md: 6, xl: 3 }}>
            <CardInfo
              title={translateUi('ui.sections.hrm.payroll.dashboard.pay_schedule_f93266bb')}
              value={paySchedule}
              sx={{
                alignItems: { xs: 'flex-end', sm: 'flex-start', md: 'flex-end', xl: 'flex-start' },
              }}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 3, md: 6, xl: 3 }}>
            <CardInfo
              title={translateUi('ui.sections.hrm.payroll.dashboard.approve_payroll_32b028bb')}
              value={dayjs(approvePayroll).format('D MMM, YYYY')}
              sx={{ alignItems: 'flex-start' }}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 3, md: 6, xl: 3 }}>
            <CardInfo
              title={translateUi('ui.sections.hrm.payroll.dashboard.employee_no_c6941af9')}
              value={employeeNo}
              sx={{
                alignItems: { xs: 'flex-end', sm: 'flex-start', md: 'flex-end', xl: 'flex-start' },
              }}
            />
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );
};

export default PayrollCard;

const CardInfo = ({ title, value, ...rest }) => {
  return (
    <Stack
      {...rest}
      sx={[
        {
          gap: 1,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontWeight: 700,
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
};
