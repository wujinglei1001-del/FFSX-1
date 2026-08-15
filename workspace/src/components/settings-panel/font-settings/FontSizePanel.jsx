import { useTranslation } from 'react-i18next';
import { Box, Slider, Typography } from '@mui/material';
import { useSettingsContext } from 'providers/SettingsProvider';

const FontSizePanel = () => {
  const { t: translateUi } = useTranslation();
  const {
    config: { fontSize },
    setConfig,
  } = useSettingsContext();

  const handleChange = (_, newValue) => {
    setConfig({ fontSize: newValue });
  };

  return (
    <Box sx={{ width: 1 }}>
      <Typography
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          fontWeight: 600,
          minWidth: 100,
          mb: 1,
        }}
      >
        {translateUi('ui.components.settings_panel.font_settings.font_size_b456f452')}
      </Typography>
      <Slider
        aria-label={translateUi('ui.components.settings_panel.font_settings.font_size_b456f452')}
        value={fontSize}
        onChange={handleChange}
        getAriaValueText={(value) => `${value}px`}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}px`}
        shiftStep={1}
        step={1}
        min={12}
        max={20}
        marks
      />
    </Box>
  );
};

export default FontSizePanel;
