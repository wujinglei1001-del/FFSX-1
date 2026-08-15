import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Grow,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import { orderListAdmin } from 'data/e-commerce/orders';
import useNumberFormat from 'hooks/useNumberFormat';

const OrderDetailsPopper = ({ params }) => {
  const { t: translateUi } = useTranslation();
  const { currencyFormat } = useNumberFormat();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHoveringPopper, setIsHoveringPopper] = useState(false);
  const linkRef = useRef(null);

  const hoveredOrder = useMemo(
    () => orderListAdmin.find((order) => order.id === params.row.id) || null,
    [params.row.id],
  );

  const orderTotal = useMemo(
    () =>
      (hoveredOrder?.items || []).reduce(
        (total, item) => total + item.product.price.discounted * item.quantity,
        0,
      ),
    [hoveredOrder],
  );

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    if (!isHoveringPopper) {
      setAnchorEl(null);
    }
  };

  const handlePopperMouseEnter = () => {
    setIsHoveringPopper(true);
  };

  const handlePopperMouseLeave = () => {
    setIsHoveringPopper(false);
    setAnchorEl(null);
  };

  const hasItems = hoveredOrder?.items && hoveredOrder.items.length > 0;

  return (
    <>
      <Link
        ref={linkRef}
        variant="subtitle2"
        href="#!"
        sx={{ fontWeight: 400 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {params.row.id}
      </Link>
      <Popper
        open={Boolean(anchorEl) || isHoveringPopper}
        anchorEl={anchorEl || linkRef.current}
        transition
        sx={{ width: 326 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={350}>
            <Paper
              variant="elevation"
              elevation={6}
              onMouseEnter={handlePopperMouseEnter}
              onMouseLeave={handlePopperMouseLeave}
              sx={{
                p: 2,
                borderRadius: 6,
                backgroundImage: 'none',
                bgcolor: (theme) => theme.vars.palette.background.menu,
                flexDirection: 'column',
                width: 326,
              }}
            >
              <List dense disablePadding sx={{ mb: 2 }}>
                {hasItems ? (
                  hoveredOrder.items.map((item, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemAvatar sx={{ minWidth: 40 }}>
                        <Avatar
                          src={item.product.images[0].src}
                          sx={{
                            height: 32,
                            width: 32,
                            borderRadius: 2,
                            bgcolor: 'background.elevation2',
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                        primary={item.product.name}
                        slotProps={{
                          primary: {
                            sx: {
                              fontWeight: 600,
                              flex: 1,
                              overflow: 'hidden',
                              lineClamp: 1,
                              wordBreak: 'break-all',
                            },
                          },
                        }}
                        secondary={
                          <Stack
                            component="span"
                            direction="row"
                            sx={{
                              gap: 0.4,
                              width: 114,
                              justifyContent: 'space-between',
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                color: 'text.disabled',
                                width: 46,
                                textAlign: 'right',
                              }}
                            >
                              {item.quantity}
                              {translateUi('ui.sections.ecommerce.admin.order_list.pcs_853268f8')}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: 'text.primary',
                              }}
                            >
                              {currencyFormat(item.product.price.discounted * item.quantity)}
                            </Typography>
                          </Stack>
                        }
                      />
                    </ListItem>
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontStyle: 'italic',
                    }}
                  >
                    {translateUi(
                      'ui.sections.ecommerce.admin.order_list.no_items_in_this_order_580b4ba9',
                    )}
                  </Typography>
                )}
              </List>

              <Stack
                direction="row"
                sx={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                  {translateUi('ui.sections.ecommerce.admin.order_list.total_b25928c6')}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                  {currencyFormat(orderTotal)}
                </Typography>
              </Stack>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default OrderDetailsPopper;
