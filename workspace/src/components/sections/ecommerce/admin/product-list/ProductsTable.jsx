import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Box, Chip, Link, Stack } from '@mui/material';
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF, gridClasses } from '@mui/x-data-grid';
import { productListAdmin } from 'data/e-commerce/products';
import useNumberFormat from 'hooks/useNumberFormat';
import paths from 'routes/paths';
import Image from 'components/base/Image';
import DashboardMenu from 'components/common/DashboardMenu';
import DataGridPagination from 'components/pagination/DataGridPagination';

const getStatusBadgeColor = (val) => {
  switch (val) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'neutral';
    case 'draft':
      return 'warning';
    case 'archive':
      return 'error';
    default:
      return 'primary';
  }
};

const zeroPad = (num, places) => String(num).padStart(places, '0');

const defaultPageSize = 8;

const ProductsTable = ({ apiRef, filterButtonEl, selectionModel, onSelectionChange }) => {
  const { t: translateUi } = useTranslation();
  const { currencyFormat } = useNumberFormat();
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        width: 64,
      },
      {
        field: 'name',
        headerName: translateUi('ui.sections.ecommerce.admin.product_list.name_709a2322'),
        headerClassName: 'name-header',
        cellClassName: 'name-cell',
        minWidth: 500,
        flex: 1,
        renderCell: (params) => {
          return (
            <Stack
              direction="row"
              sx={{
                gap: 1.25,
                alignItems: 'center',
              }}
            >
              <Image
                src={params.row.image.src}
                alt={params.row.name}
                onClick={() => navigate(paths.productDetails(String(params.row.id)))}
                sx={{ cursor: 'pointer' }}
                height={48}
                width={48}
              />
              <Link
                href={paths.productDetails(String(params.row.id))}
                variant="subtitle2"
                sx={{ fontWeight: 400 }}
              >
                {params.row.name}
              </Link>
            </Stack>
          );
        },
      },
      {
        field: 'category',
        headerName: translateUi('ui.sections.ecommerce.admin.product_list.category_a3c686e7'),
        headerClassName: 'category-header',
        cellClassName: 'category-cell',
        minWidth: 148,
        renderCell: (params) => {
          return <Chip label={params.row.category} variant="soft" color="neutral" />;
        },
      },
      {
        field: 'price',
        headerName: translateUi('ui.sections.ecommerce.admin.product_list.price_3e8248e3'),
        headerClassName: 'price-header',
        cellClassName: 'price-cell',
        minWidth: 80,
        valueGetter: ({ discounted }) => discounted,
        renderCell: ({ row: { price } }) => currencyFormat(price.discounted),
      },
      {
        field: 'status',
        headerName: translateUi('ui.sections.ecommerce.admin.product_list.status_bae7d5be'),
        headerClassName: 'status-header',
        cellClassName: 'status-cell',
        minWidth: 148,
        renderCell: (params) => {
          return (
            <Chip
              label={params.row.status}
              variant="soft"
              color={getStatusBadgeColor(params.row.status)}
              sx={{ textTransform: 'capitalize' }}
            />
          );
        },
      },
      {
        field: 'stock',
        headerName: translateUi('ui.sections.ecommerce.admin.product_list.inventory_300d29fd'),
        headerClassName: 'stock-header',
        cellClassName: 'stock-cell',
        minWidth: 108,
        renderCell: (params) => zeroPad(params.row.stock, 2),
      },
      {
        field: 'vendor',
        headerName: translateUi('ui.sections.ecommerce.admin.product_list.vendor_d96159ff'),
        headerClassName: 'vendor-header',
        cellClassName: 'vendor-cell',
        minWidth: 200,
        renderCell: (params) => {
          return (
            <Link variant="subtitle2" href={paths.memberProfile} sx={{ fontWeight: 400 }}>
              {params.row.vendor}
            </Link>
          );
        },
      },
      {
        field: 'publishedAt',
        headerName: translateUi('ui.sections.ecommerce.admin.product_list.published_on_40fc0639'),
        headerClassName: 'published-header',
        cellClassName: 'published-cell',
        minWidth: 130,
        filterable: false,
        renderCell: (params) => params.row.publishedAt,
      },
      {
        field: 'action',
        headerName: '',
        headerClassName: 'action-header',
        cellClassName: 'action-cell',
        filterable: false,
        sortable: false,
        width: 60,
        align: 'right',
        headerAlign: 'right',
        renderCell: () => <DashboardMenu />,
      },
    ],
    [currencyFormat],
  );

  return (
    <Box sx={{ width: 1 }}>
      <DataGrid
        rowHeight={64}
        rows={productListAdmin}
        apiRef={apiRef}
        columns={columns}
        pageSizeOptions={[defaultPageSize, productListAdmin.length]}
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
                '&:not(.action-cell)': {
                  p: `0 ${spacing(1.25)}`,
                },
                '&.action-cell': {
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

export default ProductsTable;
