import { useTranslation } from 'react-i18next';
import { Button, Drawer, Stack, Typography, drawerClasses } from '@mui/material';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import SimpleBar from 'components/base/SimpleBar';
import CalendarSidebarPanel from 'components/sections/calendar/CalendarSidebar/CalendarSidebarPanel';

const CalendarSidebar = ({ isDrawerOpen, toggleDrawer }) => {
  const { t: translateUi } = useTranslation();
  const { up } = useBreakpoints();
  const upXl = up('xl');

  return (
    <>
      {upXl ? (
        <Drawer
          variant="persistent"
          open={isDrawerOpen}
          sx={(theme) => ({
            [`& .${drawerClasses.paper}`]: {
              zIndex: 1,
              border: 0,
              overflow: 'hidden',
              width: 352,
              position: 'absolute',
              top: 0,
              bottom: 0,
              minWidth: 0,
              outline: `1px solid ${theme.vars.palette.divider}`,
            },
          })}
        >
          <SimpleBar sx={{ maxHeight: 1 }}>
            <CalendarSidebarPanel />
          </SimpleBar>
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
                width: 352,
                border: 0,
                outline: (theme) => `1px solid ${theme.vars.palette.divider}`,
              },
            },
          ]}
        >
          <SimpleBar sx={{ minHeight: 0, height: 1, pt: 3 }}>
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                px: { xs: 3, md: 5 },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 700,
                }}
              >
                {translateUi(
                  'ui.sections.calendar.calendarsidebar.calendarsidebar.calendar_options_bf08ed73',
                )}
              </Typography>
              <Button shape="circle" variant="soft" color="neutral" onClick={toggleDrawer}>
                <IconifyIcon icon="material-symbols:close-rounded" sx={{ fontSize: 20 }} />
              </Button>
            </Stack>
            <CalendarSidebarPanel />
          </SimpleBar>
        </Drawer>
      )}
    </>
  );
};

export default CalendarSidebar;
