import dayjs from 'dayjs';
import ShortcutsWithDay from 'components/pickers/ShortcutsWithDay';
import AutomationDatePicker from './AutomationDatePicker';

const shortcutsItems = [
  { label: 'Today', getValue: () => dayjs() },
  { label: 'Tomorrow', getValue: () => dayjs().add(1, 'day') },
  { label: 'This weekend', getValue: () => dayjs().day(6) },
  { label: 'Next week', getValue: () => dayjs().add(1, 'week') },
  { label: 'Next weekend', getValue: () => dayjs().add(1, 'week').day(6) },
  { label: '2 weeks', getValue: () => dayjs().add(2, 'week') },
  { label: '4 weeks', getValue: () => dayjs().add(4, 'week') },
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
