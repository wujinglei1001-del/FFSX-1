import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { users } from 'data/users';
import i18n from 'locales/i18n';
import IconifyIcon from 'components/base/IconifyIcon';
import StyledTextField from 'components/styled/StyledTextField';

const teamOptions = [
  {
    value: 'engineering',
    get label() {
      return i18n.t('ui.sections.project.create_project.steps.engineering_4143d048');
    },
  },
  {
    value: 'design',
    get label() {
      return i18n.t('ui.sections.project.create_project.steps.design_59b03536');
    },
  },
  {
    value: 'marketing',
    get label() {
      return i18n.t('ui.sections.project.create_project.steps.marketing_e0c534a0');
    },
  },
];

const InviteMembers = () => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'collaborators',
  });

  const collaborators = useWatch({ control, name: 'collaborators' }) ?? [];

  const selectedUserIds = new Set();
  collaborators.forEach((collaborator) => {
    if (typeof collaborator?.userId === 'number') {
      selectedUserIds.add(collaborator.userId);
    }
  });

  const getSelectedOption = (userId) => {
    if (typeof userId !== 'number') return null;
    return users.find((user) => user.id === userId) ?? null;
  };

  const getSelectableOptions = (currentSelectedUserId) =>
    users.filter((user) => !selectedUserIds.has(user.id) || user.id === currentSelectedUserId);

  return (
    <Stack sx={{ gap: 3 }}>
      <Controller
        name="teamId"
        control={control}
        render={({ field }) => (
          <StyledTextField
            select
            fullWidth
            size="medium"
            value={field.value ?? ''}
            onChange={field.onChange}
            slotProps={{
              select: {
                displayEmpty: true,
                renderValue: (selected) => (selected ? String(selected) : 'Select a team'),
              },
            }}
          >
            <MenuItem value="" disabled>
              {translateUi('ui.sections.project.create_project.steps.select_a_team_dd6d4924')}
            </MenuItem>
            {teamOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </StyledTextField>
        )}
      />
      <div>
        <Typography
          variant="subtitle2"
          sx={{
            color: 'text.secondary',
            mb: 3,
          }}
        >
          {translateUi(
            'ui.sections.project.create_project.steps.and_or_invite_individual_members_3751c31e',
          )}
        </Typography>

        <Stack sx={{ gap: 1, mt: 2 }}>
          {fields.map((field, index) => {
            const currentSelectedUserId = collaborators[index]?.userId;
            const selectableOptions = getSelectableOptions(currentSelectedUserId);
            const selectedOption = getSelectedOption(currentSelectedUserId);

            return (
              <Stack
                key={field.id}
                direction="row"
                sx={{
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <Controller
                  control={control}
                  name={`collaborators.${index}`}
                  render={({ field: collaboratorField }) => (
                    <Autocomplete
                      disableClearable
                      disablePortal={false}
                      noOptionsText={translateUi(
                        'ui.sections.project.create_project.steps.user_not_found_01eb9469',
                      )}
                      options={selectableOptions}
                      popupIcon={null}
                      isOptionEqualToValue={(option, value) => option.id === value?.id}
                      value={selectedOption}
                      onChange={(_, value) => {
                        collaboratorField.onChange(
                          value
                            ? {
                                email: value.email,
                                userId: value.id,
                                name: value.name,
                                avatar: value.avatar,
                              }
                            : { email: '', userId: undefined, name: '', avatar: '' },
                        );
                      }}
                      getOptionLabel={(option) => option.email}
                      renderOption={(props, option) => {
                        const { key, ...rest } = props;
                        return (
                          <Box component="li" key={key} {...rest}>
                            <Avatar src={option.avatar} sx={{ mr: 1, width: 28, height: 28 }} />
                            <div>
                              <Typography variant="subtitle2">{option.name}</Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: 'text.secondary',
                                }}
                              >
                                {option.email}
                              </Typography>
                            </div>
                          </Box>
                        );
                      }}
                      renderInput={(params) => (
                        <StyledTextField
                          {...params}
                          placeholder={translateUi(
                            'ui.sections.project.create_project.steps.select_a_member_6d593674',
                          )}
                          error={Boolean(errors.collaborators?.[index]?.email)}
                          helperText={errors.collaborators?.[index]?.email?.message}
                        />
                      )}
                      sx={{ flex: 1 }}
                    />
                  )}
                />
                <IconButton
                  aria-label={translateUi(
                    'ui.sections.project.create_project.steps.remove_member_1c31d1d2',
                  )}
                  onClick={() => remove(index)}
                  disabled={fields.length <= 1}
                  sx={{ color: 'text.primary' }}
                >
                  <IconifyIcon icon="material-symbols:close-rounded" fontSize={20} />
                </IconButton>
              </Stack>
            );
          })}
        </Stack>

        <Button
          variant="text"
          color="primary"
          sx={{ alignSelf: 'flex-start', mt: 2 }}
          startIcon={<IconifyIcon icon="material-symbols:add-rounded" fontSize={20} />}
          onClick={() => append({ email: '', userId: undefined, name: '', avatar: '' })}
        >
          {translateUi('ui.sections.project.create_project.steps.add_another_e9e7205b')}
        </Button>
      </div>
    </Stack>
  );
};

export default InviteMembers;
