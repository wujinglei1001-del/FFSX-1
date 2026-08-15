import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  dialogClasses,
  selectClasses,
} from '@mui/material';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';

const responseOptions = {
  'pre-screen': ['Paragraph', 'Multiple Choice', 'Text', 'Checkbox'],
  'video-response': ['Max 1 min', 'Max 2 min', 'Max 5 min'],
};

const QuestionDialog = ({ open, onClose, onSave, initialValue }) => {
  const { t: translateUi } = useTranslation();
  const { up } = useBreakpoints();
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [format, setFormat] = useState('');
  const [responseType, setResponseType] = useState('');
  const [isMandatory, setIsMandatory] = useState(false);

  const upSm = up('sm');

  useEffect(() => {
    if (open) {
      setQuestion(initialValue?.question ?? '');
      setDescription(initialValue?.description ?? '');
      setFormat(initialValue?.format ?? '');
      setResponseType(initialValue?.responseType ?? '');
      setIsMandatory(initialValue?.isMandatory ?? false);
    }
  }, [open, initialValue]);

  const handleConfirm = () => {
    onSave({
      question,
      description,
      format,
      responseType,
      isMandatory,
    });
    if (!initialValue) {
      setQuestion('');
      setDescription('');
      setFormat('');
      setResponseType('');
      setIsMandatory(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="body"
      maxWidth={false}
      sx={{
        [`& .${dialogClasses.paper}`]: {
          borderRadius: 6,
          overflow: 'visible',
          maxWidth: 540,
        },
      }}
    >
      <DialogTitle
        component="h6"
        sx={{
          pt: { xs: 3, sm: 5 },
          px: { xs: 3, sm: 5 },
          pb: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {initialValue ? 'Edit Question' : 'Add Question'}
        <IconButton onClick={onClose}>
          <IconifyIcon icon="material-symbols:close" sx={{ fontSize: 20, color: 'neutral.dark' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pb: 0.125, px: { xs: 3, sm: 5 } }}>
        <DialogContentText variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          {translateUi(
            'ui.sections.hiring.admin.new_opening.add_a_question_to_collect_specific_details_from_cand_5cd166ff',
          )}
        </DialogContentText>
        <TextField
          fullWidth
          label={translateUi('ui.sections.hiring.admin.new_opening.enter_your_question_e290cc9e')}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          sx={{ mb: 1 }}
        />
        <TextField
          fullWidth
          multiline
          rows={3}
          label={translateUi('ui.sections.hiring.admin.new_opening.description_55f8ebc8')}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            gap: 2,
            alignItems: { xs: 'flex-start', sm: 'center' },
          }}
        >
          <Stack
            direction={{ xs: 'row', sm: 'row' }}
            sx={{
              gap: 1,
              alignItems: 'center',
              width: 1,
            }}
          >
            <FormControl variant="filled" fullWidth>
              <InputLabel id="screening-format-label">
                {translateUi('ui.sections.hiring.admin.new_opening.screening_50783a71')}
                {upSm && 'Format'}
              </InputLabel>
              <Select
                labelId="screening-format-label"
                value={format}
                onChange={(e) => {
                  setFormat(e.target.value);
                  setResponseType('');
                }}
              >
                <MenuItem value="pre-screen">
                  {translateUi('ui.sections.hiring.admin.new_opening.pre_screen_faca8428')}
                </MenuItem>
                <MenuItem value="video-response">
                  {translateUi('ui.sections.hiring.admin.new_opening.video_response_d2c70c1d')}
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="response-type-label">
                {translateUi('ui.sections.hiring.admin.new_opening.response_6e617e4f')}
                {upSm && 'Type'}
              </InputLabel>
              <Select
                labelId="response-type-label"
                value={responseType}
                onChange={(e) => setResponseType(e.target.value)}
                disabled={!format}
                sx={{
                  [`& .${selectClasses.disabled}`]: {
                    cursor: 'not-allowed',
                  },
                }}
              >
                {format &&
                  responseOptions[format].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Stack>
          <FormControlLabel
            control={
              <Checkbox checked={isMandatory} onChange={(e) => setIsMandatory(e.target.checked)} />
            }
            label={translateUi('ui.sections.hiring.admin.new_opening.required_eed6bfb4')}
          />
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          p: { xs: 3, sm: 5 },
          pt: 3,
        }}
      >
        <Button variant="soft" color="neutral" onClick={onClose}>
          {translateUi('ui.sections.hiring.admin.new_opening.discard_36fff63c')}
        </Button>
        <Button variant="contained" onClick={handleConfirm}>
          {initialValue ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionDialog;
