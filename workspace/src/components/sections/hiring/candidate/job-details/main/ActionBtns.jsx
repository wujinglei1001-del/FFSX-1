import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import paths from 'routes/paths';

const ActionBtns = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Button color="neutral">
        {translateUi('ui.sections.hiring.candidate.job_details.cancel_77dfd213')}
      </Button>
      <Stack
        direction="row"
        sx={{
          gap: 1,
        }}
      >
        <Button variant="soft" color="neutral">
          {translateUi('ui.sections.hiring.candidate.job_details.save_efc007a3')}
        </Button>
        <Button href={paths.hiringJobApplication} variant="contained">
          {translateUi('ui.sections.hiring.candidate.job_details.apply_now_80284059')}
        </Button>
      </Stack>
    </Stack>
  );
};

export default ActionBtns;
