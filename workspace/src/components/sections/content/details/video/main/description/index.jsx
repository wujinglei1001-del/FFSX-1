import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Chip, Collapse, Link, Paper, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

const VideoDescription = ({ description }) => {
  const { t: translateUi } = useTranslation();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Paper
      variant="elevation"
      background={1}
      elevation={0}
      sx={{
        alignSelf: { md: 'flex-start' },
        flex: 1,
        borderRadius: 4,
        p: { xs: 2, md: 3 },
        mb: { xs: 3, md: 5 },
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <IconifyIcon
          icon="material-symbols:keyboard-arrow-down-rounded"
          fontSize={24}
          sx={{
            rotate: open ? '180deg' : '0deg',
          }}
        />
        <Typography variant="h6">
          {translateUi('ui.sections.content.details.video.details_dc3decbb')}
        </Typography>
      </Stack>
      <Collapse in={open} unmountOnExit>
        <Typography sx={{ color: 'text.secondary', my: 3 }}>{description.description}</Typography>
        <Typography
          sx={{
            fontWeight: 700,
            color: 'text.secondary',
            mb: 1,
          }}
        >
          {translateUi('ui.sections.content.details.video.team_21888726')}
        </Typography>
        <Stack sx={{ mb: 3 }}>
          {description.team.map((member) => (
            <Typography variant="body2" sx={{ color: 'text.secondary' }} key={member.name}>
              {member.role} - {member.name}
            </Typography>
          ))}
        </Stack>
        <Typography
          sx={{
            fontWeight: 500,
            color: 'text.secondary',
            mb: 0.5,
          }}
        >
          {translateUi('ui.sections.content.details.video.follow_us_d2444325')}
        </Typography>
        <Stack sx={{ gap: 1, mb: { xs: 3, md: 5 } }}>
          {description.socials.map((social) => (
            <Stack direction="row" sx={{ gap: 0.5, alignItems: 'center' }} key={social.link}>
              <IconifyIcon
                icon={
                  social.platform.toLowerCase() === 'email'
                    ? 'material-symbols:mail-outline-rounded'
                    : 'material-symbols:link-rounded'
                }
                sx={{ fontSize: 20 }}
              />
              <Typography
                component={social.platform.toLowerCase() === 'email' ? Link : 'span'}
                href={
                  social.platform.toLowerCase() === 'email' ? `mailto:${social.link}` : undefined
                }
              >
                <Box component="span" sx={{ color: 'primary.main' }}>
                  {social.link}
                </Box>
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: 'text.secondary',
            mb: 2,
          }}
        >
          {translateUi('ui.sections.content.details.video.tags_848eed0f')}
        </Typography>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          {description.tags.map((tag) => (
            <Chip key={tag} label={tag} sx={{ textTransform: 'capitalize' }} />
          ))}
        </Stack>
      </Collapse>
    </Paper>
  );
};

export default VideoDescription;
