import { useTranslation } from 'react-i18next';
import { Box, Button, Link, List, Stack, Typography, listItemTextClasses } from '@mui/material';
import useNumberFormat from 'hooks/useNumberFormat';
import { useEcommerce } from 'providers/EcommerceProvider';
import paths from 'routes/paths';
import Image from 'components/base/Image';
import ProductVariantListItem from 'components/sections/ecommerce/admin/common/ProductVariantListItem';

const CartSummary = () => {
  const { t: translateUi } = useTranslation();
  const { cartItems } = useEcommerce();
  const { currencyFormat } = useNumberFormat();

  return (
    <div>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
          }}
        >
          {translateUi('ui.sections.ecommerce.customer.checkout.summary_12b71c3e')}
        </Typography>
        <Button variant="soft" color="neutral" href={paths.cart}>
          {translateUi('ui.sections.ecommerce.customer.checkout.edit_cart_083b4f44')}
        </Button>
      </Stack>
      <Stack sx={{ gap: 4 }}>
        {cartItems.map((cartItem) => (
          <Box key={cartItem.id}>
            <Stack
              direction={{ md: 'column', lg: 'row' }}
              sx={{
                gap: 2,
                flex: 1,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  flexShrink: 0,
                  borderRadius: 2,
                  bgcolor: 'background.elevation2',
                  p: 0.5,
                }}
              >
                <Image
                  src={cartItem.images[0].src}
                  alt=""
                  sx={{ width: 1, objectFit: 'contain' }}
                />
              </Box>
              <Box
                sx={{
                  flex: 1,
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    width: 1,
                    gap: 2,
                    mb: 4,
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      lineClamp: 2,
                    }}
                  >
                    <Link
                      href={paths.productDetails(String(cartItem.id))}
                      sx={{
                        color: 'currentcolor',
                      }}
                    >
                      {cartItem.name}
                    </Link>
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    {currencyFormat(cartItem.price.discounted)}
                  </Typography>
                </Stack>

                <List dense disablePadding>
                  {cartItem.variants?.map((variant) => (
                    <ProductVariantListItem
                      key={variant.label}
                      label={variant.label}
                      value={variant.value}
                      sx={{
                        mb: 1,
                        [`& .${listItemTextClasses.primary}`]: {
                          minWidth: 70,
                        },
                      }}
                    />
                  ))}
                  <ProductVariantListItem
                    label={translateUi('ui.sections.ecommerce.customer.checkout.quantity_44f6af69')}
                    value={cartItem.quantity}
                    sx={{
                      mb: 1,
                      [`& .${listItemTextClasses.primary}`]: {
                        minWidth: 70,
                      },
                    }}
                  />
                </List>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    </div>
  );
};

export default CartSummary;
