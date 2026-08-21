import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Stack, Tooltip, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import useNumberFormat from 'hooks/useNumberFormat';
import { secondsToHms } from 'lib/utils';
import DataGridPagination from 'components/pagination/DataGridPagination';

const TotalAmountDetails = ({ data }) => {
  const { t: translateUi } = useTranslation();
  const { currencyFormat } = useNumberFormat();
  const totalRow = {
    id: 0,
    project: 'Total',
    totalHours: data.reduce((acc, item) => acc + item.totalHours, 0),
    billableHours: data.reduce((acc, item) => acc + item.billableHours, 0),
    amount: data.reduce((acc, item) => acc + item.amount, 0),
  };

  const colorBar = [
    ...data.map((item) => ({
      color: item.project.color,
      percentage: ((item.totalHours / totalRow.totalHours) * 100).toFixed(2),
    })),
  ];

  const columns = useMemo(
    () => [
      {
        field: 'project',
        headerName: translateUi(
          'ui.sections.time_tracker.report.totalamountdetails.project_f6f4da8d',
        ),
        headerClassName: 'project-header',
        cellClassName: 'project-cell',
        flex: 1.79,
        minWidth: 280,
        renderCell: (params) => {
          return params.row.id !== 0 ? (
            <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: 0.5,
                  bgcolor: params.row.project.color,
                }}
              />
              <Stack sx={{ gap: 0.5 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {params.row.project.name}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 500 }}>
                  {params.row.project.task}
                </Typography>
              </Stack>
            </Stack>
          ) : (
            <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
              <Box sx={{ width: 16, height: 16 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                {translateUi('ui.sections.time_tracker.report.totalamountdetails.total_b25928c6')}
              </Typography>
            </Stack>
          );
        },
      },
      {
        field: 'totalHours',
        headerName: translateUi(
          'ui.sections.time_tracker.report.totalamountdetails.total_hours_ad51f9a7',
        ),
        headerClassName: 'total-hours-header',
        cellClassName: 'total-hours-cell',
        flex: 1,
        minWidth: 120,
        renderCell: (params) => (
          <Typography
            variant="body2"
            sx={{
              fontWeight: params.row.id === 0 ? 500 : 400,
              color: params.row.id === 0 ? 'text.primary' : 'text.secondary',
            }}
          >
            {secondsToHms(params.row.totalHours, true)}
          </Typography>
        ),
      },
      {
        field: 'billableHours',
        headerName: translateUi(
          'ui.sections.time_tracker.report.totalamountdetails.billable_hours_011d715c',
        ),
        headerClassName: 'billable-hours-header',
        cellClassName: 'billable-hours-cell',
        flex: 1,
        minWidth: 120,
        renderCell: (params) => (
          <Typography
            variant="body2"
            sx={{
              fontWeight: params.row.id === 0 ? 500 : 400,
              color: params.row.id === 0 ? 'text.primary' : 'text.secondary',
            }}
          >
            {secondsToHms(params.row.billableHours, true)}
          </Typography>
        ),
      },
      {
        field: 'amount',
        headerName: translateUi(
          'ui.sections.time_tracker.report.totalamountdetails.amount_43dc8532',
        ),
        headerClassName: 'amount-header',
        cellClassName: 'amount-cell',
        flex: 1.22,
        minWidth: 120,
        headerAlign: 'right',
        align: 'right',
        renderCell: (params) => (
          <Typography
            variant="body2"
            sx={{
              fontWeight: params.row.id === 0 ? 500 : 400,
              color: params.row.id === 0 ? 'text.primary' : 'text.secondary',
            }}
          >
            {currencyFormat(params.row.amount, { maximumFractionDigits: 0 })}
          </Typography>
        ),
      },
    ],
    [],
  );

  const combinedData = [totalRow, ...data];

  const renderTop = () => (
    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
      <Typography variant="h6" sx={{ fontWeight: 500 }}>
        {translateUi(
          'ui.sections.time_tracker.report.totalamountdetails.total_amount_details_ed3ceb34',
        )}
      </Typography>
      <Button variant="soft" color="neutral">
        {translateUi('ui.sections.time_tracker.report.totalamountdetails.export_f3e4fadb')}
      </Button>
    </Stack>
  );

  const renderColorBar = () => (
    <Box sx={{ display: 'inline-flex', height: 16, width: 1, borderRadius: 1, overflow: 'hidden' }}>
      {colorBar.map((item, index) => (
        <Tooltip key={index} title={`${item.percentage}%`}>
          <Box
            sx={{
              height: 1,
              width: `${item.percentage}%`,
              bgcolor: item.color,
            }}
          />
        </Tooltip>
      ))}
    </Box>
  );

  const renderTable = () => (
    <Stack sx={{ width: 1 }}>
      <DataGrid
        rowHeight={64}
        rows={combinedData}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 8 } } }}
        pageSizeOptions={[8, combinedData.length]}
        slots={{
          basePagination: (props) => (
            <DataGridPagination showFullPagination {...props} />
          ),
        }}
        sx={({ spacing }) => ({
          [`& .${gridClasses.columnHeaders}`]: {
            [`& .${gridClasses.columnHeader}`]: {
              '&:not(.amount-header, .project-header)': { p: `0 ${spacing(1.25)}` },
              '&.amount-header': { pl: spacing(1.25) },
              '&.project-header': { pr: spacing(1.25) },
            },
          },
          [`& .${gridClasses.row}`]: {
            [`& .${gridClasses.cell}`]: {
              '&.ffax-data-grid-cell': {
                '&:not(.amount-cell, .project-cell)': { p: `0 ${spacing(1.25)}` },
                '&.amount-cell': { pl: spacing(1.25) },
                '&.project-cell': { pr: spacing(1.25) },
              },
            },
          },
        })}
      />
    </Stack>
  );

  return (
    <Stack sx={{ gap: 3 }}>
      {renderTop()}
      {renderColorBar()}
      {renderTable()}
    </Stack>
  );
};

export default TotalAmountDetails;
