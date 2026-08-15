import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import SectionWrapper from 'components/sections/dashboards/hiring/common/SectionWrapper';

const EmployeeGreetings = () => {
  const { t: translateUi } = useTranslation();
  const today = dayjs();
  return (
    <SectionWrapper sx={{ py: { xs: 3 } }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          gap: 3,
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
        }}
      >
        <div>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {translateUi(
              'ui.sections.dashboards.employee.greeting.good_evening_john_carter_729f8a2c',
            )}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
            {translateUi('ui.sections.dashboards.employee.greeting.have_a_productive_day_1e0a2f2b')}
          </Typography>
        </div>
        <div>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, mb: 1, textAlign: { xs: 'left', sm: 'right' } }}
          >
            {today.format('dddd  h:mm a')}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: 'text.secondary',
              textAlign: { xs: 'left', sm: 'right' },
            }}
          >
            {today.format('DD MMMM, YYYY')}
          </Typography>
        </div>
      </Stack>
    </SectionWrapper>
  );
};

export default EmployeeGreetings;
