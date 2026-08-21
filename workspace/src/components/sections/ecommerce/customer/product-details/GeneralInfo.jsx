import { useTranslation } from 'react-i18next';
import { Box, Chip, Rating, Stack, Typography, ratingClasses } from '@mui/material';
import useNumberFormat from 'hooks/useNumberFormat';
import { useEcommerce } from 'providers/EcommerceProvider';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import PageBreadcrumb from '../../../common/PageBreadcrumb';

const GeneralInfo = ({ sx }) => {
  const { t: translateUi } = useTranslation();
  const { product } = useEcommerce();
  const { numberFormat } = useNumberFormat();

  return (
    <Box sx={{ ...sx }}>
      <PageBreadcrumb
        items={[
          {
            label: translateUi('ui.sections.ecommerce.customer.product_details.home_70f8bb9a'),
            url: paths.ecommerceHomepage,
          },
          {
            label: translateUi(
              'ui.sections.ecommerce.customer.product_details.living_room_25ff70b3',
            ),
            url: paths.products,
          },
          {
            label: translateUi('ui.sections.ecommerce.customer.product_details.armchair_d5727b18'),
            active: true,
          },
        ]}
        sx={{ mb: { xl: 5, xs: 3 } }}
      />
      <Stack
        direction={{ xs: 'column', lg: 'row', xl: 'column' }}
        sx={{
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        <Typography variant="h1" sx={{ fontSize: 'h5.fontSize' }}>
          {product?.name}
        </Typography>
        <Stack
          direction={{ xs: 'row', lg: 'column', xl: 'row' }}
          sx={{
            rowGap: 1,
            columnGap: 3,
            alignItems: { xs: 'center', lg: 'flex-end', xl: 'center' },
          }}
        >
          <Chip
            variant="soft"
            color="warning"
            label={translateUi(
              'ui.sections.ecommerce.customer.product_details.top_seller_44324ec9',
            )}
            icon={<IconifyIcon icon="material-symbols:stars-rounded" fontSize={16} />}
          />
          <Stack
            direction="row"
            sx={{
              gap: 1,
              alignItems: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            <Rating
              name="product-rating"
              color="warning"
              value={product?.ratings}
              readOnly
              icon={<IconifyIcon icon="material-symbols:star-rounded" />}
              sx={{
                [`& .${ratingClasses.iconFilled}`]: {
                  color: 'warning.main',
                },
              }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                color: 'text.secondary',
              }}
            >
              ({numberFormat(product?.reviews || 0)}
              {translateUi('ui.sections.ecommerce.customer.product_details.reviews_93420d0c')}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default GeneralInfo;
