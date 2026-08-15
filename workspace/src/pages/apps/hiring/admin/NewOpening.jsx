import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import NewOpeningStepper from 'components/sections/hiring/admin/new-opening/NewOpeningStepper';

const NewOpening = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper sx={{ height: 1, p: { xs: 3, md: 5 } }}>
      <Container maxWidth="sm" disableGutters>
        <Typography
          variant="h4"
          sx={{
            mb: 3,
          }}
        >
          {translateUi('ui.pages.apps.hiring.admin.new_opening_4023932b')}
        </Typography>
        <NewOpeningStepper />
      </Container>
    </Paper>
  );
};

export default NewOpening;
