import { initialConfig } from 'config';
import { users } from 'data/users';
import i18n from 'locales/i18n';

const bgImage = (index) => `${initialConfig.assetsDir}/images/kanban/background/${index}.webp`;

export const backgroundImageOptions = [
  {
    id: 1,
    get label() {
      return i18n.t('ui.data.kanban.createboard.bgoption1_79aa6b06');
    },
    background: bgImage(1),
  },
  {
    id: 2,
    get label() {
      return i18n.t('ui.data.kanban.createboard.bgoption2_1b125bf7');
    },
    background: bgImage(2),
  },
  {
    id: 3,
    get label() {
      return i18n.t('ui.data.kanban.createboard.bgoption3_94ccd621');
    },
    background: bgImage(3),
  },
  {
    id: 4,
    get label() {
      return i18n.t('ui.data.kanban.createboard.bgoption4_209bca41');
    },
    background: bgImage(4),
  },
  {
    id: 5,
    get label() {
      return i18n.t('ui.data.kanban.createboard.bgoption5_3b265000');
    },
    background: bgImage(5),
  },
  {
    id: 6,
    get label() {
      return i18n.t('ui.data.kanban.createboard.bgoption6_06a12dab');
    },
    background: bgImage(6),
  },
  {
    id: 7,
    get label() {
      return i18n.t('ui.data.kanban.createboard.bgoption7_648cb8c3');
    },
    background: bgImage(7),
  },
  {
    id: 8,
    get label() {
      return i18n.t('ui.data.kanban.createboard.bgoption8_db72c914');
    },
    background: bgImage(8),
  },
];

export const backgroundColorOptions = [
  {
    id: 1,
    label: '',
    background: '',
  },
  {
    id: 2,
    get label() {
      return i18n.t('ui.data.kanban.createboard.gradient_1');
    },
    background: `linear-gradient(94.94deg, #EF32D9 -53.8%, #89FFFD 100.84%);`,
  },
  {
    id: 3,
    get label() {
      return i18n.t('ui.data.kanban.createboard.gradient_2');
    },
    background: `linear-gradient(to right, #C6DDFB, rgba(198, 221, 251, 1))`,
  },
  {
    id: 4,
    get label() {
      return i18n.t('ui.data.kanban.createboard.gradient_3');
    },
    background: `linear-gradient(198.31deg, rgba(32, 222, 153, 0) 17.04%, #20DE99 92.77%)`,
  },
  {
    id: 5,
    get label() {
      return i18n.t('ui.data.kanban.createboard.gradient_4');
    },
    background: `linear-gradient(93.39deg, #20DE99 -0.48%, #7DB1F5 59.38%, #5A9EF6 106.49%)`,
  },
  {
    id: 6,
    get label() {
      return i18n.t('ui.data.kanban.createboard.gradient_5');
    },
    background: `linear-gradient(90deg, #ED4264 0%, #FFEDBC 100%)`,
  },
  {
    id: 7,
    get label() {
      return i18n.t('ui.data.kanban.createboard.gradient_6');
    },
    background: `linear-gradient(90deg, #00416A 0%, #E4E5E6 100%)`,
  },
  {
    id: 8,
    get label() {
      return i18n.t('ui.data.kanban.createboard.gradient_7');
    },
    background: `linear-gradient(90deg, #E8CBC0 0%, #636FA4 100%)`,
  },
];

export const initialTeamTableData = [
  { ...users[0], role: 'Member' },
  { ...users[1], role: 'Member' },
  { ...users[7], role: 'Admin' },
];
