import { useState } from 'react';
import { TabContext, TabPanel } from '@mui/lab';
import { Box } from '@mui/material';
import { contentList } from 'data/content/homepage';
import i18n from 'locales/i18n';
import CategoryTabList from './CategoryTabList';
import ContentCard from './ContentCard';

const getUniqueCategories = () => [
  {
    key: 'all',
    get label() {
      return i18n.t('ui.sections.content.homepage.contentmain.all_6a720856');
    },
  },
  ...Array.from(
    new Map(contentList.map(({ key, category }) => [key, category])),
    ([key, label]) => ({ key, label }),
  ),
];

const ContentMain = () => {
  const [category, setCategory] = useState('all');
  const contentCategories = getUniqueCategories();

  const filteredItems =
    category === 'all' ? contentList : contentList.filter((content) => content.key === category);

  const handleCategory = (_, newValue) => setCategory(newValue);

  return (
    <TabContext value={category}>
      <CategoryTabList
        value={category}
        handleChange={handleCategory}
        contentCategories={contentCategories}
      />

      {contentCategories.map(({ key }) => (
        <TabPanel key={key} value={key} sx={{ p: 0 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                lg: '1fr 1fr 1fr',
                xl: '1fr 1fr 1fr 1fr',
              },
              gridAutoFlow: 'dense',
              gap: 2,
            }}
          >
            {filteredItems.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </Box>
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default ContentMain;
