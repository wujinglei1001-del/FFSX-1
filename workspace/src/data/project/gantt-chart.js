import dayjs from 'dayjs';
import i18n from 'locales/i18n';

const base = dayjs().startOf('day');
export const time = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return base.hour(h).minute(m).valueOf();
};

export const currentStart = time('06:00');
export const currentEnd = time('18:00');

// export const ganttTimeRanges = [
//   {
//     id: 0,
//     from: time('10:00'),
//     to: time('12:00'),
//     classes: null,
//     label: 'Lunch',
//     resizable: false,
//   },
//   {
//     id: 1,
//     from: time('15:00'),
//     to: time('17:00'),
//     classes: null,
//     label: 'Dinner',
//   },
// ];

export const ganttRows = [
  {
    id: 10,
    get label() {
      return i18n.t('ui.data.project.gantt_chart.accounting_2c1de79f');
    },
    // class: 'row-group',
    iconClass: 'fas fa-calculator',
    // Parent rows (level-0) should not be draggable
    children: [
      {
        id: 11,
        get label() {
          return i18n.t('ui.data.project.gantt_chart.petunia_mulliner_cd6b3e2e');
        },
        // classes: 'row-gradient',
        draggable: true,
      },
      {
        id: 12,
        get label() {
          return i18n.t('ui.data.project.gantt_chart.temp_giacovetti_50d5ec48');
        },
        draggable: true,
      },
      {
        id: 13,
        get label() {
          return i18n.t('ui.data.project.gantt_chart.marl_ne_lasslett_8081ab3d');
        },
        classes: 'row-highlight',
        draggable: true,
      },
      {
        id: 14,
        get label() {
          return i18n.t('ui.data.project.gantt_chart.adda_youell_52303480');
        },
        draggable: true,
      },
      // {
      //   id: 15,
      //   label: 'Drop Zone - Accounting',
      //   classes: 'drop-zone-hidden',
      //   draggable: false,
      // },
    ],
  },
  {
    id: 20,
    get label() {
      return i18n.t('ui.data.project.gantt_chart.business_development_c6704ed3');
    },
    class: 'row-group',
    iconClass: 'fas fa-user-tie',
    // Parent rows (level-0) should not be draggable
    children: [
      {
        id: 21,
        get label() {
          return i18n.t('ui.data.project.gantt_chart.pietra_fallow_1d5f1f62');
        },
        draggable: true,
      },
      {
        id: 22,
        get label() {
          return i18n.t('ui.data.project.gantt_chart.mariellen_torbard_6e7912b1');
        },
        draggable: true,
      },
      {
        id: 23,
        get label() {
          return i18n.t('ui.data.project.gantt_chart.renate_humbee_0bd8d3ae');
        },
        draggable: true,
      },
    ],
  },
  {
    id: 30,
    get label() {
      return i18n.t('ui.data.project.gantt_chart.engineering_4143d048');
    },
    class: 'row-group',
    iconClass: 'fas fa-cogs',
    children: [
      {
        id: 31,
        get label() {
          return i18n.t('ui.data.project.gantt_chart.alex_chen_78d482ed');
        },
        draggable: true,
      },
      {
        id: 32,
        get label() {
          return i18n.t('ui.data.project.gantt_chart.sarah_johnson_967892a2');
        },
        draggable: true,
      },
      {
        id: 33,
        get label() {
          return i18n.t('ui.data.project.gantt_chart.mike_rodriguez_d10f4f59');
        },
        draggable: true,
      },
    ],
  },
];

export const ganttTasks = [
  {
    id: 1,
    resourceId: 11,
    label: 'LPCVD',
    from: time('9:00'),
    to: time('11:00'),
    draggable: true,
    resizable: true,
  },
  {
    id: 2,
    resourceId: 12,
    get label() {
      return i18n.t('ui.data.project.gantt_chart.entrepreneurship_15e72747');
    },
    from: time('10:00'),
    to: time('12:30'),
    draggable: true,
    resizable: true,
  },
  {
    id: 3,
    resourceId: 13,
    label: 'PET-CT',
    from: time('13:30'),
    to: time('15:00'),
    draggable: true,
    resizable: true,
  },
  {
    id: 4,
    resourceId: 14,
    get label() {
      return i18n.t('ui.data.project.gantt_chart.auditing_cb5cc8e2');
    },
    from: time('9:30'),
    to: time('11:30'),
    draggable: true,
    resizable: true,
  },
  {
    id: 5,
    resourceId: 21,
    get label() {
      return i18n.t('ui.data.project.gantt_chart.security_clearance_166cf452');
    },
    from: time('15:15'),
    to: time('16:00'),
    draggable: true,
    resizable: true,
  },
  {
    id: 6,
    resourceId: 22,
    get label() {
      return i18n.t('ui.data.project.gantt_chart.policy_analysis_07a632c3');
    },
    from: time('14:00'),
    to: time('17:00'),
    draggable: true,
    resizable: true,
  },
  {
    id: 7,
    resourceId: 23,
    get label() {
      return i18n.t('ui.data.project.gantt_chart.xbox_360_9897a6aa');
    },
    from: time('13:30'),
    to: time('14:30'),
    draggable: true,
    resizable: true,
  },
  {
    id: 8,
    resourceId: 31,
    get label() {
      return i18n.t('ui.data.project.gantt_chart.code_review_33157d99');
    },
    from: time('8:00'),
    to: time('10:00'),
    draggable: true,
    resizable: true,
  },
  {
    id: 9,
    resourceId: 32,
    get label() {
      return i18n.t('ui.data.project.gantt_chart.api_development_b22c52ac');
    },
    from: time('10:30'),
    to: time('13:00'),
    draggable: true,
    resizable: true,
  },
  {
    id: 10,
    resourceId: 33,
    get label() {
      return i18n.t('ui.data.project.gantt_chart.testing_0820b32b');
    },
    from: time('13:30'),
    to: time('16:30'),
    draggable: true,
    resizable: true,
  },
];

export const ganttDependencies = [
  // Accounting group dependencies
  {
    id: 1,
    fromId: 1, // LPCVD
    toId: 2, // Entrepreneurship
  },
  {
    id: 2,
    fromId: 2, // Entrepreneurship
    toId: 3, // PET-CT
  },

  {
    id: 3,
    fromId: 4, // Auditing
    toId: 1, // LPCVD
  },

  // Business Development group dependencies
  {
    id: 4,
    fromId: 5, // Security Clearance
    toId: 6, // Policy Analysis
  },
  {
    id: 5,
    fromId: 7, // Xbox 360
    toId: 5, // Security Clearance
  },

  // Engineering group dependencies
  {
    id: 6,
    fromId: 8, // Code Review
    toId: 9, // API Development
  },
  {
    id: 7,
    fromId: 9, // API Development
    toId: 10, // Testing
  },
];

export const ganttCustomDateAdapter = {
  format(date, format) {
    if (format === 'DD d') {
      const day = dayjs(date);
      const dayNumber = day.format('DD');
      const dayLetter = day.day();

      const dayLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

      return `${dayNumber} ${dayLetters[dayLetter]}`;
    }

    return dayjs(date).format(format);
  },

  roundTo(date, unit, offset) {
    const manipulateUnit = unit;

    const roundedDate = dayjs(date)
      .startOf(unit)
      .add(offset - 15, manipulateUnit);
    return roundedDate.valueOf();
  },
};
