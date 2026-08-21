import { Box } from '@mui/material';
import Hero from 'components/sections/landing/about-us/Hero';
import OurMission from 'components/sections/landing/about-us/OurMission';
import Overview from 'components/sections/landing/about-us/Overview';
import Clients from 'components/sections/landing/homepage/Clients';

const AboutUs = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        overflow: 'hidden',
        bgcolor: 'background.default',
        '& .MuiTypography-root, & .MuiButton-root, & .MuiTab-root, & .MuiChip-root': {
          fontFamily: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei UI", system-ui, sans-serif',
        },
      }}
    >
      <Hero />
      <Overview />
      <OurMission />
      <Clients />
    </Box>
  );
};

export default AboutUs;
