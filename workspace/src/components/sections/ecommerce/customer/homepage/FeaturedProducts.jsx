import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import paths from 'routes/paths';
import ProductCard from '../common/ProductCard';

const FeaturedProducts = ({ products }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Box sx={{ px: { xs: 3, md: 5 }, py: 5 }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          mb: 4,
        }}
      >
        {translateUi(
          'ui.sections.ecommerce.customer.homepage.featured_products_just_for_you_fd452f1c',
        )}
      </Typography>
      <Grid
        container
        columns={{ xs: 1, sm: 2, md: 3, xl: 5 }}
        sx={{
          mb: 4,
        }}
      >
        {products.map((product) => (
          <Grid key={product.id} size={1}>
            <ProductCard product={product} sx={{ borderRadius: 2 }} />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="neutral"
        href={paths.products}
        sx={{
          display: 'block',
          mx: 'auto',
          width: 'fit-content',
        }}
      >
        {translateUi('ui.sections.ecommerce.customer.homepage.load_more_products_e9797b49')}
      </Button>
    </Box>
  );
};

export default FeaturedProducts;
