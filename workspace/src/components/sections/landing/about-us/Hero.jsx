import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Chip, Container, Typography, keyframes } from '@mui/material';
import { useThemeMode } from 'hooks/useThemeMode';
import { cssVarRgba } from 'lib/utils';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';

const Hero = () => {
  const { t: translateUi } = useTranslation();
  const { isDark } = useThemeMode();
  const { up } = useBreakpoints();
  const upSm = up('sm');
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', pt: 12, px: { xs: 3, md: 5 } }}>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1400,
          position: 'relative',
          px: { xs: 0 },
          pt: 9,
          textAlign: 'center',
          bgcolor: 'transparent',
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 10, mb: 2 }}>
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: '-40%',
              width: 412,
              height: 330,
              bgcolor: 'transparent',
              overflow: 'hidden',
              opacity: isDark ? 0.8 : 0.5,
              backgroundImage: ({
                vars,
              }) => `linear-gradient(${vars.palette.divider} 1px, transparent 1px),
       linear-gradient(to right, ${vars.palette.divider} 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              pointerEvents: 'none',
              WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 10%, transparent 70%)',
              maskImage: 'radial-gradient(ellipse at 50% 50%, black 10%, transparent 70%)',
              WebkitMaskComposite: 'source-in',
              maskComposite: 'intersect',
            }}
          />

          <Box sx={{ position: 'relative', px: 2 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.75rem', md: '3.25rem' },
                fontWeight: 600,
                lineHeight: 1.18,
                letterSpacing: '-0.012em',
                maxWidth: 800,
                mx: 'auto',
                mb: 3,
              }}
            >
              {translateUi(
                'ui.sections.landing.about_us.hero.get_to_know_us_together_we_create_b4135d5a',
              )}{' '}
              <Box
                component="span"
                sx={{
                  color: 'primary.main',
                }}
              >
                {translateUi('ui.sections.landing.about_us.hero.magic_8dbd968d')}
              </Box>{' '}
              🌟🤗
            </Typography>
            <Typography
              variant="body2"
              sx={{ maxWidth: 730, mx: 'auto', mb: 5, color: 'text.secondary' }}
            >
              {translateUi(
                'ui.sections.landing.about_us.hero.creating_products_with_a_strong_identity_we_provide__36520044',
              )}
            </Typography>
            <Button variant="contained" href={paths.landingContact}>
              {translateUi('ui.sections.landing.about_us.hero.let_s_talk_now_f98b4a0e')}
            </Button>
          </Box>
        </Box>

        <Box
          sx={(theme) => ({
            position: 'relative',
            zIndex: 10,
            maxWidth: 600,
            mx: 'auto',
            width: 1,
            aspectRatio: '60 / 53',
            bgcolor: 'background.elevation1',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            isolation: 'isolate',
            '&::before': {
              content: '""',
              position: 'absolute',
              width: '140%',
              height: '120%',
              left: '50%',
              bottom: 0,
              transform: 'translateX(-50%)',
              background: cssVarRgba(theme.vars.palette.success.mainChannel, 0.15),
              borderRadius: '100%',
              filter: 'blur(164px)',
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 0,
            },
          })}
        >
          <Image
            src={{
              light: `${import.meta.env.BASE_URL}images/landing/hero/1-dark-zh-ffax.png`,
              dark: `${import.meta.env.BASE_URL}images/landing/hero/1-dark-zh-ffax.png`,
            }}
            alt="FFA-X 中文工作台静态预览"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 1,
              height: 'auto',
              minHeight: 1,
              objectFit: 'cover',
              objectPosition: 'top left',
              bgcolor: 'background.default',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          />
          {upSm && (
            <>
              <CursorElement
                color="info"
                label={translateUi('ui.sections.landing.about_us.hero.easy_installation_85cdbe94')}
                sx={{
                  top: '40%',
                }}
              />
              <CursorElement
                direction="left"
                color="primary"
                label={translateUi('ui.sections.landing.about_us.hero.modern_design_28dd9713')}
                sx={{
                  top: '10%',
                }}
              />
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};
const drift = keyframes`
  0%   { transform: translate(0, 0); }
  20%  { transform: translate(var(--tx1), var(--ty1)); }
  40%  { transform: translate(var(--tx2), var(--ty2)); }
  60%  { transform: translate(var(--tx3), var(--ty3)); }
  80%  { transform: translate(var(--tx4), var(--ty4)); }
  100% { transform: translate(0, 0); }
`;
const CursorElement = ({ direction = 'right', color, label, sx }) => {
  const isLeft = direction === 'left';
  const cssVars = useMemo(() => {
    const r = (min, max) => Math.round(min + Math.random() * (max - min));
    const px = (n) => `${n}px`;
    const biasRangeX = isLeft ? [-65, 15] : [-15, 65];
    const biasRangeY = [-35, 35];
    return {
      ['--tx1']: px(r(...biasRangeX)),
      ['--ty1']: px(r(...biasRangeY)),
      ['--tx2']: px(r(...biasRangeX)),
      ['--ty2']: px(r(...biasRangeY)),
      ['--tx3']: px(r(...biasRangeX)),
      ['--ty3']: px(r(...biasRangeY)),
      ['--tx4']: px(r(...biasRangeX)),
      ['--ty4']: px(r(...biasRangeY)),
      ['--dur']: `${Math.round(10 + Math.random() * (15 - 10))}s`,
      ['--delay']: `${Math.round(-4 + Math.random() * 4)}s`,
    };
  }, [isLeft]);
  return (
    <Box
      sx={{
        zIndex: 30,
        width: 'fit-content',
        [isLeft ? 'right' : 'left']: { sm: '-10%', md: '-30%' },
        position: 'absolute',
        animation: `${drift} var(--dur) cubic-bezier(0.22, 1, 0.36, 1) infinite`,
        animationDelay: 'var(--delay)',
        willChange: 'transform',
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none',
          transform: 'none',
        },
        ...sx,
      }}
      style={cssVars}
    >
      <Chip variant="filled" size="large" label={label} sx={{ bgcolor: `${color}.main` }} />

      <Box
        sx={{
          position: 'absolute',
          top: -14,
          [direction]: -12,
          color: `${color}.main`,
          transform: (theme) =>
            (theme.direction === 'rtl') !== isLeft ? 'rotate(-90deg)' : 'none',
          filter: isLeft
            ? 'drop-shadow( 1px 2px 3px rgba(0,0,0,0.22)) drop-shadow(10px 16px 18px rgba(0,0,0,0.08))'
            : 'drop-shadow(-1px 2px 3px rgba(0,0,0,0.22)) drop-shadow(-10px 16px 18px rgba(0,0,0,0.08))',
        }}
      >
        <IconifyIcon icon="material-symbols:near-me-rounded" fontSize={24} />
      </Box>
    </Box>
  );
};
export default Hero;
