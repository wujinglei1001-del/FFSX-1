import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Menu, MenuItem, listClasses, menuClasses, useTheme } from '@mui/material';
import i18n from 'locales/i18n';
import IconifyIcon from 'components/base/IconifyIcon';
import EllipsisHorizontalIcon from 'components/icons/EllipsisHorizontalIcon';

const defaultItems = [
  {
    id: 'file-info',
    get label() {
      return i18n.t('ui.sections.file_manager.common.fmdropdownmenu.file_info_710a38a1');
    },
    icon: 'material-symbols:info-outline-rounded',
  },
  {
    id: 'share',
    get label() {
      return i18n.t('ui.sections.file_manager.common.fmdropdownmenu.share_09ca55ca');
    },
    icon: 'material-symbols:share-outline',
  },
  {
    id: 'edit',
    get label() {
      return i18n.t('ui.sections.file_manager.common.fmdropdownmenu.edit_5301648d');
    },
    icon: 'material-symbols:edit-outline-rounded',
  },
  {
    id: 'download',
    get label() {
      return i18n.t('ui.sections.file_manager.common.fmdropdownmenu.download_a479c9c3');
    },
    icon: 'material-symbols:download-rounded',
  },
  {
    id: 'rename',
    get label() {
      return i18n.t('ui.sections.file_manager.common.fmdropdownmenu.rename_d3f4cb89');
    },
    icon: 'material-symbols:edit-note-outline-rounded',
  },
  {
    id: 'view-source',
    get label() {
      return i18n.t('ui.sections.file_manager.common.fmdropdownmenu.view_source_accd4b91');
    },
    icon: 'material-symbols:topic-outline-rounded',
  },
  {
    id: 'copy-file',
    get label() {
      return i18n.t('ui.sections.file_manager.common.fmdropdownmenu.copy_file_e1199d6a');
    },
    icon: 'material-symbols:file-copy-outline-rounded',
  },
  {
    id: 'move-file',
    get label() {
      return i18n.t('ui.sections.file_manager.common.fmdropdownmenu.move_file_4686a9b0');
    },
    icon: 'material-symbols:exit-to-app-rounded',
  },
  {
    id: 'make-favorite',
    get label() {
      return i18n.t('ui.sections.file_manager.common.fmdropdownmenu.make_favorite_ed83d487');
    },
    icon: 'material-symbols:star-rate-rounded',
  },
  {
    id: 'delete-file',
    get label() {
      return i18n.t('ui.sections.file_manager.common.fmdropdownmenu.delete_file_d8b147e7');
    },
    icon: 'material-symbols:delete-outline-rounded',
    sx: { color: 'error.main' },
  },
];

const FMDropdownMenu = ({
  menuItems = defaultItems,
  icon = <EllipsisHorizontalIcon />,
  size = 'small',
  color = 'neutral',
  variant = 'text',
  sx,
  onMenuToggle,
}) => {
  const { t: translateUi } = useTranslation();
  const { direction } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    onMenuToggle?.(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    onMenuToggle?.(false);
  };

  return (
    <>
      <Button
        sx={{ color: 'text.primary', ...sx }}
        shape="square"
        color={color}
        size={size}
        variant={variant}
        aria-label={translateUi('ui.sections.file_manager.common.fmdropdownmenu.more_e7c95b4c')}
        id="action-button"
        disableElevation={false}
        aria-controls={open ? 'actions-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {icon}
      </Button>

      <Menu
        id="actions-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: direction === 'rtl' ? 'left' : 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: direction === 'rtl' ? 'left' : 'right',
        }}
        sx={{
          [`& .${menuClasses.paper}`]: {
            [`& .${listClasses.root}`]: {
              minWidth: 200,
            },
          },
        }}
        slotProps={{
          list: {
            'aria-labelledby': 'action-button',
          },
        }}
      >
        {menuItems.map(({ id, label, icon, onClick, sx, ...rest }) => (
          <MenuItem
            key={id}
            onClick={(e) => {
              if (onClick) {
                onClick(e);
              }
              e.stopPropagation();
              handleClose();
            }}
            sx={{ gap: 1, ...sx }}
            {...rest}
          >
            <IconifyIcon icon={icon} sx={{ fontSize: 16 }} />
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default FMDropdownMenu;
