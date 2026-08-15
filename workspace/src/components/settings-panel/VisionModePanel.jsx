import { useLocation, useNavigate } from 'react-router';
import { Box, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import i18n from 'locales/i18n';
import { useVisionMode } from 'providers/VisionModeProvider';
import IconifyIcon from 'components/base/IconifyIcon';

const visionOptions = [
  {
    value: 'normal',
    get label() {
      return i18n.t('ui.components.settings_panel.visionmodepanel.normal_45e118d0');
    },
    get description() {
      return i18n.t(
        'ui.components.settings_panel.visionmodepanel.shows_all_colors_normally_0caaf954',
      );
    },
  },
  {
    value: 'protanopia',
    get label() {
      return i18n.t('ui.components.settings_panel.visionmodepanel.protanopia_32c66f60');
    },
    get description() {
      return i18n.t('ui.components.settings_panel.visionmodepanel.hard_to_see_red_shades_277bcba9');
    },
  },
  {
    value: 'deuteranopia',
    get label() {
      return i18n.t('ui.components.settings_panel.visionmodepanel.deuteranopia_92343a03');
    },
    get description() {
      return i18n.t(
        'ui.components.settings_panel.visionmodepanel.hard_to_see_green_shades_f919ab09',
      );
    },
  },
  {
    value: 'tritanopia',
    get label() {
      return i18n.t('ui.components.settings_panel.visionmodepanel.tritanopia_a0ce24c0');
    },
    get description() {
      return i18n.t(
        'ui.components.settings_panel.visionmodepanel.hard_to_see_blue_shades_40e5be6b',
      );
    },
  },
  {
    value: 'achromatopsia',
    get label() {
      return i18n.t('ui.components.settings_panel.visionmodepanel.achromatopsia_e31f4fb0');
    },
    get description() {
      return i18n.t(
        'ui.components.settings_panel.visionmodepanel.shows_only_black_and_white_215f0d66',
      );
    },
  },
];

const VisionModePanel = () => {
  const { mode, setMode } = useVisionMode();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) => {
    navigate(location.pathname, { replace: true });
    setMode(event.target.value);
  };

  return (
    <RadioGroup name="vision-mode" value={mode} onChange={handleChange}>
      <Stack sx={{ gap: 0.5 }}>
        {visionOptions.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                checkedIcon={
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 28,
                      height: 28,
                    }}
                  >
                    <IconifyIcon
                      icon="material-symbols-light:check-circle"
                      sx={{ color: 'primary.main', fontSize: '22px !important' }}
                    />
                  </Box>
                }
                sx={{
                  p: 0.5,
                  width: 28,
                  height: 28,
                  ...(mode !== option.value && {
                    '& svg': {
                      width: 16,
                      height: 16,
                    },
                  }),
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              />
            }
            label={
              <Stack sx={{ flex: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: mode === option.value ? 600 : 400,
                    color: mode === option.value ? 'primary.main' : 'text.primary',
                  }}
                >
                  {option.label}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.disabled',
                  }}
                >
                  {option.description}
                </Typography>
              </Stack>
            }
            disableTypography
            sx={{
              margin: 0,
              width: '100%',
              p: 1,
              borderRadius: 2,
              alignItems: 'flex-start',
              bgcolor: mode === option.value ? 'primary.lighter' : 'background.elevation1',
              '&:hover': {
                bgcolor: mode === option.value ? 'primary.lighter' : 'action.hover',
              },
              '& .MuiFormControlLabel-label': {
                flex: 1,
                ml: 1,
                width: '100%',
              },
            }}
          />
        ))}
      </Stack>
    </RadioGroup>
  );
};

export default VisionModePanel;
