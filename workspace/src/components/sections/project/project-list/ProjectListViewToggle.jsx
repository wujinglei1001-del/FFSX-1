import { memo } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import i18n from 'locales/i18n';
import IconifyIcon from 'components/base/IconifyIcon';

const viewToggleGroupSx = {
  borderRadius: 3,
  gap: 0.5,
  p: 0.5,
  '& .MuiToggleButton-root': {
    border: 'none',
    borderRadius: 2.5,
    marginLeft: '0 !important',
    '&.Mui-selected': {
      borderRadius: 2.5,
    },
  },
};

const ProjectListViewToggle = ({ viewType, onViewTypeChange }) => (
  <ToggleButtonGroup
    color="primary"
    value={viewType}
    exclusive
    onChange={(_event, newViewType) => {
      if (newViewType !== null) {
        onViewTypeChange(newViewType);
      }
    }}
    sx={viewToggleGroupSx}
  >
    <ToggleButton
      value="list"
      aria-label={i18n.t(
        'ui.sections.project.project_list.projectlistviewtoggle.list_view_694bbd75',
      )}
    >
      <IconifyIcon
        icon="material-symbols:view-list-outline-rounded"
        color={viewType === 'list' ? 'primary.dark' : 'text.secondary'}
        fontSize={20}
      />
    </ToggleButton>
    <ToggleButton
      value="grid"
      aria-label={i18n.t(
        'ui.sections.project.project_list.projectlistviewtoggle.grid_view_d44ec861',
      )}
    >
      <IconifyIcon
        icon="material-symbols:grid-view-outline-rounded"
        color={viewType === 'grid' ? 'primary.dark' : 'text.secondary'}
        fontSize={20}
      />
    </ToggleButton>
  </ToggleButtonGroup>
);

export default memo(ProjectListViewToggle);
