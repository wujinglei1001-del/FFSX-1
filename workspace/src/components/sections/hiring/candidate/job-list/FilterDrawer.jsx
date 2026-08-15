import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon';
import FilterSection from './FilterSection';

const FilterDrawer = ({ open, handleClose }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={handleClose}
      anchor="right"
      slotProps={{
        paper: {
          background: 1,
        },
      }}
      sx={(theme) => ({
        [`& .${drawerClasses.paper}`]: {
          width: 300,
          border: 0,
          outline: `1px solid ${theme.vars.palette.divider}`,
        },
      })}
    >
      <Stack
        sx={{
          height: 1,
        }}
      >
        <Stack
          direction="row"
          sx={{
            py: 1,
            px: 3,
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'background.elevation1',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            {translateUi('ui.sections.hiring.candidate.job_list.filters_96e57821')}
          </Typography>
          <Button shape="circle" color="neutral" onClick={handleClose}>
            <IconifyIcon icon="material-symbols:close-rounded" sx={{ fontSize: 20 }} />
          </Button>
        </Stack>
        <Paper
          background={1}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexGrow: 1,
          }}
        >
          <Stack sx={{ p: 3 }}>
            <FilterSection
              name="Date Post"
              options={[
                {
                  label: translateUi('ui.sections.hiring.candidate.job_list.any_time_f7d51d14'),
                  value: 'anyTime',
                },
                {
                  label: translateUi(
                    'ui.sections.hiring.candidate.job_list.last_24_hours_99d63362',
                  ),
                  value: 'last24Hours',
                },
                {
                  label: translateUi('ui.sections.hiring.candidate.job_list.last_week_bc159a56'),
                  value: 'lastWeek',
                },
                {
                  label: translateUi('ui.sections.hiring.candidate.job_list.last_month_20fe4f42'),
                  value: 'lastMonth',
                },
              ]}
            />
            <FilterSection
              name="Work Mode"
              options={[
                {
                  label: translateUi('ui.sections.hiring.candidate.job_list.all_6a720856'),
                  value: 'all',
                },
                {
                  label: translateUi('ui.sections.hiring.candidate.job_list.on_site_bd28a79f'),
                  value: 'onSite',
                },
                {
                  label: translateUi('ui.sections.hiring.candidate.job_list.remote_c93f6536'),
                  value: 'remote',
                },
                {
                  label: translateUi('ui.sections.hiring.candidate.job_list.hybrid_8e01f6bc'),
                  value: 'hybrid',
                },
              ]}
            />
            <FilterSection
              name="Employment Type"
              options={[
                {
                  label: translateUi('ui.sections.hiring.candidate.job_list.all_6a720856'),
                  value: 'all',
                },
                {
                  label: translateUi('ui.sections.hiring.candidate.job_list.full_time_5fbd8fde'),
                  value: 'fullTime',
                },
                {
                  label: translateUi('ui.sections.hiring.candidate.job_list.part_time_c5a1ba67'),
                  value: 'partTime',
                },
                {
                  label: translateUi('ui.sections.hiring.candidate.job_list.contract_5a0ba3bb'),
                  value: 'contract',
                },
                {
                  label: translateUi('ui.sections.hiring.candidate.job_list.other_6e6a6f20'),
                  value: 'other',
                },
              ]}
            />
            <FilterSection
              name="Experience"
              options={[
                {
                  label: translateUi('ui.sections.hiring.candidate.job_list.all_6a720856'),
                  value: 'all',
                },
                {
                  label: translateUi('ui.sections.hiring.candidate.job_list.0_1_year_35f27a82'),
                  value: '0-1',
                },
                {
                  label: translateUi('ui.sections.hiring.candidate.job_list.1_3_years_e6b122f3'),
                  value: '1-3',
                },
                {
                  label: translateUi('ui.sections.hiring.candidate.job_list.3_5_years_0b951c58'),
                  value: '3-5',
                },
                {
                  label: translateUi('ui.sections.hiring.candidate.job_list.5_10_years_15148828'),
                  value: '5-10',
                },
                {
                  label: translateUi('ui.sections.hiring.candidate.job_list.10_years_294d4e0c'),
                  value: '10+',
                },
              ]}
            />
          </Stack>
          <Stack
            direction="row"
            sx={{
              gap: 1,
              px: 5,
              py: 3,
            }}
          >
            <Button color="neutral">
              {translateUi('ui.sections.hiring.candidate.job_list.clear_719ea396')}
            </Button>
            <Button variant="contained" fullWidth onClick={handleClose}>
              {translateUi('ui.sections.hiring.candidate.job_list.apply_cfea419c')}
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Drawer>
  );
};
export default FilterDrawer;
