import { useTranslation } from 'react-i18next';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

const EducationInfo = ({ data }) => {
  const { t: translateUi } = useTranslation();
  return (
    <div>
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
        {translateUi('ui.sections.member.profile.profile_tabs.education_aaf87fe5')}
      </Typography>
      <Stack
        sx={{
          gap: 3,
        }}
      >
        {data.map((item, index) => (
          <EducationEntry key={index} entry={item} />
        ))}
      </Stack>
    </div>
  );
};
const EducationEntry = ({ entry }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      direction="row"
      sx={{
        gap: 2,
      }}
    >
      <Avatar src={entry.icon} sx={{ width: 40, height: 40, bgcolor: 'transparent' }} />
      <Stack
        sx={{
          gap: 1,
        }}
      >
        <Typography variant="subtitle2">
          <Box component="span" sx={{ fontWeight: 400 }}>
            {translateUi('ui.sections.member.profile.profile_tabs.studied_at_b7d9a3f5')}{' '}
          </Box>
          <Box component="strong" sx={{ fontWeight: 700 }}>
            {entry.institution}
          </Box>
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 400, color: 'text.secondary' }}>
          {entry.location}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary' }}>
          {dayjs(entry.startDate).format('MMM, YYYY')} - {dayjs(entry.endDate).format('MMM, YYYY')}
        </Typography>
      </Stack>
    </Stack>
  );
};
export default EducationInfo;
