import { useTranslation } from 'react-i18next';
import { Link, Paper, Typography } from '@mui/material';
import { useEcommerce } from 'providers/EcommerceProvider';
import paths from 'routes/paths';
import QuantityButtons from '../../common/QuantityButtons';

const Quantity = ({ sx }) => {
  const { t: translateUi } = useTranslation();
  const { product, setProduct } = useEcommerce();

  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, ...sx }}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
        }}
      >
        {translateUi('ui.sections.ecommerce.customer.product_details.quantity_44f6af69')}
      </Typography>
      <QuantityButtons
        defaultValue={1}
        handleChange={(quantity) => {
          if (product) {
            setProduct({ ...product, quantity: quantity });
          }
        }}
        sx={{ mb: 0.5 }}
      />
      <Link variant="caption" href={paths.products}>
        {translateUi('ui.sections.ecommerce.customer.product_details.check_availability_8bfdae52')}
      </Link>
    </Paper>
  );
};

export default Quantity;
