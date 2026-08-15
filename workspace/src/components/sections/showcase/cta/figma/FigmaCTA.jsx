import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useGSAP } from '@gsap/react';
import { Box, Container, Stack } from '@mui/material';
import { figmaPreviewLink, showcaseAssets } from 'data/showcase';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  GradientButton,
  GradientText,
  RevealOnScroll,
  RevealText,
} from 'components/sections/showcase/common';

gsap.registerPlugin(ScrollTrigger);

const FigmaCTA = () => {
  const { t: translateUi } = useTranslation();
  const sectionRef = useRef(null);
  const figmaBoxRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        figmaBoxRef.current,
        { y: 140 },
        {
          y: -140,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom-=20%',
            end: 'bottom top+=10%',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <Container ref={sectionRef} maxWidth={false} sx={{ maxWidth: 966 }}>
      <Stack
        sx={{
          gap: 3,
          mb: 8,
          alignItems: 'center',
        }}
      >
        <RevealText>
          <GradientText variant="h3" sx={{ textAlign: 'center' }}>
            {translateUi('ui.sections.showcase.cta.figma.toolkit_designed_for_325c4dd0')}{' '}
            <Box
              component="span"
              sx={{
                whiteSpace: 'nowrap',
              }}
            >
              {translateUi('ui.sections.showcase.cta.figma.innovative_designers_a2e4fa8d')}
            </Box>
          </GradientText>
        </RevealText>

        <RevealOnScroll delay={0.4}>
          <GradientButton href={figmaPreviewLink} target="_blank" rel="noopener noreferrer">
            {translateUi('ui.sections.showcase.cta.figma.preview_in_figma_43925aac')}
          </GradientButton>
        </RevealOnScroll>
      </Stack>
      <Box
        sx={{
          position: 'relative',
          width: 1,
          aspectRatio: { xs: '4/3', md: '16/9' },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: 3,
            opacity: 0.5,
            overflow: 'hidden',
            backgroundImage: `url(${showcaseAssets.figmaCTA[0]})`,
            backgroundSize: 'contain',
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background: ({ vars }) =>
                `linear-gradient(to top, ${vars.palette.grey[950]}, transparent)`,
            },
          }}
        />

        <Box
          ref={figmaBoxRef}
          sx={{
            position: 'absolute',
            width: { xs: '90%', sm: '80%' },
            left: { xs: '5%', sm: '10%' },
            borderRadius: { xs: 3, md: 6 },
            aspectRatio: { xs: '4/3', sm: '16/9' },
            backgroundImage: `url(${showcaseAssets.figmaCTA[1]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
      </Box>
    </Container>
  );
};

export default FigmaCTA;
