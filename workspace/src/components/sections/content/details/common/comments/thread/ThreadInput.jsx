import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Button, Link, Stack } from '@mui/material';
import { inputBaseClasses } from '@mui/material/InputBase';
import { profileData } from 'data/social';
import { useSnackbar } from 'notistack';
import paths from 'routes/paths';
import StyledTextField from 'components/styled/StyledTextField';

const ThreadInput = ({ sx, placeholder = 'Comment to this post...', toggleThreadInput }) => {
  const { t: translateUi } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [text, setText] = useState('');

  return (
    <Stack
      className="comment"
      direction="row"
      sx={{
        gap: 2,
        py: 1,
        position: 'relative',
        ...sx,
      }}
    >
      <Avatar
        component={Link}
        href={paths.memberProfile}
        src={profileData.avatar}
        alt={translateUi('common.accessibility.comment_author_avatar')}
        sx={{ width: 32, height: 32, color: 'unset' }}
      />
      <Stack sx={{ gap: 2, flexGrow: 1 }}>
        <StyledTextField
          id="filled-multiline-flexible"
          placeholder={placeholder}
          multiline
          value={text}
          onChange={(e) => setText(e.target.value)}
          minRows={3}
          maxRows={4}
          size="small"
          sx={{
            [`& .${inputBaseClasses.root}`]: {
              py: 0,
              bgcolor: 'background.elevation2',
              '&:hover': { bgcolor: 'background.elevation2' },
              [`&.${inputBaseClasses.focused}`]: {
                boxShadow: 'none',
                bgcolor: 'background.elevation2',
              },
            },
          }}
        />
        <Stack direction="row" sx={{ gap: 1, justifyContent: 'flex-end' }}>
          <Button
            color="neutral"
            onClick={() => {
              setText('');
              toggleThreadInput();
            }}
          >
            {translateUi('ui.sections.content.details.common.discard_36fff63c')}
          </Button>
          <Button
            variant="contained"
            disabled={text.trim().length === 0}
            onClick={() => {
              enqueueSnackbar('Comment added!', { variant: 'success', autoHideDuration: 3000 });
              toggleThreadInput();
            }}
          >
            {translateUi('ui.sections.content.details.common.comment_153d7a58')}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ThreadInput;
