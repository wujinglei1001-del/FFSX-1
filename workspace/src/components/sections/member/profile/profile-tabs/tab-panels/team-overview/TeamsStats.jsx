import { useTranslation } from 'react-i18next';
import { Box, Paper, Stack, Typography } from '@mui/material';

const TeamsStats = ({ data }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      sx={{
        gap: 1,
        pb: 3,
      }}
    >
      {data.map((stat) => (
        <Paper
          key={stat.id}
          background={1}
          sx={{ outline: 0, borderRadius: 6, p: { xs: 2, md: 3 } }}
        >
          <Stack
            direction="row"
            sx={{
              gap: { xs: 2, sm: 1 },
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Stat
              label={translateUi('ui.sections.member.profile.profile_tabs.assigned_team_774b2ec0')}
              value={stat.team}
              sx={{
                flexShrink: 0,
              }}
            />

            <Stack
              direction={{ xs: 'row', sm: 'row' }}
              sx={{
                gap: { xs: 2, sm: 3 },
                display: { xs: 'grid', sm: 'flex' },
                gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))' },
                width: 'auto',
                minWidth: 0,
              }}
            >
              <Stat
                label={translateUi('ui.sections.member.profile.profile_tabs.completed_1798b3ba')}
                value={stat.stats.completed}
                sx={{ textAlign: 'right' }}
              />
              <Stat
                label={translateUi('ui.sections.member.profile.profile_tabs.active_a733b809')}
                value={stat.stats.active}
                sx={{ textAlign: 'right' }}
              />
              <Stat
                label={translateUi('ui.sections.member.profile.profile_tabs.archived_eddc813f')}
                value={stat.stats.archived}
                sx={{ textAlign: 'right' }}
              />
              <Stat
                label={translateUi(
                  'ui.sections.member.profile.profile_tabs.total_project_d9bd2510',
                )}
                value={stat.stats.total}
                sx={{ textAlign: 'right' }}
              />
            </Stack>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};
const Stat = ({ label, value, ...rest }) => {
  return (
    <Box {...rest}>
      <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 700, color: 'text.secondary', lineHeight: 1.625 }}>
        {value}
      </Typography>
    </Box>
  );
};
export default TeamsStats;
