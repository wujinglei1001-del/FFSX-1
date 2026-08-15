import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Stack,
  Typography,
  inputBaseClasses,
} from '@mui/material';
import { getFileIcon } from 'lib/utils';
import IconifyIcon from 'components/base/IconifyIcon';
import StyledTextField from 'components/styled/StyledTextField';
import { VisuallyHiddenInput } from 'components/styled/VisuallyHiddenInput';
import SendOptionInput from './SendOptionInput';

const EmailReply = () => {
  const { t: translateUi } = useTranslation();
  const [sendType, setSendType] = useState('');
  const [attachments, setAttachment] = useState([]);
  const location = useLocation();

  const handleAttachment = (e) => {
    const files = Array.from(e.target.files || []);
    setAttachment([...attachments, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachment(attachments.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setSendType('');
  }, [location.pathname]);

  return (
    <>
      {!sendType ? (
        <Box sx={{ mt: 8 }}>
          <Button
            variant="soft"
            color="neutral"
            sx={{ mr: 1 }}
            startIcon={<IconifyIcon icon="material-symbols:reply-rounded" sx={{ fontSize: 20 }} />}
            onClick={() => setSendType('Reply')}
          >
            {translateUi('ui.sections.email.email_details.emailreply.reply_6c2bb735')}
          </Button>
          <Button
            variant="soft"
            color="neutral"
            startIcon={
              <IconifyIcon icon="material-symbols:forward-rounded" sx={{ fontSize: 20 }} />
            }
            onClick={() => setSendType('Forward')}
          >
            {translateUi('ui.sections.email.email_details.emailreply.forward_ba4e7226')}
          </Button>
        </Box>
      ) : (
        <Box sx={{ bgcolor: 'background.elevation2', p: 2, borderRadius: 6, mt: 8 }}>
          <SendOptionInput sendType={sendType} setSendType={setSendType} />
          <StyledTextField
            fullWidth
            multiline
            size="large"
            rows={2}
            placeholder={translateUi(
              'ui.sections.email.email_details.emailreply.write_a_message_46bfc6e8',
            )}
            sx={{
              [`& .${inputBaseClasses.root}`]: {
                py: 0.5,
                '&:hover': { bgcolor: 'transparent' },
                [`&.${inputBaseClasses.focused}`]: { boxShadow: 'none', bgcolor: 'transparent' },
              },
            }}
          />
          {attachments.map((attachment, index) => (
            <Stack
              key={attachment.name}
              direction="row"
              sx={{ gap: 1, alignItems: 'center', mb: 1 }}
            >
              <Stack
                direction="row"
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: 'background.elevation4',
                  borderRadius: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconifyIcon icon={getFileIcon(attachment.type.split('/')[1])} />
              </Stack>
              <Typography variant="subtitle1">{attachment.name}</Typography>
              <IconButton
                edge="end"
                aria-label={translateUi(
                  'ui.sections.email.email_details.emailreply.delete_9485989f',
                )}
                sx={{ ml: 'auto' }}
                onClick={() => removeAttachment(index)}
              >
                <IconifyIcon
                  icon="material-symbols:close-small-rounded"
                  fontSize={20}
                  sx={{ color: 'text.primary' }}
                />
              </IconButton>
            </Stack>
          ))}
          <Stack direction="row" sx={{ flexWrap: 'wrap', pl: 1 }}>
            <IconButton
              aria-label={translateUi('ui.sections.email.email_details.emailreply.emoji_4e50d331')}
              size="large"
              sx={{ p: 1 }}
            >
              <IconifyIcon
                icon="material-symbols:mood-outline-rounded"
                sx={{ fontSize: 20, color: 'text.primary' }}
              />
            </IconButton>
            <IconButton
              component="label"
              aria-label={translateUi(
                'ui.sections.email.email_details.emailreply.attachment_1625e5ed',
              )}
              size="large"
              sx={{ p: 1 }}
            >
              <IconifyIcon
                icon="material-symbols:attachment-rounded"
                sx={{ fontSize: 20, color: 'text.primary' }}
              />
              <VisuallyHiddenInput type="file" multiple onChange={handleAttachment} />
            </IconButton>
            <IconButton
              aria-label={translateUi('common.accessibility.alternate_email')}
              size="large"
              sx={{ p: 1 }}
            >
              <IconifyIcon
                icon="material-symbols:alternate-email-rounded"
                sx={{ fontSize: 20, color: 'text.primary' }}
              />
            </IconButton>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />
            <IconButton
              aria-label={translateUi('common.accessibility.photo_camera')}
              size="large"
              sx={{ p: 1 }}
            >
              <IconifyIcon
                icon="material-symbols:photo-camera-outline-rounded"
                sx={{ fontSize: 20, color: 'text.primary' }}
              />
            </IconButton>
            <IconButton
              aria-label={translateUi('ui.sections.email.email_details.emailreply.mic_b6edf9c9')}
              size="large"
              sx={{ p: 1 }}
            >
              <IconifyIcon
                icon="material-symbols:mic-rounded"
                sx={{ fontSize: 20, color: 'text.primary' }}
              />
            </IconButton>
            <ButtonGroup variant="contained" sx={{ ml: 'auto' }}>
              <Button sx={{ borderRight: '0 !important' }}>
                {translateUi('ui.sections.email.email_details.emailreply.send_9bc2575c')}
              </Button>
              <Button size="small">
                <IconifyIcon
                  icon="material-symbols:keyboard-arrow-down-rounded"
                  sx={{ fontSize: 20 }}
                />
              </Button>
            </ButtonGroup>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default EmailReply;
