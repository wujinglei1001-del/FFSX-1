import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Typography,
  listClasses,
  paperClasses,
} from '@mui/material';
import { useAuth } from 'providers/AuthProvider';
import { demoUser } from 'providers/auth-provider/AuthJwtProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import StatusAvatar from 'components/base/StatusAvatar';

const ProfileMenu = () => {
  const { t: translateUi } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const { sessionUser, signout } = useAuth();

  // Demo user data used for development purposes
  const user = useMemo(() => sessionUser || demoUser, [sessionUser]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    signout();
    handleClose();
  };

  return (
    <>
      <Button
        color="neutral"
        variant="text"
        shape="circle"
        onClick={handleClick}
        sx={{
          height: 44,
          width: 44,
        }}
      >
        <StatusAvatar
          alt={translateUi('ui.layouts.ecommerce_layout.app_bar.primary.captain_haddock_b801c768')}
          status="online"
          src={user.avatar || undefined}
          sx={{ width: 36, height: 36 }}
        />
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          [`& .${paperClasses.root}`]: { minWidth: 267 },
          [`& .${listClasses.root}`]: { py: 0 },
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            gap: 2,
            p: 2,
          }}
        >
          <StatusAvatar
            status="online"
            alt={user.name}
            src={user.avatar ?? undefined}
            sx={{ width: 48, height: 48 }}
          />
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              {user.name}
            </Typography>
            {user.designation && (
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'warning.main',
                }}
              >
                {user.designation}
                <IconifyIcon
                  icon="material-symbols:diamond-rounded"
                  color="warning.main"
                  sx={{ verticalAlign: 'text-bottom', ml: 0.5 }}
                />
              </Typography>
            )}
          </Box>
        </Stack>

        <Divider />
        <Box sx={{ py: 1 }}>
          <MenuItem onClick={handleClose}>
            {translateUi('ui.layouts.ecommerce_layout.app_bar.primary.your_account_4ab29102')}
          </MenuItem>
          <MenuItem onClick={handleClose}>
            {translateUi('ui.layouts.ecommerce_layout.app_bar.primary.account_settings_82cf8a5f')}
          </MenuItem>
        </Box>
        <Divider />
        <Box sx={{ py: 1 }}>
          <MenuItem onClick={handleClose}>
            {translateUi('ui.layouts.ecommerce_layout.app_bar.primary.orders_cded0933')}
          </MenuItem>
          <MenuItem onClick={handleClose}>
            {translateUi('ui.layouts.ecommerce_layout.app_bar.primary.track_order_51e971d9')}
          </MenuItem>
          <MenuItem onClick={handleClose}>
            {translateUi('ui.layouts.ecommerce_layout.app_bar.primary.wishlist_6ff33102')}
          </MenuItem>
        </Box>
        <Divider />
        <Box sx={{ py: 1 }}>
          <MenuItem onClick={handleClose}>
            {translateUi('ui.layouts.ecommerce_layout.app_bar.primary.membership_53bc9670')}
          </MenuItem>
        </Box>
        <Divider />
        <Box sx={{ py: 1 }}>
          <MenuItem onClick={handleClose}>
            {translateUi('ui.layouts.ecommerce_layout.app_bar.primary.plans_subscription_0e2805ec')}
          </MenuItem>
          <MenuItem onClick={handleClose}>
            {translateUi('ui.layouts.ecommerce_layout.app_bar.primary.payment_methods_dc80127f')}
          </MenuItem>
        </Box>
        <Divider />
        <Box sx={{ py: 1 }}>
          <MenuItem onClick={handleSignout}>
            {translateUi('ui.layouts.ecommerce_layout.app_bar.primary.log_out_6e78c91f')}
          </MenuItem>
        </Box>
      </Menu>
    </>
  );
};

export default ProfileMenu;
