import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon';

const ShowcaseItemDesc = ({ title, subtitle, desc, sx }) => {
  return (
    <Stack
      sx={{
        justifyContent: 'space-between',
        flex: '1 1 50%',
        bgcolor: 'background.default',
        ...sx,
      }}
    >
      <Box sx={{ p: 5, pb: 2 }}>
        <Stack
          sx={{
            gap: 1,
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ lineHeight: 1.5 }}>
            {title}
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              color: 'text.secondary',
              fontWeight: 700,
            }}
          >
            {subtitle}
          </Typography>
        </Stack>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          {desc}
        </Typography>
      </Box>
      <Box sx={{ pb: 5, pl: 3 }}>
        <Button endIcon={<IconifyIcon flipOnRTL icon="material-symbols:chevron-right-rounded" />}>
          View more
        </Button>
      </Box>
    </Stack>
  );
};
export default ShowcaseItemDesc;
