import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import useNumberFormat from 'hooks/useNumberFormat';
import { useNavContext } from 'layouts/main-layout/NavProvider';
import CompanyInfo from './CompanyInfo';
import OverviewItem from './OverviewItem';

const JobDetailsAside = ({ job }) => {
  const { t: translateUi } = useTranslation();
  const { currencyFormat } = useNumberFormat();
  const { topbarHeight } = useNavContext();

  return (
    <Paper background={1} sx={{ height: 1 }}>
      <Box sx={() => ({ position: 'sticky', top: topbarHeight, p: { xs: 3, md: 5 } })}>
        <Stack
          sx={{
            gap: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              lineHeight: 1.5,
            }}
          >
            {translateUi('ui.sections.hiring.candidate.job_details.job_overview_b776752b')}
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 6, md: 12 }}>
              <OverviewItem
                icon="material-symbols:business-center-outline-rounded"
                label={translateUi(
                  'ui.sections.hiring.candidate.job_details.employement_type_7e1376bd',
                )}
                value={job.overview.employmentType}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 12 }}>
              <OverviewItem
                icon="material-symbols:work-outline"
                label={translateUi('ui.sections.hiring.candidate.job_details.work_mode_d2813026')}
                value={job.overview.workMode}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 12 }}>
              <OverviewItem
                icon="material-symbols:payments-outline"
                label={translateUi(
                  'ui.sections.hiring.candidate.job_details.offered_salary_90df402b',
                )}
                value={currencyFormat(job.overview.offeredSalary, { maximumFractionDigits: 0 })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 12 }}>
              <OverviewItem
                icon="material-symbols:badge-outline"
                label={translateUi('ui.sections.hiring.candidate.job_details.experience_5b5aafe6')}
                value={`${job.overview.experience} years`}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 12 }}>
              <OverviewItem
                icon="material-symbols:schedule-outline"
                label={translateUi('ui.sections.hiring.candidate.job_details.deadline_2b12f369')}
                value={dayjs(job.overview.deadline).format('MMM DD, YYYY')}
              />
            </Grid>
          </Grid>
          <Divider />
          <Stack
            sx={{
              gap: 2,
            }}
          >
            <CompanyInfo company={job.company} />
            <Button variant="soft" sx={{ alignSelf: 'flex-start' }}>
              {translateUi('ui.sections.hiring.candidate.job_details.view_profile_685ed0a4')}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export default JobDetailsAside;
