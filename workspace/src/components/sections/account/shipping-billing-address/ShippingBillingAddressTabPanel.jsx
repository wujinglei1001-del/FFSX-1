import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Checkbox, Divider, FormControlLabel, Stack } from '@mui/material';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import { useAccounts } from 'providers/AccountsProvider';
import * as yup from 'yup';
import AccountTabPanelSection from '../common/AccountTabPanelSection';
import BillingAddress from './BillingAddress';
import ShippingAddress from './ShippingAddress';

const shippingBillingAddressSchema = yup.object().shape({
  shippingAddress: yup.object().shape({
    name: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.name_is_required_222c72b1',
        ),
      ),
    phoneNumber: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.phone_number_is_required_f845371b',
        ),
      ),
    emailAddress: yup
      .string()
      .email()
      .required(
        i18n.t(
          'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.country_name_is_required_0c35a596',
        ),
      ),
    country: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.country_name_is_required_0c35a596',
        ),
      ),
    state: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.state_name_is_required_a579ea98',
        ),
      ),
    city: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.city_name_is_required_858efac1',
        ),
      ),
    street: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.street_name_is_required_d6b8efe8',
        ),
      ),
    zip: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.zip_is_required_d31da32b',
        ),
      ),
    addressType: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.office_type_is_required_0753a047',
        ),
      ),
  }),
  billingAddress: yup.object().shape({
    name: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.name_is_required_222c72b1',
        ),
      ),
    phoneNumber: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.phone_number_is_required_f845371b',
        ),
      ),
    emailAddress: yup
      .string()
      .email()
      .required(
        i18n.t(
          'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.country_name_is_required_0c35a596',
        ),
      ),
    country: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.country_name_is_required_0c35a596',
        ),
      ),
    state: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.state_name_is_required_a579ea98',
        ),
      ),
    city: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.city_name_is_required_858efac1',
        ),
      ),
    street: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.street_name_is_required_d6b8efe8',
        ),
      ),
    zip: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.zip_is_required_d31da32b',
        ),
      ),
    addressType: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.office_type_is_required_0753a047',
        ),
      ),
  }),
});

const ShippingBillingAddressTabPanel = () => {
  const { t: translateUi } = useTranslation();
  const { shippingBillingAddress } = useAccounts();
  const methods = useForm({
    defaultValues: shippingBillingAddress,
    resolver: yupResolver(shippingBillingAddressSchema),
  });

  const { handleSubmit, watch, setValue, resetField } = methods;

  const { shippingAddress } = watch();

  const { enqueueSnackbar } = useSnackbar();

  const [defaultShippingAddress, setDefaultShippingAddress] = useState(false);

  useEffect(() => {
    if (defaultShippingAddress) {
      setValue('billingAddress', shippingAddress);
    } else {
      resetField('billingAddress');
    }
  }, [defaultShippingAddress]);

  const onSubmit = (data) => {
    console.log({ data });
    enqueueSnackbar('Updated successfully!', { variant: 'success' });
  };

  return (
    <FormProvider {...methods}>
      <Stack
        component="form"
        divider={<Divider />}
        sx={{ gap: 4 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.shipping_address_dbd7c38d',
          )}
          subtitle={translateUi(
            'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.you_can_edit_your_address_and_control_who_can_see_it_5c6d74f7',
          )}
          icon="material-symbols:local-shipping-outline-rounded"
        >
          <ShippingAddress />
        </AccountTabPanelSection>
        <AccountTabPanelSection
          title={translateUi(
            'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.billing_address_48af96f6',
          )}
          icon="material-symbols:receipt-long-outline-rounded"
          actionComponent={
            <FormControlLabel
              control={
                <Checkbox
                  checked={defaultShippingAddress}
                  onChange={(e) => setDefaultShippingAddress(e.target.checked)}
                />
              }
              label={translateUi(
                'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.set_as_default_shipping_address_c28f5e00',
              )}
            />
          }
        >
          <BillingAddress defaultShippingAddress={defaultShippingAddress} />
          <Stack direction="row" sx={{ gap: 1, justifyContent: 'flex-end' }}>
            <Button variant="soft" color="neutral" sx={{ width: 100 }}>
              {translateUi(
                'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.discard_36fff63c',
              )}
            </Button>
            <Button type="submit" variant="contained" sx={{ width: 100 }}>
              {translateUi(
                'ui.sections.account.shipping_billing_address.shippingbillingaddresstabpanel.save_efc007a3',
              )}
            </Button>
          </Stack>
        </AccountTabPanelSection>
      </Stack>
    </FormProvider>
  );
};

export default ShippingBillingAddressTabPanel;
