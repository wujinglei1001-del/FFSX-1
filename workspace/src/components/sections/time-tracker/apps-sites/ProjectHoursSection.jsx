import { useTranslation } from 'react-i18next';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { secondsToHms } from 'lib/utils';
import SiteDataCard from './SiteDataCard';

const ProjectHoursSection = ({ project }) => {
  const { t: translateUi } = useTranslation();
  const totalTime = project.sites.reduce((acc, site) => acc + site.hours, 0);

  return (
    <Stack sx={{ gap: 2 }}>
      <Stack
        direction="row"
        sx={{
          columnGap: { xs: 2, sm: 4 },
          rowGap: 1,
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            {project.project}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {project.task}
          </Typography>
        </Box>
        <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {translateUi(
            'ui.sections.time_tracker.apps_sites.projecthourssection.total_time_46e23190',
          )}{' '}
          <Box component="span" sx={{ fontWeight: 700 }}>
            {secondsToHms(totalTime, true)}
          </Box>{' '}
          <Box component="span" sx={{ fontSize: 'body2.fontSize' }}>
            {translateUi('ui.sections.time_tracker.apps_sites.projecthourssection.hrs_a23c4292')}
          </Box>
        </Typography>
      </Stack>
      <Grid container spacing={1}>
        {project.sites.map((site) => (
          <Grid size={{ xs: 12, sm: 6 }} key={site.id}>
            <SiteDataCard data={site} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default ProjectHoursSection;
