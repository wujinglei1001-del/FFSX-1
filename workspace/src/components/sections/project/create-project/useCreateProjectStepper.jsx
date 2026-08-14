import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '@mui/material';
import dayjs from 'dayjs';
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
        incomplete: [{ label: 'Pending', color: theme.palette.grey[200] }],
        active: [{ label: 'Doing', color: theme.palette.primary.main }],
        completed: [{ label: 'Done', color: theme.palette.success.main }],
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
