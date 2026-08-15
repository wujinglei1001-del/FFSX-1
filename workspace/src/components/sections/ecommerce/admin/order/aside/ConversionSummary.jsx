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

const ConversionSummary = ({ sx }) => {
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
          {translateUi('ui.sections.ecommerce.admin.order.conversion_summary_6abc6cf2')}
        </Typography>

        <Button variant="text" size="small" sx={{ flexShrink: 0, minWidth: 0 }}>
          {translateUi('ui.sections.ecommerce.admin.order.details_dc3decbb')}
        </Button>
      </Stack>
      <List dense disablePadding sx={{ mb: 2 }}>
        {customer?.conversations?.map((conversation) => (
          <ListItem key={conversation.id} disableGutters sx={{ gap: 2, color: 'text.secondary' }}>
            <ListItemIcon>
              <IconifyIcon icon={conversation.icon} fontSize={20} />
            </ListItemIcon>
            <ListItemText primary={conversation.message} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ConversionSummary;
