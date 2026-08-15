import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Chip,
  Grid,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import useNumberFormat from 'hooks/useNumberFormat';
import Image from 'components/base/Image';
import RecipientCard from '../create-invoice/invoice-details/RecipientCard';

const getTotalPrice = (subtotal, vat, discount, shippingCost) => {
  const taxableAmount = subtotal - discount;
  const taxAmount = taxableAmount * (vat / 100);
  return taxableAmount + taxAmount + shippingCost;
};
const InvoiceTable = ({ invoice }) => {
  const { t: translateUi } = useTranslation();
  const { currencyFormat } = useNumberFormat();
  const { itemDetails } = invoice;
  const subTotal = useMemo(() => {
    return itemDetails.reduce((acc, item) => {
      const itemPriceCents = Math.round((item.price || 0) * 100);
      const lineTotal = (itemPriceCents * (item.quantity || 0)) / 100;
      return acc + lineTotal;
    }, 0);
  }, [itemDetails]);
  return (
    <>
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: { md: 'flex-end' }, gap: 2, mb: 4 }}
      >
        <Image
          src={invoice.organizationImage?.file}
          alt={translateUi('ui.sections.invoice.invoice_preview.invoicetable.logo_5807dd60')}
          width={144}
          height={72}
        />
        <Box sx={{ textAlign: 'end' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            {translateUi('ui.sections.invoice.invoice_preview.invoicetable.amount_281473c4')}
            {currencyFormat(invoice.invoiceDetails.amount)}
          </Typography>
          <Chip
            variant="soft"
            color="success"
            label={
              <Typography variant="subtitle2" component="span">
                {invoice.invoiceDetails.status}
              </Typography>
            }
          />
        </Box>
      </Stack>
      <Paper
        variant="outlined"
        background={1}
        sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, outline: 0, mb: 2 }}
      >
        <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
          <Grid size={{ xs: 6 }}>
            <RecipientCard
              title={translateUi(
                'ui.sections.invoice.invoice_preview.invoicetable.invoice_form_0a2be27f',
              )}
              data={invoice.invoiceFrom}
              editButton={false}
              sxProps={{ color: 'text.secondary' }}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <RecipientCard
              title={translateUi(
                'ui.sections.invoice.invoice_preview.invoicetable.invoice_to_6aab5f7e',
              )}
              data={invoice.invoiceTo}
              editButton={false}
              sxProps={{ color: 'text.secondary' }}
            />
          </Grid>
        </Grid>
      </Paper>

      <TableContainer
        sx={{
          mb: 4,
        }}
      >
        <Table
          sx={{ minWidth: 800 }}
          stickyHeader
          aria-label={translateUi(
            'ui.sections.invoice.invoice_preview.invoicetable.spanning_table_8063695e',
          )}
        >
          <TableHead>
            <TableRow
              sx={{
                '& th': {
                  whiteSpace: 'nowrap',
                },
                '& th:first-of-type': {
                  paddingLeft: '16px',
                },
                '& th:last-of-type': {
                  paddingRight: '16px',
                },
              }}
            >
              <TableCell>
                {translateUi('ui.sections.invoice.invoice_preview.invoicetable.item_type_9ddc15fd')}
              </TableCell>
              <TableCell>
                {translateUi(
                  'ui.sections.invoice.invoice_preview.invoicetable.description_55f8ebc8',
                )}
              </TableCell>
              <TableCell align="right">
                {translateUi('ui.sections.invoice.invoice_preview.invoicetable.quantity_44f6af69')}
              </TableCell>
              <TableCell align="right">
                {translateUi(
                  'ui.sections.invoice.invoice_preview.invoicetable.unit_price_1eea68d0',
                )}
              </TableCell>
              <TableCell align="right">
                {translateUi('ui.sections.invoice.invoice_preview.invoicetable.total_b25928c6')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              '& tr td:first-of-type': {
                paddingLeft: '16px',
              },
              '& tr td:last-of-type': {
                paddingRight: '16px',
              },
            }}
          >
            {itemDetails.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{ width: 140, textTransform: 'capitalize' }}>{item.type}</TableCell>
                <TableCell sx={{ wordBreak: 'break-word', width: 376 }}>
                  {item.description}
                </TableCell>
                <TableCell align="right" sx={{ width: 104 }}>
                  {String(item.quantity).padStart(2, '0')}
                </TableCell>
                <TableCell align="right" sx={{ width: 104 }}>
                  {currencyFormat(item.price)}
                </TableCell>
                <TableCell align="right" sx={{ width: 104 }}>
                  {currencyFormat(
                    (Math.round((item.price || 0) * 100) * (item.quantity || 0)) / 100,
                  )}
                </TableCell>
              </TableRow>
            ))}

            <TableRow
              sx={{
                '& td': {
                  border: 'none',
                },
              }}
            >
              <TableCell colSpan={4} align="right">
                {translateUi('ui.sections.invoice.invoice_preview.invoicetable.subtotal_97f7359e')}
              </TableCell>
              <TableCell align="right">{currencyFormat(subTotal)}</TableCell>
            </TableRow>

            <TableRow
              sx={{
                '& td': {
                  border: 'none',
                  py: '13px !important',
                },
              }}
            >
              <TableCell align="right" colSpan={4}>
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  {translateUi(
                    'ui.sections.invoice.invoice_preview.invoicetable.discount_b524936d',
                  )}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography
                  // align="right"
                  variant="subtitle2"
                  sx={{ fontWeight: 400, color: 'error.main' }}
                >
                  -{currencyFormat(invoice.discount)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                '& td': {
                  border: 'none',
                  py: '13px !important',
                },
              }}
            >
              <TableCell align="right" colSpan={4}>
                <Typography variant="body2">
                  {translateUi('ui.sections.invoice.invoice_preview.invoicetable.tax_9be70f66')}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
                  {currencyFormat(invoice.tax)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                '& td': {
                  py: '13px !important',
                },
              }}
            >
              <TableCell align="right" colSpan={4}>
                <Typography variant="body2">
                  {translateUi(
                    'ui.sections.invoice.invoice_preview.invoicetable.shipping_cost_3ff0465a',
                  )}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
                  {currencyFormat(invoice.shippingCost)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                '& td': {
                  py: '13px !important',
                },
              }}
            >
              <TableCell align="right" colSpan={4}>
                <Typography variant="body2">
                  {translateUi(
                    'ui.sections.invoice.invoice_preview.invoicetable.total_amount_c1ed4a16',
                  )}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: 700 }}>
                  {currencyFormat(
                    getTotalPrice(
                      subTotal,
                      Number(invoice.tax),
                      Number(invoice.discount),
                      Number(invoice.shippingCost),
                    ),
                  )}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack sx={{ gap: 1, mb: 4 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {translateUi('ui.sections.invoice.invoice_preview.invoicetable.notes_70440046')}
        </Typography>
        <Typography variant="body2">{invoice.note}</Typography>
      </Stack>
      <Paper variant="elevation" elevation={0} background={1} sx={{ py: 1, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {translateUi('ui.sections.invoice.invoice_preview.invoicetable.creating_with_9b7444e1')}{' '}
          <Typography component="span" sx={{ fontWeight: 700, color: 'text.secondary' }}>
            {translateUi('ui.sections.invoice.invoice_preview.invoicetable.aurora_eeee9b76')}{' '}
          </Typography>
          | 2025 &copy;{' '}
          <Link href="https://themewagon.com/">
            {translateUi('ui.sections.invoice.invoice_preview.invoicetable.themewagon_42a442ab')}
          </Link>
        </Typography>
      </Paper>
    </>
  );
};
export default InvoiceTable;
