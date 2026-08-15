import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { selectClasses } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import StyledTextField from 'components/styled/StyledTextField';

const SortBySelect = () => {
  const { t: translateUi } = useTranslation();
  const [sortBy, setSortBy] = useState('');

  return (
    <StyledTextField
      select
      value={sortBy === '' ? 'sort-by' : sortBy}
      sx={{
        width: 1,
        maxWidth: 137,
        [`& .${selectClasses.select}`]: { fontWeight: sortBy === '' ? 600 : 400 },
      }}
      onChange={(e) => setSortBy(e.target.value)}
      slotProps={{
        select: {
          MenuProps: {
            disableAutoFocusItem: true,
            disableEnforceFocus: true,
          },
        },
      }}
    >
      <MenuItem value="sort-by" disabled sx={{ display: 'none' }}>
        {translateUi('ui.sections.dashboards.hrm.notifications.sort_by_a2a5bdec')}
      </MenuItem>

      {['Latest', 'Oldest', 'High priority'].map((item) => (
        <MenuItem key={item} value={item} autoFocus={false}>
          {item}
        </MenuItem>
      ))}
    </StyledTextField>
  );
};

export default SortBySelect;
