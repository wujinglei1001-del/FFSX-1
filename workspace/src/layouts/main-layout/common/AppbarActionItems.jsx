import { Stack } from '@mui/material';
import CurrencyMenu from './CurrencyMenu';
import LanguageMenu from './LanguageMenu';
import NotificationMenu from './NotificationMenu';
import ProfileMenu from './ProfileMenu';
import ThemeToggler from './ThemeToggler';

const AppbarActionItems = ({ type = 'default', sx, searchComponent }) => {
  return (
    <Stack
      className="action-items"
      direction="row"
      sx={{
        gap: 1,
        alignItems: 'center',
        ml: 'auto',
        ...sx,
      }}
    >
      {searchComponent}
      <LanguageMenu type={type} />
      <CurrencyMenu type={type} />
      <ThemeToggler type={type} />
      <NotificationMenu type={type} />
      <ProfileMenu type={type} />
    </Stack>
  );
};

export default AppbarActionItems;
