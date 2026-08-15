import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import i18n from 'locales/i18n';
import IconifyIcon from 'components/base/IconifyIcon';
import TogglePanel from 'components/sections/calendar/CalendarSidebar/TogglePanel';

const checkboxes = [
  {
    id: 1,
    get label() {
      return i18n.t('ui.sections.calendar.calendarsidebar.categorylist.tasks_090ec5f5');
    },
    color: 'default',
  },
  {
    id: 2,
    get label() {
      return i18n.t('ui.sections.calendar.calendarsidebar.categorylist.label_74341e3c');
    },
    color: 'primary',
  },
  {
    id: 3,
    get label() {
      return i18n.t('ui.sections.calendar.calendarsidebar.categorylist.my_event_c97cdd6a');
    },
    color: 'secondary',
  },
  {
    id: 4,
    get label() {
      return i18n.t('ui.sections.calendar.calendarsidebar.categorylist.birthday_a6b9d69f');
    },
    color: 'info',
  },
  {
    id: 5,
    get label() {
      return i18n.t('ui.sections.calendar.calendarsidebar.categorylist.undefined_0646f4af');
    },
    color: 'success',
  },
  {
    id: 6,
    get label() {
      return i18n.t('ui.sections.calendar.calendarsidebar.categorylist.local_holidays_a09a60ea');
    },
    color: 'error',
  },
];
const CategoryList = () => {
  const { t: translateUi } = useTranslation();
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <TogglePanel
      title={translateUi('ui.sections.calendar.calendarsidebar.categorylist.categories_6ccb6007')}
      defaultOpen
    >
      <List dense disablePadding sx={{ mb: 2 }}>
        {checkboxes.map((item) => (
          <ListItem
            key={item.id}
            onMouseEnter={() => setHoverIndex(item.id)}
            onMouseLeave={() => setHoverIndex(null)}
            sx={{ borderRadius: 2, '&:hover': { backgroundColor: 'background.menuElevation1' } }}
            secondaryAction={
              <IconButton size="small" sx={{ opacity: hoverIndex === item.id ? 1 : 0 }}>
                <IconifyIcon icon="material-symbols:more-vert" fontSize={14} />
              </IconButton>
            }
          >
            <FormControlLabel
              control={<Checkbox color={item.color} defaultChecked />}
              label={<Typography variant="subtitle2">{item.label}</Typography>}
            />
          </ListItem>
        ))}
      </List>

      <Button
        size="small"
        color="neutral"
        startIcon={<IconifyIcon icon="material-symbols:add" fontSize={18} />}
        sx={{ ml: 1 }}
      >
        {translateUi('ui.sections.calendar.calendarsidebar.categorylist.new_event_list_246938ca')}
      </Button>
    </TogglePanel>
  );
};

export default CategoryList;
