import { useMemo } from 'react';
import { Avatar, Box, Chip, Link, Stack, Typography } from '@mui/material';
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import i18n from 'locales/i18n';
import DashboardMenu from 'components/common/DashboardMenu';
import DataGridPagination from 'components/pagination/DataGridPagination';
import { getStatusChipColor } from '..';

export const columnDefs = [
  {
    ...GRID_CHECKBOX_SELECTION_COL_DEF,
    width: 64,
  },
  {
    field: 'member',
    get headerName() {
      return i18n.t('ui.sections.member.member_list.list_view.member_6853c98a');
    },
    headerClassName: 'member-header',
    cellClassName: 'member-cell',
    flex: 2.1,
    minWidth: 210,
    renderCell: (params) => (
      <Stack
        direction="row"
        sx={{
          gap: 1.5,
          alignItems: 'center',
        }}
      >
        <Avatar src={params.row.avatar} sx={{ width: 24, height: 24 }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 400, color: 'text.secondary' }}>
          {params.row.name}
        </Typography>
      </Stack>
    ),
  },
  {
    field: 'idNo',
    get headerName() {
      return i18n.t('ui.sections.member.member_list.list_view.id_no_2cee330c');
    },
    headerClassName: 'id-no-header',
    cellClassName: 'id-no-cell',
    flex: 1,
    minWidth: 105,
  },
  {
    field: 'jobTitle',
    get headerName() {
      return i18n.t('ui.sections.member.member_list.list_view.job_title_0e1d5b56');
    },
    headerClassName: 'job-title-header',
    cellClassName: 'job-title-cell',
    flex: 1.9,
    minWidth: 180,
    renderCell: (params) => (
      <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
        {params.row.jobTitle}
      </Typography>
    ),
  },
  {
    field: 'team',
    get headerName() {
      return i18n.t('ui.sections.member.member_list.list_view.team_21888726');
    },
    headerClassName: 'team-header',
    cellClassName: 'team-cell',
    flex: 1.8,
    minWidth: 140,
  },
  {
    field: 'email',
    get headerName() {
      return i18n.t('ui.sections.member.member_list.list_view.email_84add5b2');
    },
    headerClassName: 'email-header',
    cellClassName: 'email-cell',
    flex: 2,
    minWidth: 230,
    renderCell: (params) => (
      <Link href={`mailto:${params.row.email}`} variant="body2">
        {params.row.email}
      </Link>
    ),
  },
  {
    field: 'phoneNo',
    get headerName() {
      return i18n.t('ui.sections.member.member_list.list_view.phone_no_8578b945');
    },
    headerClassName: 'phone-no-header',
    cellClassName: 'phone-no-cell',
    flex: 1.8,
    minWidth: 160,
  },
  {
    field: 'city',
    get headerName() {
      return i18n.t('ui.sections.member.member_list.list_view.city_4271627f');
    },
    headerClassName: 'city-header',
    cellClassName: 'city-cell',
    flex: 1.4,
    minWidth: 110,
  },
  {
    field: 'status',
    get headerName() {
      return i18n.t('ui.sections.member.member_list.list_view.status_bae7d5be');
    },
    headerClassName: 'status-header',
    cellClassName: 'status-cell',
    flex: 1.2,
    minWidth: 115,
    renderCell: (params) => (
      <Chip
        label={params.row.status}
        color={getStatusChipColor(params.row.status)}
        sx={{ flexShrink: 0 }}
      />
    ),
  },
  {
    field: 'hiredDate',
    get headerName() {
      return i18n.t('ui.sections.member.member_list.list_view.city_4271627f');
    },
    headerClassName: 'hired-date-header',
    cellClassName: 'hired-Date-cell',
    flex: 1,
    minWidth: 110,
    renderCell: (params) => (
      <Typography variant="body2">{dayjs(params.row.hiredDate).format('DD MMM, YY')}</Typography>
    ),
  },
  {
    field: 'action',
    headerName: '',
    sortable: false,
    headerClassName: 'action-header',
    cellClassName: 'action-cell',
    width: 64,
    align: 'right',
    headerAlign: 'right',
    renderHeader: () => <DashboardMenu />,
    renderCell: () => <DashboardMenu />,
  },
];

const MembersListView = ({ data }) => {
  const columns = useMemo(() => columnDefs, [dayjs, getStatusChipColor]);
  return (
    <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 1, pb: 5 }}>
        <DataGrid
          rowHeight={64}
          columns={columns}
          rows={data}
          checkboxSelection
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 7,
              },
            },
          }}
          pageSizeOptions={[7]}
          slots={{
            basePagination: (props) => <DataGridPagination showFullPagination {...props} />,
          }}
        />
      </Box>
    </Box>
  );
};

export default MembersListView;
