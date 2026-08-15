import { useTranslation } from 'react-i18next';
import { Divider } from '@mui/material';
import Stack from '@mui/material/Stack';
import { newHiresData as data } from 'data/hiring/dashboard';
import DashboardMenu from 'components/common/DashboardMenu';
import SectionHeader from 'components/common/SectionHeader';
import SectionWrapper from '../common/SectionWrapper';
import NewJoiner from './NewJoiner';

const NewHires = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack component={SectionWrapper}>
      <SectionHeader
        title={translateUi('ui.sections.dashboards.hiring.new_hires.new_hires_3993be77')}
        subTitle="Recent joiners by date, role"
        actionComponent={<DashboardMenu size="medium" />}
      />

      <Stack
        component="ul"
        divider={<Divider flexItem sx={{ borderColor: 'dividerLight' }} />}
        sx={{ p: 0, m: 0 }}
      >
        {data.map((item) => (
          <NewJoiner key={item.id} hire={item} />
        ))}
      </Stack>
    </Stack>
  );
};

export default NewHires;
