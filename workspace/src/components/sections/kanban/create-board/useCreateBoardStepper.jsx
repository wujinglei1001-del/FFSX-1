import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import {
  backgroundColorOptions,
  backgroundImageOptions,
  initialTeamTableData,
} from 'data/kanban/createBoard';
import i18n from 'locales/i18n';
import { backgroundOptionFormSchema } from 'components/sections/kanban/create-board/steps/Background/Background';
import { basicInfoFormSchema } from 'components/sections/kanban/create-board/steps/BasicInfo';
import { columnInfoSchema } from 'components/sections/kanban/create-board/steps/ColumnStage/ColumnStage';
import { labelInfoFormSchema } from 'components/sections/kanban/create-board/steps/LabelInfo';
import { newTeamFormSchema } from 'components/sections/kanban/create-board/steps/TeamInvite/NewTeamTabPanel';

const validationSchemas = [
  basicInfoFormSchema,
  columnInfoSchema,
  backgroundOptionFormSchema,
  labelInfoFormSchema,
  newTeamFormSchema,
];

const useCreateBoardForm = (activeStep) => {
  const { palette } = useTheme();
  const methods = useForm({
    resolver: yupResolver(validationSchemas[activeStep]),
    defaultValues: {
      name: '',
      boardType: '',
      visibility: 'private',
      columns: [
        { columnType: 'To Do', color: palette.success.lighter, cardLimit: 20, hasCardLimit: true },
        {
          columnType: 'Completed',
          color: palette.primary.lighter,
          cardLimit: 20,
          hasCardLimit: true,
        },
        {
          columnType: 'Ongoing',
          color: palette.warning.lighter,
          cardLimit: 20,
          hasCardLimit: true,
        },
      ],
      backgroundOptions: {
        colors: backgroundColorOptions,
        images: backgroundImageOptions,
        selected: { ...backgroundImageOptions[0], type: 'image' },
      },
      labels: [
        {
          get label() {
            return i18n.t('ui.sections.kanban.create_board.usecreateboardstepper.todo_fdebf667');
          },
          color: palette.success.lighter,
        },
        {
          get label() {
            return i18n.t(
              'ui.sections.kanban.create_board.usecreateboardstepper.completed_1798b3ba',
            );
          },
          color: palette.primary.lighter,
        },
        {
          get label() {
            return i18n.t('ui.sections.kanban.create_board.usecreateboardstepper.ongoing_2e0254c2');
          },
          color: palette.warning.lighter,
        },
      ],
      team: initialTeamTableData,
    },
  });

  return methods;
};

export default useCreateBoardForm;
