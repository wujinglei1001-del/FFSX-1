import { useTranslation } from 'react-i18next';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const OrderStatusInfoTable = ({ data }) => {
  const { t: translateUi } = useTranslation();
  return (
    <TableContainer component={Box} sx={{ m: 0, p: 0 }}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label={translateUi(
          'ui.sections.ecommerce.customer.order_track.order_status_info_table_a1f7bf06',
        )}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              {translateUi('ui.sections.ecommerce.customer.order_track.date_eb9a4bc1')}
            </TableCell>
            <TableCell>
              {translateUi('ui.sections.ecommerce.customer.order_track.time_6c82e6dd')}
            </TableCell>
            <TableCell>
              {translateUi('ui.sections.ecommerce.customer.order_track.description_55f8ebc8')}
            </TableCell>
            <TableCell>
              {translateUi('ui.sections.ecommerce.customer.order_track.place_c32a0147')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                '& td': {
                  fontSize: 16,
                  color: 'text.secondary',
                },
                '&:last-of-type td': { border: 0 },
              }}
            >
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.place}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default OrderStatusInfoTable;
