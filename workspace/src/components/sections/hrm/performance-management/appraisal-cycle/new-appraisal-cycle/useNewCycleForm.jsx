import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { users } from 'data/users';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import { userSchema } from '../../appraisal-list/add-member/useAddMemberForm';

export const newCycleFormSchema = yup.object({
  name: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.hrm.performance_management.appraisal_cycle.cycle_name_is_required_576da088',
      ),
    ),
  reviewPeriod: yup
    .tuple([
      yup
        .date()
        .required(
          i18n.t(
            'ui.sections.hrm.performance_management.appraisal_cycle.start_date_is_required_438387af',
          ),
        ),
      yup
        .date()
        .required(
          i18n.t(
            'ui.sections.hrm.performance_management.appraisal_cycle.end_date_is_required_0f750cd5',
          ),
        ),
    ])
    .required(
      i18n.t(
        'ui.sections.hrm.performance_management.appraisal_cycle.please_select_a_date_range_f46eb05a',
      ),
    )
    .test('chronological', 'End date cannot be before start date', (value) => {
      if (!value) return false;
      const [start, end] = value;
      return start && end && end >= start;
    }),

  startDate: yup
    .date()
    .required(
      i18n.t(
        'ui.sections.hrm.performance_management.appraisal_cycle.start_date_is_required_438387af',
      ),
    ),
  dueDate: yup
    .date()
    .required(
      i18n.t(
        'ui.sections.hrm.performance_management.appraisal_cycle.due_date_is_required_e0a2406f',
      ),
    )
    .min(
      yup.ref('startDate'),
      i18n.t(
        'ui.sections.hrm.performance_management.appraisal_cycle.due_date_cannot_be_before_start_date_de30af4d',
      ),
    ),
  mainEvaluator: userSchema.required(),
  template: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.hrm.performance_management.appraisal_cycle.template_is_required_0391b447',
      ),
    ),
});

const useNewCycleForm = () => {
  const methods = useForm({
    resolver: yupResolver(newCycleFormSchema),
    defaultValues: {
      name: '',
      reviewPeriod: [new Date(2025, 0, 7), new Date(2025, 1, 2)],
      startDate: new Date(2025, 3, 1),
      dueDate: new Date(2025, 3, 28),
      mainEvaluator: users[0],
      template: 'Annual Review',
    },
  });
  return methods;
};

export default useNewCycleForm;
