import { useTranslation } from 'react-i18next';
import { useGSAP } from '@gsap/react';
import { Box, Container, Grid } from '@mui/material';
import { initialConfig } from 'config';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'components/base/Image';
import RevealItems from '../common/RevealItems';
import SectionHeader from '../common/SectionHeader';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const logos = [
  initialConfig.assetsDir + '/images/landing/clients/1.svg',
  initialConfig.assetsDir + '/images/landing/clients/2.svg',
  initialConfig.assetsDir + '/images/landing/clients/3.svg',
  initialConfig.assetsDir + '/images/landing/clients/4.svg',
  initialConfig.assetsDir + '/images/landing/clients/5.svg',
  initialConfig.assetsDir + '/images/landing/clients/6.svg',
  initialConfig.assetsDir + '/images/landing/clients/7.svg',
  initialConfig.assetsDir + '/images/landing/clients/8.svg',
];

const Clients = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Box sx={{ py: { xs: 5, sm: 8 }, px: { xs: 3, md: 5 } }}>
      <Container maxWidth={false} sx={{ maxWidth: 1080, px: { xs: 0 } }}>
        <SectionHeader
          title={translateUi('ui.sections.landing.homepage.clients.clients_28e22fe3')}
          subtitle={translateUi(
            'ui.sections.landing.homepage.clients.trusted_by_the_most_innovative_teams_156640eb',
          )}
          sx={{ mb: 5 }}
        />

        <RevealItems component={Grid} y={0} container columns={12} columnSpacing={{ xs: 3, sm: 0 }}>
          {logos.map((src, idx) => (
            <Grid
              key={idx}
              size={{ xs: 6, md: 3 }}
              sx={{ height: 80, textAlign: 'center', alignContent: 'center' }}
            >
              <Image src={src} alt="" />
            </Grid>
          ))}
        </RevealItems>
      </Container>
    </Box>
  );
};

export default Clients;
