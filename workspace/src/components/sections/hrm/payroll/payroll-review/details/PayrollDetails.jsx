import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { gridClasses } from '@mui/x-data-grid/constants';
import { employeeSummaryData, taxSummaryData } from 'data/hrm/payroll/payroll-review';
import useNumberFormat from 'hooks/useNumberFormat';
import i18n from 'locales/i18n';
import DataGridPagination from 'components/pagination/DataGridPagination';
import DetailsTabs from './DetailsTabs';

const createEmployeeColumns = (currencyFormat) => [
  {
    field: 'employee',
    get headerName() {
      return i18n.t('ui.sections.hrm.payroll.payroll_review.employees_8c5b6be2');
    },
    headerClassName: 'employee-header',
    cellClassName: 'employee-cell',
    flex: 1.85,
    minWidth: 180,
    valueGetter: ({ name }) => name,
    renderCell: (params) => {
      return (
        <Stack
          direction="row"
          sx={{
            gap: 1,
            alignItems: 'center',
          }}
        >
          <Avatar src={params.row.employee.avatar} sx={{ width: 24, height: 24 }} />
          <Stack
            sx={{
              gap: 0.5,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 400, color: 'text.secondary' }}>
              {params.row.employee.name}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary' }}>
              {i18n.t('ui.sections.hrm.payroll.payroll_review.id_d789a1e9')}
              {params.row.employee.empId}
            </Typography>
          </Stack>
        </Stack>
      );
    },
  },
  {
    field: 'totalHours',
    get headerName() {
      return i18n.t('ui.sections.hrm.payroll.payroll_review.total_hours_ad51f9a7');
    },
    headerClassName: 'total-hours-header',
    cellClassName: 'total-hours-cell',
    flex: 1,
    minWidth: 110,
    renderCell: (params) => {
      return (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {params.row.totalHours}
          {i18n.t('ui.sections.hrm.payroll.payroll_review.hrs_a23c4292')}
        </Typography>
      );
    },
  },
  {
    field: 'totalGross',
    get headerName() {
      return i18n.t('ui.sections.hrm.payroll.payroll_review.total_gross_60f4c7a9');
    },
    headerClassName: 'total-gross-header',
    cellClassName: 'total-gross-cell',
    headerAlign: 'right',
    align: 'right',
    flex: 1.23,
    minWidth: 120,
    renderCell: (params) => {
      return (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {currencyFormat(params.row.totalGross, { maximumFractionDigits: 0 })}
        </Typography>
      );
    },
  },
  {
    field: 'totalDeduction',
    get headerName() {
      return i18n.t('ui.sections.hrm.payroll.payroll_review.total_deduction_89ad2516');
    },
    headerClassName: 'total-deduction-header',
    cellClassName: 'total-deduction-cell',
    headerAlign: 'right',
    align: 'right',
    flex: 1.23,
    minWidth: 140,
    renderCell: (params) => {
      return (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {currencyFormat(params.row.totalDeduction, { maximumFractionDigits: 0 })}
        </Typography>
      );
    },
  },
  {
    field: 'netPay',
    get headerName() {
      return i18n.t('ui.sections.hrm.payroll.payroll_review.net_pay_a75db049');
    },
    headerAlign: 'right',
    headerClassName: 'net-pay-header',
    cellClassName: 'net-pay-cell',
    align: 'right',
    flex: 1.25,
    minWidth: 145,
    renderCell: (params) => {
      return (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {currencyFormat(params.row.totalGross - params.row.totalDeduction, {
            maximumFractionDigits: 0,
          })}
        </Typography>
      );
    },
  },
];
const createTaxColumns = (currencyFormat) => [
  {
    field: 'employees',
    get headerName() {
      return i18n.t('ui.sections.hrm.payroll.payroll_review.employees_8c5b6be2');
    },
    headerClassName: 'employees-header',
    cellClassName: 'employees-cell',
    flex: 1.5,
    minWidth: 185,
    renderCell: (params) => {
      return (
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          {params.row.employees}
        </Typography>
      );
    },
  },
  {
    field: 'employeeTaxes',
    get headerName() {
      return i18n.t('ui.sections.hrm.payroll.payroll_review.employee_taxes_497d5f42');
    },
    headerClassName: 'employee-tax-header',
    cellClassName: 'employee-tax-cell',
    flex: 1,
    minWidth: 145,
    renderCell: (params) => {
      return (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {currencyFormat(params.row.employeeTaxes, { maximumFractionDigits: 0 })}
        </Typography>
      );
    },
  },
  {
    field: 'companyTaxes',
    get headerName() {
      return i18n.t('ui.sections.hrm.payroll.payroll_review.company_taxes_c3a401d7');
    },
    headerClassName: 'company-tax-header',
    cellClassName: 'company-tax-cell',
    flex: 1,
    minWidth: 145,
    renderCell: (params) => {
      return (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {currencyFormat(params.row.companyTaxes, { maximumFractionDigits: 0 })}
        </Typography>
      );
    },
  },
  {
    field: 'total',
    get headerName() {
      return i18n.t('ui.sections.hrm.payroll.payroll_review.total_b25928c6');
    },
    headerAlign: 'right',
    headerClassName: 'total-header',
    cellClassName: 'total-cell',
    align: 'right',
    flex: 1.3,
    minWidth: 80,
    renderCell: (params) => {
      return (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {currencyFormat(params.row.employeeTaxes - params.row.companyTaxes, {
            maximumFractionDigits: 0,
          })}
        </Typography>
      );
    },
  },
];

const PayrollDetails = () => {
  const { t: translateUi } = useTranslation();
  const { currencyFormat } = useNumberFormat();
  const [tab, setTab] = useState('employee');

  const handleTabChange = (_, newValue) => {
    setTab(newValue);
  };

  const activeColumns = useMemo(
    () =>
      tab === 'employee' ? createEmployeeColumns(currencyFormat) : createTaxColumns(currencyFormat),
    [currencyFormat, tab],
  );

  const activeRows = useMemo(
    () => (tab === 'employee' ? employeeSummaryData : taxSummaryData),
    [tab],
  );

  return (
    <div>
      <Stack
        direction="row"
        sx={{
          gap: 1,
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          {translateUi('ui.sections.hrm.payroll.payroll_review.payroll_details_718e06dc')}
        </Typography>
        <Button variant="soft" color="neutral">
          {translateUi('ui.sections.hrm.payroll.payroll_review.export_f3e4fadb')}
        </Button>
      </Stack>
      <DetailsTabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }} />
      <Stack sx={{ width: 1 }}>
        <DataGrid
          rowHeight={64}
          columns={activeColumns}
          rows={activeRows}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 6,
              },
            },
          }}
          pageSizeOptions={[6, activeRows.length]}
          slots={{
            basePagination: (props) => (
              <DataGridPagination showAllHref="#!" showFullPagination {...props} />
            ),
          }}
          sx={({ spacing }) => ({
            '& .MuiDataGrid-columnHeader[aria-colindex="1"]': {
              paddingLeft: 3,
            },
            [`& .${gridClasses.columnHeaders}`]: {
              minWidth: 1,
              [`& .${gridClasses.columnHeader}`]: {
                '&:not(.employee-header, .employees-header, .net-pay-header, .total-header)': {
                  p: `0 ${spacing(1.25)}`,
                },
                '&.employee-header, &.employees-header': {
                  pr: spacing(1.25),
                },
                '&.net-pay-header, &.total-header': {
                  pl: spacing(1.25),
                },
              },
            },
            [`& .${gridClasses.row}`]: {
              [`& .${gridClasses.cell}`]: {
                '&.aurora-data-grid-cell': {
                  '&:not(.employee-cell, .employees-cell, .net-pay-cell, .total-cell)': {
                    p: `0 ${spacing(1.25)}`,
                  },
                  '&.employee-cell, &.employees-cell': {
                    pr: spacing(1.25),
                  },
                  '&.net-pay-cell, &.total-cell': {
                    pl: spacing(1.25),
                  },
                },
              },
            },
          })}
        />
      </Stack>
    </div>
  );
};

export default PayrollDetails;
