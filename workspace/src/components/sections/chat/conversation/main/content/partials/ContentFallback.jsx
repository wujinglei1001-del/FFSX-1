import { useTranslation } from 'react-i18next';
import { Chip, Stack, Typography } from '@mui/material';
import { useChatContext } from 'providers/ChatProvider';
import { SENT_MESSAGE } from 'reducers/ChatReducer';

const ContentFallback = () => {
  const { t: translateUi } = useTranslation();
  const { chatDispatch, currentConversation } = useChatContext();

  const handleNewMessage = (text) => {
    if (!currentConversation) return;

    chatDispatch({
      type: SENT_MESSAGE,
      payload: {
        conversationId: currentConversation.id,
        message: { text },
      },
    });
  };

  return (
    <Stack
      sx={{
        height: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        maxWidth: 300,
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          mb: 1,
        }}
      >
        {translateUi('ui.sections.chat.conversation.main.no_messages_here_yet_8db69c74')}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          mb: 3,
        }}
      >
        {translateUi(
          'ui.sections.chat.conversation.main.write_something_or_tap_on_one_of_the_messages_to_sta_9e611cdd',
        )}
      </Typography>
      {["Hey there! 👋 How's your day going?", 'Hi! What are you up to today? 😄'].map(
        (text, i) => (
          <Chip
            key={i}
            label={text}
            variant="soft"
            color="neutral"
            sx={{ mb: 1 }}
            onClick={() => handleNewMessage(text)}
          />
        ),
      )}
    </Stack>
  );
};

export default ContentFallback;
