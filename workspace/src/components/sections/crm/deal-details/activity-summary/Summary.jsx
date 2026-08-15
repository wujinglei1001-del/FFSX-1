import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon';

const Summary = ({ summary }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Stack
      sx={{
        gap: 3,
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.elevation1',
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        {translateUi('ui.sections.crm.deal_details.activity_summary.summary_12b71c3e')}
      </Typography>
      <Stack
        direction="row"
        sx={{
          gap: 1,
          justifyContent: 'space-between',
        }}
      >
        {summary.map((item) => (
          <Stack
            key={item.id}
            direction="row"
            sx={{
              gap: 0.5,
              alignItems: 'center',
            }}
          >
            <Stack
              direction="row"
              sx={{
                width: 24,
                height: 24,
                borderRadius: 1,
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'primary.lighter',
              }}
            >
              <IconifyIcon icon={item.icon} sx={{ fontSize: 16, color: 'primary.dark' }} />
            </Stack>
            <Typography variant="body2" sx={{ textWrap: 'nowrap' }}>
              {item.attribute}:{' '}
              <Typography component="span" sx={{ fontWeight: 700 }}>
                {item.value}
              </Typography>
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
export default Summary;
