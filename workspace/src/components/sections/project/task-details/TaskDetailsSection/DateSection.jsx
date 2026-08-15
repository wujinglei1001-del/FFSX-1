import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Paper, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { taskDetailsData } from 'data/project/task-details';
import dayjs from 'dayjs';

const DateSection = () => {
  const { t: translateUi } = useTranslation();
  const [startDate, setStartDate] = useState(
    taskDetailsData.startDate ? dayjs(taskDetailsData.startDate) : null,
  );
  const [dueDate, setDueDate] = useState(
    taskDetailsData.dueDate ? dayjs(taskDetailsData.dueDate) : null,
  );

  const datePickerSlotProps = {
    textField: {
      fullWidth: true,
    },
    inputAdornment: {
      position: 'start',
    },
  };

  return (
    <Paper
      sx={{
        overflow: 'hidden',
        height: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        gap: 2,
        p: { xs: 2, md: 3 },
      }}
    >
      <Box sx={{ flex: '1 1 0', minWidth: 0 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            mb: 1.5,
          }}
        >
          {translateUi('ui.sections.project.task_details.taskdetailssection.start_date_ff99f5b5')}
        </Typography>
        <DatePicker
          format="DD/MM/YY"
          value={startDate}
          onChange={(selectedDateValue) => setStartDate(selectedDateValue)}
          slotProps={datePickerSlotProps}
        />
      </Box>
      <Box sx={{ flex: '1 1 0', minWidth: 0 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            mb: 1.5,
          }}
        >
          {translateUi('ui.sections.project.task_details.taskdetailssection.due_date_4c1aeebc')}
        </Typography>
        <DatePicker
          format="DD/MM/YY"
          value={dueDate}
          onChange={(selectedDateValue) => setDueDate(selectedDateValue)}
          slotProps={datePickerSlotProps}
        />
      </Box>
    </Paper>
  );
};

export default DateSection;
