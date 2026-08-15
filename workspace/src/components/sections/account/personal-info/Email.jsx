import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, TextField, Typography } from '@mui/material';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import { useAccounts } from 'providers/AccountsProvider';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import AccountFormDialog from '../common/AccountFormDialog';
import InfoCard from '../common/InfoCard';
import InfoCardAttribute from '../common/InfoCardAttribute';

const emailSchema = yup.object().shape({
  primaryEmail: yup
    .string()
    .email(
      i18n.t(
        'ui.sections.account.personal_info.email.primary_email_must_be_a_valid_email_afceae69',
      ),
    )
    .required(i18n.t('ui.sections.account.personal_info.email.primary_email_is_required_8ef3d6bd')),
  secondaryEmail: yup
    .string()
    .email(
      i18n.t(
        'ui.sections.account.personal_info.email.secondary_email_must_be_a_valid_email_10bca1dd',
      ),
    )
    .required(
      i18n.t('ui.sections.account.personal_info.email.secondary_email_is_required_50d55c0e'),
    ),
});

const Email = () => {
  const { t: translateUi } = useTranslation();
  const [open, setOpen] = useState(false);
  const { personalInfo } = useAccounts();
  const { enqueueSnackbar } = useSnackbar();
  const [currentEmail, setCurrentEmail] = useState({
    primaryEmail: personalInfo.primaryEmail,
    secondaryEmail: personalInfo.secondaryEmail,
  });
  const methods = useForm({
    defaultValues: {
      primaryEmail: personalInfo.primaryEmail,
      secondaryEmail: personalInfo.secondaryEmail,
    },
    resolver: yupResolver(emailSchema),
  });
  const {
    getValues,
    register,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    console.log(data);
    const updatedData = getValues();
    setCurrentEmail(updatedData);
    setOpen(false);
    enqueueSnackbar('Updated successfully!', { variant: 'success', autoHideDuration: 3000 });
  };

  const handleDiscard = () => {
    reset(currentEmail);
    setOpen(false);
  };

  return (
    <FormProvider {...methods}>
      <InfoCard setOpen={setOpen} sx={{ mb: 2 }}>
        <Stack sx={{ gap: { xs: 2, sm: 1 } }}>
          <InfoCardAttribute
            label={translateUi('ui.sections.account.personal_info.email.primary_email_e4172d73')}
            value={currentEmail.primaryEmail}
          />
          <InfoCardAttribute
            label={translateUi('ui.sections.account.personal_info.email.secondary_email_5818fcea')}
            value={currentEmail.secondaryEmail}
          />
        </Stack>
        <IconifyIcon
          icon="material-symbols-light:edit-outline"
          sx={{ fontSize: 20, color: 'neutral.dark', visibility: 'hidden' }}
        />
      </InfoCard>
      <AccountFormDialog
        title={translateUi('ui.sections.account.personal_info.email.email_address_09ba557f')}
        subtitle={translateUi(
          'ui.sections.account.personal_info.email.update_your_primary_email_address_you_can_also_set_a_3abfe368',
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
              'ui.sections.account.personal_info.email.primary_email_e4172d73',
            )}
            label={translateUi('ui.sections.account.personal_info.email.primary_email_e4172d73')}
            error={!!errors.primaryEmail}
            helperText={errors.primaryEmail?.message}
            fullWidth
            {...register('primaryEmail')}
          />
          <TextField
            placeholder={translateUi(
              'ui.sections.account.personal_info.email.secondary_email_5818fcea',
            )}
            label={translateUi('ui.sections.account.personal_info.email.secondary_email_5818fcea')}
            error={!!errors.secondaryEmail}
            helperText={errors.secondaryEmail?.message}
            fullWidth
            {...register('secondaryEmail')}
          />
        </Stack>
      </AccountFormDialog>
      <Stack direction="row" sx={{ gap: 1, color: 'info.main' }}>
        <IconifyIcon icon="material-symbols:info" sx={{ fontSize: 24 }} />
        <Typography variant="body2">
          {translateUi(
            'ui.sections.account.personal_info.email.your_alternate_email_will_be_used_to_gain_access_to__d7743081',
          )}
        </Typography>
      </Stack>
    </FormProvider>
  );
};

export default Email;
