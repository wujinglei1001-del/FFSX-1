import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import PageBreadcrumb from 'components/sections/common/PageBreadcrumb';
import StyledTextField from 'components/styled/StyledTextField';
import ActiveSearchFilter from './ActiveSearchFilter';

const Header = ({ toggleDrawer }) => {
  const { t: translateUi } = useTranslation();
  const { up } = useBreakpoints();
  const [search, setSearch] = useState('');

  const upLg = up('lg');

  return (
    <Stack
      sx={{
        mb: search ? 2 : 5,
        gap: 5,
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Stack
          sx={{
            gap: 2,
          }}
        >
          <PageBreadcrumb
            items={[
              {
                label: translateUi('ui.sections.hiring.candidate.job_list.home_70f8bb9a'),
                url: '#!',
              },
              {
                label: translateUi('ui.sections.hiring.candidate.job_list.job_list_e9d5f772'),
                active: true,
              },
            ]}
          />
          <Typography variant="h4">
            {translateUi('ui.sections.hiring.candidate.job_list.job_list_e9d5f772')}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          sx={{
            gap: 1,
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          <StyledTextField
            placeholder={translateUi('ui.sections.hiring.candidate.job_list.search_bce06414')}
            value={search}
            fullWidth
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IconifyIcon icon="material-symbols:search" sx={{ fontSize: 24 }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ maxWidth: 300 }}
          />
          <Button
            variant="soft"
            color="neutral"
            shape={upLg ? undefined : 'square'}
            size={upLg ? 'medium' : undefined}
            sx={{ flexShrink: 0 }}
            onClick={toggleDrawer(true)}
          >
            <IconifyIcon icon="material-symbols:filter-alt-outline" fontSize={20} />
            {upLg && (
              <Box component="span">
                {translateUi('ui.sections.hiring.candidate.job_list.filter_d7decf1a')}
              </Box>
            )}
          </Button>
        </Stack>
      </Stack>
      {search.length > 0 && <ActiveSearchFilter search={search} />}
    </Stack>
  );
};

export default Header;
