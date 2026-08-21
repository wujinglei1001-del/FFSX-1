import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Button,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { users } from 'data/users';
import useNumberFormat from 'hooks/useNumberFormat';
import paths from 'routes/paths';

const ChannelInfo = () => {
  const { t: translateUi } = useTranslation();
  const { numberFormat } = useNumberFormat();
  const [following, setFollowing] = useState(false);

  return (
    <List disablePadding sx={{ mb: 3, width: 'fit-content' }}>
      <ListItem sx={{ alignItems: 'center', gap: 1, p: 0 }}>
        <ListItemAvatar sx={{ minWidth: 48 }}>
          <Avatar
            src={users[0].avatar}
            alt={translateUi('ui.sections.content.details.video.avatar_9c3bb49f')}
            sx={{ width: 48, height: 48 }}
          />
        </ListItemAvatar>

        <ListItemText
          disableTypography
          primary={
            <Link
              href={paths.memberProfile}
              variant="subtitle1"
              sx={{ fontWeight: 'bold', mb: 0.5, width: 'fit-content', color: 'inherit' }}
            >
              {users[0].name}
            </Link>
          }
          secondary={
            <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
              <Typography
                variant="caption"
                component="p"
                sx={{ fontWeight: 'medium', color: 'text.secondary', whiteSpace: 'nowrap' }}
              >
                {numberFormat(20, {
                  notation: 'compact',
                  compactDisplay: 'short',
                })}{' '}
                {translateUi('ui.sections.content.details.video.stories_67b5fefd')}
              </Typography>
              <Typography
                variant="caption"
                component="p"
                sx={{ fontWeight: 'medium', color: 'text.secondary', whiteSpace: 'nowrap' }}
              >
                {translateUi('ui.sections.content.details.video.100_followers_9daf27de')}
              </Typography>
            </Stack>
          }
          sx={{
            display: 'flex',
            flexDirection: 'column',
            my: 0,
          }}
        />
        <Button
          variant="soft"
          color="primary"
          onClick={() => setFollowing(!following)}
          sx={{ ml: 3 }}
        >
          {following ? 'Following' : 'Follow'}
        </Button>
      </ListItem>
    </List>
  );
};

export default ChannelInfo;
