import { ButtonBase, Popper, inputBaseClasses } from '@mui/material';
import { pickersLayoutClasses } from '@mui/x-date-pickers';
import IconifyIcon from 'components/base/IconifyIcon';

const TimePicker = {
  defaultProps: {
    slots: {
      popper: (props) => (
        <Popper
          {...props}
          sx={{
            [`& .${pickersLayoutClasses.contentWrapper}`]: {
              gridColumn: '1 / -1',
            },
          }}
        />
      ),

      openPickerButton: (params) => (
        <ButtonBase {...params} sx={{ fontSize: 'inherit' }}>
          <IconifyIcon icon="material-symbols:schedule-outline-rounded" />
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

export default TimePicker;
