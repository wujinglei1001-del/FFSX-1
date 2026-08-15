import { useTranslation } from 'react-i18next';
import {
  Button,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import { useChatContext } from 'providers/ChatProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import RecipientAvatar from 'components/sections/chat/common/RecipientAvatar';

const ContentHeader = ({ sx, handleDrawerToggle }) => {
  const { t: translateUi } = useTranslation();
  const { handleChatSidebar, currentConversation } = useChatContext();
  const { down } = useBreakpoints();

  const downSm = down('sm');

  return (
    <Paper sx={{ px: { xs: 3, md: 5 }, py: 3, zIndex: 10, ...sx }}>
      <Stack
        direction="row"
        sx={{
          gap: 3,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack
          direction="row"
          sx={{
            gap: 1,
            alignItems: 'center',
          }}
        >
          {downSm && (
            <Tooltip
              title={translateUi('ui.sections.chat.conversation.main.conversation_list_c0f0a0f2')}
            >
              <Button
                shape="circle"
                variant="soft"
                color="neutral"
                onClick={() => handleChatSidebar(true)}
              >
                <IconifyIcon icon="material-symbols:chevron-left-rounded" fontSize={20} />
              </Button>
            </Tooltip>
          )}

          <List dense disablePadding>
            <ListItemButton
              disableTouchRipple
              sx={{ gap: { xs: 1, sm: 2 }, p: 0, '&:hover': { bgcolor: 'transparent' } }}
              onClick={handleDrawerToggle}
            >
              <ListItemAvatar sx={{ minWidth: 0 }}>
                {currentConversation ? (
                  <RecipientAvatar
                    recipients={currentConversation.recipients}
                    avatarStyles={{ width: 36, height: 36 }}
                    badgeStyles={{ width: 13, height: 13, border: 2 }}
                  />
                ) : (
                  <Skeleton variant="circular" width={36} height={36} />
                )}
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      lineClamp: 1,
                      wordBreak: 'break-all',
                    }}
                  >
                    {currentConversation ? (
                      currentConversation.conversationName ||
                      currentConversation.recipients.map(({ name }) => name).join(', ')
                    ) : (
                      <Skeleton variant="text" width={100} />
                    )}
                  </Typography>
                }
              />
            </ListItemButton>
          </List>
        </Stack>

        <Stack
          direction="row"
          sx={{
            gap: 1,
          }}
        >
          <Tooltip
            title={translateUi('ui.sections.chat.conversation.main.start_a_voice_call_198b4625')}
          >
            <Button variant="soft" color="neutral" shape="circle">
              <IconifyIcon icon="material-symbols:call-outline" fontSize={20} />
            </Button>
          </Tooltip>
          <Tooltip
            title={translateUi('ui.sections.chat.conversation.main.start_a_video_call_57516ade')}
          >
            <Button variant="soft" color="neutral" shape="circle">
              <IconifyIcon icon="material-symbols:videocam-outline-rounded" fontSize={20} />
            </Button>
          </Tooltip>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ContentHeader;
