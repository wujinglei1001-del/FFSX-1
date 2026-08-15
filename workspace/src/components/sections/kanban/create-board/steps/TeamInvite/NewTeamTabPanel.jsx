import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TabPanel } from '@mui/lab';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  FormHelperText,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import NewTeamTable from 'components/sections/kanban/create-board/steps/TeamInvite/NewTeamTable';
import StyledTextField from 'components/styled/StyledTextField';

export const newTeamFormSchema = yup.object().shape({
  team: yup.array().of(
    yup.object().shape({
      name: yup.string(),
      email: yup
        .string()
        .email(i18n.t('ui.sections.kanban.create_board.steps.invalid_email_format_789ec25c')),
      role: yup
        .string()
        .oneOf(
          ['Member', 'Admin', 'Guest'],
          i18n.t('ui.sections.kanban.create_board.steps.invalid_role_1106375b'),
        )
        .required(i18n.t('ui.sections.kanban.create_board.steps.role_is_required_71b13fd9')),
    }),
  ),
});
const NewTeamTabPanel = ({ value, options }) => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'team',
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [customEmail, setCustomEmail] = useState(null);
  const handleAddRow = () => {
    const emailToUse = selectedUser?.email || customEmail;
    if (!emailToUse) {
      setError('root', {
        type: 'custom',
        message: translateUi(
          'ui.sections.kanban.create_board.steps.please_provide_a_valid_email_address_09016875',
        ),
      });
      return;
    }
    if (!yup.string().email().isValidSync(emailToUse)) {
      setError('root', {
        type: 'custom',
        message: translateUi('ui.sections.kanban.create_board.steps.invalid_email_format_3cc69c8a'),
      });
      return;
    }
    const isDuplicate = fields.some((member) => member.email === emailToUse);
    if (isDuplicate) {
      setError('root', {
        type: 'custom',
        message: translateUi(
          'ui.sections.kanban.create_board.steps.this_user_is_already_added_to_the_team_3c930078',
        ),
      });
      return;
    }
    append({
      name: selectedUser?.name || '',
      email: emailToUse,
      avatar: selectedUser?.avatar || '',
      role: 'Guest',
    });
    setSelectedUser(null);
    setCustomEmail('');
  };
  return (
    <TabPanel value={value} sx={{ px: 0, pb: 0 }}>
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" sx={{ gap: 1 }}>
          <Autocomplete
            id="user-select"
            freeSolo
            options={options}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.email || '')}
            value={selectedUser}
            inputValue={customEmail || ''}
            onInputChange={(_, inputValue) => {
              clearErrors('root');
              setCustomEmail(inputValue);
            }}
            onChange={(_, value) => {
              if (typeof value !== 'string') {
                setSelectedUser(value);
                setCustomEmail('');
              } else {
                setSelectedUser(null);
                setCustomEmail(value);
              }
            }}
            renderOption={(props, option) => {
              const { key, ...rest } = props;
              return (
                <Box key={key} component="li" {...rest}>
                  <Avatar src={option.avatar} sx={{ mr: 1 }} />
                  <div>
                    <Typography variant="subtitle1">{option.name || 'Unknown User'}</Typography>
                    <Typography variant="caption">{option.email}</Typography>
                  </div>
                </Box>
              );
            }}
            renderInput={(params) => (
              <StyledTextField
                {...params}
                placeholder={translateUi(
                  'ui.sections.kanban.create_board.steps.user_id_or_email_address_f3b90c03',
                )}
                slotProps={{
                  ...params.slotProps,
                  input: {
                    ...params.slotProps.input,
                    startAdornment: (
                      <InputAdornment position="start" sx={{ mr: 0 }}>
                        <IconifyIcon
                          icon="material-symbols:account-circle"
                          sx={{ color: 'text.secondary' }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
            sx={{ flexGrow: 1 }}
          />

          <Button
            variant="contained"
            color="neutral"
            onClick={handleAddRow}
            disabled={!selectedUser && !customEmail}
            sx={{ px: { xs: 3.5, md: 5.5 } }}
          >
            {translateUi('ui.sections.kanban.create_board.steps.add_61cc55aa')}
          </Button>
        </Stack>
        {errors.root && <FormHelperText error>{errors.root?.message}</FormHelperText>}
      </Box>
      <NewTeamTable fields={fields} remove={remove} />
    </TabPanel>
  );
};
export default NewTeamTabPanel;
