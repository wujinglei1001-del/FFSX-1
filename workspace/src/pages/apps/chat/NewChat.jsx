import { useState } from 'react';
import { Paper, Stack } from '@mui/material';
import ContentFooter from 'components/sections/chat/conversation/main/content-footer/ContentFooter';
import NewChatHeader from 'components/sections/chat/new/NewChatHeader';

const NewChat = () => {
  const [selectedRecipients, setSelectedRecipients] = useState([]);

  const handleRecipientsChange = (recipients) => {
    setSelectedRecipients(recipients);
  };

  return (
    <Stack
      component={Paper}
      sx={{
        justifyContent: 'space-between',
        height: 1,
        width: 1,
        position: 'relative',
      }}
    >
      <NewChatHeader
        selectedRecipients={selectedRecipients}
        onRecipientsChange={handleRecipientsChange}
      />
      <ContentFooter recipients={selectedRecipients} />
    </Stack>
  );
};

export default NewChat;
