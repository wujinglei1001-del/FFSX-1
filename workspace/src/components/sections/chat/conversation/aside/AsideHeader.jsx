import { useTranslation } from 'react-i18next';
import { Button, Paper, Stack, Tooltip } from '@mui/material';
import { useChatContext } from 'providers/ChatProvider';
import { TOGGLE_STARRED_CONVERSATION } from 'reducers/ChatReducer';
import IconifyIcon from 'components/base/IconifyIcon';

const AsideHeader = ({ handleClose }) => {
  const { t: translateUi } = useTranslation();
  const { currentConversation, chatDispatch } = useChatContext();

  const handleToggleStarred = () => {
    if (currentConversation) {
      chatDispatch({ type: TOGGLE_STARRED_CONVERSATION });
    }
  };

  return (
    <Paper
      background={1}
      sx={{
        zIndex: 1,
        px: { xs: 3, md: 5 },
        py: 3,
      }}
    >
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" sx={{ gap: 1 }}>
          <Button
            variant="soft"
            color={currentConversation?.starred ? 'warning' : 'neutral'}
            startIcon={
              <IconifyIcon
                icon="material-symbols:star-rate-rounded"
                sx={{ fontSize: '20px !important' }}
              />
            }
            onClick={handleToggleStarred}
          >
            {translateUi('ui.sections.chat.conversation.aside.starred_e61561a8')}
          </Button>
          <Button
            variant="soft"
            color="neutral"
            startIcon={
              <IconifyIcon
                icon="material-symbols:notifications-outline-rounded"
                sx={{ fontSize: '20px !important' }}
              />
            }
          >
            {translateUi('ui.sections.chat.conversation.aside.mute_0f097348')}
          </Button>
        </Stack>

        <Tooltip title={translateUi('ui.sections.chat.conversation.aside.close_bbfa773e')}>
          <Button shape="circle" variant="soft" color="neutral" onClick={handleClose}>
            <IconifyIcon icon="material-symbols:close-rounded" sx={{ fontSize: 20 }} />
          </Button>
        </Tooltip>
      </Stack>
    </Paper>
  );
};

export default AsideHeader;
