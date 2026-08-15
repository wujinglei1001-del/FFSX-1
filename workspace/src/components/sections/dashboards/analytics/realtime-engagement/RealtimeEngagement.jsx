import { Paper } from '@mui/material';
import EngagementMap from './EngagementMap';

const RealtimeEngagement = ({ data }) => {
  return (
    <Paper sx={{ position: 'relative' }}>
      <EngagementMap
        data={data}
        sx={{
          width: '100%',
          borderRadius: 2,
          overflow: 'hidden',
          height: { xs: '720px !important', md: '480px !important' },
        }}
      />
    </Paper>
  );
};

export default RealtimeEngagement;
