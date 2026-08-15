import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useGridApiRef } from '@mui/x-data-grid';
import { timeSheets } from 'data/time-tracker/time-sheets';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import DataGridSelectionBar from 'components/common/DataGridSelectionBar';
import TimeSheetsTableHeader from './TableHeader';
import TimeSheetsTable from './TimeSheetsTable';

const getRowSelectionCount = (selectionModel, totalRowCount) => {
  if (selectionModel.type === 'include') {
    return selectionModel.ids.size;
  }

  return Math.max(0, totalRowCount - selectionModel.ids.size);
};

const TimeSheetsTableContainer = () => {
  const { t: translateUi } = useTranslation();
  const { only } = useBreakpoints();
  const [tab, setTab] = useState('daily');
  const apiRef = useGridApiRef();
  const [selectionModel, setSelectionModel] = useState({
    type: 'include',
    ids: new Set(),
  });

  const onlyXs = only('xs');

  const handleChange = (_event, newValue) => setTab(newValue);

  const handleSelectionChange = (newModel) => {
    setSelectionModel(newModel);
  };

  const handleClearSelection = () => {
    setSelectionModel({
      type: 'include',
      ids: new Set(),
    });
  };

  const selectedCount = getRowSelectionCount(selectionModel, timeSheets.length);

  return (
    <Stack sx={{ gap: 3 }}>
      <TimeSheetsTableHeader tab={tab} handleChange={handleChange} />
      <Box>
        <TimeSheetsTable
          apiRef={apiRef}
          tab={tab}
          rows={timeSheets}
          selectionModel={selectionModel}
          onSelectionChange={handleSelectionChange}
        />
        <DataGridSelectionBar
          selectedCount={selectedCount}
          customLabel={
            <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>
              <strong>{selectedCount}</strong> {translateUi('common.of')}{' '}
              <strong>{timeSheets.length}</strong>
              {translateUi('ui.sections.time_tracker.time_sheets.selected_835f3b50')}
            </Typography>
          }
        >
          <Stack direction="row" sx={{ gap: 0.5 }}>
            <Button
              shape={onlyXs ? 'square' : undefined}
              size="small"
              color="neutral"
              sx={{ gap: 1 }}
            >
              <IconifyIcon icon="material-symbols:edit-outline" sx={{ fontSize: 18 }} />
              {!onlyXs && (
                <Typography variant="button" sx={{ fontWeight: 600 }}>
                  {translateUi('ui.sections.time_tracker.time_sheets.edit_5301648d')}
                </Typography>
              )}
            </Button>
            <Button
              shape={onlyXs ? 'square' : undefined}
              size="small"
              color="neutral"
              sx={{ gap: 1 }}
            >
              <IconifyIcon icon="material-symbols:ios-share-rounded" sx={{ fontSize: 18 }} />
              {!onlyXs && (
                <Typography variant="button" sx={{ fontWeight: 600 }}>
                  {translateUi('ui.sections.time_tracker.time_sheets.export_f3e4fadb')}
                </Typography>
              )}
            </Button>
            <Button
              shape={onlyXs ? 'square' : undefined}
              size="small"
              color="error"
              onClick={handleClearSelection}
              sx={{ gap: 1 }}
            >
              <IconifyIcon icon="material-symbols:delete-outline" sx={{ fontSize: 18 }} />
              {!onlyXs && (
                <Typography variant="button" sx={{ fontWeight: 600 }}>
                  {translateUi('ui.sections.time_tracker.time_sheets.delete_f6fdbe48')}
                </Typography>
              )}
            </Button>
          </Stack>
        </DataGridSelectionBar>
      </Box>
    </Stack>
  );
};

export default TimeSheetsTableContainer;
