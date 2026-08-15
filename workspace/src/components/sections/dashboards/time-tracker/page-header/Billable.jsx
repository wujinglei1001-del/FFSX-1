import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

const Billable = () => {
  const { t: translateUi } = useTranslation();
  const [billable, setBillable] = useState(true);
  const handleChange = (event) => {
    setBillable(event.target.checked);
  };
  return (
    <Stack direction="row" sx={{ gap: 0.75, alignItems: 'center' }}>
      <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
        {translateUi('ui.sections.dashboards.time_tracker.page_header.billable_ff5d36b9')}
      </Typography>
      <Switch
        checked={billable}
        onChange={handleChange}
        slotProps={{ input: { 'aria-label': 'billable' } }}
      />
    </Stack>
  );
};
export default Billable;
