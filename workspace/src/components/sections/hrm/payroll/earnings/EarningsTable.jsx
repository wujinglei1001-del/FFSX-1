import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid/colDef';
import { gridClasses } from '@mui/x-data-grid/constants';
import useNumberFormat from 'hooks/useNumberFormat';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import DashboardMenu from 'components/common/DashboardMenu';
import DataGridPagination from 'components/pagination/DataGridPagination';
import {
  renderDeductionCell,
  renderEmployeeCell,
  renderExtraPayCell,
  renderHoursCell,
  renderNetPayTypeCell,
} from './RenderCells';

const EarningsTable = ({ apiRef, filterButtonEl, data }) => {
  const { t: translateUi } = useTranslation();
  const { currencyFormat } = useNumberFormat();
  const { up } = useBreakpoints();

  const upSm = up('sm');

  const columns = useMemo(
    () => [
      {
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        width: 64,
        sortable: false,
      },
      {
        field: 'employee',
        headerName: translateUi('ui.sections.hrm.payroll.earnings.employees_8c5b6be2'),
        headerClassName: 'employee-header',
        cellClassName: 'employee-cell',
        flex: 1.2,
        minWidth: 220,
        valueGetter: ({ name }) => name,
        renderCell: (params) => renderEmployeeCell(params),
      },
      {
        field: 'hours',
        headerName: translateUi('ui.sections.hrm.payroll.earnings.hours_9e25a34e'),
        headerClassName: 'hours-header',
        cellClassName: 'hours-cell',
        flex: 1,
        minWidth: 180,
        sortable: false,
        renderCell: (params) => renderHoursCell(params),
      },
      {
        field: 'extraPay',
        headerName: translateUi('ui.sections.hrm.payroll.earnings.extra_pay_cd343398'),
        headerClassName: 'extra-pay-header',
        cellClassName: 'extra-pay-cell',
        flex: 1.6,
        minWidth: 260,
        sortable: false,
        renderCell: (params) => renderExtraPayCell(params, apiRef),
      },
      {
        field: 'deduction',
        headerName: translateUi('ui.sections.hrm.payroll.earnings.deduction_b5b89eff'),
        headerClassName: 'deduction-header',
        cellClassName: 'deduction-cell',
        flex: 1.6,
        minWidth: 260,
        sortable: false,
        renderCell: (params) => renderDeductionCell(params, apiRef),
      },
      {
        field: 'netPayType',
        headerName: translateUi('ui.sections.hrm.payroll.earnings.net_pay_type_41f0afb6'),
        headerClassName: 'net-pay-type-header',
        cellClassName: 'net-pay-type-cell',
        flex: 1,
        minWidth: 180,
        align: 'right',
        headerAlign: 'right',
        sortable: false,
        renderCell: (params) => renderNetPayTypeCell(params, apiRef, currencyFormat),
      },
      {
        field: 'action',
        headerAlign: 'right',
        headerClassName: 'action-header',
        cellClassName: 'action-cell',
        align: 'right',
        filterable: false,
        editable: false,
        sortable: false,
        width: 80,
        minWidth: 80,
        renderHeader: () => <DashboardMenu />,
        renderCell: () => <DashboardMenu />,
      },
    ],
    [currencyFormat, data, apiRef],
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: 1 }}>
      <DataGrid
        apiRef={apiRef}
        columns={columns}
        rows={data}
        checkboxSelection
        disableColumnMenu
        getRowHeight={() => 'auto'}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7,
            },
          },
        }}
        pageSizeOptions={[7, data.length]}
        slots={{
          basePagination: (props) => (
            <DataGridPagination showFullPagination={upSm} {...props} />
          ),
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
              '&:not(.action-header)': {
                p: `0 ${spacing(1.25)}`,
              },
              '&.action-header': {
                pl: spacing(1.25),
              },
            },
          },
          [`& .${gridClasses.row}`]: {
            [`& .${gridClasses.cell}`]: {
              '&.ffax-data-grid-cell': {
                alignItems: 'flex-start',
                '&:not(.action-cell)': {
                  p: `${spacing(1)} ${spacing(1.25)}`,
                },
                '&.action-cell': {
                  pl: spacing(1.25),
                  py: spacing(1),
                },
              },
            },
          },
        })}
      />
    </Box>
  );
};

export default EarningsTable;
