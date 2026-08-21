import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Chip, Link, Stack, Typography } from '@mui/material';
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, gridClasses } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import useNumberFormat from 'hooks/useNumberFormat';
import paths from 'routes/paths';
import DashboardMenu from 'components/common/DashboardMenu';
import DataGridPagination from 'components/pagination/DataGridPagination';

const getPaymentStatusBadgeColor = (val) => {
  switch (val) {
    case 'sent':
      return 'success';
    case 'paid':
      return 'info';
    case 'late':
      return 'error';
    default:
      return 'neutral';
  }
};
const defaultPageSize = 8;
const InvoiceListTable = ({
  apiRef,
  data,
  filterButtonEl,
  filterModel,
  onFilterModelChange,
  selectionModel,
  onSelectionChange,
}) => {
  const { t: translateUi } = useTranslation();
  const { currencyFormat } = useNumberFormat();
  const columns = useMemo(
    () => [
      {
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        width: 64,
      },
      {
        field: 'id',
        headerName: translateUi(
          'ui.sections.invoice.invoice_list.invoicelisttable.invoice_f9f38818',
        ),
        headerClassName: 'invoice-id-header',
        cellClassName: 'invoice-id-cell',
        sortable: false,
        filterable: true,
        minWidth: 80,
        renderCell: (params) => {
          const { id } = params.row;
          return (
            <Link
              variant="body2"
              sx={{ fontWeight: 400 }}
              href={paths.invoicePreviewWithId(id.toString())}
            >
              #{id}
            </Link>
          );
        },
      },
      {
        field: 'client',
        headerName: translateUi(
          'ui.sections.invoice.invoice_list.invoicelisttable.client_1bdd79b1',
        ),
        headerClassName: 'client-header',
        cellClassName: 'client-cell',
        minWidth: 240,
        filterable: true,
        flex: 1,
        valueGetter: ({ name }) => name,
        renderCell: (params) => {
          const { name, avatar, email } = params.row.client;
          return (
            <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center' }}>
              <Avatar alt={name} src={avatar} sx={{ width: 24, height: 24 }} />
              <div>
                <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
                  {name}
                </Typography>
                <Link href={`mailto:${email}`} variant="caption">
                  {email}
                </Link>
              </div>
            </Stack>
          );
        },
      },
      {
        field: 'issueDate',
        headerName: translateUi(
          'ui.sections.invoice.invoice_list.invoicelisttable.issue_date_72072fe9',
        ),
        headerClassName: 'issue-date-header',
        cellClassName: 'issue-date-cell',
        valueGetter: ({ date }) => date,
        filterable: true,
        minWidth: 150,
        renderCell: (params) => {
          return (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
                {dayjs(params.row.issueDate.date).format('MMM DD, YYYY')}
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                {params.row.issueDate.time}
              </Typography>
            </Box>
          );
        },
      },
      {
        field: 'status',
        headerName: translateUi(
          'ui.sections.invoice.invoice_list.invoicelisttable.status_bae7d5be',
        ),
        headerClassName: 'status-header',
        cellClassName: 'status-cell',
        filterable: true,
        // valueGetter: ({ status }) => status,
        minWidth: 200,
        flex: 1,
        renderCell: (params) => {
          return (
            <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
              <Chip
                label={params.row.status}
                variant="soft"
                color={getPaymentStatusBadgeColor(params.row.status)}
                sx={{ textTransform: 'capitalize' }}
              />
              <Typography
                variant="body2"
                color={params.row.status === 'late' ? 'error' : undefined}
                sx={{ fontWeight: 400 }}
              >
                {params.row.status === 'paid'
                  ? translateUi('common.paid')
                  : translateUi('common.due')}{' '}
                {translateUi('common.on')} {dayjs(params.row.paymentDate).format('MMM DD, YYYY')}
              </Typography>
            </Stack>
          );
        },
      },
      {
        field: 'requiredAmount',
        headerName: translateUi(
          'ui.sections.invoice.invoice_list.invoicelisttable.amount_43dc8532',
        ),
        headerClassName: 'required-amount-header',
        cellClassName: 'required-amount-cell',
        filterable: false,
        minWidth: 100,
        align: 'right',
        headerAlign: 'right',
        renderCell: (params) => {
          return (
            <Typography variant="body2" sx={{ fontWeight: 400 }}>
              {currencyFormat(params.row.requiredAmount)}
            </Typography>
          );
        },
      },
      {
        field: 'paidAmount',
        headerName: translateUi('ui.sections.invoice.invoice_list.invoicelisttable.paid_dc9d4584'),
        headerClassName: 'paid-amount-header',
        cellClassName: 'paid-amount-cell',
        filterable: false,
        minWidth: 100,
        align: 'right',
        headerAlign: 'right',
        renderCell: (params) => {
          return (
            <Typography variant="body2" sx={{ fontWeight: 400 }}>
              {currencyFormat(params.row.paidAmount)}
            </Typography>
          );
        },
      },
      {
        field: 'remainingBalance',
        headerName: translateUi(
          'ui.sections.invoice.invoice_list.invoicelisttable.balance_90eef613',
        ),
        headerClassName: 'remaining-balance-header',
        cellClassName: 'remaining-balance-cell',
        filterable: false,
        sortable: false,
        minWidth: 100,
        align: 'right',
        headerAlign: 'right',
        renderCell: (params) => {
          return (
            <Typography variant="body2" sx={{ fontWeight: 400 }}>
              {currencyFormat(params.row.requiredAmount - params.row.paidAmount)}
            </Typography>
          );
        },
      },
      {
        field: 'action',
        headerName: '',
        headerClassName: 'action-header',
        cellClassName: 'action-cell',
        filterable: false,
        sortable: false,
        align: 'right',
        width: 60,
        headerAlign: 'right',
        renderCell: () => <DashboardMenu />,
      },
    ],
    [currencyFormat],
  );
  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rowHeight={72}
        rows={data}
        apiRef={apiRef}
        columns={columns}
        pageSizeOptions={[defaultPageSize, data.length]}
        filterModel={filterModel}
        onFilterModelChange={onFilterModelChange}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: defaultPageSize,
            },
          },
        }}
        checkboxSelection
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={onSelectionChange}
        slots={{
          basePagination: (props) => <DataGridPagination showFullPagination {...props} />,
        }}
        slotProps={{
          panel: {
            target: filterButtonEl,
          },
        }}
        sx={({ spacing }) => ({
          [`& .${gridClasses.columnHeaders}`]: {
            minWidth: 1,
            [`& .${gridClasses.columnHeader}`]: {
              '&:not(.MuiDataGrid-columnHeaderCheckbox, .required-amount-header, .paid-amount-header, .remaining-balance-header, .action-header)':
                {
                  p: `0 ${spacing(1.25)}`,
                },
              '&.required-amount-header, &.paid-amount-header, &.remaining-balance-header, &.action-header':
                {
                  pl: spacing(1.25),
                },
            },
          },
          [`& .${gridClasses.row}`]: {
            [`& .${gridClasses.cell}`]: {
              '&.ffax-data-grid-cell': {
                '&:not(.MuiDataGrid-cellCheckbox, .required-amount-cell, .paid-amount-cell, .remaining-balance-cell, .action-cell)':
                  {
                    p: `0 ${spacing(1.25)}`,
                  },
                '&.required-amount-cell, &.paid-amount-cell, &.remaining-balance-cell, &.action-cell':
                  {
                    pl: spacing(1.25),
                  },
              },
            },
          },
        })}
      />
    </Box>
  );
};
export default InvoiceListTable;
