import { useTranslation } from 'react-i18next';
import { Divider, Stack } from '@mui/material';
import AccountTabPanelSection from '../common/AccountTabPanelSection';
import EducationHistorySection from './EducationHistorySection';
import WorkHistorySection from './WorkHistorySection';

const WorkEducationTabPanel = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack divider={<Divider />} sx={{ gap: 5, mt: 2 }}>
      <AccountTabPanelSection
        title={translateUi(
          'ui.sections.account.work_education.workeducationtabpanel.work_history_a6a397ec',
        )}
        subtitle={translateUi(
          'ui.sections.account.work_education.workeducationtabpanel.add_where_you_are_currently_working_and_where_you_us_7341a6e8',
        )}
        icon="material-symbols:work-outline"
      >
        <WorkHistorySection />
      </AccountTabPanelSection>
      <AccountTabPanelSection
        title={translateUi(
          'ui.sections.account.work_education.workeducationtabpanel.education_aaf87fe5',
        )}
        subtitle={translateUi(
          'ui.sections.account.work_education.workeducationtabpanel.add_schools_where_you_study_studied_and_what_your_ma_d4d4c155',
        )}
        icon="material-symbols:school-outline"
      >
        <EducationHistorySection />
      </AccountTabPanelSection>
    </Stack>
  );
};

export default WorkEducationTabPanel;
