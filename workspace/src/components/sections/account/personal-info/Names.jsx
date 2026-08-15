import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, TextField } from '@mui/material';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import { useAccounts } from 'providers/AccountsProvider';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import AccountFormDialog from '../common/AccountFormDialog';
import InfoCard from '../common/InfoCard';
import InfoCardAttribute from '../common/InfoCardAttribute';

const nameSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(i18n.t('ui.sections.account.personal_info.names.first_name_is_required_df38d55f')),
  lastName: yup
    .string()
    .required(i18n.t('ui.sections.account.personal_info.names.last_name_is_required_b1d9a735')),
});

const Names = () => {
  const { t: translateUi } = useTranslation();
  const { personalInfo } = useAccounts();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [currentName, setCurrentName] = useState({
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
  });
  const methods = useForm({
    defaultValues: {
      firstName: currentName.firstName,
      lastName: currentName.lastName,
    },
    resolver: yupResolver(nameSchema),
  });
  const {
    register,
    getValues,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    console.log(data);
    const updatedData = getValues();
    setCurrentName(updatedData);
    setOpen(false);
    enqueueSnackbar('Updated successfully!', { variant: 'success', autoHideDuration: 3000 });
  };

  const handleDiscard = () => {
    reset({ firstName: currentName.firstName, lastName: currentName.lastName });
    setOpen(false);
  };

  return (
    <FormProvider {...methods}>
      <InfoCard setOpen={setOpen}>
        <Stack sx={{ gap: { xs: 2, sm: 1 } }}>
          <InfoCardAttribute
            label={translateUi('ui.sections.account.personal_info.names.first_name_b6ea992a')}
            value={currentName.firstName}
          />
          <InfoCardAttribute
            label={translateUi('ui.sections.account.personal_info.names.last_name_863cb39f')}
            value={currentName.lastName}
          />
        </Stack>
        <IconifyIcon
          icon="material-symbols-light:edit-outline"
          sx={{ fontSize: 20, color: 'neutral.dark', visibility: 'hidden' }}
        />
      </InfoCard>
      <AccountFormDialog
        title={translateUi('ui.sections.account.personal_info.names.name_709a2322')}
        subtitle={translateUi(
          'ui.sections.account.personal_info.names.enter_your_updated_first_and_last_name_below_your_na_a7f4197c',
        )}
        open={open}
        onSubmit={onSubmit}
        handleDialogClose={() => setOpen(false)}
        handleDiscard={handleDiscard}
        sx={{ maxWidth: 463 }}
      >
        <Stack sx={{ gap: 1, p: 0.125 }}>
          <TextField
            placeholder={translateUi('ui.sections.account.personal_info.names.first_name_b6ea992a')}
            label={translateUi('ui.sections.account.personal_info.names.first_name_b6ea992a')}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            fullWidth
            {...register('firstName')}
          />
          <TextField
            placeholder={translateUi('ui.sections.account.personal_info.names.last_name_863cb39f')}
            label={translateUi('ui.sections.account.personal_info.names.last_name_863cb39f')}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            fullWidth
            {...register('lastName')}
          />
        </Stack>
      </AccountFormDialog>
    </FormProvider>
  );
};

export default Names;
