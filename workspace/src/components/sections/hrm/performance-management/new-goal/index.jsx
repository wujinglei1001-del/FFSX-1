import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import i18n from 'locales/i18n';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import AssignResponsibility from './AssignResponsibility';
import GoalDetailsForm from './GoalDetailsForm';
import ProgressWeightForm from './ProgressWeightForm';

const Form = styled('form')``;

export const createNewGoalFormSchema = yup.object().shape({
  goalDetails: yup.object({
    name: yup
      .string()
      .required(
        i18n.t('ui.sections.hrm.performance_management.new_goal.goal_name_is_required_336f880b'),
      ),
    description: yup
      .string()
      .required(
        i18n.t('ui.sections.hrm.performance_management.new_goal.description_is_required_b8177e6b'),
      ),
    startDate: yup
      .string()
      .required(
        i18n.t('ui.sections.hrm.performance_management.new_goal.start_date_is_required_438387af'),
      ),
    dueDate: yup
      .string()
      .required(
        i18n.t('ui.sections.hrm.performance_management.new_goal.due_date_is_required_e0a2406f'),
      ),
    status: yup
      .mixed()
      .required(
        i18n.t('ui.sections.hrm.performance_management.new_goal.status_is_required_d88cae16'),
      ),
    priority: yup
      .string()
      .required(
        i18n.t('ui.sections.hrm.performance_management.new_goal.priority_is_required_d0f01e4d'),
      ),
  }),
  progressWeight: yup.object({
    completion: yup
      .number()
      .required(
        i18n.t('ui.sections.hrm.performance_management.new_goal.completion_is_required_21cc08fb'),
      ),
    weight: yup
      .number()
      .required(
        i18n.t('ui.sections.hrm.performance_management.new_goal.weight_is_required_8c27877e'),
      ),
    addSubGoal: yup.boolean().required(''),
    subGoals: yup
      .array()
      .of(
        yup.object({
          goal: yup
            .string()
            .required(
              i18n.t(
                'ui.sections.hrm.performance_management.new_goal.sub_goal_is_required_28f5b30b',
              ),
            ),
        }),
      )
      .when('addSubGoal', {
        is: true,
        then: (schema) =>
          schema.min(
            1,
            i18n.t('ui.sections.hrm.performance_management.new_goal.sub_goal_is_required_28f5b30b'),
          ),
        otherwise: (schema) => schema.notRequired().nullable(),
      }),
  }),
  assignResponsibility: yup.object({
    mode: yup
      .mixed()
      .required(
        i18n.t('ui.sections.hrm.performance_management.new_goal.mode_is_required_58d0a7b0'),
      ),
    department: yup
      .string()
      .required(
        i18n.t('ui.sections.hrm.performance_management.new_goal.department_is_required_0c4a29d6'),
      ),
    team: yup
      .string()
      .required(
        i18n.t('ui.sections.hrm.performance_management.new_goal.team_is_required_dd76bf76'),
      ),
    jobTitle: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.hrm.performance_management.new_goal.employee_job_title_is_required_2ca67c7c',
        ),
      ),
    additionalEmployee: yup.string(),
  }),
});

const CreateNewGoalForm = () => {
  const { t: translateUi } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(createNewGoalFormSchema),
    defaultValues: {
      goalDetails: {
        startDate: '2025-06-01',
        dueDate: '2025-06-08',
        status: 'High',
        priority: 'High',
      },
      progressWeight: {
        completion: 30,
        weight: 10,
        addSubGoal: true,
        subGoals: [
          { goal: 'Design new UI mockups' },
          { goal: 'Develop frontend components' },
          { goal: 'Implement backend APIs' },
        ],
      },
      assignResponsibility: {
        mode: 'bulk',
      },
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data) => {
    console.log('Create New Goal Form Data:', data);
    enqueueSnackbar('New goal created successfully!', { variant: 'success' });
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack
          sx={{
            gap: 5,
            mb: 5,
          }}
        >
          <GoalDetailsForm />
          <ProgressWeightForm />
          <AssignResponsibility />
        </Stack>
        <Stack
          direction="row"
          sx={{
            justifyContent: 'flex-end',
            gap: 1,
          }}
        >
          <Button variant="soft" color="neutral">
            {translateUi('ui.sections.hrm.performance_management.new_goal.cancel_77dfd213')}
          </Button>
          <Button type="submit" variant="contained">
            {translateUi('ui.sections.hrm.performance_management.new_goal.save_efc007a3')}
          </Button>
        </Stack>
      </Form>
    </FormProvider>
  );
};

export default CreateNewGoalForm;
