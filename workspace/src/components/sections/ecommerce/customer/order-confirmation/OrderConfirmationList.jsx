import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Box,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEcommerce } from 'providers/EcommerceProvider';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';

const OrderConfirmationList = () => {
  const { t: translateUi } = useTranslation();
  const { cartItems } = useEcommerce();

  return (
    <List disablePadding>
      {cartItems.map((cartItem) => (
        <ListItem disableGutters key={cartItem.id} sx={{ gap: { xs: 1, sm: 3 } }}>
          <ListItemIcon sx={{ minWidth: 0 }}>
            <IconifyIcon icon="material-symbols:circle" color="divider" fontSize={10} />
          </ListItemIcon>
          <ListItemAvatar>
            <Avatar
              variant="rounded"
              sx={{
                bgcolor: 'background.elevation1',
                width: 100,
                height: 100,
                p: 0.5,
              }}
              alt={cartItem.name}
              src={cartItem.images[0].src}
            />
          </ListItemAvatar>
          <ListItemText
            disableTypography
            primary={
              <>
                <Typography
                  variant="body2"
                  sx={{
                    flex: 1,
                    fontWeight: 700,
                    lineClamp: 1,
                    mb: 0.5,
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
                    fontWeight: 400,
                    mb: 2,
                  }}
                >
                  {translateUi(
                    'ui.sections.ecommerce.customer.order_confirmation.will_be_delivered_to_61d30d75',
                  )}{' '}
                  <Box
                    component="strong"
                    sx={{
                      whiteSpace: 'nowrap',
                      ml: 0.5,
                    }}
                  >
                    {translateUi(
                      'ui.sections.ecommerce.customer.order_confirmation.captain_haddock_b801c768',
                    )}
                  </Box>
                </Typography>
              </>
            }
            secondary={
              <Stack
                direction="row"
                sx={{
                  columnGap: 3,
                  rowGap: 0.5,
                }}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    flexShrink: { xl: 0 },
                    fontWeight: 400,
                  }}
                >
                  {translateUi(
                    'ui.sections.ecommerce.customer.order_confirmation.estimated_date_of_delivery_964b8d8f',
                  )}{' '}
                  <Box
                    component="strong"
                    sx={{
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {dayjs().add(3, 'day').format('DD MMM, YYYY')}
                  </Box>
                </Typography>
              </Stack>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default OrderConfirmationList;
