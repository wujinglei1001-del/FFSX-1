import { useTranslation } from 'react-i18next';
import { Button, Stack } from '@mui/material';
import paths from 'routes/paths';
import DashboardMenu from 'components/common/DashboardMenu';
import PageHeader from 'components/sections/ecommerce/admin/common/PageHeader';
import BottomBar from 'components/sections/ecommerce/admin/create-order/BottomBar';
import CreateOrderAside from 'components/sections/ecommerce/admin/create-order/aside';
import CreateOrderContainer from 'components/sections/ecommerce/admin/create-order/main';

const CreateOrder = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack>
      <PageHeader
        title={translateUi('ui.pages.apps.ecommerce.admin.create_order_0289c84e')}
        breadcrumb={[
          {
            label: translateUi('ui.pages.apps.ecommerce.admin.order_list_86e684a4'),
            url: paths.adminOrderList,
          },
          {
            label: translateUi('ui.pages.apps.ecommerce.admin.create_order_0289c84e'),
            active: true,
          },
        ]}
        actionComponent={
          <Stack
            direction="row"
            sx={{
              gap: 1,
            }}
          >
            <Button variant="soft" color="neutral">
              {translateUi('ui.pages.apps.ecommerce.admin.clear_form_68e3e8f0')}
            </Button>
            <DashboardMenu size="medium" variant="soft" />
          </Stack>
        }
      />
      <Stack direction={{ xs: 'column-reverse', sm: 'row' }}>
        <CreateOrderContainer />
        <CreateOrderAside />
      </Stack>
      <BottomBar />
    </Stack>
  );
};

export default CreateOrder;
