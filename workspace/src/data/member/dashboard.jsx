import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { users } from 'data/users';
import i18n from 'locales/i18n';

export const timeOffData = [
  { id: 1, leaveType: 'Paid Leave', left: 3, total: 4 },
  { id: 2, leaveType: 'Casual Leave', left: 3, total: 4 },
  { id: 3, leaveType: 'Sick Leave', left: 3, total: 4 },
  { id: 4, leaveType: 'Public Holidays', left: 3, total: 4 },
  { id: 5, leaveType: 'Maternity Leave', left: 10, total: 12 },
  { id: 6, leaveType: 'Bereavement Leave', left: 2, total: 3 },
];

export const timeAtWorkData = [
  { day: 'Sunday', value: 61 },
  { day: 'Monday', value: 61 },
  { day: 'Tuesday', value: 89.78 },
  { day: 'Wednesday', value: 71 },
  { day: 'Thursday', value: 80 },
  { day: 'Friday', value: 89.43 },
  { day: 'Saturday', value: 68.55 },
];

export const toDoListsData = [
  {
    icon: { src: 'material-symbols:group-outline', color: 'primary' },
    content: (
      <Stack
        sx={{
          gap: 0.5,
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <Box component="strong" sx={{ fontWeight: 700, color: 'text.primary' }}>
            {i18n.t('ui.data.member.dashboard.albus_dumbldore_69bd1056')}
          </Box>
          {` `}
          {i18n.t('ui.data.member.dashboard.requested_a_meeting_6c25314f')}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {i18n.t('ui.data.member.dashboard.in_1_month_ff6cb28d')}
        </Typography>
      </Stack>
    ),
  },
  {
    icon: { src: 'material-symbols:draw-outline-rounded', color: 'success' },
    content: (
      <Stack
        sx={{
          gap: 0.5,
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <Box component="strong" sx={{ fontWeight: 700, color: 'text.primary' }}>
            w-8ben
          </Box>
          {` `}
          {i18n.t('ui.data.member.dashboard.is_waiting_for_your_signature_a7491ce4')}
        </Typography>
        <Chip color="warning" label={i18n.t('ui.data.member.dashboard.due_145caf29')} />
      </Stack>
    ),
  },
  {
    icon: { src: 'material-symbols:group-outline', color: 'primary' },
    content: (
      <Stack
        sx={{
          gap: 0.5,
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <Box component="strong" sx={{ fontWeight: 700, color: 'text.primary' }}>
            {i18n.t('ui.data.member.dashboard.albus_dumbldore_69bd1056')}
          </Box>
          {` `}
          {i18n.t('ui.data.member.dashboard.requested_a_meeting_6c25314f')}
        </Typography>
        <Chip color="neutral" label={i18n.t('ui.data.member.dashboard.cancelled_a1bf92ef')} />
      </Stack>
    ),
  },
  {
    icon: { src: 'material-symbols:draw-outline-rounded', color: 'success' },
    content: (
      <Stack
        sx={{
          gap: 0.5,
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {i18n.t('ui.data.member.dashboard.redrafted_benefit_form_e4452c51')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {i18n.t(
            'ui.data.member.dashboard.of_jacob_kowalski_is_waiting_for_your_signature_a9f0cdc6',
          )}
        </Typography>
        <Chip color="warning" label={i18n.t('ui.data.member.dashboard.due_145caf29')} />
      </Stack>
    ),
  },
  {
    icon: { src: 'material-symbols:reviews-outline-rounded', color: 'primary' },
    content: (
      <Stack
        sx={{
          gap: 0.5,
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {i18n.t('ui.data.member.dashboard.performance_review_52bcf8ac')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {i18n.t('ui.data.member.dashboard.of_arthur_weasley_in_is_ready_for_you_1e16fecc')}
        </Typography>
        <Chip color="warning" label={i18n.t('ui.data.member.dashboard.due_145caf29')} />
      </Stack>
    ),
  },
  {
    icon: { src: 'material-symbols:assignment-outline-rounded', color: 'warning' },
    content: (
      <Stack
        sx={{
          gap: 0.5,
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {i18n.t('ui.data.member.dashboard.onboarding_checklist_ad4f37eb')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {i18n.t('ui.data.member.dashboard.of_hermione_granger_is_incomplete_e66c61e2')}
        </Typography>
        <Chip color="error" label={i18n.t('ui.data.member.dashboard.overdue_07217c77')} />
      </Stack>
    ),
  },
];

export const attendanceData = [
  {
    day: 1,
    status: 'ON TIME',
  },
  {
    day: 2,
    status: 'ON TIME',
  },
  {
    day: 3,
    status: 'ABSENT',
  },
  {
    day: 4,
    status: 'ON TIME',
  },
  {
    day: 5,
    status: 'DELAYED',
  },
  {
    day: 6,
    status: 'ON TIME',
  },
  {
    day: 7,
    status: 'ON TIME',
  },
  {
    day: 8,
    status: 'DELAYED',
  },
  {
    day: 9,
    status: 'ON TIME',
  },
  {
    day: 10,
    status: 'ON TIME',
  },
  {
    day: 11,
    status: 'LEAVE',
  },
  {
    day: 12,
    status: 'ON TIME',
  },
  {
    day: 13,
    status: 'LEAVE',
  },
  {
    day: 14,
    status: 'DELAYED',
  },
  {
    day: 15,
    status: 'ON TIME',
  },
  {
    day: 16,
    status: 'ABSENT',
  },
  {
    day: 17,
    status: 'ON TIME',
  },
  {
    day: 18,
    status: 'ON TIME',
  },
  {
    day: 19,
    status: 'ON TIME',
  },

  {
    day: 20,
    status: 'ON TIME',
  },
  {
    day: 21,
    status: 'ON TIME',
  },
  {
    day: 22,
    status: 'ON TIME',
  },
  {
    day: 23,
    status: 'ON TIME',
  },
  {
    day: 24,
    status: 'ON TIME',
  },
  {
    day: 25,
    status: 'ON TIME',
  },
  {
    day: 26,
    status: 'ON TIME',
  },
  {
    day: 27,
    status: 'ON TIME',
  },
  {
    day: 28,
    status: 'ON TIME',
  },
  {
    day: 29,
    status: 'LEAVE',
  },
  {
    day: 30,
    status: 'ON TIME',
  },
  {
    day: 31,
    status: 'DELAYED',
  },
];

export const leaveTodayData = [
  { ...users[2], designation: 'Frontend Developer', empID: 'EMP001' }, //
  { ...users[13], designation: 'Backend Developer', empID: 'EMP002' }, //
  { ...users[15], designation: 'Full Stack Developer', empID: 'EMP003' }, //
  { ...users[3], designation: 'DevOps Engineer', empID: 'EMP004' }, //
  { ...users[12], designation: 'Data Scientist', empID: 'EMP005' },
  { ...users[9], designation: 'Quality Assurance Engineer', empID: 'EMP008' }, //
  { ...users[10], designation: 'Systems Analyst', empID: 'EMP009' }, //
  { ...users[11], designation: 'UX Engineer', empID: 'EMP010' }, //
];

export const leaveHistoryDara = [
  {
    id: 1,
    date: new Date(2026, 2, 15),
    reason: 'Sick Leave',
  },
  {
    id: 2,
    date: [new Date(2025, 0, 2), new Date(2025, 0, 3)],
    reason: 'Sick Leave',
  },
  {
    id: 3,
    date: new Date(2024, 3, 10),
    reason: 'Sick Leave',
  },
  {
    id: 4,
    date: new Date(2024, 4, 5),
    reason: 'Vacation',
  },
  {
    id: 5,
    date: new Date(2025, 5, 20),
    reason: 'Paid Leave',
  },
  {
    id: 6,
    date: new Date(2025, 6, 30),
    reason: 'Sick Leave',
  },
  {
    id: 7,
    date: [new Date(2025, 9, 14), new Date(2025, 9, 17)],
    reason: 'Casual Leave',
  },
  {
    id: 8,
    date: new Date(2026, 1, 3),
    reason: 'Bereavement Leave',
  },
];
