import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { generatedRevenueData } from 'data/e-commerce/dashboard';
import useToggleChartLegends from 'hooks/useToggleChartLegends';
import IconifyIcon from 'components/base/IconifyIcon';
import DashboardSelectMenu from 'components/common/DashboardSelectMenu';
import GeneratedRevenueChart from './GeneratedRevenueChart';

const GeneratedRevenue = () => {
  const { t: translateUi } = useTranslation();
  const chartRef = useRef(null);
  const { legendState, handleLegendToggle } = useToggleChartLegends(chartRef);

  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, height: 1 }}>
      <Stack
        sx={{
          rowGap: 4,
          height: '100%',
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            alignItems: { lg: 'flex-end' },
            justifyContent: 'space-between',
          }}
        >
          <Grid size={{ xs: 'grow', lg: 'auto' }}>
            <Typography
              variant="h6"
              sx={{
                mb: 1,
              }}
            >
              {translateUi(
                'ui.sections.dashboards.e_commerce.generated_revenue.revenue_generated_d7891231',
              )}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                textWrap: 'pretty',
              }}
            >
              {translateUi(
                'ui.sections.dashboards.e_commerce.generated_revenue.amount_of_revenue_in_this_month_comparing_to_last_ye_961b7d81',
              )}
            </Typography>
          </Grid>
          <Grid sx={{ ml: { sm: 'auto', md: 0 }, order: { lg: 1 } }}>
            <DashboardSelectMenu defaultValue={1} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 'auto',
            }}
          >
            <Stack direction="row" sx={{ gap: 4 }}>
              <Button
                variant="text"
                disableRipple
                size="small"
                sx={{
                  p: 0,
                  color: 'text.secondary',
                  fontWeight: 400,
                  opacity: legendState['Last year'] ? 0.5 : 1,
                  '&:hover': {
                    backgroundColor: 'unset !important',
                  },
                }}
                startIcon={
                  <IconifyIcon
                    icon="material-symbols:square-rounded"
                    sx={{
                      height: 16,
                      width: 16,
                      color: 'chGrey.300',
                    }}
                  />
                }
                onClick={() => handleLegendToggle('Last year')}
              >
                {translateUi(
                  'ui.sections.dashboards.e_commerce.generated_revenue.last_year_3cf4d8d7',
                )}
              </Button>

              <div>
                <Button
                  variant="text"
                  disableRipple
                  size="small"
                  sx={{
                    mr: 1,
                    p: 0,
                    color: 'text.secondary',
                    fontWeight: 400,
                    opacity: legendState['This year'] ? 0.5 : 1,
                    '&:hover': {
                      backgroundColor: 'unset !important',
                    },
                  }}
                  startIcon={
                    <IconifyIcon
                      icon="material-symbols:square-rounded"
                      sx={{
                        height: 16,
                        width: 16,
                        color: 'primary.main',
                      }}
                    />
                  }
                  onClick={() => handleLegendToggle('This year')}
                >
                  {translateUi(
                    'ui.sections.dashboards.e_commerce.generated_revenue.this_year_094c097f',
                  )}
                </Button>
                <Chip label="+6.19%" color="success" />
              </div>
            </Stack>
          </Grid>
        </Grid>

        <Box
          sx={{
            flex: 1,
            '& .echarts-for-react': {
              height: '100% !important',
            },
          }}
        >
          <GeneratedRevenueChart
            data={generatedRevenueData}
            sx={{ minHeight: '200px', width: '100%' }}
            ref={chartRef}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default GeneratedRevenue;
