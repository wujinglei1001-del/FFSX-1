import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useNumberFormat from 'hooks/useNumberFormat';

const PayrollTotals = ({ totals }) => {
  const { t: translateUi } = useTranslation();
  const { currencyFormat } = useNumberFormat();

  const totalAutoPay = totals.reduce((acc, cur) => acc + cur.autoPay, 0);
  const totalManualPay = totals.reduce((acc, cur) => acc + cur.manualPay, 0);
  const total = totalAutoPay + totalManualPay;

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
          {translateUi('ui.sections.hrm.payroll.payroll_review.payroll_totals_61c086ba')}
        </Typography>
        <Button variant="soft" color="neutral">
          {translateUi('ui.sections.hrm.payroll.payroll_review.export_f3e4fadb')}
        </Button>
      </Stack>
      <TableContainer
        component={Paper}
        background={1}
        sx={{ outline: 0, borderRadius: 6, px: 3, py: 2 }}
      >
        <Table
          sx={{
            [`& .${tableCellClasses.root}`]: {
              textWrap: 'nowrap',
            },
          }}
        >
          <TableHead
            sx={({ vars }) => ({
              [`& .${tableCellClasses.root}`]: {
                borderBottom: `1px solid ${vars.palette.dividerLight}`,
              },
            })}
          >
            <TableRow
              sx={{
                [`& th:first-of-type`]: { pl: 0 },
                [`& th:last-of-type`]: { pr: 0 },
              }}
            >
              <TableCell>
                {translateUi('ui.sections.hrm.payroll.payroll_review.name_709a2322')}
              </TableCell>
              <TableCell align="right">
                {translateUi('ui.sections.hrm.payroll.payroll_review.auto_pay_8d8125b2')}
              </TableCell>
              <TableCell align="right">
                {translateUi('ui.sections.hrm.payroll.payroll_review.manual_pay_3971df66')}
              </TableCell>
              <TableCell align="right">
                {translateUi('ui.sections.hrm.payroll.payroll_review.total_b25928c6')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {totals.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  [`& td:first-of-type`]: { pl: 0 },
                  [`& td:last-of-type`]: { pr: 0 },
                }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{currencyFormat(row.autoPay)}</TableCell>
                <TableCell align="right">{currencyFormat(row.manualPay)}</TableCell>
                <TableCell align="right">{currencyFormat(row.autoPay + row.manualPay)}</TableCell>
              </TableRow>
            ))}
            <TableRow
              sx={{
                [`& td:first-of-type`]: { pl: 0 },
                [`& td:last-of-type`]: { pr: 0 },
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: 0,
                },
              }}
            >
              <TableCell variant="head" sx={{ fontWeight: 700 }}>
                {translateUi('ui.sections.hrm.payroll.payroll_review.total_b25928c6')}
              </TableCell>
              <TableCell align="right">{currencyFormat(totalAutoPay)}</TableCell>
              <TableCell align="right">{currencyFormat(totalManualPay)}</TableCell>
              <TableCell variant="head" align="right" sx={{ fontWeight: 700 }}>
                {currencyFormat(total)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PayrollTotals;
