import { useTranslation } from 'react-i18next';
import { Box, Button, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import ProductRatings from './ProductRatings';
import ProductReviews from './ProductReviews';

const ProductFeedback = () => {
  const { t: translateUi } = useTranslation();
  return (
    <div>
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 5,
        }}
      >
        <Typography variant="h6">
          {translateUi('ui.sections.ecommerce.customer.product_details.ratings_reviews_79cced2f')}
        </Typography>
        <Button
          variant="soft"
          color="neutral"
          sx={{ textTransform: 'none', gap: 0.5, minWidth: 0, px: { xs: 1, sm: 2 } }}
        >
          <IconifyIcon
            icon="material-symbols:border-color-outline-rounded"
            sx={{ fontSize: '20px !important' }}
          />
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
            {translateUi(
              'ui.sections.ecommerce.customer.product_details.rate_this_product_976b1d08',
            )}
          </Box>
        </Button>
      </Stack>
      <ProductRatings sx={{ mb: 5 }} />
      <ProductReviews />
    </div>
  );
};

export default ProductFeedback;
