import { Controller, get, useFormContext } from 'react-hook-form';
import { pickersSectionListClasses } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import StyledPickersField from 'components/styled/StyledPickersField';

const emptyDatePickerLocaleText = {
  fieldDayPlaceholder: () => '',
  fieldMonthPlaceholder: () => '',
  fieldYearPlaceholder: () => '',
};

const getEmptyPlaceholderSx = (placeholder) => ({
  [`& .${pickersSectionListClasses.section}`]: { display: 'none' },
  [`& .${pickersSectionListClasses.root}`]: {
    position: 'relative',
    overflow: 'hidden',
    opacity: '1 !important',
    color: 'text.secondary',
    '&::before': {
      content: `"${placeholder}"`,
      color: 'text.secondary',
      fontSize: 14,
      lineHeight: 1.45,
      display: 'block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
});

const AutomationDatePicker = ({
  name,
  placeholder = 'Select a date',
  format = 'DD MMM, YYYY',
  label,
  disabled = false,
  slots,
  slotProps,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError = get(errors, name);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const isEmpty = !field.value;

        return (
          <DatePicker
            label={label}
            format={format}
            value={field.value ? dayjs(field.value) : null}
            onChange={(next) => field.onChange(next ? next.toISOString() : '')}
            disabled={disabled}
            localeText={isEmpty ? emptyDatePickerLocaleText : undefined}
            slots={{ ...slots, textField: StyledPickersField }}
            slotProps={{
              ...slotProps,
              inputAdornment: { position: 'start', ...slotProps?.inputAdornment },
              textField: {
                size: 'medium',
                fullWidth: true,
                ...(isEmpty && { sx: getEmptyPlaceholderSx(placeholder) }),
                error: !!fieldError,
                helperText: fieldError?.message,
                ...slotProps?.textField,
              },
            }}
          />
        );
      }}
    />
  );
};

export default AutomationDatePicker;
