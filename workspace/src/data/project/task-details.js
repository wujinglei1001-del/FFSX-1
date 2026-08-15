import { initialConfig } from 'config';
import { users } from 'data/users';
import i18n from 'locales/i18n';

const detailsImage = (index) => `${initialConfig.assetsDir}/images/project/details/${index}.webp`;

const createdByAvatar = `${initialConfig.assetsDir}/images/avatar/11.webp`;

// ---------------------------------------------------------------------------
// Static options (used by UI)
// ---------------------------------------------------------------------------

export const statusOptions = [
  {
    get label() {
      return i18n.t('ui.data.project.task_details.to_do_8665aed3');
    },
    value: 'To do',
    color: 'neutral',
  },
  {
    get label() {
      return i18n.t('ui.data.project.task_details.doing_9f1ffa41');
    },
    value: 'Doing',
    color: 'info',
  },
  {
    get label() {
      return i18n.t('ui.data.project.task_details.done_e9b450d1');
    },
    value: 'Done',
    color: 'success',
  },
];

export const priorityOptions = [
  {
    value: 'Normal',
    get label() {
      return i18n.t('ui.data.project.task_details.normal_45e118d0');
    },
    dotColor: 'primary.main',
  },
  {
    value: 'High',
    get label() {
      return i18n.t('ui.data.project.task_details.high_b1a5954a');
    },
    dotColor: 'warning.main',
  },
  {
    value: 'Urgent',
    get label() {
      return i18n.t('ui.data.project.task_details.urgent_ecb26f46');
    },
    dotColor: 'error.main',
  },
];

// ---------------------------------------------------------------------------
// Single task details payload (realistic API response)
// ---------------------------------------------------------------------------

const defaultDescription =
  'The EcoSmart Initiative is a project designed to promote sustainable living in cities. It integrates green technologies into daily life, encouraging residents to adopt eco-friendly habits. Key features include installing solar panels, gardens, and launching a city-wide recycling program. The initiative will also offer workshops on topics like composting, water conservation, and energy efficiency, empowering residents to positively impact the environment. Additionally, it will partner with local businesses to encourage green practices, such as discounts for using reusable bags. Overall, the EcoSmart Initiative strives to foster a cleaner and healthier urban environment.';

export const taskDetailsData = {
  id: 'task-1',
  get title() {
    return i18n.t(
      'ui.data.project.task_details.find_joy_in_the_little_things_that_happen_every_sing_80f71848',
    );
  },
  status: 'Done',
  bannerImage: detailsImage(1),
  createdBy: {
    name: 'Mary Ann',
    avatar: createdByAvatar,
  },
  description: defaultDescription,
  descriptionHtml: `<p>${defaultDescription}</p>`,
  priority: 'Normal',
  startDate: null,
  dueDate: null,
  labels: [
    {
      get label() {
        return i18n.t('ui.data.project.task_details.admin_4e7afebc');
      },
      color: 'primary',
    },
    {
      get label() {
        return i18n.t('ui.data.project.task_details.modification_e3ea079d');
      },
      color: 'warning',
    },
    {
      get label() {
        return i18n.t('ui.data.project.task_details.bug_271befc0');
      },
      color: 'error',
    },
    {
      get label() {
        return i18n.t('ui.data.project.task_details.feature_ad565d9d');
      },
      color: 'success',
    },
    {
      get label() {
        return i18n.t('ui.data.project.task_details.documentation_9e9cf322');
      },
      color: 'info',
    },
    {
      get label() {
        return i18n.t('ui.data.project.task_details.review_e29a79fe');
      },
      color: 'primary',
    },
    {
      get label() {
        return i18n.t('ui.data.project.task_details.urgent_ecb26f46');
      },
      color: 'error',
    },
  ],
  collaborators: users.map((user, index) => ({
    id: String(user.id),
    name: user.name,
    avatar: user.avatar,
    checked: index < 2,
  })),
  subtasks: [
    {
      id: 'subtask-1',
      get title() {
        return i18n.t('ui.data.project.task_details.quick_fix_af7476af');
      },
      get description() {
        return i18n.t(
          'ui.data.project.task_details.a_fast_way_to_tackle_issues_effectively_7275ec88',
        );
      },
      checked: false,
      assignees: users.slice(0, 4).map((u) => ({ id: u.id, name: u.name, avatar: u.avatar })),
    },
    {
      id: 'subtask-2',
      get title() {
        return i18n.t('ui.data.project.task_details.team_meeting_02acb0c2');
      },
      get description() {
        return i18n.t('ui.data.project.task_details.sync_on_progress_and_blockers_af12cccb');
      },
      checked: false,
      assignees: users.slice(1, 2).map((u) => ({ id: u.id, name: u.name, avatar: u.avatar })),
    },
    {
      id: 'subtask-3',
      get title() {
        return i18n.t('ui.data.project.task_details.wrap_up_32569458');
      },
      get description() {
        return i18n.t('ui.data.project.task_details.finalize_and_document_decisions_0218ee1a');
      },
      checked: false,
      assignees: users.slice(2, 4).map((u) => ({ id: u.id, name: u.name, avatar: u.avatar })),
    },
    {
      id: 'subtask-4',
      get title() {
        return i18n.t('ui.data.project.task_details.feedback_cycle_66f3af04');
      },
      get description() {
        return i18n.t('ui.data.project.task_details.collect_and_incorporate_feedback_95785e4d');
      },
      checked: false,
      assignees: [],
    },
    {
      id: 'subtask-5',
      get title() {
        return i18n.t('ui.data.project.task_details.daily_check_in_114047ef');
      },
      get description() {
        return i18n.t(
          'ui.data.project.task_details.a_quick_look_at_our_progress_and_daily_challenges_b60c7b4d',
        );
      },
      checked: true,
      assignees: users.slice(5, 6).map((u) => ({ id: u.id, name: u.name, avatar: u.avatar })),
    },
    {
      id: 'subtask-6',
      get title() {
        return i18n.t('ui.data.project.task_details.project_launch_643c883c');
      },
      get description() {
        return i18n.t(
          'ui.data.project.task_details.the_kickoff_event_where_we_share_our_goals_and_plans_d2c23c37',
        );
      },
      checked: true,
      assignees: users.slice(6, 8).map((u) => ({ id: u.id, name: u.name, avatar: u.avatar })),
    },
  ],
  attachments: [
    {
      id: '1',
      filename: 'Image.jpeg',
      image: detailsImage(2),
      time: '',
      addedBy: '',
      size: '35.5 kb',
    },
    {
      id: '2',
      filename: 'Image.jpeg',
      image: detailsImage(1),
      time: '',
      addedBy: '',
      size: '35.5 kb',
    },
    {
      id: '3',
      filename: 'File.pdf',
      time: '',
      addedBy: '',
      size: '120 kb',
      icon: 'material-symbols:picture-as-pdf-outline-rounded',
    },
  ],
  activities: [
    {
      id: '1',
      user: users[1].name,
      action: 'Created a new task',
      time: new Date(Date.now() - 2000).toISOString(),
    },
    {
      id: '2',
      user: users[1].name,
      action: 'Added a file',
      time: new Date(Date.now() - 2000).toISOString(),
    },
    {
      id: '3',
      user: users[1].name,
      action: 'Added a response',
      time: new Date(Date.now() - 86400 * 1000).toISOString(),
    },
    {
      id: '4',
      user: users[1].name,
      action: 'Updated status',
      time: new Date(Date.now() - 30 * 86400 * 1000).toISOString(),
    },
    {
      id: '5',
      user: users[1].name,
      action: 'Moved to In Progress',
      time: new Date('2023-08-24T10:00:00').toISOString(),
    },
  ],
  comments: [
    {
      id: '1',
      name: users[2].name,
      time: new Date().toISOString(),
      get text() {
        return i18n.t(
          'ui.data.project.task_details.this_project_is_going_exceptionally_well_and_i_can_t_f2be61d1',
        );
      },
      likeCount: 2,
      liked: false,
      author: users[2],
      verified: true,
      online: true,
    },
    {
      id: '2',
      name: users[1].name,
      time: new Date().toISOString(),
      get text() {
        return i18n.t(
          'ui.data.project.task_details.i_m_thrilled_about_the_upcoming_steps_in_this_projec_c3d9cce6',
        );
      },
      likeCount: 4,
      liked: false,
      author: users[3],
      verified: true,
      online: true,
    },
    {
      id: '3',
      name: users[4].name,
      time: new Date().toISOString(),
      get text() {
        return i18n.t(
          'ui.data.project.task_details.the_initial_phases_went_smoothly_and_now_we_re_gaini_95b43902',
        );
      },
      likeCount: 2,
      liked: false,
      author: users[2],
      online: true,
    },
    {
      id: '4',
      name: users[2].name,
      time: new Date().toISOString(),
      get text() {
        return i18n.t(
          'ui.data.project.task_details.the_progress_has_been_outstanding_and_we_re_continuo_32d47e22',
        );
      },
      likeCount: 4,
      liked: false,
      author: users[1],
      online: true,
    },
    {
      id: '5',
      name: users[1].name,
      time: new Date().toISOString(),
      get text() {
        return i18n.t(
          'ui.data.project.task_details.i_m_very_confident_about_the_current_direction_and_i_fb29b186',
        );
      },
      likeCount: 3,
      liked: true,
      author: users[4],
      online: false,
    },
  ],
};
