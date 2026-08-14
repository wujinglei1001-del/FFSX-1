import { inputAdornmentClasses } from '@mui/material';
import {
  pickersFilledInputClasses,
  pickersInputBaseClasses,
  pickersOutlinedInputClasses,
  pickersSectionListClasses,
} from '@mui/x-date-pickers';

const PickersTextField = {
  variants: [
    {
      props: { size: 'large' },
      style: ({ theme: { spacing, shape } }) => ({
        [`& .${pickersInputBaseClasses.root}`]: { borderRadius: Number(shape.borderRadius) * 2 },
        [`& .${pickersFilledInputClasses.root}`]: {
          [`& .${pickersSectionListClasses.root}`]: {
            paddingTop: spacing(2.875),
            paddingBottom: spacing(0.875),
            paddingLeft: spacing(2.5),
            [`& .${pickersSectionListClasses.section}`]: { height: spacing(3), fontSize: 16 },
          },
        },
        [`& .${pickersOutlinedInputClasses.root}`]: {
          paddingLeft: spacing(2.5),
          [`& .${pickersSectionListClasses.root}`]: {
            paddingTop: spacing(1.875),
            paddingBottom: spacing(1.875),
            [`& .${pickersSectionListClasses.section}`]: { height: spacing(3), fontSize: 16 },
          },
          [`& .${pickersOutlinedInputClasses.notchedOutline}`]: { padding: '0 14px' },
        },
      }),
    },
  ],
  defaultProps: { variant: 'filled' },
  styleOverrides: {
    root: ({ theme: { spacing, shape } }) => ({
      minWidth: 0,
      [`& .${pickersInputBaseClasses.root}`]: {
        borderRadius: Number(shape.borderRadius) * 2,
        [`&.${pickersInputBaseClasses.inputSizeSmall}`]: { borderRadius: shape.borderRadius },
        [`& .${pickersSectionListClasses.root}`]: {
          [`& .${pickersSectionListClasses.section}`]: { height: spacing(2.5) },
        },
        [`& .${pickersSectionListClasses.root}:has(~ .${inputAdornmentClasses.positionEnd})`]: {
          paddingRight: 0,
        },
      },
    }),
  },
};

export default PickersTextField;
