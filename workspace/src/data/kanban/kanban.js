import { initialConfig } from 'config';
import { users } from 'data/users';
import i18n from 'locales/i18n';

const image = (index) => `${initialConfig.assetsDir}/images/kanban/task/${index}.webp`;

const description = `A Kanban Board is a powerful visual tool that enhances workflow management, boosts
  efficiency, and fosters better team collaboration. This method leverages the simplicity of
  cards, columns, and swimlanes to visually represent tasks and their current statuses. Each
  card symbolizes a task or work item, while columns illustrate the stages of the workflow,
  such as "To Do," "In Progress," and "Done." Swimlanes can be added to further categorize
  tasks by priority, project, or team member, providing a clear and organized view of work.`;

const attachments = [
  {
    id: 1,
    image: image(0),
    filename: 'Silly_sight_1.png',
    time: '2024-12-21T12:56:00',
    addedBy: 'Sampro',
  },
  {
    id: 2,
    icon: 'material-symbols:video-file-outline-rounded',
    filename: 'Documentation.mp4',
    time: '2024-12-21T12:56:00',
    addedBy: 'Sampro',
  },
  {
    id: 3,
    icon: 'material-symbols:folder-zip-outline-rounded',
    filename: 'All_images.zip',
    time: '2024-12-21T12:56:00',
    addedBy: 'Sampro',
  },
];

const subtasks = [
  {
    id: 1,
    get title() {
      return i18n.t('ui.data.kanban.kanban.planning_phase_448907fb');
    },
    assignee: [],
    time: '2024-12-21T10:38:00',
    checked: false,
  },
  {
    id: 2,
    get title() {
      return i18n.t('ui.data.kanban.kanban.research_and_validation_ae7f5dcc');
    },
    assignee: [users[2], users[5]],
    time: '2024-12-21T10:38:00',
    checked: false,
  },
  {
    id: 3,
    get title() {
      return i18n.t('ui.data.kanban.kanban.create_wireframes_1c9666a7');
    },
    assignee: [users[8]],
    time: '2024-12-21T10:38:00',
    checked: false,
  },
  {
    id: 4,
    get title() {
      return i18n.t('ui.data.kanban.kanban.develop_visual_design_d087dd69');
    },
    assignee: [users[3]],
    time: '2024-12-21T10:38:00',
    checked: true,
  },
];

const activities = [
  {
    id: 1,
    date: 'Today',
    items: [
      {
        id: 1,
        get title() {
          return i18n.t('ui.data.kanban.kanban.you_shared_this_file_with_35c79526');
        },
        avatars: [...users.slice(2, 8)],
        icon: 'material-symbols:share-outline',
        time: '3:15 PM',
      },
      {
        id: 2,
        get title() {
          return i18n.t('ui.data.kanban.kanban.you_modified_this_file_5cfcb055');
        },
        icon: 'material-symbols:edit-outline-rounded',
        time: '3:10 PM',
      },
    ],
  },
  {
    id: 2,
    date: '19 Oct, 2024',
    items: [
      {
        id: 1,
        get title() {
          return i18n.t('ui.data.kanban.kanban.you_uploaded_this_file_e2e821ca');
        },
        get description() {
          return i18n.t('ui.data.kanban.kanban.photography_of_seashore_jpg_d4868447');
        },
        icon: 'material-symbols:upload-rounded',
        time: '3:10 PM',
      },
    ],
  },
];

export const boards = ['Abstract Art', 'Northern Light', 'Nature Dance', 'Plasma', 'Version'];
export const taskLabels = ['feature', 'bug', 'issue', 'undefined'];
export const taskPriorities = ['urgent', 'high', 'medium', 'low', 'optional'];

export const kanbanBoard = {
  id: 1,
  name: 'Northern Light',
  assignee: [...users.slice(2, 8)],
  backgroundOption: {
    type: 'color',
    background: null,
  },
  listItems: [
    {
      id: 'list1',
      get title() {
        return i18n.t('ui.data.kanban.kanban.to_do_8665aed3');
      },
      compactMode: false,
      tasks: [
        {
          id: 'task1',
          get label() {
            return i18n.t('ui.data.kanban.kanban.feature_4b7615dc');
          },
          get title() {
            return i18n.t(
              'ui.data.kanban.kanban.research_for_a_podcast_and_video_website_4e9176de',
            );
          },
          dueDate: '2024-08-08',
          assignee: [users[3], users[5]],
          completed: false,
          priority: 'medium',
          description,
          attachments,
          subtasks,
          activities,
          progress: {
            total: 25,
            completed: 6,
            showBar: true,
          },
        },
        {
          id: 'task2',
          get label() {
            return i18n.t('ui.data.kanban.kanban.bug_68858584');
          },
          get title() {
            return i18n.t(
              'ui.data.kanban.kanban.debug_checkout_process_for_the_e_commerce_website_250c43fd',
            );
          },
          assignee: [users[4], users[7], users[2]],
          completed: false,
          priority: 'high',
          description,
          attachments,
          subtasks,
          activities,
          attachmentCount: 43,
          progress: {
            total: 19,
            completed: 10,
            showData: true,
          },
        },
        {
          id: 'task3',
          coverImage: image(1),
          get label() {
            return i18n.t('ui.data.kanban.kanban.issue_00819c0e');
          },
          get title() {
            return i18n.t(
              'ui.data.kanban.kanban.research_and_write_a_blog_about_recent_landscape_arc_fa649d87',
            );
          },
          dueDate: '2024-08-09',
          assignee: [users[5], users[6]],
          completed: false,
          priority: 'low',
          description,
          attachments,
          subtasks,
          activities,
          progress: {
            total: 15,
            completed: 4,
            showBar: true,
          },
        },
      ],
    },
    {
      id: 'list2',
      get title() {
        return i18n.t('ui.data.kanban.kanban.doing_9f1ffa41');
      },
      compactMode: false,
      tasks: [
        {
          id: 'task4',
          get label() {
            return i18n.t('ui.data.kanban.kanban.feature_4b7615dc');
          },
          get title() {
            return i18n.t(
              'ui.data.kanban.kanban.design_wireframes_for_the_aurora_landing_page_revamp_8437049a',
            );
          },
          dueDate: '2024-08-12',
          assignee: [users[2], users[4]],
          completed: false,
          priority: 'medium',
          description,
          attachments,
          subtasks,
          activities,
          attachmentCount: 12,
          progress: {
            total: 15,
            completed: 6,
          },
        },
        {
          id: 'task5',
          coverImage: image(2),
          get label() {
            return i18n.t('ui.data.kanban.kanban.undefined_d5d4cd07');
          },
          get title() {
            return i18n.t(
              'ui.data.kanban.kanban.install_and_set_up_a_marketing_tool_for_team_operati_9be624ef',
            );
          },
          dueDate: '2024-08-14',
          assignee: [users[7], users[9], users[8]],
          completed: false,
          priority: 'urgent',
          description,
          attachments,
          subtasks,
          activities,
          attachmentCount: 14,
          progress: {
            total: 20,
            completed: 12,
            showBar: true,
            showData: true,
          },
        },
        {
          id: 'task6',
          coverImage: image(3),
          get label() {
            return i18n.t('ui.data.kanban.kanban.feature_4b7615dc');
          },
          get title() {
            return i18n.t(
              'ui.data.kanban.kanban.prepare_and_send_out_a_press_release_for_a_new_colla_7d73d66c',
            );
          },
          dueDate: '2024-08-09',
          assignee: [users[11], users[14]],
          completed: false,
          priority: 'medium',
          description,
          attachments,
          subtasks,
          activities,
          attachmentCount: 11,
          progress: {
            total: 16,
            completed: 5,
            showBar: true,
          },
        },
        {
          id: 'task7',
          get label() {
            return i18n.t('ui.data.kanban.kanban.issue_00819c0e');
          },
          get title() {
            return i18n.t(
              'ui.data.kanban.kanban.develop_the_color_code_of_the_logo_and_need_elaborat_260f9486',
            );
          },
          dueDate: '2024-08-15',
          assignee: [users[1], users[13]],
          completed: false,
          priority: 'urgent',
          description,
          attachments,
          subtasks,
          activities,
          progress: {
            total: 23,
            completed: 3,
            showData: true,
          },
        },
      ],
    },
    {
      id: 'list3',
      get title() {
        return i18n.t('ui.data.kanban.kanban.review_e29a79fe');
      },
      compactMode: false,
      tasks: [
        {
          id: 'task8',
          coverImage: image(4),
          get title() {
            return i18n.t(
              'ui.data.kanban.kanban.create_and_refine_logo_designs_for_the_ui_brand_731131c2',
            );
          },
          get label() {
            return i18n.t('ui.data.kanban.kanban.issue_00819c0e');
          },
          assignee: [users[15], users[5]],
          completed: false,
          priority: 'urgent',
          description,
          attachments,
          subtasks,
          activities,
          attachmentCount: 52,
          progress: {
            total: 24,
            completed: 19,
            showBar: true,
          },
        },
        {
          id: 'task9',
          get label() {
            return i18n.t('ui.data.kanban.kanban.feature_4b7615dc');
          },
          get title() {
            return i18n.t('ui.data.kanban.kanban.create_an_icon_library_for_the_project_da7f5013');
          },
          dueDate: '2024-08-08',
          assignee: [users[9], users[15]],
          completed: false,
          priority: 'low',
          description,
          attachments,
          subtasks,
          activities,
          progress: {
            total: 18,
            completed: 7,
            showBar: true,
            showData: true,
          },
        },
        {
          id: 'task10',
          coverImage: image(5),
          get label() {
            return i18n.t('ui.data.kanban.kanban.issue_00819c0e');
          },
          get title() {
            return i18n.t(
              'ui.data.kanban.kanban.resolve_styling_issues_in_dark_mode_theme_60494f79',
            );
          },
          assignee: [users[7], users[8]],
          completed: false,
          priority: 'medium',
          description,
          attachments,
          subtasks,
          activities,
          attachmentCount: 56,
          progress: {
            total: 20,
            completed: 9,
            showBar: true,
            showData: true,
          },
        },
        {
          id: 'task11',
          coverImage: image(6),
          get label() {
            return i18n.t('ui.data.kanban.kanban.feature_4b7615dc');
          },
          get title() {
            return i18n.t(
              'ui.data.kanban.kanban.write_and_edit_contents_for_the_e_commerce_site_e3fa9a35',
            );
          },
          dueDate: '2024-08-10',
          assignee: [users[2], users[5], users[9]],
          completed: false,
          priority: 'urgent',
          description,
          attachments,
          subtasks,
          activities,
          attachmentCount: 54,
          progress: {
            total: 19,
            completed: 10,
            showBar: true,
          },
        },
      ],
    },
    {
      id: 'list4',
      get title() {
        return i18n.t('ui.data.kanban.kanban.done_e9b450d1');
      },
      compactMode: false,
      tasks: [
        {
          id: 'task12',
          get label() {
            return i18n.t('ui.data.kanban.kanban.feature_4b7615dc');
          },
          get title() {
            return i18n.t(
              'ui.data.kanban.kanban.create_the_email_page_layout_and_necessary_component_1f9800db',
            );
          },
          assignee: [users[6], users[9]],
          completed: true,
          priority: 'medium',
          description,
          attachments,
          subtasks,
          activities,
          attachmentCount: 43,
          progress: {
            total: 12,
            completed: 12,
            showBar: true,
          },
        },
        {
          id: 'task13',
          get label() {
            return i18n.t('ui.data.kanban.kanban.feature_4b7615dc');
          },
          get title() {
            return i18n.t(
              'ui.data.kanban.kanban.enhance_website_usability_through_user_feedback_3ca79c3a',
            );
          },
          assignee: [users[2], users[13]],
          completed: true,
          priority: 'medium',
          description,
          attachments,
          subtasks,
          activities,
          attachmentCount: 14,
          progress: {
            total: 18,
            completed: 5,
          },
        },
        {
          id: 'task14',
          coverImage: image(7),
          get label() {
            return i18n.t('ui.data.kanban.kanban.issue_00819c0e');
          },
          get title() {
            return i18n.t(
              'ui.data.kanban.kanban.plan_and_execute_training_sessions_for_new_hires_5e68d42e',
            );
          },
          assignee: [users[1], users[5], users[6]],
          completed: true,
          priority: 'urgent',
          description,
          attachments,
          subtasks,
          activities,
          attachmentCount: 19,
          progress: {
            total: 28,
            completed: 15,
            showBar: true,
          },
        },
        {
          id: 'task15',
          coverImage: image(8),
          get label() {
            return i18n.t('ui.data.kanban.kanban.undefined_d5d4cd07');
          },
          get title() {
            return i18n.t(
              'ui.data.kanban.kanban.organize_the_meeting_for_new_product_ideas_1f09a5b1',
            );
          },
          assignee: [users[7], users[14]],
          completed: true,
          priority: 'high',
          description,
          attachments,
          subtasks,
          activities,
          attachmentCount: 16,
          progress: {
            total: 24,
            completed: 18,
            showBar: true,
          },
        },
      ],
    },
    {
      id: 'list5',
      get title() {
        return i18n.t('ui.data.kanban.kanban.rework_0ca516fc');
      },
      compactMode: false,
      tasks: [
        {
          id: 'task16',
          get label() {
            return i18n.t('ui.data.kanban.kanban.feature_4b7615dc');
          },
          get title() {
            return i18n.t(
              'ui.data.kanban.kanban.blog_edit_page_modification_and_playlist_page_design_4e6812a7',
            );
          },
          assignee: [users[1], users[9]],
          dueDate: '2024-08-08',
          completed: false,
          priority: 'medium',
          description,
          attachments,
          subtasks,
          activities,
          attachmentCount: 40,
          progress: {
            total: 22,
            completed: 7,
            showBar: true,
            showData: true,
          },
        },
        {
          id: 'task17',
          coverImage: image(9),
          get label() {
            return i18n.t('ui.data.kanban.kanban.issue_00819c0e');
          },
          get title() {
            return i18n.t(
              'ui.data.kanban.kanban.plan_and_execute_training_sessions_for_new_hires_5e68d42e',
            );
          },
          assignee: [users[4], users[6]],
          dueDate: '2024-08-09',
          completed: false,
          priority: 'urgent',
          description,
          attachments,
          subtasks,
          activities,
          progress: {
            total: 19,
            completed: 5,
            showBar: true,
            showData: true,
          },
        },
        {
          id: 'task18',
          get label() {
            return i18n.t('ui.data.kanban.kanban.bug_68858584');
          },
          get title() {
            return i18n.t(
              'ui.data.kanban.kanban.analyze_market_trends_for_branding_strategies_9649314d',
            );
          },
          assignee: [users[2], users[13], users[12]],
          completed: false,
          priority: 'urgent',
          description,
          attachments,
          subtasks,
          activities,
          attachmentCount: 13,
          progress: {
            total: 15,
            completed: 7,
            showData: true,
          },
        },
        {
          id: 'task19',
          get label() {
            return i18n.t('ui.data.kanban.kanban.feature_4b7615dc');
          },
          get title() {
            return i18n.t('ui.data.kanban.kanban.develop_and_execute_marketing_campaigns_3b0ac73b');
          },
          assignee: [users[2], users[5]],
          dueDate: '2024-08-08',
          completed: true,
          priority: 'high',
          description,
          attachments,
          subtasks,
          activities,
          progress: {
            total: 25,
            completed: 16,
            showBar: true,
            showData: true,
          },
        },
      ],
    },
  ],
};
