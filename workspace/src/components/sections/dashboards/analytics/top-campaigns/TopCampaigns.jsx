import { useTranslation } from 'react-i18next';
import { Button, Paper, Stack } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import DashboardSelectMenu from 'components/common/DashboardSelectMenu';
import SectionHeader from 'components/common/SectionHeader';
import TopCampaignsChart from './TopCampaignsChart';

const TopCampaigns = ({ data }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper
      sx={{
        height: 1,
        p: { xs: 3, md: 5 },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SectionHeader
        title={translateUi('ui.sections.dashboards.analytics.top_campaigns.top_campaigns_8ce64455')}
        subTitle="Users across different sources"
        actionComponent={
          <DashboardSelectMenu
            defaultValue="this-week"
            options={[
              {
                value: 'this-week',
                label: translateUi(
                  'ui.sections.dashboards.analytics.top_campaigns.this_week_4e68dca8',
                ),
              },
              {
                value: 'last-week',
                label: translateUi(
                  'ui.sections.dashboards.analytics.top_campaigns.last_week_bc159a56',
                ),
              },
              {
                value: 'this-month',
                label: translateUi(
                  'ui.sections.dashboards.analytics.top_campaigns.this_month_0f6cc3a8',
                ),
              },
            ]}
          />
        }
        sx={{ mb: 5 }}
      />

      <TopCampaignsChart data={data} sx={{ minHeight: 326, flex: 1, mb: 2 }} />

      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="text"
          size="small"
          endIcon={
            <IconifyIcon
              icon="material-symbols:chevron-right-rounded"
              sx={{ fontSize: '18px !important' }}
            />
          }
        >
          {translateUi('ui.sections.dashboards.analytics.top_campaigns.all_countries_0b313a76')}
        </Button>

        <Button
          variant="text"
          size="small"
          endIcon={
            <IconifyIcon
              icon="material-symbols:open-in-new-rounded"
              sx={{ fontSize: '18px !important' }}
            />
          }
        >
          {translateUi('ui.sections.dashboards.analytics.top_campaigns.see_report_db1d7587')}
        </Button>
      </Stack>
    </Paper>
  );
};

export default TopCampaigns;
