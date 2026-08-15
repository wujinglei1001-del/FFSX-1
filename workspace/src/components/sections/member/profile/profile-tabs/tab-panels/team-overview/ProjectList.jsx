import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  AvatarGroup,
  Button,
  Chip,
  Stack,
  Tooltip,
  Typography,
  avatarClasses,
} from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import i18n from 'locales/i18n';
import IconifyIcon from 'components/base/IconifyIcon';
import DashboardMenu from 'components/common/DashboardMenu';
import DataGridPagination from 'components/pagination/DataGridPagination';

const getStatusChipColor = (status) => {
  switch (status) {
    case 'Doing':
      return 'primary';
    case 'To do':
      return 'neutral';
    case 'Done':
      return 'success';
  }
};
const columnDefs = [
  {
    field: 'name',
    get headerName() {
      return i18n.t('ui.sections.member.profile.profile_tabs.project_name_5f950764');
    },
    headerClassName: 'name-header',
    cellClassName: 'name-cell',
    flex: 2.4,
    minWidth: 200,
    valueGetter: ({ name }) => name,
    renderCell: (params) => <Typography variant="body2">{params.row.name}</Typography>,
  },
  {
    field: 'team',
    get headerName() {
      return i18n.t('ui.sections.member.profile.profile_tabs.team_21888726');
    },
    headerClassName: 'team-header',
    cellClassName: 'team-cell',
    flex: 1.26,
    minWidth: 100,
    valueGetter: ({ team }) => team,
    renderCell: (params) => <Typography variant="subtitle2">{params.row.team}</Typography>,
  },
  {
    field: 'collaborators',
    get headerName() {
      return i18n.t('ui.sections.member.profile.profile_tabs.collaborators_6eb695e5');
    },
    headerClassName: 'collaborators-header',
    cellClassName: 'collaborators-cell',
    sortable: false,
    filterable: false,
    flex: 1.4,
    minWidth: 130,
    renderCell: (params) => (
      <AvatarGroup
        max={5}
        sx={{
          [`& .${avatarClasses.root}`]: { width: 24, height: 24, fontSize: 12 },
        }}
      >
        {params.row.collaborators.map((collaborator) => (
          <Tooltip key={collaborator.id} title={collaborator.name}>
            <Avatar src={collaborator.avatar} sx={{ width: 24, height: 24 }} />
          </Tooltip>
        ))}
      </AvatarGroup>
    ),
  },
  {
    field: 'status',
    get headerName() {
      return i18n.t('ui.sections.member.profile.profile_tabs.status_bae7d5be');
    },
    headerClassName: 'status-header',
    cellClassName: 'status-cell',
    flex: 1,
    minWidth: 100,
    renderCell: (params) => (
      <Chip label={params.row.status} color={getStatusChipColor(params.row.status)} />
    ),
  },
  {
    field: 'lastOpened',
    get headerName() {
      return i18n.t('ui.sections.member.profile.profile_tabs.last_opened_6674c9e5');
    },
    headerClassName: 'last-opened-header',
    cellClassName: 'last-opened-cell',
    sortable: false,
    filterable: false,
    flex: 1.26,
    minWidth: 120,
    renderCell: (params) => (
      <Typography variant="body2">{dayjs(params.row.lastOpened).fromNow()}</Typography>
    ),
  },
  {
    field: 'action',
    headerName: '',
    sortable: false,
    headerClassName: 'action-header',
    cellClassName: 'action-cell',
    width: 60,
    align: 'right',
    headerAlign: 'right',
    renderHeader: () => <DashboardMenu />,
    renderCell: () => <DashboardMenu />,
  },
];
const ProjectList = ({ data }) => {
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const apiRef = useGridApiRef();
  const columns = useMemo(() => columnDefs, [getStatusChipColor, dayjs]);
  const handleToggleFilterPanel = (e) => {
    const clickedEl = e.currentTarget;
    if (filterButtonEl && filterButtonEl === clickedEl) {
      setFilterButtonEl(null);
      apiRef.current?.hideFilterPanel();
      return;
    }
    setFilterButtonEl(clickedEl);
    apiRef.current?.showFilterPanel();
  };
  return (
    <Stack
      sx={{
        gap: 2,
        pt: 3,
      }}
    >
      <TopSection handleToggleFilterPanel={handleToggleFilterPanel} />
      <Stack sx={{ width: 1 }}>
        <DataGrid
          apiRef={apiRef}
          columns={columns}
          rows={data}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7,
              },
            },
          }}
          pageSizeOptions={[7]}
          slots={{
            basePagination: (props) => (
              <DataGridPagination showAllHref="#!" showFullPagination {...props} />
            ),
          }}
          slotProps={{
            panel: {
              target: filterButtonEl,
            },
          }}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              '& .MuiDataGrid-columnHeader': {
                '&.name-header': {
                  paddingLeft: '24px !important',
                },
              },
            },
          }}
        />
      </Stack>
    </Stack>
  );
};
const TopSection = ({ handleToggleFilterPanel }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        {translateUi('ui.sections.member.profile.profile_tabs.project_list_b80dd01f')}
      </Typography>
      <Button
        variant="soft"
        color="neutral"
        startIcon={<IconifyIcon icon="material-symbols:filter-alt-outline" />}
        onClick={handleToggleFilterPanel}
      >
        {translateUi('ui.sections.member.profile.profile_tabs.filter_d7decf1a')}
      </Button>
    </Stack>
  );
};
export default ProjectList;
