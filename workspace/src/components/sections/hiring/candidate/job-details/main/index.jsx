import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ActionBtns from './ActionBtns';
import DetailsSection from './DetailsSection';

const JobDetailsMain = ({ job }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper sx={{ height: 1, p: { xs: 3, md: 5 } }}>
      <Container maxWidth="sm" disableGutters>
        <Typography variant="h4" sx={{ mb: 3 }}>
          {job.title}
        </Typography>
        <Stack
          sx={{
            gap: 4,
            mb: 4,
          }}
        >
          <DetailsSection
            title={translateUi('ui.sections.hiring.candidate.job_details.about_the_role_60854c5c')}
            description={job.details.aboutRole}
          />
          <DetailsSection
            title={translateUi(
              'ui.sections.hiring.candidate.job_details.responsibilities_2294a7fc',
            )}
            description={job.details.responsibilities}
          />
          <DetailsSection
            title={translateUi('ui.sections.hiring.candidate.job_details.requirements_09a428f9')}
            description={job.details.requirements}
          />
          <DetailsSection
            title={translateUi('ui.sections.hiring.candidate.job_details.bonus_points_8f056cb7')}
            description={job.details.bonusPoints}
          />
          <DetailsSection
            title={translateUi('ui.sections.hiring.candidate.job_details.benefits_927f4067')}
            description={job.details.benefits}
          />
        </Stack>
        <ActionBtns />
      </Container>
    </Paper>
  );
};

export default JobDetailsMain;
