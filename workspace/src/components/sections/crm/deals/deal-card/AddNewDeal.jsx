import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDealsContext } from 'providers/DealsProvider';
import { SET_CREATE_DEAL_DIALOG } from 'reducers/DealsReducer';
import IconifyIcon from 'components/base/IconifyIcon';

const AddNewDeal = ({ listId }) => {
  const { t: translateUi } = useTranslation();
  const { dealsDispatch } = useDealsContext();

  return (
    <Box sx={{ p: 1, borderRadius: 4, bgcolor: 'background.elevation1' }}>
      <Button
        variant="text"
        color="neutral"
        onClick={() =>
          dealsDispatch({ type: SET_CREATE_DEAL_DIALOG, payload: { isOpen: true, listId } })
        }
        startIcon={
          <IconifyIcon icon="material-symbols:add-2-rounded" sx={{ fontSize: '20px !important' }} />
        }
        fullWidth
      >
        {translateUi('ui.sections.crm.deals.deal_card.add_new_deal_ab9fc967')}
      </Button>
    </Box>
  );
};

export default AddNewDeal;
