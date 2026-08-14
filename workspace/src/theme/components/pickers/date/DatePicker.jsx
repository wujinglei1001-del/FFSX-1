import { ButtonBase, inputBaseClasses } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

const DatePicker = {
  defaultProps: {
    slots: {
      openPickerButton: (params) => (
        <ButtonBase {...params} sx={{ fontSize: 'inherit' }}>
          <IconifyIcon icon="material-symbols:calendar-today-outline-rounded" />
        </ButtonBase>
      ),
    },
    slotProps: {
      textField: {
        sx: {
          [`& .${inputBaseClasses.input}::placeholder`]: {
            opacity: '0 !important',
          },
          [`& .${inputBaseClasses.input}::-webkit-input-placeholder`]: {
            opacity: '0 !important',
          },
          [`& .${inputBaseClasses.input}::-moz-placeholder`]: {
            opacity: '0 !important',
          },
        },
      },
      desktopPaper: {
        variant: 'elevation',
        elevation: 3,
      },
    },
  },
};

export default DatePicker;
