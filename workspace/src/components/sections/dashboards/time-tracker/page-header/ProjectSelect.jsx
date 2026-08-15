import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MenuItem from '@mui/material/MenuItem';
import { timesheet } from 'data/time-tracker/dashboard';
import StyledTextField from 'components/styled/StyledTextField';

const ProjectSelect = () => {
  const { t: translateUi } = useTranslation();
  const [project, setProject] = useState('');
  return (
    <StyledTextField
      select
      value={project === '' ? 'work-type' : project}
      onChange={(e) => setProject(e.target.value)}
      slotProps={{
        select: {
          MenuProps: {
            disableAutoFocusItem: true,
            disableEnforceFocus: true,
            slotProps: {
              paper: {
                sx: {
                  maxHeight: 300,
                  overflowY: 'auto',
                },
              },
            },
          },
        },
      }}
      sx={{ width: 1, maxWidth: { xs: 1, md: 500 } }}
    >
      <MenuItem value="work-type" disabled sx={{ display: 'none' }}>
        {translateUi(
          'ui.sections.dashboards.time_tracker.page_header.what_are_you_working_on_cdfc7b83',
        )}
      </MenuItem>

      {timesheet.map((item) => (
        <MenuItem key={item.id} value={item.project} autoFocus={false}>
          {item.project}
        </MenuItem>
      ))}
    </StyledTextField>
  );
};
export default ProjectSelect;
