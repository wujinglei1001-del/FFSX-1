import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tab, Tabs, tabClasses, tabsClasses } from '@mui/material';
import { cssVarRgba } from 'lib/utils';

const TimeToggleTab = () => {
  const { t: translateUi } = useTranslation();
  const [time, setTime] = useState('10 min');
  const handleChange = (_event, newTime) => {
    setTime(newTime);
  };
  return (
    <Tabs
      value={time}
      onChange={handleChange}
      sx={(theme) => ({
        p: 0.5,
        borderRadius: 1.5,
        flexShrink: 0,
        bgcolor: 'background.elevation1',
        [`& .${tabsClasses.list}`]: {
          gap: 0,
        },
        [`& .${tabsClasses.indicator}`]: {
          height: 1,
          bgcolor: cssVarRgba(theme.vars.palette.primary.mainChannel, 0.15),
          borderRadius: 2,
        },
        [`& .${tabClasses.root}`]: {
          color: 'text.primary',
          fontWeight: 600,
          textTransform: 'none',
          [`&.${tabClasses.selected}`]: {
            color: 'primary.dark',
          },
        },
      })}
    >
      <Tab
        value="10 min"
        label={translateUi('ui.sections.dashboards.time_tracker.screencasts.10_min_4605ee77')}
        disableRipple
        sx={{ px: 2 }}
      />
      <Tab
        value="30 min"
        label={translateUi('ui.sections.dashboards.time_tracker.screencasts.30_min_d3ddf7a3')}
        disableRipple
        sx={{ px: 2 }}
      />
      <Tab
        value="all"
        label={translateUi('ui.sections.dashboards.time_tracker.screencasts.all_6a720856')}
        disableRipple
        sx={{ px: 2 }}
      />
    </Tabs>
  );
};
export default TimeToggleTab;
