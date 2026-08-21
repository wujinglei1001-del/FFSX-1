import { Box, Link, Typography, buttonBaseClasses } from '@mui/material';
import { initialConfig } from 'config';
import { cssVarRgba } from 'lib/utils';
import i18n from 'locales/i18n';
import paths from 'routes/paths';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import { blue, orange } from 'theme/colors/base';
import Image from 'components/base/Image';
import Swiper from 'components/base/Swiper';

const slides = [
  {
    id: 1,
    color: '#F3C870',
    label: (
      <Typography
        sx={{
          color: orange[700],
          textAlign: 'center',
          typography: { md: 'h3', xs: 'h5' },
        }}
      >
        <Box
          component="span"
          sx={{
            fontWeight: 400,
          }}
        >
          {i18n.t('ui.sections.ecommerce.customer.homepage.best_deals_on_21167a7e')}{' '}
        </Box>
        {i18n.t('ui.sections.ecommerce.customer.homepage.living_room_furnitures_f09b5db3')}
      </Typography>
    ),
    image: `${initialConfig.assetsDir}/images/ecommerce/gallery/1.webp`,
    url: paths.products,
  },
  {
    id: 2,
    color: '#243C66',
    label: (
      <Typography
        sx={{
          color: 'common.white',
          textAlign: 'center',
          typography: { md: 'h3', xs: 'h5' },
        }}
      >
        {i18n.t('ui.sections.ecommerce.customer.homepage.customize_your_bedroom_59abc261')}{' '}
        <Box
          component="span"
          sx={{
            fontWeight: 400,
          }}
        >
          {i18n.t('ui.sections.ecommerce.customer.homepage.just_the_way_you_want_7af0b702')}
        </Box>
      </Typography>
    ),
    image: `${initialConfig.assetsDir}/images/ecommerce/gallery/2.webp`,
    url: paths.products,
  },
  {
    id: 3,
    color: '#D78D54',
    label: (
      <Typography
        sx={{
          color: 'common.white',
          textAlign: 'center',
          typography: { md: 'h3', xs: 'h5' },
        }}
      >
        <Box
          component="span"
          sx={{
            fontWeight: 400,
          }}
        >
          {i18n.t(
            'ui.sections.ecommerce.customer.homepage.dining_furnitures_with_up_to_62caea44',
          )}{' '}
        </Box>
        <Box
          component="span"
          sx={{
            color: blue[900],
          }}
        >
          {i18n.t('ui.sections.ecommerce.customer.homepage.50_discount_49b6cec7')}
        </Box>
      </Typography>
    ),
    image: `${initialConfig.assetsDir}/images/ecommerce/gallery/3.webp`,
    url: paths.products,
  },
];

const HeroSlider = () => {
  return (
    <Swiper
      loop={true}
      navigation={true}
      pagination={{
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + '</span>';
        },
      }}
      slidesPerView={1}
      modules={[Autoplay, Navigation, Pagination]}
      sx={{
        [`& .${buttonBaseClasses.root}`]: {
          bgcolor: (theme) => cssVarRgba(theme.vars.palette.common.whiteChannel, 0.15),
          '&:hover': {
            bgcolor: (theme) => cssVarRgba(theme.vars.palette.common.whiteChannel, 0.3),
          },
          '& .iconify': {
            color: 'common.white',
          },
        },
      }}
    >
      {slides.map(({ id, image, color, url, label }) => (
        <SwiperSlide key={id}>
          <Link
            href={url}
            underline="none"
            sx={{
              width: 1,
              height: 500,
              display: 'block',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Image
              src={image}
              alt={`slide${id}`}
              sx={{
                width: 1,
                height: 1,
                objectFit: 'cover',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                width: 1,
                top: 0,
                left: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 120,
                bgcolor: color,
                clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0 90%)',
              }}
            >
              <Box sx={{ px: { xs: 3, md: 5 } }}>{label}</Box>
            </Box>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
