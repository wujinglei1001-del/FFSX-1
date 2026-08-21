import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import { initialConfig } from 'config';
import i18n from 'locales/i18n';
import CollapsibleSection from './CollapsibleSection';
import QuestionItem from './QuestionItem';

const videoResponse = `${initialConfig.assetsDir}/videos/file-manager/ffax.mp4`;

const questionaries = {
  preScreenQuestions: [
    {
      get question() {
        return i18n.t(
          'ui.sections.hiring.admin.candidate_details.why_did_you_choose_to_apply_to_this_company_5d144e5a',
        );
      },
      get answer() {
        return i18n.t(
          'ui.sections.hiring.admin.candidate_details.i_applied_to_this_company_because_of_its_strong_repu_e6167dc5',
        );
      },
    },
    {
      get question() {
        return i18n.t(
          'ui.sections.hiring.admin.candidate_details.what_are_your_greatest_strengths_f7d073d3',
        );
      },
      get answer() {
        return i18n.t(
          'ui.sections.hiring.admin.candidate_details.strong_research_skills_adaptability_in_writing_style_e9afeb99',
        );
      },
    },
    {
      get question() {
        return i18n.t(
          'ui.sections.hiring.admin.candidate_details.how_do_you_prefer_to_work_on_tasks_3cf3f8ff',
        );
      },
      get answer() {
        return i18n.t('ui.sections.hiring.admin.candidate_details.independently_79303d16');
      },
      type: 'radio',
      options: [
        {
          value: 'independently',
          get label() {
            return i18n.t('ui.sections.hiring.admin.candidate_details.independently_1a7e41be');
          },
        },
        {
          value: 'collaboratively',
          get label() {
            return i18n.t('ui.sections.hiring.admin.candidate_details.collaboratively_5d7ee0c5');
          },
        },
        {
          value: 'deadlines',
          get label() {
            return i18n.t(
              'ui.sections.hiring.admin.candidate_details.with_clear_deadlines_357fb1d3',
            );
          },
        },
        {
          value: 'freedom',
          get label() {
            return i18n.t(
              'ui.sections.hiring.admin.candidate_details.with_creative_freedom_9e88c503',
            );
          },
        },
      ],
    },
    {
      get question() {
        return i18n.t(
          'ui.sections.hiring.admin.candidate_details.have_you_worked_remotely_before_9bb00888',
        );
      },
      get answer() {
        return i18n.t('ui.sections.hiring.admin.candidate_details.yes_fb360f9c');
      },
      type: 'checkbox',
      options: [
        {
          value: 'yes',
          get label() {
            return i18n.t('ui.sections.hiring.admin.candidate_details.yes_5397e058');
          },
        },
        {
          value: 'no',
          get label() {
            return i18n.t('ui.sections.hiring.admin.candidate_details.no_816c52fd');
          },
        },
      ],
    },
  ],
  videoResponse: [
    {
      get question() {
        return i18n.t(
          'ui.sections.hiring.admin.candidate_details.why_did_you_choose_to_apply_to_this_company_5d144e5a',
        );
      },
      answer: videoResponse,
      type: 'video',
    },
    {
      get question() {
        return i18n.t(
          'ui.sections.hiring.admin.candidate_details.what_are_your_greatest_strengths_f7d073d3',
        );
      },
      answer: videoResponse,
      type: 'video',
    },
    {
      get question() {
        return i18n.t(
          'ui.sections.hiring.admin.candidate_details.how_do_you_prefer_to_work_on_tasks_3cf3f8ff',
        );
      },
      answer: videoResponse,
      type: 'video',
    },
  ],
};

const Questionaries = () => {
  const { t: translateUi } = useTranslation();
  const [openSections, setOpenSections] = useState({
    preScreen: true,
    videoResponse: true,
  });

  const handleToggle = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Stack
      sx={{
        gap: 5,
        height: 1,
      }}
    >
      <CollapsibleSection
        title={translateUi(
          'ui.sections.hiring.admin.candidate_details.pre_screen_questions_f97a476c',
        )}
        isOpen={openSections.preScreen}
        onToggle={() => handleToggle('preScreen')}
      >
        {questionaries.preScreenQuestions.map((item, index) => (
          <QuestionItem
            key={index}
            question={item.question}
            answer={item.answer}
            type={item.type}
            options={item.options}
            index={index}
          />
        ))}
      </CollapsibleSection>
      <CollapsibleSection
        title={translateUi('ui.sections.hiring.admin.candidate_details.video_response_d2c70c1d')}
        isOpen={openSections.videoResponse}
        onToggle={() => handleToggle('videoResponse')}
        sx={{ mb: 0 }}
      >
        {questionaries.videoResponse.map((item, index) => (
          <QuestionItem
            key={index}
            question={item.question}
            answer={item.answer}
            type={item.type}
            options={item.options}
            index={index}
          />
        ))}
      </CollapsibleSection>
    </Stack>
  );
};

export default Questionaries;
