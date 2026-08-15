import dayjs from 'dayjs';
import i18n from 'locales/i18n';
import ShortcutsWithDay from 'components/pickers/ShortcutsWithDay';
import AutomationDatePicker from './AutomationDatePicker';

const shortcutsItems = [
  {
    get label() {
      return i18n.t('ui.sections.project.automation.shared.today_24345a14');
    },
    getValue: () => dayjs(),
  },
  {
    get label() {
      return i18n.t('ui.sections.project.automation.shared.tomorrow_1948bf2d');
    },
    getValue: () => dayjs().add(1, 'day'),
  },
  {
    get label() {
      return i18n.t('ui.sections.project.automation.shared.this_weekend_1921aa11');
    },
    getValue: () => dayjs().day(6),
  },
  {
    get label() {
      return i18n.t('ui.sections.project.automation.shared.next_week_5a20763a');
    },
    getValue: () => dayjs().add(1, 'week'),
  },
  {
    get label() {
      return i18n.t('ui.sections.project.automation.shared.next_weekend_7ae9cdfc');
    },
    getValue: () => dayjs().add(1, 'week').day(6),
  },
  {
    get label() {
      return i18n.t('ui.sections.project.automation.shared.2_weeks_8c8660be');
    },
    getValue: () => dayjs().add(2, 'week'),
  },
  {
    get label() {
      return i18n.t('ui.sections.project.automation.shared.4_weeks_a4959fc4');
    },
    getValue: () => dayjs().add(4, 'week'),
  },
];

const DatePickerWithShortcuts = ({
  name,
  label,
  placeholder = 'Select a date',
  disabled = false,
  format = 'DD MMM, YYYY',
}) => (
  <AutomationDatePicker
    name={name}
    label={label}
    placeholder={placeholder}
    disabled={disabled}
    format={format}
    slots={{ shortcuts: ShortcutsWithDay }}
    slotProps={{ shortcuts: { items: shortcutsItems } }}
  />
);

export default DatePickerWithShortcuts;
