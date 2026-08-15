import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import { followingMonthTasks, nextMonthTasks, thisMonthTasks } from 'data/project/table-data';
import ProjectTableSection from './ProjectTableSection';

const TableViewMain = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack sx={{ gap: 4 }}>
      <ProjectTableSection
        title={translateUi('ui.sections.project.table_view.this_month_0f6cc3a8')}
        barColor="success"
        tableData={thisMonthTasks}
      />
      <ProjectTableSection
        title={translateUi('ui.sections.project.table_view.next_month_534c34cd')}
        barColor="warning"
        tableData={nextMonthTasks}
      />
      <ProjectTableSection
        title={translateUi('ui.sections.project.table_view.following_month_67d3226f')}
        barColor="primary"
        tableData={followingMonthTasks}
      />
    </Stack>
  );
};

export default TableViewMain;
