import { useTranslation } from 'react-i18next';
import { Box, Container, Toolbar } from '@mui/material';
import PageHeader from 'components/sections/landing/common/PageHeader';
import SectionHeader from 'components/sections/landing/common/SectionHeader';
import ContactContainer from 'components/sections/landing/contact/ContactContainer';

const Contact = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Toolbar sx={{ height: 56, width: 1 }} />

      <PageHeader>
        <SectionHeader
          title={translateUi('ui.pages.landing.contact.contact_b37456c4')}
          subtitle={translateUi('ui.pages.landing.contact.where_to_find_us_3195d5a6')}
        />
      </PageHeader>

      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1000,
          p: { xs: 3, md: 5 },
        }}
      >
        <ContactContainer />
      </Container>
    </Box>
  );
};

export default Contact;
