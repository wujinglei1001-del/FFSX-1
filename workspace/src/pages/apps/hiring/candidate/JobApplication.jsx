import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import paths from 'routes/paths';
import ActionBtns from 'components/sections/hiring/candidate/job-application/ActionBtns';
import Documents from 'components/sections/hiring/candidate/job-application/documents';
import PersonalInformation from 'components/sections/hiring/candidate/job-application/personal-information';
import Questionaries from 'components/sections/hiring/candidate/job-application/questionaries';
import useJobApplicationForm from 'components/sections/hiring/candidate/job-application/useJobApplicationForm';

const JobApplication = () => {
  const { t: translateUi } = useTranslation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { methods } = useJobApplicationForm();
  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    console.log(data);
    enqueueSnackbar('Submitted Successfully', { variant: 'success', autoHideDuration: 3000 });
    navigate(paths.hiringJobList);
    reset();
  };

  return (
    <Paper sx={{ height: 1, px: { xs: 3, md: 5 }, py: 5 }}>
      <Container maxWidth="sm" disableGutters sx={{ height: 1 }}>
        <Stack
          sx={{
            gap: 4,
            height: 1,
          }}
        >
          <Typography variant="h4">
            {translateUi('ui.pages.apps.hiring.candidate.job_application_97cbb502')}
          </Typography>
          <FormProvider {...methods}>
            <Stack
              component="form"
              id="jobApplicationFrom"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                gap: 2,
                height: 1,
              }}
            >
              <PersonalInformation />
              <Documents />
              <Questionaries />
              <ActionBtns />
            </Stack>
          </FormProvider>
        </Stack>
      </Container>
    </Paper>
  );
};

export default JobApplication;
