import { useTranslation } from 'react-i18next';
import { Divider, Stack } from '@mui/material';
import PanelWrapper from '../PanelWrapper';
import MonthlyPayroll from './MonthlyPayroll';
import PayHistory from './PayHistory';

export const PayInfoTabPanel = ({ data }) => {
  const { t: translateUi } = useTranslation();
  return (
    <PanelWrapper title={translateUi('ui.sections.member.profile.profile_tabs.pay_info_1aad5245')}>
      <Stack divider={<Divider flexItem />}>
        <MonthlyPayroll data={data.monthlyPayroll} />
        <PayHistory data={data.history} />
      </Stack>
    </PanelWrapper>
  );
};
