import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

const NotificationOptions = ({ checked, notificationMethod, label, icon }) => {
  const { t: translateUi } = useTranslation();
  const { control } = useFormContext();

  return (
    <div>
      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconifyIcon icon={icon} sx={{ fontSize: 24 }} />
        <span>{label}</span>
      </Typography>
      {checked && (
        <>
          <Typography
            variant="subtitle2"
            sx={{ mt: 1, fontWeight: 400, color: 'text.secondary', lineHeight: 1.6 }}
          >
            {translateUi(
              'ui.sections.account.notification_alerts.notificationoptions.select_how_you_receive_notifications_and_stay_update_cf71eaff',
            )}
          </Typography>
          <Stack sx={{ gap: 3, py: 3, alignItems: 'flex-start' }}>
            <FormGroup>
              <Controller
                name={`${notificationMethod}.options.newNotifications`}
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox checked={field.value} {...field} />}
                    label={translateUi(
                      'ui.sections.account.notification_alerts.notificationoptions.new_notifications_7e609e00',
                    )}
                    disabled={!checked}
                  />
                )}
              />
              <Controller
                name={`${notificationMethod}.options.directNotifications`}
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox checked={field.value} {...field} />}
                    label={translateUi(
                      'ui.sections.account.notification_alerts.notificationoptions.direct_notifications_4a9d746a',
                    )}
                    disabled={!checked}
                  />
                )}
              />
              <Controller
                name={`${notificationMethod}.options.postsEmailed`}
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox checked={field.value} {...field} />}
                    label={translateUi(
                      'ui.sections.account.notification_alerts.notificationoptions.posts_emailed_to_you_8d82dd26',
                    )}
                    disabled={!checked}
                  />
                )}
              />
            </FormGroup>
            <FormControl sx={{ gap: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {translateUi(
                  'ui.sections.account.notification_alerts.notificationoptions.top_posts_stories_75ee081a',
                )}
              </Typography>
              <Controller
                name={`${notificationMethod}.options.notificationFrequency`}
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    row
                    aria-labelledby="top-posts-radio-buttons-group-label"
                    sx={{ gap: 2 }}
                    {...field}
                  >
                    <FormControlLabel
                      value="Daily"
                      control={<Radio />}
                      label={translateUi(
                        'ui.sections.account.notification_alerts.notificationoptions.daily_728298d3',
                      )}
                      disabled={!checked}
                      sx={{ mr: 0 }}
                    />
                    <FormControlLabel
                      value="Weekly"
                      control={<Radio />}
                      label={translateUi(
                        'ui.sections.account.notification_alerts.notificationoptions.weekly_158f3da5',
                      )}
                      disabled={!checked}
                      sx={{ mr: 0 }}
                    />
                    <FormControlLabel
                      value="Periodically"
                      control={<Radio />}
                      label={translateUi(
                        'ui.sections.account.notification_alerts.notificationoptions.periodically_805463c1',
                      )}
                      disabled={!checked}
                      sx={{ mr: 0 }}
                    />
                    <FormControlLabel
                      value="Off"
                      control={<Radio />}
                      label={translateUi(
                        'ui.sections.account.notification_alerts.notificationoptions.off_e3de5ab0',
                      )}
                      disabled={!checked}
                      sx={{ mr: 0 }}
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
            <FormControl sx={{ gap: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {translateUi(
                  'ui.sections.account.notification_alerts.notificationoptions.feedback_c8d7677e',
                )}
              </Typography>
              <FormGroup row aria-labelledby="feedback-checkbox-label" sx={{ gap: 1 }}>
                <Controller
                  name={`${notificationMethod}.options.feedback`}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      label={translateUi(
                        'ui.sections.account.notification_alerts.notificationoptions.get_notified_about_your_reviews_answers_to_questions_cc3d632d',
                      )}
                      control={<Checkbox checked={field.value} {...field} />}
                      disabled={!checked}
                    />
                  )}
                />
              </FormGroup>
            </FormControl>
            <FormControl sx={{ gap: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {translateUi(
                  'ui.sections.account.notification_alerts.notificationoptions.deals_recommendations_ea20a772',
                )}
              </Typography>
              <FormGroup aria-labelledby="deals-checkbox-label" sx={{ gap: 1 }}>
                <Controller
                  name={`${notificationMethod}.options.deals`}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox checked={field.value} {...field} />}
                      label={translateUi(
                        'ui.sections.account.notification_alerts.notificationoptions.the_latest_on_deals_offers_and_savings_events_8e7fb248',
                      )}
                      disabled={!checked}
                    />
                  )}
                />
                <Controller
                  name={`${notificationMethod}.options.personalizedDeals`}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox checked={field.value} {...field} />}
                      label={translateUi(
                        'ui.sections.account.notification_alerts.notificationoptions.personalized_based_on_shopping_activity_88d9d629',
                      )}
                      disabled={!checked}
                    />
                  )}
                />
                <Controller
                  name={`${notificationMethod}.options.updates`}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox checked={field.value} {...field} />}
                      label={translateUi(
                        'ui.sections.account.notification_alerts.notificationoptions.updates_on_new_programs_product_launches_releases_e29f4e96',
                      )}
                      disabled={!checked}
                    />
                  )}
                />
              </FormGroup>
            </FormControl>
            <FormControl sx={{ gap: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {translateUi(
                  'ui.sections.account.notification_alerts.notificationoptions.accounts_shipping_74046336',
                )}
              </Typography>
              <FormGroup aria-labelledby="accounts-shipping-checkbox-label" sx={{ gap: 1 }}>
                <Controller
                  name={`${notificationMethod}.options.accountSecurity`}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox checked={field.value} {...field} />}
                      label={translateUi(
                        'ui.sections.account.notification_alerts.notificationoptions.get_notified_about_account_security_payment_and_orde_5a08dc8c',
                      )}
                      disabled={!checked}
                    />
                  )}
                />
                <Controller
                  name={`${notificationMethod}.options.packageUpdates`}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox checked={field.value} {...field} />}
                      label={translateUi(
                        'ui.sections.account.notification_alerts.notificationoptions.find_out_when_packages_ship_and_arrive_42265c66',
                      )}
                      disabled={!checked}
                    />
                  )}
                />
              </FormGroup>
            </FormControl>
          </Stack>
        </>
      )}
    </div>
  );
};

export default NotificationOptions;
