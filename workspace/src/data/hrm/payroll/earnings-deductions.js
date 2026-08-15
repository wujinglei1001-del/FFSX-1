import { users } from 'data/users';
import i18n from 'locales/i18n';

export const earningsDeductions = [
  {
    id: 1,
    employee: { ...users[0], wage: '$12,500/yr' },
    hours: { regular: 40, overtime: 10 },
    extraPay: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.bonus_4d963cfa');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.commission_4bfc46bc');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.housing_allowance_518fa332');
        },
        amount: 10,
      },
    ],
    deduction: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.tax_9be70f66');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.home_loan_fafa93da');
        },
        amount: 1000,
      },
    ],
    netPayType: { amount: 20000, type: 'Direct Deposit' },
  },
  {
    id: 2,
    employee: { ...users[1], wage: '$15,000/yr' },
    hours: { regular: 40, overtime: 10 },
    extraPay: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.bonus_4d963cfa');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.commission_4bfc46bc');
        },
        amount: 50,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.housing_allowance_518fa332');
        },
        amount: 35,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.housing_allowance_518fa332');
        },
        amount: 35,
      },
    ],
    deduction: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.tax_9be70f66');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.home_loan_fafa93da');
        },
        amount: 500,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.benefit_0e7fd98b');
        },
        amount: 200,
      },
    ],
    netPayType: { amount: 20000, type: 'Direct Deposit' },
  },
  {
    id: 3,
    employee: { ...users[2], wage: '$18,000/yr' },
    hours: { regular: 40, overtime: 0 },
    extraPay: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.bonus_4d963cfa');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.commission_4bfc46bc');
        },
        amount: 1000,
      },
    ],
    deduction: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.tax_9be70f66');
        },
        amount: 1000,
      },
    ],
    netPayType: { amount: 20000, type: 'Direct Deposit' },
  },
  {
    id: 4,
    employee: { ...users[3], wage: '$25,000/yr' },
    hours: { regular: 40, overtime: 10 },
    extraPay: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.bonus_4d963cfa');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.commission_4bfc46bc');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.housing_allowance_518fa332');
        },
        amount: 1000,
      },
    ],
    deduction: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.tax_9be70f66');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.home_loan_fafa93da');
        },
        amount: 500,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.benefit_0e7fd98b');
        },
        amount: 100,
      },
    ],
    netPayType: { amount: 20000, type: 'Direct Deposit' },
  },
  {
    id: 5,
    employee: { ...users[4], wage: '$22,500/yr' },
    hours: { regular: 40, overtime: 0 },
    extraPay: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.bonus_4d963cfa');
        },
        amount: 200,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.commission_4bfc46bc');
        },
        amount: 1000,
      },
    ],
    deduction: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.tax_9be70f66');
        },
        amount: 1000,
      },
    ],
    netPayType: { amount: 20000, type: 'Direct Deposit' },
  },
  {
    id: 6,
    employee: { ...users[5], wage: '$30.00/hr' },
    hours: { regular: 40, overtime: 10 },
    extraPay: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.bonus_4d963cfa');
        },
        amount: 1000,
      },
    ],
    deduction: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.benefit_0e7fd98b');
        },
        amount: 1000,
      },
    ],
    netPayType: { amount: 20000, type: 'Direct Deposit' },
  },
  {
    id: 7,
    employee: { ...users[6], wage: '$20,000/yr' },
    hours: { regular: 40, overtime: 10 },
    extraPay: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.bonus_4d963cfa');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.commission_4bfc46bc');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.housing_allowance_518fa332');
        },
        amount: 1000,
      },
    ],
    deduction: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.tax_9be70f66');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.home_loan_fafa93da');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.benefit_0e7fd98b');
        },
        amount: 1000,
      },
    ],
    netPayType: { amount: 20000, type: 'Direct Deposit' },
  },
  {
    id: 8,
    employee: { ...users[7], wage: '$12,500/yr' },
    hours: { regular: 40, overtime: 10 },
    extraPay: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.bonus_4d963cfa');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.commission_4bfc46bc');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.housing_allowance_518fa332');
        },
        amount: 10,
      },
    ],
    deduction: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.tax_9be70f66');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.home_loan_fafa93da');
        },
        amount: 1000,
      },
    ],
    netPayType: { amount: 20000, type: 'Direct Deposit' },
  },
  {
    id: 9,
    employee: { ...users[8], wage: '$15,000/yr' },
    hours: { regular: 40, overtime: 10 },
    extraPay: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.bonus_4d963cfa');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.commission_4bfc46bc');
        },
        amount: 50,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.housing_allowance_518fa332');
        },
        amount: 35,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.housing_allowance_518fa332');
        },
        amount: 35,
      },
    ],
    deduction: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.tax_9be70f66');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.home_loan_fafa93da');
        },
        amount: 500,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.benefit_0e7fd98b');
        },
        amount: 200,
      },
    ],
    netPayType: { amount: 20000, type: 'Direct Deposit' },
  },
  {
    id: 10,
    employee: { ...users[9], wage: '$18,000/yr' },
    hours: { regular: 40, overtime: 0 },
    extraPay: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.bonus_4d963cfa');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.commission_4bfc46bc');
        },
        amount: 1000,
      },
    ],
    deduction: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.tax_9be70f66');
        },
        amount: 1000,
      },
    ],
    netPayType: { amount: 20000, type: 'Direct Deposit' },
  },
  {
    id: 11,
    employee: { ...users[10], wage: '$25,000/yr' },
    hours: { regular: 40, overtime: 10 },
    extraPay: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.bonus_4d963cfa');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.commission_4bfc46bc');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.housing_allowance_518fa332');
        },
        amount: 1000,
      },
    ],
    deduction: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.tax_9be70f66');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.home_loan_fafa93da');
        },
        amount: 500,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.benefit_0e7fd98b');
        },
        amount: 100,
      },
    ],
    netPayType: { amount: 20000, type: 'Direct Deposit' },
  },
  {
    id: 12,
    employee: { ...users[11], wage: '$22,500/yr' },
    hours: { regular: 40, overtime: 0 },
    extraPay: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.bonus_4d963cfa');
        },
        amount: 200,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.commission_4bfc46bc');
        },
        amount: 1000,
      },
    ],
    deduction: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.tax_9be70f66');
        },
        amount: 1000,
      },
    ],
    netPayType: { amount: 20000, type: 'Direct Deposit' },
  },
  {
    id: 13,
    employee: { ...users[12], wage: '$30.00/hr' },
    hours: { regular: 40, overtime: 10 },
    extraPay: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.bonus_4d963cfa');
        },
        amount: 1000,
      },
    ],
    deduction: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.benefit_0e7fd98b');
        },
        amount: 1000,
      },
    ],
    netPayType: { amount: 20000, type: 'Direct Deposit' },
  },
  {
    id: 14,
    employee: { ...users[13], wage: '$20,000/yr' },
    hours: { regular: 40, overtime: 10 },
    extraPay: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.bonus_4d963cfa');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.commission_4bfc46bc');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.housing_allowance_518fa332');
        },
        amount: 1000,
      },
    ],
    deduction: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.tax_9be70f66');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.home_loan_fafa93da');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.benefit_0e7fd98b');
        },
        amount: 1000,
      },
    ],
    netPayType: { amount: 20000, type: 'Direct Deposit' },
  },
  {
    id: 15,
    employee: { ...users[14], wage: '$12,500/yr' },
    hours: { regular: 40, overtime: 10 },
    extraPay: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.bonus_4d963cfa');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.commission_4bfc46bc');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.housing_allowance_518fa332');
        },
        amount: 10,
      },
    ],
    deduction: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.tax_9be70f66');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.home_loan_fafa93da');
        },
        amount: 1000,
      },
    ],
    netPayType: { amount: 20000, type: 'Direct Deposit' },
  },
  {
    id: 16,
    employee: { ...users[15], wage: '$15,000/yr' },
    hours: { regular: 40, overtime: 10 },
    extraPay: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.bonus_4d963cfa');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.commission_4bfc46bc');
        },
        amount: 50,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.housing_allowance_518fa332');
        },
        amount: 35,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.housing_allowance_518fa332');
        },
        amount: 35,
      },
    ],
    deduction: [
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.tax_9be70f66');
        },
        amount: 1000,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.home_loan_fafa93da');
        },
        amount: 500,
      },
      {
        get label() {
          return i18n.t('ui.data.hrm.payroll.earnings_deductions.benefit_0e7fd98b');
        },
        amount: 200,
      },
    ],
    netPayType: { amount: 20000, type: 'Direct Deposit' },
  },
];
