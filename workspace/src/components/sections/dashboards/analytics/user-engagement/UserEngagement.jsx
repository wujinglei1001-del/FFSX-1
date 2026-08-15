import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, ButtonBase, Paper, Stack, Tab, Tabs, Typography, tabsClasses } from '@mui/material';
import { userEngagementTabs } from 'data/analytics/dashboard';
import useToggleChartLegends from 'hooks/useToggleChartLegends';
import UserEngagementChart from './UserEngagementChart';

const LegendButton = ({ active, onClick, icon, label }) => (
  <ButtonBase
    disableRipple
    sx={{
      display: 'flex',
      gap: 1,
      alignItems: 'center',
      opacity: active ? 0.5 : 1,
    }}
    onClick={onClick}
  >
    {icon}
    <Typography
      variant="subtitle2"
      sx={{
        fontWeight: 700,
        color: 'text.secondary',
      }}
    >
      {label}
    </Typography>
  </ButtonBase>
);

const UserEngagement = ({ data }) => {
  const { t: translateUi } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);
  const chartRef = useRef(null);
  const { legendState, handleLegendToggle } = useToggleChartLegends(chartRef);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const currentTab = userEngagementTabs[tabIndex];
  const currentTabData = data[currentTab.key];

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', height: 1, p: { xs: 3, md: 5 } }}>
      <Box sx={{ boxShadow: (theme) => `inset 0 -1px 0 0 ${theme.vars.palette.divider}` }}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            [`& .${tabsClasses.list}`]: { gap: 5 },
          }}
        >
          {userEngagementTabs.map(({ key, title, value }, index) => (
            <Tab
              key={key}
              sx={{
                alignItems: 'flex-start',
                px: 0,
                py: 1.5,
              }}
              label={
                <>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      mb: 0.5,
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="h5"
                    color={tabIndex === index ? 'text.primary' : 'text.secondary'}
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    {value}
                  </Typography>
                </>
              }
            />
          ))}
        </Tabs>
      </Box>
      <Stack
        direction="row"
        sx={{
          gap: 5,
          alignItems: 'center',
          ml: { md: 'auto' },
          my: 4,
        }}
      >
        <LegendButton
          active={legendState['Actual value']}
          onClick={() => handleLegendToggle('Actual value')}
          icon={
            <Box
              sx={{
                width: 18,
                height: 4,
                bgcolor: 'chBlue.300',
                borderRadius: 2,
                flexShrink: 0,
              }}
            />
          }
          label={translateUi(
            'ui.sections.dashboards.analytics.user_engagement.actual_value_27ead4b7',
          )}
        />
        <LegendButton
          active={legendState['Projected value']}
          onClick={() => handleLegendToggle('Projected value')}
          icon={
            <Stack
              direction="row"
              sx={{
                gap: 0.25,
              }}
            >
              {[0, 1].map((index) => (
                <Box
                  key={index}
                  sx={{
                    width: 10,
                    height: 4,
                    bgcolor: 'chGreen.200',
                    borderRadius: 1,
                    flexShrink: 0,
                  }}
                />
              ))}
            </Stack>
          }
          label={translateUi(
            'ui.sections.dashboards.analytics.user_engagement.projected_value_de4cacf5',
          )}
        />
      </Stack>
      <UserEngagementChart
        ref={chartRef}
        data={currentTabData}
        activeTab={currentTab.key}
        sx={{
          minHeight: '200px',
          height: {
            xs: '220px !important',
            sm: '296px !important',
            xl: '285px !important',
          },
          width: 1,
        }}
      />
    </Paper>
  );
};

export default UserEngagement;
