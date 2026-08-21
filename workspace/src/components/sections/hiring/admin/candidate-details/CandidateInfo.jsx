import { useTranslation } from 'react-i18next';
import {
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from '@mui/material';

const CandidateInfo = ({ contact, jobPreferences, experiences, education }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Grid container spacing={3}>
      <Grid
        container
        rowSpacing={{ sm: 1, md: 0 }}
        columns={{ xs: 1, sm: 2, md: 1 }}
        component={List}
        size={12}
        disablePadding
      >
        <Grid size={1}>
          <InfoItem
            primary={translateUi('ui.sections.hiring.admin.candidate_details.email_84add5b2')}
            secondary={<Link href={`mailto:${contact.email}`}>{contact.email}</Link>}
          />
        </Grid>
        <Grid size={1}>
          <InfoItem
            sx={{ flexBasis: '50%' }}
            primary={translateUi('ui.sections.hiring.admin.candidate_details.phone_no_8578b945')}
            secondary={contact.phone}
          />
        </Grid>
        <Grid size={1}>
          <InfoItem
            primary={translateUi('ui.sections.hiring.admin.candidate_details.address_d70f93df')}
            secondary={contact.address}
          />
        </Grid>
        <Grid size={1}>
          <InfoItem
            primary={translateUi(
              'ui.sections.hiring.admin.candidate_details.desired_salary_f683579b',
            )}
            secondary={jobPreferences.desiredSalary}
          />
        </Grid>
        <Grid size={1}>
          <InfoItem
            primary={translateUi('ui.sections.hiring.admin.candidate_details.referred_by_b47f7840')}
            secondary={jobPreferences.referredBy}
          />
        </Grid>
        <Grid size={1}>
          <InfoItem
            primary={translateUi(
              'ui.sections.hiring.admin.candidate_details.website_portfolio_3b8f63bd',
            )}
            secondary={<Typography variant="body2">{contact.website}</Typography>}
          />
        </Grid>
      </Grid>
      <Grid
        component={List}
        size={{ xs: 12, sm: 6, md: 12 }}
        disablePadding
        subheader={
          <ListSubheader component="div" disableGutters sx={{ bgcolor: 'transparent', mb: 2 }}>
            <Typography
              variant="subtitle1"
              color="textPrimary"
              sx={{
                fontWeight: 700,
              }}
            >
              {translateUi('ui.sections.hiring.admin.candidate_details.experiences_52271258')}
            </Typography>
          </ListSubheader>
        }
      >
        {experiences.map((experience) => (
          <InfoItem
            key={experience.title}
            primary={experience.title}
            secondary={
              <Stack
                component="span"
                sx={{
                  gap: 1,
                }}
              >
                <Typography
                  component="span"
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  {experience.company}
                </Typography>
                <Typography component="span" variant="caption" color="textSecondary">
                  ({experience.duration})
                </Typography>
              </Stack>
            }
            primaryProps={{
              color: 'text.secondary',
              mb: 0.5,
            }}
          />
        ))}
      </Grid>
      <Grid
        component={List}
        size={{ xs: 12, sm: 6, md: 12 }}
        disablePadding
        subheader={
          <ListSubheader component="div" disableGutters sx={{ bgcolor: 'transparent', mb: 2 }}>
            <Typography
              variant="subtitle1"
              color="textPrimary"
              sx={{
                fontWeight: 700,
              }}
            >
              {translateUi('ui.sections.hiring.admin.candidate_details.education_aaf87fe5')}
            </Typography>
          </ListSubheader>
        }
      >
        {education.map((edu) => (
          <InfoItem
            key={edu.degree}
            primary={edu.degree}
            secondary={
              <Stack
                component="span"
                sx={{
                  gap: 1,
                }}
              >
                <Typography
                  component="span"
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  {edu.institution}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  ({edu.duration})
                </Typography>
              </Stack>
            }
            primaryProps={{
              color: 'text.secondary',
              mb: 0.5,
            }}
          />
        ))}
      </Grid>
    </Grid>
  );
};

const InfoItem = ({ primary, secondary, primaryProps, secondaryProps, props, sx }) => {
  return (
    <ListItem disableGutters sx={{ ...sx }}>
      <ListItemText
        primary={primary}
        secondary={secondary}
        sx={{ my: 1 }}
        slotProps={{
          primary: {
            sx: {
              mb: 1,
              typography: 'subtitle1',
              fontWeight: 700,
              display: 'block',

              ...primaryProps,
            },
          },
          secondary: {
            sx: {
              display: 'block',
              typography: 'body1',
              ...secondaryProps,
            },
          },
        }}
        {...props}
      />
    </ListItem>
  );
};

export default CandidateInfo;
