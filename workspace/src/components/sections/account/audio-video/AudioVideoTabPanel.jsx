import { useTranslation } from 'react-i18next';
import { Divider, Stack } from '@mui/material';
import AccountTabPanelSection from '../common/AccountTabPanelSection';
import CameraSettings from './CameraSettings';
import MicrophoneSpeaker from './MicrophoneSpeaker';
import Preferences from './Preferences';

const AudioVideoTabPanel = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack divider={<Divider />} sx={{ gap: 5 }}>
      <AccountTabPanelSection
        title={translateUi('ui.sections.account.audio_video.audiovideotabpanel.camera_4da9c9af')}
        subtitle={translateUi(
          'ui.sections.account.audio_video.audiovideotabpanel.adjust_camera_settings_for_optimal_video_quality_dur_a4536263',
        )}
        icon="material-symbols:video-camera-front-outline-rounded"
      >
        <CameraSettings />
      </AccountTabPanelSection>
      <AccountTabPanelSection
        title={translateUi(
          'ui.sections.account.audio_video.audiovideotabpanel.microphone_24280537',
        )}
        subtitle={translateUi(
          'ui.sections.account.audio_video.audiovideotabpanel.configure_microphone_settings_for_clear_audio_during_3711f470',
        )}
        icon="material-symbols:mic-outline-rounded"
      >
        <MicrophoneSpeaker />
      </AccountTabPanelSection>
      <AccountTabPanelSection
        title={translateUi(
          'ui.sections.account.audio_video.audiovideotabpanel.when_joining_a_meeting_83f9eb0a',
        )}
        subtitle={translateUi(
          'ui.sections.account.audio_video.audiovideotabpanel.set_preferences_for_audio_and_video_when_joining_a_m_ec2341a3',
        )}
        icon="material-symbols:group-outline"
      >
        <Preferences />
      </AccountTabPanelSection>
    </Stack>
  );
};

export default AudioVideoTabPanel;
