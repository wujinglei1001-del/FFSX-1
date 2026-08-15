import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import SearchTextField from 'components/common/SearchTextField';

const TopSection = ({ handleSearch, handleToggleFilterPanel, sx, ...rest }) => {
  const { t: translateUi } = useTranslation();
  const { up } = useBreakpoints();
  const upSm = up('sm');
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      {...rest}
      sx={[
        {
          gap: 2,
          justifyContent: 'space-between',
          ...sx,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <Stack
        direction="row"
        sx={{
          gap: 3,
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" sx={{ typography: { xs: 'h6', md: 'h5' } }}>
          {translateUi('ui.sections.hrm.payroll.earnings.earnings_and_deductions_27e57c2b')}
        </Typography>
        <Button variant="soft" color="neutral" sx={{ ml: 'auto' }}>
          {translateUi('ui.sections.hrm.payroll.earnings.import_d6fbc9d2')}
        </Button>
      </Stack>
      <Stack
        direction="row"
        sx={{
          gap: 1,
          alignItems: 'center',
        }}
      >
        <SearchTextField
          placeholder={translateUi('ui.sections.hrm.payroll.earnings.search_employee_61bbf97d')}
          fullWidth
          onChange={handleSearch}
          sx={{ maxWidth: 250 }}
        />
        <Button
          shape={upSm ? undefined : 'square'}
          variant="soft"
          color="neutral"
          onClick={handleToggleFilterPanel}
          sx={{ ml: 'auto', gap: 0.5, flexShrink: 0 }}
        >
          <IconifyIcon
            icon="material-symbols:filter-alt-outline"
            sx={{ fontSize: 20, flexShrink: 0 }}
          />
          {upSm && (
            <Box component="span">
              {translateUi('ui.sections.hrm.payroll.earnings.filter_d7decf1a')}
            </Box>
          )}
        </Button>
      </Stack>
    </Stack>
  );
};

export default TopSection;
