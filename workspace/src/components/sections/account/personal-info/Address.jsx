import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { countries } from 'data/countries';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import { useAccounts } from 'providers/AccountsProvider';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import CountrySelect from 'components/common/CountrySelect';
import AccountFormDialog from '../common/AccountFormDialog';
import InfoCard from '../common/InfoCard';
import InfoCardAttribute from '../common/InfoCardAttribute';

const addressSchema = yup.object().shape({
  country: yup
    .string()
    .required(
      i18n.t('ui.sections.account.personal_info.address.country_name_is_required_0c35a596'),
    ),
  state: yup
    .string()
    .required(i18n.t('ui.sections.account.personal_info.address.state_name_is_required_a579ea98')),
  city: yup
    .string()
    .required(i18n.t('ui.sections.account.personal_info.address.city_name_is_required_858efac1')),
  street: yup
    .string()
    .required(i18n.t('ui.sections.account.personal_info.address.street_name_is_required_d6b8efe8')),
  zip: yup
    .string()
    .required(i18n.t('ui.sections.account.personal_info.address.zip_is_required_d31da32b')),
});

const Address = () => {
  const { t: translateUi } = useTranslation();
  const [open, setOpen] = useState(false);
  const { personalInfo } = useAccounts();
  const { up } = useBreakpoints();
  const { enqueueSnackbar } = useSnackbar();
  const [currentAddress, setCurrentAddress] = useState({
    country: personalInfo.country,
    state: personalInfo.state,
    city: personalInfo.city,
    street: personalInfo.street,
    zip: personalInfo.zip,
  });
  const methods = useForm({
    defaultValues: {
      country: currentAddress.country,
      state: currentAddress.state,
      city: currentAddress.city,
      street: currentAddress.street,
      zip: currentAddress.zip,
      visibility: 'followers_only',
    },
    resolver: yupResolver(addressSchema),
  });
  const {
    control,
    getValues,
    reset,
    register,
    formState: { errors },
  } = methods;

  const upSm = up('sm');

  const onSubmit = (data) => {
    console.log(data);
    const updatedData = getValues();
    setCurrentAddress(updatedData);
    setOpen(false);
    enqueueSnackbar('Updated successfully!', { variant: 'success', autoHideDuration: 3000 });
  };

  const handleDiscard = () => {
    reset(currentAddress);
    setOpen(false);
  };

  return (
    <FormProvider {...methods}>
      <InfoCard setOpen={setOpen} sx={{ mb: 3 }}>
        <Stack sx={{ gap: { xs: 2, sm: 1 } }}>
          <InfoCardAttribute
            label={translateUi('ui.sections.account.personal_info.address.country_d523ebbd')}
            value={currentAddress.country}
          />
          <InfoCardAttribute
            label={translateUi('ui.sections.account.personal_info.address.state_a7250206')}
            value={currentAddress.state}
          />
          <InfoCardAttribute
            label={translateUi('ui.sections.account.personal_info.address.city_4271627f')}
            value={currentAddress.city}
          />
          <InfoCardAttribute
            label={translateUi('ui.sections.account.personal_info.address.street_b4541099')}
            value={currentAddress.street}
          />
          <InfoCardAttribute label="ZIP" value={currentAddress.zip} />
        </Stack>
        <IconifyIcon
          icon="material-symbols-light:edit-outline"
          sx={{ fontSize: 20, color: 'neutral.dark', visibility: 'hidden' }}
        />
      </InfoCard>
      <AccountFormDialog
        title={translateUi('ui.sections.account.personal_info.address.address_d70f93df')}
        subtitle={translateUi(
          'ui.sections.account.personal_info.address.enter_your_updated_address_to_ensure_we_have_your_mo_fa3afdc5',
        )}
        open={open}
        onSubmit={onSubmit}
        handleDialogClose={() => setOpen(false)}
        handleDiscard={handleDiscard}
        sx={{
          maxWidth: 463,
        }}
      >
        <Stack sx={{ gap: 1, p: 0.125 }}>
          <Controller
            name="country"
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
                      'ui.sections.account.personal_info.address.country_d523ebbd',
                    )}
                    error={!!errors.country?.message}
                    helperText={errors.country?.message}
                    {...params}
                  />
                )}
              />
            )}
          />
          <TextField
            placeholder={translateUi('ui.sections.account.personal_info.address.state_a7250206')}
            label={translateUi('ui.sections.account.personal_info.address.state_a7250206')}
            error={!!errors.state}
            helperText={errors.state?.message}
            fullWidth
            {...register('state')}
          />
          <TextField
            placeholder={translateUi('ui.sections.account.personal_info.address.city_4271627f')}
            label={translateUi('ui.sections.account.personal_info.address.city_4271627f')}
            error={!!errors.city}
            helperText={errors.city?.message}
            fullWidth
            {...register('city')}
          />
          <TextField
            placeholder={translateUi('ui.sections.account.personal_info.address.street_b4541099')}
            label={translateUi('ui.sections.account.personal_info.address.street_b4541099')}
            error={!!errors.street}
            helperText={errors.street?.message}
            fullWidth
            {...register('street')}
          />
          <TextField
            placeholder="ZIP"
            label="ZIP"
            error={!!errors.zip}
            helperText={errors.zip?.message}
            fullWidth
            {...register('zip')}
          />
        </Stack>
      </AccountFormDialog>
      <FormControl sx={{ gap: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          {translateUi(
            'ui.sections.account.personal_info.address.who_can_see_your_address_62fb7ae8',
          )}
        </Typography>
        <Controller
          control={control}
          name="visibility"
          render={({ field }) => (
            <RadioGroup row={upSm} aria-labelledby="address-visibility-radio-buttons" {...field}>
              <FormControlLabel
                value="only_me"
                control={<Radio />}
                label={translateUi('ui.sections.account.personal_info.address.only_me_7631b141')}
              />
              <FormControlLabel
                value="followers_only"
                control={<Radio />}
                label={translateUi(
                  'ui.sections.account.personal_info.address.followers_only_b8cf84c7',
                )}
              />
              <FormControlLabel
                value="everyone"
                control={<Radio />}
                label={translateUi('ui.sections.account.personal_info.address.everyone_c756f6af')}
              />
            </RadioGroup>
          )}
        />
      </FormControl>
    </FormProvider>
  );
};

export default Address;
