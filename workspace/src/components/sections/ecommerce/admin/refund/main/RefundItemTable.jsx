import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import useNumberFormat from 'hooks/useNumberFormat';
import NumberTextField from 'components/base/NumberTextField';
import { useOrderDetails } from '../../order/OrderDetailsProvider';

const createData = (name, orderAmount, priorRefund, maxRefund) => {
  return { name, orderAmount, priorRefund, maxRefund };
};

const RefundItemTable = ({ product, index }) => {
  const { t: translateUi } = useTranslation();
  const { order } = useOrderDetails();
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();
  const { currencyFormat } = useNumberFormat();

  const refunds = useWatch({
    control,
    name: 'refunds',
  });

  const totalRefund = useMemo(
    () =>
      refunds?.[index]
        ? Number(refunds[index].product + refunds[index].shipping + refunds[index].concession)
        : 0,
    [refunds],
  );

  const tableRows = useMemo(() => {
    return [
      createData(
        'product',
        product.price.discounted,
        product.priorRefunds?.product || 0,
        product.price.discounted,
      ),
      createData(
        'shipping',
        order?.payment.shippingCost || 0,
        product.priorRefunds?.shipping || 0,
        order?.payment.shippingCost || 0,
      ),
      createData(
        'concession',
        0,
        product.priorRefunds?.concession || 0,
        product.price.discounted / 2,
      ),
    ];
  }, []);

  return (
    <Paper
      background={1}
      sx={{
        borderRadius: 6,
        outline: 'none',
        p: 3,
      }}
    >
      <TableContainer>
        <Table
          sx={{ minWidth: 720 }}
          aria-label={translateUi('ui.sections.ecommerce.admin.refund.refund_table_5093fed2')}
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
              <TableCell />
              <TableCell>
                {translateUi('ui.sections.ecommerce.admin.refund.order_amount_da498614')}
              </TableCell>
              <TableCell>
                {translateUi('ui.sections.ecommerce.admin.refund.prior_refund_89a09c0a')}
              </TableCell>
              <TableCell>
                {translateUi('ui.sections.ecommerce.admin.refund.amount_to_refund_32408d68')}
              </TableCell>
              <TableCell align="right">
                {translateUi('ui.sections.ecommerce.admin.refund.refund_full_amount_8b09a1a5')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row) => (
              <TableRow key={row.name}>
                <TableCell sx={{ minWidth: 200, textTransform: 'capitalize' }}>
                  {row.name}
                </TableCell>
                <TableCell>{currencyFormat(row.orderAmount)}</TableCell>
                <TableCell>{currencyFormat(row.priorRefund)}</TableCell>
                <TableCell sx={{ minWidth: 160 }}>
                  <NumberTextField
                    variant="custom"
                    error={!!errors.refunds?.[index]?.[row.name]}
                    {...register(`refunds.${index}.${row.name}`, {
                      value: 0,
                      setValueAs: (value) => Number(value),
                    })}
                    slotProps={{
                      input: {
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      },
                    }}
                  />
                </TableCell>
                <TableCell align="right" sx={{ minWidth: 160 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 400,
                    }}
                  >
                    {translateUi('ui.sections.ecommerce.admin.refund.max_a95e85ae')}
                    {currencyFormat(row.maxRefund)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ '& th, & td': { border: 0 } }}>
              <TableCell>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {translateUi('ui.sections.ecommerce.admin.refund.total_b25928c6')}
                </Typography>
              </TableCell>
              <TableCell>
                {currencyFormat(tableRows.reduce((acc, row) => acc + row.orderAmount, 0))}
              </TableCell>
              <TableCell>
                {currencyFormat(tableRows.reduce((acc, row) => acc + row.priorRefund, 0))}
              </TableCell>
              <TableCell>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  {currencyFormat(totalRefund)}
                </Typography>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RefundItemTable;
