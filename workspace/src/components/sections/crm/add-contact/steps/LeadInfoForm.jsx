import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Autocomplete,
  Box,
  Divider,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import i18n from 'locales/i18n';
import * as yup from 'yup';
import ContactFormSection from 'components/sections/crm/add-contact/ContactFormSection';
import ControlledSelect from 'components/sections/crm/add-contact/ControlledSelect';

export const leadInfoSchema = yup.object({
  leadInfo: yup.object({
    source: yup
      .string()
      .required(i18n.t('ui.sections.crm.add_contact.steps.lead_source_is_required_561f55a2')),
    assignedAgent: yup
      .string()
      .required(i18n.t('ui.sections.crm.add_contact.steps.assigned_agent_is_required_bab6e4ea')),
    status: yup
      .string()
      .required(i18n.t('ui.sections.crm.add_contact.steps.lead_status_is_required_7f556483')),
    priority: yup
      .string()
      .required(i18n.t('ui.sections.crm.add_contact.steps.priority_is_required_d0f01e4d')),
    tags: yup
      .array()
      .of(yup.string())
      .min(1, i18n.t('ui.sections.crm.add_contact.steps.at_least_one_tag_is_required_51b0fa3e'))
      .required(i18n.t('ui.sections.crm.add_contact.steps.tags_are_required_279383bf')),
    note: yup.string().optional(),
  }),
});

const sourceOptions = [
  {
    value: 'organic_search',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.organic_search_027a38c9');
    },
  },
  {
    value: 'paid_ads',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.paid_ads_2c7465b4');
    },
  },
  {
    value: 'social_media',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.social_media_3d84a8bd');
    },
  },
  {
    value: 'referral',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.referral_1c6984ff');
    },
  },
  {
    value: 'email_campaign',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.email_campaign_5ed84aea');
    },
  },
  {
    value: 'webinar',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.webinar_2b6cc2bc');
    },
  },
  {
    value: 'partner',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.partner_9357e0ad');
    },
  },
  {
    value: 'event',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.event_ad8919ac');
    },
  },
  {
    value: 'cold_call',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.cold_call_2c27319b');
    },
  },
  {
    value: 'other',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.other_6e6a6f20');
    },
  },
];

const agentOptions = [
  {
    value: 'agent1',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.agent_1_78fcf48a');
    },
  },
  {
    value: 'agent2',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.agent_2_f30871a6');
    },
  },
  {
    value: 'agent3',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.agent_3_f09761df');
    },
  },
  {
    value: 'agent4',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.agent_4_45e99071');
    },
  },
  {
    value: 'agent5',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.agent_5_8a407270');
    },
  },
];

const statusOptions = [
  {
    value: 'new',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.new_6403f2b7');
    },
  },
  {
    value: 'contacted',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.contacted_b5e4809e');
    },
  },
  {
    value: 'qualified',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.qualified_4f12dc10');
    },
  },
  {
    value: 'interested',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.interested_edb70a52');
    },
  },
  {
    value: 'converted',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.converted_31202862');
    },
  },
  {
    value: 'closed',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.closed_88d86b77');
    },
  },
  {
    value: 'lost',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.lost_75a7bf99');
    },
  },
  {
    value: 'nurturing',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.nurturing_a31e961f');
    },
  },
];

const priorityOptions = [
  {
    value: 'high',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.high_b1a5954a');
    },
  },
  {
    value: 'medium',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.medium_d404968e');
    },
  },
  {
    value: 'low',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.low_a124947c');
    },
  },
  {
    value: 'urgent',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.urgent_ecb26f46');
    },
  },
  {
    value: 'normal',
    get label() {
      return i18n.t('ui.sections.crm.add_contact.steps.normal_45e118d0');
    },
  },
];

const availableTags = [
  'Technology',
  'Finance',
  'Marketing',
  'Healthcare',
  'Retail',
  'Manufacturing',
  'Hospitality',
  'E-commerce',
  'Energy',
  'Government',
];
const LeadInfoForm = ({ label }) => {
  const { t: translateUi } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Box sx={{ mb: 4.5 }}>
        <Typography variant="h6" sx={{ mb: 2, whiteSpace: 'nowrap' }}>
          {label}
        </Typography>
        <Divider />
      </Box>

      <Stack sx={{ gap: 4 }}>
        <ContactFormSection
          title={translateUi('ui.sections.crm.add_contact.steps.lead_assignment_ae343182')}
        >
          <Stack direction="row" sx={{ gap: 2, width: 1 }}>
            <ControlledSelect
              name="leadInfo.source"
              label={translateUi('ui.sections.crm.add_contact.steps.lead_source_type_ee16573b')}
              options={sourceOptions}
              control={control}
              error={errors.leadInfo?.source?.message}
            />
            <ControlledSelect
              name="leadInfo.assignedAgent"
              label={translateUi('ui.sections.crm.add_contact.steps.assign_agent_89db893a')}
              options={agentOptions}
              control={control}
              error={errors.leadInfo?.assignedAgent?.message}
            />
          </Stack>
        </ContactFormSection>

        <ContactFormSection
          title={translateUi('ui.sections.crm.add_contact.steps.lead_status_72a23358')}
        >
          <Stack direction="row" sx={{ gap: 2, width: 1 }}>
            <ControlledSelect
              name="leadInfo.status"
              label={translateUi('ui.sections.crm.add_contact.steps.lead_status_72a23358')}
              options={statusOptions}
              control={control}
              error={errors.leadInfo?.status?.message}
            />
            <ControlledSelect
              name="leadInfo.priority"
              label={translateUi('ui.sections.crm.add_contact.steps.priority_886cbff9')}
              options={priorityOptions}
              control={control}
              error={errors.leadInfo?.priority?.message}
            />
          </Stack>
        </ContactFormSection>

        <ContactFormSection
          title={translateUi('ui.sections.crm.add_contact.steps.tags_keywords_b37eec5c')}
        >
          <FormControl fullWidth variant="filled" error={!!errors.leadInfo?.tags}>
            <Controller
              name="leadInfo.tags"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  fullWidth
                  multiple
                  id="tags"
                  options={availableTags}
                  freeSolo
                  value={field.value || []}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      label={translateUi(
                        'ui.sections.crm.add_contact.steps.add_tags_keywords_332f4a36',
                      )}
                      error={!!errors.leadInfo?.tags}
                      {...params}
                    />
                  )}
                />
              )}
            />
            <FormHelperText>{errors.leadInfo?.tags?.message}</FormHelperText>
          </FormControl>
          <Controller
            name="leadInfo.note"
            control={control}
            render={({ field }) => (
              <TextField
                label={
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 400,
                    }}
                  >
                    {translateUi('ui.sections.crm.add_contact.steps.website_2e8a57cc')}
                    <Box component="span" sx={{ color: 'text.disabled', ml: 0.5 }}>
                      {translateUi('ui.sections.crm.add_contact.steps.optional_d2bb786c')}
                    </Box>
                  </Typography>
                }
                multiline
                rows={3}
                fullWidth
                error={!!errors.leadInfo?.note}
                helperText={errors.leadInfo?.note?.message}
                {...field}
              />
            )}
          />
        </ContactFormSection>
      </Stack>
    </div>
  );
};

export default LeadInfoForm;
