import { useLocation } from 'react-router';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Topnav = ({ menus }) => {
  const { pathname } = useLocation();

  return (
    <Stack
      className="nav-items"
      direction="row"
      sx={{
        alignItems: 'center',
        gap: '2px',
      }}
    >
      {menus.map((menu) => {
        const isActive = menu.href === pathname;

        return (
          <div key={menu.label}>
            <Button
              variant="text"
              href={menu.href}
              color={isActive ? 'primary' : 'neutral'}
              sx={{ fontSize: 14 }}
            >
              {menu.label}
            </Button>
          </div>
        );
      })}
    </Stack>
  );
};

export default Topnav;
