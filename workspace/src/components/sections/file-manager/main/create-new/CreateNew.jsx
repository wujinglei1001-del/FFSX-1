import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListItemText, Typography } from '@mui/material';
import { Button, ListItemIcon, Menu, MenuItem } from '@mui/material';
import i18n from 'locales/i18n';
import IconifyIcon from 'components/base/IconifyIcon';

const menuItems = [
  {
    icon: 'material-symbols:create-new-folder-outline-rounded',
    get label() {
      return i18n.t('ui.sections.file_manager.main.create_new.new_folder_a711999b');
    },
    shortcut: '⌘ F',
  },
  {
    icon: 'material-symbols:upload-file-outline-rounded',
    get label() {
      return i18n.t('ui.sections.file_manager.main.create_new.file_upload_0ace8ef1');
    },
    shortcut: '⌘ U',
  },
  {
    icon: 'material-symbols:drive-folder-upload-outline-rounded',
    get label() {
      return i18n.t('ui.sections.file_manager.main.create_new.folder_upload_a5f16f03');
    },
    shortcut: '⌘ I',
  },
  {
    icon: 'material-symbols:note-add-outline-rounded',
    get label() {
      return i18n.t('ui.sections.file_manager.main.create_new.documents_687c8286');
    },
    subItems: [
      {
        icon: 'material-symbols:docs-outline-rounded',
        get label() {
          return i18n.t('ui.sections.file_manager.main.create_new.docs_68a41942');
        },
      },
      {
        icon: 'material-symbols:forms-add-on-rounded',
        get label() {
          return i18n.t('ui.sections.file_manager.main.create_new.forms_4bec9575');
        },
      },
      {
        icon: 'material-symbols:note-add-outline-rounded',
        get label() {
          return i18n.t('ui.sections.file_manager.main.create_new.word_44363ccb');
        },
      },
      { icon: 'material-symbols:picture-as-pdf-outline-rounded', label: 'PDF' },
    ],
  },
  {
    icon: 'material-symbols:post-add-rounded',
    get label() {
      return i18n.t('ui.sections.file_manager.main.create_new.presentation_6e875951');
    },
    subItems: [
      {
        icon: 'material-symbols:lab-profile-outline-rounded',
        get label() {
          return i18n.t('ui.sections.file_manager.main.create_new.sheets_3a97f965');
        },
      },
      {
        icon: 'material-symbols:co-present-outline-rounded',
        get label() {
          return i18n.t('ui.sections.file_manager.main.create_new.powerpoint_c470d762');
        },
      },
    ],
  },
];

const SubMenu = ({ open, anchorEl, onClose, items, onItemClick }) => (
  <Menu
    open={open}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
    sx={{
      pointerEvents: 'none',
      '& .MuiPaper-root': {
        pointerEvents: 'auto',
        width: 200,
      },
    }}
    slotProps={{
      paper: {
        onMouseLeave: onClose,
      },
    }}
  >
    {items.map((item, index) => (
      <MenuItem key={index} onClick={onItemClick}>
        <ListItemIcon>
          <IconifyIcon icon={item.icon} />
        </ListItemIcon>
        <ListItemText>{item.label}</ListItemText>
      </MenuItem>
    ))}
  </Menu>
);

const MenuItemComponent = ({
  item,
  onItemClick,
  onMouseEnter,
  onMouseLeave,
  subMenuOpen,
  subMenuAnchor,
}) => (
  <MenuItem
    onClick={item.subItems ? undefined : onItemClick}
    onMouseEnter={item.subItems ? onMouseEnter : undefined}
    onMouseLeave={item.subItems ? onMouseLeave : undefined}
    sx={{
      py: 1,
    }}
  >
    <ListItemIcon>
      <IconifyIcon icon={item.icon} />
    </ListItemIcon>
    <ListItemText>{item.label}</ListItemText>
    {item.shortcut && (
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
        }}
      >
        {item.shortcut}
      </Typography>
    )}
    {item.subItems && (
      <>
        <IconifyIcon icon="material-symbols:chevron-right-rounded" />
        <SubMenu
          items={item.subItems}
          open={subMenuOpen}
          anchorEl={subMenuAnchor}
          onClose={onMouseLeave}
          onItemClick={onItemClick}
        />
      </>
    )}
  </MenuItem>
);

const CreateNew = () => {
  const { t: translateUi } = useTranslation();
  const [mainMenuAnchor, setMainMenuAnchor] = useState(null);
  const [subMenuAnchor, setSubMenuAnchor] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleMainMenuClick = (event) => {
    setMainMenuAnchor(event.currentTarget);
  };

  const handleMainMenuClose = () => {
    setMainMenuAnchor(null);
    setOpenSubMenu(null);
    setSubMenuAnchor(null);
  };

  const handleSubMenuOpen = (event, label) => {
    setOpenSubMenu(label);
    setSubMenuAnchor(event.currentTarget);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<IconifyIcon icon="material-symbols:add-rounded" />}
        sx={{ flexShrink: 0 }}
        onClick={handleMainMenuClick}
      >
        {translateUi('ui.sections.file_manager.main.create_new.create_new_42604ae5')}
      </Button>

      <Menu
        anchorEl={mainMenuAnchor}
        open={Boolean(mainMenuAnchor)}
        onClose={handleMainMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              width: 200,
            },
          },
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItemComponent
            key={index}
            item={item}
            onItemClick={handleMainMenuClose}
            onMouseEnter={(e) => handleSubMenuOpen(e, item.label)}
            onMouseLeave={() => setOpenSubMenu(null)}
            subMenuOpen={openSubMenu === item.label}
            subMenuAnchor={subMenuAnchor}
          />
        ))}
      </Menu>
    </>
  );
};

export default CreateNew;
