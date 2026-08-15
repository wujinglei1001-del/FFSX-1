import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { invoiceHistories } from 'data/invoice';
import dayjs from 'dayjs';

const InvoiceHistory = () => {
  const { t: translateUi } = useTranslation();
  return (
    <>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          gap: { xs: 2, md: 3 },
          alignItems: { xs: 'flex-start', md: 'center' },
          pb: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h6">
          {translateUi(
            'ui.sections.invoice.invoice_preview.invoicehistory.invoice_history_6bc8ba2b',
          )}
        </Typography>
        <Button variant="soft" color="neutral">
          {translateUi(
            'ui.sections.invoice.invoice_preview.invoicehistory.show_more_history_aabd375c',
          )}
        </Button>
      </Stack>
      <Divider />
      <List sx={{ py: 0 }}>
        {invoiceHistories.map((history) => (
          <Fragment key={history.id}>
            <ListItem
              sx={{
                pt: 2,
                pb: history.isLast ? 0 : 2,
                alignItems: { xs: 'flex-start', md: 'center' },
              }}
            >
              <ListItemAvatar sx={{ minWidth: 40 }}>
                <Avatar
                  variant="rounded"
                  src={history.image}
                  alt={history.companyName}
                  sx={{
                    width: 32,
                    height: 32,
                    border: (theme) => `1px solid ${theme.vars.palette.dividerLight}`,
                    transform: { xs: 'translateY(4px)', md: 'none' },
                    bgcolor: 'background.menu',
                    p: 0.5,
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Stack direction="row" sx={{ gap: 1, lineClamp: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {history.companyName}{' '}
                      <Typography component="span" sx={{ fontWeight: 400 }}>
                        {history.message}
                      </Typography>
                      {history.email && history.email}
                    </Typography>
                  </Stack>
                }
                secondary={
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {dayjs(history.date).format('MMMM DD, YYYY')} {translateUi('common.at')}{' '}
                    {dayjs(history.date).format('h:mm A')}
                  </Typography>
                }
                sx={{
                  display: 'flex',
                  gap: 0.5,
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: { md: 'center' },
                  justifyContent: 'space-between',
                  my: 0,
                }}
              />
            </ListItem>
            <Divider sx={{ display: history.isLast ? 'none' : 'block' }} />
          </Fragment>
        ))}
      </List>
    </>
  );
};
export default InvoiceHistory;
