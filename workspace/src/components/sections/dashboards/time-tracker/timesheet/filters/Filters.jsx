import Button, { buttonClasses } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { users } from 'data/users';
import i18n from 'locales/i18n';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import FilterMenu from './FilterMenu';

const filterData = [
  {
    id: 1,
    get label() {
      return i18n.t('ui.sections.dashboards.time_tracker.timesheet.member_6853c98a');
    },
    field: 'member',
    items: [users[1], users[2], users[3], users[4]],
  },
  {
    id: 2,
    get label() {
      return i18n.t('ui.sections.dashboards.time_tracker.timesheet.team_21888726');
    },
    field: 'team',
    items: ['Team A', 'Team B', 'Team C'],
  },
  {
    id: 3,
    get label() {
      return i18n.t('ui.sections.dashboards.time_tracker.timesheet.time_frame_887ad0fa');
    },
    field: 'timeframe',
    items: ['last 7 days', 'last 2 weeks', 'last 30 days'],
  },
];
const Filters = ({ handleFilter, handleToggleFilterPanel }) => {
  const { up } = useBreakpoints();
  const upSm = up('sm');
  return (
    <>
      <Button
        variant="text"
        color="neutral"
        shape={upSm ? undefined : 'square'}
        onClick={handleToggleFilterPanel}
        startIcon={
          <IconifyIcon
            icon={
              upSm ? 'material-symbols:swap-vert-rounded' : 'material-symbols:filter-alt-outline'
            }
            sx={{ fontSize: '20px !important' }}
          />
        }
        sx={[
          { flexShrink: 0, order: { xs: 0, sm: 1 }, ml: { xs: 'auto', sm: 0 } },
          !upSm && {
            [`& .${buttonClasses.startIcon}`]: {
              m: 0,
            },
          },
        ]}
      >
        {upSm && 'More filters'}
      </Button>

      <Stack
        direction="row"
        sx={{ gap: 1, alignItems: 'center', width: { xs: 1, sm: 'auto' }, ml: { sm: 'auto' } }}
      >
        {filterData.map((item) => (
          <FilterMenu
            key={item.id}
            label={item.label}
            field={item.field}
            handleFilter={handleFilter}
            menuItems={item.items}
          />
        ))}
      </Stack>
    </>
  );
};
export default Filters;
