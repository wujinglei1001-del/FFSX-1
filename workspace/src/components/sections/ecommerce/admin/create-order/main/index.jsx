import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import { orderDetailsList } from 'data/e-commerce/orders';
import SearchTextField from 'components/common/SearchTextField';
import CreateOrderItem from './CreateOrderItem';
import CreateOrderPaymentSummary from './CreateOrderPaymentSummary';

const CreateOrderContainer = () => {
  const { t: translateUi } = useTranslation();
  const [createOrderItems, setCreateOrderItems] = useState(orderDetailsList[0].items);

  return (
    <Paper sx={{ height: 1, flex: 1, p: { xs: 3, md: 5 } }}>
      <Container maxWidth="sm" sx={{ px: { xs: 0 } }}>
        <Stack sx={{ gap: 5 }}>
          <div>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              {translateUi(
                'ui.sections.ecommerce.admin.create_order.search_to_add_an_item_cf69c0f4',
              )}
            </Typography>
            <SearchTextField
              fullWidth
              variant="filled"
              label={translateUi(
                'ui.sections.ecommerce.admin.create_order.search_for_an_item_bf769ef7',
              )}
            />
          </div>

          <Stack sx={{ gap: 3 }} divider={<Divider flexItem orientation="horizontal" />}>
            {createOrderItems.map((item) => (
              <CreateOrderItem key={item.id} orderItem={item} setOrderItems={setCreateOrderItems} />
            ))}
          </Stack>

          <CreateOrderPaymentSummary items={createOrderItems} />

          <Button variant="contained" sx={{ alignSelf: 'flex-end' }}>
            {translateUi('ui.sections.ecommerce.admin.create_order.email_invoice_ac811cb2')}
          </Button>
        </Stack>
      </Container>
    </Paper>
  );
};

export default CreateOrderContainer;
