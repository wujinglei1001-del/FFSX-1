import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Button,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { users } from 'data/users';

const BlogAuthor = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper
      variant="elevation"
      background={1}
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        mb: { xs: 3, md: 5 },
      }}
    >
      <List sx={{ py: 0, mb: 2 }}>
        <ListItem sx={{ alignItems: 'center', gap: 1, p: 0 }}>
          <ListItemAvatar sx={{ minWidth: 64 }}>
            <Avatar
              src={users[12].avatar}
              alt={translateUi('ui.sections.content.details.blog.avatar_9c3bb49f')}
              sx={{ width: 64, height: 64 }}
            />
          </ListItemAvatar>

          <ListItemText
            primary={
              <Stack
                sx={{
                  gap: 1,
                }}
              >
                <Typography
                  component={Link}
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                  }}
                >
                  {translateUi('ui.sections.content.details.blog.tsamina_mina_f6bd64fe')}
                </Typography>
                <Stack
                  direction="row"
                  sx={{
                    gap: { xs: 1, sm: 2 },
                    flexWrap: { xs: 'wrap', sm: 'nowrap' },
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 500,
                      color: 'text.secondary',
                    }}
                  >
                    {translateUi('ui.sections.content.details.blog.20_stories_de6bc4bb')}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 500,
                      color: 'text.secondary',
                    }}
                  >
                    {translateUi('ui.sections.content.details.blog.5_topics_bd446972')}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 500,
                      color: 'text.secondary',
                    }}
                  >
                    {translateUi('ui.sections.content.details.blog.100_followers_9daf27de')}
                  </Typography>
                </Stack>
              </Stack>
            }
            sx={{
              display: 'flex',
              gap: 2.5,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { sm: 'center' },
              justifyContent: 'space-between',
              my: 0,
            }}
          />
          <Button variant="soft" color="primary">
            {translateUi('ui.sections.content.details.blog.follow_66587a7a')}
          </Button>
        </ListItem>
      </List>
      <Typography sx={{ color: 'text.secondary' }}>
        {translateUi(
          'ui.sections.content.details.blog.hi_i_m_an_architect_and_writer_passionate_about_expl_9fe52bdb',
        )}
      </Typography>
    </Paper>
  );
};

export default BlogAuthor;
