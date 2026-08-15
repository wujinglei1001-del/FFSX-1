import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import RealtimeEngagementChart from './RealtimeEngagementChart';

const EngagementPreview = () => {
  const [userCounter, setUserCounter] = useState(549);

  const updateUserCounter = (value) => {
    setUserCounter((prev) => prev - prev / 60 + value);
  };

  return (
    <Box
      sx={{
        px: { xs: 3, md: 0 },
        width: 1,
        position: 'absolute',
        bottom: { xs: 24, md: 40 },
        right: { xs: 0, md: 40 },
        maxWidth: { xs: 1, md: 404 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          py: 5,
          px: 4,
          border: 0,
          borderRadius: 0,
          backgroundColor: 'transparent',
          backgroundImage: 'none',
          boxShadow: 'none',
          flexDirection: 'column',
          gap: { xs: 3, md: 5 },
        }}
      >
        <div>
          <Typography
            variant="h6"
            sx={{
              mb: 1,
            }}
          >
            过去一小时内的用户
          </Typography>

          <Typography variant="h2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
            {Math.round(userCounter)}
          </Typography>
        </div>

        <div>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
            }}
          >
            每分钟用户数
          </Typography>

          <RealtimeEngagementChart
            updateUserCounter={updateUserCounter}
            sx={{ height: '80px !important', width: 1 }}
          />
        </div>
      </Box>
    </Box>
  );
};

export default EngagementPreview;
