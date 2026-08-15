import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  formControlLabelClasses,
} from '@mui/material';
import i18n from 'locales/i18n';
import * as yup from 'yup';

export const basicInfoFormSchema = yup.object().shape({
  name: yup
    .string()
    .required(i18n.t('ui.sections.kanban.create_board.steps.name_is_required_222c72b1')),
  boardType: yup
    .string()
    .required(i18n.t('ui.sections.kanban.create_board.steps.board_type_is_required_f23633b3')),
  visibility: yup
    .string()
    .oneOf(
      ['private', 'public'],
      i18n.t('ui.sections.kanban.create_board.steps.invalid_visibility_63bcc5aa'),
    )
    .required(i18n.t('ui.sections.kanban.create_board.steps.visibility_is_required_f0c279ed')),
  allowGuest: yup.boolean(),
  description: yup.string(),
});

const BasicInfo = () => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <Stack sx={{ gap: 3 }}>
      <TextField
        fullWidth
        id="name"
        label={translateUi('ui.sections.kanban.create_board.steps.name_of_board_6022f151')}
        variant="filled"
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register('name')}
      />
      <FormControl fullWidth variant="filled" error={!!errors.boardType}>
        <InputLabel id="board-type-label">
          {translateUi('ui.sections.kanban.create_board.steps.board_type_c2bbccd7')}
        </InputLabel>
        <Controller
          name="boardType"
          control={control}
          render={({ field }) => (
            <Select
              labelId="board-type-label"
              displayEmpty
              inputProps={{ 'aria-label': 'Board Type' }}
              {...field}
            >
              <MenuItem value="basic">
                {translateUi('ui.sections.kanban.create_board.steps.basic_aa2c96da')}
              </MenuItem>
              <MenuItem value="agile">
                {translateUi('ui.sections.kanban.create_board.steps.agile_21600914')}
              </MenuItem>
              <MenuItem value="marketing">
                {translateUi('ui.sections.kanban.create_board.steps.marketing_e0c534a0')}
              </MenuItem>
              <MenuItem value="hr">
                {translateUi('ui.sections.kanban.create_board.steps.hr_onboarding_c55465c2')}
              </MenuItem>
              <MenuItem value="team">
                {translateUi('ui.sections.kanban.create_board.steps.team_collaboration_aee94383')}
              </MenuItem>
            </Select>
          )}
        />
        {errors.boardType && <FormHelperText>{errors.boardType?.message}</FormHelperText>}
      </FormControl>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <FormControl component="fieldset" error={!!errors.visibility}>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Controller
              name="visibility"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup
                  sx={{
                    color: 'text.secondary',
                    flexDirection: 'row',
                    gap: { xs: 1, sm: 3 },
                    [`& .${formControlLabelClasses.root}`]: { mr: 0 },
                    [`& .${formControlLabelClasses.label}`]: { ml: '3px' },
                  }}
                  {...field}
                  value={field.value || 'private'}
                >
                  <FormControlLabel
                    value="private"
                    control={<Radio />}
                    label={translateUi('ui.sections.kanban.create_board.steps.private_237dfa0a')}
                  />
                  <FormControlLabel
                    value="public"
                    control={<Radio />}
                    label={translateUi('ui.sections.kanban.create_board.steps.public_dc5eb704')}
                  />
                </RadioGroup>
              )}
            />
          </Stack>
          {errors.visibility && <FormHelperText>{errors.visibility.message}</FormHelperText>}
        </FormControl>
        <FormControl component="fieldset" variant="filled" sx={{ flexShrink: 0 }}>
          <FormControlLabel
            sx={{ mr: 0 }}
            control={
              <Controller
                name="allowGuest"
                control={control}
                render={({ field }) => <Checkbox checked={field.value} {...field} />}
              />
            }
            label={
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'text.secondary',
                  ml: '3px',
                }}
              >
                {translateUi('ui.sections.kanban.create_board.steps.allow_guest_d8da8f5e')}
              </Typography>
            }
          />
        </FormControl>
      </Stack>
      <TextField
        fullWidth
        label={
          <Typography variant="subtitle2">
            {translateUi('ui.sections.kanban.create_board.steps.description_optional_f1da5c02')}
          </Typography>
        }
        variant="filled"
        multiline
        minRows={3}
        maxRows={6}
        error={!!errors.description}
        helperText={errors.description && errors.description.message}
        {...register('description')}
      />
    </Stack>
  );
};

export default BasicInfo;
