import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AudioPlayer from 'components/base/AudioPlayer';
import IconifyIcon from 'components/base/IconifyIcon';

const CallDetails = ({ call }) => {
  const { t: translateUi } = useTranslation();
  return (
    <>
      <Divider sx={{ borderColor: 'dividerLight', mb: 2, opacity: 0.59 }} />
      <Stack sx={{ gap: 1, mb: 2 }}>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700 }}>
          {translateUi('ui.sections.crm.common.activity_tab_panels.audio_record_3f48fbcf')}
        </Typography>
        <AudioPlayer src={call.audioSrc} />
      </Stack>
      {call.transcript.length > 0 && (
        <>
          <Divider sx={{ borderColor: 'dividerLight', mb: 2, opacity: 0.59 }} />
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, mb: 1 }}>
              {translateUi('ui.sections.crm.common.activity_tab_panels.transcript_5bcd6022')}
            </Typography>
            {call.transcript.map((script) => (
              <Stack
                key={script.id}
                direction="row"
                sx={{
                  gap: 1,
                  px: 1,
                  py: 1.25,
                  borderRadius: 1,

                  '&:nth-of-type(2n)': {
                    backgroundColor: 'background.elevation2',
                  },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 48 }}>
                  {script.user}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                  :
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {script.message}
                </Typography>
              </Stack>
            ))}
          </Box>
        </>
      )}
      <Divider sx={{ borderColor: 'dividerLight', mb: 2, opacity: 0.59 }} />
      <Stack sx={{ mb: 2, alignItems: 'flex-start' }}>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, mb: 1 }}>
          {translateUi('ui.sections.crm.common.activity_tab_panels.note_2c924e30')}
        </Typography>
        <Button
          size="small"
          startIcon={
            <IconifyIcon icon="material-symbols:edit-note" sx={{ fontSize: '18px !important' }} />
          }
        >
          {translateUi('ui.sections.crm.common.activity_tab_panels.add_note_8b851bda')}
        </Button>
      </Stack>
    </>
  );
};

export default CallDetails;
