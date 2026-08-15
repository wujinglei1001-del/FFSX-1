import { useTranslation } from 'react-i18next';
import { Box, Chip, Stack, Typography } from '@mui/material';
import useNumberFormat from 'hooks/useNumberFormat';

const EcomStatSection = ({ amount, increment, chart }) => {
  const { t: translateUi } = useTranslation();
  const { currencyFormat } = useNumberFormat();

  return (
    <Stack
      direction="row"
      sx={{
        gap: 2,
        alignItems: 'end',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography
          sx={{
            color: 'text.secondary',
            typography: { xs: 'h5', lg: 'h4', xl: 'h3' },
            mb: 1,
          }}
        >
          {currencyFormat(amount, { minimumFractionDigits: 0 })}
        </Typography>
        <Chip
          label={`${increment > 0 ? `+${increment}` : increment}%`}
          color={increment > 0 ? 'success' : 'warning'}
        />
        <Typography
          variant="body2"
          sx={{
            whiteSpace: 'nowrap',
            color: 'text.secondary',
            ml: 0.5,
            display: 'inline',
          }}
        >
          {translateUi('ui.sections.common.ecomstatsection.vs_last_month_9bde8e49')}
        </Typography>
      </Box>
      {chart}
    </Stack>
  );
};

export default EcomStatSection;
