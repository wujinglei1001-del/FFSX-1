import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import DashboardMenu from 'components/common/DashboardMenu';
import Deal from './Deal';

const OngoingDeals = ({ ongoingDeals }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper sx={{ px: { xs: 3, md: 5 }, py: 5, flex: 1, height: 1 }}>
      <Stack direction="row" sx={{ mb: 4, justifyContent: 'space-between' }}>
        <Typography variant="h6">
          {translateUi('ui.sections.crm.lead_details.ongoingdeals.ongoing_deals_27f40682')}
        </Typography>
        <Stack
          direction="row"
          sx={{
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            href={paths.addContact}
            startIcon={<IconifyIcon icon="material-symbols:add" />}
          >
            {translateUi('ui.sections.crm.lead_details.ongoingdeals.new_deal_adff16d2')}
          </Button>
          <DashboardMenu size="medium" />
        </Stack>
      </Stack>
      <Stack
        sx={{
          gap: 1,
        }}
      >
        {ongoingDeals.map((deal) => (
          <Deal key={deal.id} deal={deal} />
        ))}
      </Stack>
    </Paper>
  );
};

export default OngoingDeals;
