import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  dialogClasses,
} from '@mui/material';
import { users } from 'data/users';
import i18n from 'locales/i18n';
import IconifyIcon from 'components/base/IconifyIcon';

const filterConfigs = [
  {
    id: 'type',
    get label() {
      return i18n.t('ui.sections.file_manager.main.filter_files.type_3deb7456');
    },
    options: [
      {
        get label() {
          return i18n.t('ui.sections.file_manager.main.filter_files.documents_687c8286');
        },
        value: 'documents',
      },
      {
        get label() {
          return i18n.t('ui.sections.file_manager.main.filter_files.images_09e871c9');
        },
        value: 'images',
      },
      {
        get label() {
          return i18n.t('ui.sections.file_manager.main.filter_files.videos_56b71e89');
        },
        value: 'videos',
      },
    ],
  },
  {
    id: 'people',
    get label() {
      return i18n.t('ui.sections.file_manager.main.filter_files.people_b37554f6');
    },
    options: users.map(({ name, avatar }) => ({
      label: (
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Avatar src={avatar} sx={{ height: 20, width: 20 }} />
          <span>{name}</span>
        </Stack>
      ),
      value: name,
    })),
  },
  {
    id: 'modified',
    get label() {
      return i18n.t('ui.sections.file_manager.main.filter_files.modified_19a532c8');
    },
    options: [
      {
        get label() {
          return i18n.t('ui.sections.file_manager.main.filter_files.last_7_days_df833fe8');
        },
        value: '7days',
      },
      {
        get label() {
          return i18n.t('ui.sections.file_manager.main.filter_files.last_30_days_6b329852');
        },
        value: '30days',
      },
      {
        get label() {
          return i18n.t('ui.sections.file_manager.main.filter_files.last_year_3cf4d8d7');
        },
        value: '1year',
      },
    ],
  },
  {
    id: 'location',
    get label() {
      return i18n.t('ui.sections.file_manager.main.filter_files.location_d219c681');
    },
    options: [
      {
        get label() {
          return i18n.t('ui.sections.file_manager.main.filter_files.shared_with_me_f40ca84f');
        },
        value: 'shared',
      },
      {
        get label() {
          return i18n.t('ui.sections.file_manager.main.filter_files.my_drive_7ab39214');
        },
        value: 'drive',
      },
      {
        get label() {
          return i18n.t('ui.sections.file_manager.main.filter_files.starred_e61561a8');
        },
        value: 'starred',
      },
    ],
  },
];

const FilterFiles = () => {
  const { t: translateUi } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({});

  const handleDialogOpen = () => setIsDialogOpen(true);
  const handleDialogClose = () => setIsDialogOpen(false);

  const handleFilterChange = (filterId) => (event) => {
    setFilterValues((prev) => ({
      ...prev,
      [filterId]: event.target.value,
    }));
  };

  const handleReset = () => {
    setFilterValues({});
  };

  return (
    <>
      <Button variant="soft" shape="square" color="neutral" onClick={handleDialogOpen}>
        <IconifyIcon icon="material-symbols:filter-alt-outline" fontSize={24} />
      </Button>
      <Dialog
        id="filter-files-dialog"
        open={isDialogOpen}
        onClose={handleDialogClose}
        sx={{
          [`& .${dialogClasses.paper}`]: {
            maxWidth: 360,
            width: 1,
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
          {translateUi('ui.sections.file_manager.main.filter_files.filter_d7decf1a')}
          <IconButton onClick={handleDialogClose}>
            <IconifyIcon
              icon="material-symbols:close-rounded"
              sx={{ fontSize: 20, color: 'neutral.dark' }}
            />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pb: 3 }}>
          <DialogContentText sx={{ mb: 2 }}>
            {translateUi(
              'ui.sections.file_manager.main.filter_files.filter_files_by_type_people_modified_or_location_2eb76906',
            )}
          </DialogContentText>

          <Stack
            sx={{
              gap: 1,
            }}
          >
            {filterConfigs.map((filter) => (
              <FormControl key={filter.id} fullWidth>
                <InputLabel id={`${filter.id}-select-label`}>{filter.label}</InputLabel>
                <Select
                  labelId={`${filter.id}-select-label`}
                  id={`${filter.id}-select`}
                  value={filterValues[filter.id] || ''}
                  label={filter.label}
                  onChange={handleFilterChange(filter.id)}
                  MenuProps={{
                    sx: {
                      maxHeight: 336,
                    },
                  }}
                >
                  {filter.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button variant="soft" color="neutral" sx={{ px: 3 }} onClick={handleReset}>
            {translateUi('ui.sections.file_manager.main.filter_files.reset_44c57abd')}
          </Button>
          <Button variant="contained" color="primary" sx={{ px: 3 }} onClick={handleDialogClose}>
            {translateUi('ui.sections.file_manager.main.filter_files.apply_cfea419c')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FilterFiles;
