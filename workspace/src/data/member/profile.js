import { initialConfig } from 'config';
import { users } from 'data/users';
import dayjs from 'dayjs';
import i18n from 'locales/i18n';

const logo = (index) => `${initialConfig.assetsDir}/images/logo/${index}.svg`;

const profileSummaryData = {
  ...users[3],
  name: 'John Carter',
  email: 'john.work@mail.com',
  isActive: true,
  designation: 'Software Engineer',
  id: '123467',
  employementType: 'Full Time',
  phone: '+1-923-465-7890',
  location: 'Dhaka',
};
const personalData = {
  overview: [
    {
      get label() {
        return i18n.t('ui.data.member.profile.full_name_64346b48');
      },
      value: 'John Carter',
    },
    {
      get label() {
        return i18n.t('ui.data.member.profile.nationality_1969ead5');
      },
      value: 'Bangladeshi',
    },
    {
      get label() {
        return i18n.t('ui.data.member.profile.gender_8a754c61');
      },
      value: 'Male',
    },
    {
      get label() {
        return i18n.t('ui.data.member.profile.permanent_address_b1bfe9e9');
      },
      value: '123 Maple Street Springfield, IL 62704 USA',
    },
    {
      get label() {
        return i18n.t('ui.data.member.profile.birthday_a6b9d69f');
      },
      value: '12 Feb, 2000',
    },
    {
      get label() {
        return i18n.t('ui.data.member.profile.marital_status_e65f7360');
      },
      value: 'Single',
    },
    {
      get label() {
        return i18n.t('ui.data.member.profile.religion_b04d58c6');
      },
      value: 'Christianity',
    },
    {
      get label() {
        return i18n.t('ui.data.member.profile.present_address_898a440b');
      },
      value: '456 Oak Avenue Chicago, IL 60610 USA',
    },
  ],
  experiences: [
    {
      icon: `${import.meta.env.BASE_URL}ffax.svg`,
      designation: 'UX/UI Designer',
      company: 'FFA-X',
      location: 'Dhaka, Bangladesh',
      startDate: '2024-04-01',
      endDate: '2025-11-01',
    },
    {
      icon: logo(23),
      designation: 'Jr. UX/UI Designer',
      company: 'Mailbluster Inc.',
      location: 'Dhaka, Bangladesh',
      startDate: '2023-04-01',
      endDate: '2024-11-01',
    },
    {
      icon: logo(24),
      designation: 'Intern',
      company: 'TechNext Ltd.',
      location: 'Sylhet, Bangladesh',
      startDate: '2022-04-01',
      endDate: '2023-11-01',
    },
  ],
  education: [
    {
      icon: logo(25),
      institution: 'Harvard University',
      location: 'Dhaka, Bangladesh',
      startDate: '2016-01-01',
      endDate: '2021-12-01',
    },
    {
      icon: logo(26),
      institution: 'Notre Dame College',
      location: 'Dhaka, Bangladesh',
      startDate: '2013-01-01',
      endDate: '2016-12-01',
    },
    {
      icon: logo(26),
      institution: 'Notre Dame College',
      location: 'Dhaka, Bangladesh',
      startDate: '2012-01-01',
      endDate: '2013-12-01',
    },
  ],
};
const jobData = {
  overview: [
    {
      get label() {
        return i18n.t('ui.data.member.profile.id_no_2cee330c');
      },
      value: '123456',
    },
    {
      get label() {
        return i18n.t('ui.data.member.profile.joining_date_a94e7880');
      },
      value: '02/04/2018',
    },
    {
      get label() {
        return i18n.t('ui.data.member.profile.department_db40106a');
      },
      value: 'Design',
    },
    {
      get label() {
        return i18n.t('ui.data.member.profile.branch_1627510b');
      },
      value: 'European Office-UK',
    },
    {
      get label() {
        return i18n.t('ui.data.member.profile.team_21888726');
      },
      value: 'OneGo',
    },
    {
      get label() {
        return i18n.t('ui.data.member.profile.shift_469d5b18');
      },
      value: 'Day',
    },
    {
      get label() {
        return i18n.t('ui.data.member.profile.supervisor_2cd4fa19');
      },
      value: "Grace O'Connell",
    },
    {
      get label() {
        return i18n.t('ui.data.member.profile.office_address_f2d5d1d8');
      },
      value: '233 Oak Avenue Chicago, IL 60610 USA',
    },
  ],
  teamMembers: [
    {
      ...users[2],
      name: 'John Carter',
      designation: 'Sr. Software Engineer',
    },
    {
      ...users[1],
      name: 'Emily Davis',
      designation: 'Software Engineer',
    },
    {
      ...users[3],
      name: 'Michael Thompson',
      designation: 'Software Engineer',
    },
    {
      ...users[4],
      name: 'Sarah Johnson',
      designation: 'Software Engineer',
    },
    {
      ...users[12],
      name: 'Emily Davis',
      designation: 'Software Engineer',
    },
    {
      ...users[14],
      name: 'David Wilson',
      designation: 'Software Engineer',
    },
    {
      ...users[8],
      name: 'Jessica Martinez',
      designation: 'Software Engineer',
    },
    {
      ...users[13],
      name: 'Daniel Brown',
      designation: 'Software Engineer',
    },
  ],
  jobInformation: [
    {
      id: 1,
      date: '2025-02-09',
      designation: 'Sr. Designer',
      team: 'OneGo',
      department: 'Design',
      salary: 9000,
      supervisor: "Grace O'Connell",
    },
    {
      id: 2,
      date: '2024-02-08',
      designation: 'Sr. Designer',
      team: 'OneGo',
      department: 'Design',
      salary: 8000,
      supervisor: 'Emily Davis',
    },
    {
      id: 3,
      date: '2023-02-04',
      designation: 'Jr. Designer',
      team: 'OneGo',
      department: 'Design',
      salary: 6000,
      supervisor: 'Emily Davis',
    },
    {
      id: 4,
      date: '2022-02-05',
      designation: 'Intern',
      team: 'OneGo',
      department: 'Design',
      salary: 5000,
      supervisor: 'Emily Davis',
    },
  ],
};
const teamOverviewData = {
  assignedTeams: [
    { id: 1, team: 'One Go', stats: { completed: 10, active: 20, archived: 10, total: 50 } },
    { id: 2, team: 'Kernel Kings', stats: { completed: 8, active: 15, archived: 12, total: 45 } },
  ],
  projectList: [
    {
      id: 1,
      name: 'Quantum Leap Technologies',
      team: 'One Go',
      collaborators: [users[15], users[5], users[13]],
      status: 'Doing',
      lastOpened: dayjs().subtract(2, 'day').toDate(),
    },
    {
      id: 2,
      name: 'Urban Garden Initiative',
      team: 'One Go',
      collaborators: [users[9], users[0]],
      status: 'To do',
      lastOpened: dayjs().subtract(4, 'M').toDate(),
    },
    {
      id: 3,
      name: 'Eureka Innovations',
      team: 'Kernel Kings',
      collaborators: [users[2], users[1], users[3], users[12], users[13], users[14]],
      status: 'Doing',
      lastOpened: dayjs().subtract(6, 'day').toDate(),
    },
    {
      id: 4,
      name: 'Future Vision Innovations',
      team: 'One Go',
      collaborators: [users[9], users[0]],
      status: 'Done',
      lastOpened: dayjs().subtract(6, 'day').toDate(),
    },
    {
      id: 5,
      name: 'Future of Work Initiative',
      team: 'One Go',
      collaborators: [users[15], users[5], users[13]],
      status: 'Doing',
      lastOpened: dayjs().subtract(4, 'M').toDate(),
    },
    {
      id: 6,
      name: 'Pioneering Tech Ventures',
      team: 'Kernel Kings',
      collaborators: [users[15], users[5], users[13]],
      status: 'Done',
      lastOpened: dayjs().subtract(4, 'M').toDate(),
    },
    {
      id: 7,
      name: 'NextGen Solutions',
      team: 'One Go',
      collaborators: [users[15], users[5], users[13]],
      status: 'Done',
      lastOpened: dayjs().subtract(6, 'M').toDate(),
    },
    {
      id: 8,
      name: 'Quantum Leap Technologies',
      team: 'One Go',
      collaborators: [users[15], users[5], users[13]],
      status: 'Doing',
      lastOpened: dayjs().subtract(2, 'day').toDate(),
    },
    {
      id: 9,
      name: 'Urban Garden Initiative',
      team: 'One Go',
      collaborators: [users[9], users[0]],
      status: 'To do',
      lastOpened: dayjs().subtract(4, 'M').toDate(),
    },
    {
      id: 10,
      name: 'Eureka Innovations',
      team: 'Kernel Kings',
      collaborators: [users[2], users[1], users[3], users[12], users[13], users[14]],
      status: 'Doing',
      lastOpened: dayjs().subtract(6, 'day').toDate(),
    },
    {
      id: 11,
      name: 'Future Vision Innovations',
      team: 'One Go',
      collaborators: [users[9], users[0]],
      status: 'Done',
      lastOpened: dayjs().subtract(6, 'day').toDate(),
    },
    {
      id: 12,
      name: 'Future of Work Initiative',
      team: 'One Go',
      collaborators: [users[15], users[5], users[13]],
      status: 'Doing',
      lastOpened: dayjs().subtract(4, 'M').toDate(),
    },
    {
      id: 13,
      name: 'Pioneering Tech Ventures',
      team: 'Kernel Kings',
      collaborators: [users[15], users[5], users[13]],
      status: 'Done',
      lastOpened: dayjs().subtract(4, 'M').toDate(),
    },
    {
      id: 14,
      name: 'NextGen Solutions',
      team: 'One Go',
      collaborators: [users[15], users[5], users[13]],
      status: 'Done',
      lastOpened: dayjs().subtract(6, 'M').toDate(),
    },
  ],
};
const timeOffData = {
  basicInfo: {
    chart: [
      {
        get label() {
          return i18n.t('ui.data.member.profile.working_day_416c8064');
        },
        value: 300,
      },
      {
        get label() {
          return i18n.t('ui.data.member.profile.vacation_789ca75e');
        },
        value: 200,
      },
      {
        get label() {
          return i18n.t('ui.data.member.profile.leave_7e3520a9');
        },
        value: 150,
      },
      {
        get label() {
          return i18n.t('ui.data.member.profile.take_leave_060fc289');
        },
        value: 90,
      },
    ],
    appliedLeave: [
      { date: 'Mar 27', duration: 8, type: 'Vacation', reason: 'Personal' },
      { date: 'Mar 25', duration: 8, type: 'Leave', reason: 'Personal' },
      { date: 'Mar 23', duration: 8, type: 'Vacation', reason: 'Personal' },
      { date: 'Mar 13-Mar 14', duration: 16, type: 'Vacation', reason: 'Personal' },
    ],
  },
  history: [
    { id: 1, date: '26 Mar', day: '01', hour: 8, reason: 'Vacation', approver: 'Emily Davis' },
    {
      id: 2,
      date: '15 Mar - 20 Mar',
      day: '04',
      hour: 32,
      reason: 'Personal',
      approver: 'Emily Davis',
    },
    { id: 3, date: '21 Feb', day: '01', hour: 8, reason: 'Vacation', approver: 'Emily Davis' },
    { id: 4, date: '14 Feb', day: '01', hour: 8, reason: 'Vacation', approver: 'Emily Davis' },
    {
      id: 5,
      date: '09 Feb- 10 Feb',
      day: '02',
      hour: 16,
      reason: 'Personal',
      approver: 'Emily Davis',
    },
    { id: 6, date: '20 Jan', day: '01', hour: 8, reason: 'Personal', approver: 'Emily Davis' },
    { id: 7, date: '15 Jan', day: '01', hour: 8, reason: 'Sick', approver: 'Emily Davis' },
  ],
};
const payInfoData = {
  monthlyPayroll: {
    month: dayjs().toDate(),
    netPayment: { value: 9500, inWords: 'Nine Thousand Five Hundred' },
    totalGrossPayPercent: 80,
    approvePayroll: dayjs().toDate(),
    totalGrossPay: 10000,
    tax: 0.15,
    otherDeduction: 0.05,
  },
  history: [
    { id: 1, payDate: new Date(2025, 3, 9), hours: 120, grossPay: 10000, totalDeduction: 500 },
    { id: 2, payDate: new Date(2025, 2, 9), hours: 120, grossPay: 10000, totalDeduction: 500 },
    { id: 3, payDate: new Date(2025, 1, 9), hours: 120, grossPay: 10000, totalDeduction: 500 },
    { id: 4, payDate: new Date(2025, 0, 9), hours: 120, grossPay: 10000, totalDeduction: 500 },
    { id: 5, payDate: new Date(2024, 11, 9), hours: 120, grossPay: 10000, totalDeduction: 500 },
    { id: 6, payDate: new Date(2024, 10, 9), hours: 120, grossPay: 10000, totalDeduction: 500 },
  ],
};
const documentsData = [
  {
    id: 1,
    name: 'Resume & Applications',
    files: 2,
    icon: 'material-symbols-light:folder-outline-rounded',
  },
  {
    id: 2,
    name: 'Appointment',
    files: 3,
    icon: 'material-symbols-light:folder-outline-rounded',
  },
  {
    id: 3,
    name: 'Salary Statement',
    files: 2,
    icon: 'material-symbols-light:folder-outline-rounded',
  },
  {
    id: 4,
    name: 'Bonus Statement',
    files: 2,
    icon: 'material-symbols-light:folder-outline-rounded',
  },
  {
    id: 5,
    name: 'Tax Documentation',
    date: new Date(2026, 2, 10),
    icon: 'material-symbols-light:picture-as-pdf-outline-rounded',
  },
  {
    id: 6,
    name: 'Application Form',
    date: new Date(2025, 1, 12),
    icon: 'material-symbols-light:docs-outline-rounded',
  },
  {
    id: 7,
    name: 'Monthly Earnings',
    date: new Date(2026, 1, 14),
    icon: 'material-symbols-light:picture-as-pdf-outline-rounded',
  },
  {
    id: 8,
    name: 'Tax Documentation',
    date: new Date(2025, 1, 13),
    icon: 'material-symbols-light:picture-as-pdf-outline-rounded',
  },
  {
    id: 9,
    name: 'Application Form',
    date: new Date(2025, 1, 13),
    icon: 'material-symbols-light:docs-outline-rounded',
  },
  {
    id: 10,
    name: 'Performance Review',
    date: new Date(2025, 1, 12),
    icon: 'material-symbols-light:picture-as-pdf-outline-rounded',
  },
  {
    id: 11,
    name: 'Applications',
    date: new Date(2025, 0, 10),
    icon: 'material-symbols-light:docs-outline-rounded',
  },
  {
    id: 12,
    name: 'Tax Documentation',
    date: new Date(2024, 11, 13),
    icon: 'material-symbols-light:picture-as-pdf-outline-rounded',
  },
  {
    id: 13,
    name: 'Monthly Earnings',
    date: new Date(2024, 1, 2),
    icon: 'material-symbols-light:picture-as-pdf-outline-rounded',
  },
  {
    id: 14,
    name: 'Applications',
    date: new Date(2024, 0, 10),
    icon: 'material-symbols-light:picture-as-pdf-outline-rounded',
  },
  {
    id: 15,
    name: 'Tax Documentation',
    date: new Date(2023, 10, 13),
    icon: 'material-symbols-light:picture-as-pdf-outline-rounded',
  },
];

export {
  documentsData,
  jobData,
  payInfoData,
  personalData,
  profileSummaryData,
  teamOverviewData,
  timeOffData,
};
