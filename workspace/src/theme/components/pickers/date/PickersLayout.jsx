import { chipClasses } from '@mui/material/Chip';
import { listItemClasses } from '@mui/material/ListItem';
import { listItemButtonClasses } from '@mui/material/ListItemButton';

const PickersLayout = {
  styleOverrides: {
    shortcuts: ({ theme }) => ({
      maxHeight: 'unset !important',
      alignSelf: 'stretch',
      height: '100%',
      overflow: 'visible',
      maxWidth: 220,
      padding: theme.spacing(1),
      marginRight: theme.spacing(2),
      boxSizing: 'border-box',
      borderRight: `1px solid ${theme.vars.palette.divider}`,

      [`& .${listItemClasses.root}`]: {
        padding: 0,
        marginBottom: theme.spacing(1),
      },

      [`& .${listItemButtonClasses.root}`]: {
        borderRadius: theme.spacing(1),
        '&:hover': {
          backgroundColor: theme.vars.palette.action.hover,
        },
      },

      [`& .${chipClasses.root}`]: {
        width: '100%',
        height: 24,

        justifyContent: 'flex-start',
        borderRadius: theme.spacing(1),
        backgroundColor: theme.vars.palette.background.elevation2,
        border: 'none',
        [`& .${chipClasses.label}`]: {
          fontWeight: 400,
          fontSize: 14,
          color: theme.vars.palette.text.secondary,
        },
        '&:hover': {
          backgroundColor: theme.vars.palette.primary.lighter,
        },
      },
    }),
  },
};

export default PickersLayout;
