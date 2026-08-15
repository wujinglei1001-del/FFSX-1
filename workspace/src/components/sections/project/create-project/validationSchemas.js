import i18n from 'locales/i18n';
import * as yup from 'yup';

const projectTitleSchema = yup.object({
  projectTitle: yup
    .string()
    .required(
      i18n.t(
        'ui.sections.project.create_project.validationschemas.project_title_is_required_b5406b5d',
      ),
    ),
});

const tasksSchema = yup.object({
  tasks: yup
    .array()
    .of(
      yup.object({
        value: yup.string().defined(),
        id: yup.string().optional(),
        label: yup.string().optional(),
        startDate: yup.string().optional(),
        endDate: yup.string().optional(),
      }),
    )
    .required(),
});

const groupSchema = yup.object({
  groups: yup
    .array()
    .of(
      yup.object({
        label: yup.string().defined(),
        color: yup.string().defined(),
      }),
    )
    .required(),
});

const statusSchema = yup.object({
  statuses: yup.object({
    incomplete: yup
      .array()
      .of(
        yup.object({
          label: yup.string().defined(),
          color: yup.string().defined(),
        }),
      )
      .required(),
    active: yup
      .array()
      .of(
        yup.object({
          label: yup.string().defined(),
          color: yup.string().defined(),
        }),
      )
      .required(),
    completed: yup
      .array()
      .of(
        yup.object({
          label: yup.string().defined(),
          color: yup.string().defined(),
        }),
      )
      .required(),
  }),
});

const inviteSchema = yup.object({
  teamId: yup.string().defined(),
  collaborators: yup
    .array()
    .of(
      yup.object({
        email: yup.string().defined(),
        userId: yup.number().optional(),
        name: yup.string().optional(),
        avatar: yup.string().optional(),
      }),
    )
    .required(),
});

const defaultViewSchema = yup.object({
  defaultView: yup.string().optional(),
});

export const validationSchemas = [
  projectTitleSchema,
  tasksSchema,
  groupSchema,
  statusSchema,
  inviteSchema,
  defaultViewSchema,
];
