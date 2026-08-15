import { useTranslation } from 'react-i18next';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { users } from 'data/users';
import i18n from 'locales/i18n';

const feedbacks = [
  {
    id: 0,
    author: users[0],
    get message() {
      return i18n.t(
        'ui.sections.hiring.admin.candidate_details.portfolio_is_impressive_clean_design_and_strong_atte_74395044',
      );
    },
    createdAt: 'Today at 12:10pm',
  },
  {
    id: 1,
    author: users[1],
    get message() {
      return i18n.t(
        'ui.sections.hiring.admin.candidate_details.very_confident_communicator_with_good_alignment_to_o_1fcafb2b',
      );
    },
    createdAt: 'Today at 12:10pm',
  },
  {
    id: 2,
    author: users[2],
    get message() {
      return i18n.t(
        'ui.sections.hiring.admin.candidate_details.great_cv_but_senior_leadership_responses_were_weak_b_ab315c9b',
      );
    },
    createdAt: 'Today at 12:10pm',
  },
  {
    id: 3,
    author: users[3],
    get message() {
      return i18n.t(
        'ui.sections.hiring.admin.candidate_details.the_candidate_has_strong_fundamentals_in_data_struct_ed0d86cb',
      );
    },
    createdAt: 'Today at 12:10pm',
  },
];

const ScorecardFeedback = () => {
  const { t: translateUi } = useTranslation();
  return (
    <div>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
        }}
      >
        {translateUi('ui.sections.hiring.admin.candidate_details.scorecard_feedback_5e682e75')}
      </Typography>
      {feedbacks.map((feedback) => {
        return (
          <Stack
            key={feedback.id}
            direction="row"
            sx={{
              gap: 2,
              position: 'relative',
              py: 3,
            }}
          >
            <Avatar
              variant="circular"
              src={feedback.author.avatar}
              sx={{ height: 32, width: 32 }}
            />
            <div>
              <Box
                sx={{
                  mb: 1,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    mb: 0.5,
                  }}
                >
                  {feedback.author.name}
                </Typography>
                <Typography variant="caption" component="p" color="textSecondary">
                  {feedback.createdAt}
                </Typography>
              </Box>

              <Typography variant="body2" color="textSecondary" sx={{ maxWidth: 800 }}>
                {feedback.message}
              </Typography>
            </div>
          </Stack>
        );
      })}
    </div>
  );
};

export default ScorecardFeedback;
