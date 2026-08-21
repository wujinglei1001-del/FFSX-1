import { useId } from 'react';
import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';
import { allIconNames } from 'lib/iconify/iconify-register';

export const IconifyIcon = ({ icon, flipOnRTL = false, color, sx, ...rest }) => {
  const uniqueId = useId();

  if (!allIconNames.includes(icon)) {
    if (!icon.startsWith('noto')) {
      console.warn(
        [
          `Icon "${icon}" is currently loaded online, which may cause flickering effects.`,
          `To ensure a smoother experience, please register your icon collection for offline use.`,
          `More information is available at: https://iconify.design/docs/icon-components/react/`,
        ].join('\n'),
      );
    }
  }

  const iconNameClass = icon.split(':').join('-');

  return (
    <Box
      component={Icon}
      className={`iconify ${iconNameClass}`}
      {...rest}
      icon={icon}
      id={uniqueId}
      ssr
      sx={[
        {
          color: color,
        },
        flipOnRTL && {
          transform: (theme) => (theme.direction === 'rtl' ? 'scaleX(-1)' : 'none'),
        },
        { verticalAlign: 'baseline' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
};

export default IconifyIcon;
