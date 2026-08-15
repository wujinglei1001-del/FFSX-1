import { useCallback, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Paper, Stack } from '@mui/material';
import { useNavContext } from 'layouts/main-layout/NavProvider';
import Editor from 'components/base/Editor';
import EditableTypography from './EditableTypography';

const StoryEdit = ({ handleEditStory }) => {
  const { t: translateUi } = useTranslation();
  const { topbarHeight } = useNavContext();
  const {
    setValue,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useFormContext();
  const editorRef = useRef(null);
  const initialContent = getValues('content') ?? '';
  const handleEditorChange = useCallback(
    (html) => {
      setValue('content', html, { shouldValidate: false, shouldDirty: true });
    },
    [setValue],
  );
  const handleCancel = useCallback(() => {
    reset();
    handleEditStory(false);
  }, [reset, handleEditStory]);
  return (
    <Stack
      sx={{
        gap: 2,
        height: 1,
        justifyContent: 'space-between',
        minHeight: ({ mixins }) => mixins.contentHeight(topbarHeight, mixins.footer.sm),
        py: { xs: 3, md: 5 },
      }}
    >
      <Stack
        sx={{
          gap: 3,
        }}
      >
        <EditableTypography
          fieldName="title"
          placeholder={translateUi('ui.sections.content.upload.blog.title_768e0c1c')}
          variant="h6"
          hasError={!!errors.title}
        />

        <EditableTypography
          fieldName="subText"
          placeholder={translateUi('ui.sections.content.upload.blog.subtitle_e159d05a')}
          variant="subtitle1"
          sx={{ fontWeight: 700 }}
          color="textSecondary"
          hasError={!!errors.subText}
        />

        <Editor
          ref={editorRef}
          content={initialContent}
          onChange={handleEditorChange}
          placeholder={translateUi('ui.sections.content.upload.blog.write_your_story_d51e4083')}
          isValid={!errors.content}
          sx={{
            '& .MuiTiptap-MenuBar-root': {
              bgcolor: 'background.elevation1',
              borderBottom: 0,
            },
            '& .MuiTiptap-RichTextContent-root': {
              minHeight: '50vh',
              bgcolor: 'background.default',
              overflow: 'visible',
              '& .tiptap': {
                minHeight: '50vh',
                overflow: 'visible',
                '& img': {
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'block',
                },
              },
            },
            // '&.MuiTiptap-FieldContainer-focused': {
            //   '& .MuiTiptap-FieldContainer-notchedOutline': {
            //     borderColor: 'red',
            //   },
            // },
          }}
        />
      </Stack>
      <Paper
        variant="elevation"
        elevation={0}
        background={1}
        sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}
      >
        <Button type="button" color="neutral" onClick={handleCancel} disabled={isSubmitting}>
          {translateUi('ui.sections.content.upload.blog.cancel_77dfd213')}
        </Button>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
          sx={{ minWidth: 200 }}
          onClick={() => handleEditStory(false)}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </Paper>
    </Stack>
  );
};
export default StoryEdit;
