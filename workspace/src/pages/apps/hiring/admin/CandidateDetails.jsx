import { Paper, Stack } from '@mui/material';
import i18n from 'locales/i18n';
import CandidateInfo from 'components/sections/hiring/admin/candidate-details/CandidateInfo';
import ProfileHeader from 'components/sections/hiring/admin/candidate-details/ProfileHeader';
import CandidateDetailsMain from 'components/sections/hiring/admin/candidate-details/main';

const candidateInfo = {
  contact: {
    email: 'lukeskywalker@gmail.com',
    phone: '+88 08264583489',
    address: 'Dhaka',
    website: 'lukeskywalker.com',
  },
  jobPreferences: {
    desiredSalary: '$10,000',
    referredBy: 'Jone Jone',
  },
  experiences: [
    {
      get title() {
        return i18n.t('ui.pages.apps.hiring.admin.director_of_human_resources_2a51820a');
      },
      company: 'Daffodil International University',
      duration: 'Dec, 2023 - Mar, 2024',
    },
    {
      get title() {
        return i18n.t('ui.pages.apps.hiring.admin.jr_ux_ui_designer_a3daf78a');
      },
      company: 'Mindscape Communications',
      duration: 'Dec, 2023 - Mar, 2024',
    },
    {
      get title() {
        return i18n.t('ui.pages.apps.hiring.admin.intern_f841f984');
      },
      company: 'Rangs Properties Limited',
      duration: 'Dec, 2023 - Mar, 2024',
    },
  ],
  education: [
    {
      degree: 'Director of Human Resources',
      institution: 'Daffodil International University',
      duration: 'Dec, 2023 - Mar, 2024',
    },
    {
      degree: 'Jr. UX/UI Designer',
      institution: 'Mindscape Communications',
      duration: 'Dec, 2023 - Mar, 2024',
    },
    {
      degree: 'Intern',
      institution: 'Rangs Properties Limited',
      duration: 'Dec, 2023 - Mar, 2024',
    },
  ],
};

const CandidateDetails = () => {
  return (
    <Stack
      sx={{
        height: 1,
      }}
    >
      <ProfileHeader />
      <Stack direction={{ xs: 'column', md: 'row' }} sx={{ height: 1 }}>
        <Paper background={1} sx={{ width: { md: 300, xl: 360 }, p: { xs: 3, lg: 5 } }}>
          <CandidateInfo
            contact={candidateInfo.contact}
            jobPreferences={candidateInfo.jobPreferences}
            experiences={candidateInfo.experiences}
            education={candidateInfo.education}
          />
        </Paper>

        <Paper sx={{ flex: 1, p: { xs: 3, lg: 5 } }}>
          <CandidateDetailsMain />
        </Paper>
      </Stack>
    </Stack>
  );
};

export default CandidateDetails;
