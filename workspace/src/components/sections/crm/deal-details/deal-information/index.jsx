import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconifyIcon from 'components/base/IconifyIcon';
import DealInfoItem from './DealInfoItem';

const DealInformation = ({ dealInformation }) => {
  const { t: translateUi } = useTranslation();
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', p: { xs: 3, md: 5 }, gap: 3 }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
        <Typography variant="body1" sx={{ fontWeight: 700 }}>
          {translateUi('ui.sections.crm.deal_details.deal_information.deal_information_f4db353c')}
        </Typography>
        <Button
          variant="soft"
          color="neutral"
          size="small"
          startIcon={<IconifyIcon icon="material-symbols:edit-outline-rounded" />}
        >
          {translateUi('ui.sections.crm.deal_details.deal_information.modify_9fe408e1')}
        </Button>
      </Stack>
      <Stack
        sx={{
          gap: 2,
        }}
      >
        <div>
          {dealInformation.slice(0, 6).map((item) => (
            <DealInfoItem
              key={item.id}
              attribute={item.attribute}
              value={item.value}
              background={item.background}
            />
          ))}
        </div>
        <div>
          {dealInformation.slice(6).map((item) => (
            <DealInfoItem
              key={item.id}
              attribute={item.attribute}
              value={item.value}
              background={item.background}
            />
          ))}
        </div>
      </Stack>
    </Paper>
  );
};

export default DealInformation;
