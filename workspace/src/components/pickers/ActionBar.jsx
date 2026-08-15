import { useTranslation } from 'react-i18next';
import { Button, DialogActions, buttonClasses } from '@mui/material';
import { usePickerActionsContext } from '@mui/x-date-pickers';

const ActionBar = () => {
  const { t: translateUi } = useTranslation();
  const { cancelValueChanges, acceptValueChanges } = usePickerActionsContext();

  return (
    <DialogActions
      sx={(theme) => ({
        gridArea: '3 / 1 / auto / 4',
        padding: theme.spacing(0, 3, 2, 0),
        [`& .${buttonClasses.root}:last-of-type`]: { m: 0 },
      })}
    >
      <Button color="neutral" onClick={cancelValueChanges}>
        {translateUi('ui.components.pickers.actionbar.cancel_77dfd213')}
      </Button>
      <Button onClick={acceptValueChanges}>
        {translateUi('ui.components.pickers.actionbar.confirm_04a21221')}
      </Button>
    </DialogActions>
  );
};

export default ActionBar;
