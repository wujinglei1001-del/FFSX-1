import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

const getChipColor = (status) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'completed':
      return 'success';
  }
};
const PayrollHistoryCard = ({ start, end, status }) => {
  const { t: translateUi } = useTranslation();
  const startDate = dayjs(start).format('D MMM');
  const endDate = dayjs(end).format('D MMM');
  const year = dayjs(end).format('YYYY');

  return (
    <Paper background={1} sx={{ outline: 0, p: 2, borderRadius: 4, height: 1 }}>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1,
          height: 1,
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            flexGrow: 1,
            gap: 1,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
            }}
          >
            {translateUi('ui.sections.hrm.payroll.dashboard.payroll_for_8620afe0')}
            {startDate} - {endDate}, {year}
          </Typography>
          <Chip
            variant="soft"
            color={getChipColor(status)}
            label={status}
            sx={{ textTransform: 'capitalize' }}
          />
        </Stack>
        <Button
          size="small"
          variant={status !== 'completed' ? 'soft' : 'text'}
          sx={{ textWrap: 'nowrap' }}
        >
          {status === 'completed' ? 'View' : 'Run Payroll'}
        </Button>
      </Stack>
    </Paper>
  );
};

export default PayrollHistoryCard;
