import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon';

const PayKPI = ({ title, value, icon }) => {
  return (
    <Paper background={1} sx={{ outline: 0, p: 2, borderRadius: 4, height: 1 }}>
      <Stack
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 1,
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            p: 1,
            borderRadius: 6,
            bgcolor: 'chBlue.50',
          }}
        >
          <IconifyIcon icon={icon} sx={{ fontSize: 24, color: 'chBlue.600' }} />
        </Stack>

        <Stack
          sx={{
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: 'chBlue.600',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
            }}
          >
            {value}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default PayKPI;
