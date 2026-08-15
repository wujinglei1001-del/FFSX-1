import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import GalleryItem from './GalleryItem';
import TopButtonGroup from './TopButtonGroup';

const ActivityGallery = ({ activityGallery }) => {
  const { t: translateUi } = useTranslation();
  const [activeGallery, setActiveGallery] = useState(0);

  const handleActiveGallery = (index) =>
    setActiveGallery((current) => (current === index ? null : index));

  return (
    <Stack sx={{ gap: 2 }}>
      <Stack
        direction="row"
        sx={{
          gap: 2,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {translateUi(
            'ui.sections.time_tracker.screenshots.activitygallery.activity_gallery_92d54a7d',
          )}
        </Typography>

        <TopButtonGroup />
      </Stack>
      <Stack sx={{ gap: 2 }}>
        {activityGallery.map((galleryItem, index) => (
          <GalleryItem
            key={galleryItem.id}
            galleryItem={galleryItem}
            activeGallery={activeGallery}
            index={index}
            handleActiveGallery={handleActiveGallery}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default ActivityGallery;
