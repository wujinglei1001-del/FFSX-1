import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, ButtonBase, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { leadSoursesData } from 'data/crm/dashboard';
import useToggleChartLegends from 'hooks/useToggleChartLegends';
import i18n from 'locales/i18n';
import DashboardMenu from 'components/common/DashboardMenu';
import SectionHeader from 'components/common/SectionHeader';
import LeadSourcesChart from './LeadSourcesChart';

const chartLegends = [
  {
    get label() {
      return i18n.t('ui.sections.dashboards.crm.lead_sources.organic_82f86eb9');
    },
    color: 'chBlue.400',
  },
  {
    get label() {
      return i18n.t('ui.sections.dashboards.crm.lead_sources.marketing_e0c534a0');
    },
    color: 'chOrange.400',
  },
  {
    get label() {
      return i18n.t('ui.sections.dashboards.crm.lead_sources.social_media_7e89cf43');
    },
    color: 'chLightBlue.300',
  },
  {
    get label() {
      return i18n.t('ui.sections.dashboards.crm.lead_sources.blog_posts_7fef20e1');
    },
    color: 'chGreen.400',
  },
];

const LeadSources = () => {
  const { t: translateUi } = useTranslation();
  const chartRef = useRef(null);
  const { legendState, handleLegendToggle } = useToggleChartLegends(chartRef);

  return (
    <Paper sx={{ height: 1, p: { xs: 3, md: 5 } }}>
      <Stack
        sx={{
          height: 1,
        }}
      >
        <SectionHeader
          title={translateUi('ui.sections.dashboards.crm.lead_sources.lead_sources_00d1de19')}
          subTitle="Ratio of generated leads"
          actionComponent={<DashboardMenu />}
          sx={{ mb: 0, flex: 1 }}
        />

        <Stack>
          <Box sx={{ position: 'relative' }}>
            <LeadSourcesChart
              data={leadSoursesData}
              ref={chartRef}
              sx={{ height: '215px !important' }}
            />

            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Typography variant="h4">
                {leadSoursesData.reduce((acc, item) => acc + item.value, 0)}
              </Typography>
            </Box>
          </Box>

          <Grid
            container
            spacing={{ xs: 1, sm: 3, md: 1, lg: 3 }}
            sx={{
              alignItems: 'center',
            }}
          >
            {chartLegends.map(({ label, color }) => (
              <Grid key={label} size={{ xs: 3, sm: 6, md: 3 }}>
                <ButtonBase
                  disableRipple
                  onClick={() => handleLegendToggle(label)}
                  sx={{
                    width: 1,
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    opacity: legendState[label] ? 0.5 : 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    noWrap
                    sx={{
                      color: 'text.secondary',
                      textOverflow: 'ellipsis',
                      maxWidth: 1,
                      mb: 1,
                    }}
                  >
                    {label}
                  </Typography>
                  <Box sx={{ width: 1, height: 8, bgcolor: color, borderRadius: 0.5 }} />
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default LeadSources;
