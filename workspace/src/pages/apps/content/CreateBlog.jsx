import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Container, Fade, Typography } from '@mui/material';
import i18n from 'locales/i18n';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import * as yup from 'yup';
import CreateBlogMain from 'components/sections/content/upload/blog';
import StoryEdit from 'components/sections/content/upload/blog/story/edit/StoryEdit';
import FormActions from 'components/sections/content/upload/form-actions';

const createBlogSchema = yup.object({
  thumbnail: yup
    .object({
      id: yup.string().required(),
      file: yup.mixed().required(),
    })
    .nullable()
    .optional(),
  title: yup
    .string()
    .required(i18n.t('ui.pages.apps.content.createblog.title_is_required_d5ec4d31')),
  subText: yup
    .string()
    .required(i18n.t('ui.pages.apps.content.createblog.sub_text_is_required_d63b14aa')),
  content: yup
    .string()
    .required(i18n.t('ui.pages.apps.content.createblog.content_is_required_ad1138b8'))
    .min(
      10,
      i18n.t(
        'ui.pages.apps.content.createblog.content_must_be_at_least_10_characters_long_0e04c657',
      ),
    ),
  topics: yup
    .array()
    .of(yup.string().required())
    .min(1, i18n.t('ui.pages.apps.content.createblog.at_least_one_topic_is_required_e5e9a822'))
    .required(i18n.t('ui.pages.apps.content.createblog.topics_are_required_3352afa4')),
  canonicalLink: yup.string().optional(),
  tags: yup
    .array()
    .of(yup.string().required())
    .min(1, i18n.t('ui.pages.apps.content.createblog.at_least_one_tag_is_required_6faabe47'))
    .required(i18n.t('ui.pages.apps.content.createblog.tags_are_required_3f67c397')),
  accessibility: yup
    .string()
    .required(i18n.t('ui.pages.apps.content.createblog.accessibility_is_required_d5d1dbd7')),
  language: yup
    .string()
    .required(i18n.t('ui.pages.apps.content.createblog.language_is_required_43e11c2b')),
  targetAudience: yup
    .string()
    .oneOf(
      ['all', 'children', 'adults'],
      i18n.t('ui.pages.apps.content.createblog.please_select_a_valid_target_audience_21553cb0'),
    )
    .required(i18n.t('ui.pages.apps.content.createblog.target_audience_is_required_cc9ee968')),
});

const CreateBlog = () => {
  const { t: translateUi } = useTranslation();
  const { up } = useBreakpoints();
  const [isEditingStory, setIsEditingStory] = useState(false);

  const upLg = up('lg');

  const handleEditStory = (isEditing) => setIsEditingStory(isEditing);

  const methods = useForm({
    resolver: yupResolver(createBlogSchema),
    defaultValues: {
      thumbnail: null,
      title: '',
      subText: '',
      content: '',
      topics: [],
      canonicalLink: '',
      tags: [],
      accessibility: '',
      language: '',
      targetAudience: 'all',
    },
  });

  return (
    <FormProvider {...methods}>
      <Fade in={!isEditingStory}>
        <Container
          maxWidth={upLg ? 'lg' : false}
          sx={[
            {
              display: isEditingStory ? 'none' : 'block',
              py: { xs: 3, md: 5 },
              px: { xs: 3, md: 5 },
            },
            !upLg && { maxWidth: 800 },
          ]}
        >
          <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
            {translateUi('ui.pages.apps.content.createblog.blog_details_e8bcc7f5')}
          </Typography>

          <CreateBlogMain handleEditStory={handleEditStory} />

          <FormActions />
        </Container>
      </Fade>

      <Fade in={isEditingStory}>
        <Box sx={{ px: { xs: 3, md: 5 }, display: !isEditingStory ? 'none' : 'block' }}>
          <Container
            maxWidth={false}
            sx={{
              maxWidth: 800,
              px: { xs: 0 },
            }}
          >
            <StoryEdit handleEditStory={handleEditStory} />
          </Container>
        </Box>
      </Fade>
    </FormProvider>
  );
};

export default CreateBlog;
