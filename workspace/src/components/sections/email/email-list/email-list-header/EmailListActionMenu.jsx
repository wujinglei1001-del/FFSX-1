import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Menu, MenuItem, listClasses } from '@mui/material';
import { useBulkSelect } from 'providers/BulkSelectProvider';
import { useEmailContext } from 'providers/EmailProvider';
import { UPDATE_MESSAGE_STATUS } from 'reducers/EmailReducer';
import IconifyIcon from 'components/base/IconifyIcon';

const EmailListActionMenu = () => {
  const { t: translateUi } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const { selectedIds } = useBulkSelect();
  const { emailDispatch } = useEmailContext();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleReadStatus = (actionType) => {
    emailDispatch({
      type: UPDATE_MESSAGE_STATUS,
      payload: { ids: selectedIds, actionType: actionType },
    });
  };

  return (
    <>
      <IconButton
        size="small"
        sx={{ ml: 'auto' }}
        id="email-list-more-btn"
        aria-controls={open ? 'email-list-more-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        disabled={!selectedIds.length}
      >
        <IconifyIcon
          icon="material-symbols:more-horiz"
          sx={{ fontSize: 20, color: `${!selectedIds.length ? 'text.disabled' : 'text.primary'}` }}
        />
      </IconButton>
      <Menu
        id="email-list-more-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'email-list-more-btn',
          },
        }}
        sx={{
          [`& .${listClasses.root}`]: {
            minWidth: 150,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            toggleReadStatus('mark_as_read');
          }}
        >
          {translateUi('ui.sections.email.email_list.email_list_header.mark_as_read_c1ee860b')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            toggleReadStatus('mark_as_unread');
          }}
        >
          {translateUi('ui.sections.email.email_list.email_list_header.mark_as_unread_5eeffe7d')}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {translateUi('ui.sections.email.email_list.email_list_header.print_5b221e9c')}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {translateUi('ui.sections.email.email_list.email_list_header.block_82dd2cdf')}
        </MenuItem>
      </Menu>
    </>
  );
};

export default EmailListActionMenu;
