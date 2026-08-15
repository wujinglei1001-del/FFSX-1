import { useTranslation } from 'react-i18next';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const EditDeleteMenu = ({ onEdit, onDelete, ...rest }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Menu {...rest}>
      <MenuItem onClick={onEdit}>
        {translateUi('ui.sections.hiring.admin.new_opening.edit_5301648d')}
      </MenuItem>
      <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
        {translateUi('ui.sections.hiring.admin.new_opening.delete_f6fdbe48')}
      </MenuItem>
    </Menu>
  );
};

export default EditDeleteMenu;
