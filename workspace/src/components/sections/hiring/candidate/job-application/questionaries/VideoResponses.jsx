import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FileDropZone from 'components/base/FileDropZone';
import IconifyIcon from 'components/base/IconifyIcon';
import ApplicationFormSection from '../common/ApplicationFormSection';

const VideoResponses = () => {
  return (
    <ApplicationFormSection name="Video Responses">
      <Stack
        sx={{
          gap: 3,
        }}
      >
        <StrengthsAndWeaknesses />
        <ApplyingReason />
      </Stack>
    </ApplicationFormSection>
  );
};

export default VideoResponses;

const StrengthsAndWeaknesses = () => {
  const { t: translateUi } = useTranslation();
  const {
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();

  const strengthsAndWeaknesses = watch('questionaries.videoResponse.strengthsAndWeaknesses') || [];
  const onDrop = (acceptedFiles) => {
    const files = acceptedFiles.map((file) => ({
      id: file.name,
      file,
    }));

    setValue('questionaries.videoResponse.strengthsAndWeaknesses', [
      ...(strengthsAndWeaknesses || []),
      ...files,
    ]);
    trigger('questionaries.videoResponse.strengthsAndWeaknesses');
  };

  const removeVideo = (index) => {
    setValue(
      'questionaries.videoResponse.strengthsAndWeaknesses',
      strengthsAndWeaknesses.filter((_, i) => i !== index),
    );
    trigger('questionaries.videoResponse.strengthsAndWeaknesses');
  };

  return (
    <div>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          color: 'text.secondary',
          mb: 1,
        }}
      >
        {translateUi(
          'ui.sections.hiring.candidate.job_application.1_what_are_your_strengths_and_weaknesses_49b31427',
        )}
      </Typography>
      <Stack
        sx={{
          gap: 2,
        }}
      >
        <FileDropZone
          accept={{
            'video/*': ['.mp4', '.mov', '.mkv'],
          }}
          icon="material-symbols:play-circle-rounded"
          onDrop={onDrop}
          onRemove={removeVideo}
          defaultFiles={strengthsAndWeaknesses.map((video) => video.file)}
          error={errors.questionaries?.videoResponse?.strengthsAndWeaknesses?.message}
          previewType="thumbnail"
          sx={{ height: 180, maxWidth: 'max-content' }}
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
              'ui.sections.hiring.candidate.job_application.upload_a_video_mp4_mov_or_avi_format_up_to_100mb_in__b358c4c1',
            )}
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
};

const ApplyingReason = () => {
  const { t: translateUi } = useTranslation();
  const {
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();

  const applyingReason = watch('questionaries.videoResponse.applyingReason') || [];
  const onDrop = (acceptedFiles) => {
    const files = acceptedFiles.map((file) => ({
      id: file.name,
      file,
    }));

    setValue('questionaries.videoResponse.applyingReason', [...(applyingReason || []), ...files]);
    trigger('questionaries.videoResponse.applyingReason');
  };

  const removeVideo = (index) => {
    setValue(
      'questionaries.videoResponse.applyingReason',
      applyingReason.filter((_, i) => i !== index),
    );
    trigger('questionaries.videoResponse.applyingReason');
  };

  return (
    <div>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          color: 'text.secondary',
          mb: 1,
        }}
      >
        {translateUi(
          'ui.sections.hiring.candidate.job_application.2_why_did_you_choose_to_apply_to_this_company_518f39d6',
        )}
      </Typography>
      <Stack
        sx={{
          gap: 2,
        }}
      >
        <FileDropZone
          accept={{
            'video/*': ['.mp4', '.mov', '.mkv'],
          }}
          icon="material-symbols:play-circle-rounded"
          onDrop={onDrop}
          onRemove={removeVideo}
          defaultFiles={applyingReason.map((video) => video.file)}
          error={errors.questionaries?.videoResponse?.applyingReason?.message}
          previewType="thumbnail"
          sx={{ height: 180, maxWidth: 'max-content' }}
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
              'ui.sections.hiring.candidate.job_application.upload_a_video_mp4_mov_or_avi_format_up_to_100mb_in__b358c4c1',
            )}
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
};
