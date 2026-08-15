import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import SearchTextField from 'components/common/SearchTextField';
import SectionHeader from 'components/common/SectionHeader';

const TaskTrackHeader = () => {
  const { t: translateUi } = useTranslation();
  return (
    <SectionHeader
      direction={{ xs: 'column', sm: 'row' }}
      title={translateUi(
        'ui.sections.dashboards.time_tracker.daily_task_track.daily_task_track_b2c40701',
      )}
      subTitle=""
      actionComponent={<Actions />}
      sx={{ gap: { xs: 1, sm: 2 } }}
    />
  );
};
const Actions = () => {
  const { t: translateUi } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { up } = useBreakpoints();
  const upLg = up('lg');
  const handleSearch = (e) => {
    console.log(e.target.value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <Stack direction="row" sx={{ gap: 1, alignItems: 'center', width: { xs: 1, sm: 'auto' } }}>
      <SearchTextField
        placeholder={translateUi(
          'ui.sections.dashboards.time_tracker.daily_task_track.search_member_533b9da8',
        )}
        onChange={handleSearch}
        fullWidth
        sx={{ ml: 'auto', maxWidth: { xs: 1, sm: 220 } }}
        iconSx={{ color: 'text.secondary' }}
      />
      {upLg ? (
        <DatePicker
          format="DD MMM, YYYY"
          value={selectedDate}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              variant: 'filled',
            },
            inputAdornment: {
              position: 'start',
            },
          }}
          sx={{ maxWidth: 180 }}
        />
      ) : (
        <>
          <DatePicker
            open={open}
            value={selectedDate}
            onChange={handleDateChange}
            onClose={() => setOpen(false)}
            slotProps={{
              textField: { sx: { display: 'none' } },
              popper: {
                anchorEl: buttonRef.current,
                placement: 'bottom-start',
              },
            }}
          />
          <Button
            ref={buttonRef}
            variant="soft"
            shape="square"
            color="neutral"
            onClick={() => setOpen(true)}
          >
            <IconifyIcon
              icon="material-symbols:calendar-today-outline-rounded"
              sx={{ fontSize: 18, color: 'text.secondary' }}
            />
          </Button>
        </>
      )}
    </Stack>
  );
};
export default TaskTrackHeader;
