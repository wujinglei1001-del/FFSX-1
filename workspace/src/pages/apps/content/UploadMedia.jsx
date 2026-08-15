import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container, Typography } from '@mui/material';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import FormActions from 'components/sections/content/upload/form-actions';
import UploadMediaMain from 'components/sections/content/upload/media';

const uploadMediaSchema = yup.object({
  media: yup
    .object({
      id: yup
        .string()
        .required(i18n.t('ui.pages.apps.content.uploadmedia.this_field_is_required_ab90d9d7')),
      file: yup
        .mixed()
        .required(i18n.t('ui.pages.apps.content.uploadmedia.file_is_required_7e184124')),
    })
    .required(i18n.t('ui.pages.apps.content.uploadmedia.media_file_is_required_33bf3948')),
  thumbnail: yup
    .object({
      id: yup.string().required(),
      file: yup.mixed().required(),
    })
    .nullable()
    .optional(),
  title: yup
    .string()
    .required(i18n.t('ui.pages.apps.content.uploadmedia.title_is_required_d5ec4d31')),
  description: yup
    .string()
    .required(i18n.t('ui.pages.apps.content.uploadmedia.content_is_required_ad1138b8'))
    .min(
      10,
      i18n.t(
        'ui.pages.apps.content.uploadmedia.content_must_be_at_least_10_characters_long_0e04c657',
      ),
    ),
  podcastPlaylistIds: yup.array().of(yup.number().required()).optional(),
  topics: yup
    .array()
    .of(yup.string().required())
    .min(1, i18n.t('ui.pages.apps.content.uploadmedia.at_least_one_topic_is_required_e5e9a822'))
    .required(i18n.t('ui.pages.apps.content.uploadmedia.topics_are_required_3352afa4')),
  episodeNo: yup
    .number()
    .nullable()
    .required(i18n.t('ui.pages.apps.content.uploadmedia.episode_no_is_required_b67252f4')),
  seasonNo: yup
    .number()
    .nullable()
    .required(i18n.t('ui.pages.apps.content.uploadmedia.season_no_is_required_1b4e6baa')),
  tags: yup
    .array()
    .of(yup.string().required())
    .min(1, i18n.t('ui.pages.apps.content.uploadmedia.at_least_one_tag_is_required_6faabe47'))
    .required(i18n.t('ui.pages.apps.content.uploadmedia.tags_are_required_3f67c397')),
  accessibility: yup
    .string()
    .required(i18n.t('ui.pages.apps.content.uploadmedia.accessibility_is_required_d5d1dbd7')),
  language: yup
    .string()
    .required(i18n.t('ui.pages.apps.content.uploadmedia.language_is_required_43e11c2b')),
  transcript: yup
    .object({
      subtitle: yup.string(),
      autoGenerate: yup
        .boolean()
        .required(
          i18n.t('ui.pages.apps.content.uploadmedia.auto_generate_option_is_required_2785abe4'),
        ),
    })
    .required(
      i18n.t('ui.pages.apps.content.uploadmedia.transcript_information_is_required_71aab14b'),
    ),
  targetAudience: yup
    .string()
    .oneOf(
      ['all', 'children', 'adults'],
      i18n.t('ui.pages.apps.content.uploadmedia.please_select_a_valid_target_audience_21553cb0'),
    )
    .required(i18n.t('ui.pages.apps.content.uploadmedia.target_audience_is_required_cc9ee968')),
});

const UploadMedia = () => {
  const { t: translateUi } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(uploadMediaSchema),
    defaultValues: {
      thumbnail: null,
      media: null,
      title: '',
      description: '',
      topics: [],
      tags: [],
      accessibility: '',
      language: '',
      targetAudience: 'all',
      podcastPlaylistIds: [],
      episodeNo: null,
      seasonNo: null,
    },
  });

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          px: { xs: 3, md: 5 },
        }}
      >
        <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 }, px: { xs: 0 } }}>
          <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
            {translateUi('ui.pages.apps.content.uploadmedia.content_details_60b6dee7')}
          </Typography>

          <UploadMediaMain />

          <FormActions />
        </Container>
      </Box>
    </FormProvider>
  );
};

export default UploadMedia;
