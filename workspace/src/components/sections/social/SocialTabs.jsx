import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TabContext } from '@mui/lab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import FollowingTabPanel from './tab-panels/following-panel/FollowingTabPanel';
import PhotosTabPanel from './tab-panels/photos-panel/PhotosTabPanel';
import PostsTabPanel from './tab-panels/posts-panel/PostsTabPanel';

const SocialTabs = () => {
  const { t: translateUi } = useTranslation();
  const [currentTab, setCurrentTab] = useState('posts');

  const handleChange = (_event, newValue) => setCurrentTab(newValue);

  return (
    <TabContext value={currentTab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <TabList onChange={handleChange}>
          <Tab label={translateUi('ui.sections.social.socialtabs.posts_a0ca0c31')} value="posts" />
          <Tab
            label={translateUi('ui.sections.social.socialtabs.photos_c8b2e864')}
            value="photos"
          />
          <Tab
            label={translateUi('ui.sections.social.socialtabs.following_90eeb100')}
            value="following"
          />
        </TabList>
      </Box>

      <TabPanel value="posts" sx={{ p: 0 }}>
        <PostsTabPanel />
      </TabPanel>
      <TabPanel value="photos" sx={{ p: 0 }}>
        <PhotosTabPanel />
      </TabPanel>
      <TabPanel value="following" sx={{ p: 0 }}>
        <FollowingTabPanel />
      </TabPanel>
    </TabContext>
  );
};

export default SocialTabs;
