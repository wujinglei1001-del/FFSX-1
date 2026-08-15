import { listClasses } from '@mui/material/List';
import Menu, { menuClasses } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import i18n from 'locales/i18n';

const defaultItems = [
  {
    get label() {
      return i18n.t('ui.sections.crm.common.crmdropdownmenu.edit_5301648d');
    },
  },
  {
    get label() {
      return i18n.t('ui.sections.crm.common.crmdropdownmenu.assign_24449284');
    },
  },
  {
    get label() {
      return i18n.t('ui.sections.crm.common.crmdropdownmenu.archive_2621c6fd');
    },
    sx: { color: 'error.main' },
  },
];

const CRMDropdownMenu = ({ menuItems = defaultItems, anchorEl, open, handleClose }) => {
  return (
    <Menu
      id="actions-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
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
            handleClose();
          }}
          {...rest}
        >
          {label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default CRMDropdownMenu;
