import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TabContext, TabList } from '@mui/lab';
import { Box, Paper, Stack, Tab, tabScrollButtonClasses, tabsClasses } from '@mui/material';
import {
  documentsData,
  jobData,
  payInfoData,
  personalData,
  teamOverviewData,
  timeOffData,
} from 'data/member/profile';
import { useNavContext } from 'layouts/main-layout/NavProvider';
import i18n from 'locales/i18n';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import { HashLinkBehavior } from 'theme/components/Link';
import ScrollSpy, { useScrollSpyContext } from 'components/scroll-spy';
import ScrollSpyContent from 'components/scroll-spy/ScrollSpyContent';
import ScrollSpyNavItem from 'components/scroll-spy/ScrollSpyNavItem';
import {
  DocumentsTabPanel,
  JobTabPanel,
  PayInfoTabPanel,
  PersonalTabPanel,
  TeamOverviewTabPanel,
  TimeOffTabPanel,
} from './tab-panels';

const tabData = [
  {
    value: 'personal',
    get label() {
      return i18n.t('ui.sections.member.profile.profile_tabs.personal_40f07323');
    },
    panel: <PersonalTabPanel data={personalData} />,
  },
  {
    value: 'job',
    get label() {
      return i18n.t('ui.sections.member.profile.profile_tabs.job_30c8cb83');
    },
    panel: <JobTabPanel data={jobData} />,
  },
  {
    value: 'team-overview',
    get label() {
      return i18n.t('ui.sections.member.profile.profile_tabs.team_overview_b1da46af');
    },
    panel: <TeamOverviewTabPanel data={teamOverviewData} />,
  },
  {
    value: 'time-off',
    get label() {
      return i18n.t('ui.sections.member.profile.profile_tabs.time_off_2c257456');
    },
    panel: <TimeOffTabPanel data={timeOffData} />,
  },
  {
    value: 'pay-info',
    get label() {
      return i18n.t('ui.sections.member.profile.profile_tabs.pay_info_1aad5245');
    },
    panel: <PayInfoTabPanel data={payInfoData} />,
  },
  {
    value: 'documents',
    get label() {
      return i18n.t('ui.sections.member.profile.profile_tabs.documents_687c8286');
    },
    panel: <DocumentsTabPanel data={documentsData} />,
  },
];
const ProfileTabsInner = () => {
  const { t: translateUi } = useTranslation();
  const { down } = useBreakpoints();
  const isDownSm = down('sm');
  const tabsRef = useRef(null);
  const { topbarHeight } = useNavContext();
  const { activeElemId } = useScrollSpyContext();
  const [activeTab, setActiveTab] = useState(() => activeElemId || 'personal');
  const handleTabChange = (_event, newValue) => {
    setActiveTab(newValue);
  };
  useEffect(() => {
    if (
      activeElemId &&
      activeTab !== activeElemId &&
      tabData.some((item) => item.value === activeElemId)
    ) {
      setActiveTab(activeElemId);
    }
  }, [activeElemId, activeTab]);
  return (
    <Paper sx={{ outline: 0, bgcolor: 'transparent', boxShadow: 'none' }}>
      <TabContext value={activeTab}>
        <Box
          ref={tabsRef}
          sx={{
            position: 'sticky',
            zIndex: 10,
            mb: 3,
            top: topbarHeight,
            bgcolor: 'background.paper',
          }}
        >
          <ScrollSpyNavItem>
            <TabList
              variant={isDownSm ? 'scrollable' : 'standard'}
              scrollButtons
              allowScrollButtonsMobile
              onChange={handleTabChange}
              aria-label={translateUi(
                'ui.sections.member.profile.profile_tabs.profile_tabs_a52e4b3f',
              )}
              centered={isDownSm ? false : true}
              sx={{
                py: 1,
                [`& .${tabsClasses.list}`]: { gap: 0, justifyContent: 'flex-start' },
                [`& .${tabScrollButtonClasses.disabled}`]: { opacity: '0.3 !important' },
              }}
            >
              {tabData.map(({ value, label }) => (
                <Tab
                  LinkComponent={HashLinkBehavior}
                  href={`#${value}`}
                  key={value}
                  value={value}
                  label={label}
                />
              ))}
            </TabList>
          </ScrollSpyNavItem>
        </Box>
      </TabContext>

      <Stack sx={{ gap: 5, mb: 7 }}>
        {tabData.map(({ value, panel }) => (
          <ScrollSpyContent
            key={value}
            id={value}
            sx={(theme) => ({
              scrollMarginTop: theme.mixins.topOffset(topbarHeight, 75, true),
            })}
          >
            {panel}
          </ScrollSpyContent>
        ))}
      </Stack>
    </Paper>
  );
};
const ProfileTabsSection = () => (
  <ScrollSpy offset={500}>
    <ProfileTabsInner />
  </ScrollSpy>
);
export default ProfileTabsSection;
