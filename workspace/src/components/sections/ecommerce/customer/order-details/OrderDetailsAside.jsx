import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Chip, Divider, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import useNumberFormat from 'hooks/useNumberFormat';
import { statusColorMap } from '../order-list/OrderedItem';

const OrderDetailsAside = ({ order }) => {
  const { t: translateUi } = useTranslation();
  const { currencyFormat } = useNumberFormat();
  const itemStatusList = useMemo(() => {
    return order.items.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;

      return acc;
    }, {});
  }, [order?.items]);

  return (
    <Stack
      sx={{
        gap: 5,
      }}
    >
      <div>
        <Typography
          variant="h3"
          sx={{
            mb: 1,
          }}
        >
          {translateUi('ui.sections.ecommerce.customer.order_details.order_1d75774c')}
          {order.id}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: 'text.secondary',
            mb: 1,
          }}
        >
          {translateUi('ui.sections.ecommerce.customer.order_details.placed_on_0eee11a9')}
          <strong>{dayjs(order.createdAt).format('MMMM DD, YYYY')}</strong>
          &nbsp;&nbsp;{translateUi('common.at')}&nbsp;&nbsp;
          <strong>{dayjs(order.createdAt).format('hh:mm a')}</strong>
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: 'text.secondary',
            mb: 3,
          }}
        >
          <strong>
            {order.items.length}
            {translateUi('ui.sections.ecommerce.customer.order_details.items_7316c8b2')}
          </strong>
          {translateUi('ui.sections.ecommerce.customer.order_details.in_total_0a431bac')}
        </Typography>

        <Stack
          direction="row"
          sx={{
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          {Object.keys(itemStatusList).map((status) => (
            <Chip
              key={status}
              variant="filled"
              color={statusColorMap[status]}
              label={`${itemStatusList[status]} ${status}`}
            />
          ))}
        </Stack>
      </div>
      <div>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          {translateUi('ui.sections.ecommerce.customer.order_details.customer_s_name_1651082f')}
        </Typography>
        <Stack
          direction="row"
          sx={{
            gap: 1,
            alignItems: 'center',
          }}
        >
          <Avatar
            src={order.customer?.avatar}
            alt={translateUi(
              'ui.sections.ecommerce.customer.order_details.captain_haddock_b801c768',
            )}
            sx={{ width: 27, height: 27 }}
          />
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
            }}
          >
            {order.customer?.name}
          </Typography>
        </Stack>
      </div>
      <div>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          {translateUi('ui.sections.ecommerce.customer.order_details.payment_status_9dfea404')}
        </Typography>
        <Stack
          direction="row"
          sx={{
            gap: 1,
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
            }}
          >
            {translateUi('ui.sections.ecommerce.customer.order_details.standard_ddp_c1f2b1d2')}
          </Typography>
          <Chip
            variant="soft"
            color={order.payment.status === 'unpaid' ? 'error' : 'success'}
            label={order.payment.status}
            sx={{
              textTransform: 'capitalize',
            }}
          />
        </Stack>
      </div>
      <Stack divider={<Divider sx={{ my: 3 }} />}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
          }}
        >
          {translateUi('ui.sections.ecommerce.customer.order_details.summary_12b71c3e')}
        </Typography>

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
            {translateUi('ui.sections.ecommerce.customer.order_details.subtotal_97f7359e')}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'text.secondary',
            }}
          >
            {currencyFormat(order.payment.subtotal)}
          </Typography>
        </Stack>

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
            {translateUi('ui.sections.ecommerce.customer.order_details.shipping_cost_3ff0465a')}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'text.secondary',
            }}
          >
            {currencyFormat(order.payment.shippingCost)}
          </Typography>
        </Stack>

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
            {translateUi('ui.sections.ecommerce.customer.order_details.discount_b524936d')}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'text.secondary',
            }}
          >
            {currencyFormat(order.payment.discount)}
          </Typography>
        </Stack>

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
              {translateUi('ui.sections.ecommerce.customer.order_details.total_b25928c6')}
            </Typography>
            <Typography variant="h4">{currencyFormat(order.payment.total)}</Typography>
          </Stack>

          <Chip
            color="success"
            variant="filled"
            label={translateUi(
              'ui.sections.ecommerce.customer.order_details.saved_46_in_total_e0e10f7e',
            )}
            sx={{ textAlign: 'right' }}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default OrderDetailsAside;
