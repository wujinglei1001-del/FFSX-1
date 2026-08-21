import { useState } from 'react';
import { Box, Stack, Toolbar } from '@mui/material';
import FAQContact from 'components/sections/landing/faq/FAQContact';
import FAQHeader from 'components/sections/landing/faq/FAQHeader';
import FAQMain from 'components/sections/landing/faq/main/FAQMain';

const LandingFAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Toolbar sx={{ height: 56, width: 1 }} />
      <Stack
        sx={{
          gap: 3,
        }}
      >
        <FAQHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <FAQMain searchQuery={searchQuery} />
        <FAQContact />
      </Stack>
    </Box>
  );
};
export default LandingFAQ;
