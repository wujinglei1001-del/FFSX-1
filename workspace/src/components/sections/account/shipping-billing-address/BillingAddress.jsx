import { useEffect, useState } from 'react';
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

const BillingAddress = ({ defaultShippingAddress }) => {
  const { t: translateUi } = useTranslation();
  const [open, setOpen] = useState(false);
  const {
    watch,
    control,
    register,
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [currentAddress, setCurrentAddress] = useState(getValues('billingAddress'));
  const billingAddress = watch('billingAddress');

  useEffect(() => setCurrentAddress(billingAddress), [billingAddress]);

  const handleConfirm = async () => {
    const isValid = await trigger('billingAddress');
    console.log(isValid);
    if (isValid) {
      const billingData = getValues('billingAddress');
      setCurrentAddress(billingData);
      setOpen(false);
      setValue('billingAddress', billingData);
    }
  };

  const handleDiscard = () => {
    setValue('billingAddress', currentAddress);
    setOpen(false);
  };

  return (
    <>
      <InfoCard setOpen={!defaultShippingAddress ? setOpen : null} sx={{ mb: 5 }}>
        <Stack sx={{ gap: 2 }}>
          <InfoCardAttribute
            label={translateUi(
              'ui.sections.account.shipping_billing_address.billingaddress.name_709a2322',
            )}
            value={currentAddress.name}
          />
          <InfoCardAttribute
            label={translateUi(
              'ui.sections.account.shipping_billing_address.billingaddress.phone_number_ab25d61b',
            )}
            value={currentAddress.phoneNumber}
          />
          <InfoCardAttribute
            label={translateUi(
              'ui.sections.account.shipping_billing_address.billingaddress.email_address_09ba557f',
            )}
            value={currentAddress.emailAddress}
          />
          <InfoCardAttribute
            label={translateUi(
              'ui.sections.account.shipping_billing_address.billingaddress.country_d523ebbd',
            )}
            value={currentAddress.country}
          />
          <InfoCardAttribute
            label={translateUi(
              'ui.sections.account.shipping_billing_address.billingaddress.state_a7250206',
            )}
            value={currentAddress.state}
          />
          <InfoCardAttribute
            label={translateUi(
              'ui.sections.account.shipping_billing_address.billingaddress.city_4271627f',
            )}
            value={currentAddress.city}
          />
          <InfoCardAttribute
            label={translateUi(
              'ui.sections.account.shipping_billing_address.billingaddress.street_b4541099',
            )}
            value={currentAddress.street}
          />
          <InfoCardAttribute label="ZIP" value={currentAddress.zip} />
          <InfoCardAttribute
            label={translateUi(
              'ui.sections.account.shipping_billing_address.billingaddress.type_of_address_23f97dc3',
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
          'ui.sections.account.shipping_billing_address.billingaddress.billing_address_48af96f6',
        )}
        subtitle={translateUi(
          'ui.sections.account.shipping_billing_address.billingaddress.enter_your_updated_address_to_ensure_we_have_your_la_f0123212',
        )}
        handleConfirm={handleConfirm}
        handleDiscard={handleDiscard}
      >
        <Stack sx={{ gap: 2, p: 0.125 }}>
          <TextField
            placeholder={translateUi(
              'ui.sections.account.shipping_billing_address.billingaddress.name_709a2322',
            )}
            label={translateUi(
              'ui.sections.account.shipping_billing_address.billingaddress.name_709a2322',
            )}
            error={!!errors.billingAddress?.name}
            helperText={errors.billingAddress?.name?.message}
            fullWidth
            {...register('billingAddress.name')}
          />
          <Controller
            name="billingAddress.phoneNumber"
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
              'ui.sections.account.shipping_billing_address.billingaddress.email_84add5b2',
            )}
            label={translateUi(
              'ui.sections.account.shipping_billing_address.billingaddress.email_address_c94d3175',
            )}
            error={!!errors.billingAddress?.emailAddress}
            helperText={errors.billingAddress?.emailAddress?.message}
            fullWidth
            {...register('billingAddress.emailAddress')}
          />
          <Controller
            name="billingAddress.country"
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
                      'ui.sections.account.shipping_billing_address.billingaddress.country_d523ebbd',
                    )}
                    error={!!errors.billingAddress?.country?.message}
                    helperText={errors.billingAddress?.country?.message}
                    {...params}
                  />
                )}
              />
            )}
          />
          <Stack sx={{ gap: 1, p: 0.125 }}>
            <TextField
              placeholder={translateUi(
                'ui.sections.account.shipping_billing_address.billingaddress.state_a7250206',
              )}
              label={translateUi(
                'ui.sections.account.shipping_billing_address.billingaddress.state_a7250206',
              )}
              error={!!errors.billingAddress?.state}
              helperText={errors.billingAddress?.state?.message}
              fullWidth
              {...register('billingAddress.state')}
            />
            <TextField
              placeholder={translateUi(
                'ui.sections.account.shipping_billing_address.billingaddress.city_4271627f',
              )}
              label={translateUi(
                'ui.sections.account.shipping_billing_address.billingaddress.city_4271627f',
              )}
              error={!!errors.billingAddress?.city}
              helperText={errors.billingAddress?.city?.message}
              fullWidth
              {...register('billingAddress.city')}
            />
          </Stack>
          <Stack sx={{ gap: 1, p: 0.125 }}>
            <TextField
              placeholder={translateUi(
                'ui.sections.account.shipping_billing_address.billingaddress.street_b4541099',
              )}
              label={translateUi(
                'ui.sections.account.shipping_billing_address.billingaddress.street_b4541099',
              )}
              error={!!errors.billingAddress?.street}
              helperText={errors.billingAddress?.street?.message}
              fullWidth
              {...register('billingAddress.street')}
            />
            <TextField
              placeholder="ZIP"
              label="ZIP"
              error={!!errors.billingAddress?.zip}
              helperText={errors.billingAddress?.zip?.message}
              fullWidth
              {...register('billingAddress.zip')}
            />
          </Stack>
        </Stack>
      </AccountDialog>
    </>
  );
};

export default BillingAddress;
