import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import StatusAvatar from 'components/base/StatusAvatar';
import StyledTextField from 'components/styled/StyledTextField';

const SharedUser = ({ share }) => {
  const { t: translateUi } = useTranslation();
  const [permission, setPermission] = useState(share.permission);

  const handlePermissionChange = (event) => setPermission(event.target.value);

  return (
    <Stack
      direction="row"
      sx={{
        gap: 2,
      }}
    >
      <StatusAvatar
        src={share.user.avatar}
        status={share.user.status === 'online' ? 'online' : 'offline'}
        sx={{ height: 40, width: 40 }}
      />
      <Stack
        direction="row"
        sx={{
          gap: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexGrow: 1,
        }}
      >
        <Stack
          sx={{
            gap: 0.5,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {share.user.name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {share.user.email.split('.')[0] + '@' + share.user.email.split('@')[1]}
          </Typography>
        </Stack>
        <StyledTextField
          select
          fullWidth
          value={permission}
          size="small"
          onChange={handlePermissionChange}
          sx={{ maxWidth: 104 }}
        >
          <MenuItem value="owner">
            {translateUi('ui.sections.file_manager.main.file_info.owner_89ff3122')}
          </MenuItem>
          <MenuItem value="viewer">
            {translateUi('ui.sections.file_manager.main.file_info.can_view_35f3475b')}
          </MenuItem>
          <MenuItem value="editor">
            {translateUi('ui.sections.file_manager.main.file_info.can_edit_88fd881d')}
          </MenuItem>
        </StyledTextField>
      </Stack>
    </Stack>
  );
};

const FileAccessList = ({ file }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper background={1} sx={{ p: { xs: 3, md: 5 } }}>
      <Stack
        sx={{
          gap: 3,
        }}
      >
        <Stack
          direction="row"
          sx={{
            gap: 2,
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">
            {translateUi('ui.sections.file_manager.main.file_info.who_has_access_b82540c6')}
          </Typography>
          <Button size="small" color="neutral">
            {translateUi('ui.sections.file_manager.main.file_info.manage_access_4921ed7e')}
          </Button>
        </Stack>
        <Stack
          sx={{
            gap: 2,
          }}
        >
          {file.shared.map((share) => (
            <SharedUser key={share.id} share={share} />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default FileAccessList;
