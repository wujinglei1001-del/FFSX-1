import { useTranslation } from 'react-i18next';
import { Chip, Paper, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import DashboardSelectMenu from 'components/common/DashboardSelectMenu';
import SectionHeader from 'components/common/SectionHeader';
import SessionByOSChart from './SessionByOSChart';

const SessionByOS = ({ data }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      <SectionHeader
        title={translateUi('ui.sections.dashboards.analytics.session_by_os.session_by_os_d1e44018')}
        subTitle={
          <Stack
            direction="row"
            sx={{
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Chip
              label="1.52%"
              color="success"
              variant="soft"
              size="small"
              icon={<IconifyIcon icon="material-symbols:trending-up-rounded" />}
              sx={{
                flexDirection: 'row-reverse',
              }}
            />

            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
              }}
            >
              {translateUi(
                'ui.sections.dashboards.analytics.session_by_os.more_than_last_week_on_average_e61b2dae',
              )}
            </Typography>
          </Stack>
        }
        actionComponent={
          <DashboardSelectMenu
            defaultValue="windows"
            options={[
              {
                value: 'windows',
                label: translateUi(
                  'ui.sections.dashboards.analytics.session_by_os.windows_26d9c28d',
                ),
              },
              {
                value: 'linux',
                label: translateUi('ui.sections.dashboards.analytics.session_by_os.linux_83ad8510'),
              },
              {
                value: 'mac',
                label: translateUi('ui.sections.dashboards.analytics.session_by_os.macos_49cf4e4e'),
              },
            ]}
          />
        }
        sx={{ p: { xs: 3, md: 5 }, pb: '0 !important', flexWrap: 'wrap' }}
      />
      <SessionByOSChart
        data={data}
        sx={{
          flex: 1,
          minHeight: 130,
          width: '100%',
          '&:not(&.echart-map)': {
            '> div': {
              '&:first-of-type': {
                height: 'unset !important',
              },
            },
          },
        }}
      />
    </Paper>
  );
};

export default SessionByOS;
