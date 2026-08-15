import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { enUS, zhCN } from 'date-fns/locale';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import { useSettingsContext } from 'providers/SettingsProvider';
import IconifyIcon from './IconifyIcon';

const DateRangePicker = ({
  defaultStartDate = null,
  defaultEndDate = null,
  onChange,
  sx,
  ...rest
}) => {
  const { t: translateUi } = useTranslation();
  const {
    config: { locale },
  } = useSettingsContext();
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const { up } = useBreakpoints();
  const upSm = up('sm');
  const handleChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (onChange) {
      onChange(dates);
    }
  };
  return (
    <Box sx={{ ...sx }}>
      <ReactDatePicker
        selected={startDate}
        startDate={startDate || undefined}
        endDate={endDate || undefined}
        onChange={handleChange}
        locale={locale === 'zh-CN' ? zhCN : enUS}
        popperPlacement={upSm ? 'bottom-start' : undefined}
        showPopperArrow={false}
        selectsRange
        wrapperClassName={rest.isClearable && (startDate || endDate) ? 'clearable' : ''}
        customInput={
          <TextField
            label={translateUi('ui.components.base.daterangepicker.select_date_range_de6472b8')}
            fullWidth
          />
        }
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <Stack
            direction="row"
            sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
          >
            <Button
              shape="square"
              color="neutral"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              <IconifyIcon icon="material-symbols:chevron-left-rounded" sx={{ fontSize: 20 }} />
            </Button>

            <Typography variant="button">
              {date.toLocaleString(locale, { month: 'long', year: 'numeric' })}
            </Typography>

            <Button
              shape="square"
              color="neutral"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              <IconifyIcon icon="material-symbols:chevron-right-rounded" sx={{ fontSize: 20 }} />
            </Button>
          </Stack>
        )}
        {...rest}
      />
    </Box>
  );
};
export default DateRangePicker;
