import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

const DetailsTabs = ({ value, onChange, sx }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Box sx={{ ...sx }}>
      <Tabs
        value={value}
        onChange={onChange}
        aria-label={translateUi(
          'ui.sections.hrm.payroll.payroll_review.payroll_details_tabs_9c4dfa3d',
        )}
      >
        <Tab
          label={translateUi('ui.sections.hrm.payroll.payroll_review.employee_summary_ca17c230')}
          value="employee"
        />
        <Tab
          label={translateUi('ui.sections.hrm.payroll.payroll_review.tax_summary_928f7374')}
          value="tax"
        />
      </Tabs>
    </Box>
  );
};

export default DetailsTabs;
