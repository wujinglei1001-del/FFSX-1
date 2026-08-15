import { useTranslation } from 'react-i18next';
import { Paper, Typography } from '@mui/material';
import CreateBoardStepper from 'components/sections/kanban/create-board/CreateBoardStepper';

const CreateBoard = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, height: 1 }}>
      <Typography variant="h5" sx={{ fontWeight: 500, mb: 3 }}>
        {translateUi('ui.pages.apps.kanban.createboard.new_kanban_board_5f96194e')}
      </Typography>
      <CreateBoardStepper />
    </Paper>
  );
};

export default CreateBoard;
