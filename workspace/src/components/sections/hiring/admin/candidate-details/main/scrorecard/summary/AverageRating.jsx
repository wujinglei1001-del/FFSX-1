import { useTranslation } from 'react-i18next';
import {
  Avatar,
  AvatarGroup,
  Box,
  Paper,
  Rating,
  Stack,
  Typography,
  avatarGroupClasses,
} from '@mui/material';
import { users } from 'data/users';
import IconifyIcon from 'components/base/IconifyIcon';

const AverageRating = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper
      background={1}
      sx={{ p: 2, borderRadius: 6, outline: 'none', width: { xs: 1, xl: 240 } }}
    >
      <Stack
        sx={{
          height: 1,
          gap: 3,
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ p: 3, borderRadius: 4, bgcolor: 'background.elevation2', textAlign: 'center' }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            {translateUi('ui.sections.hiring.admin.candidate_details.average_rating_3843a4b5')}
          </Typography>

          <Rating
            name="product-rating"
            color="warning"
            value={4}
            readOnly
            icon={
              <IconifyIcon
                icon="material-symbols:star-rounded"
                fontSize={30}
                color="warning.main"
              />
            }
            emptyIcon={
              <IconifyIcon icon="material-symbols:star-rounded" fontSize={30} color="divider" />
            }
          />
        </Box>

        <Stack
          direction={{ xs: 'row', xl: 'column' }}
          sx={{
            gap: 2,
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              {translateUi('ui.sections.hiring.admin.candidate_details.submitted_by_6f668428')}
            </Typography>

            <Typography variant="caption" component="p" sx={{ color: 'text.disabled' }}>
              <Box component="strong">5</Box>
              {translateUi(
                'ui.sections.hiring.admin.candidate_details.interviewers_submitted_dfffcac6',
              )}
              <Box component="strong">1</Box>
              {translateUi('ui.sections.hiring.admin.candidate_details.left_12c0f1fb')}
            </Typography>
          </div>

          <AvatarGroup
            max={5}
            sx={{
              justifyContent: 'flex-end',
              [`& .${avatarGroupClasses.avatar}`]: {
                width: 32,
                height: 32,
                fontSize: 10,
              },
            }}
          >
            {users.slice(0, 6).map((user) => (
              <Avatar key={user.id} src={user.avatar} sx={{ width: 32, height: 32 }} />
            ))}
          </AvatarGroup>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default AverageRating;
