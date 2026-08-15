import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Menu, MenuItem, listClasses, menuClasses } from '@mui/material';
import i18n from 'locales/i18n';
import EllipsisHorizontalIcon from 'components/icons/EllipsisHorizontalIcon';

const defaultItems = [
  {
    get label() {
      return i18n.t('ui.components.common.dashboardmenu.sync_905f6309');
    },
  },
  {
    get label() {
      return i18n.t('ui.components.common.dashboardmenu.export_f3e4fadb');
    },
  },
  {
    get label() {
      return i18n.t('ui.components.common.dashboardmenu.remove_e963907d');
    },
    sx: { color: 'error.main' },
  },
];

const DashboardMenu = ({
  menuItems = defaultItems,
  icon = <EllipsisHorizontalIcon />,
  iconOnly = false,
  size = 'small',
  variant = 'text',
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
  transformOrigin = { vertical: 'top', horizontal: 'right' },
  disabled = false,
  shape = 'square',
  color = 'neutral',
  sx,
  ...rest
}) => {
  const { t: translateUi } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(null);
  };

  if (iconOnly) {
    return icon;
  }

  return (
    <>
      <Button
        sx={{ color: 'text.primary', ...sx }}
        shape={shape}
        color={color}
        size={size}
        variant={variant}
        disabled={disabled}
        aria-label={translateUi('ui.components.common.dashboardmenu.more_e7c95b4c')}
        id="action-button"
        aria-controls={open ? 'actions-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        {...rest}
      >
        {icon}
      </Button>

      <Menu
        id="actions-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        sx={{
          [`& .${menuClasses.paper}`]: {
            [`& .${listClasses.root}`]: {
              minWidth: 120,
            },
          },
        }}
        slotProps={{
          list: {
            'aria-labelledby': 'action-button',
          },
        }}
      >
        {menuItems.map(({ label, onClick, ...rest }) => (
          <MenuItem
            key={label}
            onClick={(e) => {
              if (onClick) {
                onClick(e);
              }
              handleClose(e);
            }}
            {...rest}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DashboardMenu;
