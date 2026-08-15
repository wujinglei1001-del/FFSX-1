import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const ActionBtns = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: 'space-between',
        gap: 2,
        mt: 'auto',
      }}
    >
      <Button color="neutral">
        {translateUi('ui.sections.hiring.candidate.job_application.cancel_77dfd213')}
      </Button>
      <Stack
        direction="row"
        sx={{
          gap: 1,
        }}
      >
        <Button variant="soft" color="neutral">
          {translateUi('ui.sections.hiring.candidate.job_application.save_efc007a3')}
        </Button>
        <Button type="submit" variant="contained">
          {translateUi('ui.sections.hiring.candidate.job_application.submit_now_001147c0')}
        </Button>
      </Stack>
    </Stack>
  );
};

export default ActionBtns;
