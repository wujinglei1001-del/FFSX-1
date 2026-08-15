import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TabContext, TabPanel } from '@mui/lab';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import * as yup from 'yup';
import BackgroundOptions from './BackgroundOptions';

export const backgroundOptionFormSchema = yup.object({});

const Background = ({ actionButton }) => {
  const { t: translateUi } = useTranslation();
  const [currentOptionType, setCurrentOptionType] = useState('image');

  const handleOptionTypeChange = (event) => {
    const selectedType = event.target.value;
    setCurrentOptionType(selectedType);
  };

  return (
    <Box sx={{ mb: 5 }}>
      <TabContext value={currentOptionType}>
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <RadioGroup row value={currentOptionType} onChange={handleOptionTypeChange}>
            <FormControlLabel
              value="image"
              control={<Radio />}
              label={translateUi('ui.sections.kanban.create_board.steps.images_09e871c9')}
            />
            <FormControlLabel
              value="color"
              control={<Radio />}
              label={translateUi('ui.sections.kanban.create_board.steps.colors_88d5e4ca')}
            />
          </RadioGroup>
        </FormControl>

        <TabPanel value="image" sx={{ p: 0 }} keepMounted>
          <BackgroundOptions type="image" name="images" actionButton={actionButton} />
        </TabPanel>
        <TabPanel value="color" sx={{ p: 0 }} keepMounted>
          <BackgroundOptions type="color" name="colors" actionButton={actionButton} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Background;
