import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, ButtonBase, Paper, Stack, Typography } from '@mui/material';
import useToggleChartLegends from 'hooks/useToggleChartLegends';
import i18n from 'locales/i18n';
import DashboardSelectMenu from 'components/common/DashboardSelectMenu';
import SectionHeader from 'components/common/SectionHeader';
import OSUsageChart from './OSUsageChart';
import OSUsageList from './OSUsageList';

const legends = [
  {
    get title() {
      return i18n.t('ui.sections.dashboards.analytics.user_by_os.desktop_532c67fe');
    },
    color: 'chBlue.200',
  },
  {
    get title() {
      return i18n.t('ui.sections.dashboards.analytics.user_by_os.mobile_b1d70245');
    },
    color: 'chOrange.200',
  },
  {
    get title() {
      return i18n.t('ui.sections.dashboards.analytics.user_by_os.tablet_fabcacd2');
    },
    color: 'chLightBlue.200',
  },
];

const UserByOS = ({ data }) => {
  const { t: translateUi } = useTranslation();
  const chartRef = useRef(null);
  const { legendState, handleLegendToggle } = useToggleChartLegends(chartRef);

  return (
    <Paper sx={{ p: { xs: 3, md: 5 } }}>
      <SectionHeader
        title={translateUi('ui.sections.dashboards.analytics.user_by_os.users_by_os_ff2d7c57')}
        subTitle="Categorized by devices and their OS "
        actionComponent={
          <DashboardSelectMenu
            defaultValue="subscribed"
            options={[
              {
                value: 'subscribed',
                label: translateUi(
                  'ui.sections.dashboards.analytics.user_by_os.subscribed_dd1242a8',
                ),
              },
              {
                value: 'unsubscribed',
                label: translateUi(
                  'ui.sections.dashboards.analytics.user_by_os.unsubscribed_9ab84878',
                ),
              },
              {
                value: 'all',
                label: translateUi(
                  'ui.sections.dashboards.analytics.user_by_os.all_users_b4f25a14',
                ),
              },
            ]}
          />
        }
        sx={{ mb: 3, flexWrap: 'wrap' }}
      />

      <Stack direction="row" sx={{ gap: 3, alignItems: 'center', mb: 5 }}>
        {legends.map((item) => (
          <ButtonBase
            key={item.title}
            onClick={() => handleLegendToggle(item.title)}
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              opacity: legendState[item.title] ? 0.5 : 1,
            }}
          >
            <Box sx={{ width: 4, height: 16, borderRadius: 0.5, bgcolor: item.color }} />
            <Typography
              variant="subtitle2"
              sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'capitalize' }}
            >
              {item.title}
            </Typography>
          </ButtonBase>
        ))}
      </Stack>

      <Stack
        direction={{ xs: 'column-reverse', sm: 'row', md: 'column-reverse', xl: 'row' }}
        sx={{
          alignItems: 'center',
          gap: 5,
        }}
      >
        <OSUsageList data={data} />

        <OSUsageChart
          ref={chartRef}
          data={data}
          sx={{ flex: 1, width: 1, minWidth: 220, height: '100% !important', minHeight: 220 }}
        />
      </Stack>
    </Paper>
  );
};

export default UserByOS;
