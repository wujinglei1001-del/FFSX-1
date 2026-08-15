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
import { useThemeMode } from 'hooks/useThemeMode';
import IconifyIcon from 'components/base/IconifyIcon';
import RevealItems from '../common/RevealItems';
import RevealText from '../common/RevealText';
import SectionHeader from '../common/SectionHeader';

const FAQContact = ({ sx }) => {
  const { t: translateUi } = useTranslation();
  const { isDark } = useThemeMode();
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
                title={translateUi('common_labels.contact')}
                subtitle={translateUi(
                  'ui.sections.landing.faq.faqcontact.still_have_questions_c0780dac',
                )}
                sx={{ textAlign: 'left', mb: 2 }}
              />

              <RevealText delay={0.2}>
                <Typography variant="body2" sx={{ maxWidth: 440, color: 'text.secondary' }}>
                  {translateUi(
                    'ui.sections.landing.faq.faqcontact.still_have_questions_don_t_hesitate_to_ask_our_dedic_c665f79d',
                  )}
                </Typography>
              </RevealText>
            </Grid>

            <Grid size={1}>
              <RevealItems component={List} disablePadding dense>
                <ListItem sx={{ gap: 1 }} disableGutters>
                  <ListItemIcon>
                    <IconifyIcon icon="material-symbols:call-outline" fontSize={24} />
                  </ListItemIcon>
                  <ListItemText disableTypography>
                    <Link href="#!" color="textSecondary" variant="body2">
                      (555) 123-4567
                    </Link>
                  </ListItemText>
                </ListItem>
                <ListItem sx={{ gap: 1 }} disableGutters>
                  <ListItemIcon>
                    <IconifyIcon icon="material-symbols:mail-outline-rounded" fontSize={24} />
                  </ListItemIcon>
                  <ListItemText disableTypography>
                    <Link href="#!" color="textSecondary" variant="body2">
                      {translateUi(
                        'ui.sections.landing.faq.faqcontact.hello_randommail_com_dd2ead67',
                      )}
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
                      {translateUi(
                        'ui.sections.landing.faq.faqcontact.123_sunnyvale_park_springfield_il_usa_87af5cdd',
                      )}
                    </Typography>
                  </ListItemText>
                </ListItem>
              </RevealItems>
            </Grid>
          </Grid>

          <RevealItems component={Grid} y={0} container size={1} columns={12} spacing={2}>
            <Grid size={6}>
              <TextField
                variant="filled"
                label={translateUi('ui.sections.landing.faq.faqcontact.first_name_b6ea992a')}
                sx={{ width: 1 }}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                variant="filled"
                label={translateUi('ui.sections.landing.faq.faqcontact.last_name_863cb39f')}
                sx={{ width: 1 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 12 }}>
              <TextField
                variant="filled"
                label={translateUi('ui.sections.landing.faq.faqcontact.email_84add5b2')}
                sx={{ width: 1 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 12 }}>
              <TextField
                variant="filled"
                label={translateUi('ui.sections.landing.faq.faqcontact.phone_77064d52')}
                sx={{ width: 1 }}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                multiline
                rows={2}
                variant="filled"
                label={translateUi('ui.sections.landing.faq.faqcontact.message_68f4145f')}
                sx={{ width: 1 }}
              />
            </Grid>
            <Grid size={12} sx={{ textAlign: 'right' }}>
              <Button variant="soft">
                {translateUi('ui.sections.landing.faq.faqcontact.send_message_c70a890d')}
              </Button>
            </Grid>
          </RevealItems>
        </Grid>
      </Container>
    </Box>
  );
};
export default FAQContact;
