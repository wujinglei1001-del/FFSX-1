import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { appraisalList } from 'data/hrm/performance-management';
import i18n from 'locales/i18n';
import * as yup from 'yup';

export const userSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().required(),
  avatar: yup.string().required(),
  email: yup.string().email().required(),
  status: yup.string().required(),
});

const appraisalMemberSchema = userSchema.shape({
  empId: yup.string().required(),
});

export const addMemberFormSchema = yup.object({
  member: appraisalMemberSchema.required(),

  department: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.hrm.performance_management.appraisal_list.department_is_required_0c4a29d6',
      ),
    ),

  template: yup
    .string()
    .required(
      i18n.t('ui.sections.hrm.performance_management.appraisal_list.template_is_required_0391b447'),
    ),

  appraisalName: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.hrm.performance_management.appraisal_list.appraisal_name_is_required_07a18773',
      ),
    ),

  startDate: yup
    .date()
    .required(
      i18n.t(
        'ui.sections.hrm.performance_management.appraisal_list.start_date_is_required_438387af',
      ),
    ),

  endDate: yup
    .date()
    .required(
      i18n.t('ui.sections.hrm.performance_management.appraisal_list.end_date_is_required_0f750cd5'),
    )
    .min(
      yup.ref('startDate'),
      i18n.t(
        'ui.sections.hrm.performance_management.appraisal_list.end_date_cannot_be_before_start_date_36b168e1',
      ),
    ),

  mainEvaluator: userSchema.required(),

  otherEvaluators: userSchema.required(),
});

const useAddMemberForm = () => {
  const methods = useForm({
    resolver: yupResolver(addMemberFormSchema),
    defaultValues: {
      member: appraisalList[0].member,
      department: 'Engineering',
      template: 'Annual Review',
      appraisalName: 'Mid-Year Appraisal',
      mainEvaluator: appraisalList[0].mainEvaluator,
      otherEvaluators: appraisalList[0].otherEvaluators[0],
      startDate: appraisalList[0].fromDate,
      endDate: appraisalList[0].toDate,
    },
  });

  const startDate = methods.watch('startDate');
  const endDate = methods.watch('endDate');

  useEffect(() => {
    if (startDate && endDate && startDate > endDate) {
      methods.setValue('endDate', startDate, { shouldValidate: true });
    }
  }, [startDate, endDate, methods.setValue]);
  return methods;
};

export default useAddMemberForm;
