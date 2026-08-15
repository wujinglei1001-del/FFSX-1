import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Autocomplete,
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FilledInput,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  dialogClasses,
  inputBaseClasses,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { companies } from 'data/crm/deals';
import { users } from 'data/users';
import dayjs from 'dayjs';
import i18n from 'locales/i18n';
import { useDealsContext } from 'providers/DealsProvider';
import { ADD_NEW_DEAL, SET_CREATE_DEAL_DIALOG } from 'reducers/DealsReducer';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required(i18n.t('ui.sections.crm.deals.deal_card.deal_name_is_required_df2cbdcc')),
  stage: yup
    .string()
    .required(i18n.t('ui.sections.crm.deals.deal_card.stage_is_required_73af8bcd')),
  amount: yup
    .number()
    .typeError(i18n.t('ui.sections.crm.deals.deal_card.amount_must_be_a_number_8a8eea24'))
    .required(i18n.t('ui.sections.crm.deals.deal_card.amount_is_required_50c706a2')),
  lastUpdate: yup
    .string()
    .required(i18n.t('ui.sections.crm.deals.deal_card.last_update_is_required_b69e66d0')),
  createDate: yup
    .string()
    .required(i18n.t('ui.sections.crm.deals.deal_card.create_date_is_required_fa468793')),
  closeDate: yup
    .string()
    .required(i18n.t('ui.sections.crm.deals.deal_card.close_date_is_required_bf8d9660')),
  owner: yup
    .object()
    .required(i18n.t('ui.sections.crm.deals.deal_card.owner_is_required_7374a163')),
  client: yup
    .object()
    .required(i18n.t('ui.sections.crm.deals.deal_card.client_is_required_1c82c7f8')),
  priority: yup
    .string()
    .required(i18n.t('ui.sections.crm.deals.deal_card.priority_is_required_d0f01e4d')),
  company: yup
    .object()
    .required(i18n.t('ui.sections.crm.deals.deal_card.company_is_required_bb939b07')),
  collaborators: yup.array().of(yup.object()).optional(),
});
const CreateDealDialog = () => {
  const { t: translateUi } = useTranslation();
  const { listItems, createDealDialog, dealsDispatch } = useDealsContext();
  const listTitle = listItems.find((list) => list.id === createDealDialog.listId)?.title;
  const initialData = useMemo(
    () => ({
      name: '',
      description: '',
      pipeline: '',
      stage: listTitle ?? '',
      amount: 0,
      client: {
        name: 'Tsamina Mina',
        phone: '+81-90-1234-5678',
        email: 'mina@xyz.com',
        videoChat: 'https://zoom.us/j/123456789',
        address: 'Shibuya, Tokyo, Japan',
        link: '#!',
      },
      createDate: dayjs().toString(),
      lastUpdate: dayjs().toString(),
      closeDate: dayjs().toString(),
      priority: '',
      progress: 0,
    }),
    [listTitle],
  );
  const methods = useForm({
    defaultValues: initialData,
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, control, reset } = methods;
  useEffect(() => {
    reset(initialData);
  }, [createDealDialog, methods]);
  const onSubmit = (data) => {
    console.log(data);
    dealsDispatch({ type: ADD_NEW_DEAL, payload: { listName: data.stage, deal: data } });
    dealsDispatch({ type: SET_CREATE_DEAL_DIALOG, payload: { isOpen: false } });
    reset();
  };
  const handleDiscardChanges = () => {
    dealsDispatch({ type: SET_CREATE_DEAL_DIALOG, payload: { isOpen: false } });
    reset();
  };
  return (
    <Dialog
      open={createDealDialog.isOpen}
      onClose={() => dealsDispatch({ type: SET_CREATE_DEAL_DIALOG, payload: { isOpen: false } })}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        [`& .${dialogClasses.paper}`]: {
          p: 0,
          borderRadius: 6,
          width: 1,
          maxWidth: 600,
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          p: 3,
          pb: 2,
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <DialogTitle id="dialog-title" sx={{ p: 0, typography: 'h6' }}>
          {translateUi('ui.sections.crm.deals.deal_card.create_deal_d6e5d3e5')}
        </DialogTitle>
        <Button
          shape="square"
          variant="text"
          size="small"
          color="neutral"
          onClick={() =>
            dealsDispatch({ type: SET_CREATE_DEAL_DIALOG, payload: { isOpen: false } })
          }
        >
          <IconifyIcon
            icon="material-symbols:close-rounded"
            sx={{ color: 'text.primary', fontSize: 20 }}
          />
        </Button>
      </Stack>
      <DialogContent sx={{ px: 3, py: 1 }}>
        <Grid container spacing={1}>
          <Grid size={12}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="deal-name"
                  label={translateUi('ui.sections.crm.deals.deal_card.deal_name_a958bd9f')}
                  variant="filled"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid size={12} sx={{ mb: 1 }}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="deal-description"
                  label={translateUi('ui.sections.crm.deals.deal_card.deal_description_d8070b90')}
                  variant="filled"
                  size="small"
                  rows={3}
                  multiline
                  fullWidth
                  sx={{ [`& .${inputBaseClasses.root}`]: { borderRadius: 2 } }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} sx={{ mb: 1 }}>
            <Controller
              name="pipeline"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>
                    {translateUi('ui.sections.crm.deals.deal_card.pipeline_32b1d5a7')}
                  </InputLabel>
                  <Select
                    {...field}
                    label={translateUi('ui.sections.crm.deals.deal_card.pipeline_32b1d5a7')}
                  >
                    <MenuItem value="Sales Pipeline">
                      {translateUi('ui.sections.crm.deals.deal_card.sales_pipeline_80b2aa3d')}
                    </MenuItem>
                    <MenuItem value="Marketing Pipeline">
                      {translateUi('ui.sections.crm.deals.deal_card.marketing_pipeline_c1c59a64')}
                    </MenuItem>
                    <MenuItem value="Development Pipeline">
                      {translateUi('ui.sections.crm.deals.deal_card.development_pipeline_165509ad')}
                    </MenuItem>
                    <MenuItem value="Support Pipeline">
                      {translateUi('ui.sections.crm.deals.deal_card.support_pipeline_f6f8e2ab')}
                    </MenuItem>
                    <MenuItem value="Operations Pipeline">
                      {translateUi('ui.sections.crm.deals.deal_card.operations_pipeline_31a76a7d')}
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} sx={{ mb: 1 }}>
            <Controller
              name="stage"
              control={control}
              render={({ field, fieldState }) => (
                <FormControl fullWidth>
                  <InputLabel id="stage-select-label" error={!!fieldState.error}>
                    {translateUi('ui.sections.crm.deals.deal_card.stage_ca6d0e3a')}
                  </InputLabel>
                  <Select
                    {...field}
                    error={!!fieldState.error}
                    label={translateUi('ui.sections.crm.deals.deal_card.stage_ac5d84bf')}
                  >
                    {listItems.map((list) => (
                      <MenuItem key={list.id} value={list.title}>
                        {list.title}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} sx={{ mb: 1 }}>
            <Controller
              name="amount"
              control={control}
              render={({ field, fieldState }) => (
                <FormControl variant="filled" fullWidth>
                  <InputLabel htmlFor="deal-amount" error={!!fieldState.error}>
                    {translateUi('ui.sections.crm.deals.deal_card.amount_43dc8532')}
                  </InputLabel>
                  <FilledInput
                    {...field}
                    id="deal-amount"
                    error={!!fieldState.error}
                    type="number"
                    startAdornment={
                      <InputAdornment position="start">
                        <IconifyIcon
                          icon="material-symbols:attach-money-rounded"
                          color="text.secondary"
                        />
                      </InputAdornment>
                    }
                  />
                  <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={6} sx={{ mb: 1, display: { xs: 'none', sm: 'flex' } }} />

          <Grid size={6} sx={{ mb: 1 }}>
            <Controller
              name="createDate"
              control={control}
              render={({ field: { onChange } }) => (
                <DatePicker
                  label={translateUi('ui.sections.crm.deals.deal_card.create_date_b9a0f5e2')}
                  format="DD MMM, YYYY"
                  defaultValue={dayjs()}
                  onChange={(date) => {
                    onChange(date);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'filled',
                    },
                    inputAdornment: {
                      position: 'start',
                    },
                  }}
                />
              )}
            />
          </Grid>

          <Grid size={6} sx={{ mb: 1 }}>
            <Controller
              name="closeDate"
              control={control}
              render={({ field: { onChange } }) => (
                <DatePicker
                  label={translateUi('ui.sections.crm.deals.deal_card.close_date_9179d5f7')}
                  format="DD MMM, YYYY"
                  defaultValue={dayjs()}
                  onChange={(date) => {
                    onChange(date);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                    inputAdornment: {
                      position: 'start',
                    },
                  }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} sx={{ mb: 1 }}>
            <Controller
              name="owner"
              control={control}
              render={({ field: { value, onChange }, fieldState }) => (
                <FormControl fullWidth>
                  <InputLabel id="deal-owner-label" error={!!fieldState.error}>
                    {translateUi('ui.sections.crm.deals.deal_card.deal_owner_f2b17b91')}
                  </InputLabel>
                  <Select
                    value={value?.name || ''}
                    error={!!fieldState.error}
                    onChange={(event) => {
                      const selectedUser = users.find((user) => user.name === event.target.value);
                      onChange(selectedUser);
                    }}
                    label={translateUi('common_labels.deal_owner')}
                  >
                    {users.slice(0, 10).map((user) => (
                      <MenuItem key={user.id} value={user.name}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }} sx={{ mb: 4 }}>
            <Controller
              name="priority"
              control={control}
              render={({ field, fieldState }) => (
                <FormControl fullWidth>
                  <InputLabel id="priority-select-label" error={!!fieldState.error}>
                    {translateUi('ui.sections.crm.deals.deal_card.priority_886cbff9')}
                  </InputLabel>
                  <Select
                    {...field}
                    error={!!fieldState.error}
                    label={translateUi('ui.sections.crm.deals.deal_card.priority_3345867e')}
                  >
                    <MenuItem value="low">
                      {translateUi('ui.sections.crm.deals.deal_card.low_a124947c')}
                    </MenuItem>
                    <MenuItem value="medium">
                      {translateUi('ui.sections.crm.deals.deal_card.medium_d404968e')}
                    </MenuItem>
                    <MenuItem value="high">
                      {translateUi('ui.sections.crm.deals.deal_card.high_b1a5954a')}
                    </MenuItem>
                  </Select>
                  <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={12}>
            <Controller
              name="company"
              control={control}
              render={({ field: { value, onChange }, fieldState }) => (
                <FormControl fullWidth>
                  <InputLabel id="company-label" error={!!fieldState.error}>
                    {translateUi('ui.sections.crm.deals.deal_card.associate_deal_with_7f813e82')}
                  </InputLabel>
                  <Select
                    label={translateUi('ui.sections.crm.deals.deal_card.company_71b21161')}
                    value={value?.name || ''}
                    error={!!fieldState.error}
                    onChange={(event) => {
                      const company = companies.find((item) => item.name === event.target.value);
                      onChange(company);
                    }}
                  >
                    {companies.map((item) => (
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={12}>
            <Controller
              name="collaborators"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  multiple
                  id="users-autocomplete"
                  options={users}
                  getOptionLabel={(option) => option.name}
                  popupIcon={null}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  clearIcon={null}
                  sx={{ width: 1 }}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  renderValue={(selectedOptions, getItemProps) =>
                    selectedOptions.map((option, index) => {
                      const { key, ...itemRest } = getItemProps({ index });

                      return (
                        <Chip
                          key={key}
                          label={option.name}
                          avatar={<Avatar src={option.avatar} />}
                          {...itemRest}
                        />
                      );
                    })
                  }
                  renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                      <Stack
                        key={key}
                        direction="row"
                        component="li"
                        {...optionProps}
                        sx={{
                          gap: 1,
                          '& > img': { mr: 2, flexShrink: 0 },
                        }}
                      >
                        <Avatar src={option.avatar} sx={{ width: 24, height: 24 }} />
                        <Typography sx={{ lineClamp: 1 }}>{option.name}</Typography>
                      </Stack>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={translateUi('ui.sections.crm.deals.deal_card.collaborators_6eb695e5')}
                    />
                  )}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          p: 3,
          pt: 2,
          position: 'sticky',
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <Button variant="soft" color="neutral" onClick={handleDiscardChanges}>
          {translateUi('ui.sections.crm.deals.deal_card.cancel_77dfd213')}
        </Button>
        <Button type="submit" variant="contained" autoFocus>
          {translateUi('ui.sections.crm.deals.deal_card.create_6e157c5d')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CreateDealDialog;
