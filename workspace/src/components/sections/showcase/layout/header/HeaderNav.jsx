import { Button, Stack } from '@mui/material';
import { navItems } from 'data/showcase';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import { GradientButton } from '../../common';

const HeaderNav = ({ registerNavItemRef }) => {
  const { up } = useBreakpoints();
  const upMd = up('md');

  return (
    <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
      {upMd &&
        navItems.map(({ label }) => (
          <Button
            key={label}
            ref={registerNavItemRef}
            size="medium"
            variant="text"
            color="neutral"
            sx={{ p: 1.5, color: 'common.white' }}
          >
            {label}
          </Button>
        ))}

      <GradientButton
        ref={registerNavItemRef}
        color="neutral"
        sx={{ width: { xs: 160 }, height: { xs: 52 } }}
      >
        Purchase
      </GradientButton>
    </Stack>
  );
};

export default HeaderNav;
