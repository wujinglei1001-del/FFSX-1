import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Stack, Typography, inputBaseClasses } from '@mui/material';
import SearchTextField from 'components/common/SearchTextField';
import TopicsContainer from 'components/sections/content/topics';

const ContentTopics = () => {
  const { t: translateUi } = useTranslation();
  const [query, setQuery] = useState('');

  return (
    <Container
      maxWidth="md"
      sx={{
        p: { xs: 3, md: 5 },
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          gap: 3,
          alignItems: { sm: 'center' },
          justifyContent: 'space-between',
          mb: { xs: 3, sm: 5 },
        }}
      >
        <Typography variant="h4">
          {translateUi('ui.pages.apps.content.topics.topic_7e13bd17')}
        </Typography>

        <SearchTextField
          fullWidth
          size="large"
          placeholder={translateUi('ui.pages.apps.content.topics.search_bce06414')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          iconSx={{ fontSize: 16 }}
          sx={{
            maxWidth: 400,
            flexGrow: { xs: 1, sm: 0 },
            [`& .${inputBaseClasses.root}`]: { pl: 2 },
          }}
        />
      </Stack>

      <TopicsContainer searchQuery={query} />
    </Container>
  );
};

export default ContentTopics;
