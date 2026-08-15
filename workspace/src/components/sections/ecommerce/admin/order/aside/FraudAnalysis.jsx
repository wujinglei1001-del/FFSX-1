import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { useOrderDetails } from '../OrderDetailsProvider';

const FraudAnalysis = ({ sx }) => {
  const { t: translateUi } = useTranslation();
  const { order } = useOrderDetails();
  const { customer } = order;

  return (
    <Box
      sx={{
        p: { xs: 3, md: 4, lg: 5 },
        ...sx,
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
          }}
        >
          {translateUi('ui.sections.ecommerce.admin.order.fraud_analysis_de767619')}
        </Typography>

        <Button variant="text" size="small" sx={{ flexShrink: 0, minWidth: 0 }}>
          {translateUi('ui.sections.ecommerce.admin.order.view_69bd4ef9')}
        </Button>
      </Stack>
      <List dense disablePadding>
        <ListItem disableGutters sx={{ gap: 2 }}>
          <ListItemIcon sx={{ minWidth: 0 }}>
            <IconifyIcon icon="material-symbols:circle" fontSize={8} color="divider" />
          </ListItemIcon>

          <ListItemText
            slotProps={{ primary: { color: 'text.secondary' } }}
            primary={
              customer?.fraudAnalysis?.cvvInfo ?? 'Card verification value (CVV) isn’t available'
            }
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default FraudAnalysis;
