import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Slider,
  Stack,
  Typography,
  checkboxClasses,
  formControlLabelClasses,
  formLabelClasses,
  styled,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import StyledTextField from 'components/styled/StyledTextField';

const FilterDrawerContent = ({ handleClose }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Box
      component="aside"
      sx={{
        px: 3,
        py: 2,
      }}
    >
      <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">
          {translateUi('ui.sections.member.member_list.filter_drawer.filter_d7decf1a')}
        </Typography>
        <Button shape="circle" color="neutral" onClick={handleClose}>
          <IconifyIcon icon="material-symbols:close-rounded" sx={{ fontSize: 20 }} />
        </Button>
      </Stack>
      <Stack
        sx={{
          gap: 1,
        }}
      >
        <FilterSelectField
          label={translateUi('ui.sections.member.member_list.filter_drawer.department_db40106a')}
          options={[
            {
              label: translateUi('ui.sections.member.member_list.filter_drawer.all_6a720856'),
              value: 'all',
            },
            {
              label: translateUi('ui.sections.member.member_list.filter_drawer.design_59b03536'),
              value: 'design',
            },
            {
              label: translateUi(
                'ui.sections.member.member_list.filter_drawer.engineering_4143d048',
              ),
              value: 'engineering',
            },
            { label: 'HR', value: 'hr' },
            {
              label: translateUi('ui.sections.member.member_list.filter_drawer.marketing_e0c534a0'),
              value: 'marketing',
            },
          ]}
        />
        <FilterSelectField
          label={translateUi('ui.sections.member.member_list.filter_drawer.team_21888726')}
          options={[
            {
              label: translateUi('ui.sections.member.member_list.filter_drawer.all_6a720856'),
              value: 0,
            },
            {
              label: translateUi('ui.sections.member.member_list.filter_drawer.one_go_39f8d804'),
              value: 1,
            },
            {
              label: translateUi(
                'ui.sections.member.member_list.filter_drawer.codecrafters_365929bd',
              ),
              value: 2,
            },
            {
              label: translateUi(
                'ui.sections.member.member_list.filter_drawer.kernel_kings_73f4eed6',
              ),
              value: 3,
            },
            {
              label: translateUi(
                'ui.sections.member.member_list.filter_drawer.brainy_bytes_0a14ff24',
              ),
              value: 4,
            },
            {
              label: translateUi(
                'ui.sections.member.member_list.filter_drawer.pixel_thinkers_99f07eb7',
              ),
              value: 5,
            },
          ]}
        />

        <FilterFieldset
          label={translateUi('ui.sections.member.member_list.filter_drawer.employment_a6f12fd7')}
          options={[
            {
              label: translateUi('ui.sections.member.member_list.filter_drawer.full_time_5fbd8fde'),
              value: false,
            },
            {
              label: translateUi('ui.sections.member.member_list.filter_drawer.part_time_c5a1ba67'),
              value: false,
            },
            {
              label: translateUi('ui.sections.member.member_list.filter_drawer.intern_f841f984'),
              value: false,
            },
            {
              label: translateUi(
                'ui.sections.member.member_list.filter_drawer.contractor_76bb2328',
              ),
              value: false,
            },
          ]}
        />

        <FilterFieldset
          label={translateUi('ui.sections.member.member_list.filter_drawer.status_bae7d5be')}
          options={[
            {
              label: translateUi('ui.sections.member.member_list.filter_drawer.active_a733b809'),
              value: false,
            },
            {
              label: translateUi('ui.sections.member.member_list.filter_drawer.probation_70168673'),
              value: false,
            },
            {
              label: translateUi('ui.sections.member.member_list.filter_drawer.contract_5a0ba3bb'),
              value: false,
            },
            {
              label: translateUi('ui.sections.member.member_list.filter_drawer.intern_f841f984'),
              value: false,
            },
            {
              label: translateUi('ui.sections.member.member_list.filter_drawer.resigned_6eac413a'),
              value: false,
            },
          ]}
        />

        <FilterFieldset
          label={translateUi('ui.sections.member.member_list.filter_drawer.gender_8a754c61')}
          options={[
            {
              label: translateUi('ui.sections.member.member_list.filter_drawer.male_3f3a489c'),
              value: false,
            },
            {
              label: translateUi('ui.sections.member.member_list.filter_drawer.female_b7c17e97'),
              value: false,
            },
            {
              label: translateUi('ui.sections.member.member_list.filter_drawer.other_6e6a6f20'),
              value: false,
            },
          ]}
        />

        <FilterFieldset
          label={translateUi('ui.sections.member.member_list.filter_drawer.religion_b04d58c6')}
          options={[
            {
              label: translateUi('ui.sections.member.member_list.filter_drawer.islam_4f910da1'),
              value: false,
            },
            {
              label: translateUi('ui.sections.member.member_list.filter_drawer.hinduism_df9d0c63'),
              value: false,
            },
            {
              label: translateUi(
                'ui.sections.member.member_list.filter_drawer.christianity_59d48ff3',
              ),
              value: false,
            },
            {
              label: translateUi('ui.sections.member.member_list.filter_drawer.buddhism_6eb15e6b'),
              value: false,
            },
            {
              label: translateUi('ui.sections.member.member_list.filter_drawer.other_6e6a6f20'),
              value: false,
            },
          ]}
        />

        <FilterRangeField
          label={translateUi('ui.sections.member.member_list.filter_drawer.pay_range_50224a7c')}
          range={[10, 100]}
          valueText={(value) => `$${value}`}
        />
      </Stack>
    </Box>
  );
};
export default FilterDrawerContent;
const FilterSelectField = ({ label, options, defaultValue = options[0].value }) => {
  return (
    <StyledTextField
      select
      label={label}
      defaultValue={defaultValue}
      fullWidth
      sx={{
        [`& .${formLabelClasses.root}`]: { color: 'text.primary' },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </StyledTextField>
  );
};
const FilterFieldset = ({ label, options }) => {
  const [state, setState] = useState(
    options.reduce(
      (acc, option) => ({
        ...acc,
        [option.label]: option.value,
      }),
      {},
    ),
  );
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  return (
    <FormControl component="fieldset" variant="standard" sx={{ px: 2 }}>
      <StyledFormLabel>{label}</StyledFormLabel>
      <FormGroup sx={{ pl: 2 }}>
        {Object.entries(state).map(([key, value]) => (
          <StyledFormControlLabel
            key={key}
            control={<Checkbox checked={value} onChange={handleChange} name={key} />}
            label={key}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};
const FilterRangeField = ({ label, range, valueText }) => {
  const [value, setValue] = useState(range);
  const handleChange = (_, newValue) => setValue(newValue);
  return (
    <FormControl component="fieldset" variant="standard" sx={{ px: 2 }}>
      <StyledFormLabel>{label}</StyledFormLabel>
      <FormGroup sx={{ pl: 2 }}>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          valueLabelFormat={valueText}
          getAriaValueText={valueText}
        />
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ fontFamily: 'Urbanist', color: 'text.secondary' }}>
            {valueText(range[0])}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Urbanist', color: 'text.secondary' }}>
            {valueText(range[1])}
          </Typography>
        </Stack>
      </FormGroup>
    </FormControl>
  );
};
const StyledFormLabel = styled(FormLabel)(({ theme: { typography, vars, spacing } }) => ({
  fontSize: typography.caption.fontSize,
  fontWeight: 500,
  lineHeight: '14px',
  color: vars.palette.text.primary,
  paddingTop: spacing(1),
  paddingBottom: spacing(1),
}));
const StyledFormControlLabel = styled(FormControlLabel)(({ theme: { typography, spacing } }) => ({
  [`& .${formControlLabelClasses.label}`]: {
    fontSize: typography.caption.fontSize,
    alignSelf: 'center',
    marginTop: '0 !important',
  },
  [`& .${checkboxClasses.root}`]: { padding: spacing(0.875), alignSelf: 'center' },
}));
