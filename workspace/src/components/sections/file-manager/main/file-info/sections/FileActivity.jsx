import { useTranslation } from 'react-i18next';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent, { timelineContentClasses } from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Avatar, { avatarClasses } from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import IconifyIcon from 'components/base/IconifyIcon';

const FileActivity = ({ file }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper background={1} sx={{ p: { xs: 3, md: 5 } }}>
      <Stack
        sx={{
          gap: 3,
        }}
      >
        <Typography variant="h6">
          {translateUi('ui.sections.file_manager.main.file_info.file_activity_0d4673e8')}
        </Typography>
        <Stack
          sx={{
            gap: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {dayjs(file.modifiedAt).format('D MMM, YYYY')}
          </Typography>
          <Timeline
            sx={{
              p: 0,
              m: 0,
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
              [`& .${timelineContentClasses.root}`]: {
                pr: 0,
              },
            }}
          >
            <TimelineItem sx={{ mb: 1 }}>
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    mt: 0,
                    mb: 1,
                    boxShadow: 'none',
                    border: 0,
                    p: 1,
                    bgcolor: 'primary.lighter',
                  }}
                >
                  <IconifyIcon
                    icon="material-symbols:share-outline"
                    sx={{ fontSize: 16, color: 'primary.dark' }}
                  />
                </TimelineDot>
                <TimelineConnector sx={{ bgcolor: 'divider', width: '1px' }} />
              </TimelineSeparator>
              <TimelineContent sx={{ pr: 1 }}>
                <Stack
                  sx={{
                    gap: 1,
                  }}
                >
                  <Typography variant="subtitle1">
                    {translateUi(
                      'ui.sections.file_manager.main.file_info.you_shared_this_file_with_35c79526',
                    )}
                  </Typography>
                  <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <AvatarGroup
                      max={5}
                      sx={{ [`& .${avatarClasses.root}`]: { width: 32, height: 32 } }}
                    >
                      {file.shared.map((share) => (
                        <Avatar key={share.user.id} src={share.user.avatar} />
                      ))}
                    </AvatarGroup>
                    <Typography variant="body2" sx={{ color: 'text.disabled', fontWeight: 500 }}>
                      {dayjs(file.modifiedAt).format('h:mm A')}
                    </Typography>
                  </Stack>
                </Stack>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem sx={{ mb: 1, minHeight: 0 }}>
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    mt: 0,
                    mb: 1,
                    boxShadow: 'none',
                    border: 0,
                    p: 1,
                    bgcolor: 'primary.lighter',
                  }}
                >
                  <IconifyIcon
                    icon="material-symbols:edit-outline"
                    sx={{ fontSize: 16, color: 'primary.dark' }}
                  />
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent>
                <Stack
                  direction="row"
                  sx={{
                    gap: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="subtitle1">
                    {translateUi(
                      'ui.sections.file_manager.main.file_info.you_modified_this_file_5cfcb055',
                    )}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.disabled', fontWeight: 500 }}>
                    {dayjs(file.modifiedAt).format('h:mm A')}
                  </Typography>
                </Stack>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Stack>
        <Stack
          sx={{
            gap: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {dayjs(file.createdAt).format('D MMM, YYYY')}
          </Typography>
          <Timeline
            sx={{
              p: 0,
              m: 0,
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
              [`& .${timelineContentClasses.root}`]: {
                pr: 0,
              },
            }}
          >
            <TimelineItem sx={{ mb: 1 }}>
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    mt: 0,
                    mb: 1,
                    boxShadow: 'none',
                    border: 0,
                    p: 1,
                    bgcolor: 'primary.lighter',
                  }}
                >
                  <IconifyIcon
                    icon="material-symbols:share-outline"
                    sx={{ fontSize: 16, color: 'primary.dark' }}
                  />
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent>
                <Stack
                  sx={{
                    gap: 1,
                  }}
                >
                  <Typography variant="subtitle1">
                    {translateUi(
                      'ui.sections.file_manager.main.file_info.you_uploaded_this_file_e2e821ca',
                    )}
                  </Typography>
                  <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {file.name + '.' + file.extension}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.disabled', fontWeight: 500 }}>
                      {dayjs(file.uploadedAt).format('h:mm A')}
                    </Typography>
                  </Stack>
                </Stack>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default FileActivity;
