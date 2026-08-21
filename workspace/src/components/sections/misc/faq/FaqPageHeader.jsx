import { useTranslation } from 'react-i18next';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import paths from 'routes/paths';
import SearchTextField from 'components/common/SearchTextField';
import PageBreadcrumb from 'components/sections/common/PageBreadcrumb';

const FaqPageHeader = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper sx={{ px: { xs: 3, md: 5 }, py: 5 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          gap: 2,
          alignItems: { sm: 'flex-end' },
          justifyContent: 'space-between',
        }}
      >
        <div>
          <PageBreadcrumb
            items={[
              {
                label: translateUi('ui.sections.misc.faq.faqpageheader.misc_0a893ece'),
                url: paths.workbench,
              },
              { label: 'Faq', active: true },
            ]}
            sx={{ mb: 2 }}
          />
          <Typography variant="h4">Faq</Typography>
        </div>

        <SearchTextField
          placeholder={translateUi('ui.sections.misc.faq.faqpageheader.search_by_keyword_7fb0b859')}
          sx={{ maxWidth: { sm: 400 }, width: 1 }}
          iconSx={{ color: 'text.secondary' }}
        />
      </Stack>
    </Paper>
  );
};

export default FaqPageHeader;
