import { useTranslation } from 'react-i18next';
import { InputAdornment } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import StyledTextField from 'components/styled/StyledTextField';
import PageHeader from '../common/PageHeader';
import RevealItems from '../common/RevealItems';
import SectionHeader from '../common/SectionHeader';

const FAQHeader = ({ searchQuery, onSearchChange }) => {
  const { t: translateUi } = useTranslation();
  return (
    <PageHeader>
      <SectionHeader
        title={translateUi('ffax.public.faq.title')}
        subtitle={translateUi('ffax.public.faq.subtitle')}
        sx={{ mb: 3 }}
      />

      <RevealItems delay={0.3} sx={{ maxWidth: 400, width: 1 }}>
        <StyledTextField
          placeholder={translateUi('ffax.public.faq.search')}
          autoComplete="off"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
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
