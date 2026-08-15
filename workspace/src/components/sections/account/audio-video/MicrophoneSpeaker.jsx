import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, MenuItem, Stack, Typography } from '@mui/material';
import i18n from 'locales/i18n';
import StyledTextField from 'components/styled/StyledTextField';

const micOptions = [
  {
    value: 'built_in_mic',
    get label() {
      return i18n.t(
        'ui.sections.account.audio_video.microphonespeaker.built_in_microphone_system_default_215993c4',
      );
    },
  },
  {
    value: 'external_mic',
    get label() {
      return i18n.t(
        'ui.sections.account.audio_video.microphonespeaker.external_microphone_usb_a2708d1b',
      );
    },
  },
  {
    value: 'headset_mic',
    get label() {
      return i18n.t(
        'ui.sections.account.audio_video.microphonespeaker.headset_microphone_36a8262f',
      );
    },
  },
  {
    value: 'wireless_mic',
    get label() {
      return i18n.t(
        'ui.sections.account.audio_video.microphonespeaker.wireless_microphone_bluetooth_31369a79',
      );
    },
  },
];
const speakerOptions = [
  {
    value: 'built_in_speaker',
    get label() {
      return i18n.t(
        'ui.sections.account.audio_video.microphonespeaker.built_in_speaker_system_default_38aab965',
      );
    },
  },
  {
    value: 'external_speaker',
    get label() {
      return i18n.t(
        'ui.sections.account.audio_video.microphonespeaker.external_speaker_usb_b127308d',
      );
    },
  },
  {
    value: 'headset_speaker',
    get label() {
      return i18n.t('ui.sections.account.audio_video.microphonespeaker.headset_speaker_88501aa8');
    },
  },
  {
    value: 'wireless_speaker',
    get label() {
      return i18n.t(
        'ui.sections.account.audio_video.microphonespeaker.wireless_speaker_bluetooth_93cae9f7',
      );
    },
  },
];

const MicrophoneSpeaker = () => {
  const { t: translateUi } = useTranslation();
  const [microphone, setMicrophone] = useState(micOptions[0].value);
  const [speaker, setSpeaker] = useState(speakerOptions[0].value);

  return (
    <Stack sx={{ gap: 2 }}>
      <Stack sx={{ gap: 1 }}>
        <StyledTextField
          select
          value={microphone}
          label={translateUi(
            'ui.sections.account.audio_video.microphonespeaker.microphone_24280537',
          )}
          onChange={({ target: { value } }) => setMicrophone(value)}
          slotProps={{
            select: {
              MenuProps: {
                slotProps: {
                  list: {
                    dense: true,
                  },
                },
              },
            },
          }}
        >
          {micOptions.map((option) => (
            <MenuItem value={option.value} key={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </StyledTextField>
        <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
          <Typography variant="subtitle2" sx={{ textWrap: 'nowrap' }}>
            {translateUi('ui.sections.account.audio_video.microphonespeaker.input_level_088af1bc')}
          </Typography>
          <Stack direction="row" sx={{ width: 1, gap: 0.5 }}>
            {Array.from({ length: 15 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  height: 8,
                  borderRadius: 2,
                  backgroundColor: index < 9 ? 'info.main' : 'info.lighter',
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 1, alignItems: 'end' }}>
        <StyledTextField
          select
          value={speaker}
          label={translateUi('ui.sections.account.audio_video.microphonespeaker.speaker_7c23b0d9')}
          fullWidth
          onChange={({ target: { value } }) => setSpeaker(value)}
          slotProps={{
            select: {
              MenuProps: {
                slotProps: {
                  list: {
                    dense: true,
                  },
                },
              },
            },
          }}
        >
          {speakerOptions.map((option) => (
            <MenuItem value={option.value} key={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </StyledTextField>
        <Button variant="soft" color="neutral">
          {translateUi('ui.sections.account.audio_video.microphonespeaker.test_speaker_ef9bc846')}
        </Button>
      </Box>
    </Stack>
  );
};

export default MicrophoneSpeaker;
