import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useHiringContext } from 'providers/HiringProvider';

const ActiveSearchFilter = ({ search }) => {
  const { t: translateUi } = useTranslation();
  const {
    candidate: { jobs },
  } = useHiringContext();

  const jobsCount = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.name.toLowerCase().includes(search.toLowerCase()) ||
      job.overview.location.toLowerCase().includes(search.toLowerCase()),
  ).length;

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: 'space-between',
      }}
    >
      <Stack
        direction="row"
        sx={{
          gap: 1.5,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
          }}
        >
          {translateUi('ui.sections.hiring.candidate.job_list.searched_for_ad982376')}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
          }}
        >
          '{search}'
        </Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          gap: 1.5,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
          }}
        >
          {jobsCount}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
          }}
        >
          {jobsCount === 1 ? 'Job' : 'Jobs'}
          {translateUi('ui.sections.hiring.candidate.job_list.matched_1bf3ec5b')}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ActiveSearchFilter;
