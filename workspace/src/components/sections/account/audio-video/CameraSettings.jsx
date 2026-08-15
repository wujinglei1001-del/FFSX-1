import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, MenuItem, Stack } from '@mui/material';
import i18n from 'locales/i18n';
import { useSettingsContext } from 'providers/SettingsProvider';
import Image from 'components/base/Image';
import StyledTextField from 'components/styled/StyledTextField';

const cameraOptions = [
  {
    value: 'built_in_cam',
    get label() {
      return i18n.t('ui.sections.account.audio_video.camerasettings.built_in_hd_camera_0011f571');
    },
  },
  {
    value: 'external_webcam',
    get label() {
      return i18n.t('ui.sections.account.audio_video.camerasettings.external_webcam_f60cd8b8');
    },
  },
  {
    value: 'virtual_cam',
    get label() {
      return i18n.t('ui.sections.account.audio_video.camerasettings.virtual_camera_61a6e5d8');
    },
  },
];

const resolutionOptions = [
  {
    value: 'fhd',
    get label() {
      return i18n.t('ui.sections.account.audio_video.camerasettings.fhd_1080p_385fd99a');
    },
  },
  {
    value: 'hd',
    get label() {
      return i18n.t('ui.sections.account.audio_video.camerasettings.hd_720p_cabe6911');
    },
  },
  {
    value: 'sd',
    get label() {
      return i18n.t('ui.sections.account.audio_video.camerasettings.sd_480p_1b41d768');
    },
  },
];

const CameraSettings = () => {
  const { t: translateUi } = useTranslation();
  const {
    config: { assetsDir },
  } = useSettingsContext();
  const [camera, setCamera] = useState(cameraOptions[0].value);
  const [sendResolution, setSendResolution] = useState(resolutionOptions[1].value);
  const [receiveResolution, setReceiveResolution] = useState(resolutionOptions[0].value);

  return (
    <Stack sx={{ gap: 3 }}>
      <Image
        src={`${assetsDir}/images/account/1.webp`}
        loading="lazy"
        sx={{ width: 1, height: 1, borderRadius: 2 }}
      />
      <Box
        sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' } }}
      >
        <StyledTextField
          select
          value={camera}
          label={translateUi('ui.sections.account.audio_video.camerasettings.camera_4da9c9af')}
          fullWidth
          onChange={({ target: { value } }) => setCamera(value)}
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
          {cameraOptions.map((option) => (
            <MenuItem value={option.value} key={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </StyledTextField>
        <StyledTextField
          select
          value={sendResolution}
          label={translateUi(
            'ui.sections.account.audio_video.camerasettings.send_resolution_max_29c43a7b',
          )}
          fullWidth
          onChange={({ target: { value } }) => setSendResolution(value)}
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
          {resolutionOptions.map((option) => (
            <MenuItem value={option.value} key={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </StyledTextField>
        <StyledTextField
          select
          value={receiveResolution}
          label={translateUi(
            'ui.sections.account.audio_video.camerasettings.receive_resolution_max_bc0c0dbb',
          )}
          fullWidth
          onChange={({ target: { value } }) => setReceiveResolution(value)}
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
          {resolutionOptions.map((option) => (
            <MenuItem value={option.value} key={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </StyledTextField>
      </Box>
    </Stack>
  );
};

export default CameraSettings;
