import { useState } from 'react';
import TablePagination from '@mui/material/TablePagination';
import CustomTablePaginationAction from 'components/pagination/CustomTablePaginationAction';

const JobPagination = ({ jobs }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleShowAll = () => {
    setRowsPerPage((current) => (current === jobs ? 3 : jobs));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={jobs}
      page={page}
      showFirstButton
      showLastButton
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      ActionsComponent={(props) => (
        <CustomTablePaginationAction onShowAllClick={handleShowAll} showFullPagination {...props} />
      )}
      sx={{ bgcolor: 'background.paper' }}
    />
  );
};

export default JobPagination;
