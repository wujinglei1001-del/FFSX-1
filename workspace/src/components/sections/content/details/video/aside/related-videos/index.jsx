import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TabContext, TabPanel } from '@mui/lab';
import { Box, Button, Stack, Tab, Tabs } from '@mui/material';
import { videos } from 'data/content/video';
import IconifyIcon from 'components/base/IconifyIcon';
import RelatedVideo from './RelatedVideo';

const fromCreator = videos.filter((item) => item.type === 'related').slice(0, 18);

const recommendations = videos.filter((item) => item.type === 'related').slice(18);

const RelatedVideos = () => {
  const { t: translateUi } = useTranslation();
  const [value, setValue] = useState(1);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: { xs: 1, md: 280, lg: 328 } }}>
      <TabContext value={value}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab
            value={1}
            label={translateUi('ui.sections.content.details.video.from_creator_967d5bbf')}
          />
          <Tab
            value={2}
            label={translateUi('ui.sections.content.details.video.recommendations_4faa65b5')}
          />
        </Tabs>

        <TabPanel value={1} sx={{ px: 0, pb: 0 }}>
          <Stack sx={{ gap: { xs: 1, md: 2 } }}>
            {fromCreator.map((item) => (
              <RelatedVideo item={item} key={item.id} />
            ))}
          </Stack>
        </TabPanel>

        <TabPanel value={2} sx={{ px: 0, pb: 0 }}>
          <Stack sx={{ gap: { xs: 1, md: 2 } }}>
            {recommendations.map((item) => (
              <RelatedVideo item={item} key={item.id} />
            ))}
          </Stack>
        </TabPanel>
      </TabContext>

      <Stack
        direction="row"
        sx={{
          justifyContent: 'flex-end',
          mt: 3,
        }}
      >
        <Button
          size="small"
          endIcon={<IconifyIcon icon="material-symbols:chevron-right-rounded" />}
          sx={{
            alignItems: 'center',
          }}
        >
          {translateUi('ui.sections.content.details.video.view_all_efd83559')}
        </Button>
      </Stack>
    </Box>
  );
};

export default RelatedVideos;
