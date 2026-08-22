import { MenuItem, inputLabelClasses } from '@mui/material';
import StyledTextField from 'components/styled/StyledTextField';

const FilterSelect = ({ label, options }) => {
  return (
    <StyledTextField
      select
      fullWidth
      defaultValue={0}
      label={label}
      sx={{ [`& .${inputLabelClasses.root}`]: { color: 'text.primary' } }}
    >
      <MenuItem value={0} disabled>
        Select
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </StyledTextField>
  );
};

export default FilterSelect;
