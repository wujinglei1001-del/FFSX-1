import { useTranslation } from 'react-i18next';
import { Button, FormControlLabel, Grid, Stack, Switch, Typography } from '@mui/material';
import { convertSize, cssVarRgba } from 'lib/utils';

const SavedtoStorage = ({ backupSyncSettings, storageData }) => {
  const { t: translateUi } = useTranslation();
  const { totalSpaceUsedinKb, totalSpaceinKb } = storageData;

  return (
    <>
      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700 }}>
        {translateUi('ui.sections.account.storage.savedtostorage.backup_sync_settings_2dede234')}
      </Typography>
      <Grid container spacing={1} sx={{ mb: 3 }}>
        {backupSyncSettings.map((item) => (
          <Grid key={item.name} size={{ xs: 6, md: 4 }}>
            <FormControlLabel
              control={<Switch defaultChecked={item.enabled} />}
              label={item.name}
              sx={{ gap: 2, ml: 0 }}
            />
          </Grid>
        ))}
      </Grid>

      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700 }}>
        {translateUi('ui.sections.account.storage.savedtostorage.enhanced_data_security_018ab09c')}
      </Typography>
      <FormControlLabel
        control={<Switch defaultChecked />}
        label={translateUi(
          'ui.sections.account.storage.savedtostorage.advanced_data_protection_228c361e',
        )}
        sx={{ gap: 2, ml: 0, mb: 3 }}
      />

      <Typography variant="subtitle2" sx={{ mb: 0.75, fontWeight: 700 }}>
        {translateUi('ui.sections.account.storage.savedtostorage.manage_storage_87e8f3e6')}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        <Typography
          variant="body2"
          component="span"
          sx={{ color: 'warning.main', fontWeight: 600 }}
        >
          {translateUi('ui.sections.account.storage.savedtostorage.your_storage_is_131ee74f')}
          {Math.round((totalSpaceUsedinKb / totalSpaceinKb) * 100)}
          {translateUi('ui.sections.account.storage.savedtostorage.full_fb03e1f8')}
        </Typography>{' '}
        {translateUi(
          'ui.sections.account.storage.savedtostorage.to_continue_uploading_files_saving_photos_and_sendin_6063d1bb',
        )}
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={(theme) => ({
          gap: { xs: 2, sm: 0 },
          px: 2,
          py: 2,
          alignItems: 'center',
          bgcolor: cssVarRgba(theme.vars.palette.warning.mainChannel, 0.08),
          borderRadius: 2,
        })}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {translateUi('ui.sections.account.storage.savedtostorage.cloud_storage_ff7f9006')}
        </Typography>
        <Typography variant="subtitle2" sx={{ ml: { xs: 0, sm: 3 }, color: 'text.secondary' }}>
          {convertSize(totalSpaceinKb)} GB{' '}
          <Typography variant="subtitle2" component="span" sx={{ color: 'warning.main' }}>
            (
            {Math.round(convertSize(totalSpaceinKb - totalSpaceUsedinKb, { from: 'kb', to: 'mb' }))}{' '}
            {translateUi('ui.sections.account.storage.savedtostorage.mb_available_2f2c941e')}
          </Typography>{' '}
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="warning"
          sx={{ ml: { xs: 0, sm: 'auto' }, borderRadius: 1 }}
        >
          {translateUi('ui.sections.account.storage.savedtostorage.upgrade_storage_275f7327')}
        </Button>
      </Stack>
    </>
  );
};

export default SavedtoStorage;
