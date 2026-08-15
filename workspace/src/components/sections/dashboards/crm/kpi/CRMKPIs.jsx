import { useTranslation } from 'react-i18next';
import { Avatar, ButtonBase, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import IconifyIcon from 'components/base/IconifyIcon';
import KPI from './KPI';

const CRMKPIs = ({ data }) => {
  const { t: translateUi } = useTranslation();
  return (
    <>
      {data.map((kpi) => (
        <Grid key={kpi.title} size={{ xs: 6, sm: 4, lg: 6, xl: 4 }}>
          <KPI {...kpi} />
        </Grid>
      ))}

      <Grid size={{ xs: 6, sm: 4, lg: 6, xl: 4 }}>
        <Paper
          background={1}
          sx={{
            height: 1,
            '&:hover': {
              bgcolor: 'background.elevation2',
            },
          }}
        >
          <ButtonBase
            sx={{
              p: { xs: 3, md: 5 },
              height: 1,
              width: 1,
              display: 'grid',
              placeContent: 'center',
              justifyItems: 'center',
            }}
          >
            <Avatar sx={{ mb: 3, bgcolor: 'primary.light' }}>
              <IconifyIcon icon="material-symbols:add-2-rounded" sx={{ fontSize: 24 }} />
            </Avatar>
            <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {translateUi('ui.sections.dashboards.crm.kpi.add_new_kpi_39cf0b8c')}
            </Typography>
          </ButtonBase>
        </Paper>
      </Grid>
    </>
  );
};

export default CRMKPIs;
