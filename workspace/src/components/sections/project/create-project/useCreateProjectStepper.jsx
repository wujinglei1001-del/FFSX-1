import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import dayjs from 'dayjs';
import i18n from 'locales/i18n';
import { labelOptions } from './common/helpers';
import { validationSchemas } from './validationSchemas';

const useCreateProjectStepper = (activeStep) => {
  const theme = useTheme();
  const methods = useForm({
    resolver: yupResolver(validationSchemas[activeStep]),
    defaultValues: {
      projectTitle: '',
      tasks: [
        {
          value: '',
          id: 'task-initial',
          label: labelOptions[0],
          startDate: dayjs().toISOString(),
          endDate: dayjs().add(1, 'day').toISOString(),
        },
      ],
      groups: [{ label: '', color: theme.palette.primary.main }],
      statuses: {
        incomplete: [
          {
            get label() {
              return i18n.t(
                'ui.sections.project.create_project.usecreateprojectstepper.pending_96f608c1',
              );
            },
            color: theme.palette.grey[200],
          },
        ],
        active: [
          {
            get label() {
              return i18n.t(
                'ui.sections.project.create_project.usecreateprojectstepper.doing_9f1ffa41',
              );
            },
            color: theme.palette.primary.main,
          },
        ],
        completed: [
          {
            get label() {
              return i18n.t(
                'ui.sections.project.create_project.usecreateprojectstepper.done_e9b450d1',
              );
            },
            color: theme.palette.success.main,
          },
        ],
      },
      teamId: '',
      collaborators: [{ email: '', userId: undefined, name: '', avatar: '' }],
      defaultView: undefined,
    },
    mode: 'onSubmit',
  });

  return methods;
};

export default useCreateProjectStepper;
