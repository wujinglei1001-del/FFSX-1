import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import { useChatContext } from 'providers/ChatProvider';
import RecipientAvatar from 'components/sections/chat/common/RecipientAvatar';

const StarterMessage = () => {
  const { t: translateUi } = useTranslation();
  const { currentConversation } = useChatContext();

  if (!currentConversation) return;

  return (
    <Stack direction="row" sx={{ alignItems: 'center', gap: 2, px: { xs: 3, md: 5 } }}>
      {currentConversation && (
        <RecipientAvatar
          recipients={currentConversation.recipients}
          avatarStyles={{ width: 80, height: 80 }}
          badgeStyles={{ width: 20, height: 20, border: 3 }}
        />
      )}
      <Typography
        variant="subtitle2"
        sx={{
          lineHeight: 1.6,
        }}
      >
        {translateUi(
          'ui.sections.chat.conversation.main.this_is_the_very_beginning_of_the_conversation_betwe_225d7020',
        )}
        <strong>{translateUi('common.you')}</strong>
        {currentConversation.recipients.length > 1 ? (
          <>
            ,{' '}
            <strong>
              {currentConversation.recipients
                .slice(0, 2)
                .map(({ name }) => name)
                .join(', ')}
            </strong>
            {currentConversation.recipients.length > 2 && (
              <>
                {' '}
                {translateUi('common.and')}{' '}
                <strong>
                  {currentConversation.recipients.length === 3
                    ? currentConversation.recipients[2].name
                    : `${currentConversation.recipients.length - 2} others`}
                </strong>
              </>
            )}
          </>
        ) : (
          <>
            {' '}
            {translateUi('common.and')} <strong>{currentConversation.recipients[0].name}</strong>
          </>
        )}
      </Typography>
    </Stack>
  );
};

export default StarterMessage;
