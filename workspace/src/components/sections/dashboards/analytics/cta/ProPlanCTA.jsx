import { useTranslation } from 'react-i18next';
import { Button, Paper, Stack, Typography } from '@mui/material';
import paths from 'routes/paths';

const ProPlanCTA = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper
      sx={{
        display: 'flex',
        gap: 2,
        p: { xs: 3, md: 5 },
        bgcolor: 'success.lighter',
        justifyContent: 'space-between',
        alignItems: { sm: 'center' },
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          alignItems: { sm: 'center' },
          flexWrap: { sm: 'wrap' },
        }}
      >
        <Typography variant="h3" sx={{ typography: { xs: 'h4', sm: 'h3' }, flexShrink: { sm: 0 } }}>
          {translateUi('ui.sections.dashboards.analytics.cta.try_our_pro_plan_42f3de98')}
        </Typography>

        <Typography
          sx={{
            typography: { xs: 'subtitle2', sm: 'subtitle1' },
            fontWeight: { xs: 400, sm: 400 },
          }}
        >
          {translateUi(
            'ui.sections.dashboards.analytics.cta.first_month_free_12_50_month_after_4adee577',
          )}
        </Typography>
      </Stack>
      <Button
        href={paths.pricingColumn}
        variant="contained"
        color="neutral"
        size="large"
        sx={{ flexShrink: 0, alignSelf: 'center' }}
      >
        {translateUi('ui.sections.dashboards.analytics.cta.see_plans_0cd0ae19')}
      </Button>
    </Paper>
  );
};

export default ProPlanCTA;
