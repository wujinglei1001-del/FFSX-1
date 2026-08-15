import { useTranslation } from 'react-i18next';
import { Box, Button, Chip, Link, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import useNumberFormat from 'hooks/useNumberFormat';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';
import { statusColorMap } from '../order-list/OrderedItem';
import ProductAttributeRow from './ProductAttributeRow';

const OrderedItem = ({ product, customer }) => {
  const { t: translateUi } = useTranslation();
  const { id, name, price, images, status, quantity, vendor } = product;
  const { currencyFormat } = useNumberFormat();

  return (
    <Stack
      direction={{ xs: 'column', lg: 'row' }}
      sx={{
        gap: 5,
        alignItems: 'stretch',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: { xs: 1, lg: 320, xl: 400 },
          flexShrink: 0,
          bgcolor: 'background.elevation1',
          borderRadius: 6,
        }}
      >
        <Image
          src={images[0].src}
          alt=""
          sx={{
            width: 1,
            maxWidth: { xs: 360, lg: 'unset' },
            alignSelf: 'center',
            justifySelf: 'center',
            objectFit: 'contain',
          }}
        />
      </Box>
      <Stack sx={{ gap: 4 }}>
        <div>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            <Link
              href={paths.productDetails(String(id))}
              sx={{
                color: 'currentcolor',
              }}
            >
              {name}
            </Link>
          </Typography>
          <Typography
            component="p"
            variant="caption"
            sx={{
              color: 'text.secondary',
            }}
          >
            {translateUi('ui.sections.ecommerce.customer.order_details.sold_by_12c71f0a')}
            <Box
              component="span"
              sx={{
                ml: 1,
                fontWeight: 500,
                color: 'text.primary',
              }}
            >
              {vendor}
            </Box>
          </Typography>
        </div>

        <div>
          <Chip
            variant="filled"
            color={statusColorMap[status ?? 'default']}
            label={status}
            sx={{ textTransform: 'capitalize' }}
          />
        </div>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            gap: 1,
          }}
        >
          <Button
            variant="soft"
            color="primary"
            startIcon={
              <IconifyIcon
                icon="material-symbols:edit-outline-rounded"
                fontSize="20px !important"
              />
            }
          >
            {translateUi('ui.sections.ecommerce.customer.order_details.write_a_review_d2684e62')}
          </Button>
          <Button
            variant="soft"
            color="neutral"
            startIcon={
              <IconifyIcon
                icon="material-symbols:chat-outline-rounded"
                fontSize="20px !important"
              />
            }
          >
            {translateUi(
              'ui.sections.ecommerce.customer.order_details.get_product_support_2cff7f87',
            )}
          </Button>
        </Stack>

        <div>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'text.secondary',
              mb: 1,
            }}
          >
            {translateUi('ui.sections.ecommerce.customer.order_details.each_3633746b')}{' '}
            <Box
              component="strong"
              sx={{
                color: 'text.primary',
                ml: 1,
              }}
            >
              {currencyFormat(price.discounted)}
            </Box>
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'text.secondary',
              mb: 2,
            }}
          >
            {translateUi('ui.sections.ecommerce.customer.order_details.quantity_fe2c3f97')}{' '}
            <Box
              component="strong"
              sx={{
                color: 'text.primary',
                ml: 1,
              }}
            >
              {quantity}
            </Box>
          </Typography>
          <Stack
            direction="row"
            sx={{
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: 'text.secondary',
              }}
            >
              {translateUi('ui.sections.ecommerce.customer.order_details.total_b25928c6')}
            </Typography>
            <Typography variant="h5">{currencyFormat(price.discounted * quantity)}</Typography>
          </Stack>
        </div>

        <Grid container spacing={4}>
          <Grid size={12} container spacing={0.5}>
            <Grid size={12}>
              <ProductAttributeRow
                label={translateUi(
                  'ui.sections.ecommerce.customer.order_details.category_a3c686e7',
                )}
                value={product.category?.join(',') || ''}
              />
            </Grid>
            <Grid size={12}>
              <ProductAttributeRow
                label={translateUi(
                  'ui.sections.ecommerce.customer.order_details.fabric_material_f893dc86',
                )}
                value={product.material?.join(',') || ''}
              />
            </Grid>
            {product.variants.map((variant) => (
              <Grid size={12} key={variant.label}>
                <ProductAttributeRow
                  key={variant.label}
                  label={variant.label}
                  value={variant.value}
                />
              </Grid>
            ))}
          </Grid>

          <Grid size={12} container spacing={0.5}>
            <Grid size={12}>
              <ProductAttributeRow
                label={translateUi(
                  'ui.sections.ecommerce.customer.order_details.shipping_address_dbd7c38d',
                )}
                value={product.shippingAddress}
              />
            </Grid>
            <Grid size={12}>
              <ProductAttributeRow
                label={translateUi(
                  'ui.sections.ecommerce.customer.order_details.billing_address_48af96f6',
                )}
                value={product.billlingAddress}
              />
            </Grid>
            {customer && (
              <Grid size={12}>
                <ProductAttributeRow
                  label={translateUi(
                    'ui.sections.ecommerce.customer.order_details.phone_number_ab25d61b',
                  )}
                  value={customer?.contactInfo.phone}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default OrderedItem;
