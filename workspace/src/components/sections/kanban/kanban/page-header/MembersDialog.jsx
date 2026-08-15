import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Stack,
  Typography,
  dialogClasses,
  filledInputClasses,
  listItemButtonClasses,
  listItemSecondaryActionClasses,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import StyledTextField from 'components/styled/StyledTextField';

const MembersDialog = ({ members, open, handleClose }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        [`& .${dialogClasses.paper}`]: {
          borderRadius: 6,
          width: 375,
        },
      }}
    >
      <DialogContent sx={{ p: 0, pt: 3 }}>
        <List dense disablePadding>
          {members.map(({ avatar, name }) => (
            <ListItem
              key={name}
              disablePadding
              secondaryAction={
                <Stack
                  direction="row"
                  sx={{
                    gap: { sm: 1 },
                  }}
                >
                  <StyledTextField
                    select
                    size="small"
                    defaultValue="Admin"
                    sx={(theme) => ({
                      minWidth: 90,
                      color: 'text.secondary',
                      [`& .${filledInputClasses.root}`]: {
                        bgcolor: 'transparent',
                        '&:focus-within': {
                          bgcolor: theme.vars.palette.primary.lighter,
                        },
                      },
                    })}
                  >
                    <MenuItem value="Member">
                      {translateUi('ui.sections.kanban.kanban.page_header.member_6853c98a')}
                    </MenuItem>
                    <MenuItem value="Admin">
                      {translateUi('ui.sections.kanban.kanban.page_header.admin_4e7afebc')}
                    </MenuItem>
                    <MenuItem value="Guest">
                      {translateUi('ui.sections.kanban.kanban.page_header.guest_face83ee')}
                    </MenuItem>
                  </StyledTextField>
                  <Button size="small" shape="circle" color="neutral" sx={{ flexShrink: 0 }}>
                    <IconifyIcon icon="material-symbols:close-rounded" fontSize={18} />
                  </Button>
                </Stack>
              }
              sx={{
                [`& .${listItemButtonClasses.root}`]: {
                  pr: 19,
                  py: '11px',
                  pl: 3,
                  '&:hover': { bgcolor: 'transparent' },
                },
                [`& .${listItemSecondaryActionClasses.root}`]: {
                  right: 24,
                },
              }}
            >
              <ListItemButton sx={{ borderRadius: 0 }}>
                <ListItemAvatar sx={{ minWidth: 32 }}>
                  <Avatar src={avatar} sx={{ height: 24, width: 24 }} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: 'text.primary',
                        fontWeight: 400,
                        lineClamp: 1,
                        wordBreak: 'break-all',
                        overflow: 'hidden',
                      }}
                    >
                      {name}
                    </Typography>
                  }
                  sx={{ my: 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button color="neutral" onClick={handleClose}>
          {translateUi('ui.sections.kanban.kanban.page_header.cancel_77dfd213')}
        </Button>
        <Button onClick={handleClose} autoFocus>
          {translateUi('ui.sections.kanban.kanban.page_header.confirm_04a21221')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MembersDialog;
