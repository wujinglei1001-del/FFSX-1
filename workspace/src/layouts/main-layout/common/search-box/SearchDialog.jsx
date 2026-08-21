import { Dialog, dialogClasses } from '@mui/material';
import SearchResult from './SearchResult';

const SearchDialog = ({ anchorEl, handleClose, navigation }) => {
  const open = Boolean(anchorEl);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      sx={{
        [`& .${dialogClasses.paper}`]: {
          bgcolor: 'background.menu',
          width: '100%',
          borderRadius: 2,
          outline: 'none',
          overflow: 'hidden',
        },
      }}
    >
      <SearchResult handleClose={handleClose} navigation={navigation} />
    </Dialog>
  );
};

export default SearchDialog;
