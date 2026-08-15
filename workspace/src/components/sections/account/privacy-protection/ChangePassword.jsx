import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack, Typography } from '@mui/material';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import PasswordTextField from 'components/common/PasswordTextField';
import AccountFormDialog from '../common/AccountFormDialog';

const passwordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.account.privacy_protection.changepassword.current_password_is_required_5166f051',
      ),
    ),
  newPassword: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.account.privacy_protection.changepassword.new_password_is_required_ded27e35',
      ),
    )
    .min(
      8,
      i18n.t(
        'ui.sections.account.privacy_protection.changepassword.password_must_be_at_least_8_characters_long_47a76040',
      ),
    ),
  confirmPassword: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.account.privacy_protection.changepassword.please_confirm_your_new_password_d3310595',
      ),
    )
    .oneOf(
      [yup.ref('newPassword')],
      i18n.t(
        'ui.sections.account.privacy_protection.changepassword.your_passwords_do_not_match_9d716135',
      ),
    ),
});
const ChangePassword = () => {
  const { t: translateUi } = useTranslation();
  const [open, setOpen] = useState(false);
  const methods = useForm({
    resolver: yupResolver(passwordSchema),
  });
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    console.log(data);
    setOpen(false);
    enqueueSnackbar('Updated successfully!', { variant: 'success', autoHideDuration: 3000 });
  };

  return (
    <FormProvider {...methods}>
      <Stack sx={{ gap: 2, alignItems: 'flex-start' }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: 'info.main',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <IconifyIcon icon="material-symbols:info-outline" sx={{ fontSize: 24 }} />
          {translateUi(
            'ui.sections.account.privacy_protection.changepassword.your_password_was_last_updated_on_07_08_22_d78c1832',
          )}
        </Typography>
        <Button
          variant="soft"
          color="neutral"
          onClick={() => setOpen(true)}
          endIcon={<IconifyIcon icon="material-symbols:chevron-right" sx={{ fontSize: 20 }} />}
        >
          {translateUi(
            'ui.sections.account.privacy_protection.changepassword.change_password_8c684290',
          )}
        </Button>
        <AccountFormDialog
          title={translateUi(
            'ui.sections.account.privacy_protection.changepassword.set_new_password_208bb0d7',
          )}
          subtitle={translateUi(
            'ui.sections.account.privacy_protection.changepassword.create_a_new_password_for_your_account_new_password__52c4e481',
          )}
          open={open}
          handleDialogClose={() => setOpen(false)}
          onSubmit={onSubmit}
          sx={{
            maxWidth: 463,
          }}
        >
          <Stack sx={{ gap: 1, pb: 0.125 }}>
            <PasswordTextField
              placeholder={translateUi(
                'ui.sections.account.privacy_protection.changepassword.current_password_19dff4da',
              )}
              label={translateUi(
                'ui.sections.account.privacy_protection.changepassword.current_password_19dff4da',
              )}
              error={!!errors.currentPassword}
              helperText={errors.currentPassword?.message}
              {...register('currentPassword')}
            />
            <PasswordTextField
              placeholder={translateUi(
                'ui.sections.account.privacy_protection.changepassword.new_password_d850ee18',
              )}
              label={translateUi(
                'ui.sections.account.privacy_protection.changepassword.new_password_d850ee18',
              )}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
              {...register('newPassword')}
            />
            <PasswordTextField
              placeholder={translateUi(
                'ui.sections.account.privacy_protection.changepassword.retype_new_password_5e3f3e9c',
              )}
              label={translateUi(
                'ui.sections.account.privacy_protection.changepassword.retype_password_bef1eb95',
              )}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </Stack>
        </AccountFormDialog>
      </Stack>
    </FormProvider>
  );
};

export default ChangePassword;
