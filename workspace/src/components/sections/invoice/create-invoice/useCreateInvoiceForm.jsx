import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import i18n from 'locales/i18n';
import * as yup from 'yup';

export const CreateInvoiceFormSchema = yup.object({
  organizationImage: yup
    .object({
      id: yup
        .string()
        .required(
          i18n.t(
            'ui.sections.invoice.create_invoice.usecreateinvoiceform.this_field_is_required_ab90d9d7',
          ),
        ),
      file: yup
        .mixed()
        .required(
          i18n.t(
            'ui.sections.invoice.create_invoice.usecreateinvoiceform.this_field_is_required_ab90d9d7',
          ),
        ),
    })
    .nullable()
    .required(
      i18n.t('ui.sections.invoice.create_invoice.usecreateinvoiceform.upload_an_image_63e0d463'),
    ),
  invoiceFrom: yup.object({
    name: yup
      .string()
      .required(
        i18n.t('ui.sections.invoice.create_invoice.usecreateinvoiceform.name_is_required_222c72b1'),
      ),
    phone: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.invoice.create_invoice.usecreateinvoiceform.phone_is_required_353837cc',
        ),
      ),
    email: yup
      .string()
      .email(
        i18n.t('ui.sections.invoice.create_invoice.usecreateinvoiceform.invalid_email_899a38bc'),
      )
      .required(
        i18n.t(
          'ui.sections.invoice.create_invoice.usecreateinvoiceform.email_is_required_4da1d591',
        ),
      ),
    address: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.invoice.create_invoice.usecreateinvoiceform.address_is_required_34bb744a',
        ),
      ),
  }),
  invoiceTo: yup.object({
    name: yup
      .string()
      .required(
        i18n.t('ui.sections.invoice.create_invoice.usecreateinvoiceform.name_is_required_222c72b1'),
      ),
    phone: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.invoice.create_invoice.usecreateinvoiceform.phone_is_required_353837cc',
        ),
      ),
    email: yup
      .string()
      .email(
        i18n.t('ui.sections.invoice.create_invoice.usecreateinvoiceform.invalid_email_899a38bc'),
      )
      .required(
        i18n.t(
          'ui.sections.invoice.create_invoice.usecreateinvoiceform.email_is_required_4da1d591',
        ),
      ),
    address: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.invoice.create_invoice.usecreateinvoiceform.address_is_required_34bb744a',
        ),
      ),
  }),
  invoiceDetails: yup.object({
    invoiceNumber: yup
      .number()
      .nullable()
      .typeError(
        i18n.t(
          'ui.sections.invoice.create_invoice.usecreateinvoiceform.invoice_number_must_be_a_number_2b38d281',
        ),
      )
      .required(
        i18n.t(
          'ui.sections.invoice.create_invoice.usecreateinvoiceform.invoice_number_is_required_f22b6243',
        ),
      ),
    status: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.invoice.create_invoice.usecreateinvoiceform.status_is_required_d88cae16',
        ),
      ),
  }),
  deadline: yup.object({
    issueDate: yup
      .date()
      .nullable()
      .typeError(
        i18n.t('ui.sections.invoice.create_invoice.usecreateinvoiceform.invalid_date_3f45d8cc'),
      )
      .required(
        i18n.t(
          'ui.sections.invoice.create_invoice.usecreateinvoiceform.issue_date_is_required_1db4f692',
        ),
      ),
    dueDate: yup
      .date()
      .nullable()
      .typeError(
        i18n.t('ui.sections.invoice.create_invoice.usecreateinvoiceform.invalid_date_3f45d8cc'),
      )
      .required(
        i18n.t(
          'ui.sections.invoice.create_invoice.usecreateinvoiceform.due_date_is_required_e0a2406f',
        ),
      )
      .min(
        yup.ref('issueDate'),
        i18n.t(
          'ui.sections.invoice.create_invoice.usecreateinvoiceform.due_date_must_be_after_issue_date_ba20027c',
        ),
      ),
  }),
  orderCharges: yup.object({
    currency: yup
      .string()
      .required(
        i18n.t(
          'ui.sections.invoice.create_invoice.usecreateinvoiceform.currency_is_required_64b8e35a',
        ),
      ),
    shippingCost: yup
      .number()
      .typeError(
        i18n.t(
          'ui.sections.invoice.create_invoice.usecreateinvoiceform.shipping_cost_must_be_a_number_b970629d',
        ),
      )
      .nullable()
      .required(
        i18n.t(
          'ui.sections.invoice.create_invoice.usecreateinvoiceform.shipping_cost_is_required_fc43d48d',
        ),
      ),
  }),
  adjustment: yup.object({
    discount: yup
      .number()
      .typeError(
        i18n.t(
          'ui.sections.invoice.create_invoice.usecreateinvoiceform.discount_must_be_a_number_aa058455',
        ),
      )
      .nullable()
      .required(
        i18n.t(
          'ui.sections.invoice.create_invoice.usecreateinvoiceform.discount_is_required_85b6aa75',
        ),
      ),
    tax: yup
      .number()
      .typeError(
        i18n.t(
          'ui.sections.invoice.create_invoice.usecreateinvoiceform.tax_must_be_a_number_7c9a7f7f',
        ),
      )
      .nullable()
      .required(
        i18n.t('ui.sections.invoice.create_invoice.usecreateinvoiceform.tax_is_required_db25c523'),
      ),
  }),
  itemDetails: yup
    .array()
    .of(
      yup.object({
        type: yup
          .mixed()
          .oneOf(
            ['service', 'product'],
            i18n.t('ui.sections.invoice.create_invoice.usecreateinvoiceform.invalid_type_c60b8ada'),
          )
          .required(
            i18n.t(
              'ui.sections.invoice.create_invoice.usecreateinvoiceform.item_type_is_required_12ee7ebc',
            ),
          ),
        description: yup
          .string()
          .required(
            i18n.t(
              'ui.sections.invoice.create_invoice.usecreateinvoiceform.description_is_required_b8177e6b',
            ),
          ),
        quantity: yup
          .number()
          .typeError(
            i18n.t(
              'ui.sections.invoice.create_invoice.usecreateinvoiceform.quantity_must_be_a_number_fb0578a5',
            ),
          )
          .positive('Quantity must be greater than 0')
          .required(
            i18n.t(
              'ui.sections.invoice.create_invoice.usecreateinvoiceform.quantity_is_required_205d1ca6',
            ),
          ),
        price: yup
          .number()
          .typeError(
            i18n.t(
              'ui.sections.invoice.create_invoice.usecreateinvoiceform.price_must_be_a_number_e1ea37ee',
            ),
          )
          .positive('Price must be greater than 0')
          .required(
            i18n.t(
              'ui.sections.invoice.create_invoice.usecreateinvoiceform.price_is_required_2fa9daf0',
            ),
          ),
      }),
    )
    .min(
      1,
      i18n.t(
        'ui.sections.invoice.create_invoice.usecreateinvoiceform.at_least_one_item_is_required_12c80bba',
      ),
    )
    .required(
      i18n.t('ui.sections.invoice.create_invoice.usecreateinvoiceform.items_are_required_fcfca7d0'),
    ),
  note: yup.string(),
});
export const useCreateInvoiceForm = () => {
  const methods = useForm({
    resolver: yupResolver(CreateInvoiceFormSchema),
    defaultValues: {
      organizationImage: null,
      invoiceFrom: {
        get name() {
          return i18n.t(
            'ui.sections.invoice.create_invoice.usecreateinvoiceform.themewagon_4ba48b41',
          );
        },
        phone: '+123456789012',
        email: 'contact@ffax.com',
        address: 'Wilmington, DE, US 19802-4447',
      },
      invoiceTo: {
        name: '',
        phone: '',
        email: '',
        address: '',
      },
      invoiceDetails: {
        invoiceNumber: null,
        status: '',
      },
      deadline: {
        issueDate: null,
        dueDate: null,
      },
      orderCharges: {
        currency: '',
        shippingCost: null,
      },
      adjustment: {
        discount: null,
        tax: null,
      },
      itemDetails: [
        {
          type: 'service',
          get description() {
            return i18n.t(
              'ui.sections.invoice.create_invoice.usecreateinvoiceform.web_design_service_08d28db3',
            );
          },
          quantity: 3,
          price: 50,
        },
        {
          type: 'product',
          get description() {
            return i18n.t(
              'ui.sections.invoice.create_invoice.usecreateinvoiceform.soft_set_bb2a923b',
            );
          },
          quantity: 2,
          price: 80,
        },
        {
          type: 'service',
          get description() {
            return i18n.t(
              'ui.sections.invoice.create_invoice.usecreateinvoiceform.facebook_add_campaign_d5b56324',
            );
          },
          quantity: 1,
          price: 50,
        },
      ],
      note: '',
    },
  });
  return { methods };
};
