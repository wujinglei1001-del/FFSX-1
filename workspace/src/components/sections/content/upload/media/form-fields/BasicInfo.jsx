import { useCallback, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormHelperText, Typography } from '@mui/material';
import Editor from 'components/base/Editor';
import StyledTextField from 'components/styled/StyledTextField';

const MAX_TITLE = 75;
const MAX_DESCRIPTION = 140;

const BasicInfo = () => {
  const { t: translateUi } = useTranslation();
  const {
    register,
    setValue,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useFormContext();

  const [titleLength, setTitleLength] = useState(() => (getValues('title') ?? '').length);

  const description = useWatch({ name: 'description' });
  const [descriptionLength, setDescriptionLength] = useState(
    () => (getValues('description') ?? '').length,
  );

  const handleTitleChange = useCallback((e) => {
    setTitleLength(e.target.value.length);
  }, []);

  const handleDescriptionChange = useCallback(
    (html) => {
      setValue('description', html, {
        shouldDirty: true,
        shouldValidate: false,
      });
    },
    [setValue],
  );

  useEffect(() => {
    setDescriptionLength((description ?? '').length);
  }, [description]);

  return (
    <>
      <div>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          {translateUi('ui.sections.content.upload.media.title_768e0c1c')}
        </Typography>
        <StyledTextField
          {...register('title', {
            onChange: handleTitleChange,
          })}
          fullWidth
          placeholder={translateUi('ui.sections.content.upload.media.title_768e0c1c')}
          error={!!errors.title}
          helperText={errors.title?.message}
          slotProps={{
            htmlInput: { maxLength: MAX_TITLE },
          }}
        />

        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            display: 'block',
            textAlign: 'right',
            mt: 0.5,
            mr: 1.5,
          }}
        >
          {titleLength}/{MAX_TITLE}
        </Typography>
      </div>
      <div>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          {translateUi('ui.sections.content.upload.media.description_55f8ebc8')}
        </Typography>

        <Editor
          key={isSubmitSuccessful ? 'reset-editor' : 'editor'}
          content={description}
          onChange={handleDescriptionChange}
          placeholder={translateUi('ui.sections.content.upload.media.write_a_description_dda9f030')}
          isValid={!errors.description}
          sx={{
            '& .MuiTiptap-RichTextContent-root': {
              minHeight: 120,
            },
          }}
        />
        {errors.description && (
          <FormHelperText error sx={{ mx: '14px' }}>
            {errors.description.message}
          </FormHelperText>
        )}

        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            display: 'block',
            textAlign: 'right',
            mt: 0.5,
            mr: 1.5,
          }}
        >
          {descriptionLength}/{MAX_DESCRIPTION}
        </Typography>
      </div>
    </>
  );
};

export default BasicInfo;
