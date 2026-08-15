import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import i18n from 'locales/i18n';
import * as yup from 'yup';

export const CreateEventFormSchema = yup.object({
  name: yup
    .string()
    .required(
      i18n.t('ui.sections.events.create_event.usecreateeventform.this_field_is_required_dedbaded'),
    ),
  address: yup
    .string()
    .required(
      i18n.t('ui.sections.events.create_event.usecreateeventform.this_field_is_required_dedbaded'),
    ),
  eventDateRange: yup
    .array()
    .of(yup.date().nullable())
    .length(2, 'Both start and end dates are required')
    .required(
      i18n.t(
        'ui.sections.events.create_event.usecreateeventform.please_select_a_date_range_f46eb05a',
      ),
    )
    .test('both-dates-present', 'Both start and end dates are required', (value) => {
      return Array.isArray(value) && value[0] !== null && value[1] !== null;
    }),

  startTime1: yup
    .string()
    .required(
      i18n.t('ui.sections.events.create_event.usecreateeventform.this_field_is_required_dedbaded'),
    ),
  endTime1: yup
    .string()
    .required(
      i18n.t('ui.sections.events.create_event.usecreateeventform.this_field_is_required_dedbaded'),
    ),
  startTime2: yup
    .string()
    .required(
      i18n.t('ui.sections.events.create_event.usecreateeventform.this_field_is_required_dedbaded'),
    ),
  endTime2: yup
    .string()
    .required(
      i18n.t('ui.sections.events.create_event.usecreateeventform.this_field_is_required_dedbaded'),
    ),

  eventImages: yup
    .array()
    .of(
      yup
        .object({
          id: yup
            .string()
            .required(
              i18n.t(
                'ui.sections.events.create_event.usecreateeventform.this_field_is_required_dedbaded',
              ),
            ),
          file: yup
            .mixed()
            .required(
              i18n.t(
                'ui.sections.events.create_event.usecreateeventform.file_is_required_7ef4e9c0',
              ),
            ),
        })
        .required(),
    )
    .min(
      1,
      i18n.t(
        'ui.sections.events.create_event.usecreateeventform.upload_at_least_1_media_file_87db6674',
      ),
    )
    .required(),
  sections: yup.array().of(
    yup.object({
      title: yup
        .string()
        .required(
          i18n.t(
            'ui.sections.events.create_event.usecreateeventform.this_field_is_required_dedbaded',
          ),
        ),
      contentType: yup.string().oneOf(['paragraph', 'list', 'info']).required(),
      listItems: yup
        .array()
        .of(
          yup.object({
            value: yup
              .string()
              .required(
                i18n.t(
                  'ui.sections.events.create_event.usecreateeventform.this_field_is_required_dedbaded',
                ),
              ),
            itemId: yup.string().required(),
          }),
        )
        .optional()
        .nullable(),
      infoItems: yup
        .array()
        .of(
          yup.object({
            option: yup
              .string()
              .required(
                i18n.t(
                  'ui.sections.events.create_event.usecreateeventform.this_field_is_required_dedbaded',
                ),
              ),
            value: yup
              .string()
              .required(
                i18n.t(
                  'ui.sections.events.create_event.usecreateeventform.this_field_is_required_dedbaded',
                ),
              ),
            itemId: yup.string().required(),
          }),
        )
        .optional()
        .nullable(),
      paragraphContents: yup
        .string()
        .nullable()
        .test('validate-paragraph', 'Paragraph content is required', (value, context) => {
          return context.parent.contentType !== 'paragraph' || !!value;
        }),
      images: yup
        .array()
        .of(
          yup.object({
            id: yup.string().required(),
            file: yup.mixed().required(),
          }),
        )
        .optional(),
      imageAlignment: yup.mixed().optional(),
    }),
  ),
  ticketPricing: yup.object({
    ticketType: yup.string().oneOf(['free', 'paid']).required(),
    options: yup
      .array()
      .of(
        yup.object({
          name: yup
            .string()
            .required(
              i18n.t(
                'ui.sections.events.create_event.usecreateeventform.this_field_is_required_dedbaded',
              ),
            ),
          price: yup
            .number()
            .positive('This field is required')
            .nullable()
            .required(
              i18n.t(
                'ui.sections.events.create_event.usecreateeventform.this_field_is_required_dedbaded',
              ),
            ),
          noOfTickets: yup
            .number()
            .required(
              i18n.t(
                'ui.sections.events.create_event.usecreateeventform.this_field_is_required_dedbaded',
              ),
            )
            .positive('This field is required')
            .nullable()
            .required(
              i18n.t(
                'ui.sections.events.create_event.usecreateeventform.this_field_is_required_dedbaded',
              ),
            ),
          facilities: yup
            .array()
            .of(
              yup
                .string()
                .required(
                  i18n.t(
                    'ui.sections.events.create_event.usecreateeventform.this_field_is_required_dedbaded',
                  ),
                ),
            )
            .min(
              1,
              i18n.t(
                'ui.sections.events.create_event.usecreateeventform.this_field_is_required_dedbaded',
              ),
            ),
        }),
      )
      .when('isTicketFree', {
        is: false,
        then: (schema) =>
          schema.min(
            1,
            i18n.t(
              'ui.sections.events.create_event.usecreateeventform.ticket_option_is_required_e6dbcc32',
            ),
          ),
        otherwise: (schema) => schema.notRequired().nullable(),
      }),
  }),

  eventPrivacy: yup.mixed().required(),
});

const useCreateEventForm = () => {
  const methods = useForm({
    resolver: yupResolver(CreateEventFormSchema),
    defaultValues: {
      startTime1: '',
      startTime2: '',
      endTime1: '',
      endTime2: '',
      eventImages: [],
      sections: [
        {
          title: '',
          contentType: 'paragraph',
          paragraphContents: '',
        },
        {
          title: '',
          contentType: 'info',

          infoItems: [
            { option: '', value: '', itemId: 'item1' },
            { option: '', value: '', itemId: 'item2' },
            { option: '', value: '', itemId: 'item3' },
          ],
        },
        {
          title: '',
          contentType: 'list',

          listItems: [
            { value: '', itemId: 'item1' },
            { value: '', itemId: 'item2' },
            { value: '', itemId: 'item3' },
          ],
        },
      ],
      ticketPricing: {
        ticketType: 'paid',
        options: [
          {
            name: '',
            facilities: ['Club', 'Stadium', 'Arena', 'Pool'],
          },
        ],
      },
    },
  });

  return { methods };
};

export default useCreateEventForm;
