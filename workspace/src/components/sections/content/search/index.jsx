import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useSearchParams } from 'react-router';
import { TabContext, TabPanel } from '@mui/lab';
import {
  Box,
  Chip,
  FormControl,
  Grid,
  Link,
  List,
  MenuItem,
  Pagination,
  Stack,
  Tab,
  Tabs,
  Typography,
  tabsClasses,
} from '@mui/material';
import { creators, searchItems, topics } from 'data/content/search';
import i18n from 'locales/i18n';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import StyledTextField from 'components/styled/StyledTextField';
import BlogCard from './BlogCard';
import Creator from './Creator';
import PodcastCard from './PodcastCard';
import VideoCard from './VideoCard';

const sortByOptions = [
  {
    value: 'recommended',
    get label() {
      return i18n.t('ui.sections.content.search.sort_by_recommended_123626ff');
    },
  },
  {
    value: 'lowToHight',
    get label() {
      return i18n.t('ui.sections.content.search.sort_by_popularity_4e6c37ae');
    },
  },
];

const formatSearchKey = (str) =>
  str ? str.replace(/-/g, ' ').replace(/^./, (s) => s.toUpperCase()) : 'Animal';

const SearchContainer = () => {
  const { t: translateUi } = useTranslation();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('recommended');
  const [value, setValue] = useState('blogs');
  const { only } = useBreakpoints();

  const searchKey = formatSearchKey(searchParams.get('key') || '');
  const onlyXs = only('xs');

  const contents = useMemo(() => searchItems.filter((item) => item.type === value), [value]);

  const handleTabChange = (_, newValue) => setValue(newValue);

  const renderContent = () => {
    if (value === 'topics')
      return (
        <Stack
          direction="row"
          sx={{
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          {topics.map(({ id, label }) => (
            <Chip
              key={id}
              component={Link}
              clickable
              href={`${pathname}?key=${encodeURIComponent(label)}`}
              label={label}
              size="large"
              sx={{
                cursor: 'pointer',
                borderRadius: 25,
                px: 1.7,
                '&.MuiChip-sizeLarge': { height: 42 },
                '& .MuiChip-label': { fontSize: 16 },
              }}
            />
          ))}
        </Stack>
      );

    if (value === 'creators')
      return (
        <List disablePadding>
          {creators.map((creator) => (
            <Creator key={creator.id} item={creator} />
          ))}
        </List>
      );

    if (value === 'podcasts')
      return (
        <Stack
          sx={{
            gap: 1,
          }}
        >
          {contents.map((content) => (
            <PodcastCard key={content.id} item={content} />
          ))}
        </Stack>
      );

    return (
      <Grid container spacing={1}>
        {contents.map((content) => (
          <Grid key={content.id} size={{ xs: 12 }}>
            {content.type === 'blogs' && <BlogCard item={content} sxProps={{ display: 'flex' }} />}
            {content.type === 'videos' && <VideoCard item={content} />}
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          alignItems: 'center',
          mb: { xs: 3, sm: 5 },
        }}
      >
        <Grid size={{ xs: 12, sm: 6 }}>
          <Typography variant="h4">
            {translateUi('ui.sections.content.search.searched_for_ad982376')}{' '}
            <Box
              component="span"
              sx={{
                fontWeight: 500,
              }}
            >
              ‘{searchKey}’
            </Box>
          </Typography>
        </Grid>

        <Grid
          size="auto"
          sx={{
            ml: 'auto',
            flexGrow: 1,
          }}
        >
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              gap: 2,
              justifyContent: { sm: 'flex-end' },
            }}
          >
            <Typography
              variant="body2"
              sx={{ whiteSpace: 'nowrap', display: { xs: 'none', md: 'block' } }}
            >
              {searchItems.length}
              {translateUi('ui.sections.content.search.results_cdf7e925')}
            </Typography>

            <FormControl sx={{ maxWidth: { xs: 300 }, width: 1 }}>
              <StyledTextField select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                {sortByOptions.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </StyledTextField>
            </FormControl>
          </Stack>
        </Grid>
      </Grid>
      <TabContext value={value}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          variant={onlyXs ? 'scrollable' : undefined}
          scrollButtons
          allowScrollButtonsMobile
          sx={{
            mb: { xs: 2, md: 4 },
            [`& .${tabsClasses.scrollButtons}.Mui-disabled`]: { opacity: 0.3 },
          }}
        >
          {['blogs', 'videos', 'podcasts', 'topics', 'creators'].map((tab) => (
            <Tab key={tab} value={tab} label={tab.charAt(0).toUpperCase() + tab.slice(1)} />
          ))}
        </Tabs>

        {['blogs', 'videos', 'podcasts', 'topics', 'creators'].map((tab) => (
          <TabPanel key={tab} value={tab} sx={{ p: 0 }}>
            {renderContent()}
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                mt: 4,
              }}
            >
              <Pagination
                count={15}
                variant="solid"
                color="primary"
                size="small"
                showFirstButton
                showLastButton
              />
            </Stack>
          </TabPanel>
        ))}
      </TabContext>
    </>
  );
};

export default SearchContainer;
