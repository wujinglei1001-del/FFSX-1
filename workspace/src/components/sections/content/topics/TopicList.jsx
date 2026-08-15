import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Stack } from '@mui/material';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';

const TopicList = ({ item }) => {
  const { t: translateUi } = useTranslation();
  const { up } = useBreakpoints();
  const [topicsLength, setTopicsLength] = useState(10);
  const [showMore, setShowMore] = useState(false);
  const upSm = up('sm');

  const handleSeeMoreClick = () => {
    setShowMore((prev) => !prev);
    setTopicsLength(showMore ? 10 : item.length);
  };

  return (
    <>
      <Stack sx={{ gap: 1, mb: 2, alignItems: 'flex-start' }}>
        {item.slice(0, topicsLength).map((topicItem) => (
          <Button
            color="neutral"
            key={topicItem.id}
            href={`${paths.contentSearch}?key=${topicItem.key}`}
            size={upSm ? 'large' : 'medium'}
            sx={{
              justifyContent: 'flex-start',
              whiteSpace: 'nowrap',
              py: '15px',
            }}
          >
            {topicItem.label}
          </Button>
        ))}

        {item.length > 10 && (
          <Button
            size="small"
            onClick={handleSeeMoreClick}
            endIcon={
              <IconifyIcon
                flipOnRTL
                icon="material-symbols:chevron-right-rounded"
                sx={{ fontSize: '8px' }}
              />
            }
            sx={{
              alignItems: 'center',
              minWidth: 0,
            }}
          >
            {translateUi('ui.sections.content.topics.topiclist.see_ce3df4d8')}
            {!showMore ? 'More' : 'Less'}
          </Button>
        )}
      </Stack>
    </>
  );
};

export default TopicList;
