import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Stack, Typography } from '@mui/material';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import { useAccounts } from 'providers/AccountsProvider';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import PhoneTextfield from 'components/base/PhoneTextfield';
import AccountFormDialog from '../common/AccountFormDialog';
import InfoCard from '../common/InfoCard';
import InfoCardAttribute from '../common/InfoCardAttribute';

const phoneSchema = yup
  .object({
    phoneNumber: yup
      .string()
      .required(
        i18n.t('ui.sections.account.personal_info.phone.phone_number_is_required_f845371b'),
      ),
  })
  .required();

const Phone = () => {
  const { t: translateUi } = useTranslation();
  const [open, setOpen] = useState(false);
  const { personalInfo } = useAccounts();
  const { enqueueSnackbar } = useSnackbar();
  const [currentPhone, setCurrentPhone] = useState(personalInfo.phoneNumber);
  const methods = useForm({
    defaultValues: {
      phoneNumber: currentPhone,
    },
    resolver: yupResolver(phoneSchema),
  });
  const { control, reset, getValues } = methods;

  const onSubmit = (data) => {
    console.log(data);
    const updatedData = getValues();
    setCurrentPhone(updatedData.phoneNumber);
    setOpen(false);
    enqueueSnackbar('Updated successfully!', { variant: 'success', autoHideDuration: 3000 });
  };
  const handleDiscard = () => {
    reset({ phoneNumber: currentPhone });
    setOpen(false);
  };
  const match = currentPhone.match(/\(\+(\d+)\)(\d+)/);

  return (
    <FormProvider {...methods}>
      <InfoCard setOpen={setOpen} sx={{ mb: 2 }}>
        <Stack sx={{ gap: { xs: 2, sm: 1 } }}>
          <InfoCardAttribute
            label={translateUi('ui.sections.account.personal_info.phone.number_b7baa1d4')}
            value={currentPhone}
          />
        </Stack>
        <IconifyIcon
          icon="material-symbols-light:edit-outline"
          sx={{ fontSize: 20, color: 'neutral.dark', visibility: 'hidden' }}
        />
      </InfoCard>
      <AccountFormDialog
        title={translateUi('ui.sections.account.personal_info.phone.phone_77064d52')}
        subtitle={translateUi(
          'ui.sections.account.personal_info.phone.ensure_your_phone_number_to_enable_account_recovery__d3def45e',
        )}
        open={open}
        onSubmit={onSubmit}
        handleDialogClose={() => setOpen(false)}
        handleDiscard={handleDiscard}
        sx={{
          maxWidth: 463,
        }}
      >
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field: { onChange } }) => (
            <PhoneTextfield
              onChange={onChange}
              defaultValue={{
                code: match?.[1],
                number: match?.[2],
              }}
            />
          )}
        />
      </AccountFormDialog>
      <Stack sx={{ gap: 1, alignItems: 'flex-start' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', textWrap: 'pretty' }}>
          {translateUi(
            'ui.sections.account.personal_info.phone.this_phone_number_has_to_be_confirmed_to_ensure_its__43644fcd',
          )}
        </Typography>
        <Link
          component="button"
          type="button"
          onClick={() => setOpen(true)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 'body2.fontSize',
          }}
        >
          {translateUi('ui.sections.account.personal_info.phone.confirm_your_number_677c0d27')}{' '}
          <IconifyIcon icon="material-symbols:chevron-right" sx={{ fontSize: 20 }} />
        </Link>
      </Stack>
    </FormProvider>
  );
};

export default Phone;
