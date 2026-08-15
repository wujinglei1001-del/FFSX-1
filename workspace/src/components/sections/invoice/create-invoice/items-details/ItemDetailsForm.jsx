import { useMemo } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Divider,
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
import IconifyIcon from 'components/base/IconifyIcon';
import SortableDnd from 'components/base/SortableDnd';
import TableRowForm from './TableRowForm';

const getTotalPrice = (subtotal, vat, discount, shippingCost) => {
  const taxableAmount = subtotal - discount;
  const taxAmount = taxableAmount * (vat / 100);
  return taxableAmount + taxAmount + shippingCost;
};
const ItemDetailsTableForm = () => {
  const { t: translateUi } = useTranslation();
  const { currencyFormat } = useNumberFormat();
  const { control, watch } = useFormContext();
  const { fields, move, remove, append } = useFieldArray({
    control,
    name: 'itemDetails',
  });
  const itemDetails = useWatch({
    control,
    name: 'itemDetails',
  });
  const adjustments = watch('adjustment');
  const orderCharges = watch('orderCharges');
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((column) => column.id === active.id);
      const newIndex = fields.findIndex((column) => column.id === over?.id);
      move(oldIndex, newIndex);
    }
  };
  const subTotal = useMemo(
    () =>
      itemDetails.reduce((acc, item) => {
        const itemPriceCents = Math.round((item.price || 0) * 100);
        const itemTotal = (itemPriceCents * (item.quantity || 0)) / 100;
        return acc + itemTotal;
      }, 0),
    [itemDetails],
  );
  return (
    <Stack>
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>
        {translateUi('ui.sections.invoice.create_invoice.items_details.item_details_12e853a0')}
      </Typography>
      <SortableDnd items={fields} onDragEnd={handleDragEnd}>
        <TableContainer sx={{ mb: 2 }}>
          <Table
            sx={{ minWidth: 700 }}
            aria-label={translateUi(
              'ui.sections.invoice.create_invoice.items_details.item_details_table_23e6dd39',
            )}
          >
            <TableHead>
              <TableRow
                sx={{
                  '& th': {
                    whiteSpace: 'nowrap',
                  },
                  '& th:first-of-type': {
                    paddingLeft: '4px',
                  },
                }}
              >
                <TableCell></TableCell>
                <TableCell>
                  {translateUi(
                    'ui.sections.invoice.create_invoice.items_details.item_type_9ddc15fd',
                  )}
                </TableCell>
                <TableCell>
                  {translateUi(
                    'ui.sections.invoice.create_invoice.items_details.description_55f8ebc8',
                  )}
                </TableCell>
                <TableCell align="right">
                  {translateUi(
                    'ui.sections.invoice.create_invoice.items_details.quantity_44f6af69',
                  )}
                </TableCell>
                <TableCell align="right">
                  {translateUi(
                    'ui.sections.invoice.create_invoice.items_details.unit_price_3c6c777f',
                  )}
                </TableCell>
                <TableCell align="center">
                  {translateUi('ui.sections.invoice.create_invoice.items_details.total_b25928c6')}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                '& tr td': {
                  padding: '20px 16px 20px 0px',
                },
                '& tr td:first-of-type': {
                  paddingLeft: 0,
                },
                '& tr td:last-of-type': {
                  paddingRight: 0,
                },
              }}
            >
              {fields.map((field, index) => (
                <TableRowForm key={field.id} index={index} field={fields[index]} remove={remove} />
              ))}
              <TableRow>
                <TableCell colSpan={7} sx={{ py: '9px !important' }}>
                  <Button
                    variant="text"
                    color="primary"
                    startIcon={<IconifyIcon icon={'material-symbols:add-circle-rounded'} />}
                    onClick={() => {
                      append({
                        type: 'service',
                        description: '',
                        quantity: 0,
                        price: 0,
                      });
                    }}
                    sx={{
                      paddingLeft: '5px',
                    }}
                  >
                    <Typography variant="button">
                      {translateUi(
                        'ui.sections.invoice.create_invoice.items_details.add_item_4dba3be5',
                      )}
                    </Typography>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction="row" sx={{ py: '13px', textAlign: 'end', alignItems: 'center' }}>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              flexGrow: 1,
            }}
          >
            {translateUi('ui.sections.invoice.create_invoice.items_details.subtotal_97f7359e')}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              width: 130,
            }}
          >
            {currencyFormat(subTotal)}
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ py: '13px', textAlign: 'end', alignItems: 'center' }}>
          <Typography
            variant="body2"
            sx={{
              color: 'error.main',
              flexGrow: 1,
            }}
          >
            {translateUi('ui.sections.invoice.create_invoice.items_details.discount_b524936d')}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'error.main',
              fontWeight: 400,
              width: 130,
            }}
          >
            -{currencyFormat((adjustments.discount && adjustments.discount) || 0)}
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ py: '13px', textAlign: 'end', alignItems: 'center' }}>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              flexGrow: 1,
            }}
          >
            {translateUi('ui.sections.invoice.create_invoice.items_details.tax_9be70f66')}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              width: 130,
            }}
          >
            {currencyFormat((adjustments.tax && adjustments.tax) || 0)}
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ py: '13px', textAlign: 'end', alignItems: 'center' }}>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              flexGrow: 1,
            }}
          >
            {translateUi('ui.sections.invoice.create_invoice.items_details.shipping_cost_3ff0465a')}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              width: 130,
            }}
          >
            {currencyFormat((orderCharges.shippingCost && orderCharges.shippingCost) || 0)}
          </Typography>
        </Stack>
        <Divider />
        <Stack direction="row" sx={{ py: '17px', textAlign: 'end', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            {translateUi('ui.sections.invoice.create_invoice.items_details.total_b25928c6')}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, width: 130 }}>
            {currencyFormat(
              getTotalPrice(
                subTotal,
                Number(adjustments.tax),
                Number(adjustments.discount),
                Number(orderCharges.shippingCost),
              ),
            )}
          </Typography>
        </Stack>
        <Divider />
      </SortableDnd>
    </Stack>
  );
};
export default ItemDetailsTableForm;
