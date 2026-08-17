import { Button, Stack } from '@mui/material';
import { navItems } from 'data/showcase';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import paths from 'routes/paths';
import { GradientButton } from '../../common';

const HeaderNav = ({ registerNavItemRef }) => {
  const { up } = useBreakpoints();
  const upMd = up('md');

  return (
    <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
      {upMd &&
        navItems.map(({ label, href }) => (
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
        href={paths.landingSubscriptions}
        color="neutral"
        sx={{ width: { xs: 160 }, height: { xs: 52 } }}
      >
        选择服务
      </GradientButton>
    </Stack>
  );
};

export default HeaderNav;
