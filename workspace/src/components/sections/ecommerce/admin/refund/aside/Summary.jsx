import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, Button, Stack, TextField, Typography, inputBaseClasses } from '@mui/material';
import useNumberFormat from 'hooks/useNumberFormat';
import { useOrderDetails } from '../../order/OrderDetailsProvider';

const Summary = ({ sx }) => {
  const { t: translateUi } = useTranslation();
  const { order } = useOrderDetails();
  const { currencyFormat } = useNumberFormat();
  const { control, register, handleSubmit } = useFormContext();
  const refunds = useWatch({
    control,
    name: 'refunds',
  });
  const amountToRefund = useMemo(() => {
    return Number(
      refunds?.reduce(
        (total, current) => total + current.product + current.shipping + current.concession,
        0,
      ),
    );
  }, [refunds]);
  const priorRefundAmount = useMemo(() => {
    return Number(
      order?.items.reduce(
        (total, current) =>
          total +
          Number(current.priorRefunds?.product) +
          Number(current.priorRefunds?.shipping) +
          Number(current.priorRefunds?.concession),
        0,
      ),
    );
  }, [order?.items]);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Box
      sx={{
        p: { xs: 3, md: 5 },
        ...sx,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 700,
          mb: 2,
        }}
      >
        {translateUi('ui.sections.ecommerce.admin.refund.summary_12b71c3e')}
      </Typography>
      <Box
        sx={{
          mb: 3,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            color: 'text.secondary',
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>{translateUi('ui.sections.ecommerce.admin.refund.amount_to_refund_32408d68')}</span>
          {currencyFormat(amountToRefund)}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 1,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>{translateUi('ui.sections.ecommerce.admin.refund.prior_refund_89a09c0a')}</span>
          {currencyFormat(priorRefundAmount)}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 1,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>
            {translateUi('ui.sections.ecommerce.admin.refund.total_refund_amount_6888bb93')}
          </span>
          {currencyFormat(amountToRefund + priorRefundAmount)}
        </Typography>
      </Box>
      <TextField
        fullWidth
        id="noteToTheBuyer"
        type="text"
        label={translateUi('ui.sections.ecommerce.admin.refund.note_to_the_buyer_e5eb8909')}
        variant="filled"
        multiline
        rows={3}
        sx={{ mb: 2, [`& .${inputBaseClasses.input}`]: { pt: 0 } }}
        {...register('note')}
      />
      <Stack direction="row" sx={{ gap: 1 }}>
        <Button variant="soft" color="neutral" sx={{ minWidth: 80 }}>
          {translateUi('ui.sections.ecommerce.admin.refund.cancel_77dfd213')}
        </Button>
        <Button variant="contained" color="primary" fullWidth onClick={handleSubmit(onSubmit)}>
          {translateUi('ui.sections.ecommerce.admin.refund.refund_e17c8ad0')}
        </Button>
      </Stack>
    </Box>
  );
};
export default Summary;
