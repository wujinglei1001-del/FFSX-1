import { useTranslation } from 'react-i18next';
import { Button, Drawer, Stack, Typography, drawerClasses } from '@mui/material';
import { emailSidebarWidth } from 'providers/EmailProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import EmailSidebarPanel from './EmailSidebarPanel';

const EmailSidebar = ({ isDrawerOpen, toggleDrawer, up }) => {
  const { t: translateUi } = useTranslation();
  return (
    <>
      {up ? (
        <Drawer
          variant="persistent"
          open={isDrawerOpen}
          sx={(theme) => ({
            [`& .${drawerClasses.paper}`]: {
              position: 'sticky',
              zIndex: 'unset',
              border: 0,
              overflowY: 'auto',
              width: emailSidebarWidth,
              py: 5,
              px: 3,
              outline: `1px solid ${theme.vars.palette.divider}`,
              bgcolor: theme.vars.palette.background.elevation1,
            },
          })}
        >
          <EmailSidebarPanel />
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={isDrawerOpen}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true,
          }}
          sx={[
            {
              [`& .${drawerClasses.paper}`]: {
                width: emailSidebarWidth,
                border: 0,
                outline: (theme) => `1px solid ${theme.vars.palette.divider}`,
                bgcolor: 'background.elevation1',
                py: 5,
                px: 3,
              },
            },
          ]}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
              pl: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: 700,
              }}
            >
              {translateUi('ui.layouts.email_layout.emailsidebar.category_a3c686e7')}
            </Typography>
            <Button shape="circle" variant="soft" color="neutral" onClick={toggleDrawer}>
              <IconifyIcon icon="material-symbols:close-rounded" sx={{ fontSize: 20 }} />
            </Button>
          </Stack>
          <EmailSidebarPanel toggleDrawer={toggleDrawer} />
        </Drawer>
      )}
    </>
  );
};

export default EmailSidebar;
