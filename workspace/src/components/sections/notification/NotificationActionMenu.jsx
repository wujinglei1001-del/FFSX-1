import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconifyIcon from 'components/base/IconifyIcon';

const NotificationActionMenu = () => {
  const { t: translateUi } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { direction } = useTheme();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button shape="square" color="neutral" variant="text" onClick={handleClick}>
        <IconifyIcon icon="material-symbols:more-horiz" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'notification-action',
          },
        }}
        transformOrigin={{ horizontal: direction === 'rtl' ? 'left' : 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: direction === 'rtl' ? 'left' : 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
          {translateUi(
            'ui.sections.notification.notificationactionmenu.remove_notification_a873bf39',
          )}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {translateUi('ui.sections.notification.notificationactionmenu.report_issue_6e2c7123')}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NotificationActionMenu;
