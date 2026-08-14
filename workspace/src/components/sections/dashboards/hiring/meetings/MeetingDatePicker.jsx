import { useState } from 'react';
import { DatePicker, pickersInputBaseClasses } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const MeetingDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <DatePicker
      format="DD MMM, YYYY"
      value={selectedDate}
      onChange={handleDateChange}
      slotProps={{
        textField: {
          variant: 'filled',
          slotProps: {
            htmlInput: {
              'aria-label': 'Meeting date',
            },
          },
          sx: {
            maxWidth: { lg: '150px' },
            [`& .${pickersInputBaseClasses.sectionContent}`]: {
              paddingRight: '0px !important',
            },
          },
        },
      }}
    />
  );
};
export default MeetingDatePicker;
