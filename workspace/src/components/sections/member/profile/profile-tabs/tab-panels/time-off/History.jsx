import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, MenuItem, Stack, Typography } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import i18n from 'locales/i18n';
import IconifyIcon from 'components/base/IconifyIcon';
import DashboardMenu from 'components/common/DashboardMenu';
import DataGridPagination from 'components/pagination/DataGridPagination';
import StyledTextField from 'components/styled/StyledTextField';

const columnDefs = [
  {
    field: 'date',
    get headerName() {
      return i18n.t('ui.sections.member.profile.profile_tabs.date_eb9a4bc1');
    },
    headerClassName: 'date-header',
    cellClassName: 'date-cell',
    flex: 1.2,
    minWidth: 130,
  },
  {
    field: 'day',
    get headerName() {
      return i18n.t('ui.sections.member.profile.profile_tabs.day_987b9ced');
    },
    headerClassName: 'day-header',
    cellClassName: 'day-cell',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'hour',
    get headerName() {
      return i18n.t('ui.sections.member.profile.profile_tabs.hour_c37cf838');
    },
    headerClassName: 'hour-header',
    cellClassName: 'hour-cell',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'reason',
    get headerName() {
      return i18n.t('ui.sections.member.profile.profile_tabs.reason_f219cc06');
    },
    headerClassName: 'reason-header',
    cellClassName: 'reason-cell',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'approver',
    get headerName() {
      return i18n.t('ui.sections.member.profile.profile_tabs.approver_f18fc152');
    },
    headerClassName: 'approver-header',
    cellClassName: 'approver-cell',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'action',
    headerName: '',
    sortable: false,
    headerClassName: 'action-header',
    cellClassName: 'action-cell',
    filterable: false,
    width: 60,
    align: 'right',
    headerAlign: 'right',
    renderHeader: () => <DashboardMenu />,
    renderCell: () => <DashboardMenu />,
  },
];
const History = ({ data }) => {
  const { t: translateUi } = useTranslation();
  const [filterButtonEl, setFilterButtonEl] = useState(null);
  const apiRef = useGridApiRef();
  const columns = useMemo(() => columnDefs, []);
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
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        {translateUi('ui.sections.member.profile.profile_tabs.history_90ccd649')}
      </Typography>
      <Stack
        sx={{
          gap: 4,
        }}
      >
        <TopAction handleToggleFilterPanel={handleToggleFilterPanel} />

        <Stack sx={{ width: 1 }}>
          <DataGrid
            apiRef={apiRef}
            rows={data}
            columns={columns}
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
                  '&.date-header': {
                    paddingLeft: 3,
                  },
                },
              },
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
const TopAction = ({ handleToggleFilterPanel }) => {
  const { t: translateUi } = useTranslation();
  const [sortBy, setSortBy] = useState('6-months');
  return (
    <Stack
      direction="row"
      sx={{
        gap: 1,
      }}
    >
      <StyledTextField
        select
        value={sortBy}
        fullWidth
        onChange={(event) => setSortBy(event.target.value)}
        sx={{ maxWidth: 234 }}
      >
        <MenuItem value="week">
          {translateUi('ui.sections.member.profile.profile_tabs.sort_by_last_week_cbce2b89')}
        </MenuItem>
        <MenuItem value="month">
          {translateUi('ui.sections.member.profile.profile_tabs.sort_by_last_month_d24d3a53')}
        </MenuItem>
        <MenuItem value="3-months">
          {translateUi('ui.sections.member.profile.profile_tabs.sort_by_last_3_months_35e11bcc')}
        </MenuItem>
        <MenuItem value="6-months">
          {translateUi('ui.sections.member.profile.profile_tabs.sort_by_last_6_months_ce59b2be')}
        </MenuItem>
      </StyledTextField>
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
export default History;
