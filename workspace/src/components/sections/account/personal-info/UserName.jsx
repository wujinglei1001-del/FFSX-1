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

const userNameSchema = yup.object().shape({
  userName: yup
    .string()
    .required(i18n.t('ui.sections.account.personal_info.username.user_name_is_required_74f9a9b6')),
});

const UserName = () => {
  const { t: translateUi } = useTranslation();
  const { personalInfo } = useAccounts();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [currentUserName, setCurrentUserName] = useState(personalInfo.userName);
  const methods = useForm({
    defaultValues: {
      userName: currentUserName,
    },
    resolver: yupResolver(userNameSchema),
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
    setCurrentUserName(updatedData.userName);
    setOpen(false);
    enqueueSnackbar('Updated successfully!', { variant: 'success', autoHideDuration: 3000 });
  };

  const handleDiscard = () => {
    reset({ userName: currentUserName });
    setOpen(false);
  };

  return (
    <FormProvider {...methods}>
      <InfoCard setOpen={setOpen}>
        <Stack sx={{ gap: { xs: 2, sm: 1 }, justifyContent: 'center' }}>
          <InfoCardAttribute
            label={translateUi('ui.sections.account.personal_info.username.user_name_a951840b')}
            value={currentUserName}
          />
        </Stack>
        <IconifyIcon
          icon="material-symbols-light:edit-outline"
          sx={{ fontSize: 20, color: 'neutral.dark', visibility: 'hidden' }}
        />
      </InfoCard>
      <AccountFormDialog
        title={translateUi('ui.sections.account.personal_info.username.user_name_a951840b')}
        subtitle={translateUi(
          'ui.sections.account.personal_info.username.update_your_username_this_change_will_apply_to_your__db443b46',
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
          <TextField
            placeholder={translateUi(
              'ui.sections.account.personal_info.username.user_name_a951840b',
            )}
            label={translateUi('ui.sections.account.personal_info.username.user_name_a951840b')}
            error={!!errors.userName}
            helperText={errors.userName?.message}
            fullWidth
            {...register('userName')}
          />
        </Stack>
      </AccountFormDialog>
    </FormProvider>
  );
};

export default UserName;
