import { Link, ListItemText, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';

const NavList = ({ title, items }) => {
  return (
    <List
      subheader={
        <ListSubheader
          sx={{
            flexShrink: 0,
            mb: 1,
            typography: 'overline',
            fontWeight: 700,
            color: 'text.disabled',
            bgcolor: 'transparent',
          }}
        >
          {title}
        </ListSubheader>
      }
      sx={{ pb: 0 }}
    >
      {items.map((item) => (
        <ListItem key={item.label} sx={{ py: 0.5 }}>
          <ListItemText disableTypography sx={{ typography: 'caption' }}>
            <Typography
              component={item.href ? Link : 'span'}
              href={item.href || undefined}
              color="textPrimary"
              sx={{
                fontWeight: 500,
              }}
            >
              {item.label}
            </Typography>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};
export default NavList;
