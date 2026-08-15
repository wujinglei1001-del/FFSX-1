import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Chip,
  Link,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  listItemTextClasses,
} from '@mui/material';
import { initialConfig } from 'config';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';
import PasswordTextField from 'components/common/PasswordTextField';
import AccountFormDialog from '../common/AccountFormDialog';

const QrCode = {
  img: `${initialConfig.assetsDir}/images/account/2.webp`,
  code: '3412 1234 6355 1234',
};

const regSecurityKeySchema = yup.object().shape({
  currentSecurityKey: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.account.privacy_protection.alternateloginmethod.current_security_key_is_required_d9e1f845',
      ),
    ),
  newSecurityKey: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.account.privacy_protection.alternateloginmethod.new_security_key_is_required_898d86fa',
      ),
    )
    .min(
      4,
      i18n.t(
        'ui.sections.account.privacy_protection.alternateloginmethod.security_key_pin_must_be_at_least_4_characters_df8de31b',
      ),
    ),
  confirmSecurityKey: yup
    .string()
    .oneOf(
      [yup.ref('newSecurityKey')],
      i18n.t(
        'ui.sections.account.privacy_protection.alternateloginmethod.security_keys_must_match_e7faff85',
      ),
    )
    .required(
      i18n.t(
        'ui.sections.account.privacy_protection.alternateloginmethod.confirm_security_key_is_required_cb02b150',
      ),
    ),
});

const AlternateLoginMethod = () => {
  const { t: translateUi } = useTranslation();
  const [open, setOpen] = useState(false);
  const methods = useForm({
    resolver: yupResolver(regSecurityKeySchema),
  });
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    formState: { errors },
  } = methods;

  const { up } = useBreakpoints();
  const upSm = up('sm');

  const onSubmit = (data) => {
    console.log(data);
    setOpen(false);
    enqueueSnackbar('Updated successfully!', { variant: 'success', autoHideDuration: 3000 });
  };

  return (
    <FormProvider {...methods}>
      <Stack direction="row" sx={{ gap: 1, alignItems: 'flex-start' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {translateUi(
            'ui.sections.account.privacy_protection.alternateloginmethod.use_an_authenticator_app_6053d439',
          )}
        </Typography>
        <Chip
          label={translateUi(
            'ui.sections.account.privacy_protection.alternateloginmethod.recommended_9ef93755',
          )}
          color="success"
          variant="soft"
        />
      </Stack>
      <List
        sx={{
          [`& .${listItemTextClasses.primary}`]: {
            fontSize: 'body2.fontSize',
            color: 'text.secondary',
            display: 'list-item',
            listStyleType: 'decimal',
          },
        }}
      >
        <ListItem>
          <ListItemText
            primary={
              <>
                {translateUi(
                  'ui.sections.account.privacy_protection.alternateloginmethod.download_an_authenticator_app_such_as_4d69fc1b',
                )}
                <Link href="#!">
                  {translateUi(
                    'ui.sections.account.privacy_protection.alternateloginmethod.microsoft_authenticator_440b31d5',
                  )}
                </Link>
              </>
            }
            slotProps={{ primary: { variant: 'body2' } }}
          />
        </ListItem>
        <ListItem>
          <ListItemText>
            <Stack sx={{ gap: 1 }}>
              <Typography variant="body2">
                {translateUi(
                  'ui.sections.account.privacy_protection.alternateloginmethod.scan_this_qr_code_or_copy_the_key_c074463f',
                )}
              </Typography>
              <Stack direction="row" sx={{ gap: { xs: 3, sm: 5 }, alignItems: 'center', ml: -2.5 }}>
                <Image
                  src={QrCode.img}
                  width={90}
                  height={90}
                  alt={translateUi('common.accessibility.qr_code')}
                />
                <Typography
                  variant={upSm ? 'h6' : 'subtitle1'}
                  sx={{ color: 'text.primary', fontWeight: 700 }}
                >
                  {QrCode.code}
                </Typography>
              </Stack>
            </Stack>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`
            Copy and enter 6 digit code from the app whenever you are trying to log in.
            `}
            slotProps={{ primary: { variant: 'body2' } }}
          />
        </ListItem>
      </List>
      <Stack
        sx={{
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
          {translateUi(
            'ui.sections.account.privacy_protection.alternateloginmethod.use_security_key_280a35a3',
          )}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          {translateUi(
            'ui.sections.account.privacy_protection.alternateloginmethod.use_a_physical_security_key_to_gain_access_to_your_a_2bd0d948',
          )}
        </Typography>
        <Button
          variant="soft"
          color="neutral"
          endIcon={<IconifyIcon icon="material-symbols:chevron-right" sx={{ fontSize: 20 }} />}
          onClick={() => setOpen(true)}
        >
          {translateUi(
            'ui.sections.account.privacy_protection.alternateloginmethod.register_security_key_1b22f17f',
          )}
        </Button>
      </Stack>
      <AccountFormDialog
        title={translateUi(
          'ui.sections.account.privacy_protection.alternateloginmethod.security_key_setup_140cf49d',
        )}
        subtitle={
          <>
            <Typography
              component="span"
              variant="body2"
              sx={{ display: 'inline-block', mb: 2, textWrap: 'pretty' }}
            >
              {translateUi(
                'ui.sections.account.privacy_protection.alternateloginmethod.this_will_allow_abcd_com_to_see_the_make_and_model_o_ae1a8fa3',
              )}
            </Typography>
            <Typography component="span" variant="body2" sx={{ textWrap: 'pretty' }}>
              {translateUi(
                'ui.sections.account.privacy_protection.alternateloginmethod.enter_your_security_key_pin_to_proceed_securely_ec4552da',
              )}
            </Typography>
          </>
        }
        open={open}
        handleDialogClose={() => setOpen(false)}
        onSubmit={onSubmit}
        sx={{
          maxWidth: 463,
        }}
      >
        <Stack sx={{ gap: 1, px: 0.125, pb: 0.125 }}>
          <PasswordTextField
            placeholder={translateUi(
              'ui.sections.account.privacy_protection.alternateloginmethod.current_security_key_pin_23d003bf',
            )}
            label={translateUi(
              'ui.sections.account.privacy_protection.alternateloginmethod.current_security_key_pin_23d003bf',
            )}
            error={!!errors.currentSecurityKey}
            helperText={errors.currentSecurityKey?.message}
            {...register('currentSecurityKey')}
          />
          <PasswordTextField
            placeholder={translateUi(
              'ui.sections.account.privacy_protection.alternateloginmethod.new_security_key_pin_f94b743b',
            )}
            label={translateUi(
              'ui.sections.account.privacy_protection.alternateloginmethod.new_security_key_pin_f94b743b',
            )}
            error={!!errors.newSecurityKey}
            helperText={errors.newSecurityKey?.message}
            {...register('newSecurityKey')}
          />
          <PasswordTextField
            placeholder={translateUi(
              'ui.sections.account.privacy_protection.alternateloginmethod.confirm_security_key_pin_2fa5a729',
            )}
            label={translateUi(
              'ui.sections.account.privacy_protection.alternateloginmethod.confirm_security_key_pin_2fa5a729',
            )}
            error={!!errors.confirmSecurityKey}
            helperText={errors.confirmSecurityKey?.message}
            {...register('confirmSecurityKey')}
          />
        </Stack>
      </AccountFormDialog>
    </FormProvider>
  );
};

export default AlternateLoginMethod;
