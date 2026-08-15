import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Box, Button, Divider, Stack, Toolbar, Typography, paperClasses } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useThemeMode } from 'hooks/useThemeMode';
import { cssVarRgba } from 'lib/utils';
import { useSettingsPanelContext } from 'providers/SettingsPanelProvider';
import { useSettingsContext } from 'providers/SettingsProvider';
import { useVisionMode } from 'providers/VisionModeProvider';
import { RESET, SET_PRIMARY_COLOR } from 'reducers/SettingsReducer';
import { blue, green } from 'theme/colors/base';
import IconifyIcon from 'components/base/IconifyIcon';
import SimpleBar from 'components/base/SimpleBar';
import NavColorPanel from './NavColorPanel';
import NavigationMenuPanel from './NavigationMenuPanel';
import SidenavShapePanel from './SidenavShapePanel';
import TextDirectionPanel from './TextDirectionPanel';
import TopnavShapePanel from './TopnavShapePanel';
import VisionModePanel from './VisionModePanel';
import FontSettingsPanel from './font-settings/FontSettingsPanel';
import ThemeList from './theme-preset/ThemeList';

const SettingsPanel = () => {
  const { t: translateUi } = useTranslation();
  const {
    config: { navigationMenuType },
    configDispatch,
  } = useSettingsContext();
  const { setThemeMode, setThemePreset } = useThemeMode();
  const { setMode } = useVisionMode();
  const {
    settingsPanelConfig: {
      openSettingPanel,
      disableNavigationMenuSection,
      disableNavColorSection,
      disableTopShapeSection,
      disableSidenavShapeSection,
    },
    setSettingsPanelConfig,
  } = useSettingsPanelContext();
  const navigate = useNavigate();

  const handleReset = () => {
    configDispatch({ type: RESET });
    configDispatch({ type: SET_PRIMARY_COLOR, payload: blue[500] });
    setThemePreset('default-light');
    setThemeMode('light');
    setMode('normal');
    navigate(location.pathname, { replace: true });
  };

  return (
    <div>
      <Drawer
        open={openSettingPanel}
        anchor="right"
        onClose={() => {
          setSettingsPanelConfig({ openSettingPanel: false });
        }}
        sx={({ zIndex }) => ({
          zIndex: zIndex.tooltip + 1,
          [`& .${paperClasses.root}`]: {
            width: 313,
          },
        })}
      >
        <Toolbar
          sx={(theme) => ({
            background: `linear-gradient(90.42deg, ${blue[300]} 13.1%, ${green[400]} 143.31%)`,
            gap: 1,

            ...theme.applyStyles('dark', {
              background: `linear-gradient(90.42deg, ${blue[900]} 13.1%, ${green[600]} 143.31%)`,
            }),
          })}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              flex: 1,
            }}
          >
            {translateUi('ui.components.settings_panel.settingspanel.customize_239dce62')}
          </Typography>
          <Button
            variant="soft"
            sx={({ vars }) => ({
              bgcolor: cssVarRgba(vars.palette.common.whiteChannel, 0.1),
              color: vars.palette.common.white,
            })}
            startIcon={<IconifyIcon icon="material-symbols:reset-settings-rounded" />}
            onClick={handleReset}
          >
            {translateUi('ui.components.settings_panel.settingspanel.reset_44c57abd')}
          </Button>
          <Button
            variant="soft"
            sx={({ vars }) => ({
              bgcolor: cssVarRgba(vars.palette.common.whiteChannel, 0.1),
              color: vars.palette.common.white,
            })}
            shape="square"
            onClick={() => {
              setSettingsPanelConfig({
                openSettingPanel: false,
              });
            }}
          >
            <IconifyIcon icon="material-symbols:close-rounded" sx={{ fontSize: 20 }} />
          </Button>
        </Toolbar>
        <Box
          sx={{
            flex: 1,
            overflow: 'hidden',
          }}
        >
          <SimpleBar
            sx={{
              height: 1,
              '& .simplebar-mask': {
                zIndex: 'unset',
              },
            }}
            autoHide={false}
          >
            <Box sx={{ p: 3 }}>
              <Stack sx={{ gap: 3 }}>
                <Section
                  title={translateUi('ui.components.settings_panel.settingspanel.theme_a797e309')}
                >
                  <ThemeList />
                </Section>

                <Divider sx={{ mx: -3 }} />

                <Section
                  title={translateUi(
                    'ui.components.settings_panel.settingspanel.navigation_menu_de144f04',
                  )}
                  disable={disableNavigationMenuSection}
                >
                  <NavigationMenuPanel />
                </Section>

                {navigationMenuType !== 'topnav' && (
                  <Section
                    title={translateUi(
                      'ui.components.settings_panel.settingspanel.sidenav_shape_61ea250d',
                    )}
                    disable={disableSidenavShapeSection}
                  >
                    <SidenavShapePanel />
                  </Section>
                )}
                {navigationMenuType !== 'sidenav' && (
                  <Section
                    title={translateUi(
                      'ui.components.settings_panel.settingspanel.topnav_shape_5378944c',
                    )}
                    disable={disableTopShapeSection}
                  >
                    <TopnavShapePanel />
                  </Section>
                )}

                <Divider sx={{ mx: -3 }} />

                <Section
                  title={translateUi(
                    'ui.components.settings_panel.settingspanel.nav_color_00d84528',
                  )}
                  disable={disableNavColorSection}
                >
                  <NavColorPanel />
                </Section>

                <Divider sx={{ mx: -3 }} />

                <Section
                  title={translateUi(
                    'ui.components.settings_panel.settingspanel.text_direction_0526e3a6',
                  )}
                >
                  <TextDirectionPanel />
                </Section>

                <Divider sx={{ mx: -3 }} />

                <Section
                  title={translateUi(
                    'ui.components.settings_panel.settingspanel.font_family_694eff06',
                  )}
                >
                  <FontSettingsPanel />
                </Section>

                <Divider sx={{ mx: -3 }} />

                <Section
                  title={translateUi(
                    'ui.components.settings_panel.settingspanel.vision_mode_c0486f98',
                  )}
                >
                  <VisionModePanel />
                </Section>
              </Stack>
            </Box>
          </SimpleBar>
        </Box>
        <Toolbar
          sx={{
            display: 'block',
            borderTop: 1,
            borderColor: 'dividerLight',
            py: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(92.45deg, #20DE99 -0.35%, #7DB1F5 43.54%, #5A9EF6 78.08%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {translateUi('ui.components.settings_panel.settingspanel.and_more_0a3e48a6')}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              background: `linear-gradient(92.45deg, #5A9EF6 -0.35%, #7DB1F5 43.54%, #20DE99 78.91%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {translateUi('ui.components.settings_panel.settingspanel.coming_soon_1323a056')}
          </Typography>
        </Toolbar>
      </Drawer>
    </div>
  );
};

export default SettingsPanel;

const Section = ({ title, disable, children }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Box
      sx={[
        !!disable && {
          pointerEvents: 'none',
          '& .SettingsItem': {
            '&:after': {
              bgcolor: 'unset',
            },
          },
        },
      ]}
    >
      <Stack
        direction="row"
        sx={[
          {
            alignItems: 'center',
          },
          { mb: 2 },
          !!disable && { mb: 1 },
        ]}
      >
        <Typography
          variant="subtitle1"
          sx={[
            {
              fontWeight: 700,
            },
            !!disable && { color: 'text.disabled' },
          ]}
        >
          {title}
        </Typography>
      </Stack>
      {disable && (
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5, mb: 2, color: 'info.main' }}>
          <IconifyIcon icon="material-symbols:info-outline" sx={{ fontSize: 16 }} />
          <Typography variant="subtitle2">
            {translateUi(
              'ui.components.settings_panel.settingspanel.not_available_in_this_layout_9411ed0a',
            )}
          </Typography>
        </Stack>
      )}
      <Box sx={[!!disable && { opacity: 0.4 }]}>{children}</Box>
    </Box>
  );
};
