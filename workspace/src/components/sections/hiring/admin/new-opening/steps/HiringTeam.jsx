import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';

export const hiringTeamSchema = yup.object({
  hiringManager: yup.object({
    employee: yup.string().required(),
    department: yup.string().required(),
  }),
  teamMember: yup.array().of(
    yup.object({
      employee: yup.string().required(),
      department: yup.string().required(),
    }),
  ),
});

const HiringTeam = () => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const teamMembers = useFieldArray({
    control,
    name: 'teamMember',
  });

  return (
    <Stack
      sx={{
        gap: 3,
      }}
    >
      <Stack
        sx={{
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
          }}
        >
          {translateUi('ui.sections.hiring.admin.new_opening.hiring_manager_440641fc')}
        </Typography>
        <Stack
          direction="row"
          sx={{
            gap: 1,
          }}
        >
          <FormControl variant="filled" fullWidth error={!!errors.hiringManager?.employee}>
            <InputLabel id="hiring-manager-employee-label">
              {translateUi('ui.sections.hiring.admin.new_opening.employee_079711ea')}
            </InputLabel>
            <Controller
              control={control}
              name="hiringManager.employee"
              render={({ field }) => (
                <Select
                  labelId="hiring-manager-employee-label"
                  label={translateUi('ui.sections.hiring.admin.new_opening.employee_079711ea')}
                  inputProps={{ 'aria-label': 'Without label' }}
                  {...field}
                >
                  <MenuItem value="Michael Hall">
                    {translateUi('ui.sections.hiring.admin.new_opening.michael_hall_2948bbff')}
                  </MenuItem>
                  <MenuItem value="Jack Smith">
                    {translateUi('ui.sections.hiring.admin.new_opening.jack_smith_0f48ecc5')}
                  </MenuItem>
                  <MenuItem value="Grace Wong">
                    {translateUi('ui.sections.hiring.admin.new_opening.grace_wong_1324df4b')}
                  </MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.hiringManager?.employee?.message}</FormHelperText>
          </FormControl>
          <FormControl variant="filled" fullWidth error={!!errors.hiringManager?.department}>
            <InputLabel id="hiring-manager-department-label">
              {translateUi('ui.sections.hiring.admin.new_opening.department_db40106a')}
            </InputLabel>
            <Controller
              control={control}
              name="hiringManager.department"
              render={({ field }) => (
                <Select
                  labelId="hiring-manager-department-label"
                  label={translateUi('ui.sections.hiring.admin.new_opening.department_db40106a')}
                  inputProps={{ 'aria-label': 'Without label' }}
                  {...field}
                >
                  <MenuItem value="Support">
                    {translateUi('ui.sections.hiring.admin.new_opening.support_f32d5a3b')}
                  </MenuItem>
                  <MenuItem value="Sales">
                    {translateUi('ui.sections.hiring.admin.new_opening.sales_d0edfb6e')}
                  </MenuItem>
                  <MenuItem value="Data & Analytics">
                    {translateUi('ui.sections.hiring.admin.new_opening.data_analytics_7113d51a')}
                  </MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.hiringManager?.department?.message}</FormHelperText>
          </FormControl>
        </Stack>
      </Stack>
      <Stack
        sx={{
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
          }}
        >
          {translateUi('ui.sections.hiring.admin.new_opening.team_member_7b9159e0')}
        </Typography>
        {teamMembers.fields.map((field, index) => (
          <Stack
            key={field.id}
            direction="row"
            sx={{
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Stack
              direction="row"
              sx={{
                gap: 1,
                width: 1,
                alignItems: 'center',
              }}
            >
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.teamMember?.[index]?.employee}
              >
                <InputLabel id="team-member-employee-label">
                  {translateUi('ui.sections.hiring.admin.new_opening.employee_079711ea')}
                </InputLabel>
                <Controller
                  control={control}
                  name={`teamMember.${index}.employee`}
                  render={({ field }) => (
                    <Select
                      labelId="team-member-employee-label"
                      label={translateUi('ui.sections.hiring.admin.new_opening.employee_079711ea')}
                      inputProps={{ 'aria-label': 'Without label' }}
                      {...field}
                    >
                      <MenuItem value="Michael Hall">
                        {translateUi('ui.sections.hiring.admin.new_opening.michael_hall_2948bbff')}
                      </MenuItem>
                      <MenuItem value="Jack Smith">
                        {translateUi('ui.sections.hiring.admin.new_opening.jack_smith_0f48ecc5')}
                      </MenuItem>
                      <MenuItem value="Grace Wong">
                        {translateUi('ui.sections.hiring.admin.new_opening.grace_wong_1324df4b')}
                      </MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>{errors.teamMember?.[index]?.employee?.message}</FormHelperText>
              </FormControl>
              <FormControl
                variant="filled"
                fullWidth
                error={!!errors.teamMember?.[index]?.department}
              >
                <InputLabel id="team-member-department-label">
                  {translateUi('ui.sections.hiring.admin.new_opening.department_db40106a')}
                </InputLabel>
                <Controller
                  control={control}
                  name={`teamMember.${index}.department`}
                  render={({ field }) => (
                    <Select
                      labelId="team-member-department-label"
                      label={translateUi(
                        'ui.sections.hiring.admin.new_opening.department_db40106a',
                      )}
                      inputProps={{ 'aria-label': 'Without label' }}
                      {...field}
                    >
                      <MenuItem value="Support">
                        {translateUi('ui.sections.hiring.admin.new_opening.support_f32d5a3b')}
                      </MenuItem>
                      <MenuItem value="Sales">
                        {translateUi('ui.sections.hiring.admin.new_opening.sales_d0edfb6e')}
                      </MenuItem>
                      <MenuItem value="Data & Analytics">
                        {translateUi(
                          'ui.sections.hiring.admin.new_opening.data_analytics_7113d51a',
                        )}
                      </MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>{errors.teamMember?.[index]?.department?.message}</FormHelperText>
              </FormControl>
            </Stack>

            <Button shape="square" color="error" onClick={() => teamMembers.remove(index)}>
              <IconifyIcon icon="material-symbols:close-rounded" sx={{ fontSize: 20 }} />
            </Button>
          </Stack>
        ))}
        <Button
          startIcon={<IconifyIcon icon="material-symbols:add" sx={{ fontSize: 20 }} />}
          onClick={() => teamMembers.append({ employee: '', department: '' })}
          sx={{ alignSelf: 'flex-start' }}
        >
          {translateUi('ui.sections.hiring.admin.new_opening.add_member_fbe4f901')}
        </Button>
      </Stack>
    </Stack>
  );
};

export default HiringTeam;
