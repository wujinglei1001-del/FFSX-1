import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Badge, Box, Button, Grid, Stack } from '@mui/material';
import { users } from 'data/users';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';
import StyledTextField from 'components/styled/StyledTextField';

const CommentFormSchema = yup.object({
  comment: yup
    .string()
    .required(i18n.t('ui.sections.hrm.performance_management.goals.comment_is_required_6f0cdb89')),
});

const CommentForm = () => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CommentFormSchema),
    defaultValues: {
      comment: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 3 }}>
      <Stack direction="row" sx={{ gap: 2, alignItems: 'flex-start' }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          color="success"
        >
          <Avatar
            src={users[3].avatar}
            alt={translateUi('ui.sections.hrm.performance_management.goals.avatar_9c3bb49f')}
            sx={{ width: 32, height: 32 }}
          />
        </Badge>

        <Box sx={{ flexGrow: 1 }}>
          <StyledTextField
            id="comment"
            type="text"
            multiline
            minRows={2}
            error={!!errors.comment}
            helperText={errors.comment?.message}
            size="small"
            placeholder={translateUi(
              'ui.sections.hrm.performance_management.goals.add_your_comment_7ea7eaf6',
            )}
            {...register('comment')}
            sx={{
              width: 1,
              mb: 2,
              ['& .MuiFilledInput-root']: {
                paddingTop: '4px',
              },
            }}
          />

          <Grid container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid size="auto">
              <Stack direction="row" sx={{ alignItems: 'center' }}>
                <Button type="button" color="neutral" shape="square">
                  <IconifyIcon
                    icon="material-symbols:image-outline-rounded"
                    sx={{ fontSize: 20 }}
                  />
                </Button>
                <Button type="button" color="neutral" shape="square">
                  <IconifyIcon
                    icon="material-symbols:format-italic-rounded"
                    sx={{ fontSize: 20 }}
                  />
                </Button>
                <Button type="button" color="neutral" shape="square">
                  <IconifyIcon icon="material-symbols:format-bold-rounded" sx={{ fontSize: 20 }} />
                </Button>
              </Stack>
            </Grid>
            <Grid size="auto" sx={{ ml: 'auto' }}>
              <Button variant="contained" color="primary" type="submit">
                {translateUi('ui.sections.hrm.performance_management.goals.comment_153d7a58')}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};

export default CommentForm;
