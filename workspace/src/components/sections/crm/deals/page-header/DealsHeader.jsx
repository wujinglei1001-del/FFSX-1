import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import i18n from 'locales/i18n';
import { useDealsContext } from 'providers/DealsProvider';
import { SET_CREATE_DEAL_DIALOG } from 'reducers/DealsReducer';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import SearchTextField from 'components/common/SearchTextField';
import PageBreadcrumb from 'components/sections/common/PageBreadcrumb';

const breadcrumbItems = [
  {
    get label() {
      return i18n.t('ui.sections.crm.deals.page_header.home_70f8bb9a');
    },
    url: '/',
  },
  {
    label: 'CRM',
    url: paths.crm,
  },
  {
    get label() {
      return i18n.t('ui.sections.crm.deals.page_header.deals_2c874671');
    },
    url: '#!',
    active: true,
  },
];

const DealsHeader = () => {
  const { t: translateUi } = useTranslation();
  const { dealsDispatch } = useDealsContext();
  const handleSearch = (e) => {
    console.log(e.target.value);
  };

  return (
    <Box sx={{ px: { xs: 3, md: 5 }, py: 2 }}>
      <PageBreadcrumb items={breadcrumbItems} sx={{ mb: 2 }} />
      <Stack
        direction="row"
        sx={{ gap: 1, alignItems: 'center', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}
      >
        <Typography variant="h4">
          {translateUi('ui.sections.crm.deals.page_header.deals_2c874671')}
        </Typography>
        <SearchTextField
          placeholder={translateUi('ui.sections.crm.deals.page_header.search_tasks_344b6c0a')}
          onChange={handleSearch}
          fullWidth
          sx={{
            ml: 'auto',
            order: { xs: 1, sm: 0 },
            maxWidth: { xs: 1, sm: 300 },
            minWidth: 150,
          }}
          iconSx={{ color: 'text.secondary' }}
        />
        <Button variant="soft" color="neutral" sx={{ flexShrink: 0, ml: { xs: 'auto', sm: 0 } }}>
          {translateUi('ui.sections.crm.deals.page_header.import_d6fbc9d2')}
        </Button>
        <Button
          size="medium"
          variant="contained"
          startIcon={
            <IconifyIcon
              icon="material-symbols:add-2-rounded"
              sx={{ fontSize: '18px !important' }}
            />
          }
          onClick={() => dealsDispatch({ type: SET_CREATE_DEAL_DIALOG, payload: { isOpen: true } })}
          sx={{ flexShrink: 0 }}
        >
          {translateUi('ui.sections.crm.deals.page_header.new_deal_adff16d2')}
        </Button>
      </Stack>
    </Box>
  );
};

export default DealsHeader;
