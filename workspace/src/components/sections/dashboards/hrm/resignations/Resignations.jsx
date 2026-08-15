import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import IconifyIcon from 'components/base/IconifyIcon';
import SectionHeader from 'components/common/SectionHeader';
import ResignationsTable from './ResignationsTable';

const Resignations = ({ resignations }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, height: 1 }}>
      <SectionHeader
        title={translateUi('ui.sections.dashboards.hrm.resignations.recent_resignations_322cb6ce')}
        subTitle=""
        sx={{ flexWrap: 'wrap' }}
        actionComponent={
          <Button
            variant="soft"
            color="neutral"
            endIcon={<IconifyIcon icon="material-symbols:open-in-new-rounded" />}
            sx={{ flexShrink: 0 }}
          >
            {translateUi('ui.sections.dashboards.hrm.resignations.exit_interview_records_95d4ee4c')}
          </Button>
        }
      />
      <ResignationsTable tableData={resignations} />
    </Paper>
  );
};

export default Resignations;
