import { initialConfig } from 'config';
import i18n from 'locales/i18n';

const logo = (index) => `${initialConfig.assetsDir}/images/logo/${index}.svg`;

export const workHistory = [
  {
    id: 1,
    companyName: 'FFA-X',
    companyLogo: `${import.meta.env.BASE_URL}ffax.svg`,
    designation: 'UX/UI Designer',
    location: 'Dhaka, Bangladesh',
    startDate: '2023-12-01',
    currentlyWorking: true,
  },
  {
    id: 2,
    companyName: 'MailBluster Inc.',
    companyLogo: logo(23),
    designation: 'Jr. UX/UI Designer',
    location: 'Dhaka, Bangladesh',
    startDate: '2022-04-01',
    endDate: '2023-11-01',
    currentlyWorking: false,
  },
  {
    id: 3,
    companyName: 'TechNext Ltd.',
    companyLogo: logo(24),
    designation: 'Intern',
    location: 'Dhaka, Bangladesh',
    startDate: '2021-04-01',
    endDate: '2022-03-01',
    currentlyWorking: false,
  },
];

export const educationHistory = [
  {
    id: 1,
    institutionName: 'Harvard University',
    institutionLogo: logo(25),
    get subject() {
      return i18n.t('ui.data.account.work_education_history.human_interaction_design_81c6e16f');
    },
    location: 'Sylhet, Bangladesh',
    startDate: '2014-01-01',
    endDate: '2019-12-01',
  },
  {
    id: 2,
    institutionName: 'Notre Dame College',
    institutionLogo: logo(26),
    subject: '',
    location: 'Dhaka, Bangladesh',
    startDate: '2012-01-01',
    endDate: '2013-12-01',
  },
];
