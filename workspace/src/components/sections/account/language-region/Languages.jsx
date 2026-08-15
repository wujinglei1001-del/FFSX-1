import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Stack } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import LanguageDialog from './LanguageDialog';
import LanguageItem from './LanguageItem';

const Languages = () => {
  const { t: translateUi } = useTranslation();
  const [open, setOpen] = useState(false);
  const { watch } = useFormContext();
  const checkedLanguages = watch('languages');

  return (
    <>
      <Stack sx={{ gap: 1 }}>
        {checkedLanguages.map((checkedLanguage, index) => (
          <LanguageItem
            key={checkedLanguage.id}
            name={checkedLanguage.name}
            label={checkedLanguage.label}
            isPrimary={index === 0}
          />
        ))}
      </Stack>
      <Button
        variant="soft"
        color="neutral"
        startIcon={<IconifyIcon icon="material-symbols:add" sx={{ fontSize: 20 }} />}
        onClick={() => setOpen(true)}
      >
        {translateUi('ui.sections.account.language_region.languages.add_another_e8ac4f65')}
      </Button>
      <LanguageDialog open={open} handleDialogClose={() => setOpen(false)} />
    </>
  );
};

export default Languages;
