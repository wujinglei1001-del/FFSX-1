import { useTranslation } from 'react-i18next';
import { Divider, Stack } from '@mui/material';
import PanelWrapper from '../PanelWrapper';
import ProjectList from './ProjectList';
import TeamsStats from './TeamsStats';

export const TeamOverviewTabPanel = ({ data }) => {
  const { t: translateUi } = useTranslation();
  return (
    <PanelWrapper
      title={translateUi('ui.sections.member.profile.profile_tabs.team_overview_b1da46af')}
    >
      <Stack divider={<Divider flexItem />}>
        <TeamsStats data={data.assignedTeams} />
        <ProjectList data={data.projectList} />
      </Stack>
    </PanelWrapper>
  );
};
