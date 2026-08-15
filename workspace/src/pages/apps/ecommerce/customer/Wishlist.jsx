import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import illustrationDark from 'assets/images/illustrations/1-dark.webp';
import illustration from 'assets/images/illustrations/1.webp';
import { wishlistedProducts } from 'data/e-commerce/products';
import paths from 'routes/paths';
import Image from 'components/base/Image';
import PageHeader from 'components/sections/ecommerce/customer/common/PageHeader';
import Productlist from 'components/sections/ecommerce/customer/wishlist/ProductList';
import WishlistActions from 'components/sections/ecommerce/customer/wishlist/WishlistActions';

const Wishlist = () => {
  const { t: translateUi } = useTranslation();
  const [products, setProducts] = useState(wishlistedProducts);

  const handleRemoveProduct = useCallback((productId) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  }, []);

  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader
          title={translateUi('ui.pages.apps.ecommerce.customer.wishlist_6ff33102')}
          userLoggedIn
          breadcrumb={[
            {
              label: translateUi('ui.pages.apps.ecommerce.customer.home_70f8bb9a'),
              url: paths.ecommerceHomepage,
            },
            {
              label: translateUi('ui.pages.apps.ecommerce.customer.wishlist_6ff33102'),
              active: true,
            },
          ]}
        />
      </Grid>
      <Grid size={12}>
        <Paper sx={{ height: 1, px: { xs: 3, md: 5 }, py: { xs: 5, md: 8 } }}>
          <Container maxWidth="lg" sx={{ px: { xs: 0 } }}>
            <WishlistActions />

            {products.length > 0 ? (
              <Productlist
                wishlistedProducts={products}
                handleRemoveProduct={handleRemoveProduct}
              />
            ) : (
              <Stack
                sx={{
                  height: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 3,
                  textAlign: 'center',
                  p: 5,
                }}
              >
                <Image
                  src={{
                    light: illustration,
                    dark: illustrationDark,
                  }}
                  alt={translateUi('ui.pages.apps.ecommerce.customer.products_fallback_408585b2')}
                  height={340}
                  width={340}
                />
                <div>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                    }}
                  >
                    {translateUi(
                      'ui.pages.apps.ecommerce.customer.your_wishlist_is_empty_3237bb57',
                    )}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      mb: 3,
                    }}
                  >
                    {translateUi(
                      'ui.pages.apps.ecommerce.customer.browse_our_products_and_add_your_favorite_items_to_y_d9664e5f',
                    )}
                  </Typography>
                  <Button variant="contained" color="primary" href={paths.products}>
                    {translateUi('ui.pages.apps.ecommerce.customer.browse_products_9a6a2235')}
                  </Button>
                </div>
              </Stack>
            )}
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Wishlist;
