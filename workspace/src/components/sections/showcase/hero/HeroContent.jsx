import { useTranslation } from 'react-i18next';
import { Box, Stack, SvgIcon } from '@mui/material';
import paths, { publicAuthPaths } from 'routes/paths';
import GradientButton from '../common/GradientButton';
import TechStack from './TechStack';

const HeroContent = ({ textRef, techStackRef, buttonsRef }) => {
  const { t } = useTranslation();

  return (
    <Stack
      sx={{
        px: { xs: 2, sm: 3, md: 5 },
        gap: { xs: 4, sm: 5, md: 7 },
        justifyContent: 'center',
        alignItems: 'center',
        width: 1,
        mt: { xs: '-15%', md: '-10%', xl: '-15%' },
      }}
    >
      <Stack sx={{ gap: 6, textAlign: 'center', alignItems: 'center', width: 1 }}>
        <Box
          ref={textRef}
          sx={{
            maxWidth: 660,
            width: 1,
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitUserDrag: 'none',
          }}
        >
          <SvgIcon
            viewBox="0 0 680 75"
            role="img"
            aria-label="FFA-X"
            sx={{
              width: 1,
              height: 75,
              fontFamily: 'inherit',
            }}
          >
            <defs>
              <linearGradient
                id="ffax-wordmark-gradient"
                x1="-315.416"
                y1="49"
                x2="974.665"
                y2="49"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" stopOpacity="0" />
                <stop offset="0.505" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>

            <text
              x="340"
              y="68"
              textAnchor="middle"
              fill="url(#ffax-wordmark-gradient)"
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontSize="74"
              fontWeight="300"
              textLength="580"
              lengthAdjust="spacing"
            >
              FFA-X
            </text>
          </SvgIcon>
        </Box>

        <Box ref={techStackRef}>
          <TechStack />
        </Box>
      </Stack>
      <Stack
        ref={buttonsRef}
        direction="row"
        sx={{
          gap: { xs: 0.5, sm: 1 },
          justifyContent: 'center',
          flexWrap: 'wrap',
          width: { xs: 1, sm: 'auto' },

          '& button': {
            fontSize: { xs: '0.8rem', sm: 'inherit' },
            py: { xs: 0.75, sm: 1 },
          },
        }}
      >
        <GradientButton
          href={paths.landingAbout}
          variant="text"
          sx={{ width: { xs: 140, sm: 168 } }}
        >
          {t('ffax.public.navigation.about')}
        </GradientButton>
        <GradientButton
          href={paths.landingContact}
          variant="text"
          sx={{ width: { xs: 140, sm: 168 } }}
        >
          {t('ffax.public.navigation.contact')}
        </GradientButton>
        <GradientButton
          href={publicAuthPaths.signup}
          variant="text"
          sx={{ width: { xs: 140, sm: 168 } }}
        >
          {t('ffax.public.navigation.free_account')}
        </GradientButton>
        <GradientButton href={paths.landingSubscriptions} sx={{ width: { xs: 140, sm: 168 } }}>
          {t('ffax.public.navigation.subscriptions')}
        </GradientButton>
      </Stack>
    </Stack>
  );
};

export default HeroContent;
