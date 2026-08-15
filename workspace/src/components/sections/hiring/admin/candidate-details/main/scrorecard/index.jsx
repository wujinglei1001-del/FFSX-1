import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import FillScorecard from './FillScorecard';
import RatingCriteria from './RatingCriteria';
import ScorecardFeedback from './ScorecardFeedback';
import ScorecardSummary from './summary';

const Scorecard = () => {
  const { t: translateUi } = useTranslation();
  return (
    <div>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
        <Typography variant="h6">
          {translateUi('ui.sections.hiring.admin.candidate_details.scorecard_summary_9bbc771b')}
        </Typography>
        <FillScorecard />
      </Stack>
      <Stack
        sx={{
          gap: 5,
        }}
      >
        <ScorecardSummary />
        <RatingCriteria />
        <ScorecardFeedback />
      </Stack>
    </div>
  );
};

export default Scorecard;
