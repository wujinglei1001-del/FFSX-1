import { useTranslation } from 'react-i18next';
import { Button, Paper, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import AddContactStepper from 'components/sections/crm/add-contact/AddContactStepper';
import PageHeader from 'components/sections/ecommerce/admin/common/PageHeader';

const AddContact = () => {
  const { t: translateUi } = useTranslation();
  return (
    <Grid container>
      <Grid size={12}>
        <PageHeader
          title={translateUi('ui.pages.apps.crm.addcontact.add_new_contact_b36686e2')}
          breadcrumb={[
            { label: translateUi('ui.pages.apps.crm.addcontact.home_70f8bb9a'), url: paths.crm },
            { label: translateUi('ui.pages.apps.crm.addcontact.contact_b37456c4'), active: true },
          ]}
          actionComponent={
            <Stack
              direction="row"
              sx={{
                gap: 1,
              }}
            >
              <Button
                variant="soft"
                size="large"
                color="neutral"
                startIcon={
                  <IconifyIcon icon="material-symbols:upload-rounded" height={24} width={24} />
                }
              >
                {translateUi('ui.pages.apps.crm.addcontact.import_from_41310266')}
              </Button>
            </Stack>
          }
        />
      </Grid>
      <Grid size={12}>
        <Paper sx={{ p: { xs: 3, md: 5 } }}>
          <AddContactStepper />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddContact;
