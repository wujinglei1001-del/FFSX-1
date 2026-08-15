import { useTranslation } from 'react-i18next';
import { Grid, Stack } from '@mui/material';
import PanelWrapper from '../PanelWrapper';
import EducationInfo from './EducationInfo';
import ExperienceInfo from './ExperienceInfo';
import PersonalInfoAside from './PersonalInfoAside';

export const PersonalTabPanel = ({ data }) => {
  const { t: translateUi } = useTranslation();
  return (
    <PanelWrapper title={translateUi('ui.sections.member.profile.profile_tabs.personal_40f07323')}>
      <Grid container columns={24} spacing={{ xs: 1, md: 5 }}>
        <Grid size={{ xs: 24, md: 15 }}>
          <Stack
            sx={{
              gap: 3,
              py: 3,
            }}
          >
            <ExperienceInfo data={data.experiences} />
            <EducationInfo data={data.education} />
          </Stack>
        </Grid>
        <Grid size={{ xs: 24, md: 9 }}>
          <PersonalInfoAside data={data.overview} />
        </Grid>
      </Grid>
    </PanelWrapper>
  );
};
