import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FileDropZone from 'components/base/FileDropZone';
import IconifyIcon from 'components/base/IconifyIcon';
import ApplicationFormSection from '../common/ApplicationFormSection';

const CoverLetter = () => {
  const { t: translateUi } = useTranslation();
  const {
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useFormContext();

  const coverLetter = watch('documents.coverLetter') || [];
  const onDrop = (acceptedFiles) => {
    const files = acceptedFiles.map((file) => ({
      id: file.name,
      file,
    }));

    setValue('documents.coverLetter', [...(coverLetter || []), ...files]);
    trigger('documents.coverLetter');
  };

  const removeImage = (index) => {
    setValue(
      'documents.coverLetter',
      coverLetter.filter((_, i) => i !== index),
    );
    trigger('documents.coverLetter');
  };

  return (
    <ApplicationFormSection name="Cover Letter">
      <Stack
        sx={{
          gap: 2,
        }}
      >
        <FileDropZone
          accept={{
            'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
            'application/pdf': ['.pdf'],
          }}
          onDrop={onDrop}
          onRemove={removeImage}
          defaultFiles={coverLetter.map((letter) => letter.file)}
          error={errors.documents?.coverLetter?.message}
          previewType="thumbnail"
          sx={{ height: { xs: 'max-content', sm: 60 } }}
        />
        <Stack
          direction="row"
          sx={{
            gap: 1,
          }}
        >
          <Box sx={{ flexShrink: 0 }}>
            <IconifyIcon
              icon="material-symbols:info-outline-rounded"
              sx={{ fontSize: 16, color: 'info.main' }}
            />
          </Box>
          <Typography
            variant="body2"
            color="info"
            sx={{
              fontWeight: 500,
            }}
          >
            {translateUi(
              'ui.sections.hiring.candidate.job_application.documents_must_be_uploaded_in_pdf_doc_or_docx_format_2cb7664a',
            )}
          </Typography>
        </Stack>
      </Stack>
    </ApplicationFormSection>
  );
};

export default CoverLetter;
