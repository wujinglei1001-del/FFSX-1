import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Chip, Paper, Stack, Typography } from '@mui/material';
import { taskDetailsData } from 'data/project/task-details';
import IconifyIcon from 'components/base/IconifyIcon';
import AddLabelDialog from 'components/sections/project/common/labels/AddLabelDialog';
import {
  defaultLabelOptions,
  mergeAvailableLabelOptions,
} from 'components/sections/project/common/labels/labelConfig';

const LabelSection = () => {
  const { t: translateUi } = useTranslation();
  const [labels, setLabels] = useState(() => taskDetailsData.labels);
  const [availableLabels, setAvailableLabels] = useState(() =>
    mergeAvailableLabelOptions(defaultLabelOptions, taskDetailsData.labels),
  );
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  return (
    <Paper
      sx={{
        overflow: 'hidden',
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 2, md: 3 },
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 700,
          mb: 1.5,
        }}
      >
        {translateUi('ui.sections.project.task_details.taskdetailssection.label_74341e3c')}
      </Typography>
      <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap', mb: 1 }}>
        {labels.map(({ label, color }) => (
          <Chip
            key={`${label}-${color}`}
            size="large"
            label={label}
            sx={(theme) => ({
              bgcolor: theme.vars.palette[color].lighter,
              color: theme.vars.palette[color].dark,
              borderRadius: 2,
              border: 'none',
            })}
          />
        ))}
      </Stack>
      <Button
        size="small"
        startIcon={<IconifyIcon icon="material-symbols:add" />}
        onClick={() => setAddDialogOpen(true)}
        sx={{
          mt: 'auto',
          alignSelf: 'flex-start',
        }}
      >
        {translateUi('ui.sections.project.task_details.taskdetailssection.add_more_15e4e306')}
      </Button>
      <AddLabelDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        availableLabels={availableLabels}
        selectedLabels={labels}
        onAvailableLabelsChange={setAvailableLabels}
        onSelectedLabelsChange={setLabels}
      />
    </Paper>
  );
};

export default LabelSection;
