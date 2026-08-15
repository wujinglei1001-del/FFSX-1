import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import IconifyIcon from 'components/base/IconifyIcon';
import SimpleBar from 'components/base/SimpleBar';
import StyledTextField from 'components/styled/StyledTextField';
import Activity from './Activity';

dayjs.extend(isToday);

const AllActivitiesTabPanel = ({ allActivities }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Container maxWidth={false} sx={{ maxWidth: 800, px: { xs: 0 } }}>
      <StyledTextField
        placeholder={translateUi(
          'ui.sections.crm.common.activity_tab_panels.search_an_activity_9a98021d',
        )}
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="material-symbols:search" sx={{ fontSize: 20 }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{ maxWidth: 300, mt: 1, mb: 3 }}
      />
      <SimpleBar sx={{ maxHeight: 504 }}>
        <Stack
          sx={{
            gap: 3,
          }}
        >
          {allActivities.map(({ id, date, activities }) => {
            const activityDate = dayjs(date);
            const isToday = activityDate.isToday();
            const formattedDate = activityDate.format('D MMM, YYYY');

            return (
              <Stack
                key={id}
                sx={{
                  gap: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 2,
                    py: 1,
                    bgcolor: 'background.paper',
                    px: 2,
                    fontWeight: isToday ? 500 : 700,
                    color: isToday ? 'text.secondary' : 'inherit',
                  }}
                >
                  {isToday ? (
                    <>
                      <Box component="strong" sx={{ color: 'text.primary' }}>
                        {translateUi('ui.sections.crm.common.activity_tab_panels.today_24345a14')}
                      </Box>{' '}
                      ({formattedDate})
                    </>
                  ) : (
                    formattedDate
                  )}
                </Typography>
                <Stack
                  sx={{
                    gap: 1,
                  }}
                >
                  {activities.map((activity) => (
                    <Activity key={activity.id} activity={activity} />
                  ))}
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </SimpleBar>
      <Button sx={{ mt: 3 }}>
        {translateUi('ui.sections.crm.common.activity_tab_panels.load_more_notifications_160c9a66')}
      </Button>
    </Container>
  );
};

export default AllActivitiesTabPanel;
