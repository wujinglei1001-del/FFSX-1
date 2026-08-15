import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

const FeedbackTabs = ({ value, onChange, sx }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Box sx={{ px: { xs: 3, md: 5 }, ...sx }}>
      <Tabs
        value={value}
        onChange={onChange}
        aria-label={translateUi(
          'ui.sections.hrm.performance_management.feedback.feedbacks_tabs_b3758279',
        )}
      >
        <Tab
          label={translateUi('ui.sections.hrm.performance_management.feedback.received_27548c4f')}
          value="Received"
        />
        <Tab
          label={translateUi('ui.sections.hrm.performance_management.feedback.given_6839d82e')}
          value="Given"
        />
        <Tab
          label={translateUi(
            'ui.sections.hrm.performance_management.feedback.self_assessment_97b6ec53',
          )}
          value="Self Assessment"
        />
      </Tabs>
    </Box>
  );
};

export default FeedbackTabs;
