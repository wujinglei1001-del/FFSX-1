import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import IconifyIcon from 'components/base/IconifyIcon';

const criteriaRatings = [
  {
    get title() {
      return i18n.t('ui.sections.hiring.admin.candidate_details.professionalism_3a609283');
    },
    items: ['Punctual', 'Courteous', 'Communicator', 'Articulate'],
  },
  {
    get title() {
      return i18n.t('ui.sections.hiring.admin.candidate_details.qualities_8a9b6130');
    },
    items: ['Emotional Intelligence', 'Honesty', 'Positivity', 'Curiosity', 'Self-Motivated'],
  },
  {
    get title() {
      return i18n.t('ui.sections.hiring.admin.candidate_details.activities_e58f7f88');
    },
    items: ['Event Management', 'Speaker', 'Event Planning'],
  },
];
const getAllItems = () => {
  return criteriaRatings.flatMap((category) => category.items);
};
const validationSchema = yup.object({
  ratings: yup
    .object(
      getAllItems().reduce((acc, item) => {
        acc[item] = yup.number().min(1, `${item} rating is required`).max(5);
        return acc;
      }, {}),
    )
    .required(),
  comment: yup
    .string()
    .required(i18n.t('ui.sections.hiring.admin.candidate_details.comment_is_required_bc41da4a')),
});
const FillScorecard = () => {
  const { t: translateUi } = useTranslation();
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ratings: {},
      comment: '',
    },
    mode: 'onChange',
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };
  const onSubmit = (data) => {
    console.log(data);
    handleClose();
  };
  const getErrorMessage = (item) => {
    return errors.ratings?.[item]?.message;
  };
  return (
    <div>
      <Button variant="contained" onClick={handleOpen} sx={{ whiteSpace: 'nowrap' }}>
        {translateUi('ui.sections.hiring.admin.candidate_details.fill_scorecard_30782edf')}
      </Button>
      <Dialog
        open={open}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 5,
            pb: 3,
          }}
        >
          <div>
            <Typography variant="h6">
              {translateUi('ui.sections.hiring.admin.candidate_details.fill_scoreboard_b90374aa')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {translateUi(
                'ui.sections.hiring.admin.candidate_details.please_share_your_ratings_and_feedback_for_the_candi_cbf2c447',
              )}
            </Typography>
          </div>

          <IconButton onClick={handleClose}>
            <IconifyIcon
              icon="material-symbols:close"
              sx={{ fontSize: 20, color: 'neutral.dark' }}
            />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 5, pb: 0 }}>
          <Stack
            sx={{
              gap: 3,
            }}
          >
            {criteriaRatings.map((category) => (
              <div key={category.title}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                  }}
                >
                  {category.title}
                </Typography>

                <Stack
                  sx={{
                    gap: 1,
                  }}
                >
                  {category.items.map((item) => (
                    <Stack
                      key={item}
                      direction="row"
                      sx={{
                        bgcolor: 'background.elevation1',
                        borderRadius: 2,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: 2,
                        py: 1,
                        border: getErrorMessage(item) ? '1px solid' : 'none',
                        borderColor: 'error.main',
                      }}
                    >
                      <div>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color: 'text.secondary',
                          }}
                        >
                          {item}
                        </Typography>
                        {getErrorMessage(item) && (
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'error.main',
                            }}
                          >
                            {getErrorMessage(item)}
                          </Typography>
                        )}
                      </div>

                      <Controller
                        name={`ratings.${item}`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Rating
                            value={value || 0}
                            onChange={(_, newValue) => onChange(newValue || 0)}
                            icon={
                              <IconifyIcon
                                icon="material-symbols:star-rounded"
                                fontSize={24}
                                color="warning.main"
                              />
                            }
                            emptyIcon={
                              <IconifyIcon
                                icon="material-symbols:star-rounded"
                                fontSize={24}
                                color="divider"
                              />
                            }
                          />
                        )}
                      />
                    </Stack>
                  ))}
                </Stack>
              </div>
            ))}

            <div>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                {translateUi(
                  'ui.sections.hiring.admin.candidate_details.final_assessment_b88c2c33',
                )}
              </Typography>

              <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={translateUi(
                      'ui.sections.hiring.admin.candidate_details.add_comment_d89450c8',
                    )}
                    multiline
                    rows={2}
                    error={!!errors.comment}
                    helperText={errors.comment?.message}
                  />
                )}
              />

              {!errors.comment && (
                <FormHelperText sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                  <IconifyIcon icon="material-symbols:info-outline-rounded" />
                  {translateUi(
                    'ui.sections.hiring.admin.candidate_details.comment_must_be_at_least_10_characters_long_2bdbf9ea',
                  )}
                </FormHelperText>
              )}
            </div>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 5, pt: 2 }}>
          <Button variant="text" color="neutral" onClick={handleClose}>
            {translateUi('ui.sections.hiring.admin.candidate_details.cancel_77dfd213')}
          </Button>
          <Button variant="contained" type="submit" disabled={!isValid}>
            {translateUi('ui.sections.hiring.admin.candidate_details.submit_2dacf659')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default FillScorecard;
