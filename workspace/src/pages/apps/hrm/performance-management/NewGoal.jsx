import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CreateNewGoalForm from 'components/sections/hrm/performance-management/new-goal';

const NewGoal = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Box sx={{ p: { xs: 3, md: 5 }, height: 1 }}>
      <Container maxWidth="sm" disableGutters>
        <Typography variant="h4" sx={{ mb: 5 }}>
          {translateUi('ui.pages.apps.hrm.performance_management.create_new_goals_e826f61b')}
        </Typography>

        <CreateNewGoalForm />
      </Container>
    </Box>
  );
};

export default NewGoal;
