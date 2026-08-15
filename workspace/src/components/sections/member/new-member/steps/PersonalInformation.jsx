import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import AvatarDropBox from 'components/base/AvatarDropBox';

export const personalInformationSchema = yup.object({
  avatar: yup.mixed(),
  firstName: yup
    .string()
    .required(i18n.t('ui.sections.member.new_member.steps.first_name_is_required_6ae3e6ac')),
  lastName: yup
    .string()
    .required(i18n.t('ui.sections.member.new_member.steps.last_name_is_required_ec032cfa')),
  displayName: yup
    .string()
    .required(i18n.t('ui.sections.member.new_member.steps.display_name_is_required_6b943f16')),
  idNo: yup
    .string()
    .required(i18n.t('ui.sections.member.new_member.steps.id_no_is_required_66ec17da')),
  birthday: yup
    .date()
    .required(i18n.t('ui.sections.member.new_member.steps.birth_date_is_required_b3065e4a')),
  religion: yup
    .string()
    .required(i18n.t('ui.sections.member.new_member.steps.religion_is_required_087cbf4f')),
  gender: yup.string().oneOf(['male', 'female', 'other']).required(),
  maritalStatus: yup.string().oneOf(['single', 'married']).required(),
});
const PersonalInformation = () => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Stack
      sx={{
        gap: 4,
      }}
    >
      <Box sx={{ alignSelf: 'center' }}>
        <Controller
          control={control}
          name="avatar"
          render={({ field: { value, onChange } }) => {
            return (
              <AvatarDropBox
                defaultFile={value}
                onDrop={(acceptedFiles) => {
                  if (acceptedFiles.length > 0) {
                    onChange(acceptedFiles[0]);
                  }
                }}
                error={errors?.avatar ? 'Invalid avatar' : undefined}
              />
            );
          }}
        />
      </Box>
      <Stack
        sx={{
          gap: 3,
        }}
      >
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid size={6}>
            <TextField
              fullWidth
              label={translateUi('ui.sections.member.new_member.steps.first_name_b6ea992a')}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              {...register('firstName')}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label={translateUi('ui.sections.member.new_member.steps.last_name_863cb39f')}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              {...register('lastName')}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label={translateUi('ui.sections.member.new_member.steps.display_name_8d6b3481')}
              error={!!errors.displayName}
              helperText={errors.displayName?.message}
              {...register('displayName')}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label={translateUi('ui.sections.member.new_member.steps.id_no_2cee330c')}
              error={!!errors.idNo}
              helperText={errors.idNo?.message}
              {...register('idNo')}
            />
          </Grid>
          <Grid size={6}>
            <Controller
              name="birthday"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label={translateUi('ui.sections.member.new_member.steps.birthday_a6b9d69f')}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(val) => field.onChange(dayjs(val?.toDate()).format('MM/DD/YYYY'))}
                  slotProps={{
                    textField: {
                      variant: 'filled',
                      fullWidth: true,
                      error: !!errors.birthday,
                      helperText: errors.birthday?.message,
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              select
              label={translateUi('ui.sections.member.new_member.steps.religion_b04d58c6')}
              defaultValue=""
              error={!!errors.religion}
              helperText={errors.religion?.message}
              {...register('religion')}
            >
              <MenuItem value="" disabled>
                {translateUi('ui.sections.member.new_member.steps.select_85982229')}
              </MenuItem>
              <MenuItem value="Islam">
                {translateUi('ui.sections.member.new_member.steps.islam_4f910da1')}
              </MenuItem>
              <MenuItem value="Hinduism">
                {translateUi('ui.sections.member.new_member.steps.hinduism_df9d0c63')}
              </MenuItem>
              <MenuItem value="Christianity">
                {translateUi('ui.sections.member.new_member.steps.christianity_59d48ff3')}
              </MenuItem>
              <MenuItem value="Buddhism">
                {translateUi('ui.sections.member.new_member.steps.buddhism_6eb15e6b')}
              </MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <FormControl>
          <FormLabel
            id="gender-radio-buttons-group-label"
            sx={{
              typography: 'caption',
              fontWeight: 500,
              color: 'text.primary',
            }}
          >
            {translateUi('ui.sections.member.new_member.steps.gender_8a754c61')}
          </FormLabel>
          <Controller
            control={control}
            name="gender"
            defaultValue="male"
            render={({ field }) => (
              <RadioGroup row aria-labelledby="gender-radio-buttons-group-label" {...field}>
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label={translateUi('ui.sections.member.new_member.steps.male_3f3a489c')}
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label={translateUi('ui.sections.member.new_member.steps.female_b7c17e97')}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label={translateUi('ui.sections.member.new_member.steps.other_6e6a6f20')}
                />
              </RadioGroup>
            )}
          />
        </FormControl>
        <FormControl>
          <FormLabel
            id="marital-status-radio-buttons-group-label"
            sx={{
              typography: 'caption',
              fontWeight: 500,
              color: 'text.primary',
            }}
          >
            {translateUi('ui.sections.member.new_member.steps.marital_status_e65f7360')}
          </FormLabel>
          <Controller
            control={control}
            name="maritalStatus"
            defaultValue="single"
            render={({ field }) => (
              <RadioGroup row aria-labelledby="marital-status-radio-buttons-group-label" {...field}>
                <FormControlLabel
                  value="single"
                  control={<Radio />}
                  label={translateUi('ui.sections.member.new_member.steps.single_dd118689')}
                />
                <FormControlLabel
                  value="married"
                  control={<Radio />}
                  label={translateUi('ui.sections.member.new_member.steps.married_c75a2b42')}
                />
              </RadioGroup>
            )}
          />
        </FormControl>
      </Stack>
    </Stack>
  );
};
export default PersonalInformation;
