import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
  listItemButtonClasses,
} from '@mui/material';
import { getFileIcon } from 'lib/utils';
import { useChatContext } from 'providers/ChatProvider';
import IconifyIcon from 'components/base/IconifyIcon';

const FileAttachments = () => {
  const { t: translateUi } = useTranslation();
  const [attachmentsCount, setAttachmentsCount] = useState(4);
  const { currentConversation } = useChatContext();

  const fileAttachments =
    currentConversation?.messages.flatMap(
      (conversation) => conversation.attachments?.files?.map((file) => ({ ...file })) || [],
    ) || [];

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: fileAttachments.length > 0 ? 4 : 2,
          px: { md: 2 },
        }}
      >
        <Typography variant="h6">
          {translateUi('ui.sections.chat.conversation.aside.files_6ce6c512')}
        </Typography>
        <Button
          variant="text"
          disabled={!fileAttachments.length}
          onClick={() => setAttachmentsCount(fileAttachments.length)}
        >
          {translateUi('ui.sections.chat.conversation.aside.view_all_931e1a4b')}
        </Button>
      </Stack>
      {fileAttachments.length > 0 ? (
        <List disablePadding>
          {fileAttachments.slice(0, attachmentsCount).map((file, index) => (
            <ListItem
              key={index}
              disablePadding
              secondaryAction={
                <Stack direction="row" sx={{ gap: 0.5 }}>
                  <Tooltip
                    title={translateUi('ui.sections.chat.conversation.aside.download_a479c9c3')}
                  >
                    <Button variant="text" color="neutral" shape="square" size="small">
                      <IconifyIcon icon="material-symbols:download-rounded" fontSize={18} />
                    </Button>
                  </Tooltip>

                  <Tooltip
                    title={translateUi('ui.sections.chat.conversation.aside.delete_f6fdbe48')}
                  >
                    <Button variant="text" color="neutral" shape="square" size="small">
                      <IconifyIcon icon="material-symbols:delete-outline-rounded" fontSize={18} />
                    </Button>
                  </Tooltip>
                </Stack>
              }
              sx={{
                [`& .${listItemButtonClasses.root}`]: {
                  pr: 11,
                },
              }}
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    sx={{ width: 40, height: 40, bgcolor: 'primary.lighter', borderRadius: 2 }}
                  >
                    <IconifyIcon
                      icon={getFileIcon(file.format)}
                      sx={{ fontSize: 24, color: 'text.primary' }}
                    />
                  </Avatar>
                </ListItemAvatar>

                <Tooltip title={file.name}>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          lineClamp: 1,
                          wordBreak: 'break-all',
                          overflow: 'hidden',
                        }}
                      >
                        {file.name}
                      </Typography>
                    }
                  />
                </Tooltip>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography
          variant="subtitle2"
          sx={{
            color: 'text.disabled',
            px: { md: 2 },
          }}
        >
          {translateUi('ui.sections.chat.conversation.aside.no_files_attached_yet_d50be62f')}
        </Typography>
      )}
    </Box>
  );
};

export default FileAttachments;
