import { useState } from 'react';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import { flexRender } from '@tanstack/react-table';
import IconifyIcon from 'components/base/IconifyIcon';

const TableHeaderCell = ({ header, ...rest }) => {
  const { column, isPlaceholder, getContext } = header;
  const isSortable = column.getCanSort();
  const handleSort = column.getToggleSortingHandler();
  const [isHovered, setisHovered] = useState(false);

  return (
    <TableCell {...rest}>
      {isPlaceholder ? null : (
        <Stack
          component="span"
          direction="row"
          onMouseEnter={() => setisHovered(true)}
          onMouseLeave={() => setisHovered(false)}
          title={
            isSortable
              ? column.getNextSortingOrder() === 'asc'
                ? 'Sort ascending'
                : column.getNextSortingOrder() === 'desc'
                  ? 'Sort descending'
                  : 'Clear sort'
              : undefined
          }
          onClick={handleSort}
          sx={{
            gap: 0.75,
            alignItems: 'center',
            cursor: isSortable ? 'pointer' : 'default',
          }}
        >
          {flexRender(column.columnDef.header, getContext())}
          {isSortable &&
            ({
              asc: (
                <IconifyIcon
                  icon="material-symbols:sort-rounded"
                  sx={{ fontSize: 18, transform: 'rotateX(180deg)' }}
                />
              ),
              desc: <IconifyIcon icon="material-symbols:sort-rounded" sx={{ fontSize: 18 }} />,
              false: (
                <IconifyIcon
                  icon="material-symbols:sort-rounded"
                  sx={[
                    {
                      fontSize: 18,
                      transform: 'rotateX(180deg)',
                      color: 'text.disabled',
                    },
                    isHovered && {
                      color: 'text.primary',
                    },
                  ]}
                />
              ),
            }[column.getIsSorted()] ??
              null)}
        </Stack>
      )}
    </TableCell>
  );
};

export default TableHeaderCell;
