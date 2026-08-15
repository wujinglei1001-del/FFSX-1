import { useTranslation } from 'react-i18next';
import { Alert, Snackbar } from '@mui/material';

const AddToCartSnackbar = ({ open, handleClose }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ borderRadius: 7, boxShadow: (theme) => theme.vars.shadows[3] }}
      >
        {translateUi(
          'ui.sections.ecommerce.customer.common.added_to_the_cart_successfully_f6ad5caa',
        )}
      </Alert>
    </Snackbar>
  );
};

export default AddToCartSnackbar;
