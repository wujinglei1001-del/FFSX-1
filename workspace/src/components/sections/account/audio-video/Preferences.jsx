import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  FormControl,
  FormControlLabel,
  Paper,
  Slider,
  Stack,
  Switch,
  Typography,
  formControlLabelClasses,
  sliderClasses,
} from '@mui/material';

const blurMarks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 25,
    label: '25%',
  },
  {
    value: 50,
    label: '50%',
  },
  {
    value: 75,
    label: '75%',
  },
  {
    value: 100,
    label: '100%',
  },
];

const Preferences = () => {
  const { t: translateUi } = useTranslation();
  const [blurBg, setBlurBg] = useState(true);

  return (
    <Stack sx={{ gap: 3, mb: 5 }}>
      <FormControl
        component="fieldset"
        variant="standard"
        sx={{ gap: 2, alignItems: 'flex-start' }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {translateUi('ui.sections.account.audio_video.preferences.meeting_preferences_9d1eb24c')}
        </Typography>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label={translateUi(
            'ui.sections.account.audio_video.preferences.set_my_status_to_in_a_meeting_c4d3d5bf',
          )}
          sx={{ gap: 2, ml: 0 }}
        />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label={translateUi(
            'ui.sections.account.audio_video.preferences.mute_my_microphone_df0134a1',
          )}
          sx={{ gap: 2, ml: 0 }}
        />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label={translateUi(
            'ui.sections.account.audio_video.preferences.automatically_turn_on_caption_when_you_re_in_meeting_3ea2bda8',
          )}
          sx={{ gap: 2, ml: 0 }}
        />
      </FormControl>
      <Stack sx={{ gap: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {translateUi('ui.sections.account.audio_video.preferences.blur_background_8f44511a')}
        </Typography>
        <Paper
          variant="elevation"
          background={1}
          elevation={0}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3, borderRadius: 2 }}
        >
          <FormControlLabel
            control={<Switch checked={blurBg} onChange={(e) => setBlurBg(e.target.checked)} />}
            label={translateUi(
              'ui.sections.account.audio_video.preferences.blur_your_video_background_3d282999',
            )}
            sx={{
              gap: 2,
              ml: 0,
              [`${formControlLabelClasses.label}`]: {
                fontWeight: 600,
              },
            }}
          />
          <Box sx={{ width: 1 }}>
            <Typography variant="body2">
              {translateUi(
                'ui.sections.account.audio_video.preferences.adjust_your_blur_percentage_d73e1aaf',
              )}
            </Typography>
            <Slider
              aria-label={translateUi(
                'ui.sections.account.audio_video.preferences.restricted_values_edf2a662',
              )}
              defaultValue={50}
              step={null}
              valueLabelDisplay="auto"
              marks={blurMarks}
              valueLabelFormat={(x) => `${x}%`}
              disabled={!blurBg}
              sx={{
                [`& .${sliderClasses.mark}`]: {
                  bgcolor: 'inherit',
                },
              }}
            />
          </Box>
        </Paper>
      </Stack>
    </Stack>
  );
};

export default Preferences;
