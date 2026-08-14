import { Box, Stack, Typography } from '@mui/material';
import paths from 'routes/paths';
import FigmaIcon from 'components/icons/FigmaIcon';
import GradientButton from '../common/GradientButton';
import TechStack from './TechStack';

const HeroContent = ({ textRef, techStackRef, buttonsRef }) => {
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
        <Box sx={{ maxWidth: 660, width: 1 }} ref={textRef}>
          <Typography variant="h1" sx={{ color: 'common.white', letterSpacing: '0.08em' }}>
            FFA-X
          </Typography>
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
          width: { xs: 1, sm: 'auto' },

          '& button': {
            fontSize: { xs: '0.8rem', sm: 'inherit' },
            py: { xs: 0.75, sm: 1 },
          },
        }}
      >
        <GradientButton variant="text" icon={<FigmaIcon />}>
          Preview Figma
        </GradientButton>

        <GradientButton href={paths.ecommerce}>Live Preview</GradientButton>
      </Stack>
    </Stack>
  );
};

export default HeroContent;
