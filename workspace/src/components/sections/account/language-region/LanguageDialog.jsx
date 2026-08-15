import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  List,
  Stack,
  TextField,
  dialogClasses,
} from '@mui/material';
import { languages } from 'data/account/language-region';
import IconifyIcon from 'components/base/IconifyIcon';
import SimpleBar from 'components/base/SimpleBar';
import LanguageListItem from './LanguageListItem';

const LanguageDialog = (props) => {
  const { t: translateUi } = useTranslation();
  const { open, handleDialogClose, sx } = props;
  const { setValue, control } = useFormContext();
  const checkedLanguages = useWatch({ control, name: 'languages' });
  const [visibleLanguages, setVisibleLanguages] = useState(languages);
  const [updatedLanguages, setUpdatedLanguages] = useState(checkedLanguages);

  const handleSearch = (event) => {
    setVisibleLanguages(() =>
      languages.filter(
        (language) =>
          language.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
          language.label.toLowerCase().includes(event.target.value.toLowerCase()) ||
          `${language.name} - ${language.label}`
            .toLowerCase()
            .includes(event.target.value.toLowerCase()),
      ),
    );
  };

  const toggleLanguage = (language, isChecked) => {
    setUpdatedLanguages((prev) =>
      isChecked
        ? [...prev, language].sort((a, b) => a.id - b.id)
        : prev.filter((l) => l.id !== language.id),
    );
  };

  const handleConfirm = () => {
    setValue('languages', updatedLanguages);
    handleDialogClose();
  };

  const handleDiscard = () => {
    setUpdatedLanguages(checkedLanguages);
    handleDialogClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDiscard}
      sx={{
        [`& .${dialogClasses.paper}`]: {
          borderRadius: 6,
          overflow: 'visible',
          maxWidth: 463,
          ...sx,
        },
      }}
    >
      <DialogTitle
        component="h6"
        sx={{
          pt: 3,
          pb: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {translateUi('ui.sections.account.language_region.languagedialog.language_89b86ab0')}
        <IconButton onClick={handleDiscard}>
          <IconifyIcon icon="material-symbols:close" sx={{ fontSize: 20 }} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <DialogContentText
          variant="body2"
          sx={{ color: 'text.secondary', mb: 2, textWrap: 'pretty' }}
        >
          {translateUi(
            'ui.sections.account.language_region.languagedialog.choose_your_preferred_language_for_display_text_hand_01f04398',
          )}
        </DialogContentText>
        <Stack sx={{ gap: 1 }}>
          <TextField
            label={translateUi(
              'ui.sections.account.language_region.languagedialog.search_bce06414',
            )}
            size="small"
            autoComplete="off"
            onChange={handleSearch}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IconifyIcon icon="material-symbols:search-rounded" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <SimpleBar sx={{ maxHeight: 334 }}>
            <List
              disablePadding
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {visibleLanguages.map((language) => (
                <LanguageListItem
                  key={language.id}
                  language={language}
                  updatedLanguages={updatedLanguages}
                  toggleLanguage={toggleLanguage}
                />
              ))}
            </List>
          </SimpleBar>
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          p: 3,
        }}
      >
        <Button variant="soft" color="neutral" onClick={handleDiscard}>
          {translateUi('ui.sections.account.language_region.languagedialog.discard_36fff63c')}
        </Button>
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          {translateUi('ui.sections.account.language_region.languagedialog.confirm_04a21221')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LanguageDialog;
