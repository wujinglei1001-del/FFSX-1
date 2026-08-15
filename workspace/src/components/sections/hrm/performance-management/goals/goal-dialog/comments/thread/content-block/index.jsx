import { useTranslation } from 'react-i18next';
import { Avatar, Link, Stack } from '@mui/material';
import Actions from './Actions';
import Attachments from './Attachments';
import AuthorInfo from './AuthorInfo';
import TextContent from './TextContent';

const ContentBlock = ({ content, toggleThreadInput }) => {
  const { t: translateUi } = useTranslation();

  return (
    <Stack direction="row" sx={{ gap: 2, alignItems: 'flex-start', pb: 2, pt: 1 }}>
      <Avatar
        component={Link}
        href="#!"
        src={content.author.avatar}
        alt={translateUi('common.accessibility.content_author_avatar')}
        sx={{
          width: 32,
          height: 32,
          color: 'unset',
        }}
      />
      <Stack sx={{ minWidth: 0 }}>
        <Stack sx={{ gap: 1 }}>
          <AuthorInfo author={content.author.name} createdAt={content.createdAt} />

          {content.message.text && <TextContent content={content.message.text} />}
          {content.message.attachments && (
            <Attachments
              attachments={content.message.attachments}
              sx={{
                '& img, & video': {
                  width: 1,
                  height: 1,
                  objectFit: 'cover',
                  aspectRatio: 1,
                },
              }}
            />
          )}

          <Actions engagement={content.engagement} toggleThreadInput={toggleThreadInput} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ContentBlock;
