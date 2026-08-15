import zhCnLocale from '@fullcalendar/core/locales/zh-cn';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ReactFullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useTheme } from '@mui/material';
import { useSettingsContext } from 'providers/SettingsProvider';

const FullCalendar = ({ ref, ...rest }) => {
  const { direction } = useTheme();
  const {
    config: { locale },
  } = useSettingsContext();

  return (
    <ReactFullCalendar
      ref={ref}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      locale={locale === 'zh-CN' ? zhCnLocale : 'en'}
      initialView="dayGridMonth"
      direction={direction === 'rtl' ? 'rtl' : 'ltr'}
      headerToolbar={false}
      selectable
      eventDisplay="block"
      fixedWeekCount={false}
      dayMaxEventRows={1}
      editable
      eventTimeFormat={{
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: true,
        meridiem: true,
      }}
      slotDuration="00:60:00"
      slotLabelInterval="01:00:00"
      {...rest}
    />
  );
};

FullCalendar.displayName = 'FullCalendar';

export default FullCalendar;
