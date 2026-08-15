import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TabContext, TabList } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { users } from 'data/users';
import CurrentTeamTabPanel from 'components/sections/kanban/create-board/steps/TeamInvite/CurrentTeamTabPanel';
import NewTeamTabPanel from 'components/sections/kanban/create-board/steps/TeamInvite/NewTeamTabPanel';

const TeamInvite = () => {
  const { t: translateUi } = useTranslation();
  const [currentTab, setCurrentTab] = useState('new');

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <TabContext value={currentTab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList
          onChange={handleChange}
          aria-label={translateUi(
            'ui.sections.kanban.create_board.steps.team_management_tab_panel_1244b4db',
          )}
        >
          <Tab
            label={translateUi('ui.sections.kanban.create_board.steps.your_current_teams_0935f257')}
            value="current"
          />
          <Tab
            label={translateUi('ui.sections.kanban.create_board.steps.create_new_team_c8c28502')}
            value="new"
          />
        </TabList>
      </Box>
      <CurrentTeamTabPanel value="current" />
      <NewTeamTabPanel value="new" options={users} />
    </TabContext>
  );
};

export default TeamInvite;
