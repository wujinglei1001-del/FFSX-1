import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

const TableLabelDisplayedRows = ({ from, to, count }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline-block' } }}>
        {translateUi('ui.components.pagination.tablelabeldisplayedrows.showing_163d8174')}
      </Box>
      <Typography variant="caption" sx={{ fontWeight: 'bold', mx: 0.5 }}>
        {from}-{to}
        {translateUi('ui.components.pagination.tablelabeldisplayedrows.out_of_5ee0bb55')}
        {count}
      </Typography>
      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline-block' } }}>
        {translateUi('ui.components.pagination.tablelabeldisplayedrows.items_7316c8b2')}
      </Box>
    </Typography>
  );
};

export default TableLabelDisplayedRows;
