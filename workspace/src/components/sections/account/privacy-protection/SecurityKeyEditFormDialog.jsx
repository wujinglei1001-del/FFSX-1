import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  dialogClasses,
} from '@mui/material';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import PasswordTextField from 'components/common/PasswordTextField';

const securityKeySchema = yup.object().shape({
  currentSecurityKey: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.account.privacy_protection.securitykeyeditformdialog.current_security_key_pin_is_required_a7c49f2e',
      ),
    ),
  newSecurityKey: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.account.privacy_protection.securitykeyeditformdialog.new_security_key_pin_is_required_2300f1c6',
      ),
    )
    .min(
      4,
      i18n.t(
        'ui.sections.account.privacy_protection.securitykeyeditformdialog.security_key_pin_must_be_at_least_4_characters_df8de31b',
      ),
    ),
  confirmSecurityKey: yup
    .string()
    .oneOf(
      [yup.ref('newSecurityKey')],
      i18n.t(
        'ui.sections.account.privacy_protection.securitykeyeditformdialog.security_key_pins_must_match_ec677026',
      ),
    )
    .required(
      i18n.t(
        'ui.sections.account.privacy_protection.securitykeyeditformdialog.please_confirm_your_security_key_pin_0065b5a4',
      ),
    ),
});

const SecurityKeyEditFormDialog = (props) => {
  const { t: translateUi } = useTranslation();
  const { open, handleDialogClose, sx } = props;
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const methods = useForm({
    resolver: yupResolver(securityKeySchema),
  });
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = (data) => {
    console.log(data);
    handleDialogClose();
    enqueueSnackbar('Updated successfully!', { variant: 'success', autoHideDuration: 3000 });
  };

  return (
    <FormProvider {...methods}>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          [`& .${dialogClasses.paper}`]: {
            maxWidth: 463,
            borderRadius: 6,
            overflow: 'visible',
            ...sx,
          },
        }}
      >
        <DialogTitle
          component="h6"
          sx={{
            pt: 3,
            pb: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {translateUi(
            'ui.sections.account.privacy_protection.securitykeyeditformdialog.edit_security_key_aa479e59',
          )}
          <IconButton onClick={handleDialogClose}>
            <IconifyIcon icon="material-symbols:close" sx={{ fontSize: 20 }} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pb: 0 }}>
          <DialogContentText
            component={Typography}
            variant="body2"
            sx={{ color: 'text.secondary', mb: 2 }}
          >
            {translateUi(
              'ui.sections.account.privacy_protection.securitykeyeditformdialog.enter_your_security_key_pin_for_this_device_to_proce_601fde47',
            )}
          </DialogContentText>
          <Stack sx={{ gap: 1, pb: 0.125 }}>
            <PasswordTextField
              placeholder={translateUi(
                'ui.sections.account.privacy_protection.securitykeyeditformdialog.current_security_key_pin_23d003bf',
              )}
              label={translateUi(
                'ui.sections.account.privacy_protection.securitykeyeditformdialog.current_security_key_pin_23d003bf',
              )}
              error={!!errors.currentSecurityKey}
              helperText={errors.currentSecurityKey?.message}
              {...register('currentSecurityKey')}
            />
            <PasswordTextField
              placeholder={translateUi(
                'ui.sections.account.privacy_protection.securitykeyeditformdialog.new_security_key_pin_f94b743b',
              )}
              label={translateUi(
                'ui.sections.account.privacy_protection.securitykeyeditformdialog.new_security_key_pin_f94b743b',
              )}
              error={!!errors.newSecurityKey}
              helperText={errors.newSecurityKey?.message}
              {...register('newSecurityKey')}
            />
            <PasswordTextField
              placeholder={translateUi(
                'ui.sections.account.privacy_protection.securitykeyeditformdialog.confirm_security_key_pin_2fa5a729',
              )}
              label={translateUi(
                'ui.sections.account.privacy_protection.securitykeyeditformdialog.confirm_security_key_pin_2fa5a729',
              )}
              error={!!errors.confirmSecurityKey}
              helperText={errors.confirmSecurityKey?.message}
              {...register('confirmSecurityKey')}
            />
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            p: 3,
          }}
        >
          <Button color="error" size="small" onClick={() => setConfirmDialogOpen(true)}>
            {translateUi(
              'ui.sections.account.privacy_protection.securitykeyeditformdialog.remove_e963907d',
            )}
          </Button>
          <Button
            variant="soft"
            color="neutral"
            onClick={() => {
              handleDialogClose();
              reset();
            }}
            sx={{ ml: 'auto !important' }}
          >
            {translateUi(
              'ui.sections.account.privacy_protection.securitykeyeditformdialog.discard_36fff63c',
            )}
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {translateUi(
              'ui.sections.account.privacy_protection.securitykeyeditformdialog.confirm_04a21221',
            )}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Nested Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        sx={{
          [`& .${dialogClasses.paper}`]: {
            maxWidth: 463,
            borderRadius: 6,
          },
        }}
      >
        <DialogTitle
          component="h6"
          sx={{
            pt: 3,
            pb: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {translateUi(
            'ui.sections.account.privacy_protection.securitykeyeditformdialog.are_you_sure_410bf23a',
          )}
          <IconButton onClick={() => setConfirmDialogOpen(false)}>
            <IconifyIcon icon="material-symbols:close" sx={{ fontSize: 20 }} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pb: 0 }}>
          <DialogContentText
            component={Typography}
            variant="body2"
            sx={{ color: 'text.secondary' }}
          >
            {translateUi(
              'ui.sections.account.privacy_protection.securitykeyeditformdialog.you_won_t_be_able_to_use_this_security_key_anymore_y_74267ee8',
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            p: 3,
          }}
        >
          <Button variant="soft" color="neutral" onClick={() => setConfirmDialogOpen(false)}>
            {translateUi(
              'ui.sections.account.privacy_protection.securitykeyeditformdialog.cancel_77dfd213',
            )}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => {
              reset();
              setConfirmDialogOpen(false);
              handleDialogClose();
            }}
          >
            {translateUi(
              'ui.sections.account.privacy_protection.securitykeyeditformdialog.remove_e963907d',
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

export default SecurityKeyEditFormDialog;
