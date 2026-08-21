import { useTranslation } from 'react-i18next';
import { Box, Link, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { externalLinks } from 'config';
import IconifyIcon from 'components/base/IconifyIcon';

const socialLinks = [
  {
    id: 'fb',
    icon: 'ri:facebook-circle-fill',
    href: externalLinks.social.facebook,
  },
  {
    id: 'ig',
    icon: 'ri:instagram-line',
    href: externalLinks.social.instagram,
  },
  {
    id: 'th',
    icon: 'ri:threads-line',
    href: externalLinks.social.threads,
  },
  {
    id: 'x',
    icon: 'ri:twitter-x-fill',
    href: externalLinks.social.x,
  },
  {
    id: 'no',
    icon: 'ri:notion-fill',
    href: externalLinks.social.notion,
  },
  {
    id: 'yt',
    icon: 'ri:youtube-fill',
    href: externalLinks.social.youtube,
  },
];
const SocialIcons = () => {
  const { t: translateUi } = useTranslation();
  const configuredSocialLinks = socialLinks.filter((item) => item.href);

  if (!configuredSocialLinks.length) return null;

  return (
    <div>
      <Typography
        variant="overline"
        component="p"
        sx={{
          fontWeight: 700,
          mb: 2,
          color: 'text.disabled',
        }}
      >
        {translateUi('ffax.public.footer.socials')}
      </Typography>
      <Stack
        direction="row"
        sx={{
          gap: 4,
        }}
      >
        {configuredSocialLinks.map((item) => (
          <Box
            key={item.id}
            component={item.href ? Link : 'span'}
            href={item.href || undefined}
            underline="none"
          >
            <IconifyIcon
              icon={item.icon}
              sx={{
                fontSize: 24,
                color: 'text.disabled',
                ...(item.href && {
                  '&:hover': {
                    color: 'text.secondary',
                  },
                }),
              }}
            />
          </Box>
        ))}
      </Stack>
    </div>
  );
};
export default SocialIcons;
