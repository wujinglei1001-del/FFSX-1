import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper } from '@mui/material';
import { months } from 'data/common/months';
import DashboardSelectMenu from 'components/common/DashboardSelectMenu';
import SectionHeader from 'components/common/SectionHeader';
import ProjectTimelineChart from 'components/sections/dashboards/project/project-timeline/ProjectTimelineChart';

const ProjectTimeline = ({ projectTimelineData }) => {
  const { t: translateUi } = useTranslation();
  const [selectedMonth, setSelectedMonth] = useState(() =>
    new Date().toLocaleString('default', { month: 'long' }),
  );

  return (
    <Paper sx={{ height: 1, p: { xs: 3, md: 5 } }}>
      <SectionHeader
        title={translateUi(
          'ui.sections.dashboards.project.project_timeline.project_timeline_307c9b37',
        )}
        subTitle="Status of completion for all projects"
        actionComponent={
          <DashboardSelectMenu
            options={months.map((month) => ({
              label: month,
              value: month,
            }))}
            onChange={(value) => setSelectedMonth(value)}
            value={selectedMonth}
          />
        }
        sx={{ mb: 4 }}
      />
      <ProjectTimelineChart projectTimelineData={projectTimelineData} />
    </Paper>
  );
};

export default ProjectTimeline;
