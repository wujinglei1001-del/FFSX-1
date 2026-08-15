import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, IconButton, Stack, Typography, dialogClasses } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import CreateLabelDialog from './CreateLabelDialog';
import LabelPicker from './LabelPicker';
import { optionToTaskLabel, taskLabelToOption } from './labelConfig';

const AddLabelDialog = ({
  open,
  onClose,
  availableLabels,
  selectedLabels,
  onAvailableLabelsChange,
  onSelectedLabelsChange,
}) => {
  const { t: translateUi } = useTranslation();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const selectedLabelNames = selectedLabels.map((taskLabel) => taskLabel.label);

  const handleToggleLabel = (label, checked) => {
    if (checked) {
      const labelOption = availableLabels.find((option) => option.label === label);
      if (!labelOption) return;
      onSelectedLabelsChange([...selectedLabels, optionToTaskLabel(labelOption)]);
      return;
    }

    onSelectedLabelsChange(selectedLabels.filter((taskLabel) => taskLabel.label !== label));
  };

  const handleCreateLabel = (label, color) => {
    const newOption = taskLabelToOption({ label, color });
    onAvailableLabelsChange([...availableLabels, newOption]);
    onSelectedLabelsChange([...selectedLabels, { label, color }]);
    setCreateDialogOpen(false);
  };

  const handleClose = () => {
    setCreateDialogOpen(false);
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        sx={{
          [`& .${dialogClasses.paper}`]: {
            borderRadius: 6,
            maxWidth: 375,
          },
        }}
      >
        <DialogContent sx={{ p: { xs: 3 } }}>
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <IconButton
              onClick={handleClose}
              size="small"
              aria-label={translateUi('ui.sections.project.common.labels.back_b52b36b7')}
            >
              <IconifyIcon
                icon="material-symbols:arrow-back"
                sx={{ fontSize: 20, color: 'text.primary' }}
              />
            </IconButton>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {translateUi('ui.sections.project.common.labels.add_label_80767416')}
            </Typography>
            <IconButton
              onClick={handleClose}
              size="small"
              aria-label={translateUi('ui.sections.project.common.labels.close_bbfa773e')}
            >
              <IconifyIcon
                icon="material-symbols:close"
                sx={{ fontSize: 20, color: 'text.primary' }}
              />
            </IconButton>
          </Stack>

          <LabelPicker
            availableLabels={availableLabels}
            selectedLabels={selectedLabelNames}
            onToggleLabel={handleToggleLabel}
            onCreateLabelClick={() => setCreateDialogOpen(true)}
          />
        </DialogContent>
      </Dialog>

      <CreateLabelDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onCreate={handleCreateLabel}
      />
    </>
  );
};

export default AddLabelDialog;
