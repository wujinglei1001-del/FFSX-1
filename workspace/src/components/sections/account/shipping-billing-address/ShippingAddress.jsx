import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Stack, TextField } from '@mui/material';
import { countries } from 'data/countries';
import IconifyIcon from 'components/base/IconifyIcon';
import PhoneTextfield from 'components/base/PhoneTextfield';
import CountrySelect from 'components/common/CountrySelect';
import AccountDialog from '../common/AccountDialog';
import InfoCard from '../common/InfoCard';
import InfoCardAttribute from '../common/InfoCardAttribute';

const ShippingAddress = () => {
  const { t: translateUi } = useTranslation();
  const [open, setOpen] = useState(false);
  const {
    control,
    getValues,
    setValue,
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const [currentAddress, setCurrentAddress] = useState(getValues('shippingAddress'));
  const handleConfirm = async () => {
    const isValid = await trigger('shippingAddress', { shouldFocus: true });
    if (isValid) {
      const shippingData = getValues('shippingAddress');
      setCurrentAddress(shippingData);
      setOpen(false);
      setValue('shippingAddress', shippingData);
    }
  };

  const handleDiscard = () => {
    setValue('shippingAddress', currentAddress);
    setOpen(false);
  };

  return (
    <>
      <InfoCard setOpen={setOpen}>
        <Stack sx={{ gap: 2 }}>
          <InfoCardAttribute
            label={translateUi(
              'ui.sections.account.shipping_billing_address.shippingaddress.name_709a2322',
            )}
            value={currentAddress.name}
          />
          <InfoCardAttribute
            label={translateUi(
              'ui.sections.account.shipping_billing_address.shippingaddress.phone_number_ab25d61b',
            )}
            value={currentAddress.phoneNumber}
          />
          <InfoCardAttribute
            label={translateUi(
              'ui.sections.account.shipping_billing_address.shippingaddress.email_address_09ba557f',
            )}
            value={currentAddress.emailAddress}
          />
          <InfoCardAttribute
            label={translateUi(
              'ui.sections.account.shipping_billing_address.shippingaddress.country_d523ebbd',
            )}
            value={currentAddress.country}
          />
          <InfoCardAttribute
            label={translateUi(
              'ui.sections.account.shipping_billing_address.shippingaddress.state_a7250206',
            )}
            value={currentAddress.state}
          />
          <InfoCardAttribute
            label={translateUi(
              'ui.sections.account.shipping_billing_address.shippingaddress.city_4271627f',
            )}
            value={currentAddress.city}
          />
          <InfoCardAttribute
            label={translateUi(
              'ui.sections.account.shipping_billing_address.shippingaddress.street_b4541099',
            )}
            value={currentAddress.street}
          />
          <InfoCardAttribute label="ZIP" value={currentAddress.zip} />
          <InfoCardAttribute
            label={translateUi(
              'ui.sections.account.shipping_billing_address.shippingaddress.type_of_address_23f97dc3',
            )}
            value={currentAddress.addressType}
          />
        </Stack>
        <IconifyIcon
          icon="material-symbols-light:edit-outline"
          sx={{ fontSize: 20, color: 'neutral.dark', visibility: 'hidden' }}
        />
      </InfoCard>
      <AccountDialog
        open={open}
        handleDialogClose={() => setOpen(false)}
        title={translateUi(
          'ui.sections.account.shipping_billing_address.shippingaddress.shipping_address_dbd7c38d',
        )}
        subtitle={translateUi(
          'ui.sections.account.shipping_billing_address.shippingaddress.enter_your_updated_address_to_ensure_we_have_your_la_f0123212',
        )}
        handleConfirm={handleConfirm}
        handleDiscard={handleDiscard}
      >
        <Stack sx={{ gap: 2, p: 0.125 }}>
          <TextField
            placeholder={translateUi(
              'ui.sections.account.shipping_billing_address.shippingaddress.name_709a2322',
            )}
            label={translateUi(
              'ui.sections.account.shipping_billing_address.shippingaddress.name_709a2322',
            )}
            error={!!errors.shippingAddress?.name}
            helperText={errors.shippingAddress?.name?.message}
            fullWidth
            {...register('shippingAddress.name')}
          />
          <Controller
            name="shippingAddress.phoneNumber"
            control={control}
            render={({ field: { onChange } }) => (
              <PhoneTextfield
                onChange={onChange}
                defaultValue={{
                  code: '880',
                  number: '1234567890',
                }}
              />
            )}
          />
          <TextField
            placeholder={translateUi(
              'ui.sections.account.shipping_billing_address.shippingaddress.email_84add5b2',
            )}
            label={translateUi(
              'ui.sections.account.shipping_billing_address.shippingaddress.email_address_c94d3175',
            )}
            error={!!errors.shippingAddress?.emailAddress}
            helperText={errors.shippingAddress?.emailAddress?.message}
            fullWidth
            {...register('shippingAddress.emailAddress')}
          />
          <Controller
            name="shippingAddress.country"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CountrySelect
                sx={{ mb: 1 }}
                fullWidth
                onChange={(_, value) => onChange(value ? value.label : '')}
                value={countries.find((country) => country.label === value) || null}
                renderInput={(params) => (
                  <TextField
                    label={translateUi(
                      'ui.sections.account.shipping_billing_address.shippingaddress.country_d523ebbd',
                    )}
                    error={!!errors.shippingAddress?.country?.message}
                    helperText={errors.shippingAddress?.country?.message}
                    {...params}
                  />
                )}
              />
            )}
          />
          <Stack sx={{ gap: 1, p: 0.125 }}>
            <TextField
              placeholder={translateUi(
                'ui.sections.account.shipping_billing_address.shippingaddress.state_a7250206',
              )}
              label={translateUi(
                'ui.sections.account.shipping_billing_address.shippingaddress.state_a7250206',
              )}
              error={!!errors.shippingAddress?.state}
              helperText={errors.shippingAddress?.state?.message}
              fullWidth
              {...register('shippingAddress.state')}
            />
            <TextField
              placeholder={translateUi(
                'ui.sections.account.shipping_billing_address.shippingaddress.city_4271627f',
              )}
              label={translateUi(
                'ui.sections.account.shipping_billing_address.shippingaddress.city_4271627f',
              )}
              error={!!errors.shippingAddress?.city}
              helperText={errors.shippingAddress?.city?.message}
              fullWidth
              {...register('shippingAddress.city')}
            />
          </Stack>
          <Stack sx={{ gap: 1, p: 0.125 }}>
            <TextField
              placeholder={translateUi(
                'ui.sections.account.shipping_billing_address.shippingaddress.street_b4541099',
              )}
              label={translateUi(
                'ui.sections.account.shipping_billing_address.shippingaddress.street_b4541099',
              )}
              error={!!errors.shippingAddress?.street}
              helperText={errors.shippingAddress?.street?.message}
              fullWidth
              {...register('shippingAddress.street')}
            />
            <TextField
              placeholder="ZIP"
              label="ZIP"
              error={!!errors.shippingAddress?.zip}
              helperText={errors.shippingAddress?.zip?.message}
              fullWidth
              {...register('shippingAddress.zip')}
            />
          </Stack>
        </Stack>
      </AccountDialog>
    </>
  );
};

export default ShippingAddress;
