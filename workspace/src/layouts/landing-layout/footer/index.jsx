import Box from '@mui/material/Box';
import CTA from './CTA';
import NavSection from './NavSection';

const LandingFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'transparent',
        position: 'relative',
      }}
    >
      <CTA />
      <NavSection />
    </Box>
  );
};

export default LandingFooter;
