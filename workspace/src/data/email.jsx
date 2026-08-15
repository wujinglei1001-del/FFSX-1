import { Typography } from '@mui/material';
import { initialConfig } from 'config';
import dayjs from 'dayjs';
import i18n from 'locales/i18n';
import { users } from './users';

const gallery = (index) => `${initialConfig.assetsDir}/images/email/${index}.webp`;

export const defaultEmails = [
  'manami.suda@gmail.com',
  'okkotsu.yuta@gmail.com',
  'kugisaki.nobara@gmail.com',
  'todo.aoi@gmail.com',
  'tsukumo.yuki@gmail.com',
];

export const emailCategory = [
  {
    get title() {
      return i18n.t('ui.data.email.inbox_44caf746');
    },
    icon: 'material-symbols:inbox-outline-rounded',
  },
  {
    get title() {
      return i18n.t('ui.data.email.starred_e61561a8');
    },
    icon: 'material-symbols:star-rate-outline-rounded',
  },
  {
    get title() {
      return i18n.t('ui.data.email.snoozed_9be70f47');
    },
    icon: 'material-symbols:snooze-outline-rounded',
  },
  {
    get title() {
      return i18n.t('ui.data.email.sent_35f49dcf');
    },
    icon: 'material-symbols:send-outline-rounded',
  },
  {
    get title() {
      return i18n.t('ui.data.email.draft_23d33e22');
    },
    icon: 'material-symbols:draft-outline-rounded',
  },
  {
    get title() {
      return i18n.t('ui.data.email.important_4b6d6a30');
    },
    icon: 'material-symbols:label-important-outline-rounded',
  },
  {
    get title() {
      return i18n.t('ui.data.email.spam_d8628a52');
    },
    icon: 'material-symbols:report-outline-rounded',
  },
  {
    get title() {
      return i18n.t('ui.data.email.archived_eddc813f');
    },
    icon: 'material-symbols:archive-outline-rounded',
  },
  {
    get title() {
      return i18n.t('ui.data.email.trash_e3bf62bb');
    },
    icon: 'material-symbols:delete-outline-rounded',
  },
];

export const emails = [
  {
    id: 1,
    user: users[1],
    get subject() {
      return i18n.t('ui.data.email.meeting_confirmation_for_tomorrow_7d90ac5c');
    },
    get description() {
      return i18n.t('ui.data.email.hi_just_wanted_to_confirm_our_meeting_scheduled_for__53179f90');
    },
    details: (
      <>
        <Typography variant="body1">
          {i18n.t('ui.data.email.hello_merchant_captain_dbf7a8a4')}
        </Typography>
        <Typography variant="body1" sx={{ my: 3 }}>
          {i18n.t('ui.data.email.hi_just_wanted_to_confirm_our_meeting_scheduled_for__b211e4ab')}
        </Typography>
        <Typography variant="body1">
          {i18n.t('ui.data.email.best_regards_d0590a67')}
          {users[1].name}
        </Typography>
      </>
    ),
    time: dayjs().subtract(1, 'm').toDate(),
    starred: true,
    important: true,
    readAt: null,
    snoozedTill: null,
    folder: 'inbox',
    get label() {
      return i18n.t('ui.data.email.inbox_08a5564a');
    },
    attachments: [
      {
        id: 1,
        file: gallery(1),
        fileType: 'image',
      },
      {
        id: 2,
        file: gallery(2),
        fileType: 'image',
      },
      {
        id: 3,
        file: gallery(3),
        fileType: 'image',
      },
    ],
  },
  {
    id: 2,
    user: users[2],
    get subject() {
      return i18n.t('ui.data.email.edited_photos_from_the_shoot_44937e0e');
    },
    get description() {
      return i18n.t('ui.data.email.i_ve_completed_editing_the_photos_from_last_week_s_s_728aa933');
    },
    details: (
      <>
        <Typography variant="body1">
          {i18n.t('ui.data.email.hello_merchant_captain_dbf7a8a4')}
        </Typography>
        <Typography variant="body1" sx={{ my: 3 }}>
          {i18n.t('ui.data.email.i_ve_completed_editing_the_photos_from_last_week_s_s_44323151')}
        </Typography>
        <Typography variant="body1">
          {i18n.t('ui.data.email.best_regards_d0590a67')}
          {users[2].name}
        </Typography>
      </>
    ),
    time: dayjs().subtract(2, 'h').toDate(),
    starred: false,
    important: true,
    readAt: dayjs().toISOString(),
    snoozedTill: null,
    folder: 'sent',
    get label() {
      return i18n.t('ui.data.email.sent_27e7700f');
    },
  },
  {
    id: 3,
    user: users[3],
    get subject() {
      return i18n.t('ui.data.email.proposal_follow_up_9efd788f');
    },
    get description() {
      return i18n.t('ui.data.email.following_up_on_our_recent_conversation_regarding_th_7fe61317');
    },
    details: (
      <>
        <Typography variant="body1">
          {i18n.t('ui.data.email.hello_merchant_captain_dbf7a8a4')}
        </Typography>
        <Typography variant="body1" sx={{ my: 3 }}>
          {i18n.t('ui.data.email.following_up_on_our_recent_conversation_regarding_th_13e75a44')}
        </Typography>
        <Typography variant="body1">
          {i18n.t('ui.data.email.best_regards_d0590a67')}
          {users[3].name}
        </Typography>
      </>
    ),
    time: dayjs().subtract(5, 'h').toDate(),
    starred: true,
    important: false,
    readAt: dayjs().toISOString(),
    snoozedTill: null,
    folder: 'inbox',
    get label() {
      return i18n.t('ui.data.email.inbox_08a5564a');
    },
  },
  {
    id: 4,
    user: users[4],
    get subject() {
      return i18n.t('ui.data.email.bug_fixes_complete_33df48e5');
    },
    get description() {
      return i18n.t('ui.data.email.i_ve_addressed_the_bugs_in_the_codebase_including_th_2b831b64');
    },
    details: (
      <>
        <Typography variant="body1">
          {i18n.t('ui.data.email.hello_merchant_captain_dbf7a8a4')}
        </Typography>
        <Typography variant="body1" sx={{ my: 3 }}>
          {i18n.t('ui.data.email.i_ve_addressed_the_bugs_in_the_codebase_including_th_f798b79c')}
        </Typography>
        <Typography variant="body1">
          {i18n.t('ui.data.email.best_regards_d0590a67')}
          {users[4].name}
        </Typography>
      </>
    ),
    time: dayjs().subtract(8, 'h').toDate(),
    starred: false,
    important: false,
    readAt: dayjs().toISOString(),
    snoozedTill: null,
    folder: 'draft',
    get label() {
      return i18n.t('ui.data.email.draft_0e7766b4');
    },
  },
  {
    id: 5,
    user: users[5],
    get subject() {
      return i18n.t('ui.data.email.greetings_from_bali_fb82396c');
    },
    get description() {
      return i18n.t('ui.data.email.greetings_from_bali_the_trip_has_been_incredible_so__6a4606af');
    },
    details: (
      <>
        <Typography variant="body1">
          {i18n.t('ui.data.email.hello_merchant_captain_dbf7a8a4')}
        </Typography>
        <Typography variant="body1" sx={{ my: 3 }}>
          {i18n.t('ui.data.email.greetings_from_bali_the_trip_has_been_incredible_so__67580f9d')}
        </Typography>
        <Typography variant="body1">
          {i18n.t('ui.data.email.best_regards_d0590a67')}
          {users[5].name}
        </Typography>
      </>
    ),
    time: dayjs().subtract(1, 'd').toDate(),
    starred: false,
    important: false,
    readAt: null,
    snoozedTill: null,
    folder: 'inbox',
    get label() {
      return i18n.t('ui.data.email.inbox_08a5564a');
    },
  },
  {
    id: 6,
    user: users[6],
    get subject() {
      return i18n.t('ui.data.email.completed_financial_report_dba9c9b3');
    },
    get description() {
      return i18n.t('ui.data.email.the_financial_report_you_requested_is_now_complete_a_2ccfa1a3');
    },
    details: (
      <>
        <Typography variant="body1">
          {i18n.t('ui.data.email.hello_merchant_captain_dbf7a8a4')}
        </Typography>
        <Typography variant="body1" sx={{ my: 3 }}>
          {i18n.t('ui.data.email.the_financial_report_you_requested_is_now_complete_a_9ceb100a')}
        </Typography>
        <Typography variant="body1">
          {i18n.t('ui.data.email.best_regards_d0590a67')}
          {users[6].name}
        </Typography>
      </>
    ),
    time: dayjs().subtract(1, 'd').toDate(),
    starred: false,
    important: true,
    readAt: dayjs().toISOString(),
    snoozedTill: null,
    folder: 'spam',
    get label() {
      return i18n.t('ui.data.email.spam_ded982e7');
    },
  },
  {
    id: 7,
    user: users[7],
    get subject() {
      return i18n.t('ui.data.email.reviewed_documents_aebaf565');
    },
    get description() {
      return i18n.t('ui.data.email.thank_you_for_sharing_the_documents_i_ve_carefully_r_97fcfb1c');
    },
    details: (
      <>
        <Typography variant="body1">
          {i18n.t('ui.data.email.hello_merchant_captain_dbf7a8a4')}
        </Typography>
        <Typography variant="body1" sx={{ my: 3 }}>
          {i18n.t('ui.data.email.thank_you_for_sharing_the_documents_i_ve_carefully_r_0d9d902c')}
        </Typography>
        <Typography variant="body1">
          {i18n.t('ui.data.email.best_regards_d0590a67')}
          {users[7].name}
        </Typography>
      </>
    ),
    time: dayjs().subtract(1, 'd').hour(3).minute(11).second(0).toDate(),
    starred: true,
    important: true,
    readAt: null,
    snoozedTill: null,
    folder: 'inbox',
    get label() {
      return i18n.t('ui.data.email.inbox_08a5564a');
    },
  },
  {
    id: 8,
    user: users[8],
    get subject() {
      return i18n.t('ui.data.email.new_yoga_class_8e72dd02');
    },
    get description() {
      return i18n.t('ui.data.email.hope_this_message_finds_you_well_i_recently_discover_1712f457');
    },
    details: (
      <>
        <Typography variant="body1">
          {i18n.t('ui.data.email.hello_merchant_captain_dbf7a8a4')}
        </Typography>
        <Typography variant="body1" sx={{ my: 3 }}>
          {i18n.t('ui.data.email.hope_this_message_finds_you_well_i_recently_discover_3c9a6a89')}
        </Typography>
        <Typography variant="body1">
          {i18n.t('ui.data.email.best_regards_d0590a67')}
          {users[8].name}
        </Typography>
      </>
    ),
    time: dayjs().subtract(2, 'd').hour(3).minute(33).second(0).toDate(),
    starred: false,
    important: false,
    readAt: dayjs().toISOString(),
    snoozedTill: null,
    folder: 'trash',
    get label() {
      return i18n.t('ui.data.email.inbox_08a5564a');
    },
  },
  {
    id: 9,
    user: users[9],
    get subject() {
      return i18n.t('ui.data.email.team_meeting_reminder_1efdee34');
    },
    get description() {
      return i18n.t('ui.data.email.this_is_a_friendly_reminder_about_the_upcoming_team__9eeb6dc2');
    },
    details: (
      <>
        <Typography variant="body1">
          {i18n.t('ui.data.email.hello_merchant_captain_dbf7a8a4')}
        </Typography>
        <Typography variant="body1" sx={{ my: 3 }}>
          {i18n.t('ui.data.email.this_is_a_friendly_reminder_about_the_upcoming_team__ed8896ff')}
        </Typography>
        <Typography variant="body1">
          {i18n.t('ui.data.email.best_regards_d0590a67')}
          {users[9].name}
        </Typography>
      </>
    ),
    time: dayjs().subtract(2, 'd').hour(6).minute(11).second(0).toDate(),
    starred: true,
    important: false,
    readAt: null,
    snoozedTill: null,
    folder: 'inbox',
    get label() {
      return i18n.t('ui.data.email.inbox_08a5564a');
    },
  },
  {
    id: 10,
    user: users[10],
    get subject() {
      return i18n.t('ui.data.email.latest_artwork_preview_15114987');
    },
    get description() {
      return i18n.t('ui.data.email.thank_you_so_much_for_your_insightful_feedback_on_my_57d899d5');
    },
    details: (
      <>
        <Typography variant="body1">
          {i18n.t('ui.data.email.hello_merchant_captain_dbf7a8a4')}
        </Typography>
        <Typography variant="body1" sx={{ my: 3 }}>
          {i18n.t('ui.data.email.thank_you_so_much_for_your_insightful_feedback_on_my_ac07fc21')}
        </Typography>
        <Typography variant="body1">
          {i18n.t('ui.data.email.best_regards_d0590a67')}
          {users[10].name}
        </Typography>
      </>
    ),
    time: dayjs().subtract(3, 'd').hour(7).minute(5).second(0).toDate(),
    starred: false,
    important: false,
    readAt: dayjs().toISOString(),
    snoozedTill: null,
    folder: 'sent',
    get label() {
      return i18n.t('ui.data.email.sent_27e7700f');
    },
  },
  {
    id: 11,
    user: users[11],
    get subject() {
      return i18n.t('ui.data.email.course_details_attached_066e0244');
    },
    get description() {
      return i18n.t('ui.data.email.thank_you_for_expressing_interest_in_our_course_offe_8a715c5a');
    },
    details: (
      <>
        <Typography variant="body1">
          {i18n.t('ui.data.email.hello_merchant_captain_dbf7a8a4')}
        </Typography>
        <Typography variant="body1" sx={{ my: 3 }}>
          {i18n.t('ui.data.email.thank_you_for_expressing_interest_in_our_course_offe_971fe15c')}
        </Typography>
        <Typography variant="body1">
          {i18n.t('ui.data.email.best_regards_d0590a67')}
          {users[11].name}
        </Typography>
      </>
    ),
    time: dayjs().subtract(5, 'd').hour(10).minute(43).second(0).toDate(),
    starred: false,
    important: true,
    readAt: null,
    snoozedTill: null,
    folder: 'inbox',
    get label() {
      return i18n.t('ui.data.email.inbox_08a5564a');
    },
  },
  {
    id: 12,
    user: users[12],
    get subject() {
      return i18n.t('ui.data.email.new_chapter_draft_86706d2e');
    },
    get description() {
      return i18n.t('ui.data.email.i_m_excited_to_share_that_i_ve_started_drafting_the__8227e958');
    },
    details: (
      <>
        <Typography variant="body1">
          {i18n.t('ui.data.email.hello_merchant_captain_dbf7a8a4')}
        </Typography>
        <Typography variant="body1" sx={{ my: 3 }}>
          {i18n.t('ui.data.email.i_m_excited_to_share_that_i_ve_started_drafting_the__bf8a61ae')}
        </Typography>
        <Typography variant="body1">
          {i18n.t('ui.data.email.best_regards_d0590a67')}
          {users[12].name}
        </Typography>
      </>
    ),
    time: dayjs().subtract(3, 'day').hour(15).minute(10).second(0).toDate(),
    starred: true,
    important: false,
    readAt: dayjs().toISOString(),
    snoozedTill: null,
    folder: 'spam',
    get label() {
      return i18n.t('ui.data.email.spam_ded982e7');
    },
  },
  {
    id: 13,
    user: users[13],
    get subject() {
      return i18n.t('ui.data.email.updated_event_itinerary_92bbf468');
    },
    get description() {
      return i18n.t('ui.data.email.the_event_planning_is_nearing_completion_and_i_m_exc_4399af13');
    },
    details: (
      <>
        <Typography variant="body1">
          {i18n.t('ui.data.email.hello_merchant_captain_dbf7a8a4')}
        </Typography>
        <Typography variant="body1" sx={{ my: 3 }}>
          {i18n.t('ui.data.email.the_event_planning_is_nearing_completion_and_i_m_exc_0474df07')}
        </Typography>
        <Typography variant="body1">
          {i18n.t('ui.data.email.best_regards_d0590a67')}
          {users[13].name}
        </Typography>
      </>
    ),
    time: dayjs().subtract(3, 'h').toDate(),
    starred: false,
    important: true,
    readAt: null,
    snoozedTill: null,
    folder: 'inbox',
    get label() {
      return i18n.t('ui.data.email.inbox_08a5564a');
    },
  },
  {
    id: 14,
    user: users[14],
    get subject() {
      return i18n.t('ui.data.email.let_s_catch_up_over_dinner_7cfecc84');
    },
    get description() {
      return i18n.t('ui.data.email.i_hope_you_re_doing_well_it_feels_like_it_s_been_age_b68eac31');
    },
    details: (
      <>
        <Typography variant="body1">
          {i18n.t('ui.data.email.hello_merchant_captain_dbf7a8a4')}
        </Typography>
        <Typography variant="body1" sx={{ my: 3 }}>
          {i18n.t('ui.data.email.i_hope_you_re_doing_well_it_feels_like_it_s_been_age_c667086c')}
        </Typography>
        <Typography variant="body1">
          {i18n.t('ui.data.email.best_regards_d0590a67')}
          {users[14].name}
        </Typography>
      </>
    ),
    time: dayjs().subtract(1, 'd').hour(5).minute(10).second(0).toDate(),
    starred: true,
    important: true,
    readAt: dayjs().subtract(6, 'd').toISOString(),
    snoozedTill: null,
    folder: 'inbox',
    get label() {
      return i18n.t('ui.data.email.inbox_08a5564a');
    },
  },
  {
    id: 15,
    user: users[15],
    get subject() {
      return i18n.t('ui.data.email.reminder_productivity_workshop_this_thursday_826fca47');
    },
    get description() {
      return i18n.t('ui.data.email.just_a_quick_reminder_about_the_workshop_happening_t_c972fc9d');
    },
    details: (
      <>
        <Typography variant="body1">
          {i18n.t('ui.data.email.hello_merchant_captain_dbf7a8a4')}
        </Typography>
        <Typography variant="body1" sx={{ my: 3 }}>
          {i18n.t('ui.data.email.just_a_quick_reminder_about_the_workshop_happening_t_5c2683d6')}
        </Typography>
        <Typography variant="body1">
          {i18n.t('ui.data.email.best_regards_d0590a67')}
          {users[15].name}
        </Typography>
      </>
    ),
    time: dayjs().subtract(10, 'h').toDate(),
    starred: false,
    important: false,
    readAt: null,
    snoozedTill: dayjs().add(1, 'd').toDate(),
    folder: 'archived',
    get label() {
      return i18n.t('ui.data.email.sent_27e7700f');
    },
  },
  {
    id: 16,
    user: users[11],
    get subject() {
      return i18n.t('ui.data.email.request_for_feedback_on_presentation_draft_058fcaed');
    },
    get description() {
      return i18n.t('ui.data.email.i_ve_attached_the_draft_of_the_presentation_i_m_prep_96cde52f');
    },
    details: (
      <>
        <Typography variant="body1">
          {i18n.t('ui.data.email.hello_merchant_captain_dbf7a8a4')}
        </Typography>
        <Typography variant="body1" sx={{ my: 3 }}>
          {i18n.t('ui.data.email.i_ve_attached_the_draft_of_the_presentation_i_m_prep_39a7030e')}
        </Typography>
        <Typography variant="body1">
          {i18n.t('ui.data.email.best_regards_d0590a67')}
          {users[11].name}
        </Typography>
      </>
    ),
    time: dayjs().subtract(12, 'h').toDate(),
    starred: true,
    important: false,
    readAt: dayjs().subtract(2, 'h').toISOString(),
    snoozedTill: dayjs().add(1, 'd').toDate(),
    folder: 'spam',
    get label() {
      return i18n.t('ui.data.email.spam_ded982e7');
    },
  },
  {
    id: 17,
    user: users[10],
    get subject() {
      return i18n.t('ui.data.email.thank_you_for_today_s_meeting_4bb53146');
    },
    get description() {
      return i18n.t('ui.data.email.thank_you_for_taking_the_time_to_meet_today_i_apprec_aea93532');
    },
    details: (
      <>
        <Typography variant="body1">
          {i18n.t('ui.data.email.hello_merchant_captain_dbf7a8a4')}
        </Typography>
        <Typography variant="body1" sx={{ my: 3 }}>
          {i18n.t('ui.data.email.thank_you_for_taking_the_time_to_meet_today_i_apprec_5624210f')}
        </Typography>
        <Typography variant="body1">
          {i18n.t('ui.data.email.best_regards_d0590a67')}
          {users[10].name}
        </Typography>
      </>
    ),
    time: dayjs().subtract(7, 'd').hour(3).minute(20).second(0).toDate(),
    starred: false,
    important: false,
    readAt: null,
    snoozedTill: null,
    folder: 'inbox',
    get label() {
      return i18n.t('ui.data.email.inbox_08a5564a');
    },
  },
  {
    id: 18,
    user: users[0],
    get subject() {
      return i18n.t('ui.data.email.just_checking_in_80ac7af5');
    },
    get description() {
      return i18n.t('ui.data.email.i_hope_everything_s_going_well_on_your_end_i_just_wa_ee5a7167');
    },
    details: (
      <>
        <Typography variant="body1">
          {i18n.t('ui.data.email.hello_merchant_captain_dbf7a8a4')}
        </Typography>
        <Typography variant="body1" sx={{ my: 3 }}>
          {i18n.t('ui.data.email.i_hope_everything_s_going_well_on_your_end_i_just_wa_3ef554a3')}
        </Typography>
        <Typography variant="body1">
          {i18n.t('ui.data.email.best_regards_d0590a67')}
          {users[9].name}
        </Typography>
      </>
    ),
    time: dayjs().subtract(15, 'd').hour(5).minute(30).second(0).toDate(),
    starred: false,
    important: true,
    readAt: dayjs().subtract(10, 'h').toISOString(),
    snoozedTill: null,
    folder: 'inbox',
    get label() {
      return i18n.t('ui.data.email.inbox_08a5564a');
    },
  },
];
