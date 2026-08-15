import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import IconifyIcon from 'components/base/IconifyIcon';
import EditDeleteMenu from '../common/EditDeleteMenu';
import QuestionItem from './Question';
import QuestionDialog from './QuestionDialog';

const initialQuestions = [
  {
    isMandatory: false,
    get question() {
      return i18n.t(
        'ui.sections.hiring.admin.new_opening.why_did_you_choose_to_apply_to_this_company_5d144e5a',
      );
    },
  },
  {
    isMandatory: false,
    get question() {
      return i18n.t(
        'ui.sections.hiring.admin.new_opening.what_are_your_greatest_strengths_f7d073d3',
      );
    },
  },
  {
    isMandatory: false,
    get question() {
      return i18n.t(
        'ui.sections.hiring.admin.new_opening.how_do_you_prefer_to_work_on_tasks_3cf3f8ff',
      );
    },
  },
  {
    isMandatory: false,
    get question() {
      return i18n.t(
        'ui.sections.hiring.admin.new_opening.have_you_worked_remotely_before_9bb00888',
      );
    },
  },
];

const Questionaries = () => {
  const { t: translateUi } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState(initialQuestions);
  const [editingIndex, setEditingIndex] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setMenuIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuIndex(null);
  };

  const handleOpenAdd = () => {
    setEditingIndex(null);
    setOpen(true);
  };

  const handleOpenEdit = (index) => {
    setEditingIndex(index);
    setOpen(true);
  };

  const handleDelete = () => {
    if (menuIndex !== null) {
      setQuestions((prev) => prev.filter((_, i) => i !== menuIndex));
    }
    enqueueSnackbar('Question deleted', { variant: 'error', autoHideDuration: 4000 });
    handleMenuClose();
  };

  const handleClose = () => setOpen(false);

  const handleSave = (value) => {
    if (editingIndex !== null) {
      const updated = [...questions];
      updated[editingIndex] = value;
      setQuestions(updated);
      enqueueSnackbar('Question updated', { variant: 'success', autoHideDuration: 4000 });
    } else {
      setQuestions([...questions, value]);
      enqueueSnackbar('Question added', { variant: 'success', autoHideDuration: 4000 });
    }

    handleClose();
  };

  return (
    <>
      <Typography
        sx={{
          fontWeight: 600,
          mb: 2,
        }}
      >
        {translateUi('ui.sections.hiring.admin.new_opening.questionaries_c61f723a')}
      </Typography>
      <Stack
        sx={{
          gap: 1,
          mb: 2,
        }}
      >
        {questions.map((q, index) => (
          <QuestionItem key={index} question={q} onMenuOpen={(e) => handleMenuOpen(e, index)} />
        ))}
      </Stack>
      <Button onClick={handleOpenAdd} startIcon={<IconifyIcon icon="material-symbols:add" />}>
        {translateUi('ui.sections.hiring.admin.new_opening.add_question_b86c7f05')}
      </Button>
      <QuestionDialog
        open={open}
        onClose={handleClose}
        onSave={handleSave}
        initialValue={editingIndex !== null ? questions[editingIndex] : undefined}
      />
      <EditDeleteMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onEdit={() => {
          if (menuIndex !== null) handleOpenEdit(menuIndex);
          handleMenuClose();
        }}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Questionaries;
