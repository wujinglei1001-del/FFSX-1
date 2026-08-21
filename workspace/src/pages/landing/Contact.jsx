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
          title={translateUi('ffax.public.contact.page_title')}
          subtitle={translateUi('ffax.public.contact.page_subtitle')}
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
