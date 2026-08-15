import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Stack, Tab } from '@mui/material';
import CandidateDocuments from './CandidateDocuments';
import Notes from './Notes';
import Questionaries from './questionaries';
import Scorecard from './scrorecard';

const CandidateDetailsMain = () => {
  const { t: translateUi } = useTranslation();
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <Stack sx={{ height: 1 }}>
      <TabContext value={value}>
        <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto">
          <Tab
            label={translateUi('ui.sections.hiring.admin.candidate_details.documents_687c8286')}
            value="1"
          />
          <Tab
            label={translateUi('ui.sections.hiring.admin.candidate_details.questionaries_c61f723a')}
            value="2"
          />
          <Tab
            label={translateUi('ui.sections.hiring.admin.candidate_details.notes_70440046')}
            value="3"
          />
          <Tab
            label={translateUi('ui.sections.hiring.admin.candidate_details.scorecard_49c9f38f')}
            value="4"
          />
        </TabList>

        <TabPanel sx={{ p: 0, pt: 5, height: 1 }} value="1">
          <CandidateDocuments />
        </TabPanel>
        <TabPanel sx={{ p: 0, pt: 5, height: 1 }} value="2">
          <Questionaries />
        </TabPanel>
        <TabPanel sx={{ p: 0, pt: 5, height: 1 }} value="3">
          <Notes />
        </TabPanel>
        <TabPanel sx={{ p: 0, pt: 5, height: 1 }} value="4">
          <Scorecard />
        </TabPanel>
      </TabContext>
    </Stack>
  );
};

export default CandidateDetailsMain;
