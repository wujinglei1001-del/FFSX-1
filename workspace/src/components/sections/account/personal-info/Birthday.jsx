import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControl, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import { useAccounts } from 'providers/AccountsProvider';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import AccountFormDialog from '../common/AccountFormDialog';
import InfoCard from '../common/InfoCard';
import InfoCardAttribute from '../common/InfoCardAttribute';

const birthdaySchema = yup.object().shape({
  birthDate: yup
    .string()
    .required(i18n.t('ui.sections.account.personal_info.birthday.birth_date_is_required_b3065e4a')),
});
const Birthday = () => {
  const { t: translateUi } = useTranslation();
  const [open, setOpen] = useState(false);
  const { personalInfo } = useAccounts();
  const { up } = useBreakpoints();
  const { enqueueSnackbar } = useSnackbar();
  const [currentBirthDate, setCurrentBirthDate] = useState(personalInfo.birthDate);
  const methods = useForm({
    defaultValues: {
      birthDate: currentBirthDate,
      visibility: 'only_me',
    },
    resolver: yupResolver(birthdaySchema),
  });
  const {
    control,
    reset,
    getValues,
    formState: { errors },
  } = methods;
  const upSm = up('sm');
  const onSubmit = (data) => {
    console.log(data);
    const updatedData = getValues();
    setCurrentBirthDate(updatedData.birthDate);
    setOpen(false);
    enqueueSnackbar('Updated successfully!', { variant: 'success', autoHideDuration: 3000 });
  };
  const handleDiscard = () => {
    reset({ birthDate: currentBirthDate });
    setOpen(false);
  };
  return (
    <FormProvider {...methods}>
      <InfoCard setOpen={setOpen} sx={{ mb: 3 }}>
        <Stack sx={{ gap: { xs: 2, sm: 1 } }}>
          <InfoCardAttribute
            label={translateUi('ui.sections.account.personal_info.birthday.date_eb9a4bc1')}
            value={dayjs(currentBirthDate).format('D MMMM, YYYY')}
          />
        </Stack>
        <IconifyIcon
          icon="material-symbols-light:edit-outline"
          sx={{ fontSize: 20, color: 'neutral.dark', visibility: 'hidden' }}
        />
      </InfoCard>
      <AccountFormDialog
        title={translateUi('ui.sections.account.personal_info.birthday.birthday_a6b9d69f')}
        subtitle={translateUi(
          'ui.sections.account.personal_info.birthday.provide_your_birthday_to_ensure_you_get_the_right_co_33be9236',
        )}
        open={open}
        onSubmit={onSubmit}
        handleDialogClose={() => setOpen(false)}
        handleDiscard={handleDiscard}
        sx={{
          maxWidth: 463,
        }}
      >
        <Stack sx={{ gap: 1 }}>
          <Controller
            control={control}
            name="birthDate"
            render={({ field: { value, ...rest } }) => (
              <DatePicker
                label={translateUi(
                  'ui.sections.account.personal_info.birthday.select_birth_date_8f904ed2',
                )}
                value={dayjs(value)}
                slotProps={{
                  textField: {
                    variant: 'filled',
                    error: !!errors.birthDate,
                    helperText: errors.birthDate?.message,
                    fullWidth: true,
                  },
                  inputAdornment: {
                    position: 'start',
                  },
                }}
                {...rest}
              />
            )}
          />
        </Stack>
      </AccountFormDialog>
      <FormControl sx={{ gap: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          {translateUi(
            'ui.sections.account.personal_info.birthday.who_can_see_your_birthday_0da58bc2',
          )}
        </Typography>
        <Controller
          control={control}
          name="visibility"
          render={({ field }) => (
            <RadioGroup row={upSm} aria-labelledby="birthday-visibility-radio-buttons" {...field}>
              <FormControlLabel
                value="only_me"
                control={<Radio />}
                label={translateUi('ui.sections.account.personal_info.birthday.only_me_7631b141')}
              />
              <FormControlLabel
                value="followers_only"
                control={<Radio />}
                label={translateUi(
                  'ui.sections.account.personal_info.birthday.followers_only_b8cf84c7',
                )}
              />
              <FormControlLabel
                value="everyone"
                control={<Radio />}
                label={translateUi('ui.sections.account.personal_info.birthday.everyone_c756f6af')}
              />
            </RadioGroup>
          )}
        />
      </FormControl>
    </FormProvider>
  );
};
export default Birthday;
