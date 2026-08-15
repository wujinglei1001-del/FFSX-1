import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Chip, Divider, Stack, TextField, Typography } from '@mui/material';
import { ecomCoupons } from 'data/e-commerce/products';
import useNumberFormat from 'hooks/useNumberFormat';
import { useSnackbar } from 'notistack';
import { useEcommerce } from 'providers/EcommerceProvider';

const PaymentSummary = () => {
  const { t: translateUi } = useTranslation();
  const [coupon, setCoupon] = useState('');
  const [couponError, setCouponError] = useState(false);
  const { appliedCoupon, setAppliedCoupon, cartSubTotal, cartTotal } = useEcommerce();
  const { enqueueSnackbar } = useSnackbar();
  const { currencyFormat } = useNumberFormat();
  const appliedDiscount = appliedCoupon?.appliedDiscount || 0;

  const applyCouponCode = () => {
    const validCoupon = ecomCoupons.find(({ code }) => code === coupon);
    if (validCoupon) {
      setAppliedCoupon(validCoupon);
      setCouponError(false);
      enqueueSnackbar(`${validCoupon.code} is applied!`, { variant: 'success' });
    } else {
      setAppliedCoupon(null);
      setCouponError(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          mb: 5,
        }}
      >
        <Stack
          component="form"
          direction={{ xs: 'column', sm: 'row', md: 'column' }}
          sx={{
            gap: 1,
            mb: 1,
          }}
        >
          <TextField
            variant="filled"
            fullWidth
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            label={translateUi(
              'ui.sections.ecommerce.customer.common.enter_a_coupon_or_a_reward_code_3f8f14fa',
            )}
          />

          <Button variant="soft" color="neutral" sx={{ minWidth: 200 }} onClick={applyCouponCode}>
            {translateUi('ui.sections.ecommerce.customer.common.apply_cfea419c')}
          </Button>
        </Stack>

        {appliedCoupon && (
          <>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                mb: 0.5,
              }}
            >
              {translateUi(
                'ui.sections.ecommerce.customer.common.you_have_applied_coupon_510f248b',
              )}
              <strong>{appliedCoupon?.code}</strong>
            </Typography>
            <br />
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                mb: 0.5,
              }}
            >
              {translateUi('ui.sections.ecommerce.customer.common.which_saves_you_0ed4c727')}{' '}
              <Box
                component="span"
                sx={{
                  color: 'success.main',
                }}
              >
                {currencyFormat(appliedCoupon?.discount)}
              </Box>
            </Typography>
          </>
        )}
        {couponError && (
          <>
            <Typography
              variant="caption"
              component="p"
              sx={{
                color: 'error.main',
                mb: 1,
              }}
            >
              {translateUi(
                'ui.sections.ecommerce.customer.common.uh_oh_seems_like_this_coupon_does_not_exist_8a47a6a3',
              )}
            </Typography>

            <Typography
              variant="caption"
              component="p"
              sx={{
                color: 'text.secondary',
              }}
            >
              {translateUi(
                'ui.sections.ecommerce.customer.common.please_check_if_all_the_letters_and_numbers_are_keye_e6f0b189',
              )}
            </Typography>
          </>
        )}
      </Box>
      <div>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
          }}
        >
          {translateUi('ui.sections.ecommerce.customer.common.summary_12b71c3e')}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: 'text.secondary',
            }}
          >
            {translateUi('ui.sections.ecommerce.customer.common.subtotal_97f7359e')}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: 'text.secondary',
            }}
          >
            {currencyFormat(cartSubTotal)}
          </Typography>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <div>
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: 'text.secondary',
              }}
            >
              {translateUi('ui.sections.ecommerce.customer.common.shipping_cost_3ff0465a')}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: 'text.secondary',
              }}
            >
              TBA
            </Typography>
          </Stack>

          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
            }}
          >
            {translateUi('ui.sections.ecommerce.customer.common.you_are_only_972ff3a3')}{' '}
            <Box
              component="span"
              sx={{
                color: 'success.main',
              }}
            >
              {translateUi('ui.sections.ecommerce.customer.common.20_away_efd0dd8a')}
            </Box>{' '}
            {translateUi('ui.sections.ecommerce.customer.common.from_free_shipping_bdcbbdca')}
          </Typography>
        </div>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: 'text.secondary',
            }}
          >
            {translateUi('ui.sections.ecommerce.customer.common.discount_b524936d')}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: 'text.secondary',
            }}
          >
            {currencyFormat(appliedDiscount > 0 ? -appliedDiscount : appliedDiscount)}
          </Typography>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ textAlign: 'right' }}>
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
              }}
            >
              {translateUi('ui.sections.ecommerce.customer.common.total_b25928c6')}
            </Typography>
            <Typography variant="h4">{currencyFormat(cartTotal)}</Typography>
          </Stack>

          <Chip
            color="success"
            variant="filled"
            label={translateUi(
              'ui.sections.ecommerce.customer.common.yay_you_saved_30_in_total_827e152a',
            )}
            sx={{ textAlign: 'right' }}
          />
        </Box>
      </div>
    </>
  );
};

export default PaymentSummary;
