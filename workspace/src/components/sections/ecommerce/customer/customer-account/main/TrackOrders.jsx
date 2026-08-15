import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Chip, Link, Paper, Stack, Typography } from '@mui/material';
import { toSentenceCase } from 'lib/utils';
import i18n from 'locales/i18n';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'components/base/Image';

const orderTracking = {
  confirmed: {
    color: 'info',
    get message() {
      return i18n.t(
        'ui.sections.ecommerce.customer.customer_account.your_order_has_been_confirmed_and_is_now_at_our_main_f0d3d188',
      );
    },
  },
  shipped: {
    color: 'warning',
    get message() {
      return i18n.t(
        'ui.sections.ecommerce.customer.customer_account.your_package_has_departed_from_our_central_warehouse_9120c22b',
      );
    },
  },
  out_for_delivery: {
    color: 'warning',
    get message() {
      return i18n.t(
        'ui.sections.ecommerce.customer.customer_account.your_package_has_arrived_at_our_local_distribution_c_fc2db79f',
      );
    },
  },
  delivered: {
    color: 'success',
    get message() {
      return i18n.t(
        'ui.sections.ecommerce.customer.customer_account.your_package_has_been_successfully_delivered_to_the__e026f141',
      );
    },
  },
};

const TrackOrders = ({ orders }) => {
  const { t: translateUi } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleDotClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 3, md: 5 },
        height: 1,
        maxWidth: 1,
        overflow: 'hidden',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 3,
        }}
      >
        {translateUi('ui.sections.ecommerce.customer.customer_account.track_orders_12d8ab40')}
      </Typography>

      <Box
        sx={{
          flex: 1,
          p: 3,
          borderRadius: 6,
          bgcolor: 'background.elevation1',
        }}
      >
        <Swiper
          slidesPerView={1}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          modules={[Pagination]}
        >
          {orders.map((order) => (
            <SwiperSlide key={order.product.id}>
              <OrderItem order={order} actionUrl="#!" />
            </SwiperSlide>
          ))}
        </Swiper>

        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            gap: 0.5,
            mt: { xs: 3, sm: -1 },
            ml: { xs: 0, sm: 28.75 },
            width: 1,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {orders.map((_, index) => (
            <Box
              key={index}
              onClick={() => handleDotClick(index)}
              sx={{
                width: activeIndex === index ? 24 : 8,
                height: 8,
                borderRadius: 1,
                backgroundColor: activeIndex === index ? 'primary.main' : 'background.elevation3',
                cursor: 'pointer',
              }}
            />
          ))}
        </Stack>
      </Box>
    </Paper>
  );
};

const OrderItem = ({ order, actionUrl }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      sx={{
        columnGap: 3,
      }}
    >
      <Box
        sx={{
          width: 206,
          flexShrink: 0,
          aspectRatio: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src={order.product.images[0].src}
          alt={translateUi('ui.sections.ecommerce.customer.customer_account.stain_0ae42b6f')}
          sx={{ width: 144 }}
        />
      </Box>
      <Stack sx={{ justifyContent: 'space-between' }}>
        <div>
          <Chip
            label={toSentenceCase(order.status)}
            color={orderTracking[order.status].color}
            variant="soft"
            sx={{ mb: 3 }}
          />
          <Typography
            variant="subtitle1"
            sx={{
              color: 'text.secondary',
              mb: 2,
            }}
          >
            {orderTracking[order.status].message}
          </Typography>
          <Link href={actionUrl}>
            {translateUi(
              'ui.sections.ecommerce.customer.customer_account.click_here_to_track_your_package_fb9b12c3',
            )}
          </Link>
        </div>
      </Stack>
    </Stack>
  );
};

export default TrackOrders;
