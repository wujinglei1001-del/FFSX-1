import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { comments } from 'data/hrm/performance-management';
import CommentForm from './CommentForm';
import CommentThread from './thread';

const TOTAL_COMMENTS = 100;

const CommentSection = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      sx={{
        gap: 3,
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        {translateUi('ui.sections.hrm.performance_management.goals.comments_6b550688')}
        {TOTAL_COMMENTS})
      </Typography>
      <CommentForm />
      <CommentThread comments={comments} />
    </Stack>
  );
};

export default CommentSection;
