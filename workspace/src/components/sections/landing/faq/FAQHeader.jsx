import { useTranslation } from 'react-i18next';
import { InputAdornment } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import StyledTextField from 'components/styled/StyledTextField';
import PageHeader from '../common/PageHeader';
import RevealItems from '../common/RevealItems';
import SectionHeader from '../common/SectionHeader';

const FAQHeader = () => {
  const { t: translateUi } = useTranslation();
  return (
    <PageHeader>
      <SectionHeader
        title="FAQ"
        subtitle={translateUi('ui.sections.landing.faq.faqheader.how_can_we_help_d9961547')}
        sx={{ mb: 3 }}
      />

      <RevealItems delay={0.3} sx={{ maxWidth: 400, width: 1 }}>
        <StyledTextField
          placeholder={translateUi('ui.sections.landing.faq.faqheader.search_by_keyword_7fb0b859')}
          autoComplete="off"
          sx={{ width: 1 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <IconifyIcon icon="material-symbols:search-rounded" fontSize={20} />
                </InputAdornment>
              ),
            },
          }}
        />
      </RevealItems>
    </PageHeader>
  );
};

export default FAQHeader;
