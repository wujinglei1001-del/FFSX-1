import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tab, Tabs, tabClasses, tabsClasses } from '@mui/material';
import { cssVarRgba } from 'lib/utils';

const TopButtonGroup = () => {
  const { t: translateUi } = useTranslation();
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => setValue(newValue);

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      sx={(theme) => ({
        width: 'fit-content',
        p: 0.5,
        borderRadius: 1.5,
        flexShrink: 0,
        bgcolor: 'background.elevation1',
        [`& .${tabsClasses.list}`]: { gap: 0 },
        [`& .${tabsClasses.indicator}`]: {
          height: 1,
          bgcolor: cssVarRgba(theme.vars.palette.primary.mainChannel, 0.15),
          borderRadius: 1,
        },
        [`& .${tabClasses.root}`]: {
          color: 'text.primary',
          fontWeight: 600,
          textTransform: 'none',
          px: 2,
          [`&.${tabClasses.selected}`]: { color: 'primary.dark' },
        },
      })}
    >
      <Tab
        label={translateUi('ui.sections.time_tracker.screenshots.topbuttongroup.10_min_4605ee77')}
        value={0}
        disableRipple
      />
      <Tab
        label={translateUi('ui.sections.time_tracker.screenshots.topbuttongroup.30_min_d3ddf7a3')}
        value={1}
        disableRipple
      />
      <Tab
        label={translateUi('ui.sections.time_tracker.screenshots.topbuttongroup.all_6a720856')}
        value={2}
        disableRipple
      />
    </Tabs>
  );
};

export default TopButtonGroup;
