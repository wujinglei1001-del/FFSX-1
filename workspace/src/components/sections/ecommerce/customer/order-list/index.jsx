import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, MenuItem, Stack, Tab, Tabs, tabClasses } from '@mui/material';
import StyledTextField from 'components/styled/StyledTextField';
import OrderedItemList from './OrderedItemList';

const OrderListContainer = ({ orders }) => {
  const { t: translateUi } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);
  const [sortBy, setSortBy] = useState('last6Months');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const filterProducts = (status) => {
    return orders.flatMap((order) =>
      order.items
        .filter((item) => item.status === status)
        .map((item) => ({ ...item, orderId: order.id })),
    );
  };

  return (
    <div>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          justifyContent: 'space-between',
          gap: 3,
          mb: 3,
        }}
      >
        <FormControl sx={{ maxWidth: 300, width: 1, order: { sm: 1 } }}>
          <StyledTextField
            select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <MenuItem value="last6Months">
              {translateUi('ui.sections.ecommerce.customer.order_list.last_6_months_14d5436c')}
            </MenuItem>
            <MenuItem value="last3Months">
              {translateUi('ui.sections.ecommerce.customer.order_list.last_3_months_9f796848')}
            </MenuItem>
            <MenuItem value="lastMonth">
              {translateUi('ui.sections.ecommerce.customer.order_list.last_month_9cce45bf')}
            </MenuItem>
            <MenuItem value="lastWeek">
              {translateUi('ui.sections.ecommerce.customer.order_list.last_week_76c1ed93')}
            </MenuItem>
          </StyledTextField>
        </FormControl>

        <Tabs
          variant="scrollable"
          value={selectedTab}
          onChange={handleTabChange}
          aria-label={translateUi('common.accessibility.order_list_tab')}
          sx={{
            flexShrink: 0,
            [`& .${tabClasses.root}`]: {
              textTransform: 'none',
            },
          }}
        >
          <Tab label={translateUi('ui.sections.ecommerce.customer.order_list.all_6a720856')} />
          <Tab label={translateUi('ui.sections.ecommerce.customer.order_list.to_pay_58d1265e')} />
          <Tab label={translateUi('ui.sections.ecommerce.customer.order_list.to_ship_fbd8eebc')} />
          <Tab
            label={translateUi('ui.sections.ecommerce.customer.order_list.to_recieve_00ca6d1c')}
          />
          <Tab
            label={translateUi('ui.sections.ecommerce.customer.order_list.to_review_066f77ce')}
          />
        </Tabs>
      </Stack>
      <TabPanel value={selectedTab} index={0}>
        <OrderedItemList
          title={translateUi('ui.sections.ecommerce.customer.order_list.to_pay_58d1265e')}
          products={filterProducts('Pending')}
        />
        <OrderedItemList
          title={translateUi('ui.sections.ecommerce.customer.order_list.to_ship_fbd8eebc')}
          products={filterProducts('Processing')}
        />
        <OrderedItemList
          title={translateUi('ui.sections.ecommerce.customer.order_list.to_recieve_00ca6d1c')}
          products={filterProducts('Shipped')}
        />
        <OrderedItemList
          title={translateUi('ui.sections.ecommerce.customer.order_list.to_review_066f77ce')}
          products={filterProducts('Delivered')}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <OrderedItemList
          title={translateUi('ui.sections.ecommerce.customer.order_list.to_pay_58d1265e')}
          products={filterProducts('Pending')}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <OrderedItemList
          title={translateUi('ui.sections.ecommerce.customer.order_list.to_ship_fbd8eebc')}
          products={filterProducts('Processing')}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={3}>
        <OrderedItemList
          title={translateUi('ui.sections.ecommerce.customer.order_list.to_recieve_00ca6d1c')}
          products={filterProducts('Shipped')}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={4}>
        <OrderedItemList
          title={translateUi('ui.sections.ecommerce.customer.order_list.to_review_066f77ce')}
          products={filterProducts('Delivered')}
        />
      </TabPanel>
    </div>
  );
};

const TabPanel = ({ value, index, children }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      <Stack sx={{ gap: 3 }}>{value === index && children}</Stack>
    </div>
  );
};

export default OrderListContainer;
