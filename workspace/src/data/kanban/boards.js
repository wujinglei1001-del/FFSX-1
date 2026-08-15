import { initialConfig } from 'config';
import { users } from 'data/users';
import i18n from 'locales/i18n';

const image = (index) => `${initialConfig.assetsDir}/images/kanban/boards/${index}.webp`;

export const recentProjects = {
  id: 'recentProjects',
  get title() {
    return i18n.t('ui.data.kanban.boards.recent_projects_901c6d74');
  },
  boards: [
    {
      id: 1,
      image: image(1),
      name: 'Abstract Art',
      lastViewAt: '1 hrs ago',
      assignee: [users[15], users[5], users[13]],
    },
    {
      id: 2,
      image: image(2),
      name: 'plasma',
      lastViewAt: '2.5 hrs ago',
      assignee: [users[9], users[1], users[5]],
    },
    {
      id: 3,
      image: image(3),
      name: 'Nature Dance',
      lastViewAt: '3 hrs ago',
      assignee: [users[14], users[11], users[5]],
    },
    {
      id: 4,
      image: image(4),
      name: 'Northern Light',
      lastViewAt: '2 hrs ago',
      assignee: [users[15], users[9], users[3]],
    },
    {
      id: 5,
      image: image(5),
      name: 'Version',
      lastViewAt: '4 hrs ago',
      assignee: [
        users[5],
        users[8],
        users[1],
        users[2],
        users[3],
        users[4],
        users[6],
        users[7],
        users[10],
      ],
    },
    {
      id: 6,
      image: image(6),
      name: 'Magnetosphere',
      lastViewAt: '54 min ago',
      assignee: [users[7], users[9], users[2]],
    },
  ],
};

export const userProjects = {
  id: 'yourProjects',
  get title() {
    return i18n.t('ui.data.kanban.boards.your_projects_8544bb50');
  },
  boards: [
    {
      id: 1,
      image: image(7),
      name: 'Solar wind',
      lastViewAt: '36 min ago',
      assignee: [users[15], users[5], users[13]],
    },
    {
      id: 2,
      image: image(8),
      name: 'Ionosphere',
      lastViewAt: '55 min ago',
      assignee: [users[14], users[5], users[13]],
    },
    {
      id: 3,
      image: image(9),
      name: 'Solar Flare',
      lastViewAt: '4.5 hrs ago',
      assignee: [users[6], users[13], users[2]],
    },
    {
      id: 4,
      image: image(10),
      name: 'coronal mass ejection',
      lastViewAt: '5 hrs ago',
      assignee: [users[9], users[13], users[6]],
    },
    {
      id: 5,
      image: image(11),
      name: 'Mass Actor',
      lastViewAt: '8 Aug',
      assignee: [users[2], users[4], users[6]],
    },
  ],
};

export const sharedProjects = {
  id: 'sharedProjects',
  get title() {
    return i18n.t('ui.data.kanban.boards.shared_projects_3ea93b00');
  },
  boards: [
    {
      id: 1,
      image: image(12),
      name: 'Solar wind',
      lastViewAt: '1 hrs ago',
      assignee: [users[8], users[5], users[11]],
    },
    {
      id: 2,
      image: image(13),
      name: 'Ionosphere',
      lastViewAt: '2 hrs ago',
      assignee: [users[12], users[2], users[13]],
    },
    {
      id: 3,
      image: image(14),
      name: 'Health hazard',
      lastViewAt: '3 hrs ago',
      assignee: [users[12], users[3], users[9]],
    },
  ],
};
