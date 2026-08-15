import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import i18n from 'locales/i18n';

const legends = [
  {
    get label() {
      return i18n.t('ui.sections.dashboards.employee.attendance.on_time_1f003f21');
    },
    color: 'chGreen.100',
  },
  {
    get label() {
      return i18n.t('ui.sections.dashboards.employee.attendance.delay_b4c200bb');
    },
    color: 'chOrange.100',
  },
  {
    get label() {
      return i18n.t('ui.sections.dashboards.employee.attendance.absent_e92452c8');
    },
    color: 'chRed.100',
  },
  {
    get label() {
      return i18n.t('ui.sections.dashboards.employee.attendance.leave_7e3520a9');
    },
    color: 'chBlue.100',
  },
];

const CalendarLegend = () => {
  return (
    <Stack
      direction="row"
      sx={{
        gap: 3,
        alignItems: 'center',
      }}
    >
      {legends.map((legend, index) => (
        <Stack
          key={index}
          direction="row"
          sx={{
            gap: 1,
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: 10, height: 10, borderRadius: 9999, bgcolor: legend.color }} />
          <Typography
            component="span"
            variant="caption"
            sx={{ color: 'text.secondary', lineHeight: 1.5 }}
          >
            {legend.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default CalendarLegend;
