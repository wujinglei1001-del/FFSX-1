import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Divider, FormHelperText, Paper, Stack, Typography } from '@mui/material';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import { RichTextReadOnly } from 'mui-tiptap';
import IconifyIcon from 'components/base/IconifyIcon';

const StoryPreview = ({ handleEditStory }) => {
  const { t: translateUi } = useTranslation();
  const {
    watch,
    formState: { errors },
  } = useFormContext();
  const title = watch('title');
  const subText = watch('subText');
  const content = watch('content');

  const extensions = [StarterKit, TextAlign.configure({ types: ['heading', 'paragraph'] }), Image];

  return (
    <Stack
      sx={{
        height: 1,
      }}
    >
      <Stack
        direction="row"
        sx={{ gap: 1, alignItems: 'center', justifyContent: 'space-between', mb: 1 }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {translateUi('ui.sections.content.upload.blog.preview_f1fbb2b4')}
        </Typography>

        <Button
          onClick={() => handleEditStory(true)}
          variant="soft"
          color="neutral"
          size="small"
          sx={{ alignItems: 'center' }}
          startIcon={<IconifyIcon icon="material-symbols:edit-outline-rounded" />}
        >
          {translateUi('ui.sections.content.upload.blog.write_story_f35e7298')}
        </Button>
      </Stack>
      <Paper
        sx={[
          { width: 1, minHeight: { xs: 400, lg: 'unset' }, flex: 1, borderRadius: 2, p: 3 },
          errors.content ? { outlineColor: 'error.main' } : {},
        ]}
      >
        <Stack
          sx={{
            gap: 2,
            overflowWrap: 'anywhere',
            flexWrap: 'wrap',
          }}
        >
          {title && (
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
          )}

          {subText && (
            <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {subText}
            </Typography>
          )}

          {(title || subText) && content && <Divider sx={{ my: 2 }} />}

          {content && (
            <RichTextReadOnly
              content={content}
              extensions={extensions}
              sx={{
                '& .ProseMirror': {
                  padding: 0,
                  '& p': { mb: 2 },
                  '& h1, & h2, & h3, & h4, & h5, & h6': { mb: 2, mt: 3, fontWeight: 700 },
                  '& ul, & ol': { mb: 2, pl: 4 },
                  '& li': { mb: 1 },
                  '& img': { maxWidth: '100%', height: 'auto', borderRadius: 1, my: 2 },
                  '& a': { color: 'primary.main', textDecoration: 'underline' },
                  '& strong': { fontWeight: 700 },
                  '& em': { fontStyle: 'italic' },
                  '& u': { textDecoration: 'underline' },
                },
              }}
            />
          )}

          {!title && !subText && !content && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {translateUi('ui.sections.content.upload.blog.no_content_yet_click_c937063d')}
              <strong>{translateUi('ui.sections.content.upload.blog.write_story_87791ac1')}</strong>
              {translateUi('ui.sections.content.upload.blog.to_start_writing_b18c1a2a')}
            </Typography>
          )}
        </Stack>
      </Paper>
      {errors.content && (
        <FormHelperText sx={{ ml: 1, color: 'error.light' }}>
          {errors.content.message}
        </FormHelperText>
      )}
    </Stack>
  );
};

export default StoryPreview;
