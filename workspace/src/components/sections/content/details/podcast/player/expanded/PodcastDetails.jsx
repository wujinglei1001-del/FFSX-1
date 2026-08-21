import { useTranslation } from 'react-i18next';
import { Box, Chip, Link, Stack, Typography } from '@mui/material';
import { podcastPlaylist } from 'data/content/podcast';
import IconifyIcon from 'components/base/IconifyIcon';

const item = podcastPlaylist[0].episodeLists[0];

const PodcastDetails = () => {
  const { t: translateUi } = useTranslation();
  return (
    <div>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        {item.description
          ? item.description
          : 'Soluta ligula fugit sodales, quisque lacinia incididunt suspendisse, excepturi consectetuer consequat excepturi dolore purus justo distinctio, curae aliqua'}
      </Typography>
      {item.team.length > 0 && (
        <>
          <Typography sx={{ color: 'text.secondary', mb: 1, fontWeight: 'bold' }}>
            {translateUi('ui.sections.content.details.podcast.team_21888726')}
          </Typography>
          <Stack sx={{ mb: 3 }}>
            {item.team.map((member) => (
              <Typography variant="body2" sx={{ color: 'text.secondary' }} key={member.name}>
                {member.role} - {member.name}
              </Typography>
            ))}
          </Stack>
        </>
      )}
      {item.socials.length > 0 && (
        <>
          <Typography sx={{ color: 'text.secondary', fontWeight: 'medium', mb: 0.5 }}>
            {translateUi('ui.sections.content.details.podcast.follow_us_d2444325')}
          </Typography>
          <Stack sx={{ gap: 1, mb: { xs: 3, md: 5 } }}>
            {item.socials.map((social) => (
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
        </>
      )}

      {item.tags.length > 0 && (
        <>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 600, mb: 2 }}>
            {translateUi('ui.sections.content.details.podcast.tags_848eed0f')}
          </Typography>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            {item.tags.map((tag) => (
              <Chip key={tag} label={tag} sx={{ textTransform: 'capitalize' }} />
            ))}
          </Stack>
        </>
      )}
    </div>
  );
};

export default PodcastDetails;
