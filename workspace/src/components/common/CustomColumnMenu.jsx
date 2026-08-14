import { GridColumnMenu, GridColumnMenuColumnsItem } from '@mui/x-data-grid';

const CustomColumnMenu = (props) => {
  return (
    <GridColumnMenu
      {...props}
      slots={{
        columnMenuColumnsItem: GridColumnMenuColumnsItem,
        columnMenuSortItem: null,
        columnMenuFilterItem: null,
        columnMenuHideItem: null,
        columnMenuPinningItem: null,
        columnMenuAggregationItem: null,
      }}
      slotProps={{
        columnMenuColumnsItem: {
          displayOrder: 0,
        },
      }}
    />
  );
};

export default CustomColumnMenu;
