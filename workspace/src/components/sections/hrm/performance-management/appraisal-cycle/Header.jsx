import { useTranslation } from 'react-i18next';
import { typographyClasses } from '@mui/material/Typography';
import PageHeader from 'components/sections/ecommerce/admin/common/PageHeader';
import SearchFilterActionBar from 'components/sections/hrm/payroll/common/SearchFilterActionBar';
import NewAppraisalCycle from './new-appraisal-cycle';

const AppraisalCycleHeader = () => {
  const { t: translateUi } = useTranslation();
  return (
    <PageHeader
      title={translateUi(
        'ui.sections.hrm.performance_management.appraisal_cycle.appraisal_cycle_176cc519',
      )}
      breadcrumb={[
        {
          label: translateUi(
            'ui.sections.hrm.performance_management.appraisal_cycle.home_70f8bb9a',
          ),
          url: '#!',
        },
        {
          label: translateUi(
            'ui.sections.hrm.performance_management.appraisal_cycle.appraisal_cycle_176cc519',
          ),
          active: true,
        },
      ]}
      actionComponent={
        <SearchFilterActionBar
          searchPlaceholder="Search Cycle"
          searchId="searchItem"
          actionComponent={<NewAppraisalCycle />}
          searchSx={{ maxWidth: { sm: 250 } }}
        />
      }
      paperProps={{
        sx: {
          outline: 0,
          [`& .${typographyClasses.h4}`]: {
            textWrap: 'nowrap',
          },
        },
      }}
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'flex-end' },
      }}
    />
  );
};

export default AppraisalCycleHeader;
