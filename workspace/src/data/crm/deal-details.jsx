import { Avatar } from '@mui/material';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { initialConfig } from 'config';
import { users } from 'data/users';
import dayjs from 'dayjs';
import useNumberFormat from 'hooks/useNumberFormat';
import { generateUniqueId, getPercentageStr } from 'lib/utils';
import i18n from 'locales/i18n';
import Logo from 'components/common/Logo';

const image = (index) => `${initialConfig.assetsDir}/images/crm/deal-details/${index}.webp`;
const audio = (name) => `${initialConfig.assetsDir}/audio/${name}.mp3`;
const FormattedCurrency = ({ amount }) => {
  const { currencyFormat } = useNumberFormat();
  return currencyFormat(amount);
};

export const dealInformation = [
  {
    id: 1,
    attribute: 'Last updated',
    value: (
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', textDecoration: 'underline', textUnderlineOffset: 2 }}
      >
        {dayjs('2025-01-23').format('DD MMM, YYYY')}
      </Typography>
    ),
    background: true,
  },
  {
    id: 2,
    attribute: 'Deal Details',
    value: (
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {i18n.t(
          'ui.data.crm.deal_details.saying_i_notice_you_re_a_nerd_is_like_saying_hey_i_n_7136bcc3',
        )}
      </Typography>
    ),
    background: false,
  },
  {
    id: 3,
    attribute: 'Create Date',
    value: (
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', textDecoration: 'underline', textUnderlineOffset: 2 }}
      >
        {dayjs('2025-01-23').format('DD MMM, YYYY')}
      </Typography>
    ),
    background: true,
  },
  {
    id: 4,
    attribute: 'Created By',
    value: (
      <Chip
        label={i18n.t('ui.data.crm.deal_details.gerard_p_25428c40')}
        avatar={<Avatar src={users[7].avatar} sx={{ width: 16, height: 16 }} />}
        variant="soft"
      />
    ),
    background: false,
  },
  {
    id: 5,
    attribute: 'Current Stage',
    value: (
      <Chip
        label={i18n.t('ui.data.crm.deal_details.presentation_scheduled_b577d247')}
        variant="soft"
        color="warning"
      />
    ),
    background: true,
  },
  {
    id: 6,
    attribute: 'Closing Date',
    value: (
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', textDecoration: 'underline', textUnderlineOffset: 2 }}
      >
        {dayjs('2025-01-23').format('DD MMM, YYYY')}
      </Typography>
    ),
    background: false,
  },
  {
    id: 7,
    attribute: 'Associated Contact',
    value: (
      <Typography
        variant="body2"
        sx={{ color: 'primary.main', textDecoration: 'underline', textUnderlineOffset: 2 }}
      >
        {i18n.t('ui.data.crm.deal_details.tsamina_mina_f6bd64fe')}
      </Typography>
    ),
    background: true,
  },
  {
    id: 8,
    attribute: 'Priority',
    value: (
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', textDecoration: 'underline', textUnderlineOffset: 2 }}
      >
        {i18n.t('ui.data.crm.deal_details.not_set_ef374c57')}
      </Typography>
    ),
    background: false,
  },
  {
    id: 9,
    attribute: 'Deal Owner',
    value: (
      <Chip
        label={i18n.t('ui.data.crm.deal_details.gerard_p_25428c40')}
        avatar={<Avatar src={users[7].avatar} sx={{ width: 16, height: 16 }} />}
        variant="soft"
      />
    ),
    background: true,
  },
  {
    id: 10,
    attribute: 'Collaborating Agents',
    value: (
      <Chip
        label={i18n.t('ui.data.crm.deal_details.isaac_n_a8a82273')}
        avatar={<Avatar src={users[11].avatar} sx={{ width: 16, height: 16 }} />}
        variant="soft"
      />
    ),
    background: false,
  },
  {
    id: 11,
    attribute: 'Budget Forecast',
    value: (
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', textDecoration: 'underline', textUnderlineOffset: 2 }}
      >
        <FormattedCurrency amount={105000} />
      </Typography>
    ),
    background: true,
  },
  {
    id: 12,
    attribute: 'Forecast Category',
    value: (
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', textDecoration: 'underline', textUnderlineOffset: 2 }}
      >
        {i18n.t('ui.data.crm.deal_details.best_case_0c2cb6b4')}
      </Typography>
    ),
    background: false,
  },
  {
    id: 13,
    attribute: 'Deal Probability',
    value: (
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', textDecoration: 'underline', textUnderlineOffset: 2 }}
      >
        {getPercentageStr(35)}
      </Typography>
    ),
    background: true,
  },
];

export const activitySummary = {
  summary: [
    { id: 'call', icon: 'material-symbols:call-outline', attribute: 'Calls', value: 2 },
    { id: 'email', icon: 'material-symbols:mail-outline', attribute: 'Emails', value: 3 },
    { id: 'meeting', icon: 'material-symbols:group-outline', attribute: 'Meeting', value: 3 },
  ],
  timeline: [
    {
      id: 1,
      get title() {
        return i18n.t('ui.data.crm.deal_details.meeting_with_client_35a3673d');
      },
      get description() {
        return i18n.t('ui.data.crm.deal_details.discussed_project_scope_and_deliverables_86410590');
      },
      date: dayjs('2025-01-21').format('DD MMM, YYYY'),
    },
    {
      id: 2,
      get title() {
        return i18n.t('ui.data.crm.deal_details.email_follow_up_91b69cd0');
      },
      get description() {
        return i18n.t('ui.data.crm.deal_details.sent_proposal_updates_awaiting_feedback_bcd9e5aa');
      },
      date: dayjs('2025-01-23').format('DD MMM, YYYY'),
    },
    {
      id: 3,
      get title() {
        return i18n.t('ui.data.crm.deal_details.phone_call_7c2c6b79');
      },
      get description() {
        return i18n.t('ui.data.crm.deal_details.confirmed_pricing_clarified_timeline_dac6be64');
      },
      date: dayjs('2025-01-23').format('DD MMM, YYYY'),
    },
    {
      id: 4,
      get title() {
        return i18n.t('ui.data.crm.deal_details.upcoming_actions_46197c15');
      },
      get description() {
        return i18n.t('ui.data.crm.deal_details.finalize_contract_discuss_next_steps_d943b7b0');
      },
      date: dayjs('2025-01-30').format('DD MMM, YYYY'),
    },
  ],
};

export const analyticsData = [
  {
    value: 16,
    name: 'Deal Progress',
  },
  {
    value: 28,
    name: 'Win/Loss Ratio',
  },
  {
    value: 22,
    name: 'Conversion Rate',
  },
  {
    value: 34,
    name: 'Engagement Metrices',
  },
];

export const salesPipelineData = [
  {
    id: 1,
    name: 'Contact',
    status: 'done',
  },
  { id: 2, name: 'MQL', status: 'done' },
  { id: 3, name: 'SQL', status: 'done' },
  {
    id: 4,
    name: 'Chance',
    status: 'done',
  },
  {
    id: 5,
    name: 'W/L',
    status: 'ongoing',
  },
];

export const assignedToData = [
  {
    type: 'Deal Owner',
    people: [
      {
        id: 1,
        name: 'Gerard P.',
        avatar: users[1].avatar,
        editable: true,
      },
    ],
  },
  {
    type: 'Collaborator',
    people: [
      {
        id: 2,
        name: 'Muzan K.',
        avatar: users[14].avatar,
        editable: false,
      },
    ],
  },
  {
    type: 'Follower',
    people: [
      {
        id: 3,
        name: 'Haddock. C',
        avatar: users[4].avatar,
        editable: false,
      },
      {
        id: 4,
        name: 'K. Naan',
        avatar: users[12].avatar,
        editable: false,
      },
    ],
  },
];

export const accountData = {
  name: 'Waka Waka PLC',
  dateCreated: dayjs('1897-01-01').toDate(),
  logo: `${initialConfig.assetsDir}/images/brands/5.webp`,
  tags: ['Fashion', 'Sportswear'],
  contactIcons: [
    'material-symbols:location-on-outline',
    'material-symbols:globe',
    'material-symbols:mail-outline',
    'material-symbols:call-outline',
  ],
  ongoingDeals: [
    {
      name: 'Replica Badidas Futbol',
      budget: 105000,
      state: 'ongoing',
      closingDate: dayjs('2025-09-19').toDate(),
    },
    {
      name: 'Replica Pumba Jersey',
      budget: 85000,
      state: 'ongoing',
      closingDate: dayjs('2024-12-07').toDate(),
    },
  ],
  pastDeals: [
    {
      name: 'Almost Original Mike Boots',
      budget: 95000,
      state: 'past',
      status: 'closed',
    },
    {
      name: 'Original Niqe Boots',
      budget: 85000,
      state: 'past',
      status: 'lost',
    },
  ],
};

export const associatedContactData = [
  {
    id: 1,
    name: 'Tsamina Mina',
    avatar: users[6].avatar,
    designation: 'VP Operations',
    company: 'Waka Waka PLC',
    contactInfo: {
      phone: '+33 6 78 09 34 90',
      email: 'example_1@email.com',
      contactOwner: [
        {
          id: 1,
          name: 'Gerard P.',
          avatar: users[7].avatar,
        },
      ],
    },
  },
];

export const allActivities = [
  {
    id: generateUniqueId(),
    date: dayjs().subtract(5, 'hour').subtract(51, 'minute').toISOString(),
    activities: [
      {
        id: generateUniqueId(),
        type: 'mail',
        get title() {
          return i18n.t('ui.data.crm.deal_details.sent_1_mail_to_the_contact_476e6348');
        },
        color: 'primary',
        user: 'Sampro',
        icon: 'material-symbols:outgoing-mail-outline-rounded',
        assignment: 'Muaz',
        timeStamp: dayjs().format(),
      },
      {
        id: generateUniqueId(),
        type: 'meeting',
        get title() {
          return i18n.t('ui.data.crm.deal_details.onboarding_meeting_with_bf7a9df4');
        },
        color: 'info',
        user: 'Mariyam',
        icon: 'material-symbols:videocam-outline-rounded',
        assignment: 'Donrai',
        timeStamp: dayjs().format(),
      },
      {
        id: generateUniqueId(),
        type: 'call',
        get title() {
          return i18n.t('ui.data.crm.deal_details.purchasing_related_vendors_with_9dd0aa7c');
        },
        color: 'error',
        user: 'Mariyam',
        icon: 'material-symbols:phone-in-talk-outline-rounded',
        assignment: 'Muaz',
        timeStamp: dayjs().format(),
      },
      {
        id: generateUniqueId(),
        type: 'mail',
        get title() {
          return i18n.t('ui.data.crm.deal_details.sent_1_mail_to_the_contact_476e6348');
        },
        color: 'primary',
        user: 'Sampro',
        icon: 'material-symbols:outgoing-mail-outline-rounded',
        assignment: 'Samdoe',
        timeStamp: dayjs().format(),
      },
      {
        id: generateUniqueId(),
        type: 'attachment',
        get title() {
          return i18n.t('ui.data.crm.deal_details.added_image_in_the_project_65d1ba3b');
        },
        color: 'success',
        user: 'Ansolo Lazinatov',
        icon: 'material-symbols:attach-file-rounded',
        assignment: 'Project nothingum',
        timeStamp: dayjs().format(),
      },
      {
        id: generateUniqueId(),
        type: 'note',
        get title() {
          return i18n.t(
            'ui.data.crm.deal_details.assigned_as_a_director_for_the_project_nothingum_34425119',
          );
        },
        color: 'warning',
        user: 'Netnai Pollock',
        icon: 'material-symbols:edit-note-outline-rounded',
        timeStamp: dayjs().format(),
      },
      {
        id: generateUniqueId(),
        type: 'task',
        get title() {
          return i18n.t('ui.data.crm.deal_details.designing_the_dungeon_df56e94d');
        },
        color: 'success',
        user: 'Dorbesh Baba',
        icon: 'material-symbols:add-task-rounded',
        timeStamp: dayjs().format(),
      },
      {
        id: generateUniqueId(),
        type: 'mail',
        get title() {
          return i18n.t('ui.data.crm.deal_details.sent_1_mail_to_the_contact_476e6348');
        },
        color: 'primary',
        user: 'Sampro',
        icon: 'material-symbols:outgoing-mail-outline-rounded',
        assignment: 'Muaz',
        timeStamp: dayjs().format(),
      },
      {
        id: generateUniqueId(),
        type: 'attachment',
        get title() {
          return i18n.t('ui.data.crm.deal_details.added_note_in_the_project_37e28670');
        },
        color: 'success',
        user: 'Ansolo Lazinatov',
        icon: 'material-symbols:attach-file-rounded',
        assignment: 'Project nothingum',
        timeStamp: dayjs().format(),
      },
      {
        id: generateUniqueId(),
        type: 'call',
        get title() {
          return i18n.t('ui.data.crm.deal_details.purchasing_related_vendors_with_9dd0aa7c');
        },
        color: 'error',
        user: 'Mariyam',
        icon: 'material-symbols:phone-in-talk-outline-rounded',
        assignment: 'Muaz',
        timeStamp: dayjs().format(),
      },
      {
        id: generateUniqueId(),
        type: 'note',
        get title() {
          return i18n.t(
            'ui.data.crm.deal_details.assigned_as_a_director_for_the_project_nothingum_34425119',
          );
        },
        color: 'warning',
        user: 'Netnai Pollock',
        icon: 'material-symbols:edit-note-outline-rounded',
        timeStamp: dayjs().format(),
      },
    ],
  },
  {
    id: generateUniqueId(),
    date: dayjs()
      .subtract(1, 'year')
      .add(5, 'month')
      .subtract(5, 'hour')
      .subtract(51, 'minute')
      .toISOString(),
    activities: [
      {
        id: generateUniqueId(),
        type: 'mail',
        get title() {
          return i18n.t('ui.data.crm.deal_details.sent_1_mail_to_the_contact_476e6348');
        },
        color: 'primary',
        user: 'Sampro',
        icon: 'material-symbols:outgoing-mail-outline-rounded',
        assignment: 'Muaz',
        timeStamp: dayjs().format(),
      },
      {
        id: generateUniqueId(),
        type: 'call',
        get title() {
          return i18n.t('ui.data.crm.deal_details.purchasing_related_vendors_with_9dd0aa7c');
        },
        color: 'error',
        user: 'Mariyam',
        icon: 'material-symbols:phone-in-talk-outline-rounded',
        assignment: 'Muaz',
        timeStamp: dayjs().format(),
      },
      {
        id: generateUniqueId(),
        type: 'attachment',
        get title() {
          return i18n.t('ui.data.crm.deal_details.added_note_in_the_project_37e28670');
        },
        color: 'success',
        user: 'Ansolo Lazinatov',
        icon: 'material-symbols:attach-file-rounded',
        assignment: 'Project nothingum',
        timeStamp: dayjs().format(),
      },
    ],
  },
  {
    id: generateUniqueId(),
    date: dayjs()
      .subtract(1, 'year')
      .add(5, 'month')
      .subtract(4, 'day')
      .subtract(5, 'hour')
      .subtract(51, 'minute')
      .toISOString(),
    activities: [
      {
        id: generateUniqueId(),
        type: 'meeting',
        get title() {
          return i18n.t('ui.data.crm.deal_details.onboarding_meeting_with_bf7a9df4');
        },
        color: 'info',
        user: 'Mariyam',
        icon: 'material-symbols:videocam-outline-rounded',
        assignment: 'Donrai',
        timeStamp: dayjs().format(),
      },
      {
        id: generateUniqueId(),
        type: 'mail',
        get title() {
          return i18n.t('ui.data.crm.deal_details.sent_1_mail_to_the_contact_476e6348');
        },
        color: 'primary',
        user: 'Sampro',
        icon: 'material-symbols:outgoing-mail-outline-rounded',
        assignment: 'Muaz',
        timeStamp: dayjs().format(),
      },
      {
        id: generateUniqueId(),
        type: 'note',
        get title() {
          return i18n.t(
            'ui.data.crm.deal_details.assigned_as_a_director_for_the_project_nothingum_34425119',
          );
        },
        color: 'warning',
        user: 'Netnai Pollock',
        icon: 'material-symbols:edit-note-outline-rounded',
        timeStamp: dayjs().format(),
      },
    ],
  },
];

export const emailData = [
  {
    id: generateUniqueId(),
    name: 'Tsamina Mina',
    avatar: users[6].avatar,
    sentAt: dayjs().format(),
    message: (
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {i18n.t('ui.data.crm.deal_details.hello_6449ab1d')}
        <br />
        <br />
        {i18n.t(
          'ui.data.crm.deal_details.you_are_a_good_soldier_carefully_choosing_your_battl_a9fc6cf8',
        )}
        <br />
        <br />
        {i18n.t('ui.data.crm.deal_details.best_regards_d0590a67')}
        <br />
        {i18n.t('ui.data.crm.deal_details.tsamina_mina_f6bd64fe')}
      </Typography>
    ),
  },
  {
    id: generateUniqueId(),
    name: 'Gerard P.',
    avatar: <Logo showName={false} />,
    sentVia: 'FFA-X Campaign Manager',
    sentAt: dayjs().format(),
    message: (
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {i18n.t('ui.data.crm.deal_details.hello_tsamina_mina_f8c2e16b')}
        <br />
        <br />
        {i18n.t(
          'ui.data.crm.deal_details.thank_you_positioned_at_the_front_line_all_eyes_are__19090aed',
        )}
        <br />
        {i18n.t(
          'ui.data.crm.deal_details.the_pressure_mounts_you_are_feeling_it_but_you_posse_31e0cc3e',
        )}
        <br />
        <br />
        {i18n.t(
          'ui.data.crm.deal_details.embrace_the_belief_that_when_you_fall_you_can_get_up_6b5f84d1',
        )}
        <br />
        <br />
        {i18n.t('ui.data.crm.deal_details.best_regards_d0590a67')}
        <br />
        {i18n.t('ui.data.crm.deal_details.team_ffax_8534330a')}
      </Typography>
    ),
    attachment: [{ src: image(1), name: 'screenshot.jpg', size: '16.2kb' }],
  },
  {
    id: generateUniqueId(),
    name: 'Tsamina Mina',
    avatar: users[6].avatar,
    sentAt: dayjs().format(),
    message: (
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {i18n.t('ui.data.crm.deal_details.hello_gerard_p_9abb38d1')}
        <br />
        <br />
        {i18n.t(
          'ui.data.crm.deal_details.you_are_a_good_soldier_carefully_choosing_your_battl_79572db6',
        )}
        <br />
        <br />
        {i18n.t('ui.data.crm.deal_details.best_regards_d0590a67')}
        <br />
        {i18n.t('ui.data.crm.deal_details.tsamina_mina_f6bd64fe')}
      </Typography>
    ),
  },
  {
    id: generateUniqueId(),
    name: 'Gerard P.',
    avatar: <Logo showName={false} />,
    sentVia: 'FFA-X Campaign Manager',
    sentAt: dayjs().format(),
    message: (
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {i18n.t('ui.data.crm.deal_details.hello_6449ab1d')}
        <br />
        <br />
        {i18n.t(
          'ui.data.crm.deal_details.kept_in_sent_gave_feel_will_oh_it_we_has_pleasure_pr_daff725d',
        )}
        <br />
        <br />
        {i18n.t(
          'ui.data.crm.deal_details.breakfast_procuring_nay_end_happiness_allowance_assu_13fd12a6',
        )}
        <br />
        <br />
        {i18n.t(
          'ui.data.crm.deal_details.fulfilled_direction_use_continual_set_him_propriety__f0c1b129',
        )}
        <br />
        <br />
        {i18n.t('ui.data.crm.deal_details.best_regards_d0590a67')}
        <br />
        {i18n.t('ui.data.crm.deal_details.team_ffax_8534330a')}
      </Typography>
    ),
    files: [
      {
        type: 'image',
        file: {
          name: 'Image.jpeg',
          size: '35.5kb',
          format: 'jpeg',
          src: image(2),
        },
      },
      {
        type: 'file',
        file: {
          name: 'File.pdf',
          size: '35.5kb',
          format: 'pdf',
        },
      },
    ],
  },
  {
    id: generateUniqueId(),
    name: 'Tsamina Mina',
    avatar: users[6].avatar,
    sentAt: dayjs().format(),
    message: (
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {i18n.t('ui.data.crm.deal_details.hello_gerard_p_9abb38d1')}
        <br />
        <br />
        {i18n.t(
          'ui.data.crm.deal_details.admiration_stimulated_cultivated_reasonable_be_proje_6c299d7c',
        )}
        <br />
        <br />
        {i18n.t('ui.data.crm.deal_details.best_regards_d0590a67')}
        <br />
        {i18n.t('ui.data.crm.deal_details.tsamina_mina_f6bd64fe')}
      </Typography>
    ),
  },
  {
    id: generateUniqueId(),
    name: 'Gerard P.',
    avatar: <Logo showName={false} />,
    sentVia: 'FFA-X Campaign Manager',
    sentAt: dayjs().format(),
    message: (
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {i18n.t('ui.data.crm.deal_details.hello_6449ab1d')}
        <br />
        <br />
        {i18n.t(
          'ui.data.crm.deal_details.kept_in_sent_gave_feel_will_oh_it_we_has_pleasure_pr_14ae1039',
        )}
        <br />
        <br />
        {i18n.t('ui.data.crm.deal_details.best_regards_d0590a67')}
        <br />
        {i18n.t('ui.data.crm.deal_details.team_ffax_8534330a')}
      </Typography>
    ),
    files: [],
  },
];

export const meetingData = [
  {
    id: generateUniqueId(),
    date: dayjs().toISOString(),
    meetings: [
      {
        id: generateUniqueId(),
        participant: 'Muaz',
        scheduledBy: 'Gerard P.',
        scheduledDate: dayjs().toISOString(),
        guests: [users[2], users[1], users[3], users[12], users[13]],
      },
      {
        id: generateUniqueId(),
        participant: 'Mariyam',
        scheduledBy: 'Gerard P.',
        scheduledDate: dayjs().toISOString(),
        guests: [users[15], users[5], users[13]],
      },
    ],
  },
  {
    id: generateUniqueId(),
    date: dayjs().add(1, 'day').toISOString(),
    meetings: [
      {
        id: generateUniqueId(),
        participant: 'Mariyam',
        scheduledBy: 'Gerard P.',
        scheduledDate: dayjs().toISOString(),
        guests: [users[2], users[1], users[3], users[12], users[13]],
      },
      {
        id: generateUniqueId(),
        participant: 'Mariyam',
        scheduledBy: 'Gerard P.',
        scheduledDate: dayjs().toISOString(),
        guests: [users[2], users[1], users[3], users[12], users[13]],
      },
      {
        id: generateUniqueId(),
        participant: 'Mariyam',
        scheduledBy: 'Gerard P.',
        scheduledDate: dayjs().toISOString(),
        guests: [users[2], users[1], users[3], users[12], users[13]],
      },
    ],
  },
  {
    id: generateUniqueId(),
    date: dayjs().subtract(4, 'day').toISOString(),
    meetings: [
      {
        id: generateUniqueId(),
        participant: 'Mariyam',
        scheduledBy: 'Gerard P.',
        scheduledDate: dayjs().toISOString(),
        guests: [users[2], users[1], users[3], users[12], users[13], users[14], users[0], users[1]],
      },
      {
        id: generateUniqueId(),
        participant: 'Mariyam',
        scheduledBy: 'Gerard P.',
        scheduledDate: dayjs().toISOString(),
        guests: [users[15], users[5], users[13]],
      },
      {
        id: generateUniqueId(),
        participant: 'Mariyam',
        scheduledBy: 'Gerard P.',
        scheduledDate: dayjs().toISOString(),
        guests: [
          users[14],
          users[8],
          users[13],
          users[12],
          users[0],
          users[1],
          users[2],
          users[3],
          users[4],
          users[5],
          users[6],
          users[7],
          users[9],
        ],
      },
      {
        id: generateUniqueId(),
        participant: 'Mariyam',
        scheduledBy: 'Gerard P.',
        scheduledDate: dayjs().toISOString(),
        guests: [users[4], users[8], users[5], users[7]],
      },
    ],
  },
];

export const callLogData = [
  {
    id: generateUniqueId(),
    date: dayjs().toISOString(),
    calls: [
      {
        id: generateUniqueId(),
        caller: 'Gerard P.',
        receiver: 'Tsamina Mina',
        duration: 259,
        audioSrc: audio('akai-namida-instrumental'),
        time: dayjs().toISOString(),
        transcript: [
          {
            id: 1,
            user: 'agent',
            get message() {
              return i18n.t(
                'ui.data.crm.deal_details.would_you_tell_me_please_which_way_i_ought_to_go_fro_cb6add14',
              );
            },
          },
          {
            id: 2,
            user: 'client',
            get message() {
              return i18n.t(
                'ui.data.crm.deal_details.that_depends_a_good_deal_on_where_you_want_to_get_to_903c14b2',
              );
            },
          },
          {
            id: 3,
            user: 'agent',
            get message() {
              return i18n.t('ui.data.crm.deal_details.i_don_t_much_care_where_8008d3a0');
            },
          },
          {
            id: 4,
            user: 'client',
            get message() {
              return i18n.t(
                'ui.data.crm.deal_details.then_it_doesn_t_much_matter_which_way_you_go_fa2f03e7',
              );
            },
          },
          {
            id: 5,
            user: 'agent',
            get message() {
              return i18n.t('ui.data.crm.deal_details.so_long_as_i_get_somewhere_ee3be1d9');
            },
          },
          {
            id: 6,
            user: 'client',
            get message() {
              return i18n.t(
                'ui.data.crm.deal_details.oh_you_re_sure_to_do_that_if_only_you_walk_long_enou_086adbbd',
              );
            },
          },
          {
            id: 7,
            user: 'agent',
            get message() {
              return i18n.t(
                'ui.data.crm.deal_details.but_i_don_t_want_to_go_among_mad_people_9a82bf6c',
              );
            },
          },
          {
            id: 8,
            user: 'client',
            get message() {
              return i18n.t(
                'ui.data.crm.deal_details.oh_you_can_t_help_that_we_re_all_mad_here_i_m_mad_yo_27363e08',
              );
            },
          },
          {
            id: 9,
            user: 'agent',
            get message() {
              return i18n.t('ui.data.crm.deal_details.how_do_you_know_i_m_mad_186da99f');
            },
          },
          {
            id: 10,
            user: 'client',
            get message() {
              return i18n.t(
                'ui.data.crm.deal_details.you_must_be_or_you_wouldn_t_have_come_here_4c17ae8a',
              );
            },
          },
        ],
      },
      {
        id: generateUniqueId(),
        caller: 'Gerard P.',
        receiver: 'Tsamina Mina',
        duration: 288,
        audioSrc: audio('triangle-instrumental'),
        time: dayjs().toISOString(),
        transcript: [],
      },
    ],
  },
];

export const tasksData = [
  {
    id: generateUniqueId(),
    get title() {
      return i18n.t('ui.data.crm.deal_details.marketing_campaign_e336bfae');
    },
    taskList: [
      {
        id: generateUniqueId(),
        get title() {
          return i18n.t('ui.data.crm.deal_details.finalize_ad_creatives_48255464');
        },
        completed: false,
        timeStamp: dayjs().format(),
        people: [],
      },
      {
        id: generateUniqueId(),
        get title() {
          return i18n.t('ui.data.crm.deal_details.schedule_social_media_posts_f369b8a1');
        },
        completed: false,
        timeStamp: dayjs().format(),
        people: [users[15], users[14]],
      },
      {
        id: generateUniqueId(),
        get title() {
          return i18n.t('ui.data.crm.deal_details.approve_email_newsletter_93a54bab');
        },
        completed: false,
        timeStamp: dayjs().format(),
        people: [users[8]],
      },
      {
        id: generateUniqueId(),
        get title() {
          return i18n.t('ui.data.crm.deal_details.analyze_audience_engagement_0873a64c');
        },
        completed: true,
        timeStamp: dayjs().format(),
        people: [users[2]],
      },
    ],
  },
  {
    id: generateUniqueId(),
    get title() {
      return i18n.t('ui.data.crm.deal_details.product_development_a8c33f17');
    },
    taskList: [
      {
        id: generateUniqueId(),
        get title() {
          return i18n.t('ui.data.crm.deal_details.review_ui_ux_wireframes_ebb1542c');
        },
        completed: false,
        timeStamp: dayjs().format(),
        people: [users[2]],
      },
      {
        id: generateUniqueId(),
        get title() {
          return i18n.t('ui.data.crm.deal_details.conduct_beta_testing_b18b9de1');
        },
        completed: false,
        timeStamp: dayjs().format(),
        people: [users[14], users[13]],
      },
      {
        id: generateUniqueId(),
        get title() {
          return i18n.t('ui.data.crm.deal_details.implement_feedback_changes_d96e1e82');
        },
        completed: false,
        timeStamp: dayjs().format(),
        people: [users[11]],
      },
      {
        id: generateUniqueId(),
        get title() {
          return i18n.t('ui.data.crm.deal_details.finalize_product_roadmap_470acf13');
        },
        completed: true,
        timeStamp: dayjs().format(),
        people: [],
      },
    ],
  },
  {
    id: generateUniqueId(),
    get title() {
      return i18n.t('ui.data.crm.deal_details.client_onboarding_30f709fd');
    },
    taskList: [
      {
        id: generateUniqueId(),
        get title() {
          return i18n.t('ui.data.crm.deal_details.gather_client_requirements_859db38c');
        },
        completed: false,
        timeStamp: dayjs().format(),
        people: [users[2]],
      },
      {
        id: generateUniqueId(),
        get title() {
          return i18n.t('ui.data.crm.deal_details.set_up_client_account_9bd4b8e0');
        },
        completed: false,
        timeStamp: dayjs().format(),
        people: [users[14], users[13]],
      },
      {
        id: generateUniqueId(),
        get title() {
          return i18n.t('ui.data.crm.deal_details.conduct_initial_traning_session_70a928fe');
        },
        completed: false,
        timeStamp: dayjs().format(),
        people: [users[11]],
      },
      {
        id: generateUniqueId(),
        get title() {
          return i18n.t('ui.data.crm.deal_details.assign_account_manager_63edc4b2');
        },
        completed: true,
        timeStamp: dayjs().format(),
        people: [],
      },
      {
        id: generateUniqueId(),
        get title() {
          return i18n.t('ui.data.crm.deal_details.collect_feedback_adjust_services_7d885634');
        },
        completed: true,
        timeStamp: dayjs().format(),
        people: [],
      },
    ],
  },
  {
    id: generateUniqueId(),
    get title() {
      return i18n.t('ui.data.crm.deal_details.software_update_452fd054');
    },
    taskList: [
      {
        id: generateUniqueId(),
        get title() {
          return i18n.t('ui.data.crm.deal_details.identity_document_required_changes_23581422');
        },
        completed: false,
        timeStamp: dayjs().format(),
        people: [users[2]],
      },
      {
        id: generateUniqueId(),
        get title() {
          return i18n.t('ui.data.crm.deal_details.develop_test_new_features_76cad76f');
        },
        completed: false,
        timeStamp: dayjs().format(),
        people: [users[14], users[13]],
      },
      {
        id: generateUniqueId(),
        get title() {
          return i18n.t('ui.data.crm.deal_details.perform_bug_fixes_security_patches_39ef87f7');
        },
        completed: false,
        timeStamp: dayjs().format(),
        people: [users[11]],
      },
      {
        id: generateUniqueId(),
        get title() {
          return i18n.t('ui.data.crm.deal_details.conduct_internal_qa_testing_8b58050d');
        },
        completed: true,
        timeStamp: dayjs().format(),
        people: [],
      },
      {
        id: generateUniqueId(),
        get title() {
          return i18n.t('ui.data.crm.deal_details.release_update_to_staging_environment_dd7b0ca8');
        },
        completed: true,
        timeStamp: dayjs().format(),
        people: [],
      },
      {
        id: generateUniqueId(),
        get title() {
          return i18n.t('ui.data.crm.deal_details.deploy_update_to_production_4c69dfad');
        },
        completed: true,
        timeStamp: dayjs().format(),
        people: [],
      },
      {
        id: generateUniqueId(),
        get title() {
          return i18n.t(
            'ui.data.crm.deal_details.monitor_performance_gather_user_feedback_29bc3a59',
          );
        },
        completed: true,
        timeStamp: dayjs().format(),
        people: [],
      },
    ],
  },
];

const notes = [
  {
    id: generateUniqueId(),
    get title() {
      return i18n.t('ui.data.crm.deal_details.feedback_on_trial_376c1d88');
    },
    author: {
      avatar: users[5].avatar,
      name: 'Olivia Carter',
    },
    createdAt: dayjs()
      .subtract(1, 'month')
      .subtract(4, 'day')
      .subtract(5, 'hour')
      .subtract(51, 'minute')
      .toISOString(),
    get description() {
      return i18n.t(
        'ui.data.crm.deal_details.a_crm_should_guide_users_naturally_like_a_well_writt_7c4f2c1b',
      );
    },
  },
  {
    id: generateUniqueId(),
    get title() {
      return i18n.t('ui.data.crm.deal_details.feedback_on_trial_376c1d88');
    },
    author: {
      avatar: users[4].avatar,
      name: 'James Wilson',
    },
    createdAt: dayjs()
      .subtract(1, 'month')
      .subtract(4, 'day')
      .subtract(6, 'hour')
      .subtract(33, 'minute')
      .toISOString(),
    get description() {
      return i18n.t(
        'ui.data.crm.deal_details.a_well_designed_system_should_guide_users_naturally__a74bb50d',
      );
    },
  },
  {
    id: generateUniqueId(),
    get title() {
      return i18n.t('ui.data.crm.deal_details.feedback_on_trial_376c1d88');
    },
    author: {
      avatar: users[3].avatar,
      name: 'Lucas Taylor',
    },
    createdAt: dayjs()
      .subtract(1, 'month')
      .subtract(4, 'day')
      .subtract(2, 'hour')
      .subtract(17, 'minute')
      .toISOString(),
    get description() {
      return i18n.t(
        'ui.data.crm.deal_details.notifications_should_add_value_not_noise_when_a_syst_efdd0182',
      );
    },
  },
  {
    id: generateUniqueId(),
    get title() {
      return i18n.t('ui.data.crm.deal_details.feedback_on_trial_376c1d88');
    },
    author: {
      avatar: users[7].avatar,
      name: 'Gerard P.',
    },
    createdAt: dayjs()
      .subtract(1, 'month')
      .subtract(4, 'day')
      .subtract(11, 'hour')
      .subtract(5, 'minute')
      .toISOString(),
    get description() {
      return i18n.t(
        'ui.data.crm.deal_details.every_field_button_and_tab_should_serve_a_clear_purp_409ce8d1',
      );
    },
  },
];

export const activityMonitoringData = {
  allActivities: allActivities,
  email: emailData,
  meeting: meetingData,
  callLog: callLogData,
  tasks: tasksData,
  notes: notes,
};
