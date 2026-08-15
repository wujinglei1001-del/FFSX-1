import { useTranslation } from 'react-i18next';
import { MenuItem, inputLabelClasses } from '@mui/material';
import StyledTextField from 'components/styled/StyledTextField';

const FilterSelect = ({ label, options }) => {
  const { t: translateUi } = useTranslation();
  return (
    <StyledTextField
      select
      fullWidth
      defaultValue={0}
      label={label}
      sx={{ [`& .${inputLabelClasses.root}`]: { color: 'text.primary' } }}
    >
      <MenuItem value={0} disabled>
        {translateUi('ui.sections.time_tracker.common.filterselect.select_85982229')}
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
