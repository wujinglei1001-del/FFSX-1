import { useTranslation } from 'react-i18next';
import { Avatar, Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import i18n from 'locales/i18n';
import IconifyIcon from 'components/base/IconifyIcon';

const noShrink = { flexShrink: 0 };

const mdGridSx = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr)',
  gridTemplateRows: 'auto auto auto',
  gap: 2,
  columnGap: 3,
  width: 1,
};

const gridCell = (column, row) => ({
  gridColumn: column,
  gridRow: row,
});

const getProjectPercentages = (overview) => {
  const runningPct =
    overview.totalProjects > 0 ? (overview.runningProjects / overview.totalProjects) * 100 : 0;
  const donePct =
    overview.totalProjects > 0 ? (overview.doneProjects / overview.totalProjects) * 100 : 0;

  return { runningPct, donePct };
};

const StatRow = ({ label, value, sx }) => (
  <Stack
    direction="row"
    sx={{ flexWrap: 'nowrap', justifyContent: 'space-between', width: 1, ...sx }}
  >
    <Typography variant="subtitle2" sx={noShrink}>
      {label}
    </Typography>
    <Typography variant="subtitle2" sx={{ color: 'text.secondary', ...noShrink }}>
      {value}
    </Typography>
  </Stack>
);

const WrapRow = ({ label, sx, children }) => (
  <Stack
    direction="row"
    sx={{
      flexWrap: 'wrap',
      width: 1,
      gap: 0.5,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      ...sx,
    }}
  >
    <Typography variant="subtitle2" sx={noShrink}>
      {label}
    </Typography>
    {children}
  </Stack>
);

const GridDivider = ({ column }) => (
  <Divider orientation="vertical" flexItem sx={{ gridColumn: column, gridRow: '1 / -1', mx: 0 }} />
);

const OwnerRow = ({ avatar, name, avatarSize = 28 }) => (
  <Stack direction="row" sx={{ justifyContent: 'space-between', width: 1, alignItems: 'center' }}>
    <Typography variant="subtitle2">
      {i18n.t('ui.sections.project.team_member_list.teammemberoverviewcard.owner_719379ae')}
    </Typography>
    <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
      <Avatar src={avatar} sx={{ width: avatarSize, height: avatarSize }} />
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        {name}
      </Typography>
    </Stack>
  </Stack>
);

const ViewProjectsButton = () => (
  <Button
    variant="text"
    color="primary"
    endIcon={<IconifyIcon icon="material-symbols:chevron-right-rounded" fontSize={20} />}
    sx={{ alignSelf: 'flex-start' }}
  >
    {i18n.t('ui.sections.project.team_member_list.teammemberoverviewcard.view_projects_f2187c88')}
  </Button>
);

const ProjectStats = ({ runningProjects, doneProjects, runningPct, donePct, labelsSx, barSx }) => (
  <Stack sx={{ gap: 1 }}>
    <Stack
      direction="row"
      sx={{ flexWrap: 'nowrap', justifyContent: 'space-between', width: 1, ...labelsSx }}
    >
      <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, ...noShrink }}>
        {i18n.t('ui.sections.project.team_member_list.teammemberoverviewcard.running_07518f09')}{' '}
        <Box component="span" sx={{ fontWeight: 400 }}>
          {runningProjects}
        </Box>
      </Typography>
      <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600, ...noShrink }}>
        {i18n.t('ui.sections.project.team_member_list.teammemberoverviewcard.done_7dd815b7')}{' '}
        <Box component="span" sx={{ fontWeight: 400 }}>
          {doneProjects}
        </Box>
      </Typography>
    </Stack>
    <Stack
      direction="row"
      sx={{
        width: 1,
        gap: '2px',
        height: 8,
        borderRadius: 0.5,
        overflow: 'hidden',
        ...barSx,
      }}
    >
      <Box sx={{ width: `${runningPct}%`, bgcolor: 'primary.main' }} />
      <Box sx={{ width: `${donePct}%`, bgcolor: 'success.main' }} />
    </Stack>
  </Stack>
);

const OverviewMdGrid = ({ stats }) => {
  const { t: translateUi } = useTranslation();
  const { overview, memberCount, adminCount, moderatorCount, runningPct, donePct } = stats;

  return (
    <Stack sx={{ display: { xs: 'none', md: 'flex', lg: 'none' }, gap: 2 }}>
      <Box sx={mdGridSx}>
        <WrapRow
          label={translateUi(
            'ui.sections.project.team_member_list.teammemberoverviewcard.team_created_on_101dc6c5',
          )}
          sx={gridCell(1, 1)}
        >
          <Typography
            variant="subtitle2"
            sx={{ color: 'text.secondary', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            {overview.createdOn}
          </Typography>
        </WrapRow>

        <StatRow
          label={translateUi(
            'ui.sections.project.team_member_list.teammemberoverviewcard.no_of_members_059594d2',
          )}
          value={memberCount}
          sx={gridCell(1, 2)}
        />

        <GridDivider column={2} />

        <WrapRow
          label={translateUi(
            'ui.sections.project.team_member_list.teammemberoverviewcard.owner_719379ae',
          )}
          sx={{ ...gridCell(3, 1), gap: 1, alignItems: 'center' }}
        >
          <Stack
            direction="row"
            sx={{ alignItems: 'center', gap: 1, flexShrink: 0, whiteSpace: 'nowrap' }}
          >
            <Avatar src={overview.owner.avatar} sx={{ width: 24, height: 24, flexShrink: 0 }} />
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
              {overview.owner.name}
            </Typography>
          </Stack>
        </WrapRow>

        <StatRow
          label={translateUi(
            'ui.sections.project.team_member_list.teammemberoverviewcard.no_of_admins_0afb02d4',
          )}
          value={adminCount}
          sx={gridCell(3, 2)}
        />
        <StatRow
          label={translateUi(
            'ui.sections.project.team_member_list.teammemberoverviewcard.no_of_moderators_f018fe0c',
          )}
          value={moderatorCount}
          sx={gridCell(3, 3)}
        />

        <GridDivider column={4} />

        <StatRow
          label={translateUi(
            'ui.sections.project.team_member_list.teammemberoverviewcard.total_projects_2a3e9e70',
          )}
          value={overview.totalProjects}
          sx={gridCell(5, 1)}
        />
        <ProjectStats
          runningProjects={overview.runningProjects}
          doneProjects={overview.doneProjects}
          runningPct={runningPct}
          donePct={donePct}
          labelsSx={gridCell(5, 2)}
          barSx={{ ...gridCell(5, 3), alignSelf: 'start' }}
        />
      </Box>

      <ViewProjectsButton />
    </Stack>
  );
};

const OverviewStacked = ({ stats }) => {
  const { t: translateUi } = useTranslation();
  const { overview, memberCount, adminCount, moderatorCount, runningPct, donePct } = stats;

  return (
    <Stack sx={{ gap: 2, display: { xs: 'flex', md: 'none', lg: 'flex' } }}>
      <StatRow
        label={translateUi(
          'ui.sections.project.team_member_list.teammemberoverviewcard.team_created_on_101dc6c5',
        )}
        value={overview.createdOn}
      />
      <StatRow
        label={translateUi(
          'ui.sections.project.team_member_list.teammemberoverviewcard.no_of_members_059594d2',
        )}
        value={memberCount}
      />

      <Divider sx={{ my: 1 }} />

      <OwnerRow avatar={overview.owner.avatar} name={overview.owner.name} />
      <StatRow
        label={translateUi(
          'ui.sections.project.team_member_list.teammemberoverviewcard.no_of_admins_0afb02d4',
        )}
        value={adminCount}
      />
      <StatRow
        label={translateUi(
          'ui.sections.project.team_member_list.teammemberoverviewcard.no_of_moderators_f018fe0c',
        )}
        value={moderatorCount}
      />

      <Divider sx={{ my: 1 }} />

      <StatRow
        label={translateUi(
          'ui.sections.project.team_member_list.teammemberoverviewcard.total_projects_2a3e9e70',
        )}
        value={overview.totalProjects}
      />
      <ProjectStats
        runningProjects={overview.runningProjects}
        doneProjects={overview.doneProjects}
        runningPct={runningPct}
        donePct={donePct}
      />

      <ViewProjectsButton />
    </Stack>
  );
};

const TeamMemberOverviewCard = ({ overview, memberCount, adminCount, moderatorCount }) => {
  const { runningPct, donePct } = getProjectPercentages(overview);
  const stats = { overview, memberCount, adminCount, moderatorCount, runningPct, donePct };

  return (
    <Paper background={1} sx={{ width: 1, borderRadius: 4, p: 3, outline: 'none' }}>
      <OverviewMdGrid stats={stats} />
      <OverviewStacked stats={stats} />
    </Paper>
  );
};

export default TeamMemberOverviewCard;
