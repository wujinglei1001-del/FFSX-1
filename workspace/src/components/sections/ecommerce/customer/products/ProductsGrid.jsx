import { useTranslation } from 'react-i18next';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import illustrationDark from 'assets/images/illustrations/1-dark.webp';
import illustration from 'assets/images/illustrations/1.webp';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import Image from 'components/base/Image';
import ProductCard from '../common/ProductCard';

const ProductsGrid = ({ products }) => {
  const { t: translateUi } = useTranslation();
  const { up } = useBreakpoints();
  const upSm = up('sm');

  return (
    <>
      <Box sx={{ flex: 1 }}>
        {products.length > 0 ? (
          <Box
            sx={{
              p: 2,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
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
              src={{ light: illustration, dark: illustrationDark }}
              alt={translateUi(
                'ui.sections.ecommerce.customer.products.products_fallback_408585b2',
              )}
              height={340}
              width={340}
            />
            <Typography
              variant="h5"
              sx={{
                maxWidth: 540,
                color: 'text.secondary',
              }}
            >
              {translateUi(
                'ui.sections.ecommerce.customer.products.whoops_looks_like_we_didn_t_find_any_matches_for_you_530fa1e2',
              )}
            </Typography>
          </Stack>
        )}
      </Box>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Pagination
          variant="solid"
          color="primary"
          showFirstButton
          showLastButton
          count={10}
          siblingCount={upSm ? 1 : 0}
        />
      </Stack>
    </>
  );
};

export default ProductsGrid;
