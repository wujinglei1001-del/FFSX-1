import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import useNumberFormat from 'hooks/useNumberFormat';

const getTotalPrice = (price, vat, quantity) => {
  const subtotal = price * quantity;
  const vatAmount = subtotal * (vat / 100);

  return subtotal + vatAmount;
};

const InvoiceItemsTable = ({ invoice }) => {
  const { t: translateUi } = useTranslation();
  const { items, payment } = invoice.order;
  const { currencyFormat } = useNumberFormat();
  const subTotal = useMemo(() => {
    return items.reduce((acc, item) => {
      const subtotal = item.price.discounted * item.quantity;
      const vatAmount = subtotal * (item.vat / 100);

      return acc + subtotal + vatAmount;
    }, 0);
  }, [items]);

  return (
    <div>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
        }}
      >
        {translateUi('ui.sections.ecommerce.admin.invoice.order_items_537cae23')}
      </Typography>
      <TableContainer>
        <Table
          sx={{ minWidth: 800 }}
          stickyHeader
          aria-label={translateUi('ui.sections.ecommerce.admin.invoice.spanning_table_8063695e')}
          className="disable-edge-padding"
        >
          <TableHead>
            <TableRow
              sx={{
                '& th': {
                  whiteSpace: 'nowrap',
                },
              }}
            >
              <TableCell>#</TableCell>
              <TableCell>
                {translateUi('ui.sections.ecommerce.admin.invoice.product_name_63c0fe8e')}
              </TableCell>
              <TableCell sx={{ maxWidth: 130 }}>
                {translateUi('ui.sections.ecommerce.admin.invoice.shop_sku_3272795a')}
              </TableCell>
              <TableCell>
                {translateUi('ui.sections.ecommerce.admin.invoice.seller_sku_57f1cb11')}
              </TableCell>
              <TableCell>
                {translateUi('ui.sections.ecommerce.admin.invoice.variant_cc91b1ea')}
              </TableCell>
              <TableCell align="right">
                {translateUi('ui.sections.ecommerce.admin.invoice.sub_total_04a1404b')}
              </TableCell>
              <TableCell align="right">
                {translateUi('ui.sections.ecommerce.admin.invoice.vat_50946852')}
              </TableCell>
              <TableCell align="right">
                {translateUi('ui.sections.ecommerce.admin.invoice.total_price_a2a7c604')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell sx={{ minWidth: 280 }}>{item.name}</TableCell>
                <TableCell sx={{ wordBreak: 'break-word' }}>{item.shopSku}</TableCell>
                <TableCell>{item.sellerSku}</TableCell>
                <TableCell>
                  {item.variants.map((variant) => (
                    <Typography
                      key={variant.label}
                      variant="subtitle2"
                      sx={{
                        fontWeight: 400,
                        whiteSpace: 'nowrap',
                        textTransform: 'capitalize',
                      }}
                    >
                      {variant.label}: {variant.value}
                    </Typography>
                  ))}
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(item.price.discounted * item.quantity)}
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 130 }}>
                  {item.vat}%
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 130 }}>
                  <Box component="strong">
                    {currencyFormat(getTotalPrice(item.price.discounted, item.vat, item.quantity))}
                  </Box>
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
              <TableCell colSpan={7} align="right">
                {translateUi('ui.sections.ecommerce.admin.invoice.subtotal_97f7359e')}
              </TableCell>
              <TableCell align="right">{currencyFormat(subTotal)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={7} align="right">
                {translateUi('ui.sections.ecommerce.admin.invoice.shipping_cost_3ff0465a')}
              </TableCell>
              <TableCell align="right">{currencyFormat(payment.shippingCost)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                colSpan={7}
                align="right"
                sx={{ color: (theme) => `${theme.vars.palette.text.primary} !important` }}
              >
                {translateUi('ui.sections.ecommerce.admin.invoice.total_b25928c6')}
              </TableCell>
              <TableCell align="right">
                <Box
                  component="strong"
                  sx={{
                    color: 'text.primary',
                  }}
                >
                  {currencyFormat(subTotal + payment.shippingCost)}
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InvoiceItemsTable;
