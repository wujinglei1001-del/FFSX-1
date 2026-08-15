import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
  dialogClasses,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import StyledTextField from 'components/styled/StyledTextField';

const CH_VARIANTS = [100, 200, 500];

const LABEL_COLOR_GROUPS = [
  { chKey: 'chBlue', themeColor: 'primary' },
  { chKey: 'chPurple', themeColor: 'info' },
  { chKey: 'chGreen', themeColor: 'success' },
  { chKey: 'chOrange', themeColor: 'warning' },
  { chKey: 'chRed', themeColor: 'error' },
];

const LABEL_COLOR_PALETTE = LABEL_COLOR_GROUPS.flatMap(({ chKey, themeColor }) =>
  CH_VARIANTS.map((variant) => ({ chKey, variant, themeColor })),
);

const CreateLabelDialog = ({ open, onClose, onCreate }) => {
  const { t: translateUi } = useTranslation();
  const [labelTitle, setLabelTitle] = useState('');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const handleCreate = () => {
    const trimmed = labelTitle.trim();
    if (!trimmed) return;
    const entry = LABEL_COLOR_PALETTE[selectedColorIndex];
    onCreate(trimmed, entry.themeColor);
    setLabelTitle('');
    setSelectedColorIndex(0);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
            onClick={onClose}
            size="small"
            aria-label={translateUi('ui.sections.project.common.labels.back_b52b36b7')}
          >
            <IconifyIcon
              icon="material-symbols:arrow-back"
              sx={{ fontSize: 20, color: 'text.primary' }}
            />
          </IconButton>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {translateUi('ui.sections.project.common.labels.create_new_label_162fa3b4')}
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            aria-label={translateUi('ui.sections.project.common.labels.close_bbfa773e')}
          >
            <IconifyIcon
              icon="material-symbols:close"
              sx={{ fontSize: 20, color: 'text.primary' }}
            />
          </IconButton>
        </Stack>

        <div>
          <StyledTextField
            fullWidth
            placeholder={translateUi('ui.sections.project.common.labels.label_title_082a1a52')}
            value={labelTitle}
            onChange={(event) => setLabelTitle(event.target.value)}
            variant="filled"
            sx={{ mb: 3 }}
          />

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1.25,
              mb: 4,
            }}
          >
            {LABEL_COLOR_PALETTE.map(({ chKey, variant }, index) => (
              <Box
                key={`${chKey}-${variant}`}
                onClick={() => setSelectedColorIndex(index)}
                sx={(theme) => ({
                  height: 36,
                  borderRadius: 1,
                  bgcolor: theme.vars.palette[chKey]?.[variant],
                  border: 2,
                  borderColor: selectedColorIndex === index ? 'primary.main' : 'transparent',
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.9 },
                })}
              />
            ))}
          </Box>

          <Button
            fullWidth
            variant="soft"
            color="neutral"
            onClick={handleCreate}
            disabled={!labelTitle.trim()}
          >
            {translateUi('ui.sections.project.common.labels.create_label_16823034')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLabelDialog;
