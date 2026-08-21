import { Avatar, Container, Grid, Link, Paper, Typography } from '@mui/material';
import { externalLinks } from 'config';
import i18n from 'locales/i18n';
import IconifyIcon from 'components/base/IconifyIcon';
import RevealItems from '../common/RevealItems';
import ContactForm from './ContactForm';

const contactCardItems = [
  {
    id: 1,
    icon: 'mdi:phone-in-talk-outline',
    get title() {
      return i18n.t('ffax.public.contact.phone');
    },
    isLink: Boolean(externalLinks.contact.phone),
    href: externalLinks.contact.phone ? `tel:${externalLinks.contact.phone}` : undefined,
    content: externalLinks.contact.phone || '—',
  },
  {
    id: 2,
    icon: 'mdi:email-outline',
    get title() {
      return i18n.t('ffax.public.contact.email');
    },
    isLink: Boolean(externalLinks.contact.email),
    href: externalLinks.contact.email ? `mailto:${externalLinks.contact.email}` : undefined,
    content: externalLinks.contact.email || '—',
  },
  {
    id: 3,
    icon: 'mdi:location-on-outline',
    get title() {
      return i18n.t('ffax.public.contact.location');
    },
    content: externalLinks.contact.location || '—',
  },
];
const ContactContainer = () => {
  return (
    <div>
      <RevealItems component={Grid} container spacing={2} sx={{ mt: 2, mb: 2 }}>
        {contactCardItems.map((item) => (
          <Grid key={item.id} size={{ xs: 12, sm: 4 }}>
            <Paper
              variant="elevation"
              elevation={0}
              background={1}
              sx={{
                p: { xs: 2, sm: 3 },
                height: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  bgcolor: 'primary.lighter',
                  mb: 2,
                }}
              >
                <IconifyIcon icon={item.icon} fontSize={16} sx={{ color: 'primary.main' }} />
              </Avatar>

              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                {item.title}
              </Typography>

              <Typography
                component={item.href ? Link : 'p'}
                href={item.href}
                variant="caption"
                sx={{ display: 'block', lineClamp: 1, color: 'text.secondary' }}
              >
                {item.content}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </RevealItems>

      <Container maxWidth={false} sx={{ maxWidth: 440, py: 6 }} disableGutters>
        <ContactForm />
      </Container>
    </div>
  );
};
export default ContactContainer;
