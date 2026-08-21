import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import bg from 'assets/images/background/4.webp';
import { externalLinks } from 'config';
import { useThemeMode } from 'hooks/useThemeMode';
import IconifyIcon from 'components/base/IconifyIcon';
import RevealItems from '../common/RevealItems';
import RevealText from '../common/RevealText';
import SectionHeader from '../common/SectionHeader';

const FAQContact = ({ sx }) => {
  const { t: translateUi } = useTranslation();
  const { isDark } = useThemeMode();
  const handleContactSubmit = (event) => {
    event.preventDefault();
    if (!externalLinks.contact.email) return;
    const formData = new FormData(event.currentTarget);
    const subject = encodeURIComponent(translateUi('ffax.public.faq.mail_subject'));
    const body = encodeURIComponent(
      [
        `${translateUi('ffax.public.contact.first_name')}: ${formData.get('firstName')}`,
        `${translateUi('ffax.public.contact.last_name')}: ${formData.get('lastName')}`,
        `${translateUi('ffax.public.contact.email')}: ${formData.get('email')}`,
        `${translateUi('ffax.public.contact.phone_field')}: ${formData.get('phone')}`,
        '',
        `${translateUi('ffax.public.contact.message')}:`,
        formData.get('message'),
      ].join('\n'),
    );
    window.location.href = `mailto:${externalLinks.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: 1,
        px: { xs: 3, md: 5 },
        '&:after': {
          content: '""',
          position: 'absolute',
          zIndex: -1,
          inset: 0,
          opacity: isDark ? 0.5 : 1,
          background: `url(${bg}) no-repeat`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom left',
        },
        mb: 3,
        ...sx,
      }}
    >
      <Container
        maxWidth={false}
        sx={{ position: 'relative', maxWidth: 1000, px: { xs: 0 }, py: { xs: 4, sm: 8 } }}
      >
        <Grid
          container
          columns={{ xs: 1, md: 2 }}
          rowSpacing={10}
          columnSpacing={15}
          sx={{
            alignItems: 'center',
          }}
        >
          <Grid
            size={1}
            container
            columns={{ xs: 1, sm: 2, md: 1 }}
            spacing={5}
            sx={{
              alignItems: 'flex-end',
            }}
          >
            <Grid size={1}>
              <SectionHeader
                title={translateUi('ffax.public.faq.contact_title')}
                subtitle={translateUi('ffax.public.faq.contact_subtitle')}
                sx={{ textAlign: 'left', mb: 2 }}
              />

              <RevealText delay={0.2}>
                <Typography variant="body2" sx={{ maxWidth: 440, color: 'text.secondary' }}>
                  {translateUi('ffax.public.faq.contact_description')}
                </Typography>
              </RevealText>
            </Grid>

            <Grid size={1}>
              <RevealItems component={List} disablePadding dense>
                <ListItem sx={{ gap: 1 }} disableGutters>
                  <ListItemIcon>
                    <IconifyIcon icon="material-symbols:public" fontSize={24} />
                  </ListItemIcon>
                  <ListItemText disableTypography>
                    <Link
                      component={externalLinks.contact.website ? 'a' : 'span'}
                      href={externalLinks.contact.website || undefined}
                      color="textSecondary"
                      variant="body2"
                    >
                      {externalLinks.contact.website || '—'}
                    </Link>
                  </ListItemText>
                </ListItem>
                <ListItem sx={{ gap: 1 }} disableGutters>
                  <ListItemIcon>
                    <IconifyIcon icon="material-symbols:mail-outline-rounded" fontSize={24} />
                  </ListItemIcon>
                  <ListItemText disableTypography>
                    <Link
                      component={externalLinks.contact.email ? 'a' : 'span'}
                      href={
                        externalLinks.contact.email
                          ? `mailto:${externalLinks.contact.email}`
                          : undefined
                      }
                      color="textSecondary"
                      variant="body2"
                    >
                      {externalLinks.contact.email || '—'}
                    </Link>
                  </ListItemText>
                </ListItem>
                <ListItem sx={{ gap: 1 }} disableGutters>
                  <ListItemIcon>
                    <IconifyIcon
                      icon="material-symbols:location-on-outline-rounded"
                      fontSize={24}
                    />
                  </ListItemIcon>
                  <ListItemText disableTypography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {externalLinks.contact.location || '—'}
                    </Typography>
                  </ListItemText>
                </ListItem>
              </RevealItems>
            </Grid>
          </Grid>

          <Grid size={1}>
            <Box component="form" onSubmit={handleContactSubmit}>
              <RevealItems component={Grid} y={0} container columns={12} spacing={2}>
                <Grid size={6}>
                  <TextField
                    name="firstName"
                    required
                    variant="filled"
                    label={translateUi('ffax.public.contact.first_name')}
                    sx={{ width: 1 }}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    name="lastName"
                    required
                    variant="filled"
                    label={translateUi('ffax.public.contact.last_name')}
                    sx={{ width: 1 }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                  <TextField
                    name="email"
                    required
                    type="email"
                    variant="filled"
                    label={translateUi('ffax.public.contact.email')}
                    sx={{ width: 1 }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                  <TextField
                    name="phone"
                    type="tel"
                    variant="filled"
                    label={translateUi('ffax.public.contact.phone_field')}
                    sx={{ width: 1 }}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    name="message"
                    required
                    multiline
                    rows={2}
                    variant="filled"
                    label={translateUi('ffax.public.contact.message')}
                    sx={{ width: 1 }}
                  />
                </Grid>
                <Grid size={12} sx={{ textAlign: 'right' }}>
                  <Button type="submit" variant="soft" disabled={!externalLinks.contact.email}>
                    {translateUi('ffax.public.faq.send')}
                  </Button>
                </Grid>
              </RevealItems>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default FAQContact;
