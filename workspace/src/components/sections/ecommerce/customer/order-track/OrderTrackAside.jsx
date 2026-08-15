import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { kebabCase } from 'lib/utils';

const OrderTrackAside = ({ order }) => {
  const { t: translateUi } = useTranslation();
  const orderInfo = useMemo(
    () => [
      {
        label: translateUi('ui.sections.ecommerce.customer.order_track.order_number_1c14bf1e'),
        value: order.number,
      },
      {
        label: translateUi('ui.sections.ecommerce.customer.order_track.order_date_121398e9'),
        value: dayjs(order.orderDate).format('MMMM DD, YYYY'),
      },
      {
        label: translateUi('ui.sections.ecommerce.customer.order_track.ship_date_594273e6'),
        value: dayjs(order.shipDate).format('MMMM DD, YYYY'),
      },
      {
        label: translateUi('ui.sections.ecommerce.customer.order_track.shipping_address_b3854a10'),
        value: order.shippingAddress,
      },
      {
        label: translateUi('ui.sections.ecommerce.customer.order_track.carrier_91b0ba24'),
        value: order.carrier,
      },
      {
        label: translateUi(
          'ui.sections.ecommerce.customer.order_track.carrier_tracking_number_3421680f',
        ),
        value: order.carrierTrackingNumber,
      },
    ],
    [order],
  );

  return (
    <Stack sx={{ gap: 4 }}>
      <div>
        <Typography
          variant="h3"
          sx={{
            mb: 1,
          }}
        >
          {translateUi('ui.sections.ecommerce.customer.order_track.order_1d75774c')}
          {order.id}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: 'text.secondary',
            mb: 1,
          }}
        >
          {translateUi('ui.sections.ecommerce.customer.order_track.placed_on_0eee11a9')}
          <strong>{dayjs(order.orderDate).format('MMMM DD, YYYY')}</strong>
          &nbsp;&nbsp;{translateUi('common.at')}&nbsp;&nbsp;
          <strong>{dayjs(order.orderDate).format('hh:mm a')}</strong>
        </Typography>
      </div>
      <List dense disablePadding>
        {orderInfo.map(({ label, value }) => (
          <ListItem key={kebabCase(label)} disablePadding disableGutters sx={{ mb: 3 }}>
            <ListItemText
              disableTypography
              sx={{ m: 0 }}
              primary={
                <Stack
                  direction={{ xs: 'column', sm: 'row', md: 'column', lg: 'row' }}
                  sx={{
                    rowGap: 1,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      minWidth: 200,
                    }}
                  >
                    {label}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: 'text.secondary',
                      wordBreak: 'break-word',
                    }}
                  >
                    {String(value)}
                  </Typography>
                </Stack>
              }
            />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default OrderTrackAside;
