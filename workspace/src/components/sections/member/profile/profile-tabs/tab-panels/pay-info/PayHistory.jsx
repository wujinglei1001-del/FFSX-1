import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import useNumberFormat from 'hooks/useNumberFormat';
import i18n from 'locales/i18n';
import DashboardMenu from 'components/common/DashboardMenu';
import DataGridPagination from 'components/pagination/DataGridPagination';
import StyledTextField from 'components/styled/StyledTextField';

const createColumnDefs = (currencyFormat) => [
  {
    field: 'payDate',
    get headerName() {
      return i18n.t('ui.sections.member.profile.profile_tabs.pay_date_02292742');
    },
    headerClassName: 'pay-date-header',
    cellClassName: 'pay-date-cell',
    flex: 1.33,
    minWidth: 120,
    renderCell: (params) => (
      <Typography variant="body2">
        {dayjs(params.row.payDate).format('DD MMM, YYYY')}
      </Typography>
    ),
  },
  {
    field: 'hours',
    get headerName() {
      return i18n.t('ui.sections.member.profile.profile_tabs.hours_9e25a34e');
    },
    headerClassName: 'hours-header',
    cellClassName: 'hours-cell',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'grossPay',
    get headerName() {
      return i18n.t('ui.sections.member.profile.profile_tabs.gross_pay_b2ea2a0a');
    },
    headerClassName: 'gross-pay-header',
    cellClassName: 'gross-pay-cell',
    flex: 1.25,
    minWidth: 100,
    renderCell: (params) => currencyFormat(params.row.grossPay, { maximumFractionDigits: 0 }),
  },
  {
    field: 'totalDeduction',
    get headerName() {
      return i18n.t('ui.sections.member.profile.profile_tabs.total_deduction_89ad2516');
    },
    headerClassName: 'total-deduction-header',
    cellClassName: 'total-deduction-cell',
    flex: 1.25,
    minWidth: 100,
    renderCell: (params) => currencyFormat(params.row.totalDeduction, { maximumFractionDigits: 0 }),
  },
  {
    field: 'netPay',
    get headerName() {
      return i18n.t('ui.sections.member.profile.profile_tabs.net_pay_a75db049');
    },
    headerClassName: 'net-pay-header',
    cellClassName: 'net-pay-cell',
    flex: 1.2,
    minWidth: 120,
    headerAlign: 'right',
    align: 'right',
    renderCell: (params) => (
      <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
        {currencyFormat(params.row.grossPay - params.row.totalDeduction, {
          maximumFractionDigits: 0,
        })}
      </Typography>
    ),
  },
  {
    field: 'action',
    headerName: '',
    sortable: false,
    headerClassName: 'action-header',
    cellClassName: 'action-cell',
    filterable: false,
    width: 64,
    align: 'right',
    headerAlign: 'right',
    renderHeader: () => <DashboardMenu />,
    renderCell: () => <DashboardMenu />,
  },
];
const PayHistory = ({ data }) => {
  const { t: translateUi } = useTranslation();
  const { currencyFormat } = useNumberFormat();
  const columns = useMemo(() => createColumnDefs(currencyFormat), [currencyFormat]);
  return (
    <Stack
      sx={{
        gap: 2,
        pt: 3,
      }}
    >
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {translateUi('ui.sections.member.profile.profile_tabs.history_90ccd649')}
        </Typography>

        <TopAction />
      </Stack>
      <Stack sx={{ width: 1 }}>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 6,
              },
            },
          }}
          pageSizeOptions={[6]}
          slots={{
            basePagination: (props) => (
              <DataGridPagination showFullPagination {...props} />
            ),
          }}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              '& .MuiDataGrid-columnHeader': {
                '&.pay-date-header': {
                  paddingLeft: 3,
                },
              },
            },
          }}
        />
      </Stack>
    </Stack>
  );
};
const TopAction = () => {
  const { t: translateUi } = useTranslation();
  const [sortBy, setSortBy] = useState('6-months');
  return (
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
  );
};
export default PayHistory;
