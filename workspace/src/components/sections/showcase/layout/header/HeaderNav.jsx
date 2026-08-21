import { useTranslation } from 'react-i18next';
import { Button, Stack } from '@mui/material';
import { publicNavItems } from 'data/ffax-public';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import { publicAuthPaths } from 'routes/paths';
import { GradientButton } from '../../common';

const HeaderNav = ({ registerNavItemRef }) => {
  const { t } = useTranslation();
  const { up } = useBreakpoints();
  const upMd = up('md');

  return (
    <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
      {upMd &&
        publicNavItems.map(({ label, href }) => (
          <Button
            key={label}
            ref={registerNavItemRef}
            size="medium"
            variant="text"
            color="neutral"
            href={href}
            sx={{ p: 1.5, color: 'common.white' }}
          >
            {label}
          </Button>
        ))}

      <GradientButton
        ref={registerNavItemRef}
        href={publicAuthPaths.login}
        color="neutral"
        sx={{ width: { xs: 160 }, height: { xs: 52 } }}
      >
        {t('ffax.public.navigation.login')}
      </GradientButton>
    </Stack>
  );
};

export default HeaderNav;
