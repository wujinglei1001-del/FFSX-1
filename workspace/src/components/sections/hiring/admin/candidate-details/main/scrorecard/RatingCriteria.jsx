import { Grid, Rating, Stack, Typography } from '@mui/material';
import i18n from 'locales/i18n';
import IconifyIcon from 'components/base/IconifyIcon';

const criteriaRatings = [
  {
    get title() {
      return i18n.t('ui.sections.hiring.admin.candidate_details.professionalism_3a609283');
    },
    items: [
      {
        get label() {
          return i18n.t('ui.sections.hiring.admin.candidate_details.punctual_ef084839');
        },
        rating: 5,
      },
      {
        get label() {
          return i18n.t('ui.sections.hiring.admin.candidate_details.courteous_bb316bad');
        },
        rating: 5,
      },
      {
        get label() {
          return i18n.t('ui.sections.hiring.admin.candidate_details.communicator_af800ce6');
        },
        rating: 5,
      },
      {
        get label() {
          return i18n.t('ui.sections.hiring.admin.candidate_details.articulate_98ac3704');
        },
        rating: 4,
      },
    ],
  },
  {
    get title() {
      return i18n.t('ui.sections.hiring.admin.candidate_details.qualities_8a9b6130');
    },
    items: [
      {
        get label() {
          return i18n.t(
            'ui.sections.hiring.admin.candidate_details.emotional_intelligence_417e25d6',
          );
        },
        rating: 5,
      },
      {
        get label() {
          return i18n.t('ui.sections.hiring.admin.candidate_details.honesty_0e1a8292');
        },
        rating: 5,
      },
      {
        get label() {
          return i18n.t('ui.sections.hiring.admin.candidate_details.positivity_6b3fa814');
        },
        rating: 5,
      },
      {
        get label() {
          return i18n.t('ui.sections.hiring.admin.candidate_details.curiosity_1a0bff19');
        },
        rating: 4,
      },
      {
        get label() {
          return i18n.t('ui.sections.hiring.admin.candidate_details.self_motivated_dd855776');
        },
        rating: 5,
      },
    ],
  },
  {
    get title() {
      return i18n.t('ui.sections.hiring.admin.candidate_details.activities_e58f7f88');
    },
    items: [
      {
        get label() {
          return i18n.t('ui.sections.hiring.admin.candidate_details.event_management_980e58ee');
        },
        rating: 5,
      },
      {
        get label() {
          return i18n.t('ui.sections.hiring.admin.candidate_details.speaker_7c23b0d9');
        },
        rating: 5,
      },
      {
        get label() {
          return i18n.t('ui.sections.hiring.admin.candidate_details.event_planning_81fed322');
        },
        rating: 5,
      },
    ],
  },
];

const RatingCriteria = () => {
  return (
    <Stack
      sx={{
        gap: 4,
      }}
    >
      {criteriaRatings.map((criteria) => {
        return (
          <div key={criteria.title}>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              {criteria.title}
            </Typography>
            <Grid container columnSpacing={{ xs: 1, xl: 2 }} rowSpacing={1}>
              {criteria.items.map((item) => (
                <Grid key={item.label} size={{ xs: 12, sm: 6, md: 12, lg: 6 }}>
                  <Stack
                    direction="row"
                    sx={{
                      bgcolor: 'background.elevation1',
                      borderRadius: 2,
                      width: 1,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      px: 2,
                      py: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        fontWeight: 500,
                      }}
                    >
                      {item.label}
                    </Typography>

                    <Rating
                      name="product-rating"
                      color="warning"
                      value={item.rating}
                      readOnly
                      icon={
                        <IconifyIcon
                          icon="material-symbols:star-rounded"
                          fontSize={24}
                          color="warning.main"
                        />
                      }
                      emptyIcon={
                        <IconifyIcon
                          icon="material-symbols:star-rounded"
                          fontSize={24}
                          color="divider"
                        />
                      }
                    />
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </div>
        );
      })}
    </Stack>
  );
};

export default RatingCriteria;
