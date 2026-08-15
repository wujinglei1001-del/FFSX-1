import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { useGridApiRef } from '@mui/x-data-grid';
import { pipelineData as data } from 'data/hiring/dashboard';
import IconifyIcon from 'components/base/IconifyIcon';
import DashboardSelectMenu from 'components/common/DashboardSelectMenu';
import SectionHeader from 'components/common/SectionHeader';
import StyledTextField from 'components/styled/StyledTextField';
import SectionWrapper from '../common/SectionWrapper';
import PipelineTable from './PipelineTable';

const Pipeline = () => {
  const { t: translateUi } = useTranslation();
  const apiRef = useGridApiRef();

  const handleSearch = useCallback(
    (e) => apiRef.current?.setQuickFilterValues([e.target.value]),
    [apiRef],
  );

  return (
    <SectionWrapper>
      <SectionHeader
        title={translateUi('ui.sections.dashboards.hiring.pipeline.pipeline_32b1d5a7')}
        subTitle="Current status of all hiring pipelines"
        direction={{ xs: 'column', sm: 'row' }}
        actionComponent={
          <Stack
            direction="row"
            sx={{
              gap: 1,
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            <StyledTextField
              placeholder={translateUi(
                'ui.sections.dashboards.hiring.pipeline.search_positions_683761b6',
              )}
              fullWidth
              onChange={handleSearch}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconifyIcon
                        icon="material-symbols:search"
                        sx={{ fontSize: 20, color: 'text.secondary' }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ maxWidth: { sm: 250 } }}
            />
            <DashboardSelectMenu
              defaultValue={30}
              size="medium"
              options={[
                {
                  value: 7,
                  label: translateUi('ui.sections.dashboards.hiring.pipeline.last_day_d85ff84f'),
                },
                {
                  value: 15,
                  label: translateUi('ui.sections.dashboards.hiring.pipeline.last_6_days_300823a2'),
                },
                {
                  value: 30,
                  label: translateUi(
                    'ui.sections.dashboards.hiring.pipeline.last_30_days_6118867f',
                  ),
                },
              ]}
              sx={{ maxWidth: { sm: 150 }, width: 1 }}
            />
          </Stack>
        }
        sx={{ alignItems: { xs: 'stretch', sm: 'flex-start' } }}
      />
      <PipelineTable apiRef={apiRef} data={data} />
    </SectionWrapper>
  );
};

export default Pipeline;
