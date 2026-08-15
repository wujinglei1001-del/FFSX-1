import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Grid, Stack, Tab, Typography } from '@mui/material';
import bg from 'assets/images/background/4.webp';
import { useThemeMode } from 'hooks/useThemeMode';
import i18n from 'locales/i18n';
import { useSettingsContext } from 'providers/SettingsProvider';
import RevealImage from '../common/RevealImage';
import SectionHeader from '../common/SectionHeader';

const tabContent = (
  <Stack
    sx={{
      gap: 2,
    }}
  >
    <Typography variant="h6">
      {i18n.t('ui.sections.landing.about_us.ourmission.our_goal_cbcdc20b')}
    </Typography>

    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {i18n.t(
        'ui.sections.landing.about_us.ourmission.we_believe_a_connected_team_is_a_powerful_asset_no_m_8ced9b5a',
      )}
    </Typography>

    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {i18n.t(
        'ui.sections.landing.about_us.ourmission.our_approach_goes_beyond_providing_simple_software_w_ba27d6f9',
      )}
    </Typography>

    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {i18n.t(
        'ui.sections.landing.about_us.ourmission.we_are_committed_to_helping_you_navigate_the_complex_2da5e207',
      )}
    </Typography>

    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {i18n.t(
        'ui.sections.landing.about_us.ourmission.ultimately_when_your_team_thrives_your_business_thri_0e2b701c',
      )}
    </Typography>

    <Typography variant="h6">
      {i18n.t('ui.sections.landing.about_us.ourmission.we_are_here_for_your_needs_f5df1a8e')}
    </Typography>

    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {i18n.t(
        'ui.sections.landing.about_us.ourmission.we_understand_that_the_demands_of_the_modern_workpla_184e7314',
      )}
    </Typography>

    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {i18n.t(
        'ui.sections.landing.about_us.ourmission.we_are_not_merely_a_software_provider_we_see_ourselv_27f8b0f2',
      )}
    </Typography>
  </Stack>
);
const OurMission = ({ sx }) => {
  const { t: translateUi } = useTranslation();
  const {
    config: { assetsDir },
  } = useSettingsContext();
  const { isDark } = useThemeMode();
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        position: 'relative',
        background: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom left',
        ...sx,
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: 1000, px: { xs: 0 }, py: { xs: 5, sm: 8 } }}>
        <Grid container>
          <Grid size={6} sx={{ py: 5, display: { xs: 'none', md: 'block' } }}>
            <RevealImage>
              <Box
                sx={{
                  position: 'sticky',
                  top: 96,
                  width: 1,
                  transform: 'translateX(40px)',
                  aspectRatio: '16/12',
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  boxShadow: (theme) => theme.vars.shadows[4],
                  background: `url(${isDark ? `${assetsDir}/images/landing/hero/1-dark.webp` : `${assetsDir}/images/landing/hero/1.webp`})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'top left',
                }}
              />
            </RevealImage>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                height: 1,
                width: 1,
                position: 'relative',
                zIndex: 10,
                bgcolor: { md: 'background.paper' },
                p: { xs: 3, md: 5 },
                boxShadow: { md: '-40px 0px 70px -60px rgba(0,0,0,0.25)' },
              }}
            >
              <SectionHeader
                subtitle={translateUi(
                  'ui.sections.landing.about_us.ourmission.on_a_mission_to_empower_remote_teams_1918e7ce',
                )}
                title={translateUi(
                  'ui.sections.landing.about_us.ourmission.more_about_us_a948eeb6',
                )}
                sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 5 }}
              />

              <TabContext value={value}>
                <TabList onChange={handleChange}>
                  <Tab
                    label={translateUi('ui.sections.landing.about_us.ourmission.our_goal_042bf01a')}
                    value="1"
                  />
                  <Tab
                    label={translateUi(
                      'ui.sections.landing.about_us.ourmission.our_approach_f09011b0',
                    )}
                    value="2"
                  />
                  <Tab
                    label={translateUi(
                      'ui.sections.landing.about_us.ourmission.our_strength_a8c57bd5',
                    )}
                    value="3"
                  />
                </TabList>
                <TabPanel value="1" sx={{ px: 0 }}>
                  {tabContent}
                </TabPanel>
                <TabPanel value="2" sx={{ px: 0 }}>
                  {tabContent}
                </TabPanel>
                <TabPanel value="3" sx={{ px: 0 }}>
                  {tabContent}
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default OurMission;
