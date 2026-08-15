import dayjs from 'dayjs';
import i18n from 'locales/i18n';

const currentDay = dayjs && dayjs().format('DD');
const currentMonth = dayjs && dayjs().format('MM');

const currentYear = dayjs && dayjs().format('YYYY');

const getTime = (time, dayOffset = 0) =>
  dayjs(`${currentYear}-${currentMonth}-${currentDay} ${time}`)
    .add(dayOffset, 'day')
    .format('YYYY-MM-DD HH:mm:ss');

export const eventList = [
  {
    id: '1',
    get title() {
      return i18n.t('ui.data.calendar.project_deadline_112c9073');
    },
    category: 'workshop',
    start: `${currentYear}-${currentMonth}-02 00:00:00`,
    end: `${currentYear}-${currentMonth}-04 12:59:00`,
    allDay: true,
    get description() {
      return i18n.t(
        'ui.data.calendar.important_deadline_for_project_completion_ensure_all_485f90e3',
      );
    },
    eventType: 'hybrid',
    location: '',
    url: '',
  },
  {
    id: '2',
    get title() {
      return i18n.t('ui.data.calendar.team_meeting_02acb0c2');
    },
    category: 'meeting',
    start: `${currentYear}-${currentMonth}-${currentDay} 10:05:00`,
    end: `${currentYear}-${currentMonth}-${currentDay} 11:55:00`,
    allDay: false,
    get description() {
      return i18n.t(
        'ui.data.calendar.weekly_team_sync_up_to_discuss_progress_and_blockers_dcae5638',
      );
    },
    eventType: 'hybrid',
    location: '',
    url: '',
  },
  {
    id: '3',
    get title() {
      return i18n.t('ui.data.calendar.client_call_8966f6c1');
    },
    category: 'party',
    start: `${currentYear}-${currentMonth}-01 11:05:00`,
    end: `${currentYear}-${currentMonth}-01 11:55:00`,
    allDay: false,
    get description() {
      return i18n.t(
        'ui.data.calendar.discussion_with_the_client_regarding_project_updates_c241f5b7',
      );
    },
    eventType: 'hybrid',
    location: '',
    url: '',
  },
  {
    id: '4',
    get title() {
      return i18n.t('ui.data.calendar.company_event_c0bc98fb');
    },
    category: 'webinar',
    start: `${currentYear}-${currentMonth}-15 00:00:00`,
    end: `${currentYear}-${currentMonth}-16 12:59:00`,
    allDay: true,
    get description() {
      return i18n.t(
        'ui.data.calendar.company_wide_event_to_celebrate_milestones_and_achie_9b18dbc0',
      );
    },
    eventType: 'hybrid',
    location: '',
    url: '',
  },
  {
    id: '5',
    get title() {
      return i18n.t('ui.data.calendar.weekly_sync_up_c40317f9');
    },
    category: 'webinar',
    start: `${currentYear}-${currentMonth}-16 00:00:00`,
    end: `${currentYear}-${currentMonth}-17 12:59:00`,
    allDay: true,
    get description() {
      return i18n.t(
        'ui.data.calendar.regular_check_in_to_align_on_team_priorities_and_tas_a544e249',
      );
    },
    eventType: 'hybrid',
    location: '',
    url: '',
  },
];

export const taskList = [
  {
    id: '6',
    get title() {
      return i18n.t('ui.data.calendar.kickoff_03e7cbdc');
    },
    start: `${currentYear}-${currentMonth}-${currentDay} 10:55:00`,
    end: `${currentYear}-${currentMonth}-${currentDay}`,
    allDay: false,
    get description() {
      return i18n.t('ui.data.calendar.discuss_project_goals_and_timelines_776da1ef');
    },
    selectedList: 'work',
    repeated: 'weekly',
  },
  {
    id: '7',
    get title() {
      return i18n.t('ui.data.calendar.code_review_33157d99');
    },
    start: `${currentYear}-${currentMonth}-${currentDay} 15:05:00`,
    end: `${currentYear}-${currentMonth}-${currentDay}`,
    allDay: false,
    get description() {
      return i18n.t('ui.data.calendar.review_prs_and_discuss_improvements_00afb2ff');
    },
    selectedList: 'development',
    repeated: 'weekly',
  },
  {
    id: '8',
    get title() {
      return i18n.t('ui.data.calendar.appointment_2d05c593');
    },
    start: `${currentYear}-${currentMonth}-07 09:05:00`,
    end: `${currentYear}-${currentMonth}-07`,
    allDay: false,
    get description() {
      return i18n.t('ui.data.calendar.annual_health_checkup_2c707058');
    },
    selectedList: 'personal',
    repeated: 'weekly',
  },
  {
    id: '9',
    get title() {
      return i18n.t('ui.data.calendar.team_lunch_a44d5941');
    },
    start: `${currentYear}-${currentMonth}-10 13:05:00`,
    end: `${currentYear}-${currentMonth}-10`,
    allDay: false,
    get description() {
      return i18n.t('ui.data.calendar.casual_team_bonding_over_lunch_0df2ae23');
    },
    selectedList: 'work',
    repeated: 'weekly',
  },
  {
    id: '10',
    get title() {
      return i18n.t('ui.data.calendar.reports_88bc3fe3');
    },
    start: `${currentYear}-${currentMonth}-12 16:05:00`,
    end: `${currentYear}-${currentMonth}-12`,
    allDay: false,
    get description() {
      return i18n.t('ui.data.calendar.submit_weekly_progress_report_to_management_2392915a');
    },
    selectedList: 'work',
    repeated: 'weekly',
  },
];

export const appointments = [
  {
    id: '1',
    get title() {
      return i18n.t('ui.data.calendar.boot_camp_257feb49');
    },
    get description() {
      return i18n.t('ui.data.calendar.boot_camp_11ee00aa');
    },
    start: getTime('00:05:00', -1),
    end: getTime('00:50:00', -1),
    location: 'Gym',
    url: 'https://meet.google.com',
    category: 'task',
    allDay: false,
  },
  {
    id: '2',
    get title() {
      return i18n.t('ui.data.calendar.team_meeting_02acb0c2');
    },
    get description() {
      return i18n.t('ui.data.calendar.boot_camp_11ee00aa');
    },
    start: getTime('01:05:00'),
    end: getTime('03:30:00'),
    location: '',
    url: 'https://meet.google.com',
    category: 'task',
    allDay: false,
  },
  {
    id: '3',
    get title() {
      return i18n.t('ui.data.calendar.team_meeting_02acb0c2');
    },
    get description() {
      return i18n.t('ui.data.calendar.boot_camp_11ee00aa');
    },
    start: getTime('02:05:00', 1),
    end: getTime('03:55:00', 1),
    location: '',
    url: 'https://meet.google.com',
    category: 'task',
    allDay: false,
  },
  {
    id: '4',
    get title() {
      return i18n.t('ui.data.calendar.team_meeting_02acb0c2');
    },
    get description() {
      return i18n.t('ui.data.calendar.boot_camp_11ee00aa');
    },
    start: getTime('04:05:00', 3),
    end: getTime('04:55:00', 3),
    location: '',
    url: 'https://meet.google.com',
    category: 'task',
    allDay: false,
  },
  {
    id: '5',
    get title() {
      return i18n.t('ui.data.calendar.team_meeting_02acb0c2');
    },
    get description() {
      return i18n.t('ui.data.calendar.boot_camp_11ee00aa');
    },
    start: getTime('06:05:00', -1),
    end: getTime('07:25:00', -1),
    location: '',
    url: 'https://meet.google.com',
    allDay: false,
    category: 'task',
  },
  {
    id: '6',
    get title() {
      return i18n.t('ui.data.calendar.team_meeting_02acb0c2');
    },
    get description() {
      return i18n.t('ui.data.calendar.boot_camp_11ee00aa');
    },
    start: getTime('17:05:00', -1),
    end: getTime('18:55:00', -1),
    location: '',
    url: 'https://meet.google.com',
    category: 'task',
    allDay: false,
  },
  {
    id: '7',
    get title() {
      return i18n.t('ui.data.calendar.team_meeting_02acb0c2');
    },
    get description() {
      return i18n.t('ui.data.calendar.boot_camp_11ee00aa');
    },
    start: getTime('01:05:00', 1),
    end: getTime('01:55:00', 1),
    location: '',
    url: 'https://meet.google.com',
    category: 'task',
    allDay: false,
  },
  {
    id: '8',
    get title() {
      return i18n.t('ui.data.calendar.team_meeting_02acb0c2');
    },
    get description() {
      return i18n.t('ui.data.calendar.boot_camp_11ee00aa');
    },
    start: getTime('06:05:00', 2),
    end: getTime('07:55:00', 2),
    location: '',
    url: 'https://meet.google.com',
    category: 'task',
    allDay: false,
  },
  {
    id: '9',
    get title() {
      return i18n.t('ui.data.calendar.team_meeting_02acb0c2');
    },
    get description() {
      return i18n.t('ui.data.calendar.boot_camp_11ee00aa');
    },
    start: getTime('', 2),
    end: getTime('', 2),
    location: '',
    url: 'https://meet.google.com',
    allDay: true,
    category: 'task',
  },
  {
    id: '10',
    get title() {
      return i18n.t('ui.data.calendar.team_meeting_02acb0c2');
    },
    get description() {
      return i18n.t('ui.data.calendar.boot_camp_11ee00aa');
    },
    start: getTime('', -2),
    end: getTime('', -2),
    location: '',
    url: 'https://meet.google.com',
    allDay: true,
    category: 'task',
  },
];

export const eventCategories = [
  {
    get label() {
      return i18n.t('ui.data.calendar.meeting_17dc9a83');
    },
    value: 'meeting',
    color: 'primary',
  },
  {
    get label() {
      return i18n.t('ui.data.calendar.conference_8a1e29b3');
    },
    value: 'conference',
    color: 'secondary',
  },
  {
    get label() {
      return i18n.t('ui.data.calendar.workshop_13b8fe38');
    },
    value: 'workshop',
    color: 'error',
  },
  {
    get label() {
      return i18n.t('ui.data.calendar.webinar_2b6cc2bc');
    },
    value: 'webinar',
    color: 'info',
  },
  {
    get label() {
      return i18n.t('ui.data.calendar.party_60b18fc8');
    },
    value: 'party',
    color: 'success',
  },
];

export const categoryColorMap = {
  meeting: 'primary',
  conference: 'secondary',
  webinar: 'info',
  workshop: 'error',
  party: 'success',
  training: 'warning',
};
