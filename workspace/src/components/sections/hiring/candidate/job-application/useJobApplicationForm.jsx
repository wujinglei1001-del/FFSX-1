import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import i18n from 'locales/i18n';
import * as yup from 'yup';

export const jobApplicationFormSchema = yup.object({
  personalInfo: yup
    .object({
      basic: yup
        .object({
          avatar: yup
            .mixed()
            .required(
              i18n.t('ui.sections.hiring.candidate.job_application.avatar_is_required_fc059e07'),
            ),
          firstName: yup
            .string()
            .required(
              i18n.t(
                'ui.sections.hiring.candidate.job_application.first_name_is_required_df38d55f',
              ),
            ),
          lastName: yup
            .string()
            .required(
              i18n.t('ui.sections.hiring.candidate.job_application.last_name_is_required_b1d9a735'),
            ),
          email: yup
            .string()
            .email(i18n.t('ui.sections.hiring.candidate.job_application.invalid_email_899a38bc'))
            .required(
              i18n.t('ui.sections.hiring.candidate.job_application.email_is_required_4da1d591'),
            ),
          phone: yup
            .string()
            .required(
              i18n.t(
                'ui.sections.hiring.candidate.job_application.phone_number_is_required_f845371b',
              ),
            ),
          currentAddress: yup
            .string()
            .required(
              i18n.t(
                'ui.sections.hiring.candidate.job_application.current_address_is_required_b49c377e',
              ),
            ),
          permanentAddress: yup
            .string()
            .required(
              i18n.t(
                'ui.sections.hiring.candidate.job_application.permanent_address_is_required_cac1300e',
              ),
            ),
        })
        .required(),

      education: yup
        .array()
        .of(
          yup
            .object({
              institutionName: yup
                .string()
                .required(
                  i18n.t(
                    'ui.sections.hiring.candidate.job_application.institution_name_is_required_6794f5a5',
                  ),
                ),
              degree: yup
                .string()
                .required(
                  i18n.t(
                    'ui.sections.hiring.candidate.job_application.degree_is_required_4b0f18c7',
                  ),
                ),
              location: yup
                .string()
                .required(
                  i18n.t(
                    'ui.sections.hiring.candidate.job_application.location_is_required_3997aae0',
                  ),
                ),
              timePeriod: yup
                .array()
                .of(yup.date().nullable().required())
                .length(2, 'Both start and end dates are required')
                .required(
                  i18n.t(
                    'ui.sections.hiring.candidate.job_application.please_select_a_date_range_f46eb05a',
                  ),
                )
                .test('both-dates-present', 'Both start and end dates are required', (value) => {
                  return Array.isArray(value) && value[0] !== null && value[1] !== null;
                }),
            })
            .required(),
        )
        .required(),

      experience: yup
        .array()
        .of(
          yup
            .object({
              institutionName: yup
                .string()
                .required(
                  i18n.t(
                    'ui.sections.hiring.candidate.job_application.institution_name_is_required_6794f5a5',
                  ),
                ),
              position: yup
                .string()
                .required(
                  i18n.t(
                    'ui.sections.hiring.candidate.job_application.degree_is_required_4b0f18c7',
                  ),
                ),
              location: yup
                .string()
                .required(
                  i18n.t(
                    'ui.sections.hiring.candidate.job_application.location_is_required_3997aae0',
                  ),
                ),
              timePeriod: yup
                .array()
                .of(yup.date().nullable().required())
                .length(2, 'Both start and end dates are required')
                .required(
                  i18n.t(
                    'ui.sections.hiring.candidate.job_application.please_select_a_date_range_f46eb05a',
                  ),
                )
                .test('both-dates-present', 'Both start and end dates are required', (value) => {
                  return Array.isArray(value) && value[0] !== null && value[1] !== null;
                }),
            })
            .required(),
        )
        .required(),

      additionalInfo: yup
        .object({
          desiredSalary: yup
            .number()
            .typeError(
              i18n.t(
                'ui.sections.hiring.candidate.job_application.salary_must_be_a_number_3466d8c9',
              ),
            )
            .positive('Salary must be greater than 0')
            .required(
              i18n.t('ui.sections.hiring.candidate.job_application.salary_is_required_0b23dfe3'),
            ),
          refferedBy: yup
            .string()
            .required(
              i18n.t(
                'ui.sections.hiring.candidate.job_application.reffered_by_is_required_4e69362d',
              ),
            ),
          website: yup
            .string()
            .required(
              i18n.t('ui.sections.hiring.candidate.job_application.website_is_required_bc6360b3'),
            ),
        })
        .required(),
    })
    .required(),

  documents: yup
    .object({
      resume: yup
        .array()
        .of(
          yup
            .object({
              id: yup.string().required(),
              file: yup.mixed().required(),
            })
            .required(),
        )
        .min(1, i18n.t('ui.sections.hiring.candidate.job_application.resume_is_required_0aac352c'))
        .required(),
      coverLetter: yup
        .array()
        .of(
          yup
            .object({
              id: yup.string().required(),
              file: yup.mixed().required(),
            })
            .required(),
        )
        .required(),
    })
    .required(),

  questionaries: yup
    .object({
      preScreen: yup
        .object({
          applyingReason: yup
            .string()
            .required(
              i18n.t(
                'ui.sections.hiring.candidate.job_application.applying_reason_is_required_110c6a2c',
              ),
            ),
          greatestStrengths: yup
            .string()
            .required(
              i18n.t(
                'ui.sections.hiring.candidate.job_application.greatest_strengths_is_required_dc991ad2',
              ),
            ),
          workPreference: yup
            .string()
            .oneOf(
              ['independent', 'collaborative', 'clear-deadline', 'creative-freedom'],
              i18n.t(
                'ui.sections.hiring.candidate.job_application.invalid_work_preference_3adb2055',
              ),
            )
            .required(
              i18n.t(
                'ui.sections.hiring.candidate.job_application.work_preference_is_required_ac9c564b',
              ),
            ),
          remoteWork: yup.string().oneOf(['yes', 'no']).required(),
        })
        .required(),
      videoResponse: yup
        .object({
          strengthsAndWeaknesses: yup
            .array()
            .of(
              yup
                .object({
                  id: yup.string().required(),
                  file: yup.mixed().required(),
                })
                .required(),
            )
            .required(),
          applyingReason: yup
            .array()
            .of(
              yup
                .object({
                  id: yup.string().required(),
                  file: yup.mixed().required(),
                })
                .required(),
            )
            .required(),
        })
        .required(),
    })
    .required(),
});

const useJobApplicationForm = () => {
  const methods = useForm({
    resolver: yupResolver(jobApplicationFormSchema),
    defaultValues: {
      personalInfo: {
        education: [{}, {}],
        experience: [{}, {}],
        additionalInfo: {
          desiredSalary: 0,
        },
      },
      questionaries: {
        preScreen: {
          workPreference: 'independent',
          remoteWork: 'no',
        },
      },
    },
  });

  return { methods };
};

export default useJobApplicationForm;
