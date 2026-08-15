import { useTranslation } from 'react-i18next';
import { TabPanel } from '@mui/lab';
import { Typography } from '@mui/material';

const CurrentTeamTabPanel = ({ value }) => {
  const { t: translateUi } = useTranslation();
  return (
    <TabPanel value={value} sx={{ px: 0 }}>
      <>
        <Typography
          variant="h5"
          sx={{
            color: 'text.disabled',
            fontWeight: 400,
          }}
        >
          {translateUi('ui.sections.kanban.create_board.steps.you_currently_have_no_team_a8fd6154')}
        </Typography>
      </>
    </TabPanel>
  );
};

export default CurrentTeamTabPanel;
